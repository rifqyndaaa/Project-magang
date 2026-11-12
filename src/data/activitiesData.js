/**
 * DATA KEGIATAN DPW IFPI PROVINSI RIAU
 * Masa Bakti 2027–2032
 * 
 * Struktur data resmi untuk:
 * 1. Program Kerja
 * 2. Agenda Kegiatan
 * 3. Galeri Dokumentasi Foto
 */

export const PROGRAM_KERJA_DATA = [
  {
    id: 'prog-1',
    nama: 'Bimbingan Teknis & Penguatan Kapasitas JF PBJ Daerah',
    divisi: 'Divisi V — Diklat',
    divisiKode: 'div-5',
    periode: 'Triwulan I & III (Berkala)',
    status: 'Direncanakan',
    deskripsi: 'Program pelatihan berkelanjutan untuk meningkatkan kompetensi teknis, pemahaman regulasi perpres terbaru, serta tata kelola e-katalog dan mitigasi risiko pengadaan barang/jasa pemerintah.',
    tujuan: [
      'Meningkatkan pemahaman regulasi pengadaan barang/jasa bagi aparatur pengadaan se-Riau.',
      'Mempercepat penyerapan anggaran dengan pengadaan yang akuntabel dan transparan.',
      'Meningkatkan nilai Indeks Tata Kelola Pengadaan (ITKP) kabupaten/kota di Riau.'
    ],
    foto: null
  },
  {
    id: 'prog-2',
    nama: 'Klinik Konsultasi & Pendampingan Advokasi Hukum PBJ',
    divisi: 'Divisi I — Hukum',
    divisiKode: 'div-1',
    periode: 'Sepanjang Tahun 2027–2032',
    status: 'Berjalan',
    deskripsi: 'Fasilitas konsultasi preventif dan pendampingan advokasi bagi pejabat fungsional pengadaan yang menghadapi kendala hukum perdata, tata usaha negara, maupun sengketa kontrak pengadaan.',
    tujuan: [
      'Memberikan rasa aman dan perlindungan hukum bagi pejabat pengadaan berintegritas.',
      'Mencegah timbulnya maladministrasi dan tindak pidana korupsi dalam tender barang/jasa.',
      'Menyediakan media mediasi resmi dalam penyelesaian sengketa kontraktual PBJ.'
    ],
    foto: null
  },
  {
    id: 'prog-3',
    nama: 'Forum Komunikasi & Kemitraan Strategis Stakeholder PBJ',
    divisi: 'Divisi III — Humas dan Kemitraan',
    divisiKode: 'div-3',
    periode: 'Triwulan II 2027',
    status: 'Direncanakan',
    deskripsi: 'Penyelenggaraan audiensi, dialog terbuka, dan kemitraan kolaboratif antara DPW IFPI Riau dengan LKPP, APH (Kejaksaan/Kepolisian), Inspektorat Daerah, dan asosiasi penyedia jasa konstruksi.',
    tujuan: [
      'Membangun sinergi penegakan hukum preventif bersama aparat pengawas internal pemerintah (APIP).',
      'Memperkuat keterbukaan informasi publik terkait proses pengadaan di Bumi Lancang Kuning.',
      'Mendorong pemberdayaan pelaku usaha mikro, kecil, dan koperasi lokal Riau.'
    ],
    foto: null
  },
  {
    id: 'prog-4',
    nama: 'Peningkatan Kesejahteraan & Standarisasi Tukin Fungsional',
    divisi: 'Divisi II — Kesejahteraan Anggota',
    divisiKode: 'div-2',
    periode: 'Tahap Kajian 2027',
    status: 'Direncanakan',
    deskripsi: 'Penyusunan telaah akademis dan advokasi kebijakan besaran tunjangan kinerja serta insentif risiko bagi pejabat fungsional PBJ pada pemerintah provinsi dan 12 kabupaten/kota se-Riau.',
    tujuan: [
      'Mewujudkan proporsionalitas insentif berdasarkan tingkat risiko pekerjaan pengadaan.',
      'Mendorong retensi dan regenerasi aparatur fungsional pengadaan berkualitas.',
      'Meningkatkan proteksi keselamatan kerja dan kesejahteraan moril anggota.'
    ],
    foto: null
  },
  {
    id: 'prog-5',
    nama: 'Sertifikasi Keahlian PBJ Tingkat Lanjutan & Kompetensi Manajerial',
    divisi: 'Divisi IV — Pengembangan Profesi',
    divisiKode: 'div-4',
    periode: 'Triwulan IV 2027',
    status: 'Direncanakan',
    deskripsi: 'Fasilitasi uji kompetensi dan sertifikasi jenjang keahlian Pengelola Pengadaan Barang/Jasa Madya dan Utama bekerja sama dengan Badan Kepegawaian Negara dan LKPP.',
    tujuan: [
      'Memenuhi rasio ideal formasi JF PBJ jenjang Madya di seluruh OPD Pemerintah Provinsi Riau.',
      'Menyiapkan trainer dan narasumber pengadaan bersertifikat kompetensi nasional.',
      'Meningkatkan jenjang karier dan portofolio profesional pengelola pengadaan di Riau.'
    ],
    foto: null
  }
];

export const AGENDA_DATA = [
  {
    id: 'agenda-1',
    nama: 'Rapat Kerja Wilayah (Rakerwil) I DPW IFPI Provinsi Riau',
    tanggal: '24 April 2027',
    hari: 'Sabtu',
    waktu: '08.30 – 16.30 WIB',
    lokasi: 'Gedung Balai Serindit, Kompleks Kediaman Gubernur Riau, Jl. Diponegoro Pekanbaru',
    status: 'Akan Datang',
    deskripsi: 'Sidang pleno pembahasan rencana kerja lima tahun masa bakti 2027–2032, penetapan indikator kinerja organisasi, serta konsolidasi kepengurusan 10 kabupaten dan 2 kota di Riau.',
    penyelenggara: 'Sekretariat DPW IFPI Riau',
    kategori: 'Rapat Kerja'
  },
  {
    id: 'agenda-2',
    nama: 'Sosialisasi & Workshop Mitigasi Risiko Hukum Pengadaan Kontrak Konstruksi',
    tanggal: '15 Mei 2027',
    hari: 'Kamis',
    waktu: '09.00 – 15.00 WIB',
    lokasi: 'Aula Sasana Bhakti Praja, Menara Lancang Kuning Lt. 5, Kantor Gubernur Riau',
    status: 'Akan Datang',
    deskripsi: 'Bedah kasus audit pengadaan dan tata cara pendampingan hukum bersama narasumber Kejaksaan Tinggi Riau dan Biro Pengadaan Barang/Jasa Setda Provinsi Riau.',
    penyelenggara: 'Divisi I — Hukum & Divisi V — Diklat',
    kategori: 'Workshop'
  },
  {
    id: 'agenda-3',
    nama: 'Forum Koordinasi Fungsional PBJ Bersama LKPP Regional Sumatera',
    tanggal: '10 Juni 2027',
    hari: 'Rabu',
    waktu: '09.00 – 12.30 WIB',
    lokasi: 'Ballroom Hotel Pangeran Pekanbaru (Hybrid: Tatap Muka & Daring)',
    status: 'Akan Datang',
    deskripsi: 'Penyelarasan kebijakan pemanfaatan e-katalog lokal, transaksi konsolidasi pengadaan, serta digitalisasi tata kelola tender di wilayah Provinsi Riau.',
    penyelenggara: 'Divisi III — Humas dan Kemitraan',
    kategori: 'Forum Diskusi'
  }
];

export const GALERI_DATA = [
  {
    id: 'gal-1',
    judul: 'Gedung Daerah & Pusat Koordinasi Pemerintahan Provinsi Riau',
    kategori: 'Fasilitas & Wilayah',
    tanggal: '2027',
    foto: '/images/pelayanan-publik-riau.jpg',
    keterangan: 'Pusat pelayanan administrasi dan koordinasi pelaksanaan tata kelola pengadaan barang/jasa Pemerintah Provinsi Riau.'
  },
  {
    id: 'gal-2',
    judul: 'Landmark Sejarah Budaya Pemerintahan Riau — Istana Siak',
    kategori: 'Kemitraan Wilayah',
    tanggal: '2027',
    foto: '/images/istana-siak.jpg',
    keterangan: 'Simbol kearifan lokal Melayu yang mendasari semangat kejujuran, amanah, dan integritas pengadaan di Bumi Lancang Kuning.'
  }
];

