import { useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import Breadcrumbs from '../../../shared/components/Breadcrumbs';
import Icon from '../../../shared/components/Icon';
import StatusBadge from '../../../shared/components/StatusBadge';
import { getCategoryDetails } from '../../../data/categories';

export default function Success() {
  const location = useLocation();
  const report = location.state?.report;
  const [copied, setCopied] = useState(false);

  // Jika diakses langsung tanpa state laporan, arahkan ke halaman track
  if (!report) {
    return <Navigate to="/track" replace />;
  }

  const categoryObj = getCategoryDetails(report.category);

  const handleCopyTicket = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(report.ticketNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Laporan Berhasil' }]} />

      <section style={{ padding: '3rem 0', backgroundColor: 'var(--neutral-50)' }}>
        <div className="gov-container" style={{ maxWidth: '780px' }}>
          {/* Card Sukses */}
          <div className="gov-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                backgroundColor: 'var(--gov-green-soft)',
                color: 'var(--gov-green)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                border: '2px solid var(--gov-green)'
              }}
            >
              <Icon name="check" size={36} color="var(--gov-green)" />
            </div>

            <span className="gov-section-tag" style={{ color: 'var(--gov-green)' }}>TANDA TERIMA PENDAFTARAN</span>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--neutral-900)', marginBottom: '0.5rem' }}>
              Pengaduan Anda Berhasil Diterima
            </h1>
            <p style={{ color: 'var(--neutral-600)', fontSize: '0.9375rem', maxWidth: '580px', margin: '0 auto 1.75rem auto' }}>
              Terima kasih atas pengajuan Anda. Laporan permohonan telah tercatat resmi di dalam sistem Ikatan Fungsional Pengadaan Indonesia (IFPI) dan akan segera diproses oleh tim verifikator terkait.
            </p>

            {/* Kotak Nomor Tiket */}
            <div
              style={{
                backgroundColor: 'var(--gov-blue-soft)',
                border: '2px dashed var(--gov-blue)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                margin: '0 auto 2rem auto',
                maxWidth: '520px'
              }}
            >
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--gov-blue-dark)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                NOMOR TIKET RESMI ANDA
              </div>
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '1.875rem',
                  fontWeight: 800,
                  color: 'var(--gov-blue-dark)',
                  letterSpacing: '1px',
                  marginBottom: '0.75rem'
                }}
              >
                {report.ticketNumber}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={handleCopyTicket}
                  className="gov-btn gov-btn-primary gov-btn-sm"
                  id="btn-copy-ticket"
                >
                  <Icon name={copied ? 'check' : 'file-check'} size={14} />
                  <span>{copied ? 'Nomor Tiket Disalin!' : 'Salin Nomor Tiket'}</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="gov-btn gov-btn-outline-neutral gov-btn-sm"
                >
                  <Icon name="download" size={14} />
                  <span>Cetak Tanda Terima</span>
                </button>
              </div>
            </div>

            {/* Rincian Ringkas Bukti Laporan */}
            <div style={{ textAlign: 'left', backgroundColor: '#FFFFFF', border: '1px solid var(--neutral-200)', borderRadius: 'var(--radius-sm)', padding: '1.25rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--neutral-800)', borderBottom: '1px solid var(--neutral-200)', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
                Ringkasan Pengaduan
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--neutral-200)', paddingBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--neutral-500)' }}>Status Saat Ini:</span>
                  <StatusBadge status={report.status} size="sm" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--neutral-200)', paddingBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--neutral-500)' }}>Judul Laporan:</span>
                  <span style={{ fontWeight: 600, color: 'var(--neutral-900)', textAlign: 'right', maxWidth: '60%' }}>{report.title}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--neutral-200)', paddingBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--neutral-500)' }}>Kategori Layanan:</span>
                  <span style={{ fontWeight: 600, color: 'var(--gov-blue-dark)' }}>
                    {categoryObj ? categoryObj.name : report.category}
                    {categoryObj?.isLegacy && ' (Data Arsip)'}
                  </span>
                </div>
                {report.serviceType && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--neutral-200)', paddingBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--neutral-500)' }}>Jenis Layanan:</span>
                    <span style={{ fontWeight: 600, color: 'var(--neutral-900)', textAlign: 'right', maxWidth: '65%' }}>
                      {report.serviceType}
                    </span>
                  </div>
                )}
                {categoryObj?.opd && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--neutral-200)', paddingBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--neutral-500)' }}>OPD Penanggung Jawab:</span>
                    <span style={{ fontWeight: 600, color: 'var(--neutral-800)', textAlign: 'right', maxWidth: '65%' }}>
                      {categoryObj.opd}
                    </span>
                  </div>
                )}
                {report.applicantAgency && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--neutral-200)', paddingBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--neutral-500)' }}>Instansi Pemohon:</span>
                    <span style={{ fontWeight: 600, color: 'var(--neutral-900)' }}>{report.applicantAgency}</span>
                  </div>
                )}
                {report.eventPurpose && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--neutral-200)', paddingBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--neutral-500)' }}>Agenda Kegiatan:</span>
                    <span style={{ fontWeight: 600, color: 'var(--neutral-900)', textAlign: 'right', maxWidth: '65%' }}>{report.eventPurpose}</span>
                  </div>
                )}
                {report.previousTicketNumber && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--neutral-200)', paddingBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--neutral-500)' }}>Tiket Sebelumnya:</span>
                    <span style={{ fontWeight: 600, color: 'var(--gov-blue-dark)', fontFamily: 'monospace' }}>{report.previousTicketNumber}</span>
                  </div>
                )}
                {report.relatedAgency && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--neutral-200)', paddingBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--neutral-500)' }}>Instansi Terkait:</span>
                    <span style={{ fontWeight: 600, color: 'var(--neutral-900)', textAlign: 'right', maxWidth: '65%' }}>{report.relatedAgency}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--neutral-200)', paddingBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--neutral-500)' }}>Wilayah / Lokasi:</span>
                  <span style={{ fontWeight: 600, color: 'var(--neutral-900)' }}>{report.region || 'Provinsi Riau'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.2rem' }}>
                  <span style={{ color: 'var(--neutral-500)' }}>Waktu Pendaftaran:</span>
                  <span style={{ color: 'var(--neutral-700)' }}>
                    {new Date(report.createdAt).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })} WIB
                  </span>
                </div>
              </div>
            </div>

            {/* Petunjuk Langkah Selanjutnya */}
            <div className="gov-alert gov-alert-warning" style={{ textAlign: 'left', fontSize: '0.8125rem' }}>
              <strong>Langkah Selanjutnya:</strong>
              <ol style={{ paddingLeft: '1.25rem', marginTop: '0.25rem', lineHeight: 1.5 }}>
                <li>Catat atau simpan nomor tiket Anda di tempat yang aman.</li>
                <li>Petugas verifikator Diskominfotik Prov. Riau akan memvalidasi laporan maksimal 1x24 jam kerja.</li>
                <li>Gunakan menu <strong>Lacak Status Tiket</strong> kapan saja untuk melihat telaah teknis dan dokumentasi tindak lanjut OPD di lokasi.</li>
              </ol>
            </div>

            {/* Tombol Aksi */}
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem' }}>
              <Link
                to={`/track?ticket=${report.ticketNumber}`}
                className="gov-btn gov-btn-accent"
                id="btn-success-goto-track"
              >
                <Icon name="search" size={16} />
                <span>Pantau Pengaduan Ini Sekarang</span>
              </Link>
              <Link to="/report" className="gov-btn gov-btn-outline-neutral">
                <Icon name="message" size={16} />
                <span>Buat Pengaduan Lain</span>
              </Link>
              <Link to="/" className="gov-btn gov-btn-outline-neutral">
                <span>Kembali ke Beranda</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
