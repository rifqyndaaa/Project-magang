// Data Kategori Layanan Pengaduan Resmi Ikatan Fungsional Pengadaan Indonesia (IFPI)

export const CATEGORIES = [
  {
    id: 'hukum',
    name: 'Permasalahan dan Konsultasi Hukum',
    shortName: 'Konsultasi Hukum',
    description: 'Digunakan untuk menyampaikan permasalahan hukum atau mengajukan konsultasi terkait regulasi pengadaan barang dan jasa.',
    opd: 'Bidang Advokasi & Konsultasi Hukum Pengadaan IFPI',
    icon: 'shield',
    services: [
      'Konsultasi Regulasi & Produk Hukum Pengadaan Pemerintah',
      'Konsultasi Sengketa Kontrak & Risiko Hukum Pengadaan',
      'Penelaahan Rancangan Dokumen Kerja Sama & Kontrak PBJ',
      'Permohonan Fasilitasi & Pendampingan Hukum Profesi Pengadaan'
    ],
    examples: [
      'Permohonan penjelasan dan telaah klausul Perpres Pengadaan Barang/Jasa',
      'Konsultasi penanganan permasalahan sengketa pelaksanaan kontrak pengadaan',
      'Permintaan telaah yuridis rancangan adendum kontrak pekerjaan konstruksi/jasa',
      'Konsultasi kepatuhan hukum atas mitigasi risiko hukum aparatur pengadaan'
    ]
  },
  {
    id: 'pengaduan',
    name: 'Konsultasi Terkait Pengaduan',
    shortName: 'Konsultasi Pengaduan',
    description: 'Digunakan untuk berkonsultasi mengenai pengaduan proses pengadaan, meminta klarifikasi, atau menanyakan tindak lanjut laporan.',
    opd: 'Bidang Penegakan Kode Etik & Pengaduan Profesi IFPI',
    icon: 'message',
    services: [
      'Konsultasi Tata Cara & Prosedur Penyampaian Aduan Pengadaan',
      'Konfirmasi & Klarifikasi Progres Penanganan Laporan Pengadaan',
      'Konsultasi Pencegahan Penyimpangan & Maladministrasi PBJ',
      'Fasilitasi Mediasi & Klarifikasi Etik Pelaksanaan Tugas Pengadaan'
    ],
    examples: [
      'Konsultasi tata cara dan kelengkapan bukti pengaduan pemilihan penyedia',
      'Klarifikasi status tindak lanjut aduan proses pengadaan yang belum selesai',
      'Konsultasi pencegahan benturan kepentingan dan maladministrasi di unit kerja',
      'Konsultasi mekanisme pengaduan dugaan pelanggaran kode etik pengadaan'
    ]
  },
  {
    id: 'narasumber',
    name: 'Permintaan Narasumber dan Undangan',
    shortName: 'Narasumber & Undangan',
    description: 'Digunakan untuk mengajukan permintaan narasumber ahli atau menyampaikan undangan kegiatan pelatihan dan workshop pengadaan.',
    opd: 'Bidang Pengembangan Kompetensi & Narasumber IFPI',
    icon: 'briefcase',
    services: [
      'Permohonan Narasumber Sosialisasi / Workshop / Seminar PBJ',
      'Undangan Menghadiri Acara Resmi / Rapat Koordinasi Nasional IFPI',
      'Permintaan Fasilitator / Tim Ahli Pelatihan Kompetensi Pengadaan',
      'Permohonan Sambutan / Keynote Speaker Pimpinan IFPI'
    ],
    examples: [
      'Permohonan narasumber ahli pengadaan untuk bimbingan teknis / seminar instansi',
      'Penyampaian surat undangan menghadiri forum koordinasi pengadaan barang/jasa',
      'Permintaan instruktur/fasilitator pelatihan sertifikasi kompetensi pengadaan',
      'Permohonan audiensi dan kehadiran pimpinan organisasi pada agenda resmi'
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
