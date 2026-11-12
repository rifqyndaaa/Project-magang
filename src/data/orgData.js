/**
 * orgData.js — Data Struktur Organisasi DPW IFPI Provinsi Riau
 *
 * UPDATE DATA DI SINI ketika nama pengurus sudah tersedia.
 * Gunakan null atau string kosong untuk posisi yang belum terisi.
 *
 * Format nilai string: nama lengkap beserta gelar.
 * Contoh: 'Feri Saputra, SE., M.Si'
 */

export const ORG_METADATA = {
  title: 'STRUKTUR ORGANISASI DPW IFPI',
  province: 'PROVINSI RIAU',
  period: 'MASA BAKTI 2027–2032',
};

/** Tingkat 1 — Ketua */
export const KETUA = {
  jabatan: 'KETUA',
  nama: 'Feri Saputra, SE., M.Si',
};

/** Tingkat 2 — Bendahara & Sekretaris */
export const PENGURUS_INTI = [
  {
    jabatan: 'BENDAHARA',
    nama: 'Dewi Ledyana, ST',
  },
  {
    jabatan: 'SEKRETARIS I',
    nama: 'Muh. Syahril, SE',
  },
];

/** Tingkat 3 — Lima Divisi */
export const DIVISI = [
  {
    kode: 'DIVISI I',
    nama: 'HUKUM',
    anggota: [
      { jabatan: 'Koordinator', nama: null },
      { jabatan: 'Anggota 1',   nama: null },
      { jabatan: 'Anggota 2',   nama: null },
      { jabatan: 'Anggota 3',   nama: null },
      { jabatan: 'Anggota 4',   nama: null },
    ],
  },
  {
    kode: 'DIVISI II',
    nama: 'KESEJAHTERAAN\nANGGOTA',
    anggota: [
      { jabatan: 'Koordinator', nama: null },
      { jabatan: 'Anggota 1',   nama: null },
      { jabatan: 'Anggota 2',   nama: null },
      { jabatan: 'Anggota 3',   nama: null },
      { jabatan: 'Anggota 4',   nama: null },
      { jabatan: 'Anggota 5',   nama: null },
    ],
  },
  {
    kode: 'DIVISI III',
    nama: 'HUMAS DAN\nKEMITRAAN',
    anggota: [
      { jabatan: 'Koordinator', nama: null },
      { jabatan: 'Anggota 1',   nama: null },
      { jabatan: 'Anggota 2',   nama: null },
      { jabatan: 'Anggota 3',   nama: null },
      { jabatan: 'Anggota 4',   nama: null },
    ],
  },
  {
    kode: 'DIVISI IV',
    nama: 'PENGEMBANGAN\nPROFESI',
    anggota: [
      { jabatan: 'Koordinator', nama: null },
      { jabatan: 'Anggota 1',   nama: null },
      { jabatan: 'Anggota 2',   nama: null },
      { jabatan: 'Anggota 3',   nama: null },
      { jabatan: 'Anggota 4',   nama: null },
    ],
  },
  {
    kode: 'DIVISI V',
    nama: 'DIKLAT',
    anggota: [
      { jabatan: 'Koordinator', nama: null },
      { jabatan: 'Anggota 1',   nama: null },
      { jabatan: 'Anggota 2',   nama: null },
      { jabatan: 'Anggota 3',   nama: null },
      { jabatan: 'Anggota 4',   nama: null },
    ],
  },
];

