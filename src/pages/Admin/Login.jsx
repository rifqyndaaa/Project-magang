import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '../../components/common/Icon';
import { loginAdmin, getAdminSession } from '../../utils/storage';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Jika sudah login, langsung ke dashboard admin
    if (getAdminSession()) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const res = loginAdmin(username, password);
    if (res.success) {
      navigate('/admin', { replace: true });
    } else {
      setError(res.message);
      setIsSubmitting(false);
    }
  };

  const handleQuickFill = (u, p) => {
    setUsername(u);
    setPassword(p);
    setError('');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--neutral-100)' }}>
      {/* Mini Header */}
      <header style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--neutral-200)', padding: '0.875rem 0' }}>
        <div className="gov-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <img src="/logo-riau.svg" alt="Riau" style={{ width: '32px', height: '40px' }} />
            <div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--gov-blue-dark)', lineHeight: 1.2 }}>
                Pemerintah Provinsi Riau
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)' }}>
                Portal Pengaduan & Aspirasi Masyarakat
              </div>
            </div>
          </Link>
          <Link to="/" className="gov-btn gov-btn-outline-neutral gov-btn-sm">
            <Icon name="arrow-left" size={14} />
            <span>Kembali ke Portal Publik</span>
          </Link>
        </div>
      </header>

      {/* Main Login Card */}
      <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        <div className="gov-card" style={{ width: '100%', maxWidth: '440px', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--gov-blue-soft)', color: 'var(--gov-blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem auto' }}>
              <Icon name="lock" size={24} />
            </div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--neutral-900)', margin: 0 }}>
              Masuk Panel Petugas & Admin
            </h1>
            <p style={{ fontSize: '0.8125rem', color: 'var(--neutral-500)', marginTop: '0.25rem' }}>
              Khusus pengelola pengaduan dan verifikator OPD Pemerintah Provinsi Riau
            </p>
          </div>

          {/* Prototype Security Disclaimer */}
          <div className="gov-alert gov-alert-warning" style={{ fontSize: '0.75rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
            <strong>Catatan Keamanan Prototype:</strong> Autentikasi sesi ini dijalankan secara lokal di peramban (localStorage) untuk keperluan demonstrasi fungsional prototype. Sistem operasional riil nantinya menggunakan server backend, enkripsi token, kontrol hak akses (RBAC), dan basis data terenkripsi.
          </div>

          {error && (
            <div className="gov-alert gov-alert-danger" style={{ fontSize: '0.8125rem', marginBottom: '1rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="gov-form-group">
              <label htmlFor="admin-username" className="gov-label" style={{ fontSize: '0.8125rem' }}>
                Nama Pengguna (Username)
              </label>
              <input
                type="text"
                id="admin-username"
                className="gov-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                required
              />
            </div>

            <div className="gov-form-group">
              <label htmlFor="admin-password" className="gov-label" style={{ fontSize: '0.8125rem' }}>
                Kata Sandi (Password)
              </label>
              <input
                type="password"
                id="admin-password"
                className="gov-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="gov-btn gov-btn-primary"
              style={{ width: '100%', marginTop: '0.5rem' }}
              id="btn-admin-login-submit"
            >
              <Icon name="lock" size={16} />
              <span>{isSubmitting ? 'Memverifikasi...' : 'Masuk ke Dashboard'}</span>
            </button>
          </form>

          {/* Quick Login Helper untuk Memudahkan Evaluasi / Penguji */}
          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--neutral-200)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neutral-600)', display: 'block', marginBottom: '0.5rem' }}>
              Akun Prototype untuk Evaluasi:
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => handleQuickFill('admin', 'admin123')}
                style={{ textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.75rem', backgroundColor: 'var(--neutral-50)', border: '1px solid var(--neutral-300)', borderRadius: '4px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
              >
                <span><strong>admin</strong> / admin123 (Super Admin Diskominfotik)</span>
                <span style={{ color: 'var(--gov-blue)', fontWeight: 600 }}>Pilih</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('petugas', 'riau2026')}
                style={{ textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.75rem', backgroundColor: 'var(--neutral-50)', border: '1px solid var(--neutral-300)', borderRadius: '4px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
              >
                <span><strong>petugas</strong> / riau2026 (Petugas Verifikator OPD)</span>
                <span style={{ color: 'var(--gov-blue)', fontWeight: 600 }}>Pilih</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
