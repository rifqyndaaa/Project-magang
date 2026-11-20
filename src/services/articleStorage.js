/**
 * articleStorage.js — Penyimpanan Artikel & Informasi Beranda
 * DPW IFPI Provinsi Riau
 *
 * Mengikuti pola penyimpanan yang sudah dipakai proyek (localStorage),
 * sama seperti productStorage.js. Daftar awal sengaja KOSONG agar tidak ada
 * berita contoh/palsu yang tampil sebagai informasi resmi IFPI.
 *
 * Struktur satu entri:
 * {
 *   id: 'art-xxxx',
 *   judul: 'Judul artikel / informasi',
 *   url: 'https://sumber-asli...',        // boleh kosong bila hanya dokumen
 *   sumber: 'Nama media / instansi',      // otomatis dari hostname bila kosong
 *   tanggal: '2026-11-19',                // YYYY-MM-DD
 *   ringkasan: 'Ringkasan singkat',
 *   thumbnail: 'data:image/...' | null,   // hasil unggah (dikompres)
 *   status: 'published' | 'draft',
 *   createdAt, updatedAt
 * }
 */

const ARTICLE_STORAGE_KEY = 'ifpi_beranda_artikel_v1';

const MAX_THUMB_EDGE = 1200;
const MAX_THUMB_BYTES = 700 * 1024; // 700 KB setelah kompres
const MAX_LAMPIRAN_BYTES = 2.5 * 1024 * 1024; // 2,5 MB bila disimpan di browser

/**
 * Entri awal — tautan nyata yang diberikan pengurus, bukan berita rekaan.
 * Hanya dipakai sekali saat penyimpanan browser masih kosong; setelah itu
 * daftar sepenuhnya dikelola dari panel admin (termasuk bila dikosongkan).
 */
const INITIAL_ARTICLES = [
  {
    id: 'art-lkpp-jadi-badan',
    judul: 'LKPP Bakal Berubah Jadi Badan, Prabowo Terbitkan Keppres',
    url:
      'https://www.cnbcindonesia.com/news/20261118082915-4-786142/' +
      'lkpp-bakal-berubah-jadi-badan-prabowo-terbitkan-keppres',
    sumber: 'CNBC Indonesia',
    tanggal: '2026-11-18',
    ringkasan:
      'LKPP akan berubah menjadi Badan Pengadaan Barang dan Jasa Pemerintah berdasarkan Keppres.',
    thumbnail: '/images/artikel/lkpp-jadi-badan.jpg',
    status: 'published',
    createdAt: '2026-11-18T09:10:46+07:00',
    updatedAt: '2026-11-18T09:10:46+07:00',
  },
  {
    id: 'art-paparan-bpsdm-renaksi',
    judul:
      'Paparan BPSDM Riau: Renaksi Pemenuhan Kompetensi PPK 2027',
    url: '',
    sumber: 'BPSDM Provinsi Riau & DPW IFPI Riau',
    tanggal: '2026-11-19',
    ringkasan:
      'Bahan paparan rencana aksi pemenuhan PPK se-Provinsi Riau: 13 pemda, 8 pemda belum mengisi Renaksi, dan kesenjangan 565 PPK pada 5 pemda yang sudah mengisi.',
    thumbnail: '/images/artikel/paparan-bpsdm-renaksi.jpg',
    lampiran: {
      nama: 'Paparan-BPSDM-Riau-Renaksi-PPK-2027.pptx',
      url: '/dokumen/Paparan-BPSDM-Riau-Renaksi-PPK-2027.pptx',
      tipe:
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      ukuran: 3754424,
    },
    status: 'published',
    createdAt: '2026-11-19T15:20:00+07:00',
    updatedAt: '2026-11-19T15:20:00+07:00',
  },
];

/* ------------------------------------------------------------------ */
/* Utilitas                                                           */
/* ------------------------------------------------------------------ */

export function normalizeUrl(raw) {
  const value = (raw || '').trim();
  if (!value) return '';
  const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const parsed = new URL(withScheme);
    if (!parsed.hostname.includes('.')) return '';
    return parsed.href;
  } catch {
    return '';
  }
}

export function hostnameOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./i, '');
  } catch {
    return '';
  }
}

export function todayISO() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60000).toISOString().slice(0, 10);
}

export function formatTanggal(value) {
  if (!value) return '';
  const d = new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Inisial nama sumber untuk tampilan tanpa gambar */
export function initialOf(text) {
  const clean = (text || '').trim();
  if (!clean) return 'IF';
  return clean
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

/* ------------------------------------------------------------------ */
/* Baca / Tulis                                                       */
/* ------------------------------------------------------------------ */

/** Nama berkas ringkas dari sebuah URL atau data URL */
export function namaBerkasDari(url) {
  if (!url) return '';
  if (url.startsWith('data:')) return 'Berkas terunggah';
  try {
    const path = new URL(url, 'https://x.local').pathname;
    return decodeURIComponent(path.split('/').pop() || '');
  } catch {
    return '';
  }
}

/** Ukuran berkas → label ringkas */
export function formatUkuran(bytes) {
  const n = Number(bytes);
  if (!n || n <= 0) return '';
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function normalizeLampiran(item) {
  const raw = item && typeof item === 'object' ? item : null;
  if (!raw) return null;
  const url = (raw.url || '').trim();
  if (!url) return null;
  return {
    nama: (raw.nama || '').trim() || namaBerkasDari(url) || 'Dokumen lampiran',
    url,
    tipe: raw.tipe || '',
    ukuran: Number(raw.ukuran) || 0,
  };
}

function normalizeArticle(item) {
  if (!item || typeof item !== 'object') return null;
  return {
    id: item.id || `art-${Date.now().toString(36)}`,
    judul: (item.judul || '').trim() || 'Tanpa judul',
    url: item.url || '',
    sumber: (item.sumber || '').trim() || hostnameOf(item.url || ''),
    tanggal: item.tanggal || todayISO(),
    ringkasan: (item.ringkasan || '').trim(),
    thumbnail: item.thumbnail || null,
    lampiran: normalizeLampiran(item.lampiran),
    status: item.status === 'draft' ? 'draft' : 'published',
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: item.updatedAt || item.createdAt || new Date().toISOString(),
  };
}

function sortByDate(list) {
  return [...list].sort((a, b) => {
    if (a.tanggal === b.tanggal) {
      return String(b.createdAt).localeCompare(String(a.createdAt));
    }
    return a.tanggal < b.tanggal ? 1 : -1;
  });
}

const SEED_FLAG_KEY = 'ifpi_beranda_artikel_seeded_v1';

/**
 * Entri susulan — disisipkan sekali ke penyimpanan yang sudah terisi,
 * supaya dokumen resmi baru tetap tampil tanpa menghapus artikel admin.
 */
const BACKFILL_KEY = 'ifpi_beranda_artikel_backfill_v2';
const BACKFILL_IDS = ['art-paparan-bpsdm-renaksi'];

function applyBackfill(list) {
  try {
    if (localStorage.getItem(BACKFILL_KEY)) return list;
    const have = new Set(list.map((a) => a.id));
    const missing = INITIAL_ARTICLES.filter(
      (a) => BACKFILL_IDS.includes(a.id) && !have.has(a.id)
    )
      .map(normalizeArticle)
      .filter(Boolean);
    localStorage.setItem(BACKFILL_KEY, '1');
    if (!missing.length) return list;
    const merged = [...missing, ...list];
    localStorage.setItem(ARTICLE_STORAGE_KEY, JSON.stringify(merged));
    return merged;
  } catch {
    return list;
  }
}

export function getAllArticles() {
  try {
    const raw = localStorage.getItem(ARTICLE_STORAGE_KEY);
    if (!raw) {
      // Isi entri awal hanya sekali. Bila admin kemudian menghapus semua
      // entri, penanda ini mencegah data contoh muncul kembali.
      if (!localStorage.getItem(SEED_FLAG_KEY)) {
        const seeded = INITIAL_ARTICLES.map(normalizeArticle).filter(Boolean);
        localStorage.setItem(ARTICLE_STORAGE_KEY, JSON.stringify(seeded));
        localStorage.setItem(SEED_FLAG_KEY, '1');
        return sortByDate(seeded);
      }
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return sortByDate(applyBackfill(parsed.map(normalizeArticle).filter(Boolean)));
  } catch (err) {
    console.warn('[Artikel] Gagal membaca data:', err);
    return [];
  }
}

/** Hanya entri berstatus published — dipakai section Beranda */
export function getPublishedArticles() {
  return getAllArticles().filter((a) => a.status === 'published');
}

export function saveArticle(data) {
  try {
    const all = getAllArticles();
    const now = new Date().toISOString();
    const isEdit = Boolean(data.id && all.some((a) => a.id === data.id));

    if (isEdit) {
      const updated = all.map((a) => {
        if (a.id !== data.id) return a;
        return normalizeArticle({ ...a, ...data, updatedAt: now });
      });
      localStorage.setItem(ARTICLE_STORAGE_KEY, JSON.stringify(updated));
    } else {
      const created = normalizeArticle({
        ...data,
        id: `art-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
        status: data.status || 'published',
        createdAt: now,
        updatedAt: now,
      });
      localStorage.setItem(ARTICLE_STORAGE_KEY, JSON.stringify([created, ...all]));
    }

    return { success: true };
  } catch (err) {
    console.error('[Artikel] Gagal menyimpan:', err);
    const quota = /quota|exceed/i.test(err.message || '');
    return {
      success: false,
      message: quota
        ? 'Penyimpanan browser penuh. Hapus informasi lama atau perkecil gambar.'
        : `Gagal menyimpan: ${err.message}`,
    };
  }
}

export function deleteArticle(id) {
  try {
    const all = getAllArticles();
    localStorage.setItem(
      ARTICLE_STORAGE_KEY,
      JSON.stringify(all.filter((a) => a.id !== id))
    );
    return { success: true };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

export function toggleArticleStatus(id) {
  try {
    const all = getAllArticles();
    let newStatus = 'published';
    const updated = all.map((a) => {
      if (a.id !== id) return a;
      newStatus = a.status === 'published' ? 'draft' : 'published';
      return { ...a, status: newStatus, updatedAt: new Date().toISOString() };
    });
    localStorage.setItem(ARTICLE_STORAGE_KEY, JSON.stringify(updated));
    return { success: true, newStatus };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

/* ------------------------------------------------------------------ */
/* Unggah gambar — dikompres agar localStorage tetap ringan           */
/* ------------------------------------------------------------------ */

export function fileToCompressedDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('Tidak ada berkas dipilih.'));
      return;
    }
    if (!file.type.startsWith('image/')) {
      reject(new Error('Berkas harus berupa gambar.'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Gagal membaca berkas gambar.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Gambar tidak dapat dibaca.'));
      img.onload = () => {
        const longEdge = Math.max(img.width, img.height);
        const scale = longEdge > MAX_THUMB_EDGE ? MAX_THUMB_EDGE / longEdge : 1;
        const width = Math.round(img.width * scale);
        const height = Math.round(img.height * scale);

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        let quality = 0.85;
        let dataUrl = canvas.toDataURL('image/jpeg', quality);
        while (dataUrl.length > MAX_THUMB_BYTES && quality > 0.45) {
          quality -= 0.1;
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }
        resolve(dataUrl);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/* ------------------------------------------------------------------ */
/* Unggah lampiran dokumen (PPT/PDF/DOC)                              */
/* ------------------------------------------------------------------ */

const LAMPIRAN_EXT = /\.(pptx?|ppsx?|pdf|docx?|xlsx?|odp|odt|ods|zip|rar)$/i;

/**
 * Mengubah berkas dokumen menjadi objek lampiran.
 * Berkas kecil (≤ 2,5 MB) disimpan langsung di browser sebagai data URL;
 * berkas lebih besar harus ditempatkan di folder public lewat kolom URL.
 */
export function fileToAttachment(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('Tidak ada berkas dipilih.'));
      return;
    }
    if (!LAMPIRAN_EXT.test(file.name)) {
      reject(new Error('Format dokumen belum didukung. Gunakan PPT/PPTX, PDF, DOC/DOCX, atau XLS/XLSX.'));
      return;
    }
    if (file.size > MAX_LAMPIRAN_BYTES) {
      reject(
        new Error(
          `Berkas ${formatUkuran(file.size)} melebihi batas 2,5 MB. Salin berkas ke folder ` +
            'public/dokumen lalu isi kolom URL dokumen.'
        )
      );
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Gagal membaca berkas dokumen.'));
    reader.onload = () => {
      resolve({
        nama: file.name,
        url: reader.result,
        tipe: file.type || '',
        ukuran: file.size,
      });
    };
    reader.readAsDataURL(file);
  });
}

/* ------------------------------------------------------------------ */
/* Preview metadata otomatis (Open Graph)                             */
/* ------------------------------------------------------------------ */

/**
 * Mengambil metadata preview dari sebuah tautan.
 *
 * Catatan: banyak situs memblokir pembacaan langsung dari browser (CORS).
 * Karena itu fungsi ini mencoba permintaan langsung lebih dulu, lalu (bila
 * admin mengisi URL proxy) lewat proxy tersebut.
 *
 * Kegagalan TIDAK melempar error — selalu mengembalikan { ok: false, message }
 * sehingga formulir admin tetap stabil dan admin dapat mengisi manual.
 */
export async function fetchLinkPreview(rawUrl, proxyUrl = '') {
  const url = normalizeUrl(rawUrl);
  if (!url) {
    return { ok: false, message: 'Alamat tautan tidak valid.' };
  }

  const attempts = [];
  if (proxyUrl) {
    const proxy = proxyUrl.trim();
    attempts.push(
      proxy.includes('{url}')
        ? proxy.replace('{url}', encodeURIComponent(url))
        : `${proxy}${encodeURIComponent(url)}`
    );
  }
  attempts.push(url);

  let lastError = '';

  for (const target of attempts) {
    try {
      const res = await fetch(target, {
        headers: { Accept: 'text/html,application/xhtml+xml' },
        redirect: 'follow',
      });

      if (!res.ok) {
        lastError = `HTTP ${res.status}`;
        continue;
      }

      const contentType = res.headers.get('content-type') || '';
      if (!/html|xml/i.test(contentType) && contentType) {
        lastError = 'Sumber bukan halaman HTML.';
        continue;
      }

      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');

      const pick = (selector, attr = 'content') => {
        const node = doc.querySelector(selector);
        return node ? (node.getAttribute(attr) || '').trim() : '';
      };

      const title =
        pick('meta[property="og:title"]') ||
        pick('meta[name="twitter:title"]') ||
        (doc.querySelector('title')?.textContent || '').trim();

      const description =
        pick('meta[property="og:description"]') ||
        pick('meta[name="description"]') ||
        pick('meta[name="twitter:description"]');

      const siteName =
        pick('meta[property="og:site_name"]') ||
        pick('meta[name="application-name"]');

      let image =
        pick('meta[property="og:image"]') ||
        pick('meta[property="og:image:url"]') ||
        pick('meta[name="twitter:image"]');

      if (image && !/^https?:\/\//i.test(image)) {
        try {
          image = new URL(image, url).href;
        } catch {
          image = '';
        }
      }

      if (!title && !description && !image) {
        lastError = 'Sumber tidak menyediakan metadata preview.';
        continue;
      }

      return {
        ok: true,
        data: {
          judul: title,
          ringkasan: description,
          sumber: siteName || hostnameOf(url),
          thumbnail: image || null,
          url,
        },
      };
    } catch (err) {
      lastError = err.message || 'Permintaan gagal.';
    }
  }

  return {
    ok: false,
    message: `Metadata tidak dapat diambil otomatis${
      lastError ? ` (${lastError})` : ''
    }. Silakan isi judul, sumber, dan ringkasan secara manual.`,
  };
}
