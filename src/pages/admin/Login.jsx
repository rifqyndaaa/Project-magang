import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from "../../components/Icon";
import { loginAdmin, getAdminSession } from "../../services/storage";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
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
    <div className="adx-login">
      <header className="adx-login__bar">
        <Link to="/" className="adx-login__brand">
          <img src="/images/logo.jpeg" alt="Logo IFPI" />
          <span>
            <strong>IKATAN FUNGSIONAL PENGADAAN INDONESIA</strong>
            <span>Panel Administrasi &amp; Verifikasi Resmi</span>
          </span>
        </Link>
        <Link to="/" className="adx-portal-link">
          <Icon name="arrow-left" size={13} color="currentColor" />
          <span>Portal Publik</span>
        </Link>
      </header>

      <main className="adx-login__main">
        <div className="adx-login__wrap">
          <div className="adx-login__form">
            <span className="adx-login__eyebrow">Akses terbatas</span>
            <h1 className="adx-login__title">Masuk Panel Petugas IFPI</h1>
            <p className="adx-login__lede">
              Khusus pengurus dan verifikator DPW Ikatan Fungsional Pengadaan Indonesia
              Provinsi Riau.
            </p>

            {error && (
              <div className="adx-notice adx-notice--err" role="alert" style={{ marginBottom: '1.25rem' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="adx-field-stack">
                <div className="adx-field">
                  <label htmlFor="admin-username" className="adx-field__label">Nama pengguna</label>
                  <input
                    type="text"
                    id="admin-username"
                    className="adx-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan username"
                    autoComplete="username"
                    required
                  />
                </div>

                <div className="adx-field">
                  <label htmlFor="admin-password" className="adx-field__label">Kata sandi</label>
                  <input
                    type="password"
                    id="admin-password"
                    className="adx-input"
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
                  className="adx-btn adx-btn--primary adx-login__submit"
                  id="btn-admin-login-submit"
                >
                  <Icon name="lock" size={15} color="currentColor" />
                  <span>{isSubmitting ? 'Memverifikasi…' : 'Masuk ke Panel'}</span>
                </button>
              </div>
            </form>

            <p className="adx-login__note">
              <strong>Catatan purwarupa.</strong> Autentikasi berjalan lokal di peramban ini
              untuk keperluan demonstrasi. Sistem operasional memerlukan backend, token
              terenkripsi, dan kendali akses berbasis peran.
            </p>
          </div>

          <aside className="adx-login__aside">
            <h2 className="adx-login__aside-title">Akun evaluasi</h2>

            <button type="button" className="adx-login__cred" onClick={() => handleQuickFill('admin', 'admin123')}>
              <strong>Super Admin</strong>
              <code>admin / admin123</code>
              <span>Isi otomatis</span>
            </button>

            <button type="button" className="adx-login__cred" onClick={() => handleQuickFill('petugas', 'riau2026')}>
              <strong>Petugas Verifikator</strong>
              <code>petugas / riau2026</code>
              <span>Isi otomatis</span>
            </button>

            <p className="adx-login__note" style={{ marginTop: '1rem' }}>
              Kedua peran memiliki akses yang sama pada purwarupa ini. Nama petugas yang masuk
              otomatis dipakai sebagai pencatat pada riwayat penanganan.
            </p>
          </aside>
        </div>
      </main>
    </div>
  );
}
