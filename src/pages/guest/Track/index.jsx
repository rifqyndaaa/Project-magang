import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Breadcrumbs from "../../../components/Breadcrumbs";
import Icon from "../../../components/Icon";
import StatusBadge from "../../../components/StatusBadge";
import PageHeader from "../../../components/PageHeader";
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
    <div className="pg trk">
      <div className="gov-container">
        <Breadcrumbs items={[{ label: 'Lacak Status Pengaduan' }]} />

        <PageHeader
          eyebrow="Transparansi Penanganan Resmi"
          title={<>Pelacakan Status <em>Pengajuan</em></>}
          lede="Pantau perkembangan penanganan permohonan atau aduan Anda mulai dari tahap verifikasi hingga penyelesaian oleh tim IFPI secara transparan dan akuntabel."
          meta={[
            { label: 'Kanal', value: 'Daring 24 Jam' },
            { label: 'Verifikasi Awal', value: 'Maks. 1×24 Jam' },
          ]}
        />

        <div className="pg-body">
          <section className="trk-search">
            <form onSubmit={handleSearchSubmit} className="trk-search__form">
              <label htmlFor="track-ticket-input" className="gov-label">
                Nomor Tiket Pengaduan
              </label>
              <div className="trk-search__row">
                <input
                  type="text"
                  id="track-ticket-input"
                  className="gov-input trk-search__input"
                  placeholder="Contoh: Riau-2026-000001"
                  value={ticketInput}
                  onChange={(e) => setTicketInput(e.target.value)}
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

            {sampleTickets.length > 0 && (
              <div className="trk-search__samples">
                <span>Contoh tiket untuk diuji:</span>
                {sampleTickets.map(ticket => (
                  <button
                    key={ticket}
                    type="button"
                    className="trk-search__sample"
                    onClick={() => {
                      setTicketInput(ticket);
                      setSearchParams({ ticket });
                      setSearchedTicket(ticket);
                      doSearch(ticket);
                    }}
                  >
                    {ticket}
                  </button>
                ))}
              </div>
            )}
          </section>

          {notFound && (
            <div className="trk-notfound" role="alert">
              <span className="trk-notfound__label">Tidak ditemukan</span>
              <p className="trk-notfound__title">
                Nomor tiket &ldquo;{searchedTicket}&rdquo; tidak terdaftar di sistem
              </p>
              <p className="trk-notfound__desc">
                Pastikan nomor tiket sudah benar dengan format <code>Riau-YYYY-XXXXXX</code>,
                tanpa salah ketik karakter atau spasi berlebih.
              </p>
            </div>
          )}

          {report && (
            <div className="trk-result">
              {/* Kepala hasil pelacakan */}
              <header className="trk-result__head">
                <div className="trk-result__head-main">
                  <span className="trk-result__label">Nomor tiket resmi</span>
                  <span className="trk-result__ticket">{report.ticketNumber}</span>
                </div>
                <div className="trk-result__head-actions">
                  <StatusBadge status={report.status} />
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="gov-btn gov-btn-outline-neutral gov-btn-sm"
                    title="Salin tautan pelacakan langsung"
                  >
                    <Icon name={copiedLink ? 'check' : 'file-check'} size={13} />
                    <span>{copiedLink ? 'Tautan Disalin' : 'Bagikan Status'}</span>
                  </button>
                </div>
              </header>

              <dl className="trk-facts">
                <div className="trk-facts__item">
                  <dt>Wilayah</dt>
                  <dd>{report.region || 'Provinsi Riau'}</dd>
                </div>
                <div className="trk-facts__item">
                  <dt>Tanggal diajukan</dt>
                  <dd>
                    {new Date(report.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </dd>
                </div>
                <div className="trk-facts__item">
                  <dt>Kategori</dt>
                  <dd>
                    {categoryObj ? categoryObj.name : report.category}
                    {categoryObj?.isLegacy && <span className="trk-facts__chip">Arsip</span>}
                  </dd>
                </div>
                {report.serviceType && (
                  <div className="trk-facts__item">
                    <dt>Jenis layanan</dt>
                    <dd>{report.serviceType}</dd>
                  </div>
                )}
              </dl>

              <section className="trk-block">
                <h2 className="trk-block__title">{report.title}</h2>
                <p className="trk-block__sub">Uraian laporan masyarakat</p>
                <p className="trk-block__text">{report.message}</p>
              </section>

              {(report.applicantAgency || report.eventPurpose || report.eventDate || report.previousTicketNumber || report.relatedAgency) && (
                <section className="trk-block">
                  <h2 className="trk-block__title trk-block__title--sm">Rincian Tambahan Layanan</h2>
                  <dl className="trk-facts">
                    {report.applicantAgency && (
                      <div className="trk-facts__item">
                        <dt>Instansi pemohon</dt>
                        <dd>{report.applicantAgency}</dd>
                      </div>
                    )}
                    {report.eventPurpose && (
                      <div className="trk-facts__item">
                        <dt>Agenda / tema kegiatan</dt>
                        <dd>{report.eventPurpose}</dd>
                      </div>
                    )}
                    {report.eventDate && (
                      <div className="trk-facts__item">
                        <dt>Tanggal acara</dt>
                        <dd>
                          {new Date(report.eventDate).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </dd>
                      </div>
                    )}
                    {report.previousTicketNumber && (
                      <div className="trk-facts__item">
                        <dt>Tiket sebelumnya</dt>
                        <dd className="trk-facts__mono">{report.previousTicketNumber}</dd>
                      </div>
                    )}
                    {report.relatedAgency && (
                      <div className="trk-facts__item">
                        <dt>Instansi terkait</dt>
                        <dd>{report.relatedAgency}</dd>
                      </div>
                    )}
                  </dl>
                </section>
              )}

              {report.locationDetail && (
                <section className="trk-block">
                  <h2 className="trk-block__title trk-block__title--sm">Detail Lokasi</h2>
                  <p className="trk-block__text">{report.locationDetail}</p>
                </section>
              )}

              {(report.letterAttachment || report.image) && (
                <section className="trk-block">
                  <h2 className="trk-block__title trk-block__title--sm">Lampiran</h2>

                  {report.letterAttachment && (
                    <div className="trk-attachment">
                      <span className="trk-attachment__name">
                        <Icon name="file-check" size={14} />
                        {report.letterAttachment.fileName}
                        <span className="trk-attachment__size">
                          {report.letterAttachment.fileSize}
                        </span>
                      </span>
                      {report.letterAttachment.data && (
                        <a
                          href={report.letterAttachment.data}
                          download={report.letterAttachment.fileName}
                          className="gov-btn gov-btn-outline-neutral gov-btn-sm"
                        >
                          <Icon name="download" size={13} />
                          <span>Unduh</span>
                        </a>
                      )}
                    </div>
                  )}

                  {report.image && (
                    <figure className="trk-figure">
                      <img src={report.image} alt="Bukti pengaduan dari pelapor" />
                      <figcaption>Foto bukti dari pelapor</figcaption>
                    </figure>
                  )}
                </section>
              )}

              <p className="trk-privacy">
                <Icon name="shield" size={14} />
                <span>
                  Nama dan nomor kontak pelapor disamarkan untuk menjamin keamanan serta
                  privasi publik sesuai standar kerahasiaan pengaduan.
                </span>
              </p>

              {report.adminResponse ? (
                <section className="trk-response">
                  <header className="trk-response__head">
                    <span className="trk-response__label">
                      Tanggapan resmi Pemerintah Provinsi Riau
                    </span>
                    <h3 className="trk-response__opd">{report.adminResponse.opd}</h3>
                    <span className="trk-response__date">
                      {new Date(report.adminResponse.respondedAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}{' '}
                      WIB
                    </span>
                  </header>
                  <blockquote className="trk-response__quote">
                    {report.adminResponse.message}
                  </blockquote>
                  <p className="trk-response__by">
                    Ditindaklanjuti oleh <strong>{report.adminResponse.responder}</strong>
                  </p>
                </section>
              ) : (
                <p className="trk-pending">
                  <strong>Belum ada tanggapan resmi.</strong> Laporan sedang dalam antrean
                  verifikasi atau telaah teknis dinas terkait. Tanggapan resmi dan dokumentasi
                  tindak lanjut akan tampil di sini setelah petugas merespons.
                </p>
              )}

              <section className="trk-timeline">
                <h2 className="trk-block__title trk-block__title--sm">Riwayat Tahapan Penanganan</h2>
                <div className="gov-timeline">
                  {report.statusHistory && report.statusHistory.map((item, index) => {
                    const isLatest = index === 0;
                    return (
                      <div key={index} className={`gov-timeline-item ${isLatest ? 'active' : 'completed'}`}>
                        <div className="gov-timeline-dot" />
                        <div className="gov-timeline-content">
                          <div className="gov-timeline-header">
                            <div className="trk-timeline__meta">
                              <StatusBadge status={item.status} size="sm" />
                              <span className="gov-timeline-actor">{item.actor}</span>
                            </div>
                            <span className="gov-timeline-date">
                              {new Date(item.timestamp).toLocaleString('id-ID', {
                                dateStyle: 'medium',
                                timeStyle: 'short',
                              })}{' '}
                              WIB
                            </span>
                          </div>
                          <div className="gov-timeline-note">{item.note}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <footer className="trk-actions">
                <Link to="/" className="trk-actions__back">
                  <Icon name="arrow-left" size={14} />
                  <span>Kembali ke Beranda</span>
                </Link>

                <div className="trk-actions__buttons">
                  <button onClick={() => window.print()} className="gov-btn gov-btn-outline-neutral">
                    <Icon name="download" size={14} />
                    <span>Cetak Riwayat</span>
                  </button>
                  <Link to="/report" className="gov-btn gov-btn-primary">
                    <Icon name="message" size={14} />
                    <span>Buat Laporan Baru</span>
                  </Link>
                </div>
              </footer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
