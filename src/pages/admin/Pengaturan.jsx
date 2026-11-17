import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from "../../components/Icon";
import { getAdminSession, logoutAdmin, getAllReports, exportReportsToCSV } from '../../services/storage';
import { CATEGORIES, ADMIN_STATUSES, RIAU_REGIONS } from '../../data/categories';

/**
 * Pengaturan — informasi sesi petugas, integrasi cloud, dan pencadangan data.
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
          <span className="adx-page-head__eyebrow">Sistem &amp; Konfigurasi</span>
          <h1 className="adx-page-head__title">Pengaturan Panel</h1>
          <p className="adx-page-head__desc">
            Informasi sesi petugas aktif, status sinkronisasi cloud database, alur kerja, dan pencadangan data resmi.
          </p>
        </div>
      </header>

      {notice && <div className="adx-notice adx-notice--ok">{notice}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Kartu Sesi Petugas */}
        <section className="adx-card">
          <div className="adx-card__head">Sesi Petugas Aktif</div>
          <div className="adx-card__body">
            <dl className="adx-facts">
              <div className="adx-fact">
                <dt>Nama Lengkap</dt>
                <dd>{session?.name || '—'}</dd>
              </div>
              <div className="adx-fact">
                <dt>Hak Akses / Peran</dt>
                <dd style={{ color: 'var(--adx-red)' }}>{session?.role || 'Super Admin'}</dd>
              </div>
              <div className="adx-fact">
                <dt>Unit Kerja / OPD</dt>
                <dd className="is-plain">{session?.opd || 'Dewan Pengurus Wilayah IFPI Provinsi Riau'}</dd>
              </div>
              <div className="adx-fact">
                <dt>Waktu Masuk</dt>
                <dd className="is-plain">
                  {session?.loggedInAt
                    ? new Date(session.loggedInAt).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' }) + ' WIB'
                    : 'Sesi saat ini'}
                </dd>
              </div>
            </dl>
            <button
              type="button"
              className="adx-btn adx-btn--danger"
              style={{ marginTop: '1.25rem' }}
              onClick={handleLogout}
            >
              <Icon name="log-out" size={14} color="currentColor" />
              <span>Keluar dari Sesi</span>
            </button>
          </div>
        </section>

        {/* Kartu Integrasi Cloud Database */}
        <section className="adx-card">
          <div className="adx-card__head">Integrasi Cloud Database</div>
          <div className="adx-card__body">
            <dl className="adx-facts">
              <div className="adx-fact">
                <dt>Layanan Database</dt>
                <dd>Supabase Cloud PostgreSQL</dd>
              </div>
              <div className="adx-fact">
                <dt>Nama Basis Data</dt>
                <dd className="adx-mono">ifpi-riau-db</dd>
              </div>
              <div className="adx-fact">
                <dt>Zona Wilayah</dt>
                <dd className="is-plain">ap-southeast-1 (Singapura)</dd>
              </div>
              <div className="adx-fact">
                <dt>Status Koneksi</dt>
                <dd>
                  <span className="adx-tag adx-tag--on" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span className="adx-sidebar__dot" style={{ width: '6px', height: '6px' }} />
                    Terhubung &amp; Sinkronisasi Aktif
                  </span>
                </dd>
              </div>
            </dl>
            <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--adx-ink-mute)', lineHeight: 1.5 }}>
              Setiap pengajuan baru dari masyarakat di portal publik langsung tersimpan dan disinkronkan ke panel admin secara otomatis.
            </p>
          </div>
        </section>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Kategori Layanan Aktif */}
        <section className="adx-card">
          <div className="adx-card__head">Kategori Layanan Resmi</div>
          <div className="adx-card__body">
            <ul className="adx-list" style={{ margin: '-1.25rem' }}>
              {CATEGORIES.map((cat) => (
                <li key={cat.id} className="adx-list__row" style={{ gridTemplateColumns: 'minmax(0,1fr) 110px' }}>
                  <div className="adx-list__main">
                    <p className="adx-list__title">{cat.name}</p>
                    <p className="adx-list__sub">{cat.description}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="adx-tag">{cat.icon === 'shield' ? 'Hukum' : cat.icon === 'message' ? 'Aduan' : 'Narasumber'}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Alur Tahap Penanganan */}
        <section className="adx-card">
          <div className="adx-card__head">Alur Tahap Penanganan</div>
          <div className="adx-card__body">
            <dl className="adx-facts">
              {ADMIN_STATUSES.map((s, idx) => (
                <div className="adx-fact" key={s.id}>
                  <dt>Tahap {idx + 1}</dt>
                  <dd>
                    {s.label}
                    <span style={{ display: 'block', fontWeight: 400, fontSize: '0.71875rem', color: 'var(--adx-ink-mute)' }}>
                      {s.desc}
                    </span>
                  </dd>
                </div>
              ))}
              <div className="adx-fact">
                <dt>Cakupan</dt>
                <dd className="is-plain">{RIAU_REGIONS.length} Kabupaten/Kota se-Provinsi Riau</dd>
              </div>
            </dl>
          </div>
        </section>
      </div>

      {/* Pencadangan Data CSV */}
      <section className="adx-card">
        <div className="adx-card__head">Pencadangan &amp; Ekspor Data Resmi</div>
        <div className="adx-card__body">
          <p style={{ margin: '0 0 1rem', fontSize: '0.84rem', lineHeight: 1.65, color: 'var(--adx-ink-soft)' }}>
            Data pengajuan terhubung dan tersinkronisasi otomatis dengan cloud database Supabase. Anda dapat mengunduh berkas CSV rekapitulasi lengkap secara berkala sebagai arsip lokal organisasi yang dapat dibuka pada Microsoft Excel atau aplikasi spreadsheet lainnya.
          </p>
          <button type="button" className="adx-btn adx-btn--primary" onClick={handleExportAll}>
            <Icon name="download" size={14} color="currentColor" />
            <span>Unduh Seluruh Data Pengajuan (CSV)</span>
          </button>
        </div>
      </section>
    </div>
  );
}
