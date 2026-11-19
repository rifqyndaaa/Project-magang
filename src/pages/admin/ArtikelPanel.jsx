import { useState } from 'react';
import Icon from '../../components/Icon';
import {
  getAllArticles,
  saveArticle,
  deleteArticle,
  toggleArticleStatus,
  fetchLinkPreview,
  fileToCompressedDataUrl,
  normalizeUrl,
  hostnameOf,
  todayISO,
  formatTanggal,
} from '../../services/articleStorage';
import './ArtikelPanel.css';

const EMPTY_FORM = {
  id: null,
  judul: '',
  url: '',
  sumber: '',
  tanggal: todayISO(),
  ringkasan: '',
  thumbnail: null,
  status: 'published',
};

/**
 * ArtikelPanel — pengelolaan isi section "Artikel & Informasi" di Beranda.
 *
 * Tidak menambah menu atau rute baru: panel ini disisipkan pada halaman
 * Pengaturan yang sudah ada. Entri berstatus draft tidak pernah dikirim
 * ke Beranda.
 */
export default function ArtikelPanel() {
  const [version, setVersion] = useState(0);
  const [form, setForm] = useState(EMPTY_FORM);
  const [notice, setNotice] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [proxyUrl, setProxyUrl] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const articles = getAllArticles();
  void version;

  const reload = () => setVersion((v) => v + 1);

  const flash = (type, message) => {
    setNotice({ type, message });
    window.setTimeout(() => setNotice(null), 6000);
  };

  const update = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  const resetForm = () => setForm({ ...EMPTY_FORM, tanggal: todayISO() });

  /* ---------------- Metadata otomatis ---------------- */

  const handleFetchPreview = async () => {
    const url = normalizeUrl(form.url);
    if (!url) {
      flash('warn', 'Masukkan alamat tautan yang valid lebih dulu (contoh: lkpp.go.id/berita).');
      return;
    }

    setIsFetching(true);
    const result = await fetchLinkPreview(url, proxyUrl);
    setIsFetching(false);

    if (!result.ok) {
      // Tidak fatal — admin tetap dapat mengisi manual.
      update({ url, sumber: form.sumber || hostnameOf(url) });
      flash('warn', result.message);
      return;
    }

    const d = result.data;
    setForm((prev) => ({
      ...prev,
      url: d.url || url,
      judul: d.judul || prev.judul,
      ringkasan: d.ringkasan || prev.ringkasan,
      sumber: d.sumber || prev.sumber || hostnameOf(url),
      thumbnail: prev.thumbnail || d.thumbnail || null,
    }));
    flash('ok', 'Metadata berhasil diambil. Periksa dan sesuaikan bila perlu.');
  };

  /* ---------------- Unggahan gambar ---------------- */

  const handleThumbnail = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const dataUrl = await fileToCompressedDataUrl(file);
      update({ thumbnail: dataUrl });
      flash('ok', 'Gambar diunggah dan dioptimalkan otomatis.');
    } catch (err) {
      flash('err', err.message);
    }
  };

  /* ---------------- Simpan / Hapus ---------------- */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.judul.trim()) {
      flash('err', 'Judul informasi wajib diisi.');
      return;
    }
    if (form.url.trim() && !normalizeUrl(form.url)) {
      flash('err', 'Alamat tautan tidak valid.');
      return;
    }

    const payload = {
      ...form,
      url: form.url.trim() ? normalizeUrl(form.url) : '',
      sumber: form.sumber.trim() || hostnameOf(form.url),
    };

    const res = saveArticle(payload);
    if (!res.success) {
      flash('err', res.message);
      return;
    }

    const wasEdit = Boolean(form.id);
    resetForm();
    setShowForm(false);
    reload();
    flash('ok', wasEdit ? 'Informasi diperbarui.' : 'Informasi baru ditambahkan.');
  };

  const handleEdit = (article) => {
    setForm({ ...EMPTY_FORM, ...article });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const res = deleteArticle(id);
    if (res.success) {
      setConfirmDelete(null);
      reload();
      flash('ok', 'Informasi dihapus permanen.');
    } else {
      flash('err', res.message);
    }
  };

  const handleToggle = (id) => {
    const res = toggleArticleStatus(id);
    if (res.success) {
      reload();
      flash(
        'ok',
        res.newStatus === 'published'
          ? 'Informasi diterbitkan ke Beranda.'
          : 'Informasi dijadikan draft — tidak tampil di Beranda.'
      );
    }
  };

  const publishedCount = articles.filter((a) => a.status === 'published').length;

  return (
    <section className="artp" aria-labelledby="artp-title">
      <div className="artp-head">
        <div>
          <h2 id="artp-title" className="artp-head__title">
            Artikel &amp; Informasi Beranda
          </h2>
          <p className="artp-head__desc">
            {articles.length} informasi terdaftar · {publishedCount} tampil di section Beranda.
            Entri draft tidak pernah dikirim ke halaman publik.
          </p>
        </div>
        <button
          type="button"
          className="adx-btn adx-btn--primary"
          onClick={() => {
            if (showForm && form.id) resetForm();
            setShowForm((v) => !v);
          }}
        >
          <Icon name={showForm ? 'x' : 'plus'} size={14} color="currentColor" />
          <span>{showForm ? 'Tutup Formulir' : 'Tambah Informasi'}</span>
        </button>
      </div>

      {notice && (
        <div className={`adx-notice adx-notice--${notice.type}`} role="status">
          {notice.message}
        </div>
      )}

      {/* -------------------------- FORMULIR -------------------------- */}
      {showForm && (
        <form className="artp-form" onSubmit={handleSubmit}>
          <div className="artp-row">
            <label className="artp-field artp-field--wide">
              <span className="artp-label">Tautan Sumber</span>
              <input
                type="url"
                className="artp-input"
                placeholder="https://lkpp.go.id/berita/..."
                value={form.url}
                onChange={(e) => update({ url: e.target.value })}
              />
              <span className="artp-hint">
                Boleh dikosongkan bila informasi hanya berupa keterangan internal.
              </span>
            </label>

            <div className="artp-field artp-field--action">
              <span className="artp-label">&nbsp;</span>
              <button
                type="button"
                className="adx-btn"
                onClick={handleFetchPreview}
                disabled={isFetching}
              >
                <Icon name="refresh" size={14} color="currentColor" />
                <span>{isFetching ? 'Mengambil…' : 'Ambil Metadata'}</span>
              </button>
            </div>
          </div>

          <details className="artp-proxy">
            <summary>Metadata gagal diambil? Atur URL proxy pembaca</summary>
            <p className="artp-hint">
              Sebagian situs memblokir pembacaan langsung dari browser. Isi URL layanan proxy yang
              mengembalikan HTML halaman, lalu klik “Ambil Metadata” lagi. Gunakan{' '}
              <code>{'{url}'}</code> sebagai penanda posisi tautan, contoh:{' '}
              <code>https://proxy-anda.example/?target={'{url}'}</code>. Kosongkan bila tidak
              diperlukan — semua kolom tetap dapat diisi manual.
            </p>
            <input
              type="text"
              className="artp-input"
              placeholder="https://proxy-anda.example/?target={url}"
              value={proxyUrl}
              onChange={(e) => setProxyUrl(e.target.value)}
            />
          </details>

          <div className="artp-row">
            <label className="artp-field artp-field--wide">
              <span className="artp-label">Judul Informasi *</span>
              <input
                type="text"
                className="artp-input"
                placeholder="Judul artikel atau berita"
                value={form.judul}
                onChange={(e) => update({ judul: e.target.value })}
              />
            </label>

            <label className="artp-field">
              <span className="artp-label">Tanggal</span>
              <input
                type="date"
                className="artp-input"
                value={form.tanggal}
                onChange={(e) => update({ tanggal: e.target.value })}
              />
            </label>
          </div>

          <div className="artp-row">
            <label className="artp-field">
              <span className="artp-label">Sumber Informasi</span>
              <input
                type="text"
                className="artp-input"
                placeholder="Nama media / instansi"
                value={form.sumber}
                onChange={(e) => update({ sumber: e.target.value })}
              />
              <span className="artp-hint">Kosongkan untuk memakai nama domain tautan.</span>
            </label>

            <label className="artp-field">
              <span className="artp-label">Status Publikasi</span>
              <select
                className="artp-input"
                value={form.status}
                onChange={(e) => update({ status: e.target.value })}
              >
                <option value="published">Terbit — tampil di Beranda</option>
                <option value="draft">Draft — simpan tanpa menampilkan</option>
              </select>
            </label>
          </div>

          <label className="artp-field artp-field--block">
            <span className="artp-label">Ringkasan Singkat</span>
            <textarea
              className="artp-input artp-textarea"
              rows={3}
              placeholder="Satu atau dua kalimat ringkasan isi informasi."
              value={form.ringkasan}
              onChange={(e) => update({ ringkasan: e.target.value })}
            />
          </label>

          <div className="artp-field artp-field--block">
            <span className="artp-label">Gambar Preview</span>
            <div className="artp-upload">
              {form.thumbnail ? (
                <img src={form.thumbnail} alt="Pratinjau gambar" className="artp-upload__img" />
              ) : (
                <div className="artp-upload__empty">
                  <Icon name="image" size={20} color="#B9B3B3" />
                  <span>Belum ada gambar</span>
                </div>
              )}
              <div className="artp-upload__actions">
                <label className="adx-btn adx-btn--xs">
                  <Icon name="upload" size={13} color="currentColor" />
                  <span>Pilih Gambar</span>
                  <input type="file" accept="image/*" hidden onChange={handleThumbnail} />
                </label>
                {form.thumbnail && (
                  <button
                    type="button"
                    className="adx-btn adx-btn--xs adx-btn--quiet"
                    onClick={() => update({ thumbnail: null })}
                  >
                    Hapus
                  </button>
                )}
                <span className="artp-hint">Gambar otomatis diperkecil agar ringan.</span>
              </div>
            </div>
          </div>

          <div className="artp-footer">
            <button type="submit" className="adx-btn adx-btn--primary">
              <Icon name="check" size={14} color="currentColor" />
              <span>{form.id ? 'Simpan Perubahan' : 'Simpan Informasi'}</span>
            </button>
            <button
              type="button"
              className="adx-btn adx-btn--quiet"
              onClick={() => {
                resetForm();
                setShowForm(false);
              }}
            >
              Batal
            </button>
          </div>
        </form>
      )}

      {/* -------------------------- DAFTAR -------------------------- */}
      {articles.length > 0 ? (
        <div className="artp-table-scroll">
          <table className="adx-table artp-table">
            <thead>
              <tr>
                <th>Informasi</th>
                <th>Tanggal</th>
                <th>Status</th>
                <th data-align="center">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.id}>
                  <td>
                    <span className="adx-subject">
                      <span className="adx-subject__title">{a.judul}</span>
                      <span className="adx-subject__desc">
                        {a.sumber || hostnameOf(a.url) || 'Tanpa sumber'}
                      </span>
                    </span>
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>{formatTanggal(a.tanggal)}</td>
                  <td>
                    {a.status === 'published' ? (
                      <span className="adx-tag adx-tag--on">Terbit</span>
                    ) : (
                      <span className="adx-tag adx-tag--off">Draft</span>
                    )}
                  </td>
                  <td data-align="center" style={{ whiteSpace: 'nowrap' }}>
                    <button
                      type="button"
                      className="adx-btn adx-btn--xs"
                      onClick={() => handleEdit(a)}
                    >
                      Ubah
                    </button>
                    <button
                      type="button"
                      className="adx-btn adx-btn--xs"
                      style={{ marginLeft: '0.3rem' }}
                      onClick={() => handleToggle(a.id)}
                    >
                      {a.status === 'published' ? 'Jadikan Draft' : 'Terbitkan'}
                    </button>
                    {confirmDelete === a.id ? (
                      <>
                        <button
                          type="button"
                          className="adx-btn adx-btn--xs"
                          style={{ marginLeft: '0.3rem', color: '#B8202D', borderColor: '#B8202D' }}
                          onClick={() => handleDelete(a.id)}
                        >
                          Yakin hapus
                        </button>
                        <button
                          type="button"
                          className="adx-btn adx-btn--xs"
                          style={{ marginLeft: '0.25rem' }}
                          onClick={() => setConfirmDelete(null)}
                        >
                          Batal
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        className="adx-btn adx-btn--xs adx-btn--quiet"
                        style={{ marginLeft: '0.3rem' }}
                        onClick={() => setConfirmDelete(a.id)}
                      >
                        Hapus
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="adx-empty">
          <p className="adx-empty__title">Belum ada informasi</p>
          <p className="adx-empty__desc">
            Tekan “Tambah Informasi” untuk memasukkan tautan berita, regulasi, atau bahan bacaan
            pertama. Tidak ada data contoh yang dipasang otomatis.
          </p>
        </div>
      )}
    </section>
  );
}
