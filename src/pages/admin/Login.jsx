import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from "../../components/Icon";
import { loginAdmin, getAdminSession } from "../../services/storage";

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
    <div className="admin-login">
      <header className="admin-login__topbar">
        <div className="gov-container admin-login__topbar-inner">
          <Link to="/" className="admin-login__brand">
            <img src="/images/logo.jpeg" alt="Logo IFPI" width="36" height="36" />
            <span className="admin-login__brand-text">
              <strong>IKATAN FUNGSIONAL PENGADAAN INDONESIA</strong>
              <span>Panel Administrasi &amp; Verifikasi Resmi</span>
            </span>
          </Link>
          <Link to="/" className="gov-btn gov-btn-outline-neutral gov-btn-sm">
            <Icon name="arrow-left" size={14} />
            <span>Kembali ke Portal Publik</span>
          </Link>
        </div>
      </header>

      <main className="admin-login__main">
        <div className="admin-login__card">
          <div className="admin-login__head">
            <span className="admin-login__eyebrow">Akses Terbatas</span>
            <h1 className="admin-login__title">Masuk Panel Petugas IFPI</h1>
            <p className="admin-login__lede">
              Khusus pengurus dan verifikator DPW Ikatan Fungsional Pengadaan Indonesia Provinsi Riau.
            </p>
          </div>

          <p className="admin-login__disclaimer">
            <strong>Catatan prototype.</strong> Autentikasi berjalan lokal di peramban (localStorage)
            untuk demonstrasi fungsional. Sistem operasional riil akan memakai backend, token
            terenkripsi, RBAC, dan basis data terenkripsi.
          </p>

          {error && (
            <div className="gov-alert gov-alert-danger admin-login__alert" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="gov-form-group">
              <label htmlFor="admin-username" className="gov-label">
                Nama Pengguna
              </label>
              <input
                type="text"
                id="admin-username"
                className="gov-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                autoComplete="username"
                required
              />
            </div>

            <div className="gov-form-group">
              <label htmlFor="admin-password" className="gov-label">
                Kata Sandi
              </label>
              <input
                type="password"
                id="admin-password"
                className="gov-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="gov-btn gov-btn-primary admin-login__submit"
              id="btn-admin-login-submit"
            >
              <Icon name="lock" size={16} />
              <span>{isSubmitting ? 'Memverifikasi...' : 'Masuk ke Dashboard'}</span>
            </button>
          </form>

          <div className="admin-login__accounts">
            <span className="admin-login__accounts-label">Akun prototype untuk evaluasi</span>

            <button
              type="button"
              className="admin-login__account"
              onClick={() => handleQuickFill('admin', 'admin123')}
            >
              <span className="admin-login__account-cred">
                <strong>admin</strong>
                <span> / admin123</span>
              </span>
              <span className="admin-login__account-role">Super Admin Diskominfotik</span>
              <span className="admin-login__account-action">Isi otomatis</span>
            </button>

            <button
              type="button"
              className="admin-login__account"
              onClick={() => handleQuickFill('petugas', 'riau2026')}
            >
              <span className="admin-login__account-cred">
                <strong>petugas</strong>
                <span> / riau2026</span>
              </span>
              <span className="admin-login__account-role">Petugas Verifikator OPD</span>
              <span className="admin-login__account-action">Isi otomatis</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
