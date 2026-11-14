import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Icon from "../../components/Icon";
import StatusBadge from "../../components/StatusBadge";
import { ADMIN_STATUSES, getCategoryDetails, normalizeWorkflowStatus } from '../../data/categories';
import { getReportById, updateReportStatus, saveAdminResponse, getAdminSession } from "../../services/storage";

export default function AdminDetail() {
  const { id } = useParams();

  const [adminUser] = useState(() => getAdminSession());

  // Laporan dibaca langsung dari penyimpanan pada setiap render. Perubahan
  // state (refreshKey) otomatis memicu render ulang dengan data terbaru.
  const [, setRefreshKey] = useState(0);
  const report = getReportById(id);

  const [newStatus, setNewStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [statusActor, setStatusActor] = useState(adminUser?.name || 'Petugas Verifikator');

  const [responseText, setResponseText] = useState('');
  const [responderName, setResponderName] = useState(adminUser?.name || 'Tim Verifikasi IFPI');
  const [opdName, setOpdName] = useState('');

  const [notification, setNotification] = useState(null);

  const categoryObj = report ? getCategoryDetails(report.category) : null;

  const effectiveStatus = newStatus || (report ? normalizeWorkflowStatus(report.status) : '');
  const effectiveOpd = opdName || (categoryObj ? categoryObj.opd : 'Dewan Pengurus IFPI');
  const responseTextValue = responseText || report?.adminResponse?.message || '';
  const responderNameValue = responderName || report?.adminResponse?.responder || '';
  const opdNameValue = opdName || report?.adminResponse?.opd || effectiveOpd;

  const flash = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4500);
  };

  if (!report) {
    return (
      <div className="adx-empty" style={{ padding: '5rem 1.5rem' }}>
        <p className="adx-empty__title">Pengajuan tidak ditemukan</p>
        <p className="adx-empty__desc">
          Data pengajuan dengan identitas &ldquo;{id}&rdquo; tidak tersedia atau telah dihapus.
        </p>
        <Link to="/admin" className="adx-btn adx-btn--primary">
          <Icon name="arrow-left" size={14} color="currentColor" />
          <span>Kembali ke Panel Kendali</span>
        </Link>
      </div>
    );
  }

  const created = new Date(report.createdAt);

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    if (!effectiveStatus) return;

    const updated = updateReportStatus(
      report.id,
      effectiveStatus,
      statusNote.trim() || `Status pengajuan diperbarui menjadi ${effectiveStatus}.`,
      statusActor.trim() || 'Tim Verifikasi IFPI'
    );

    if (updated) {
      setStatusNote('');
      setRefreshKey(k => k + 1);
      flash('ok', `Status diubah menjadi "${effectiveStatus}". Perubahan langsung terlihat di halaman Lacak Laporan.`);
    }
  };

  const handleSaveResponse = (e) => {
    e.preventDefault();
    if (!responseTextValue.trim()) {
      flash('err', 'Tuliskan uraian tanggapan resmi terlebih dahulu.');
      return;
    }

    const updated = saveAdminResponse(
      report.id,
      responseTextValue.trim(),
      responderNameValue.trim() || 'Petugas Penanganan IFPI',
      opdNameValue.trim() || 'Dewan Pengurus IFPI'
    );

    if (updated) {
      setRefreshKey(k => k + 1);
      flash('ok', 'Tanggapan resmi tersimpan dan sudah tampil di halaman pelacakan publik.');
    }
  };

  return (
    <div className="adx-detail-wrap">
      <header className="adx-page-head">
        <div className="adx-page-head__main">
          <span className="adx-page-head__eyebrow">Detail Pengajuan</span>
          <h1 className="adx-page-head__title">{report.title}</h1>
          <p className="adx-page-head__desc">
            {categoryObj ? categoryObj.name : report.category}
            {report.serviceType ? ` · ${report.serviceType}` : ''}
          </p>
        </div>

        <div className="adx-page-head__actions">
          <Link to="/admin" className="adx-btn">
            <Icon name="arrow-left" size={14} color="currentColor" />
            <span>Kembali</span>
          </Link>
          <a
            href={`/track?ticket=${report.ticketNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="adx-btn adx-btn--primary"
            title="Buka tampilan yang dilihat masyarakat"
          >
            <Icon name="search" size={14} color="currentColor" />
            <span>Lihat Tampilan Publik</span>
          </a>
        </div>
      </header>

      {notification && (
        <div className={`adx-notice adx-notice--${notification.type}`} role="status">
          {notification.message}
        </div>
      )}

      {/* Identitas tiket + status */}
      <div className="adx-detail-top">
        <div className="adx-detail-ticket">
          <span className="adx-card__head" style={{ padding: 0, border: 0, display: 'block', marginBottom: '0.3rem' }}>
            Nomor Tiket
          </span>
          <span className="adx-mono" style={{ fontSize: '1.35rem', fontWeight: 600, letterSpacing: '0.02em' }}>
            {report.ticketNumber}
          </span>
          <span style={{ display: 'block', marginTop: '0.35rem', fontSize: '0.75rem', color: '#8C8C8C' }}>
            Diajukan {created.toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })} WIB
          </span>
        </div>

        <div className="adx-detail-side">
          <span className="adx-detail-side__label">Status saat ini</span>
          <div className="adx-detail-side__status">
            <StatusBadge status={report.status} />
          </div>
          <span className="adx-detail-side__label" style={{ marginTop: '0.35rem' }}>Terakhir diperbarui</span>
          <span style={{ fontSize: '0.75rem', color: '#686868' }}>
            {new Date(report.updatedAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })} WIB
          </span>
        </div>
      </div>

      {/* Isi pengajuan + data pelapor */}
      <div className="adx-detail-grid">
        <section className="adx-card">
          <div className="adx-card__head">Uraian Pengajuan</div>
          <div className="adx-card__body">
            <p className="adx-prose">{report.message}</p>

            {report.image && (
              <figure className="adx-figure">
                <img src={report.image} alt="Lampiran foto dari pelapor" />
                <figcaption>Lampiran foto dari pelapor</figcaption>
              </figure>
            )}

            {report.letterAttachment && (
              <div className="adx-attachment">
                <span className="adx-attachment__name">
                  <Icon name="file-check" size={14} color="currentColor" />
                  <span>{report.letterAttachment.fileName}</span>
                </span>
                {report.letterAttachment.data && (
                  <a
                    href={report.letterAttachment.data}
                    download={report.letterAttachment.fileName}
                    className="adx-btn adx-btn--xs"
                  >
                    <Icon name="download" size={12} color="currentColor" />
                    <span>Unduh</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </section>

        <aside className="adx-card">
          <div className="adx-card__head">Identitas Pelapor &amp; Wilayah</div>
          <div className="adx-card__body">
            <dl className="adx-facts">
              <div className="adx-fact">
                <dt>Nama pelapor</dt>
                <dd>{report.name}</dd>
              </div>
              <div className="adx-fact">
                <dt>Kontak / WhatsApp</dt>
                <dd>
                  {report.contact}
                  <span style={{ display: 'block', fontSize: '0.625rem', fontWeight: 400, color: '#A5A5A5' }}>
                    Hanya terlihat oleh petugas
                  </span>
                </dd>
              </div>
              <div className="adx-fact">
                <dt>Kategori layanan</dt>
                <dd>
                  {categoryObj ? categoryObj.name : report.category}
                  {categoryObj?.isLegacy && <span className="adx-chip">Arsip</span>}
                </dd>
              </div>
              {report.serviceType && (
                <div className="adx-fact">
                  <dt>Jenis layanan</dt>
                  <dd className="is-plain">{report.serviceType}</dd>
                </div>
              )}
              {report.applicantAgency && (
                <div className="adx-fact">
                  <dt>Instansi pemohon</dt>
                  <dd>{report.applicantAgency}</dd>
                </div>
              )}
              {report.eventPurpose && (
                <div className="adx-fact">
                  <dt>Tujuan / tema</dt>
                  <dd className="is-plain">{report.eventPurpose}</dd>
                </div>
              )}
              {report.eventDate && (
                <div className="adx-fact">
                  <dt>Tanggal kegiatan</dt>
                  <dd>
                    {new Date(report.eventDate).toLocaleDateString('id-ID', { dateStyle: 'long' })}
                  </dd>
                </div>
              )}
              {report.previousTicketNumber && (
                <div className="adx-fact">
                  <dt>Tiket sebelumnya</dt>
                  <dd className="adx-mono">{report.previousTicketNumber}</dd>
                </div>
              )}
              {report.relatedAgency && (
                <div className="adx-fact">
                  <dt>Unit terkait</dt>
                  <dd className="is-plain">{report.relatedAgency}</dd>
                </div>
              )}
              <div className="adx-fact">
                <dt>Bidang penanggung jawab</dt>
                <dd className="is-plain">{categoryObj ? categoryObj.opd : 'Dewan Pengurus IFPI'}</dd>
              </div>
              <div className="adx-fact">
                <dt>Kabupaten / kota</dt>
                <dd>{report.region || 'Provinsi Riau'}</dd>
              </div>
              {report.locationDetail && (
                <div className="adx-fact">
                  <dt>Detail lokasi</dt>
                  <dd className="is-plain">{report.locationDetail}</dd>
                </div>
              )}
            </dl>
          </div>
        </aside>
      </div>

      {/* Tindakan */}
      <div className="adx-actions-grid">
        <section className="adx-form-panel adx-form-panel--accent">
          <h2 className="adx-form-panel__title">Perbarui Status Penanganan</h2>
          <p className="adx-form-panel__desc">
            Pilih satu dari tiga tahap resmi. Catatan akan masuk ke riwayat yang terlihat pelapor.
          </p>

          <form onSubmit={handleUpdateStatus}>
            <div className="adx-status-choice">
              {ADMIN_STATUSES.map(s => (
                <button
                  key={s.id}
                  type="button"
                  className={`adx-status-choice__btn${effectiveStatus === s.id ? ' is-selected' : ''}`}
                  onClick={() => setNewStatus(s.id)}
                  aria-pressed={effectiveStatus === s.id}
                >
                  <strong>{s.label}</strong>
                  <span>{s.desc}</span>
                </button>
              ))}
            </div>

            <div className="adx-field-stack">
              <div className="adx-field">
                <label htmlFor="input-status-note" className="adx-field__label">Catatan tindakan</label>
                <textarea
                  id="input-status-note"
                  className="adx-textarea"
                  rows={3}
                  placeholder="Contoh: Berkas telah diverifikasi dan diteruskan ke Bidang Advokasi untuk telaah lanjutan."
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  required
                />
              </div>

              <div className="adx-field">
                <label htmlFor="input-status-actor" className="adx-field__label">Nama petugas</label>
                <input
                  type="text"
                  id="input-status-actor"
                  className="adx-input"
                  value={statusActor}
                  onChange={(e) => setStatusActor(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="adx-btn adx-btn--primary" id="btn-save-status">
                <Icon name="check" size={15} color="currentColor" />
                <span>Simpan Status</span>
              </button>
            </div>
          </form>
        </section>

        <section className="adx-form-panel">
          <h2 className="adx-form-panel__title">Tanggapan Resmi</h2>
          <p className="adx-form-panel__desc">
            Pernyataan resmi yang akan tampil di halaman pelacakan publik.
          </p>

          <form onSubmit={handleSaveResponse}>
            <div className="adx-field-stack">
              <div className="adx-field">
                <label htmlFor="input-opd-name" className="adx-field__label">Bidang / unit penjawab</label>
                <input
                  type="text"
                  id="input-opd-name"
                  className="adx-input"
                  value={opdNameValue}
                  onChange={(e) => setOpdName(e.target.value)}
                  required
                />
              </div>

              <div className="adx-field">
                <label htmlFor="input-responder-name" className="adx-field__label">Petugas yang menjawab</label>
                <input
                  type="text"
                  id="input-responder-name"
                  className="adx-input"
                  value={responderNameValue}
                  onChange={(e) => setResponderName(e.target.value)}
                  required
                />
              </div>

              <div className="adx-field">
                <label htmlFor="input-response-text" className="adx-field__label">Uraian tanggapan</label>
                <textarea
                  id="input-response-text"
                  className="adx-textarea"
                  rows={4}
                  placeholder="Uraikan tindak lanjut yang telah atau akan dilakukan…"
                  value={responseTextValue}
                  onChange={(e) => setResponseText(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="adx-btn adx-btn--primary" id="btn-save-response">
                <Icon name="message" size={15} color="currentColor" />
                <span>Publikasikan Tanggapan</span>
              </button>
            </div>
          </form>
        </section>
      </div>

      {/* Tanggapan tersimpan */}
      {report.adminResponse?.message && (
        <section className="adx-card" style={{ marginBottom: '1.5rem' }}>
          <div className="adx-card__head">Tanggapan Resmi Tersimpan</div>
          <div className="adx-card__body">
            <div className="adx-response">
              <span className="adx-response__label">Dipublikasikan</span>
              <p className="adx-response__text">{report.adminResponse.message}</p>
              <p className="adx-response__by">
                {report.adminResponse.responder} &middot; {report.adminResponse.opd} &middot;{' '}
                {new Date(report.adminResponse.respondedAt).toLocaleString('id-ID', {
                  dateStyle: 'medium',
                  timeStyle: 'short'
                })}{' '}
                WIB
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Riwayat */}
      <section className="adx-history">
        <div className="adx-history__head">Riwayat Penanganan</div>
        <div className="adx-history__body">
          {report.statusHistory && report.statusHistory.length > 0 ? (
            <ol className="adx-tl">
              {report.statusHistory.map((item, idx) => (
                <li className="adx-tl__item" key={`${item.timestamp}-${idx}`}>
                  <div className="adx-tl__top">
                    <div className="adx-tl__meta">
                      <StatusBadge status={item.status} size="sm" />
                      <span className="adx-tl__actor">{item.actor}</span>
                    </div>
                    <span className="adx-tl__time">
                      {new Date(item.timestamp).toLocaleString('id-ID', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      })}{' '}
                      WIB
                    </span>
                  </div>
                  <p className="adx-tl__note">{item.note}</p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="adx-empty__desc">Belum ada riwayat penanganan tercatat.</p>
          )}
        </div>
      </section>
    </div>
  );
}
