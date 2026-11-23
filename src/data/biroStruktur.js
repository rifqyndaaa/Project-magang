/**
 * biroStruktur.js — Data Struktur Organisasi Biro Pengadaan Barang dan Jasa
 * Sekretariat Daerah Provinsi Riau.
 *
 * TERPISAH dari struktur kepengurusan DPW IFPI Riau (lihat orgData.js).
 * Hanya memuat tiga posisi yang ditampilkan di Beranda:
 *   1. Kepala Biro (puncak)
 *   2. Dua kepala bagian/unit yang sejajar di bawahnya
 *
 * Aturan pengisian:
 *  - Isi `nama` bila sudah pasti pejabatnya. Bila belum, biarkan null —
 *    kartu akan menampilkan keterangan "Belum diisi" (tidak dikarang).
 *  - `foto` opsional; bila null, kartu memakai inisial nama.
 */

export const BIRO_METADATA = {
  nama: 'Biro Pengadaan Barang dan Jasa',
  induk: 'Sekretariat Daerah Provinsi Riau',
  website: 'https://biropbj.riau.go.id/',
  catatanSumber: 'Sumber acuan: SOTK Setda Provinsi Riau & biropbj.riau.go.id',
};

/** Posisi puncak — Kepala Biro PBJ Setdaprov Riau. */
export const KEPALA_BIRO = {
  id: 'biro-kabiro',
  jabatan: 'KEPALA BIRO',
  nama: 'Zulfahmi, S.T., M.T.',
  foto: '/images/pejabat/zulfahmi.jpg',
  jabatanFungsional: null,
  unitKerja: 'Biro Pengadaan Barang dan Jasa Setda Provinsi Riau',
};

/** Dua posisi sejajar di bawah Kepala Biro. */
export const BAGIAN = [
  {
    id: 'biro-bag-pengelolaan',
    jabatan: 'KEPALA BAGIAN',
    nama: null,
    foto: null,
    unit: 'Bagian Pengelolaan Pengadaan Barang dan Jasa',
    keterangan: 'Pengelolaan & pelaksanaan pengadaan barang/jasa',
  },
  {
    id: 'biro-subbag-pembinaan',
    jabatan: 'KEPALA SUBBAGIAN',
    nama: null,
    foto: null,
    unit: 'Subbagian Pembinaan Kelembagaan & Advokasi PBJ',
    keterangan: 'Pembinaan kelembagaan, SDM, LPSE, dan advokasi',
  },
];
