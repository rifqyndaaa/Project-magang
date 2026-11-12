import { Link } from 'react-router-dom';
import Icon from '../../../components/common/Icon';

export default function NotFound() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem', textAlign: 'center' }}>
      <div style={{ maxWidth: '520px' }}>
        <div style={{ width: '64px', height: '64px', backgroundColor: 'var(--gov-blue-soft)', color: 'var(--gov-blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
          <Icon name="alert-circle" size={32} />
        </div>
        <span className="gov-section-tag" style={{ color: 'var(--neutral-500)' }}>KODE KESALAHAN 404</span>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--neutral-900)', marginBottom: '0.5rem' }}>
          Halaman Tidak Ditemukan
        </h1>
        <p style={{ color: 'var(--neutral-600)', fontSize: '0.9375rem', marginBottom: '1.75rem', lineHeight: 1.6 }}>
          Halaman yang Anda tuju tidak tersedia, telah dipindahkan, atau alamat URL yang Anda masukkan keliru.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link to="/" className="gov-btn gov-btn-primary">
            <Icon name="arrow-left" size={16} />
            <span>Kembali ke Beranda Utama</span>
          </Link>
          <Link to="/track" className="gov-btn gov-btn-outline-neutral">
            <Icon name="search" size={16} />
            <span>Lacak Status Pengaduan</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
