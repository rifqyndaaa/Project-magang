import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Icon from '../common/Icon';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'layanan' | 'informasi' | null
  const [mobileSubmenu, setMobileSubmenu] = useState(null); // 'layanan' | 'informasi' | null
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tutup menu saat rute atau hash berubah
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileSubmenu(null);
  }, [location.pathname, location.search, location.hash]);

  // Tutup dropdown desktop saat klik di luar area navigasi
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileSubmenu(null);
  };

  const toggleMobileSubmenu = (menu) => {
    setMobileSubmenu(prev => (prev === menu ? null : menu));
  };

  // Navigasi dengan scroll halus ke target anchor in-page
  const handleAnchorClick = (hashId) => {
    closeMenu();
    setTimeout(() => {
      const el = document.getElementById(hashId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);
  };

  // Penentuan status aktif menu utama
  const isLayananActive =
    location.pathname.startsWith('/layanan') ||
    location.pathname.startsWith('/report') ||
    location.pathname.startsWith('/categories') ||
    location.pathname === '/track';

  const isInformasiActive =
    location.pathname.startsWith('/informasi') ||
    location.pathname.startsWith('/kontak');

  return (
    <header className={`gov-header-official ${scrolled ? 'is-scrolled' : ''}`} role="banner">
      <div className="gov-container gov-header-official-inner">
        {/* SISI KIRI: Brand Organisasi Resmi IFPI */}
        <Link to="/" className="gov-official-brand" onClick={closeMenu} aria-label="Beranda Portal Resmi IFPI">
          <img
            src="/images/logo.jpeg"
            alt="Logo Resmi Ikatan Fungsional Pengadaan Indonesia"
            className="gov-official-logo"
            width="46"
            height="46"
          />
          <div className="gov-official-brand-text">
            <span className="gov-brand-instansi">IKATAN FUNGSIONAL PENGADAAN INDONESIA</span>
            <span className="gov-brand-layanan">Portal Layanan & Pengaduan Resmi</span>
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

        {/* Menu Navigasi 4 Menu Utama & Akses Admin */}
        <nav
          ref={navRef}
          className={`gov-official-nav ${mobileMenuOpen ? 'is-open' : ''}`}
          aria-label="Navigasi Utama"
        >
          <ul className="gov-official-nav-links">
            {/* 1. BERANDA */}
            <li>
              <NavLink to="/" end onClick={closeMenu}>
                Beranda
              </NavLink>
            </li>

            {/* 2. LAYANAN (DROPDOWN) */}
            <li
              className={`gov-nav-has-dropdown ${activeDropdown === 'layanan' ? 'is-dropdown-open' : ''} ${mobileSubmenu === 'layanan' ? 'is-mobile-submenu-open' : ''}`}
              onMouseEnter={() => setActiveDropdown('layanan')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="gov-nav-parent-wrapper">
                <NavLink
                  to="/layanan"
                  className={`gov-nav-parent-link ${isLayananActive ? 'active' : ''}`}
                  onClick={(e) => {
                    if (window.innerWidth <= 900) {
                      e.preventDefault();
                      toggleMobileSubmenu('layanan');
                    } else {
                      closeMenu();
                    }
                  }}
                  aria-expanded={activeDropdown === 'layanan' || mobileSubmenu === 'layanan'}
                  aria-haspopup="true"
                >
                  <span>Layanan</span>
                  <span className="gov-nav-arrow-icon" aria-hidden="true">
                    <Icon name={mobileSubmenu === 'layanan' ? 'chevron-up' : 'chevron-down'} size={14} />
                  </span>
                </NavLink>

                {/* Tombol ekspansi mobile */}
                <button
                  type="button"
                  className="gov-mobile-submenu-btn"
                  aria-label="Buka submenu Layanan"
                  onClick={() => toggleMobileSubmenu('layanan')}
                >
                  <Icon name={mobileSubmenu === 'layanan' ? 'chevron-up' : 'chevron-down'} size={15} />
                </button>
              </div>

              {/* Isi Dropdown Layanan */}
              <div className="gov-dropdown-menu" role="menu">
                <Link
                  to="/report?category=hukum"
                  className="gov-dropdown-item"
                  role="menuitem"
                  onClick={closeMenu}
                >
                  <div className="gov-dropdown-item-content">
                    <span className="gov-dropdown-item-title">Permasalahan dan Konsultasi Hukum</span>
                    <span className="gov-dropdown-item-desc">Konsultasi regulasi, perdata, & telaah sengketa hukum daerah</span>
                  </div>
                </Link>

                <Link
                  to="/report?category=pengaduan"
                  className="gov-dropdown-item"
                  role="menuitem"
                  onClick={closeMenu}
                >
                  <div className="gov-dropdown-item-content">
                    <span className="gov-dropdown-item-title">Konsultasi Terkait Pengaduan</span>
                    <span className="gov-dropdown-item-desc">Tata cara aduan, konfirmasi tindak lanjut, & klarifikasi</span>
                  </div>
                </Link>

                <Link
                  to="/report?category=narasumber"
                  className="gov-dropdown-item"
                  role="menuitem"
                  onClick={closeMenu}
                >
                  <div className="gov-dropdown-item-content">
                    <span className="gov-dropdown-item-title">Permintaan Narasumber dan Undangan</span>
                    <span className="gov-dropdown-item-desc">Permohonan pemateri workshop, seminar, & undangan resmi</span>
                  </div>
                </Link>

                <div className="gov-dropdown-divider" role="separator" />

                <Link
                  to="/track"
                  className="gov-dropdown-item gov-dropdown-item-highlight"
                  role="menuitem"
                  onClick={closeMenu}
                >
                  <div className="gov-dropdown-item-content">
                    <span className="gov-dropdown-item-title">
                      <Icon name="search" size={14} className="gov-dropdown-item-icon" />
                      Lacak Laporan
                    </span>
                    <span className="gov-dropdown-item-desc">Pantau status tiket resmi pengajuan Anda</span>
                  </div>
                </Link>
              </div>
            </li>

            {/* 3. STRUKTUR ORGANISASI */}
            <li>
              <NavLink to="/struktur" onClick={closeMenu}>
                Struktur Organisasi
              </NavLink>
            </li>

            {/* 4. INFORMASI (DROPDOWN) */}
            <li
              className={`gov-nav-has-dropdown ${activeDropdown === 'informasi' ? 'is-dropdown-open' : ''} ${mobileSubmenu === 'informasi' ? 'is-mobile-submenu-open' : ''}`}
              onMouseEnter={() => setActiveDropdown('informasi')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="gov-nav-parent-wrapper">
                <NavLink
                  to="/informasi"
                  className={`gov-nav-parent-link ${isInformasiActive ? 'active' : ''}`}
                  onClick={(e) => {
                    if (window.innerWidth <= 900) {
                      e.preventDefault();
                      toggleMobileSubmenu('informasi');
                    } else {
                      closeMenu();
                    }
                  }}
                  aria-expanded={activeDropdown === 'informasi' || mobileSubmenu === 'informasi'}
                  aria-haspopup="true"
                >
                  <span>Informasi</span>
                  <span className="gov-nav-arrow-icon" aria-hidden="true">
                    <Icon name={mobileSubmenu === 'informasi' ? 'chevron-up' : 'chevron-down'} size={14} />
                  </span>
                </NavLink>

                {/* Tombol ekspansi mobile */}
                <button
                  type="button"
                  className="gov-mobile-submenu-btn"
                  aria-label="Buka submenu Informasi"
                  onClick={() => toggleMobileSubmenu('informasi')}
                >
                  <Icon name={mobileSubmenu === 'informasi' ? 'chevron-up' : 'chevron-down'} size={15} />
                </button>
              </div>

              {/* Isi Dropdown Informasi */}
              <div className="gov-dropdown-menu" role="menu">
                <Link
                  to="/informasi"
                  className="gov-dropdown-item"
                  role="menuitem"
                  onClick={closeMenu}
                >
                  <div className="gov-dropdown-item-content">
                    <span className="gov-dropdown-item-title">Informasi Layanan</span>
                    <span className="gov-dropdown-item-desc">Mekanisme pelayanan, SLA, dan standar operasional</span>
                  </div>
                </Link>

                <Link
                  to="/informasi#panduan"
                  className="gov-dropdown-item"
                  role="menuitem"
                  onClick={() => handleAnchorClick('panduan')}
                >
                  <div className="gov-dropdown-item-content">
                    <span className="gov-dropdown-item-title">Panduan Penggunaan</span>
                    <span className="gov-dropdown-item-desc">Tips penyampaian pengaduan yang efektif & tepat sasaran</span>
                  </div>
                </Link>

                <Link
                  to="/informasi#faq"
                  className="gov-dropdown-item"
                  role="menuitem"
                  onClick={() => handleAnchorClick('faq')}
                >
                  <div className="gov-dropdown-item-content">
                    <span className="gov-dropdown-item-title">FAQ / Pertanyaan Umum</span>
                    <span className="gov-dropdown-item-desc">Pertanyaan yang sering diajukan seputar penanganan laporan</span>
                  </div>
                </Link>

                <div className="gov-dropdown-divider" role="separator" />

                <Link
                  to="/kontak"
                  className="gov-dropdown-item gov-dropdown-item-highlight"
                  role="menuitem"
                  onClick={closeMenu}
                >
                  <div className="gov-dropdown-item-content">
                    <span className="gov-dropdown-item-title">
                      <Icon name="phone" size={14} className="gov-dropdown-item-icon" />
                      Kontak Kami
                    </span>
                    <span className="gov-dropdown-item-desc">Alamat sekretariat, nomor telepon, call center 112, & email</span>
                  </div>
                </Link>
              </div>
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
