import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="gov-footer-official" role="contentinfo">
      <div className="gov-container">
        <div className="gov-footer-official-grid">
          {/* Kolom 1: Identitas Organisasi */}
          <div className="gov-footer-col-brand">
            <div className="gov-footer-brand-header">
              <img
                src="/images/logo.jpeg"
                alt="Logo IFPI"
                className="gov-footer-logo"
                width="42"
                height="42"
              />
              <div>
                <div className="gov-footer-official-title">IKATAN FUNGSIONAL PENGADAAN INDONESIA</div>
                <div className="gov-footer-official-subtitle">Portal Layanan &amp; Konsultasi Resmi</div>
              </div>
            </div>
            <p className="gov-footer-official-desc">
              Organisasi profesi fungsional pengadaan barang/jasa pemerintah Indonesia. Berkomitmen mewujudkan tata kelola pengadaan yang kredibel, akuntabel, transparan, dan berintegritas.
            </p>
          </div>

          {/* Kolom 2: Navigasi Layanan */}
          <div className="gov-footer-col-nav">
            <h3 className="gov-footer-heading">Navigasi Portal</h3>
            <ul className="gov-footer-nav-list">
              <li>
                <Link to="/">Beranda</Link>
              </li>
              <li>
                <Link to="/layanan">Layanan &amp; Konsultasi</Link>
              </li>
              <li>
                <Link to="/struktur">Struktur Organisasi</Link>
              </li>
              <li>
                <Link to="/wilayah">Wilayah Kepengurusan</Link>
              </li>
              <li>
                <Link to="/kegiatan">Kegiatan &amp; Agenda</Link>
              </li>
              <li>
                <Link to="/merchandise">Merchandise &amp; Cenderamata</Link>
              </li>
              <li>
                <a href="/#faq">Pusat Informasi &amp; FAQ</a>
              </li>
              <li>
                <a href="/#kontak">Kontak Sekretariat</a>
              </li>
              <li>
                <Link to="/track">Lacak Status Pengajuan</Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak & Jam Pelayanan */}
          <div className="gov-footer-col-contact">
            <h3 className="gov-footer-heading">Sekretariat &amp; Pelayanan</h3>
            <ul className="gov-footer-contact-list">
              <li>
                <strong>Alamat:</strong> Sekretariat IFPI, Jl. Jenderal Sudirman No. 460, Pekanbaru
              </li>
              <li>
                <strong>Email:</strong> sekretariat@ifpi.or.id / layanan@ifpi.or.id
              </li>
              <li>
                <strong>Telepon:</strong> (0761) 31256 / Call Center Pelayanan
              </li>
              <li>
                <strong>Jam Layanan:</strong> Senin – Jumat, 08.00 – 16.00 WIB (Formulir daring 24 jam)
              </li>
            </ul>
          </div>
        </div>

        {/* Baris Copyright & Tautan Akses Petugas */}
        <div className="gov-footer-bottom-bar">
          <p className="gov-footer-copyright">
            &copy; {new Date().getFullYear()} Ikatan Fungsional Pengadaan Indonesia (IFPI). Seluruh Hak Cipta Dilindungi.
          </p>
          <div className="gov-footer-bottom-links">
            <Link to="/admin/login" className="gov-footer-admin-link">
              Portal Petugas &amp; Verifikator
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
