import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Icon from "../../components/Icon";
import StatusBadge from "../../components/StatusBadge";
import { CATEGORIES, REPORT_STATUSES, getCategoryDetails } from '../../data/categories';
import { getReportById, updateReportStatus, saveAdminResponse, getAdminSession } from "../../services/storage";

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
      <div className="gov-container adm-detail__notfound">
        <h2>Pengaduan Tidak Ditemukan</h2>
        <p>
          Data pengaduan dengan identitas internal &ldquo;{id}&rdquo; tidak tersedia atau
          telah dihapus.
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
    <div className="gov-container adm-detail">
      <div className="adm-detail__toolbar">
        <Link to="/admin" className="adm-detail__back">
          <Icon name="arrow-left" size={14} />
          <span>Kembali ke Daftar Pengaduan</span>
        </Link>

        <a
          href={`/track?ticket=${report.ticketNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="gov-btn gov-btn-outline-neutral gov-btn-sm"
          title="Buka tampilan yang dilihat masyarakat di halaman pelacakan"
        >
          <Icon name="search" size={14} />
          <span>Lihat Tampilan Publik</span>
        </a>
      </div>

      {notification && (
        <div className={`gov-alert gov-alert-${notification.type} adm-detail__alert`}>
          {notification.message}
        </div>
      )}

      {/* Identitas laporan */}
      <header className="adm-detail__head">
        <div>
          <span className="adm-detail__label">Nomor tiket</span>
          <span className="adm-detail__ticket">{report.ticketNumber}</span>
          <span className="adm-detail__date">
            Diajukan {new Date(report.createdAt).toLocaleString('id-ID', {
              dateStyle: 'full',
              timeStyle: 'short',
            })}{' '}
            WIB
          </span>
        </div>
        <div className="adm-detail__status">
          <span className="adm-detail__label">Status saat ini</span>
          <StatusBadge status={report.status} />
        </div>
      </header>

      {/* Isi laporan + informasi pelapor */}
      <div className="adm-detail__split">
        <section className="adm-detail__block">
          <h2 className="adm-detail__section-title">{report.title}</h2>
          <p className="adm-detail__label adm-detail__label--tight">Uraian isi pengaduan</p>
          <p className="adm-detail__body-text">{report.message}</p>

          {report.image && (
            <figure className="adm-detail__figure">
              <img src={report.image} alt="Lampiran foto lapangan" />
              <figcaption>Lampiran foto lapangan</figcaption>
            </figure>
          )}
        </section>

        <aside className="adm-detail__aside">
          <h2 className="adm-detail__aside-title">Informasi Pelapor &amp; Wilayah</h2>

          <dl className="adm-detail__facts">
            <div className="adm-detail__fact">
              <dt>Nama pelapor</dt>
              <dd>{report.name}</dd>
            </div>
            <div className="adm-detail__fact">
              <dt>Kontak / WhatsApp</dt>
              <dd>
                {report.contact}
                <span className="adm-detail__fact-note">Hanya terlihat oleh petugas</span>
              </dd>
            </div>
            <div className="adm-detail__fact">
              <dt>Kategori layanan</dt>
              <dd>
                {categoryObj ? categoryObj.name : report.category}
                {categoryObj?.isLegacy && (
                  <span className="adm-detail__chip">Arsip lama</span>
                )}
              </dd>
            </div>
            {report.serviceType && (
              <div className="adm-detail__fact">
                <dt>Jenis layanan</dt>
                <dd>{report.serviceType}</dd>
              </div>
            )}
            {report.applicantAgency && (
              <div className="adm-detail__fact">
                <dt>Instansi pemohon</dt>
                <dd>{report.applicantAgency}</dd>
              </div>
            )}
            {report.eventPurpose && (
              <div className="adm-detail__fact">
                <dt>Tujuan / tema agenda</dt>
                <dd>{report.eventPurpose}</dd>
              </div>
            )}
            {report.eventDate && (
              <div className="adm-detail__fact">
                <dt>Tanggal rencana kegiatan</dt>
                <dd>
                  {new Date(report.eventDate).toLocaleDateString('id-ID', { dateStyle: 'long' })}
                </dd>
              </div>
            )}
            {report.previousTicketNumber && (
              <div className="adm-detail__fact">
                <dt>Tiket sebelumnya</dt>
                <dd className="adm-detail__mono">{report.previousTicketNumber}</dd>
              </div>
            )}
            {report.relatedAgency && (
              <div className="adm-detail__fact">
                <dt>Instansi / unit terkait</dt>
                <dd>{report.relatedAgency}</dd>
              </div>
            )}
            <div className="adm-detail__fact">
              <dt>OPD pembina teknis</dt>
              <dd>{categoryObj ? categoryObj.opd : 'Pemprov Riau'}</dd>
            </div>
            <div className="adm-detail__fact">
              <dt>Kabupaten / kota</dt>
              <dd>{report.region || 'Provinsi Riau'}</dd>
            </div>
            {report.locationDetail && (
              <div className="adm-detail__fact">
                <dt>Detail lokasi kejadian</dt>
                <dd>{report.locationDetail}</dd>
              </div>
            )}
          </dl>

          {report.letterAttachment && (
            <div className="adm-detail__attachment">
              <span className="adm-detail__attachment-name">
                <Icon name="file-check" size={14} />
                {report.letterAttachment.fileName}
              </span>
              {report.letterAttachment.data && (
                <a
                  href={report.letterAttachment.data}
                  download={report.letterAttachment.fileName}
                  className="gov-btn gov-btn-outline-neutral gov-btn-xs"
                >
                  <Icon name="download" size={12} />
                  <span>Unduh</span>
                </a>
              )}
            </div>
          )}
        </aside>
      </div>

      {/* Form tindak lanjut */}
      <div className="adm-detail__forms">
        <section className="adm-detail__form-panel">
          <h2 className="adm-detail__form-title">
            <span className="adm-detail__form-step">1</span>
            Perbarui Tahapan Status
          </h2>
          <p className="adm-detail__form-desc">
            Ubah status dan berikan catatan resmi agar pelapor mengetahui progres di lapangan.
          </p>

          <form onSubmit={handleUpdateStatus}>
            <div className="gov-form-group">
              <label htmlFor="select-new-status" className="gov-label">Status baru</label>
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
              <label htmlFor="input-status-note" className="gov-label">
                Catatan tindakan
              </label>
              <textarea
                id="input-status-note"
                rows={3}
                className="gov-textarea"
                placeholder="Contoh: Berkas diteruskan ke tim UPTD Wilayah I untuk peninjauan teknis perbaikan jalan…"
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                required
              />
              <span className="gov-hint-text">Catatan ini akan masuk ke riwayat timeline pelapor.</span>
            </div>

            <div className="gov-form-group">
              <label htmlFor="input-status-actor" className="gov-label">Nama petugas / instansi</label>
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

            <button type="submit" className="gov-btn gov-btn-primary adm-detail__submit" id="btn-save-status">
              <Icon name="check" size={16} />
              <span>Simpan Pembaruan Status</span>
            </button>
          </form>
        </section>

        <section className="adm-detail__form-panel">
          <h2 className="adm-detail__form-title">
            <span className="adm-detail__form-step adm-detail__form-step--alt">2</span>
            Tanggapan Resmi Pemerintah
          </h2>
          <p className="adm-detail__form-desc">
            Pernyataan resmi instansi/OPD yang akan tampil di halaman pelacakan publik.
          </p>

          <form onSubmit={handleSaveResponse}>
            <div className="gov-form-group">
              <label htmlFor="input-opd-name" className="gov-label">Nama instansi / OPD penjawab</label>
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
              <label htmlFor="input-responder-name" className="gov-label">
                Pejabat / petugas yang menjawab
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
              <label htmlFor="input-response-text" className="gov-label">Uraian tanggapan resmi</label>
              <textarea
                id="input-response-text"
                rows={4}
                className="gov-textarea"
                placeholder="Uraikan tindak lanjut yang telah atau akan dilakukan, jadwal pekerjaan, atau penjelasan komprehensif…"
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="gov-btn gov-btn-primary adm-detail__submit" id="btn-save-response">
              <Icon name="message" size={16} />
              <span>Publikasikan Tanggapan Resmi</span>
            </button>
          </form>
        </section>
      </div>

      {/* Riwayat */}
      <section className="adm-detail__history">
        <h2 className="adm-detail__section-title adm-detail__section-title--rule">
          Riwayat Perjalanan Penanganan
        </h2>

        <div className="gov-timeline">
          {report.statusHistory && report.statusHistory.map((item, idx) => (
            <div key={idx} className="gov-timeline-item completed">
              <div className="gov-timeline-dot" />
              <div className="gov-timeline-content">
                <div className="gov-timeline-header">
                  <div className="adm-detail__timeline-meta">
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
          ))}
        </div>
      </section>
    </div>
  );
}
