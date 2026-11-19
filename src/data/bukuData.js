/**
 * DATA BUKU & PUBLIKASI RESMI DPW IFPI PROVINSI RIAU
 *
 * Tambahkan entri baru pada array BUKU_DATA ketika katalog buku resmi
 * sudah ditetapkan oleh Sekretariat DPW IFPI Riau.
 *
 * Struktur satu entri:
 * {
 *   id: 'buku-1',
 *   judul: 'Judul Buku',
 *   penulis: 'Nama Penulis',
 *   tahun: 2026,
 *   penerbit: 'Nama Penerbit',
 *   kategori: 'Buku Saku',
 *   kategoriKode: 'saku',        // saku | monograf | artikel
 *   deskripsi: 'Ringkasan singkat isi buku.',
 *   isbn: '978-xxx-xxx-xx-x',
 *   halaman: 120,
 *   statusKetersediaan: 'Tersedia di Sekretariat',
 *   kodeBarang: 'IFPI-BKU-01',
 *   foto: null
 * }
 */
export const BUKU_DATA = [
  {
    id: 'buku-1',
    judul: 'E-Purchasing (Katalog V6): Inovasi Pengadaan di Era Digital',
    penulis: 'Feri Saputra., M.Si',
    tahun: 2026,
    penerbit: 'DPW IFPI Provinsi Riau',
    kategori: 'Monograf & Referensi',
    kategoriKode: 'monograf',
    deskripsi:
      'Kajian penerapan e-purchasing melalui Katalog Elektronik Versi 6 sebagai wujud transformasi digital pengadaan barang/jasa pemerintah, dengan telaah ketentuan Peraturan LKPP Nomor 3 Tahun 2026 dan Peraturan LKPP Nomor 2 Tahun 2026.',
    rujukanRegulasi: [
      'Peraturan LKPP Nomor 3 Tahun 2026',
      'Peraturan LKPP Nomor 2 Tahun 2026',
    ],
    isbn: null,
    halaman: null,
    statusKetersediaan: 'Tersedia di Sekretariat',
    kodeBarang: 'IFPI-BKU-01',
    foto: '/images/buku/e-purchasing-katalog-v6.jpg',
  },
  {
    id: 'buku-2',
    judul: 'Kupas Tuntas Persyaratan Teknis Tenaga Ahli (Undang-Undang Jasa Konstruksi)',
    penulis: 'Feri Saputra, M.Si.',
    tahun: null,
    penerbit: 'Dandelion Publisher',
    kategori: 'Buku Saku',
    kategoriKode: 'saku',
    deskripsi:
      'Membedah persyaratan teknis tenaga ahli di bidang jasa konstruksi sesuai Undang-Undang Jasa Konstruksi, mulai dari persoalan kurangnya ketersediaan tenaga ahli berkualitas, pemanfaatan teknologi informasi dalam penyelenggaraan jasa konstruksi, hingga dorongan partisipasi masyarakat jasa konstruksi terhadap Rancangan Peraturan Pemerintah Cipta Kerja.',
    isbn: null,
    halaman: null,
    statusKetersediaan: 'Tersedia untuk Pemesanan',
    kodeBarang: 'IFPI-BKU-02',
    foto: '/images/buku/kupas-tuntas-persyaratan-tenaga-ahli.jpg',
  },
];

/** Filter kategori katalog buku */
export const BUKU_FILTERS = [
  { id: 'all', label: 'Semua Buku' },
  { id: 'saku', label: 'Buku Saku' },
  { id: 'monograf', label: 'Monograf & Referensi' },
  { id: 'artikel', label: 'Kompilasi Artikel' },
];
