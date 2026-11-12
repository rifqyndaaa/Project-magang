/**
 * orgData.js — Data Struktur Organisasi DPW IFPI Provinsi Riau
 *
 * UPDATE DATA DI SINI ketika nama, foto, atau biodata pengurus diperbarui.
 * Posisi yang belum memiliki pengurus resmi dapat diisi nama: null.
 */

export const ORG_METADATA = {
  title: 'STRUKTUR ORGANISASI DPW IFPI',
  organization: 'Ikatan Fungsional Pengadaan Indonesia (IFPI)',
  province: 'PROVINSI RIAU',
  period: 'MASA BAKTI 2027–2032',
  description:
    'Struktur Organisasi Dewan Pengurus Wilayah (DPW) Ikatan Fungsional Pengadaan Indonesia Provinsi Riau Masa Bakti 2027–2032.',
};

/** Tingkat 1 — Ketua */
export const KETUA = {
  id: 'ketua-1',
  jabatan: 'KETUA',
  jabatanLengkap: 'Ketua DPW IFPI Provinsi Riau',
  nama: 'Feri Saputra, SE., M.Si',
  foto: '/images/pengurus/feri-saputra.jpg',
  level: 'ketua',
  jabatanFungsional: 'Pengelola pengadaan barang/jasa Madya',
  unitKerja: 'Biro pengadaan barang/jasa Setda Provinsi Riau',
  biodata: {
    ttl: 'Pekanbaru, 06 Nov 1978',
    domisili: 'Kota Pekanbaru',
    keluarga: 'Lima bersaudara, mempunyai 1 istri dan 3 orang anak',
    pendidikan: 'Unri program magister manajemen pemerintah daerah tahun 2004',
    dosen: 'Berprofesi sebagai dosen disalah satu universitas perguruan tinggi di Pekanbaru',
    hobi: 'Traveling, camping dan menulis, ada beberapa tulisan terkait pengadaan brg/jasa',
    karirASN: 'Mengawali karir sbg ASN pada tahun 2011 di tempatkan pada biro tata pemerintahan Setda Provinsi Riau, dan skrg Pjfa dari tahun 2017 sampai sekarang mengabdikan diri di biro pengadaan b/ja Setda provinsi Riau.',
    deskripsi:
      'Lahir Pekanbaru, 06 Nov 1978. Lima persaudara yg juga berprofesi sebagai dosen disalah satu universitas perguruan tinggi di Pekanbaru. Merupakan Unri program magister manajemen pemerintah daerah tahun 2004 mempunyai hobi traveling, camping dan menulis, ada beberapa tulisan terkait pengadaan brg/jasa. Mempunyai 1 satu istri dan 3 orang anak, dn bertempat tinggal di kota Pekanbaru, yg mengawali karir sbg ASN pada tahun 2011 di tempatkan pada biro tata pemerintahan Setda Provinsi Riau, dan skrg Pjfa dari tahun 2017 sampai sekarang mengabdikan diri di biro pengadaan b/ja Setda provinsi Riau.',
  },
};

/** Tingkat 2 — Pengurus Inti (Bendahara & Sekretaris I) */
export const PENGURUS_INTI = [
  {
    id: 'bendahara-1',
    jabatan: 'BENDAHARA',
    jabatanLengkap: 'Bendahara DPW IFPI Provinsi Riau',
    nama: 'Dewi Ledyana, ST',
    foto: null,
    level: 't2',
    biodata: {
      instansi: 'DPW IFPI Provinsi Riau',
      periode: '2027–2032',
      kompetensi: 'Pengelolaan Keuangan & Anggaran Organisasi',
      deskripsi:
        'Bertanggung jawab atas tata kelola keuangan, perbendaharaan, penyusunan anggaran kegiatan organisasi, serta akuntabilitas pelaporan keuangan DPW IFPI Provinsi Riau.',
      tugasUtama: [
        'Mengelola pembukuan dan arus kas operasional organisasi.',
        'Menyusun laporan pertanggungjawaban keuangan secara berkala.',
        'Memastikan transparansi pengelolaan dana kegiatan organisasi.',
      ],
    },
  },
  {
    id: 'sekretaris-1',
    jabatan: 'SEKRETARIS I',
    jabatanLengkap: 'Sekretaris I DPW IFPI Provinsi Riau',
    nama: 'Muh. Syahril, SE',
    foto: null,
    level: 't2',
    biodata: {
      instansi: 'DPW IFPI Provinsi Riau',
      periode: '2027–2032',
      kompetensi: 'Administrasi & Kesekretariatan Publik',
      deskripsi:
        'Bertanggung jawab dalam pengelolaan administrasi umum, tata persuratan dinas, dokumentasi arsip hukum/organisasi, serta koordinasi teknis antar-divisi di DPW IFPI Provinsi Riau.',
      tugasUtama: [
        'Mengelola tata naskah dinas dan komunikasi formal organisasi.',
        'Mengoordinasikan rapat kerja dan notulensi kepengurusan.',
        'Menjaga basis data keanggotaan fungsional pengadaan se-Riau.',
      ],
    },
  },
];

/** Tingkat 3 — Lima Divisi */
export const DIVISI = [
  {
    id: 'divisi-1',
    kode: 'DIVISI I',
    nama: 'HUKUM',
    namaLengkap: 'Divisi Hukum & Regulasi Pengadaan',
    deskripsi:
      'Menangani penelaahan regulasi daerah, konsultasi perdata/tata usaha negara, serta advokasi perlindungan profesi pengadaan.',
    anggota: [
      { id: 'div1-k', jabatan: 'Koordinator', nama: null, foto: null },
      { id: 'div1-a1', jabatan: 'Anggota 1',  nama: null, foto: null },
      { id: 'div1-a2', jabatan: 'Anggota 2',  nama: null, foto: null },
      { id: 'div1-a3', jabatan: 'Anggota 3',  nama: null, foto: null },
      { id: 'div1-a4', jabatan: 'Anggota 4',  nama: null, foto: null },
    ],
  },
  {
    id: 'divisi-2',
    kode: 'DIVISI II',
    nama: 'KESEJAHTERAAN ANGGOTA',
    namaLengkap: 'Divisi Kesejahteraan & Perlindungan Anggota',
    deskripsi:
      'Fasilitasi kesejahteraan, pendampingan moril, serta penguatan solidaritas antar-aparatur pengadaan di wilayah Riau.',
    anggota: [
      { id: 'div2-k', jabatan: 'Koordinator', nama: null, foto: null },
      { id: 'div2-a1', jabatan: 'Anggota 1',  nama: null, foto: null },
      { id: 'div2-a2', jabatan: 'Anggota 2',  nama: null, foto: null },
      { id: 'div2-a3', jabatan: 'Anggota 3',  nama: null, foto: null },
      { id: 'div2-a4', jabatan: 'Anggota 4',  nama: null, foto: null },
      { id: 'div2-a5', jabatan: 'Anggota 5',  nama: null, foto: null },
    ],
  },
  {
    id: 'divisi-3',
    kode: 'DIVISI III',
    nama: 'HUMAS DAN KEMITRAAN',
    namaLengkap: 'Divisi Hubungan Masyarakat & Kemitraan Strategis',
    deskripsi:
      'Membangun komunikasi publik, jejaring kemitraan dengan kementerian/lembaga/pemda, dan publikasi media organisasi.',
    anggota: [
      { id: 'div3-k', jabatan: 'Koordinator', nama: null, foto: null },
      { id: 'div3-a1', jabatan: 'Anggota 1',  nama: null, foto: null },
      { id: 'div3-a2', jabatan: 'Anggota 2',  nama: null, foto: null },
      { id: 'div3-a3', jabatan: 'Anggota 3',  nama: null, foto: null },
      { id: 'div3-a4', jabatan: 'Anggota 4',  nama: null, foto: null },
    ],
  },
  {
    id: 'divisi-4',
    kode: 'DIVISI IV',
    nama: 'PENGEMBANGAN PROFESI',
    namaLengkap: 'Divisi Pengembangan & Sertifikasi Profesi',
    deskripsi:
      'Peningkatan standar kompetensi, sertifikasi keahlian, pembinaan angka kredit jabatan fungsional pengadaan barang/jasa.',
    anggota: [
      { id: 'div4-k', jabatan: 'Koordinator', nama: null, foto: null },
      { id: 'div4-a1', jabatan: 'Anggota 1',  nama: null, foto: null },
      { id: 'div4-a2', jabatan: 'Anggota 2',  nama: null, foto: null },
      { id: 'div4-a3', jabatan: 'Anggota 3',  nama: null, foto: null },
      { id: 'div4-a4', jabatan: 'Anggota 4',  nama: null, foto: null },
    ],
  },
  {
    id: 'divisi-5',
    kode: 'DIVISI V',
    nama: 'DIKLAT',
    namaLengkap: 'Divisi Pendidikan & Pelatihan Pengadaan',
    deskripsi:
      'Penyelenggaraan bimbingan teknis (bimtek), workshop regulasi baru pengadaan, serta fasilitasi narasumber resmi.',
    anggota: [
      { id: 'div5-k', jabatan: 'Koordinator', nama: null, foto: null },
      { id: 'div5-a1', jabatan: 'Anggota 1',  nama: null, foto: null },
      { id: 'div5-a2', jabatan: 'Anggota 2',  nama: null, foto: null },
      { id: 'div5-a3', jabatan: 'Anggota 3',  nama: null, foto: null },
      { id: 'div5-a4', jabatan: 'Anggota 4',  nama: null, foto: null },
    ],
  },
];

/**
 * Mencari pengurus berdasarkan ID untuk halaman detail pengurus
 */
export function getMemberById(id) {
  if (!id) return null;
  const cleanId = String(id).toLowerCase();

  if (cleanId === 'ketua-1' || cleanId === 'ketua') {
    return { ...KETUA, divisionName: null };
  }

  for (const p of PENGURUS_INTI) {
    if (p.id.toLowerCase() === cleanId || p.jabatan.toLowerCase().replace(/\s+/g, '-').includes(cleanId)) {
      return { ...p, divisionName: null };
    }
  }

  for (const div of DIVISI) {
    for (const mem of div.anggota) {
      if (mem.id.toLowerCase() === cleanId) {
        return {
          ...mem,
          divisionName: `${div.kode} (${div.nama})`,
          divisionInfo: div,
          level: 'divisi',
        };
      }
    }
  }

  return null;
}

/**
 * Mendapatkan seluruh daftar pengurus
 */
export function getAllMembers() {
  const list = [
    { ...KETUA, divisionName: null },
    ...PENGURUS_INTI.map((p) => ({ ...p, divisionName: null })),
  ];

  for (const div of DIVISI) {
    for (const mem of div.anggota) {
      list.push({
        ...mem,
        divisionName: `${div.kode} (${div.nama})`,
        divisionInfo: div,
        level: 'divisi',
      });
    }
  }

  return list;
}

