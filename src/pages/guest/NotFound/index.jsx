import { Link } from 'react-router-dom';
import Icon from "../../../components/Icon";

export default function NotFound() {
  return (
    <div className="pg">
      <div className="gov-container">
        <div className="nf">
          <span className="nf__code">404</span>
          <span className="pg-head__eyebrow">Halaman Tidak Ditemukan</span>
          <h1 className="nf__title">Alamat yang Anda tuju tidak tersedia</h1>
          <p className="nf__desc">
            Halaman mungkin telah dipindahkan, diganti namanya, atau alamat URL yang Anda masukkan keliru.
            Anda dapat kembali ke beranda atau langsung memantau status pengajuan yang sudah ada.
          </p>

          <div className="nf__actions">
            <Link to="/" className="gov-btn gov-btn-primary">
              <Icon name="arrow-left" size={16} />
              <span>Kembali ke Beranda</span>
            </Link>
            <Link to="/track" className="gov-btn gov-btn-outline-neutral">
              <Icon name="search" size={16} />
              <span>Lacak Status Pengajuan</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
