// Layanan Penyimpanan Prototype (localStorage)
// Portal Pengaduan Masyarakat Pemerintah Provinsi Riau

import { generateTicketNumber } from './ticket';
import { getCategoryDetails } from '../data/categories';

const STORAGE_KEY = 'riau_pengaduan_reports_v1';
const ADMIN_AUTH_KEY = 'riau_pengaduan_admin_session_v1';

// Data Awal Contoh Realistis untuk 3 Kategori Resmi Pemprov Riau
const INITIAL_SEED_REPORTS = [
  {
    id: 'rep-seed-001',
    ticketNumber: 'Riau-2026-000001',
    name: 'Budi Santoso, S.H.',
    contact: '081275889012',
    title: 'Konsultasi Penelaahan Peraturan Gubernur Mengenai Retribusi Daerah',
    category: 'hukum',
    serviceType: 'Konsultasi Regulasi & Produk Hukum Daerah (Perda/Pergub)',
    region: 'Kabupaten Siak',
    locationDetail: 'Kecamatan Tualang, Kabupaten Siak',
    location: 'Kabupaten Siak (Kecamatan Tualang)',
    message: 'Kami dari pengurus asosiasi masyarakat memohon fasilitasi konsultasi dan penelaahan regulasi teknis terkait penerapan Peraturan Gubernur mengenai retribusi pemanfaatan fasilitas daerah agar selaras dengan ketentuan perundang-undangan terbaru.',
    image: null,
    status: 'Diproses',
    createdAt: '2026-03-12T08:30:00.000Z',
    updatedAt: '2026-03-13T10:15:00.000Z',
    adminResponse: {
      responder: 'H. Zulkifli, S.H., M.H. (Analis Hukum Ahli Madya)',
      opd: 'Biro Hukum Sekretariat Daerah Provinsi Riau',
      respondedAt: '2026-03-13T10:15:00.000Z',
      message: 'Permohonan konsultasi telah kami telaah. Tim Bagian Perundang-undangan Biro Hukum Setda Prov. Riau telah menjadwalkan sesi telaah daring/tatap muka pada hari Selasa mendatang untuk membedah pasal-pasal teknis yang dimaksud.'
    },
    statusHistory: [
      {
        status: 'Baru',
        timestamp: '2026-03-12T08:30:00.000Z',
        note: 'Permohonan konsultasi hukum masuk melalui portal pelayanan publik.',
        actor: 'Sistem'
      },
      {
        status: 'Diverifikasi',
        timestamp: '2026-03-12T11:00:00.000Z',
        note: 'Verifikasi kelengkapan materi hukum oleh verifikator Diskominfotik & Biro Hukum.',
        actor: 'Admin Pengaduan Pemprov Riau'
      },
      {
        status: 'Diproses',
        timestamp: '2026-03-13T10:15:00.000Z',
        note: 'Disposisi ke Tim Analis Produk Hukum Daerah Biro Hukum Setda Provinsi Riau.',
        actor: 'Biro Hukum Setda Prov. Riau'
      }
    ]
  },
  {
    id: 'rep-seed-002',
    ticketNumber: 'Riau-2026-000002',
    name: 'Siti Aminah',
    contact: '085265431290',
    title: 'Konsultasi Tata Cara Pengaduan dan Verifikasi Bukti Pelayanan Publik',
    category: 'pengaduan',
    serviceType: 'Konsultasi Tata Cara & Prosedur Penyampaian Aduan',
    region: 'Kabupaten Kampar',
    locationDetail: 'Desa Tarai Bangun, Kecamatan Tambang, Kab. Kampar',
    location: 'Kabupaten Kampar (Desa Tarai Bangun, Kec. Tambang)',
    message: 'Membutuhkan konsultasi mengenai mekanisme dan syarat bukti pendukung laporan pengaduan administrasi publik daerah agar dapat diproses dan ditindaklanjuti secara efektif oleh aparat pengawas internal pemerintah.',
    image: null,
    status: 'Selesai',
    createdAt: '2026-02-20T09:15:00.000Z',
    updatedAt: '2026-03-01T14:20:00.000Z',
    adminResponse: {
      responder: 'Tim Pengelola Pengaduan Masyarakat (Inspektorat Pembantu)',
      opd: 'Inspektorat Daerah & Diskominfotik Provinsi Riau',
      respondedAt: '2026-03-01T14:20:00.000Z',
      message: 'Konsultasi telah selesai diberikan melalui koordinasi telepon resmi dan email petunjuk teknis. Pemohon telah memahami format dokumen kronologi serta lampiran bukti yang dipersyaratkan.'
    },
    statusHistory: [
      {
        status: 'Baru',
        timestamp: '2026-02-20T09:15:00.000Z',
        note: 'Laporan permohonan konsultasi pengaduan diterima sistem.',
        actor: 'Sistem'
      },
      {
        status: 'Diverifikasi',
        timestamp: '2026-02-21T08:00:00.000Z',
        note: 'Substansi konsultasi pengaduan dikonfirmasi oleh verifikator.',
        actor: 'Admin Pengaduan Pemprov Riau'
      },
      {
        status: 'Tindak Lanjut',
        timestamp: '2026-02-25T11:30:00.000Z',
        note: 'Penyampaian panduan teknis dan mediasi konsultasi oleh Inspektorat Daerah.',
        actor: 'Inspektorat Daerah Prov. Riau'
      },
      {
        status: 'Selesai',
        timestamp: '2026-03-01T14:20:00.000Z',
        note: 'Konsultasi pengaduan tuntas diselesaikan dengan berita acara penanganan.',
        actor: 'Inspektorat Daerah Prov. Riau'
      }
    ]
  },
  {
    id: 'rep-seed-003',
    ticketNumber: 'Riau-2026-000003',
    name: 'Hendri Kurniawan, M.Si',
    contact: '081371220944',
    title: 'Permohonan Narasumber Sosialisasi Kebijakan SPBE bagi Forum OPD',
    category: 'narasumber',
    serviceType: 'Permohonan Narasumber Sosialisasi / Workshop / Seminar',
    region: 'Kota Pekanbaru',
    locationDetail: 'Pekanbaru Convention Hall, Kota Pekanbaru',
    location: 'Kota Pekanbaru (Pekanbaru Convention Hall)',
    message: 'Kami mengundang perwakilan pejabat Pemerintah Provinsi Riau sebagai narasumber dalam seminar forum koordinasi implementasi Sistem Pemerintahan Berbasis Elektronik (SPBE) terpadu di Provinsi Riau.',
    image: null,
    status: 'Tindak Lanjut',
    createdAt: '2026-03-14T07:45:00.000Z',
    updatedAt: '2026-03-15T09:00:00.000Z',
    adminResponse: {
      responder: 'Bagian Keprotokolan & Komunikasi Pimpinan',
      opd: 'Biro Administrasi Pimpinan / BPSDM Provinsi Riau',
      respondedAt: '2026-03-15T09:00:00.000Z',
      message: 'Surat permohonan narasumber telah diteruskan ke pimpinan. Telah ditunjuk pejabat pranata komputer ahli madya untuk menjadi pemateri, jadwal dan konfirmasi kehadiran resmi telah dikirim ke panitia.'
    },
    statusHistory: [
      {
        status: 'Baru',
        timestamp: '2026-03-14T07:45:00.000Z',
        note: 'Permohonan narasumber terdaftar dalam sistem layanan publik.',
        actor: 'Sistem'
      },
      {
        status: 'Diverifikasi',
        timestamp: '2026-03-14T09:20:00.000Z',
        note: 'Dokumen kerangka acuan kegiatan (TOR) diverifikasi oleh Biro Adpim.',
        actor: 'Admin Pengaduan Pemprov Riau'
      },
      {
        status: 'Tindak Lanjut',
        timestamp: '2026-03-15T09:00:00.000Z',
        note: 'Koordinasi pemateri dan konfirmasi kehadiran resmi kepada pengundang.',
        actor: 'Biro Administrasi Pimpinan'
      }
    ]
  },
  {
    id: 'rep-seed-004',
    ticketNumber: 'Riau-2026-000004',
    name: 'Wahyudi R., S.H.',
    contact: '082169874451',
    title: 'Konsultasi Penelaahan Draf Nota Kesepakatan Sinergi Antar-Lembaga',
    category: 'hukum',
    serviceType: 'Penelaahan Rancangan Dokumen Kerja Sama & Perjanjian Hukum',
    region: 'Kabupaten Bengkalis',
    locationDetail: 'Jl. Antara No. 45, Bengkalis',
    location: 'Kabupaten Bengkalis (Jl. Antara No. 45)',
    message: 'Memohon fasilitasi review yuridis atas rancangan nota kesepakatan kemitraan pengabdian masyarakat daerah guna memastikan kesesuaian klausul dengan regulasi hukum pemerintahan daerah.',
    image: null,
    status: 'Baru',
    createdAt: '2026-03-16T14:10:00.000Z',
    updatedAt: '2026-03-16T14:10:00.000Z',
    adminResponse: null,
    statusHistory: [
      {
        status: 'Baru',
        timestamp: '2026-03-16T14:10:00.000Z',
        note: 'Pengajuan telaah draf kerja sama masuk dan menunggu telaah awal Biro Hukum.',
        actor: 'Sistem'
      }
    ]
  }
];

/**
 * Normalisasi data laporan lama atau tidak lengkap agar aman dari null/undefined
 */
function normalizeReport(item) {
  if (!item || typeof item !== 'object') return null;

  const reg = item.region ? item.region.trim() : '';
  const locDet = item.locationDetail ? item.locationDetail.trim() : '';
  let locStr = item.location || '';
  if (!locStr) {
    if (reg && locDet) locStr = `${reg} (${locDet})`;
    else if (reg) locStr = reg;
    else if (locDet) locStr = locDet;
    else locStr = 'Provinsi Riau';
  }

  return {
    id: item.id || `rep-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    ticketNumber: item.ticketNumber || 'Riau-2026-000000',
    name: item.name || 'Masyarakat',
    contact: item.contact || '-',
    title: item.title || 'Laporan Layanan',
    category: item.category || 'hukum',
    serviceType: item.serviceType || '',
    relatedAgency: item.relatedAgency || '',
    previousTicketNumber: item.previousTicketNumber || '',
    applicantAgency: item.applicantAgency || '',
    eventPurpose: item.eventPurpose || '',
    eventDate: item.eventDate || '',
    letterAttachment: item.letterAttachment || null,
    region: reg || 'Provinsi Riau',
    locationDetail: locDet || '',
    location: locStr,
    message: item.message || '',
    image: item.image || null,
    status: item.status || 'Baru',
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: item.updatedAt || item.createdAt || new Date().toISOString(),
    adminResponse: item.adminResponse || null,
    statusHistory: Array.isArray(item.statusHistory) ? item.statusHistory : [
      {
        status: item.status || 'Baru',
        timestamp: item.createdAt || new Date().toISOString(),
        note: 'Laporan dicatat dalam sistem.',
        actor: 'Sistem'
      }
    ]
  };
}

/**
 * Mengambil semua laporan dari localStorage dengan fallback data awal
 */
export function getAllReports() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Inisialisasi awal jika belum ada data
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_REPORTS));
      return [...INITIAL_SEED_REPORTS];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_REPORTS));
      return [...INITIAL_SEED_REPORTS];
    }
    return parsed.map(normalizeReport).filter(Boolean);
  } catch (error) {
    console.warn('Gagal membaca laporan dari localStorage:', error);
    return [...INITIAL_SEED_REPORTS];
  }
}

/**
 * Mengambil laporan berdasarkan ID unik internal
 */
export function getReportById(id) {
  if (!id) return null;
  const reports = getAllReports();
  return reports.find(r => r.id === id) || null;
}

/**
 * Mencari laporan berdasarkan nomor tiket resmi
 */
export function getReportByTicket(ticketNumber) {
  if (!ticketNumber || typeof ticketNumber !== 'string') return null;
  const cleanTicket = ticketNumber.trim().toLowerCase();
  const reports = getAllReports();
  return reports.find(r => r.ticketNumber.toLowerCase() === cleanTicket) || null;
}

/**
 * Mengambil data laporan publik (privasi aman: data pribadi pelapor disembunyikan)
 */
export function getPublicReportByTicket(ticketNumber) {
  const report = getReportByTicket(ticketNumber);
  if (!report) return null;

  // Sanitasi data privasi untuk halaman tracking publik
  return {
    ticketNumber: report.ticketNumber,
    title: report.title,
    category: report.category,
    serviceType: report.serviceType || '',
    relatedAgency: report.relatedAgency || '',
    previousTicketNumber: report.previousTicketNumber || '',
    applicantAgency: report.applicantAgency || '',
    eventPurpose: report.eventPurpose || '',
    eventDate: report.eventDate || '',
    letterAttachment: report.letterAttachment || null,
    region: report.region,
    locationDetail: report.locationDetail,
    location: report.location,
    message: report.message,
    image: report.image,
    status: report.status,
    createdAt: report.createdAt,
    updatedAt: report.updatedAt,
    adminResponse: report.adminResponse,
    statusHistory: report.statusHistory
  };
}

/**
 * Menyimpan laporan pengaduan baru dari formulir masyarakat
 */
export function saveReport(reportData) {
  const existingReports = getAllReports();
  const now = new Date();
  const ticketNumber = generateTicketNumber(existingReports, now);
  const newId = `rep-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  const reg = reportData.region ? reportData.region.trim() : '';
  const locDet = reportData.locationDetail ? reportData.locationDetail.trim() : '';
  let locStr = 'Provinsi Riau';
  if (reg && locDet) locStr = `${reg} (${locDet})`;
  else if (reg) locStr = reg;
  else if (locDet) locStr = locDet;

  const newReport = {
    id: newId,
    ticketNumber,
    name: reportData.name.trim(),
    contact: reportData.contact.trim(),
    title: reportData.title.trim(),
    category: reportData.category,
    serviceType: reportData.serviceType ? reportData.serviceType.trim() : (getCategoryDetails(reportData.category)?.name || ''),
    relatedAgency: reportData.relatedAgency ? reportData.relatedAgency.trim() : '',
    previousTicketNumber: reportData.previousTicketNumber ? reportData.previousTicketNumber.trim() : '',
    applicantAgency: reportData.applicantAgency ? reportData.applicantAgency.trim() : '',
    eventPurpose: reportData.eventPurpose ? reportData.eventPurpose.trim() : '',
    eventDate: reportData.eventDate ? reportData.eventDate.trim() : '',
    letterAttachment: reportData.letterAttachment || null,
    region: reg || 'Provinsi Riau',
    locationDetail: locDet,
    location: locStr,
    message: reportData.message.trim(),
    image: reportData.image || null,
    status: 'Baru',
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    adminResponse: null,
    statusHistory: [
      {
        status: 'Baru',
        timestamp: now.toISOString(),
        note: 'Laporan pengaduan berhasil didaftarkan oleh masyarakat ke sistem.',
        actor: 'Pelapor (Masyarakat)'
      }
    ]
  };

  const updatedReports = [newReport, ...existingReports];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReports));
  } catch (error) {
    console.error('Gagal menyimpan laporan ke localStorage:', error);
  }

  return newReport;
}

/**
 * Memperbarui status laporan dan mencatat riwayat perubahan
 */
export function updateReportStatus(id, newStatus, note = '', actor = 'Petugas Pemprov Riau') {
  const reports = getAllReports();
  const index = reports.findIndex(r => r.id === id);
  if (index === -1) return null;

  const now = new Date().toISOString();
  const current = reports[index];

  const newHistoryItem = {
    status: newStatus,
    timestamp: now,
    note: note || `Status laporan diubah menjadi ${newStatus}.`,
    actor
  };

  const updatedReport = {
    ...current,
    status: newStatus,
    updatedAt: now,
    statusHistory: [newHistoryItem, ...(current.statusHistory || [])]
  };

  reports[index] = updatedReport;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  } catch (e) {
    console.error('Gagal memperbarui status laporan:', e);
  }

  return updatedReport;
}

/**
 * Menyimpan tanggapan resmi petugas / OPD
 */
export function saveAdminResponse(id, responseText, responderName, opdName) {
  const reports = getAllReports();
  const index = reports.findIndex(r => r.id === id);
  if (index === -1) return null;

  const now = new Date().toISOString();
  const current = reports[index];

  const adminResponse = {
    responder: responderName || 'Petugas Verifikator',
    opd: opdName || 'Pemerintah Provinsi Riau',
    respondedAt: now,
    message: responseText.trim()
  };

  const updatedReport = {
    ...current,
    updatedAt: now,
    adminResponse
  };

  reports[index] = updatedReport;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  } catch (e) {
    console.error('Gagal menyimpan tanggapan admin:', e);
  }

  return updatedReport;
}

/**
 * Menghitung ringkasan statistik laporan
 */
export function getReportStats() {
  const reports = getAllReports();
  const total = reports.length;
  const baru = reports.filter(r => r.status === 'Baru').length;
  const diverifikasi = reports.filter(r => r.status === 'Diverifikasi').length;
  const diproses = reports.filter(r => r.status === 'Diproses').length;
  const tindakLanjut = reports.filter(r => r.status === 'Tindak Lanjut').length;
  const selesai = reports.filter(r => r.status === 'Selesai').length;
  const ditolak = reports.filter(r => r.status === 'Ditolak').length;

  return {
    total,
    baru,
    diverifikasi,
    diproses,
    tindakLanjut,
    selesai,
    ditolak,
    dalamProses: diverifikasi + diproses + tindakLanjut
  };
}

/**
 * Filter dan pencarian laporan untuk admin
 */
export function filterReports({ query = '', status = '', category = '', region = '' }) {
  const reports = getAllReports();
  const q = query.trim().toLowerCase();

  return reports.filter(report => {
    // Filter status
    if (status && report.status !== status) return false;
    // Filter kategori
    if (category && report.category !== category) return false;
    // Filter wilayah
    if (region && report.region !== region) return false;

    // Filter teks
    if (q) {
      const matchTicket = report.ticketNumber.toLowerCase().includes(q);
      const matchTitle = report.title.toLowerCase().includes(q);
      const matchName = report.name.toLowerCase().includes(q);
      const matchContact = report.contact.toLowerCase().includes(q);
      const matchLoc = (report.location || '').toLowerCase().includes(q);
      return matchTicket || matchTitle || matchName || matchContact || matchLoc;
    }

    return true;
  });
}

/**
 * Ekspor laporan ke format file CSV (dijalankan di browser)
 */
export function exportReportsToCSV(reportsToExport) {
  const reports = Array.isArray(reportsToExport) ? reportsToExport : getAllReports();

  const headers = [
    'Nomor Tiket',
    'Tanggal Lapor',
    'Status',
    'Kategori Layanan',
    'Pilihan Layanan',
    'Wilayah',
    'Judul Permohonan/Pengaduan',
    'Nama Pelapor',
    'Kontak Pelapor',
    'Detail Alamat',
    'Isi Uraian',
    'Tanggapan Petugas'
  ];

  const escapeCSV = (str) => {
    if (str === null || str === undefined) return '""';
    const s = String(str).replace(/"/g, '""');
    return `"${s}"`;
  };

  const rows = reports.map(r => {
    const catDetails = getCategoryDetails(r.category);
    return [
      escapeCSV(r.ticketNumber),
      escapeCSV(new Date(r.createdAt).toLocaleString('id-ID')),
      escapeCSV(r.status),
      escapeCSV(catDetails ? catDetails.name : r.category),
      escapeCSV(r.serviceType || '-'),
      escapeCSV(r.region),
      escapeCSV(r.title),
      escapeCSV(r.name),
      escapeCSV(r.contact),
      escapeCSV(r.locationDetail),
      escapeCSV(r.message),
      escapeCSV(r.adminResponse ? r.adminResponse.message : '')
    ];
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Rekap_Pengaduan_Pemprov_Riau_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Simulasi Autentikasi Admin Sederhana (Prototype localStorage)
export function getAdminSession() {
  try {
    const session = localStorage.getItem(ADMIN_AUTH_KEY);
    return session ? JSON.parse(session) : null;
  } catch {
    return null;
  }
}

export function loginAdmin(username, password) {
  // Prototype credentials: admin / riauberkah2026 atau petugas / riau2026
  const cleanU = (username || '').trim();
  const cleanP = (password || '').trim();

  if (
    (cleanU === 'admin' && cleanP === 'admin123') ||
    (cleanU === 'petugas' && cleanP === 'riau2026') ||
    (cleanU === 'admin' && cleanP === 'riauberkah2026')
  ) {
    const user = {
      username: cleanU,
      name: cleanU === 'admin' ? 'Administrator Utama' : 'Petugas Verifikator Diskominfo',
      role: cleanU === 'admin' ? 'Super Admin' : 'Petugas OPD',
      opd: 'Dinas Komunikasi, Informatika dan Statistik Prov. Riau',
      loggedInAt: new Date().toISOString()
    };
    localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(user));
    return { success: true, user };
  }

  return {
    success: false,
    message: 'Nama pengguna atau kata sandi tidak cocok. Silakan gunakan kredensial prototype yang tertera.'
  };
}

export function logoutAdmin() {
  localStorage.removeItem(ADMIN_AUTH_KEY);
}
