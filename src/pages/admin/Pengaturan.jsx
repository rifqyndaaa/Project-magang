import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from "../../components/Icon";
import { getAdminSession, logoutAdmin, getAllReports, exportReportsToCSV } from '../../services/storage';
import { CATEGORIES, ADMIN_STATUSES, RIAU_REGIONS } from '../../data/categories';

/**
 * Pengaturan — informasi sistem, ekspor cadangan, dan keluar sesi.
 * Hanya berisi tindakan yang benar-benar berfungsi.
 */
export default function AdminPengaturan() {
  const navigate = useNavigate();
  const session = getAdminSession();
  const [notice, setNotice] = useState(null);

  const handleExportAll = () => {
    const reports = getAllReports();
    exportReportsToCSV(reports);
    setNotice(`Berkas CSV berisi ${reports.length} pengajuan telah diunduh.`);
    setTimeout(() => setNotice(null), 4000);
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <div>
      <header className="adx-page-head">
        <div className="adx-page-head__main">
          <span className="adx-page-head__eyebrow">Sistem</span>
          <h1 className="adx-page-head__title">Pengaturan</h1>
          <p className="adx-page-head__desc">
            Informasi sesi petugas, konfigurasi layanan, dan pencadangan data.
          </p>
        </div>
      </header>

      {notice && <div className="adx-notice adx-notice--ok">{notice}</div>}

      <section className="adx-card" style={{ marginBottom: '1.25rem' }}>
        <div className="adx-card__head">Sesi Petugas</div>
        <div className="adx-card__body">
          <dl className="adx-facts">
            <div className="adx-fact">
              <dt>Nama</dt>
              <dd>{session?.name || '—'}</dd>
            </div>
            <div className="adx-fact">
              <dt>Peran</dt>
              <dd>{session?.role || '—'}</dd>
            </div>
            <div className="adx-fact">
              <dt>Unit kerja</dt>
              <dd className="is-plain">{session?.opd || '—'}</dd>
            </div>
            <div className="adx-fact">
              <dt>Masuk sejak</dt>
              <dd className="is-plain">
                {session?.loggedInAt
                  ? new Date(session.loggedInAt).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })
                  : '—'}
              </dd>
            </div>
          </dl>
          <button
            type="button"
            className="adx-btn"
            style={{ marginTop: '1rem' }}
            onClick={handleLogout}
          >
            <Icon name="log-out" size={14} color="currentColor" />
            <span>Akhiri Sesi</span>
          </button>
        </div>
      </section>

      <section className="adx-card" style={{ marginBottom: '1.25rem' }}>
        <div className="adx-card__head">Kategori Layanan Aktif</div>
        <div className="adx-card__body">
          <ul className="adx-list" style={{ margin: '-1.05rem -1.1rem -1.25rem' }}>
            {CATEGORIES.map((cat) => (
              <li key={cat.id} className="adx-list__row" style={{ gridTemplateColumns: 'minmax(0,1fr) 140px' }}>
                <div className="adx-list__main">
                  <p className="adx-list__title">{cat.name}</p>
                  <p className="adx-list__sub">{cat.description}</p>
                </div>
                <span className="adx-list__value">
                  <span className="adx-tag">{cat.icon === 'shield' ? 'Hukum' : cat.icon === 'message' ? 'Aduan' : 'Narasumber'}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="adx-card" style={{ marginBottom: '1.25rem' }}>
        <div className="adx-card__head">Alur Status Kerja</div>
        <div className="adx-card__body">
          <dl className="adx-facts">
            {ADMIN_STATUSES.map((s, idx) => (
              <div className="adx-fact" key={s.id}>
                <dt>Tahap {idx + 1}</dt>
                <dd>
                  {s.label}
                  <span style={{ display: 'block', fontWeight: 400, fontSize: '0.71875rem', color: '#8C8C8C' }}>
                    {s.desc}
                  </span>
                </dd>
              </div>
            ))}
            <div className="adx-fact">
              <dt>Wilayah</dt>
              <dd className="is-plain">{RIAU_REGIONS.length} kabupaten/kota terdaftar</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="adx-card">
        <div className="adx-card__head">Pencadangan Data</div>
        <div className="adx-card__body">
          <p style={{ margin: '0 0 0.85rem', fontSize: '0.8125rem', lineHeight: 1.65, color: '#686868' }}>
            Data pengajuan tersimpan di penyimpanan peramban ini. Unduh berkas CSV secara
            berkala sebagai cadangan. Berkas dapat dibuka di aplikasi lembar kerja.
          </p>
          <button type="button" className="adx-btn adx-btn--primary" onClick={handleExportAll}>
            <Icon name="download" size={14} color="currentColor" />
            <span>Unduh Seluruh Data (CSV)</span>
          </button>
        </div>
      </section>
    </div>
  );
}
