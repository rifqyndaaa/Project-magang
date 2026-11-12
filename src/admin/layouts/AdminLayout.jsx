import { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { getAdminSession, logoutAdmin } from '../../shared/services/storage';
import Icon from '../../shared/components/Icon';

export default function AdminLayout() {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const session = getAdminSession();
    if (!session) {
      navigate('/admin/login', { replace: true });
    } else {
      setAdminUser(session);
    }
    setIsChecking(false);
  }, [navigate]);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  if (isChecking) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: 'var(--neutral-50)' }}>
        <p style={{ color: 'var(--neutral-600)', fontSize: '0.9375rem' }}>Memuat modul verifikasi petugas...</p>
      </div>
    );
  }

  if (!adminUser) return null;

  return (
    <div className="gov-admin-shell">
      {/* Topbar Administrator */}
      <header className="gov-admin-topbar">
        <div className="gov-admin-brand">
          <img src="/images/logo.jpeg" alt="Logo IFPI" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="gov-admin-title">Panel Petugas &amp; Verifikator IFPI</span>
              <span className="gov-admin-badge" style={{ backgroundColor: 'var(--ifpi-red)' }}>IFPI PANEL</span>
            </div>
            <div style={{ fontSize: '0.725rem', color: '#94A3B8' }}>
              Ikatan Fungsional Pengadaan Indonesia &bull; Pengelolaan Layanan Terpadu
            </div>
          </div>
        </div>

        <div className="gov-admin-user">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="gov-btn gov-btn-outline-neutral gov-btn-sm"
            style={{ color: '#E2E8F0', borderColor: '#475569', backgroundColor: 'transparent' }}
            title="Buka Halaman Publik di Tab Baru"
          >
            <Icon name="search" size={14} color="#CBD5E1" />
            <span>Lihat Portal Publik</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderLeft: '1px solid #334155', paddingLeft: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 700, color: '#F8FAFC', fontSize: '0.8125rem' }}>{adminUser.name}</div>
              <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{adminUser.role} - {adminUser.opd}</div>
            </div>
            <button
              onClick={handleLogout}
              className="gov-btn gov-btn-outline-neutral gov-btn-sm"
              style={{ color: '#FECACA', borderColor: '#7F1D1D', backgroundColor: '#450A0A' }}
              title="Keluar dari Panel Admin"
            >
              <Icon name="log-out" size={14} color="#FCA5A5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="gov-admin-container">
        <Outlet />
      </main>

      {/* Footer Admin Sederhana */}
      <footer style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--neutral-200)', padding: '0.75rem 0', fontSize: '0.75rem', color: 'var(--neutral-500)', textAlign: 'center' }}>
        Panel Prototype Pengaduan Pemprov Riau &bull; Penyimpanan Data Browser (localStorage) &bull; Sistem Nyata Memerlukan Server Backend & Autentikasi RBAC Terverifikasi
      </footer>
    </div>
  );
}
