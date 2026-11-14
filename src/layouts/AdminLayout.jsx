import { useEffect, useMemo, useState } from 'react';
import { Outlet, useNavigate, Link, NavLink, useLocation } from 'react-router-dom';
import { getAdminSession, logoutAdmin, getReportStats } from '../services/storage';
import Icon from '../components/Icon';

/**
 * Rangka Panel Admin IFPI.
 *
 * Struktur: header institusional (gelap, garis aksen merah) + sidebar
 * pengelompokan menu + area konten.
 *
 * Setiap item navigasi di sini memiliki halaman nyata. Tidak ada tautan mati.
 */
const NAV_GROUPS = [
  {
    label: 'Pengelolaan Layanan',
    items: [
      { to: '/admin', label: 'Panel Kendali', icon: 'shield', end: true },
      { to: '/admin/pengajuan', label: 'Data Pengajuan', icon: 'file-check', countKey: 'total' },
      { to: '/admin/penanganan', label: 'Verifikasi & Penanganan', icon: 'clock', countKey: 'baru' }
    ]
  },
  {
    label: 'Data Organisasi',
    items: [
      { to: '/admin/organisasi', label: 'Struktur Organisasi', icon: 'users' },
      { to: '/admin/wilayah', label: 'Wilayah', icon: 'map-pin' },
      { to: '/admin/kegiatan', label: 'Kegiatan', icon: 'star' }
    ]
  },
  {
    label: 'Etalase',
    items: [
      { to: '/admin/merchandise', label: 'Merchandise', icon: 'shopping-bag' }
    ]
  },
  {
    label: 'Sistem',
    items: [
      { to: '/admin/pengaturan', label: 'Pengaturan', icon: 'lock' }
    ]
  }
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Sesi dibaca sekali saat mount — tidak memerlukan effect.
  const [adminUser] = useState(() => getAdminSession());

  useEffect(() => {
    if (!adminUser) navigate('/admin/login', { replace: true });
  }, [adminUser, navigate]);

  // Hitungan menu diturunkan dari data nyata dan dihitung ulang setiap
  // perpindahan halaman, tanpa menyimpan salinan di state.
  const counts = useMemo(
    () => {
      if (!adminUser) return { total: 0, baru: 0 };
      const stats = getReportStats();
      return { total: stats.total, baru: stats.baru };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [adminUser, location.pathname]
  );

  const accessLabel = adminUser
    ? (adminUser.role === 'Super Admin' ? 'Akses penuh' : 'Akses verifikator')
    : '';

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  if (!adminUser) return null;

  return (
    <div className="adx-shell">
      <header className="adx-header">
        <Link to="/admin" className="adx-header__brand">
          <img src="/images/logo.jpeg" alt="Logo IFPI" className="adx-header__logo" />
          <span className="adx-header__titles">
            <span className="adx-header__title">Panel Petugas &amp; Verifikator IFPI</span>
            <span className="adx-header__subtitle">Ikatan Fungsional Pengadaan Indonesia</span>
          </span>
        </Link>

        <div className="adx-header__right">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="adx-portal-link"
            title="Buka portal publik di tab baru"
          >
            <Icon name="external-link" size={13} color="currentColor" />
            <span>Lihat Portal Publik</span>
          </Link>

          <div className="adx-account">
            <div className="adx-account__text">
              <span className="adx-account__name">{adminUser.name}</span>
              <span className="adx-account__meta">
                {adminUser.role} &middot; {accessLabel}
              </span>
            </div>
            <button type="button" onClick={handleLogout} className="adx-logout" title="Keluar dari panel">
              <Icon name="log-out" size={13} color="currentColor" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      <div className="adx-frame">
        <aside className="adx-sidebar" aria-label="Navigasi panel admin">
          {NAV_GROUPS.map((group) => (
            <div className="adx-sidebar__group" key={group.label}>
              <span className="adx-sidebar__label">{group.label}</span>
              <nav className="adx-nav">
                {group.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) => `adx-nav__item${isActive ? ' is-active' : ''}`}
                  >
                    <Icon name={item.icon} size={15} color="currentColor" />
                    <span className="adx-nav__text">{item.label}</span>
                    {item.countKey && counts[item.countKey] > 0 && (
                      <span className="adx-nav__count">{counts[item.countKey]}</span>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>
          ))}

          <p className="adx-sidebar__foot">
            DPW IFPI Provinsi Riau
            <br />
            Data tersimpan di peramban ini
          </p>
        </aside>

        <main className="adx-main">
          <div className="adx-main__inner">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
