// Layanan Penyimpanan Data Etalase Produk (Prototype localStorage)
// Portal Pengaduan & Aspirasi Masyarakat Pemerintah Provinsi Riau

const PRODUCT_STORAGE_KEY = 'riau_etalase_produk_v1';
const PRODUCT_CATEGORY_KEY = 'riau_etalase_kategori_v1';

// Daftar Kategori Awal Default (Dapat Dikelola)
export const DEFAULT_PRODUCT_CATEGORIES = [
  'Semua Kategori',
  'Merchandise',
  'Produk UMKM',
  'Kerajinan',
  'Makanan Khas',
  'Produk Unggulan Daerah'
];

export const EDITABLE_PRODUCT_CATEGORIES = [
  'Merchandise',
  'Produk UMKM',
  'Kerajinan',
  'Makanan Khas',
  'Produk Unggulan Daerah'
];

// Data Awal Seed Produk Demo Terkurasi
export const INITIAL_SEED_PRODUCTS = [
  {
    id: 'prod-seed-001',
    name: 'Kain Tenun Songket Siak Corak Pucuk Rebung',
    category: 'Kerajinan',
    productType: 'dijual', // 'dijual' | 'dipamerkan'
    price: 850000,
    sellerName: 'UMKM Tenun Siak Indah (Demo Mitra Binaan Disperindagkop Riau)',
    sellerContact: '0812-7654-3210 (Demo Kontak WhatsApp)',
    originRegion: 'Kabupaten Siak',
    image: '/images/products/songket-siak.svg',
    shortDescription: 'Kain songket tradisional Melayu Siak dengan motif khas pucuk rebung bertabur benang emas berkualitas tinggi.',
    description: 'Kain Tenun Songket Siak merupakan warisan budaya takbenda kebanggaan Provinsi Riau. Ditenun secara manual oleh perajin tradisional terlatih di Kabupaten Siak Sri Indrapura menggunakan alat tenun bukan mesin (ATBM). Menampilkan motif pucuk rebung bertabur benang emas yang melambangkan kesuburan, kemuliaan budi, dan keteguhan hidup masyarakat Melayu. Sangat ideal untuk busana adat resmi, cinderamata kehormatan daerah, atau koleksi busana istimewa.',
    status: 'published', // 'published' | 'hidden'
    isDemo: true,
    featured: true,
    createdAt: '2026-03-01T09:00:00.000Z',
    updatedAt: '2026-03-01T09:00:00.000Z'
  },
  {
    id: 'prod-seed-002',
    name: 'Bolu Kemojo Khas Riau Pandan Asli',
    category: 'Makanan Khas',
    productType: 'dijual',
    price: 35000,
    sellerName: 'Dapur Kemojo Melayu (Demo Binaan UMKM Kota Pekanbaru)',
    sellerContact: '0813-8899-7711 (Demo Kontak Penjual)',
    originRegion: 'Kota Pekanbaru',
    image: '/images/products/bolu-kemojo.svg',
    shortDescription: 'Kue basah tradisional Riau berbentuk bunga kamboja beraroma pandan suji harum dan santan gurih.',
    description: 'Bolu Kemojo adalah kue tradisional khas Melayu Riau yang berbentuk bunga kamboja (kemojo). Dibuat dari sari daun pandan asli, santan kelapa murni, telur, mentega, dan gula pasir pilihan tanpa pewarna sintetis maupun pengawet buatan. Memiliki tekstur padat, legit, dan lembut di lidah. Selalu menjadi sajian utama pada jamuan adat, acara kenegaraan daerah, serta oleh-oleh ikonik dari Bumi Lancang Kuning.',
    status: 'published',
    isDemo: true,
    featured: true,
    createdAt: '2026-03-02T10:30:00.000Z',
    updatedAt: '2026-03-02T10:30:00.000Z'
  },
  {
    id: 'prod-seed-003',
    name: 'Tanjak Melayu Diraja Corak Elang Menyongsong Angin',
    category: 'Merchandise',
    productType: 'dijual',
    price: 150000,
    sellerName: 'Griya Tanjak Riau (Demo Pengrajin Budaya Melayu)',
    sellerContact: '0821-6543-9876 (Demo Kontak Penjual)',
    originRegion: 'Kota Pekanbaru',
    image: '/images/products/tanjak-melayu.svg',
    shortDescription: 'Penutup kepala tradisional pria Melayu berbahan tenun songket dengan lipatan kokoh dan elegan.',
    description: 'Tanjak atau Tengkolok Melayu merupakan simbol kehormatan, wibawa, dan jati diri pria dalam adat resam Melayu Riau. Model lipatan Elang Menyongsong Angin melambangkan keberanian dan kepemimpinan dalam menghadapi tantangan hidup. Dibuat menggunakan bahan tenun songket pilihan berkualitas tinggi dengan rangka penguat interior sehingga tidak mudah berubah bentuk.',
    status: 'published',
    isDemo: true,
    featured: true,
    createdAt: '2026-03-03T11:00:00.000Z',
    updatedAt: '2026-03-03T11:00:00.000Z'
  },
  {
    id: 'prod-seed-004',
    name: 'Kopi Liberika Rangsang Meranti Premium 250g',
    category: 'Produk Unggulan Daerah',
    productType: 'dijual',
    price: 65000,
    sellerName: 'Kelompok Tani Kopi Gambut Rangsang (Demo Binaan Pemprov Riau)',
    sellerContact: '0852-7123-4567 (Demo Kontak Pesanan)',
    originRegion: 'Kabupaten Kepulauan Meranti',
    image: '/images/products/kopi-liberika.svg',
    shortDescription: 'Kopi unik hasil budidaya lahan gambut pesisir Riau dengan cita rasa beraroma nangka alami dan asam lembut.',
    description: 'Kopi Liberika Rangsang Meranti telah tersertifikasi Indikasi Geografis (IG) Nasional. Tumbuh subur secara organik di tanah gambut pesisir Pulau Rangsang, Kabupaten Kepulauan Meranti, Riau. Memiliki ukuran biji kopi yang lebih besar dengan karakteristik rasa yang sangat unik: paduan aroma buah nangka matang alami, tingkat keasaman rendah yang ramah di lambung, serta aftertaste manis kayu manis yang khas.',
    status: 'published',
    isDemo: true,
    featured: true,
    createdAt: '2026-03-04T13:15:00.000Z',
    updatedAt: '2026-03-04T13:15:00.000Z'
  },
  {
    id: 'prod-seed-005',
    name: 'Lempuk Durian Asli Bengkalis Tradisional',
    category: 'Makanan Khas',
    productType: 'dijual',
    price: 45000,
    sellerName: 'Rumah Oleh-Oleh Bengkalis Mandiri (Demo UMKM Kuliner)',
    sellerContact: '0812-9012-3456 (Demo Kontak Penjual)',
    originRegion: 'Kabupaten Bengkalis',
    image: '/images/products/lempuk-durian.svg',
    shortDescription: 'Olahan daging buah durian asli Bengkalis dan gula pasir tanpa pemanis buatan yang dimasak secara tradisional.',
    description: 'Lempuk Durian Bengkalis diolah secara turun-temurun dari 100% daging durian lokal Bengkalis bermutu tinggi yang dicampur sedikit gula pasir murni, kemudian dimasak di atas kawah api kayu selama berjam-jam hingga mengental dan berwarna cokelat mengkilap. Dibungkus menggunakan pelepah pinang (upei) kering tradisi lama untuk mempertahankan aroma wangi durian alami.',
    status: 'published',
    isDemo: true,
    featured: false,
    createdAt: '2026-03-05T14:45:00.000Z',
    updatedAt: '2026-03-05T14:45:00.000Z'
  },
  {
    id: 'prod-seed-006',
    name: 'Kerajinan Tas Anyaman Pandan Alami Kuansing',
    category: 'Produk UMKM',
    productType: 'dijual',
    price: 120000,
    sellerName: 'Kelompok Anyaman Pandan Sejahtera (Demo UMKM Kuansing)',
    sellerContact: '0823-8765-4321 (Demo Kontak Pemesanan)',
    originRegion: 'Kabupaten Kuantan Singingi',
    image: '/images/products/anyaman-kuansing.svg',
    shortDescription: 'Tas jinjing ramah lingkungan berbahan serat daun pandan kering pilihan dengan anyaman rapi dan tahan lama.',
    description: 'Tas anyaman pandan ini dibuat langsung oleh kelompok perajin wanita di Kuantan Singingi memanfaatkan daun pandan duri liar yang diproses perendaman, penjemuran, dan pewarnaan menggunakan getah dan daun alami lokal. Menghasilkan tas fungsional yang kuat, ringan, artistik, dan ramah lingkungan untuk mendukung gerakan bebas kantong plastik.',
    status: 'published',
    isDemo: true,
    featured: false,
    createdAt: '2026-03-06T15:20:00.000Z',
    updatedAt: '2026-03-06T15:20:00.000Z'
  },
  {
    id: 'prod-seed-007',
    name: 'Miniatur Candi Muara Takus Kampar (Batu Alam Pahat)',
    category: 'Kerajinan',
    productType: 'dipamerkan', // HANYA DIPAMERKAN - TIDAK DIJUAL
    price: 0,
    sellerName: 'Sentra Kriya Kampar (Demo Koleksi Disparbud Provinsi Riau)',
    sellerContact: '',
    originRegion: 'Kabupaten Kampar',
    image: '/images/products/replika-candi.svg',
    shortDescription: 'Karya seni pahat replika situs cagar budaya Candi Muara Takus dari batu alam Kampar untuk koleksi pameran kebudayaan.',
    description: 'Candi Muara Takus adalah satu-satunya kompleks peninggalan purbakala bercorak Buddhis di Provinsi Riau yang berasal dari zaman kemaharajaan Sriwijaya abad ke-7 hingga ke-12. Miniatur presisi ini dipahat dari batu pasir sungai Kampar oleh seniman kriya lokal sebagai materi pameran edukasi sejarah kebudayaan daerah Provinsi Riau. Produk ini dipamerkan sebagai aset promosi kebudayaan dan tidak untuk diperjualbelikan secara umum.',
    status: 'published',
    isDemo: true,
    featured: true,
    createdAt: '2026-03-07T08:00:00.000Z',
    updatedAt: '2026-03-07T08:00:00.000Z'
  },
  {
    id: 'prod-seed-008',
    name: 'Replika Mahakarya Perahu Baganduang Kuansing',
    category: 'Produk Unggulan Daerah',
    productType: 'dipamerkan', // HANYA DIPAMERKAN - TIDAK DIJUAL
    price: 0,
    sellerName: 'Lembaga Adat Melayu Riau & Dispar Prov. Riau (Koleksi Pameran Adat)',
    sellerContact: '',
    originRegion: 'Kabupaten Kuantan Singingi',
    image: '/images/products/perahu-baganduang.svg',
    shortDescription: 'Replika orisinil perahu adat tradisi Pacu Jalur & festival kebudayaan Sungai Kuantan dengan ukiran ornamen Melayu Riau.',
    description: 'Perahu Baganduang adalah gabungan dua atau tiga buah sampan panjang yang dirangkai sejajar dengan balai panggung megah beratap selembayung berhiaskan payung adat tiga warna (kuning, merah, putih). Tradisi ini telah diakui sebagai Warisan Budaya Takbenda (WBTb) Indonesia dari Kuansing. Replika kayu ukir ini merupakan barang koleksi display pameran kebudayaan daerah Provinsi Riau.',
    status: 'published',
    isDemo: true,
    featured: false,
    createdAt: '2026-03-08T09:30:00.000Z',
    updatedAt: '2026-03-08T09:30:00.000Z'
  }
];

// Helper: Ambil semua produk dari localStorage (atau inisialisasi dengan seed)
export function getAllProducts() {
  try {
    const raw = localStorage.getItem(PRODUCT_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(INITIAL_SEED_PRODUCTS));
      return INITIAL_SEED_PRODUCTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_SEED_PRODUCTS;
  } catch (err) {
    console.error('Gagal membaca data produk dari localStorage:', err);
    return INITIAL_SEED_PRODUCTS;
  }
}

// Helper: Ambil produk yang berstatus tampil (published) untuk halaman publik
export function getPublicProducts() {
  const all = getAllProducts();
  return all.filter(p => p.status === 'published');
}

// Helper: Ambil produk berdasarkan ID
export function getProductById(id) {
  if (!id) return null;
  const all = getAllProducts();
  return all.find(p => p.id === id) || null;
}

// Helper: Simpan (Tambah baru atau Update) produk
export function saveProduct(productData) {
  try {
    const all = getAllProducts();
    const isEdit = Boolean(productData.id && all.some(p => p.id === productData.id));
    const now = new Date().toISOString();

    let updatedList;
    let savedItem;

    if (isEdit) {
      updatedList = all.map(p => {
        if (p.id === productData.id) {
          savedItem = {
            ...p,
            ...productData,
            price: productData.productType === 'dipamerkan' ? 0 : Number(productData.price || 0),
            updatedAt: now
          };
          return savedItem;
        }
        return p;
      });
    } else {
      const newId = `prod-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
      savedItem = {
        ...productData,
        id: newId,
        price: productData.productType === 'dipamerkan' ? 0 : Number(productData.price || 0),
        status: productData.status || 'published',
        isDemo: true,
        createdAt: now,
        updatedAt: now
      };
      updatedList = [savedItem, ...all];
    }

    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(updatedList));
    return { success: true, product: savedItem };
  } catch (err) {
    console.error('Gagal menyimpan produk:', err);
    return { success: false, error: err.message };
  }
}

// Helper: Hapus produk berdasarkan ID
export function deleteProduct(id) {
  try {
    const all = getAllProducts();
    const filtered = all.filter(p => p.id !== id);
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(filtered));
    return { success: true };
  } catch (err) {
    console.error('Gagal menghapus produk:', err);
    return { success: false, error: err.message };
  }
}

// Helper: Ubah status tampil / disembunyikan
export function toggleProductVisibility(id) {
  try {
    const all = getAllProducts();
    let newStatus = 'published';
    const updated = all.map(p => {
      if (p.id === id) {
        newStatus = p.status === 'published' ? 'hidden' : 'published';
        return {
          ...p,
          status: newStatus,
          updatedAt: new Date().toISOString()
        };
      }
      return p;
    });
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(updated));
    return { success: true, newStatus };
  } catch (err) {
    console.error('Gagal mengubah status visibilitas produk:', err);
    return { success: false, error: err.message };
  }
}

// Helper: Reset data produk ke default awal
export function resetProductsToDefault() {
  try {
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(INITIAL_SEED_PRODUCTS));
    return { success: true, products: INITIAL_SEED_PRODUCTS };
  } catch (err) {
    console.error('Gagal mereset data produk:', err);
    return { success: false, error: err.message };
  }
}

// Helper: Kategori Produk yang dapat dikelola
export function getProductCategories() {
  try {
    const raw = localStorage.getItem(PRODUCT_CATEGORY_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCT_CATEGORY_KEY, JSON.stringify(EDITABLE_PRODUCT_CATEGORIES));
      return EDITABLE_PRODUCT_CATEGORIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : EDITABLE_PRODUCT_CATEGORIES;
  } catch {
    return EDITABLE_PRODUCT_CATEGORIES;
  }
}

export function saveProductCategory(newCategory) {
  try {
    const clean = (newCategory || '').trim();
    if (!clean) return { success: false, message: 'Nama kategori tidak boleh kosong.' };

    const current = getProductCategories();
    if (current.some(c => c.toLowerCase() === clean.toLowerCase())) {
      return { success: false, message: 'Kategori tersebut sudah ada.' };
    }

    const updated = [...current, clean];
    localStorage.setItem(PRODUCT_CATEGORY_KEY, JSON.stringify(updated));
    return { success: true, categories: updated };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

export function deleteProductCategory(categoryToDelete) {
  try {
    const current = getProductCategories();
    if (current.length <= 1) {
      return { success: false, message: 'Minimal harus ada 1 kategori yang tersisa.' };
    }
    const updated = current.filter(c => c !== categoryToDelete);
    localStorage.setItem(PRODUCT_CATEGORY_KEY, JSON.stringify(updated));
    return { success: true, categories: updated };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

// Helper: Format mata uang Rupiah
export function formatRupiah(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
