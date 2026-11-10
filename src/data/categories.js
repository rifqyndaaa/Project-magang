// Data Kategori Layanan Pengaduan Pemerintah Provinsi Riau

export const CATEGORIES = [
  {
    id: 'hukum',
    name: 'Permasalahan dan Konsultasi Hukum',
    shortName: 'Konsultasi Hukum',
    description: 'Digunakan untuk menyampaikan permasalahan hukum atau mengajukan konsultasi terkait persoalan hukum.',
    opd: 'Biro Hukum Sekretariat Daerah Provinsi Riau',
    icon: 'shield',
    services: [
      'Konsultasi Regulasi & Produk Hukum Daerah (Perda/Pergub)',
      'Konsultasi Sengketa Tata Usaha Negara & Aset Daerah',
      'Penelaahan Rancangan Dokumen Kerja Sama & Perjanjian Hukum',
      'Permohonan Fasilitasi & Bantuan Konsultasi Hukum Perdata'
    ],
    examples: [
      'Permohonan penjelasan dan kepastian isi Peraturan Gubernur Riau',
      'Konsultasi penanganan permasalahan sengketa aset pemerintah daerah',
      'Permintaan telaah yuridis rancangan kerja sama kemitraan daerah',
      'Konsultasi kepatuhan hukum atas pelaksanaan program kemasyarakatan'
    ]
  },
  {
    id: 'pengaduan',
    name: 'Konsultasi Terkait Pengaduan',
    shortName: 'Konsultasi Pengaduan',
    description: 'Digunakan untuk berkonsultasi mengenai pengaduan, meminta informasi, atau menanyakan tindak lanjut pengaduan.',
    opd: 'Inspektorat Daerah & Diskominfotik Provinsi Riau',
    icon: 'message',
    services: [
      'Konsultasi Tata Cara & Prosedur Penyampaian Aduan',
      'Konfirmasi & Klarifikasi Progres Penanganan Aduan',
      'Konsultasi Pencegahan Maladministrasi Pelayanan Publik',
      'Fasilitasi Mediasi & Klarifikasi Aduan Masyarakat'
    ],
    examples: [
      'Konsultasi tata cara dan kelengkapan bukti pengaduan pelayanan publik',
      'Klarifikasi status tindak lanjut aduan yang belum selesai diproses',
      'Konsultasi kendala dalam penanganan keluhan di unit pelayanan daerah',
      'Konsultasi mekanisme pengaduan dugaan pelanggaran kode etik aparatur'
    ]
  },
  {
    id: 'narasumber',
    name: 'Permintaan Narasumber dan Undangan',
    shortName: 'Narasumber & Undangan',
    description: 'Digunakan untuk mengajukan permintaan narasumber atau menyampaikan undangan kegiatan kepada Pemerintah Provinsi Riau.',
    opd: 'Biro Administrasi Pimpinan / BPSDM Provinsi Riau',
    icon: 'briefcase',
    services: [
      'Permohonan Narasumber Sosialisasi / Workshop / Seminar',
      'Undangan Menghadiri Acara Resmi / Audiensi / Rapat Koordinasi',
      'Permintaan Fasilitator / Tim Ahli Pelatihan Daerah',
      'Permohonan Sambutan / Keynote Speaker Pimpinan Daerah'
    ],
    examples: [
      'Permohonan narasumber ahli untuk seminar/workshop tingkat provinsi',
      'Penyampaian surat undangan menghadiri rapat koordinasi / forum kemitraan',
      'Permintaan fasilitator pelatihan peningkatan kompetensi aparatur/organisasi',
      'Permohonan audiensi dan kehadiran pimpinan daerah pada kegiatan resmi'
    ]
  }
];

// Peta kategori lama untuk menangani data arsip lama secara aman tanpa error
export const LEGACY_CATEGORY_MAP = {
  infrastruktur: 'Infrastruktur Jalan & Jembatan',
  pendidikan: 'Pendidikan & Sekolah Menengah',
  kesehatan: 'Kesehatan & Rumah Sakit Provinsi',
  lingkungan: 'Lingkungan Hidup & Kehutanan',
  perhubungan: 'Perhubungan & Transportasi',
  sosial: 'Sosial & Bantuan Kesejahteraan',
  ketenagakerjaan: 'Ketenagakerjaan & Transmigrasi',
  perkebunan: 'Perkebunan, Pertanian & Pangan',
  perizinan: 'Perizinan & Investasi Daerah',
  lainnya: 'Aspirasi & Permasalahan Lainnya',
  fasilitas: 'Fasilitas dan Infrastruktur',
  pelayanan_publik: 'Pelayanan Publik'
};

/**
 * Mengambil detail kategori dengan penanganan fallback aman untuk data lama
 */
export function getCategoryDetails(id) {
  if (!id) return null;
  const match = CATEGORIES.find(c => c.id === id || c.name === id);
  if (match) return match;

  if (LEGACY_CATEGORY_MAP[id]) {
    return {
      id,
      name: LEGACY_CATEGORY_MAP[id],
      shortName: LEGACY_CATEGORY_MAP[id],
      opd: 'OPD Terkait (Data Arsip Lama)',
      icon: 'file-check',
      isLegacy: true,
      description: 'Laporan ini menggunakan klasifikasi kategori arsip sebelum pembaruan sistem.',
      services: [],
      examples: []
    };
  }

  return {
    id,
    name: id,
    shortName: id,
    opd: 'Pemerintah Provinsi Riau',
    icon: 'file-check',
    isLegacy: true,
    description: 'Data kategori pengaduan.',
    services: [],
    examples: []
  };
}

// Daftar 12 Kabupaten / Kota di Provinsi Riau
export const RIAU_REGIONS = [
  'Kota Pekanbaru',
  'Kota Dumai',
  'Kabupaten Kampar',
  'Kabupaten Siak',
  'Kabupaten Pelalawan',
  'Kabupaten Bengkalis',
  'Kabupaten Rokan Hulu',
  'Kabupaten Rokan Hilir',
  'Kabupaten Indragiri Hulu',
  'Kabupaten Indragiri Hilir',
  'Kabupaten Kuantan Singingi',
  'Kabupaten Kepulauan Meranti'
];

export const REPORT_STATUSES = [
  { id: 'Baru', label: 'Baru Diterima', color: 'blue', desc: 'Laporan telah masuk ke sistem dan menunggu verifikasi petugas pengaduan.' },
  { id: 'Diverifikasi', label: 'Terverifikasi', color: 'purple', desc: 'Laporan telah divalidasi keabsahannya dan diteruskan ke OPD penanggung jawab.' },
  { id: 'Diproses', label: 'Sedang Diproses', color: 'orange', desc: 'OPD terkait sedang melakukan telaah teknis atau peninjauan lapangan.' },
  { id: 'Tindak Lanjut', label: 'Tindak Lanjut', color: 'indigo', desc: 'Tindakan konkret penanganan pengaduan sedang dilaksanakan di lokasi.' },
  { id: 'Selesai', label: 'Selesai', color: 'green', desc: 'Pengaduan telah selesai ditangani dengan tanggapan resmi dan dokumentasi tindak lanjut.' },
  { id: 'Ditolak', label: 'Tidak Dapat Diproses', color: 'red', desc: 'Laporan berada di luar kewenangan Pemprov Riau atau tidak memenuhi syarat verifikasi.' }
];
