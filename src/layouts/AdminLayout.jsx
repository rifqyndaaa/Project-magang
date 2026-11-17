import { useEffect, useMemo, useState } from 'react';
import { Outlet, useNavigate, Link, NavLink, useLocation } from 'react-router-dom';
import { getAdminSession, logoutAdmin, getReportStats } from '../services/storage';
import Icon from '../components/Icon';

/**
 * Kelompok Navigasi Menu Admin Resmi IFPI Riau
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
      { to: '/admin/wilayah', label: 'Wilayah & Personel', icon: 'map-pin' },
      { to: '/admin/kegiatan', label: 'Kegiatan & Agenda', icon: 'calendar' }
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

  const [adminUser] = useState(() => getAdminSession());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!adminUser) navigate('/admin/login', { replace: true });
  }, [adminUser, navigate]);

  const counts = useMemo(
    () => {
      if (!adminUser) return { total: 0, baru: 0 };
      const stats = getReportStats();
      return { total: stats.total, baru: stats.baru };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [adminUser, location.pathname]
  );

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  if (!adminUser) return null;

  const initials = (adminUser.name || 'Admin')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();

  return (
    <div className="adx-shell">
      <a href="#adx-main-content" className="adx-skip-link">
        Lompat ke konten utama
      </a>

      {/* HEADER UTAMA ADMIN */}
      <header className="adx-header">
        <div className="adx-header__left">
          <button
            type="button"
            className="adx-header__toggle"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            aria-expanded={mobileMenuOpen}
          >
            <Icon name={mobileMenuOpen ? 'x' : 'menu'} size={20} color="currentColor" />
          </button>

          <Link to="/admin" className="adx-header__brand">
            <img src="/images/logo.jpeg" alt="Logo IFPI" className="adx-header__logo" />
            <div className="adx-header__titles">
              <span className="adx-header__title">Panel Petugas &amp; Verifikator IFPI</span>
              <span className="adx-header__subtitle">Ikatan Fungsional Pengadaan Indonesia &middot; DPW Riau</span>
            </div>
          </Link>
        </div>

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
            <div className="adx-account__avatar" aria-hidden="true">
              {initials || 'AD'}
            </div>
            <div className="adx-account__text">
              <span className="adx-account__name">{adminUser.name}</span>
              <span className="adx-account__meta">
                <span className="adx-account__badge">{adminUser.role}</span>
              </span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="adx-logout"
              title="Keluar dari panel admin"
            >
              <Icon name="log-out" size={13} color="currentColor" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* FRAME: SIDEBAR + MAIN CONTENT */}
      <div className="adx-frame">
        {/* Overlay backdrop mobile */}
        {mobileMenuOpen && (
          <div
            className="adx-sidebar-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* SIDEBAR NAVIGASI */}
        <aside
          className={`adx-sidebar ${mobileMenuOpen ? 'is-open' : ''}`}
          aria-label="Navigasi panel admin"
        >
          <div className="adx-sidebar__content">
            {NAV_GROUPS.map((group) => (
              <div className="adx-sidebar__group" key={group.label}>
                <span className="adx-sidebar__label">{group.label}</span>
                <nav className="adx-nav">
                  {group.items.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) => `adx-nav__item${isActive ? ' is-active' : ''}`}
                    >
                      <Icon name={item.icon} size={15} color="currentColor" />
                      <span className="adx-nav__text">{item.label}</span>
                      {item.countKey && counts[item.countKey] > 0 && (
                        <span className="adx-nav__count" aria-hidden="true">
                          {counts[item.countKey]}
                        </span>
                      )}
                      {item.countKey && counts[item.countKey] > 0 && (
                        <span className="gov-visually-hidden">
                          , {counts[item.countKey]} pengajuan
                        </span>
                      )}
                    </NavLink>
                  ))}
                </nav>
              </div>
            ))}
          </div>

          <div className="adx-sidebar__foot">
            <div className="adx-sidebar__foot-badge">
              <span className="adx-sidebar__dot" />
              <span>Cloud Database Aktif</span>
            </div>
            <p className="adx-sidebar__foot-copy">
              DPW IFPI Provinsi Riau &middot; 2026
            </p>
          </div>
        </aside>

        {/* AREA KONTEN UTAMA */}
        <main className="adx-main" id="adx-main-content" tabIndex={-1}>
          <div className="adx-main__inner">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
