import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="gov-footer-official" role="contentinfo">
      <div className="gov-container">
        <div className="gov-footer-official-grid">
          {/* Kolom 1: Identitas Instansi */}
          <div className="gov-footer-col-brand">
            <div className="gov-footer-official-title">PEMERINTAH PROVINSI RIAU</div>
            <div className="gov-footer-official-subtitle">Layanan Pengaduan Masyarakat</div>
            <p className="gov-footer-official-desc">
              Kanal resmi pemerintah daerah untuk menerima laporan, aspirasi, dan pengaduan masyarakat terkait pelayanan publik dan fasilitas umum di seluruh wilayah Provinsi Riau.
            </p>
          </div>

          {/* Kolom 2: Navigasi Layanan */}
          <div className="gov-footer-col-nav">
            <h3 className="gov-footer-heading">Navigasi</h3>
            <ul className="gov-footer-nav-list">
              <li>
                <Link to="/">Beranda</Link>
              </li>
              <li>
                <Link to="/layanan">Layanan</Link>
              </li>
              <li>
                <Link to="/informasi">Informasi</Link>
              </li>
              <li>
                <Link to="/kontak">Kontak</Link>
              </li>
              <li>
                <Link to="/track">Lacak Laporan</Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak & Jam Pelayanan */}
          <div className="gov-footer-col-contact">
            <h3 className="gov-footer-heading">Kontak & Pelayanan</h3>
            <ul className="gov-footer-contact-list">
              <li>
                <strong>Alamat:</strong> Jl. Jenderal Sudirman No. 460, Kota Pekanbaru, Riau 28126
              </li>
              <li>
                <strong>Email:</strong> pengaduan@riau.go.id
              </li>
              <li>
                <strong>Telepon:</strong> (0761) 31256 / Call Center 112
              </li>
              <li>
                <strong>Jam Pelayanan:</strong> Senin – Jumat, 08.00 – 16.00 WIB
              </li>
            </ul>
          </div>
        </div>

        {/* Baris Copyright & Tautan Akses Petugas */}
        <div className="gov-footer-bottom-bar">
          <p className="gov-footer-copyright">
            &copy; {new Date().getFullYear()} Pemerintah Provinsi Riau. Seluruh Hak Cipta Dilindungi.
          </p>
          <div className="gov-footer-bottom-links">
            <Link to="/admin/login" className="gov-footer-admin-link">
              Portal Petugas
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
