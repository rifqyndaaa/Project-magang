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
  jabatanFungsional: 'Pengelola Pengadaan Barang/Jasa Madya',
  unitKerja: 'Biro Pengadaan Barang dan Jasa Setda Provinsi Riau',
  biodata: {
    ttl: 'Pekanbaru, 06 November 1978 (Zodiak Scorpio)',
    domisili: 'Kota Pekanbaru, Provinsi Riau',
    keluarga: 'Anak kelima dari lima bersaudara, berkeluarga dengan 1 orang istri dan 3 orang anak',
    pendidikan: 'Alumni Universitas Riau (UNRI), Program Studi Ilmu Politik, Konsentrasi Manajemen Pemerintahan Daerah (Lulus 4 November 2006)',
    dosen: 'Dosen di salah satu perguruan tinggi di Kota Pekanbaru',
    hobi: 'Traveling, camping, dan menulis (penulis buku serta artikel terkait pengadaan barang/jasa)',
    karirASN: 'Mengawali karir sebagai ASN pada tahun 2011 dengan penempatan pertama di Biro Tata Pemerintahan Setda Provinsi Riau sebagai Analis Tata Praja. Sejak tahun 2017 hingga sekarang, beliau mengabdikan diri di Biro Pengadaan Barang dan Jasa Setda Provinsi Riau sebagai Pengelola Pengadaan Barang/Jasa (PPBJ) Ahli Madya.',
    deskripsi:
      'Feri Saputra, SE., M.Si adalah pria berzodiak Scorpio yang lahir di Pekanbaru pada 06 November 1978, serta merupakan anak kelima dari lima bersaudara. Beliau menempuh pendidikan tinggi di Universitas Riau (UNRI) pada Program Studi Ilmu Politik dengan Konsentrasi Manajemen Pemerintahan Daerah dan menyelesaikan studinya pada tanggal 4 November 2006.\n\nSelain menjalankan tugas dan pengabdiannya sebagai Aparatur Sipil Negara (ASN), beliau juga aktif mendedikasikan ilmunya sebagai dosen di salah satu perguruan tinggi di Kota Pekanbaru. Beliau memiliki kegemaran traveling, camping, dan menulis, dengan sejumlah karya publikasi berupa buku serta artikel ilmiah seputar pengadaan barang dan jasa pemerintah.\n\nDalam kehidupan berkeluarga, beliau bertempat tinggal di Kota Pekanbaru bersama seorang istri dan dikaruniai 3 orang anak. Mengawali karir birokrasi ASN pada tahun 2011 dengan penempatan pertama pada Biro Tata Pemerintahan Sekretariat Daerah Provinsi Riau sebagai Analis Tata Praja, sejak tahun 2017 hingga sekarang beliau mendedikasikan diri di Biro Pengadaan Barang dan Jasa Setda Provinsi Riau sebagai Pengelola Pengadaan Barang/Jasa (PPBJ) Ahli Madya sekaligus dipercaya memimpin Dewan Pengurus Wilayah IFPI Provinsi Riau.',
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
    jabatan: 'SEKRETARIS',
    jabatanLengkap: 'Sekretaris DPW IFPI Provinsi Riau',
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
      { id: 'div1-k',  jabatan: 'Koordinator', nama: 'Jaime Agustian', foto: null },
      { id: 'div1-a1', jabatan: 'Anggota',     nama: 'Tri Handayani, ST', foto: null },
      { id: 'div1-a2', jabatan: 'Anggota',     nama: 'Nelda Hefni, SE', foto: null },
      { id: 'div1-a3', jabatan: 'Anggota',     nama: 'Fitri yuniar Handayani, ST', foto: null },
      { id: 'div1-a4', jabatan: 'Anggota',     nama: 'Lussy Febrianita', foto: null },
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
      { id: 'div2-k',  jabatan: 'Koordinator', nama: 'Andy Fuad, ST', foto: null },
      { id: 'div2-a1', jabatan: 'Anggota',     nama: 'Fakhrurozi Afriyansyah., M. IP', foto: null },
      { id: 'div2-a2', jabatan: 'Anggota',     nama: 'Hijra Nelvita, ST', foto: null },
      { id: 'div2-a3', jabatan: 'Anggota',     nama: 'Susi Deswita, S. Sos', foto: null },
      { id: 'div2-a4', jabatan: 'Anggota',     nama: 'Elfina, S. Sos', foto: null },
      { id: 'div2-a5', jabatan: 'Anggota',     nama: 'Romi Harjo, ST', foto: null },
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
      { id: 'div3-k',  jabatan: 'Koordinator', nama: 'Sawali, SP', foto: null },
      { id: 'div3-a1', jabatan: 'Anggota',     nama: 'Leni Surya, S. Ak', foto: null },
      { id: 'div3-a2', jabatan: 'Anggota',     nama: 'Eka Firmanedi', foto: null },
      { id: 'div3-a3', jabatan: 'Anggota',     nama: 'Yessi Nazrial, ST', foto: null },
      { id: 'div3-a4', jabatan: 'Anggota',     nama: 'Bulkeri Gultom, SE., M. Si', foto: null },
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
      { id: 'div4-k',  jabatan: 'Koordinator', nama: 'Andrian Kurniawan, S. Kom., M. Kom', foto: null },
      { id: 'div4-a1', jabatan: 'Anggota',     nama: 'Aisyah S Baranyanan, M.T., M.Si', foto: null },
      { id: 'div4-a2', jabatan: 'Anggota',     nama: 'Aliyas Mandri, ST., MM', foto: null },
      { id: 'div4-a3', jabatan: 'Anggota',     nama: 'Joni Eka Putra, ST', foto: null },
      { id: 'div4-a4', jabatan: 'Anggota',     nama: 'Zulfikar, S. Kom', foto: null },
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
      { id: 'div5-k',  jabatan: 'Koordinator', nama: 'Cihe Aprilia Bintang, ST., MT', foto: null },
      { id: 'div5-a1', jabatan: 'Anggota',     nama: 'Mohammad. Ridha', foto: null },
      { id: 'div5-a2', jabatan: 'Anggota',     nama: 'Radhian Rapani', foto: null },
      { id: 'div5-a3', jabatan: 'Anggota',     nama: 'Heriyanis, ST', foto: null },
      { id: 'div5-a4', jabatan: 'Anggota',     nama: 'Ibnu Hajar, S. Pt', foto: null },
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
          jabatanLengkap: `${mem.jabatan} ${div.namaLengkap}`,
          divisionInfo: div,
          level: 'divisi',
          biodata: mem.biodata || {
            instansi: 'DPW IFPI Provinsi Riau',
            periode: '2027–2032',
            deskripsi: `${mem.nama} bertugas sebagai ${mem.jabatan} pada ${div.namaLengkap} di Dewan Pengurus Wilayah (DPW) Ikatan Fungsional Pengadaan Indonesia (IFPI) Provinsi Riau Masa Bakti 2027–2032.\n\n${div.deskripsi}`,
          },
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
        jabatanLengkap: `${mem.jabatan} ${div.namaLengkap}`,
        divisionInfo: div,
        level: 'divisi',
      });
    }
  }

  return list;
}

