import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Breadcrumbs from "../../../components/Breadcrumbs";
import Icon from "../../../components/Icon";
import StatusBadge from "../../../components/StatusBadge";
import { getCategoryDetails } from '../../../data/categories';
import { getPublicReportByTicket, getAllReports } from "../../../services/storage";

export default function Track() {
  const [searchParams, setSearchParams] = useSearchParams();
  const ticketFromUrl = searchParams.get('ticket') || '';

  const [ticketInput, setTicketInput] = useState(ticketFromUrl);
  const [searchedTicket, setSearchedTicket] = useState(ticketFromUrl);
  const [report, setReport] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const doSearch = (ticket) => {
    if (!ticket || !ticket.trim()) {
      setReport(null);
      setNotFound(false);
      return;
    }

    const clean = ticket.trim();
    // Gunakan fungsi sanitasi publik khusus yang menyembunyikan identitas/kontak pelapor
    const found = getPublicReportByTicket(clean);

    if (found) {
      setReport(found);
      setNotFound(false);
    } else {
      setReport(null);
      setNotFound(true);
    }
  };

  // Jalankan pencarian jika query parameter di URL berubah
  useEffect(() => {
    if (ticketFromUrl) {
      setTicketInput(ticketFromUrl);
      setSearchedTicket(ticketFromUrl);
      doSearch(ticketFromUrl);
    } else {
      setReport(null);
      setNotFound(false);
    }
  }, [ticketFromUrl]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!ticketInput.trim()) return;

    setSearchParams({ ticket: ticketInput.trim() });
    setSearchedTicket(ticketInput.trim());
    doSearch(ticketInput.trim());
  };

  const handleCopyLink = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const categoryObj = report ? getCategoryDetails(report.category) : null;

  // Daftar contoh tiket yang ada di sistem
  const sampleTickets = getAllReports().slice(0, 3).map(r => r.ticketNumber);

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Lacak Status Pengaduan' }]} />

      <section style={{ padding: '2.5rem 0', backgroundColor: 'var(--neutral-50)' }}>
        <div className="gov-container" style={{ maxWidth: "860px" }}>
          {/* Header Pelacakan */}
          <div className="gov-section-header" style={{ textAlign: 'center', marginBottom: "2rem" }}>
            <span className="gov-section-tag">Transparansi Penanganan Resmi</span>
            <h1 className="gov-section-title">Pelacakan Status Pengajuan IFPI</h1>
            <p className="gov-section-desc">
              Pantau perkembangan penanganan permohonan atau aduan Anda mulai dari tahap verifikasi hingga penyelesaian oleh tim IFPI secara transparan dan akuntabel.
            </p>
          </div>

          {/* Kotak Pencarian Tiket */}
          <div className="gov-card" style={{ padding: '1.75rem', marginBottom: "2rem" }}>
            <form onSubmit={handleSearchSubmit}>
              <label htmlFor="track-ticket-input" className="gov-label" style={{ fontSize: '0.9375rem', marginBottom: "0.5rem" }}>
                Masukkan Nomor Tiket Pengaduan
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  id="track-ticket-input"
                  className="gov-input"
                  placeholder="Contoh: Riau-2026-000001"
                  value={ticketInput}
                  onChange={(e) => setTicketInput(e.target.value)}
                  style={{ flex: '1 1 280px', fontFamily: 'monospace', fontSize: '1rem', fontWeight: 600 }}
                />
                <button
                  type="submit"
                  className="gov-btn gov-btn-primary"
                  id="btn-track-submit"
                >
                  <Icon name="search" size={16} />
                  <span>Cari Laporan</span>
                </button>
              </div>
            </form>

            <div style={{ marginTop: '0.875rem', fontSize: '0.775rem', color: 'var(--neutral-500)', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span>Contoh tiket aktif untuk diuji:</span>
              {sampleTickets.map(ticket => (
                <button
                  key={ticket}
                  type="button"
                  onClick={() => {
                    setTicketInput(ticket);
                    setSearchParams({ ticket });
                    setSearchedTicket(ticket);
                    doSearch(ticket);
                  }}
                  style={{ background: 'none', border: 'none', color: 'var(--gov-blue)', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}
                >
                  {ticket}
                </button>
              ))}
            </div>
          </div>

          {/* JIKA TIDAK DITEMUKAN */}
          {notFound && (
            <div className="gov-alert gov-alert-danger" style={{ display: 'flex', gap: '0.75rem', alignItems: "flex-start" }}>
              <div style={{ marginTop: '0.1rem' }}>
                <Icon name="alert-circle" size={20} color="#DC2626" />
              </div>
              <div>
                <strong style={{ display: 'block', marginBottom: '0.25rem' }}>
                  Nomor Tiket "{searchedTicket}" Tidak Ditemukan di Sistem
                </strong>
                <p style={{ margin: 0, fontSize: '0.8125rem', lineHeight: 1.5 }}>
                  Pastikan nomor tiket yang Anda masukkan sudah benar (format: <code>Riau-YYYY-XXXXXX</code>) tanpa ada kesalahan pengetikan karakter atau spasi.
                </p>
              </div>
            </div>
          )}

          {/* JIKA LAPORAN DITEMUKAN */}
          {report && (
            <div>
              {/* Header Hasil Pelacakan */}
              <div className="gov-card" style={{ marginBottom: '1.5rem', overflow: "hidden" }}>
                <div className="gov-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', backgroundColor: 'var(--gov-blue-soft)', borderBottom: "1px solid var(--gov-blue-border)" }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--neutral-600)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      NOMOR TIKET RESMI
                    </span>
                    <div style={{ fontFamily: 'monospace', fontSize: '1.5rem', fontWeight: 800, color: 'var(--gov-blue-dark)' }}>
                      {report.ticketNumber}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <StatusBadge status={report.status} />
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="gov-btn gov-btn-outline-neutral gov-btn-sm"
                      title="Salin tautan pelacakan langsung"
                    >
                      <Icon name={copiedLink ? 'check' : 'file-check'} size={13} />
                      <span>{copiedLink ? 'Tautan Disalin!' : 'Bagikan Status'}</span>
                    </button>
                  </div>
                </div>

                <div className="gov-card-body">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8125rem', color: 'var(--neutral-500)', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Icon name="map-pin" size={14} color="var(--neutral-500)" />
                      {report.region || 'Provinsi Riau'}
                    </span>
                    <span>&bull;</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Icon name="clock" size={14} color="var(--neutral-500)" />
                      Diajukan: {new Date(report.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    <span>&bull;</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      Kategori: <strong style={{ color: 'var(--gov-blue-dark)' }}>{categoryObj ? categoryObj.name : report.category}</strong>
                      {categoryObj?.isLegacy && (
                        <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.35rem', backgroundColor: '#F1F5F9', color: '#64748B', borderRadius: '4px', marginLeft: '0.3rem' }}>
                          Arsip
                        </span>
                      )}
                    </span>
                    {report.serviceType && (
                      <>
                        <span>&bull;</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--neutral-700)' }}>
                          Layanan: <strong>{report.serviceType}</strong>
                        </span>
                      </>
                    )}
                  </div>

                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--neutral-900)', marginBottom: '0.75rem' }}>
                    {report.title}
                  </h2>

                  <div style={{ backgroundColor: 'var(--neutral-50)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--neutral-200)', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neutral-500)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                      Uraian Laporan Masyarakat:
                    </span>
                    <p style={{ margin: 0, fontSize: '0.9375rem', color: 'var(--neutral-800)', whiteSpace: 'pre-line' }}>
                      {report.message}
                    </p>
                  </div>

                  {/* Informasi Kontekstual Layanan */}
                  {(report.applicantAgency || report.eventPurpose || report.eventDate || report.previousTicketNumber || report.relatedAgency) && (
                    <div style={{ backgroundColor: '#F8FAFC', padding: '0.875rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--neutral-200)', marginBottom: '1rem', fontSize: '0.8125rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gov-blue-dark)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                        Rincian Tambahan Layanan:
                      </span>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.625rem' }}>
                        {report.applicantAgency && (
                          <div>
                            <span style={{ color: 'var(--neutral-500)', display: 'block', fontSize: '0.75rem' }}>Instansi Pemohon:</span>
                            <strong style={{ color: 'var(--neutral-800)' }}>{report.applicantAgency}</strong>
                          </div>
                        )}
                        {report.eventPurpose && (
                          <div>
                            <span style={{ color: 'var(--neutral-500)', display: 'block', fontSize: '0.75rem' }}>Agenda / Tema Kegiatan:</span>
                            <strong style={{ color: 'var(--neutral-800)' }}>{report.eventPurpose}</strong>
                          </div>
                        )}
                        {report.eventDate && (
                          <div>
                            <span style={{ color: 'var(--neutral-500)', display: 'block', fontSize: '0.75rem' }}>Tanggal Acara:</span>
                            <strong style={{ color: 'var(--neutral-800)' }}>
                              {new Date(report.eventDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </strong>
                          </div>
                        )}
                        {report.previousTicketNumber && (
                          <div>
                            <span style={{ color: 'var(--neutral-500)', display: 'block', fontSize: '0.75rem' }}>Tiket Sebelumnya:</span>
                            <strong style={{ color: 'var(--gov-blue-dark)', fontFamily: 'monospace' }}>{report.previousTicketNumber}</strong>
                          </div>
                        )}
                        {report.relatedAgency && (
                          <div>
                            <span style={{ color: 'var(--neutral-500)', display: 'block', fontSize: '0.75rem' }}>Instansi Terkait:</span>
                            <strong style={{ color: 'var(--neutral-800)' }}>{report.relatedAgency}</strong>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {report.locationDetail && (
                    <div style={{ fontSize: '0.8125rem', color: 'var(--neutral-600)', marginBottom: '1rem' }}>
                      <strong>Detail Lokasi:</strong> {report.locationDetail}
                    </div>
                  )}

                  {/* Lampiran Surat Resmi jika ada */}
                  {report.letterAttachment && (
                    <div style={{ marginTop: '0.75rem', marginBottom: '1rem', padding: '0.75rem 1rem', backgroundColor: '#FFFFFF', border: '1px solid var(--neutral-300)', borderRadius: 'var(--radius-sm)' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gov-blue-dark)', display: 'block', marginBottom: '0.35rem' }}>
                        Lampiran Surat Permohonan Resmi:
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.8125rem', color: 'var(--neutral-800)' }}>
                          📄 {report.letterAttachment.fileName} ({report.letterAttachment.fileSize})
                        </span>
                        {report.letterAttachment.data && (
                          <a
                            href={report.letterAttachment.data}
                            download={report.letterAttachment.fileName}
                            className="gov-btn gov-btn-outline-neutral gov-btn-sm"
                            style={{ fontSize: '0.75rem' }}
                          >
                            <Icon name="download" size={13} />
                            <span>Unduh Berkas Surat</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Foto Lampiran Bukti */}
                  {report.image && (
                    <div style={{ marginTop: '1rem', borderTop: '1px solid var(--neutral-200)', paddingTop: '1rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neutral-600)', display: 'block', marginBottom: '0.5rem' }}>
                        Lampiran Foto Bukti dari Pelapor:
                      </span>
                      <img
                        src={report.image}
                        alt="Bukti Pengaduan"
                        style={{ maxWidth: '100%', maxHeight: '320px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--neutral-300)' }}
                      />
                    </div>
                  )}

                  {/* Privasi Aman Notice */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem', padding: '0.5rem 0.75rem', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--neutral-500)' }}>
                    <Icon name="shield" size={14} color="var(--gov-blue)" />
                    <span>Informasi nama dan nomor kontak pelapor disamarkan untuk menjamin keamanan dan privasi publik sesuai standar kerahasiaan pengaduan.</span>
                  </div>
                </div>
              </div>

              {/* TANGGAPAN RESMI PETUGAS OPD (JIKA SUDAH ADA) */}
              {report.adminResponse ? (
                <div className="gov-card" style={{ marginBottom: '1.5rem', borderLeft: "4px solid var(--gov-green)" }}>
                  <div className="gov-card-header" style={{ backgroundColor: 'var(--gov-green-soft)', display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: '0.725rem', fontWeight: 800, color: 'var(--gov-green-dark)', textTransform: 'uppercase' }}>
                        TANGGAPAN RESMI PEMERINTAH PROVINSI RIAU
                      </span>
                      <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--neutral-900)', margin: '0.15rem 0 0 0' }}>
                        {report.adminResponse.opd}
                      </h3>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--neutral-500)' }}>
                      {new Date(report.adminResponse.respondedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })} WIB
                    </span>
                  </div>
                  <div className="gov-card-body">
                    <p style={{ fontSize: '0.9375rem', color: 'var(--neutral-800)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>
                      "{report.adminResponse.message}"
                    </p>
                    <div style={{ marginTop: '0.75rem', fontSize: '0.8125rem', color: 'var(--neutral-500)' }}>
                      Ditindaklanjuti oleh: <strong>{report.adminResponse.responder}</strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="gov-alert gov-alert-warning" style={{ marginBottom: "1.5rem" }}>
                  <strong>Belum Ada Tanggapan Resmi:</strong> Laporan ini sedang dalam antrean verifikasi atau telaah teknis dinas terkait. Tanggapan resmi dan dokumentasi tindak lanjut akan ditampilkan di sini setelah petugas merespons.
                </div>
              )}

              {/* TIMELINE RIWAYAT STATUS PENANGANAN */}
              <div className="gov-card" style={{ padding: '1.5rem', marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--neutral-900)', borderBottom: '1px solid var(--neutral-200)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                  Riwayat Tahapan Penanganan Pengaduan
                </h3>

                <div className="gov-timeline">
                  {report.statusHistory && report.statusHistory.map((item, index) => {
                    const isLatest = index === 0;
                    return (
                      <div key={index} className={`gov-timeline-item ${isLatest ? 'active' : 'completed'}`}>
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
                    );
                  })}
                </div>
              </div>

              {/* Tombol Tindakan Tambahan */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <Link to="/" className="gov-btn gov-btn-outline-neutral">
                  <Icon name="arrow-left" size={14} />
                  <span>Kembali ke Beranda</span>
                </Link>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => window.print()} className="gov-btn gov-btn-outline-neutral">
                    <Icon name="download" size={14} />
                    <span>Cetak Riwayat</span>
                  </button>
                  <Link to="/report" className="gov-btn gov-btn-primary">
                    <Icon name="message" size={14} />
                    <span>Buat Laporan Baru</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
