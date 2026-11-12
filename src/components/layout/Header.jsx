import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from '../common/Icon';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`gov-header-official ${scrolled ? 'is-scrolled' : ''}`} role="banner">
      <div className="gov-container gov-header-official-inner">
        {/* SISI KIRI: Brand Pemerintah */}
        <Link to="/" className="gov-official-brand" onClick={closeMenu} aria-label="Beranda Layanan Pengaduan Pemprov Riau">
          <img
            src="/images/logo.jpeg"
            alt="Lambang Resmi Pemerintah Provinsi Riau"
            className="gov-official-logo"
            width="44"
            height="44"
          />
          <div className="gov-official-brand-text">
            <span className="gov-brand-instansi">PEMERINTAH PROVINSI RIAU</span>
            <span className="gov-brand-layanan">Ikatan Fungsional Pengadaan Indonesia</span>
          </div>
        </Link>

        {/* Tombol Hamburger Mobile */}
        <button
          type="button"
          className="gov-mobile-toggle"
          aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(prev => !prev)}
        >
          <Icon name={mobileMenuOpen ? 'x' : 'menu'} size={22} color="var(--neutral-800)" />
        </button>

        {/* Menu Navigasi & Akses Admin */}
        <nav
          className={`gov-official-nav ${mobileMenuOpen ? 'is-open' : ''}`}
          aria-label="Navigasi Utama"
        >
          <ul className="gov-official-nav-links">
            <li>
              <NavLink to="/" end onClick={closeMenu}>
                Beranda
              </NavLink>
            </li>
            <li>
              <NavLink to="/layanan" onClick={closeMenu}>
                Layanan
              </NavLink>
            </li>
            <li>
              <NavLink to="/produk" onClick={closeMenu}>
                Etalase Produk
              </NavLink>
            </li>
            <li>
              <NavLink to="/struktur" onClick={closeMenu}>
                Struktur Organisasi
              </NavLink>
            </li>
            <li>
              <NavLink to="/informasi" onClick={closeMenu}>
                Informasi
              </NavLink>
            </li>
            <li>
              <NavLink to="/kontak" onClick={closeMenu}>
                Kontak
              </NavLink>
            </li>
            <li>
              <NavLink to="/track" onClick={closeMenu}>
                Lacak Laporan
              </NavLink>
            </li>
          </ul>

          {/* Akses Admin */}
          <div className="gov-nav-admin-subtle">
            <Link
              to="/admin/login"
              className="gov-admin-link"
              title="Akses masuk verifikator dan administrator pengaduan"
              onClick={closeMenu}
            >
              Akses Admin
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
