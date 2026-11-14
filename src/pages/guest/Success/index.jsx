import { useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import Breadcrumbs from "../../../components/Breadcrumbs";
import Icon from "../../../components/Icon";
import StatusBadge from "../../../components/StatusBadge";
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
    <div className="receipt-page">
      <Breadcrumbs items={[{ label: 'Laporan Berhasil' }]} />

      <div className="gov-container receipt-page__inner">
        <header className="receipt-page__head">
          <span className="receipt-page__seal">
            <Icon name="check" size={20} />
          </span>
          <span className="receipt-page__eyebrow">Tanda Terima Pendaftaran</span>
          <h1 className="receipt-title">Laporan Berhasil Diterima</h1>
          <p className="receipt-page__lede">
            Laporan permohonan telah tercatat resmi di sistem Ikatan Fungsional Pengadaan
            Indonesia Provinsi Riau dan akan diverifikasi oleh tim terkait.
          </p>
        </header>

        <section className="receipt-ticket">
          <span className="receipt-ticket__label">Nomor Tiket Resmi Anda</span>
          <span className="receipt-ticket__number">{report.ticketNumber}</span>
          <div className="receipt-ticket__actions">
            <button
              type="button"
              onClick={handleCopyTicket}
              className="gov-btn gov-btn-primary gov-btn-sm"
              id="btn-copy-ticket"
            >
              <Icon name={copied ? 'check' : 'file-check'} size={14} />
              <span>{copied ? 'Nomor Tiket Disalin' : 'Salin Nomor Tiket'}</span>
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
        </section>

        <section className="receipt-section">
          <h2 className="receipt-section__title">Ringkasan Permohonan</h2>

          <dl className="receipt-list">
            <div className="receipt-list__row">
              <dt>Status saat ini</dt>
              <dd><StatusBadge status={report.status} size="sm" /></dd>
            </div>
            <div className="receipt-list__row">
              <dt>Judul laporan</dt>
              <dd>{report.title}</dd>
            </div>
            <div className="receipt-list__row">
              <dt>Kategori layanan</dt>
              <dd>
                {categoryObj ? categoryObj.name : report.category}
                {categoryObj?.isLegacy && ' (Data Arsip)'}
              </dd>
            </div>
            {report.serviceType && (
              <div className="receipt-list__row">
                <dt>Jenis layanan</dt>
                <dd>{report.serviceType}</dd>
              </div>
            )}
            {categoryObj?.opd && (
              <div className="receipt-list__row">
                <dt>OPD penanggung jawab</dt>
                <dd>{categoryObj.opd}</dd>
              </div>
            )}
            {report.applicantAgency && (
              <div className="receipt-list__row">
                <dt>Instansi pemohon</dt>
                <dd>{report.applicantAgency}</dd>
              </div>
            )}
            {report.eventPurpose && (
              <div className="receipt-list__row">
                <dt>Agenda kegiatan</dt>
                <dd>{report.eventPurpose}</dd>
              </div>
            )}
            {report.previousTicketNumber && (
              <div className="receipt-list__row">
                <dt>Tiket sebelumnya</dt>
                <dd className="receipt-list__mono">{report.previousTicketNumber}</dd>
              </div>
            )}
            {report.relatedAgency && (
              <div className="receipt-list__row">
                <dt>Instansi terkait</dt>
                <dd>{report.relatedAgency}</dd>
              </div>
            )}
            <div className="receipt-list__row">
              <dt>Wilayah / lokasi</dt>
              <dd>{report.region || 'Provinsi Riau'}</dd>
            </div>
            <div className="receipt-list__row">
              <dt>Waktu pendaftaran</dt>
              <dd>
                {new Date(report.createdAt).toLocaleString('id-ID', {
                  dateStyle: 'full',
                  timeStyle: 'short',
                })}{' '}
                WIB
              </dd>
            </div>
          </dl>
        </section>

        <section className="receipt-section receipt-section--steps">
          <h2 className="receipt-section__title">Langkah Selanjutnya</h2>
          <ol className="receipt-steps">
            <li>Catat atau simpan nomor tiket Anda di tempat yang aman.</li>
            <li>
              Petugas verifikator Diskominfotik Provinsi Riau akan memvalidasi laporan maksimal
              1×24 jam kerja.
            </li>
            <li>
              Gunakan menu <strong>Lacak Status Laporan</strong> kapan saja untuk melihat telaah
              teknis dan dokumentasi tindak lanjut OPD di lapangan.
            </li>
          </ol>
        </section>

        <footer className="receipt-page__actions">
          <Link
            to={`/track?ticket=${report.ticketNumber}`}
            className="gov-btn gov-btn-primary"
            id="btn-success-goto-track"
          >
            <Icon name="search" size={16} />
            <span>Lacak Laporan Ini</span>
          </Link>
          <Link to="/report" className="gov-btn gov-btn-outline-neutral">
            <Icon name="message" size={16} />
            <span>Ajukan Laporan Lain</span>
          </Link>
          <Link to="/" className="receipt-page__back">
            <Icon name="arrow-left" size={14} />
            <span>Kembali ke Beranda</span>
          </Link>
        </footer>
      </div>
    </div>
  );
}
