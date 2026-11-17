import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from "../../components/Icon";
import { loginAdmin, getAdminSession } from "../../services/storage";

/* Foto latar resmi dari public/images */
const SCENES = [
  {
    src: '/images/pelayanan-publik-riau.jpg',
    caption: 'Pelayanan publik Pemerintah Provinsi Riau',
  },
  {
    src: '/images/jembatan-siak.jpg',
    caption: 'Jembatan Siak IV, Pekanbaru',
  },
  {
    src: '/images/istana-siak.jpg',
    caption: 'Istana Siak Sri Indrapura',
  },
];

const capabilities = [
  'Verifikasi dan penanganan pengajuan masyarakat',
  'Rekapitulasi layanan, pengaduan, dan undangan narasumber',
  'Pemutakhiran struktur, wilayah, kegiatan, dan literasi',
];

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [scene, setScene] = useState(0);

  useEffect(() => {
    if (getAdminSession()) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return undefined;
    const timer = window.setInterval(() => {
      setScene((prev) => (prev + 1) % SCENES.length);
    }, 8000);
    return () => window.clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await loginAdmin(username, password);
      if (res.success) {
        navigate('/admin', { replace: true });
      } else {
        setError(res.message);
        setIsSubmitting(false);
      }
    } catch (err) {
      setError(`Terjadi kendala: ${err.message}`);
      setIsSubmitting(false);
    }
  };

  const handleQuickFill = (u, p) => {
    setUsername(u);
    setPassword(p);
    setError('');
  };

  const handleCapsCheck = (e) => {
    if (typeof e.getModifierState === 'function') {
      setCapsLock(e.getModifierState('CapsLock'));
    }
  };

  return (
    <div className="adx-login">
      <div className="adx-login__stage">
        <aside className="adx-login__scene" aria-label="Tentang panel petugas IFPI">
          <div className="adx-login__slides" aria-hidden="true">
            {SCENES.map((item, index) => (
              <div
                key={item.src}
                className={`adx-login__slide${index === scene ? ' is-active' : ''}`}
                style={{ backgroundImage: `url('${item.src}')` }}
              />
            ))}
          </div>
          <div className="adx-login__scrim" aria-hidden="true" />

          <div className="adx-login__scene-inner">
            <Link to="/" className="adx-login__scene-brand">
              <img src="/images/logo.jpeg" alt="Logo IFPI" />
              <span>
                <strong>Ikatan Fungsional Pengadaan Indonesia</strong>
                <em>Provinsi Riau &middot; Panel Petugas &amp; Verifikator</em>
              </span>
            </Link>

            <div className="adx-login__scene-copy">
              <span className="adx-login__scene-eyebrow">Ruang kerja resmi pengurus</span>
              <h2 className="adx-login__scene-title">
                Satu pintu penanganan layanan dan pengaduan anggota.
              </h2>
              <p className="adx-login__scene-lede">
                Panel ini dipakai pengurus dan verifikator DPW IFPI Provinsi Riau untuk
                menindaklanjuti setiap pengajuan yang masuk dari portal publik.
              </p>

              <ul className="adx-login__scene-list">
                {capabilities.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
            </div>

            <p className="adx-login__scene-foot">
              <span>{SCENES[scene].caption}</span>
              <span className="adx-login__scene-dots" aria-hidden="true">
                {SCENES.map((item, index) => (
                  <i key={item.src} className={index === scene ? 'is-active' : ''} />
                ))}
              </span>
            </p>
          </div>
        </aside>

        <main className="adx-login__panel">
          <div className="adx-login__panel-inner">
            <Link to="/" className="adx-login__portal">
              <Icon name="arrow-left" size={13} color="currentColor" />
              <span>Kembali ke Portal Publik</span>
            </Link>

            <header className="adx-login__head">
              <span className="adx-login__eyebrow">Akses terbatas</span>
              <h1 className="adx-login__title">Masuk Panel Petugas IFPI</h1>
              <p className="adx-login__lede">
                Khusus pengurus dan verifikator resmi DPW Ikatan Fungsional Pengadaan Indonesia
                Provinsi Riau.
              </p>
            </header>

            {error && (
              <div className="adx-notice adx-notice--err adx-login__error" role="alert">
                <Icon name="alert-circle" size={15} color="currentColor" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="adx-field-stack">
                <div className="adx-field">
                  <label htmlFor="admin-username" className="adx-field__label">
                    Nama pengguna
                  </label>
                  <div className="adx-login__control">
                    <Icon name="user" size={15} color="currentColor" className="adx-login__control-icon" />
                    <input
                      type="text"
                      id="admin-username"
                      className="adx-input adx-login__input"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Masukkan nama pengguna"
                      autoComplete="username"
                      autoCapitalize="none"
                      spellCheck="false"
                      required
                    />
                  </div>
                </div>

                <div className="adx-field">
                  <label htmlFor="admin-password" className="adx-field__label">
                    Kata sandi
                  </label>
                  <div className="adx-login__control">
                    <Icon name="lock" size={15} color="currentColor" className="adx-login__control-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="admin-password"
                      className="adx-input adx-login__input adx-login__input--secret"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyUp={handleCapsCheck}
                      onKeyDown={handleCapsCheck}
                      onBlur={() => setCapsLock(false)}
                      placeholder="Masukkan kata sandi"
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      className="adx-login__reveal"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-pressed={showPassword}
                      aria-controls="admin-password"
                      title={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                    >
                      <Icon name={showPassword ? 'eye-off' : 'eye'} size={15} color="currentColor" />
                      <span className="gov-visually-hidden">
                        {showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                      </span>
                    </button>
                  </div>
                  {capsLock && (
                    <p className="adx-login__hint" role="status">
                      Caps Lock aktif — kata sandi akan diketik dalam huruf besar.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="adx-btn adx-btn--primary adx-login__submit"
                  id="btn-admin-login-submit"
                >
                  <Icon name="arrow-right" size={15} color="currentColor" />
                  <span>{isSubmitting ? 'Memverifikasi…' : 'Masuk ke Panel'}</span>
                </button>
              </div>
            </form>

            <section className="adx-login__creds" aria-label="Akun resmi pengurus">
              <h2 className="adx-login__creds-title">Akun Resmi Tersedia</h2>
              <div className="adx-login__creds-grid">
                <button
                  type="button"
                  className="adx-login__cred"
                  onClick={() => handleQuickFill('admin', 'admin123')}
                >
                  <strong>Super Admin</strong>
                  <code>admin / admin123</code>
                  <span>Isi otomatis</span>
                </button>

                <button
                  type="button"
                  className="adx-login__cred"
                  onClick={() => handleQuickFill('petugas', 'riau2026')}
                >
                  <strong>Petugas Verifikator</strong>
                  <code>petugas / riau2026</code>
                  <span>Isi otomatis</span>
                </button>
              </div>
              <p className="adx-login__note">
                Klik kartu akun di atas untuk mengisi otomatis nama pengguna dan kata sandi resmi.
              </p>
            </section>

            <p className="adx-login__note adx-login__note--legal">
              <strong>Keamanan Portal.</strong> Akses halaman ini dilindungi dan hanya dapat digunakan oleh pengurus yang memiliki wewenang resmi DPW IFPI Provinsi Riau.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
