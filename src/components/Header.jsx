import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Icon from './Icon';

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

  // Dukungan keyboard: fokus masuk membuka dropdown, fokus keluar menutupnya
  const handleDropdownFocus = (menu) => (e) => {
    if (window.innerWidth <= 1024) return;
    setActiveDropdown(menu);
  };

  const handleDropdownBlur = (e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setActiveDropdown(null);
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

  const isKegiatanActive =
    location.pathname.startsWith('/kegiatan');

  const isMerchandiseActive =
    location.pathname.startsWith('/merchandise');

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
              onFocus={handleDropdownFocus('layanan')}
              onBlur={handleDropdownBlur}
            >
              <div className="gov-nav-parent-wrapper">
                <NavLink
                  to="/layanan"
                  className={`gov-nav-parent-link ${isLayananActive ? 'active' : ''}`}
                  onClick={(e) => {
                    if (window.innerWidth <= 1024) {
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
                    <span className="gov-dropdown-item-desc">Konsultasi regulasi dan telaah sengketa hukum</span>
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
                    <span className="gov-dropdown-item-desc">Tata cara aduan dan konfirmasi tindak lanjut</span>
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
                    <span className="gov-dropdown-item-desc">Permohonan pemateri seminar dan undangan resmi</span>
                  </div>
                </Link>

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

            {/* 4. WILAYAH (PETA INTERAKTIF RIAU & DROPDOWN) */}
            <li
              className={`gov-nav-has-dropdown ${activeDropdown === 'wilayah' ? 'is-dropdown-open' : ''} ${mobileSubmenu === 'wilayah' ? 'is-mobile-submenu-open' : ''}`}
              onMouseEnter={() => setActiveDropdown('wilayah')}
              onMouseLeave={() => setActiveDropdown(null)}
              onFocus={handleDropdownFocus('wilayah')}
              onBlur={handleDropdownBlur}
            >
              <div className="gov-nav-parent-wrapper">
                <NavLink
                  to="/wilayah"
                  className={`gov-nav-parent-link ${location.pathname.startsWith('/wilayah') ? 'active' : ''}`}
                  onClick={(e) => {
                    if (window.innerWidth <= 1024) {
                      e.preventDefault();
                      toggleMobileSubmenu('wilayah');
                    } else {
                      closeMenu();
                    }
                  }}
                  aria-expanded={activeDropdown === 'wilayah' || mobileSubmenu === 'wilayah'}
                  aria-haspopup="true"
                >
                  <span>Wilayah</span>
                  <span className="gov-nav-arrow-icon" aria-hidden="true">
                    <Icon name={mobileSubmenu === 'wilayah' ? 'chevron-up' : 'chevron-down'} size={14} />
                  </span>
                </NavLink>

                {/* Tombol ekspansi mobile */}
                <button
                  type="button"
                  className="gov-mobile-submenu-btn"
                  aria-label="Buka submenu Wilayah"
                  onClick={() => toggleMobileSubmenu('wilayah')}
                >
                  <Icon name={mobileSubmenu === 'wilayah' ? 'chevron-up' : 'chevron-down'} size={15} />
                </button>
              </div>

              {/* Isi Dropdown Wilayah */}
              <div className="gov-dropdown-menu" role="menu">
                <Link
                  to="/wilayah"
                  className="gov-dropdown-item"
                  role="menuitem"
                  onClick={closeMenu}
                >
                  <div className="gov-dropdown-item-content">
                    <span className="gov-dropdown-item-title">Peta Interaktif Provinsi Riau</span>
                    <span className="gov-dropdown-item-desc">Batas geografis 10 kabupaten dan 2 kota</span>
                  </div>
                </Link>

                <Link
                  to="/wilayah/pekanbaru"
                  className="gov-dropdown-item"
                  role="menuitem"
                  onClick={closeMenu}
                >
                  <div className="gov-dropdown-item-content">
                    <span className="gov-dropdown-item-title">Kota Pekanbaru</span>
                    <span className="gov-dropdown-item-desc">Ibu kota provinsi dan pusat koordinasi</span>
                  </div>
                </Link>

                <Link
                  to="/wilayah/siak"
                  className="gov-dropdown-item"
                  role="menuitem"
                  onClick={closeMenu}
                >
                  <div className="gov-dropdown-item-content">
                    <span className="gov-dropdown-item-title">Kabupaten Siak</span>
                    <span className="gov-dropdown-item-desc">Pusat peradaban Melayu dan kemitraan daerah</span>
                  </div>
                </Link>

                <Link
                  to="/wilayah"
                  className="gov-dropdown-item gov-dropdown-item-highlight"
                  role="menuitem"
                  onClick={closeMenu}
                >
                  <div className="gov-dropdown-item-content">
                    <span className="gov-dropdown-item-title">Semua 12 Wilayah</span>
                    <span className="gov-dropdown-item-desc">Peta lengkap dan status DPC IFPI</span>
                  </div>
                </Link>
              </div>
            </li>

            {/* 5. KEGIATAN (DROPDOWN) */}
            <li
              className={`gov-nav-has-dropdown ${activeDropdown === 'kegiatan' ? 'is-dropdown-open' : ''} ${mobileSubmenu === 'kegiatan' ? 'is-mobile-submenu-open' : ''}`}
              onMouseEnter={() => setActiveDropdown('kegiatan')}
              onMouseLeave={() => setActiveDropdown(null)}
              onFocus={handleDropdownFocus('kegiatan')}
              onBlur={handleDropdownBlur}
            >
              <div className="gov-nav-parent-wrapper">
                <NavLink
                  to="/kegiatan"
                  className={`gov-nav-parent-link ${isKegiatanActive ? 'active' : ''}`}
                  onClick={(e) => {
                    if (window.innerWidth <= 1024) {
                      e.preventDefault();
                      toggleMobileSubmenu('kegiatan');
                    } else {
                      closeMenu();
                    }
                  }}
                  aria-expanded={activeDropdown === 'kegiatan' || mobileSubmenu === 'kegiatan'}
                  aria-haspopup="true"
                >
                  <span>Kegiatan</span>
                  <span className="gov-nav-arrow-icon" aria-hidden="true">
                    <Icon name={mobileSubmenu === 'kegiatan' ? 'chevron-up' : 'chevron-down'} size={14} />
                  </span>
                </NavLink>

                {/* Tombol ekspansi mobile */}
                <button
                  type="button"
                  className="gov-mobile-submenu-btn"
                  aria-label="Buka submenu Kegiatan"
                  onClick={() => toggleMobileSubmenu('kegiatan')}
                >
                  <Icon name={mobileSubmenu === 'kegiatan' ? 'chevron-up' : 'chevron-down'} size={15} />
                </button>
              </div>

              {/* Isi Dropdown Kegiatan */}
              <div className="gov-dropdown-menu" role="menu">
                <Link
                  to="/kegiatan/program-kerja"
                  className="gov-dropdown-item"
                  role="menuitem"
                  onClick={closeMenu}
                >
                  <div className="gov-dropdown-item-content">
                    <span className="gov-dropdown-item-title">Program Kerja</span>
                    <span className="gov-dropdown-item-desc">Rencana strategis lima divisi IFPI</span>
                  </div>
                </Link>

                <Link
                  to="/kegiatan/agenda"
                  className="gov-dropdown-item"
                  role="menuitem"
                  onClick={closeMenu}
                >
                  <div className="gov-dropdown-item-content">
                    <span className="gov-dropdown-item-title">Agenda</span>
                    <span className="gov-dropdown-item-desc">Jadwal rakerwil, bimtek, dan forum PBJ</span>
                  </div>
                </Link>

                <Link
                  to="/kegiatan/galeri"
                  className="gov-dropdown-item"
                  role="menuitem"
                  onClick={closeMenu}
                >
                  <div className="gov-dropdown-item-content">
                    <span className="gov-dropdown-item-title">Galeri Foto</span>
                    <span className="gov-dropdown-item-desc">Dokumentasi visual rangkaian kegiatan resmi IFPI</span>
                  </div>
                </Link>
              </div>
            </li>

            {/* 6. MERCHANDISE (DROPDOWN) */}
            <li
              className={`gov-nav-has-dropdown ${activeDropdown === 'merchandise' ? 'is-dropdown-open' : ''} ${mobileSubmenu === 'merchandise' ? 'is-mobile-submenu-open' : ''}`}
              onMouseEnter={() => setActiveDropdown('merchandise')}
              onMouseLeave={() => setActiveDropdown(null)}
              onFocus={handleDropdownFocus('merchandise')}
              onBlur={handleDropdownBlur}
            >
              <div className="gov-nav-parent-wrapper">
                <NavLink
                  to="/merchandise"
                  className={`gov-nav-parent-link ${isMerchandiseActive ? 'active' : ''}`}
                  onClick={(e) => {
                    if (window.innerWidth <= 1024) {
                      e.preventDefault();
                      toggleMobileSubmenu('merchandise');
                    } else {
                      closeMenu();
                    }
                  }}
                  aria-expanded={activeDropdown === 'merchandise' || mobileSubmenu === 'merchandise'}
                  aria-haspopup="true"
                >
                  <span>Merchandise</span>
                  <span className="gov-nav-arrow-icon" aria-hidden="true">
                    <Icon name={mobileSubmenu === 'merchandise' ? 'chevron-up' : 'chevron-down'} size={14} />
                  </span>
                </NavLink>

                {/* Tombol ekspansi mobile */}
                <button
                  type="button"
                  className="gov-mobile-submenu-btn"
                  aria-label="Buka submenu Merchandise"
                  onClick={() => toggleMobileSubmenu('merchandise')}
                >
                  <Icon name={mobileSubmenu === 'merchandise' ? 'chevron-up' : 'chevron-down'} size={15} />
                </button>
              </div>

              {/* Isi Dropdown Merchandise */}
              <div className="gov-dropdown-menu" role="menu">
                <Link
                  to="/merchandise/pernak-pernik"
                  className="gov-dropdown-item"
                  role="menuitem"
                  onClick={closeMenu}
                >
                  <div className="gov-dropdown-item-content">
                    <span className="gov-dropdown-item-title">Pernak-pernik</span>
                    <span className="gov-dropdown-item-desc">Pin, badge, kaos, dan atribut identitas IFPI</span>
                  </div>
                </Link>

                <Link
                  to="/merchandise/cenderamata"
                  className="gov-dropdown-item"
                  role="menuitem"
                  onClick={closeMenu}
                >
                  <div className="gov-dropdown-item-content">
                    <span className="gov-dropdown-item-title">Cenderamata</span>
                    <span className="gov-dropdown-item-desc">Plakat, piagam, dan paket kenang-kenangan</span>
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
