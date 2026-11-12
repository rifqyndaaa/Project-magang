import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Icon from '../../shared/components/Icon';
import StatusBadge from '../../shared/components/StatusBadge';
import { CATEGORIES, REPORT_STATUSES, getCategoryDetails } from '../../data/categories';
import { getReportById, updateReportStatus, saveAdminResponse, getAdminSession } from '../../shared/services/storage';

export default function AdminDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [adminUser, setAdminUser] = useState(null);

  // Form State Status
  const [newStatus, setNewStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [statusActor, setStatusActor] = useState('');

  // Form State Response
  const [responseText, setResponseText] = useState('');
  const [responderName, setResponderName] = useState('');
  const [opdName, setOpdName] = useState('');

  // Feedback states
  const [notification, setNotification] = useState(null);

  const loadReport = () => {
    const data = getReportById(id);
    if (data) {
      setReport(data);
      setNewStatus(data.status);
      if (data.adminResponse) {
        setResponseText(data.adminResponse.message || '');
        setResponderName(data.adminResponse.responder || '');
        setOpdName(data.adminResponse.opd || '');
      } else {
        const catObj = getCategoryDetails(data.category);
        setOpdName(catObj ? catObj.opd : 'Dewan Pengurus IFPI');
      }
    }
  };

  useEffect(() => {
    const session = getAdminSession();
    if (session) {
      setAdminUser(session);
      setStatusActor(session.name || 'Petugas Verifikator');
      if (!responderName) {
        setResponderName(session.name || 'Tim Verifikator Pengaduan');
      }
    }
    loadReport();
  }, [id]);

  if (!report) {
    return (
      <div className="gov-container" style={{ padding: '3rem 0', textAlign: 'center' }}>
        <Icon name="alert-circle" size={40} color="#DC2626" />
        <h2 style={{ marginTop: '1rem', color: 'var(--neutral-800)' }}>Pengaduan Tidak Ditemukan</h2>
        <p style={{ color: 'var(--neutral-600)', marginBottom: '1.5rem' }}>
          Data pengaduan dengan identitas internal "{id}" tidak tersedia atau telah dihapus.
        </p>
        <Link to="/admin" className="gov-btn gov-btn-primary">
          <Icon name="arrow-left" size={14} />
          <span>Kembali ke Rekapitulasi</span>
        </Link>
      </div>
    );
  }

  const categoryObj = getCategoryDetails(report.category);

  // Handler Pembaruan Status
  const handleUpdateStatus = (e) => {
    e.preventDefault();
    if (!newStatus) return;

    const updated = updateReportStatus(
      report.id,
      newStatus,
      statusNote.trim() || `Status pengaduan disesuaikan menjadi ${newStatus}.`,
      statusActor.trim() || (adminUser ? adminUser.name : 'Tim Verifikator IFPI')
    );

    if (updated) {
      setReport(updated);
      setStatusNote('');
      setNotification({
        type: 'success',
        message: `Status berhasil diubah menjadi "${newStatus}" dan riwayat penanganan telah diperbarui.`
      });
      setTimeout(() => setNotification(null), 4000);
    }
  };

  // Handler Tanggapan Resmi
  const handleSaveResponse = (e) => {
    e.preventDefault();
    if (!responseText.trim()) {
      setNotification({ type: 'danger', message: 'Tuliskan uraian tanggapan resmi terlebih dahulu.' });
      return;
    }

    const updated = saveAdminResponse(
      report.id,
      responseText.trim(),
      responderName.trim() || 'Petugas Penanganan Pengaduan',
      opdName.trim() || 'Pemerintah Provinsi Riau'
    );

    if (updated) {
      setReport(updated);
      setNotification({
        type: 'success',
        message: 'Tanggapan resmi berhasil disimpan dan langsung terpublikasi di halaman pelacakan masyarakat.'
      });
      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <div className="gov-container" style={{ maxWidth: '1060px' }}>
      {/* Top Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <Link to="/admin" className="gov-btn gov-btn-outline-neutral gov-btn-sm">
          <Icon name="arrow-left" size={14} />
          <span>Kembali ke Daftar Pengaduan</span>
        </Link>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <a
            href={`/track?ticket=${report.ticketNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="gov-btn gov-btn-secondary gov-btn-sm"
            title="Buka tampilan yang dilihat oleh masyarakat di halaman tracking"
          >
            <Icon name="search" size={14} />
            <span>Lihat Tampilan Publik &rarr;</span>
          </a>
        </div>
      </div>

      {notification && (
        <div className={`gov-alert gov-alert-${notification.type}`} style={{ marginBottom: '1.25rem' }}>
          {notification.message}
        </div>
      )}

      {/* Header Pengaduan */}
      <div className="gov-card" style={{ marginBottom: '1.5rem', overflow: 'hidden' }}>
        <div className="gov-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', backgroundColor: 'var(--neutral-100)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neutral-500)', textTransform: 'uppercase' }}>
                Nomor Tiket:
              </span>
              <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '1.25rem', color: 'var(--gov-blue-dark)' }}>
                {report.ticketNumber}
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)', marginTop: '0.2rem' }}>
              Diajukan pada: {new Date(report.createdAt).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })} WIB
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--neutral-600)' }}>Status Saat Ini:</span>
            <StatusBadge status={report.status} />
          </div>
        </div>

        <div className="gov-card-body">
          <div className="gov-grid gov-grid-2" style={{ marginBottom: '1.5rem' }}>
            {/* Rincian Masalah */}
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neutral-500)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                Judul Pengaduan
              </span>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--neutral-900)', marginBottom: '0.75rem' }}>
                {report.title}
              </h2>

              <div style={{ backgroundColor: 'var(--neutral-50)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--neutral-200)', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--neutral-500)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                  Uraian Isi Pengaduan Masyarakat:
                </span>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--neutral-800)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                  {report.message}
                </p>
              </div>

              {report.image && (
                <div style={{ marginTop: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neutral-600)', display: 'block', marginBottom: '0.35rem' }}>
                    Lampiran Foto Lapangan:
                  </span>
                  <img
                    src={report.image}
                    alt="Lampiran"
                    style={{ maxWidth: '100%', maxHeight: '220px', borderRadius: '4px', border: '1px solid var(--neutral-300)' }}
                  />
                </div>
              )}
            </div>

            {/* Identitas Pelapor & Lokasi */}
            <div style={{ backgroundColor: '#F8FAFC', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--neutral-200)' }}>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--gov-blue-dark)', borderBottom: '1px solid var(--neutral-200)', paddingBottom: '0.4rem', marginBottom: '0.75rem' }}>
                Informasi Pelapor & Wilayah
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.8125rem' }}>
                <div>
                  <span style={{ color: 'var(--neutral-500)', display: 'block' }}>Nama Lengkap Pelapor:</span>
                  <strong style={{ color: 'var(--neutral-900)', fontSize: '0.875rem' }}>{report.name}</strong>
                </div>

                <div>
                  <span style={{ color: 'var(--neutral-500)', display: 'block' }}>Kontak / WhatsApp Pelapor:</span>
                  <strong style={{ color: 'var(--neutral-900)', fontSize: '0.875rem' }}>{report.contact}</strong>
                  <span style={{ fontSize: '0.7rem', color: 'var(--neutral-400)', display: 'block' }}>
                    (Hanya terlihat oleh petugas untuk verifikasi)
                  </span>
                </div>

                <div>
                  <span style={{ color: 'var(--neutral-500)', display: 'block' }}>Kategori Layanan Resmi:</span>
                  <strong style={{ color: 'var(--gov-blue-dark)' }}>
                    {categoryObj ? categoryObj.name : report.category}
                  </strong>
                  {categoryObj?.isLegacy && (
                    <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.35rem', backgroundColor: '#F1F5F9', color: '#64748B', borderRadius: '4px', marginLeft: '0.35rem' }}>
                      Arsip Lama
                    </span>
                  )}
                </div>

                {report.serviceType && (
                  <div>
                    <span style={{ color: 'var(--neutral-500)', display: 'block' }}>Pilihan Jenis Layanan:</span>
                    <strong style={{ color: 'var(--neutral-900)' }}>{report.serviceType}</strong>
                  </div>
                )}

                {report.applicantAgency && (
                  <div>
                    <span style={{ color: 'var(--neutral-500)', display: 'block' }}>Instansi Pemohon:</span>
                    <strong style={{ color: 'var(--neutral-900)' }}>{report.applicantAgency}</strong>
                  </div>
                )}

                {report.eventPurpose && (
                  <div>
                    <span style={{ color: 'var(--neutral-500)', display: 'block' }}>Tujuan / Tema Agenda:</span>
                    <strong style={{ color: 'var(--neutral-900)' }}>{report.eventPurpose}</strong>
                  </div>
                )}

                {report.eventDate && (
                  <div>
                    <span style={{ color: 'var(--neutral-500)', display: 'block' }}>Tanggal Rencana Kegiatan:</span>
                    <strong style={{ color: 'var(--neutral-900)' }}>
                      {new Date(report.eventDate).toLocaleDateString('id-ID', { dateStyle: 'long' })}
                    </strong>
                  </div>
                )}

                {report.previousTicketNumber && (
                  <div>
                    <span style={{ color: 'var(--neutral-500)', display: 'block' }}>Tiket Pengaduan Sebelumnya:</span>
                    <strong style={{ color: 'var(--gov-blue-dark)', fontFamily: 'monospace' }}>{report.previousTicketNumber}</strong>
                  </div>
                )}

                {report.relatedAgency && (
                  <div>
                    <span style={{ color: 'var(--neutral-500)', display: 'block' }}>Instansi / Unit Terkait:</span>
                    <strong style={{ color: 'var(--neutral-900)' }}>{report.relatedAgency}</strong>
                  </div>
                )}

                {report.letterAttachment && (
                  <div style={{ backgroundColor: '#EEF4FC', padding: '0.5rem 0.75rem', borderRadius: '4px', border: '1px solid var(--gov-blue-border)' }}>
                    <span style={{ color: 'var(--gov-blue-dark)', fontWeight: 700, display: 'block', fontSize: '0.75rem' }}>
                      Surat Permohonan / Undangan:
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginTop: '0.25rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--neutral-800)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        📄 {report.letterAttachment.fileName}
                      </span>
                      {report.letterAttachment.data && (
                        <a
                          href={report.letterAttachment.data}
                          download={report.letterAttachment.fileName}
                          className="gov-btn gov-btn-outline-neutral gov-btn-xs"
                          style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem' }}
                        >
                          Unduh
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <span style={{ color: 'var(--neutral-500)', display: 'block' }}>OPD Pembina Teknis:</span>
                  <span style={{ color: 'var(--gov-blue-dark)', fontWeight: 600 }}>{categoryObj ? categoryObj.opd : 'Pemprov Riau'}</span>
                </div>

                <div>
                  <span style={{ color: 'var(--neutral-500)', display: 'block' }}>Kabupaten / Kota:</span>
                  <strong style={{ color: 'var(--neutral-900)' }}>{report.region || 'Provinsi Riau'}</strong>
                </div>

                {report.locationDetail && (
                  <div>
                    <span style={{ color: 'var(--neutral-500)', display: 'block' }}>Detail Lokasi Kejadian:</span>
                    <span style={{ color: 'var(--neutral-800)' }}>{report.locationDetail}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FORM TINDAK LANJUT PETUGAS: STATUS & TANGGAPAN */}
      <div className="gov-grid gov-grid-2" style={{ marginBottom: '2rem' }}>
        {/* Kolom 1: Perbarui Status Laporan */}
        <div className="gov-card" style={{ padding: '1.5rem', borderTop: '3px solid var(--gov-blue)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--gov-blue-dark)', marginBottom: '0.5rem' }}>
            1. Perbarui Tahapan Status Laporan
          </h3>
          <p style={{ fontSize: '0.775rem', color: 'var(--neutral-500)', marginBottom: '1.25rem' }}>
            Ubah status dan berikan catatan resmi agar pelapor mengetahui progres di lapangan.
          </p>

          <form onSubmit={handleUpdateStatus}>
            <div className="gov-form-group">
              <label htmlFor="select-new-status" className="gov-label" style={{ fontSize: '0.8125rem' }}>
                Pilih Status Baru
              </label>
              <select
                id="select-new-status"
                className="gov-select"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                required
              >
                {REPORT_STATUSES.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.id} — {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="gov-form-group">
              <label htmlFor="input-status-note" className="gov-label" style={{ fontSize: '0.8125rem' }}>
                Catatan Tindakan / Keterangan Status
              </label>
              <textarea
                id="input-status-note"
                rows={3}
                className="gov-textarea"
                placeholder="Contoh: Berkas diteruskan ke tim UPTD Wilayah I untuk peninjauan teknis perbaikan jalan..."
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                required
              />
              <span className="gov-hint-text">Catatan ini akan masuk ke riwayat timeline pelapor.</span>
            </div>

            <div className="gov-form-group">
              <label htmlFor="input-status-actor" className="gov-label" style={{ fontSize: '0.8125rem' }}>
                Nama Petugas / Instansi
              </label>
              <input
                type="text"
                id="input-status-actor"
                className="gov-input"
                value={statusActor}
                onChange={(e) => setStatusActor(e.target.value)}
                placeholder="Contoh: Admin Diskominfotik / Tim PUPR"
                required
              />
            </div>

            <button type="submit" className="gov-btn gov-btn-primary" style={{ width: '100%' }} id="btn-save-status">
              <Icon name="check-circle" size={16} />
              <span>Simpan Pembaruan Status</span>
            </button>
          </form>
        </div>

        {/* Kolom 2: Berikan / Perbarui Tanggapan Resmi */}
        <div className="gov-card" style={{ padding: '1.5rem', borderTop: '3px solid var(--gov-green)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--gov-green-dark)', marginBottom: '0.5rem' }}>
            2. Tanggapan Resmi Pemerintah
          </h3>
          <p style={{ fontSize: '0.775rem', color: 'var(--neutral-500)', marginBottom: '1.25rem' }}>
            Pernyataan resmi dari instansi/OPD yang akan tampil di halaman pelacakan publik.
          </p>

          <form onSubmit={handleSaveResponse}>
            <div className="gov-form-group">
              <label htmlFor="input-opd-name" className="gov-label" style={{ fontSize: '0.8125rem' }}>
                Nama Instansi / OPD Penjawab
              </label>
              <input
                type="text"
                id="input-opd-name"
                className="gov-input"
                value={opdName}
                onChange={(e) => setOpdName(e.target.value)}
                placeholder="Contoh: Dinas PUPR-PKPP Prov. Riau"
                required
              />
            </div>

            <div className="gov-form-group">
              <label htmlFor="input-responder-name" className="gov-label" style={{ fontSize: '0.8125rem' }}>
                Pejabat / Petugas yang Menjawab
              </label>
              <input
                type="text"
                id="input-responder-name"
                className="gov-input"
                value={responderName}
                onChange={(e) => setResponderName(e.target.value)}
                placeholder="Contoh: Ir. Ahmad Zulfikar (Kabid Bina Marga)"
                required
              />
            </div>

            <div className="gov-form-group">
              <label htmlFor="input-response-text" className="gov-label" style={{ fontSize: '0.8125rem' }}>
                Uraian Tanggapan Resmi Masyarakat
              </label>
              <textarea
                id="input-response-text"
                rows={4}
                className="gov-textarea"
                placeholder="Uraikan tindak lanjut yang telah atau akan dilakukan, jadwal pekerjaan, atau penjelasan komprehensif..."
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="gov-btn gov-btn-accent" style={{ width: '100%' }} id="btn-save-response">
              <Icon name="message" size={16} />
              <span>Publikasikan Tanggapan Resmi</span>
            </button>
          </form>
        </div>
      </div>

      {/* Riwayat Timeline Lengkap */}
      <div className="gov-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--neutral-800)', borderBottom: '1px solid var(--neutral-200)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
          Riwayat Perjalanan Penanganan Laporan
        </h3>

        <div className="gov-timeline">
          {report.statusHistory && report.statusHistory.map((item, idx) => (
            <div key={idx} className="gov-timeline-item completed">
              <div className="gov-timeline-dot" />
              <div className="gov-timeline-content">
                <div className="gov-timeline-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <StatusBadge status={item.status} size="sm" />
                    <span className="gov-timeline-actor">&bull; Oleh: {item.actor}</span>
                  </div>
                  <span className="gov-timeline-date">
                    {new Date(item.timestamp).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })} WIB
                  </span>
                </div>
                <div className="gov-timeline-note">
                  {item.note}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
