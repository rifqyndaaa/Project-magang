// Komponen StatusBadge untuk status laporan pengaduan

export default function StatusBadge({ status, size = 'md' }) {
  let badgeClass = 'gov-badge-baru';
  let label = status || 'Baru';

  switch (status) {
    case 'Baru':
      badgeClass = 'gov-badge-baru';
      label = 'Baru Masuk';
      break;
    case 'Diverifikasi':
      badgeClass = 'gov-badge-diverifikasi';
      label = 'Terverifikasi';
      break;
    case 'Diproses':
      badgeClass = 'gov-badge-diproses';
      label = 'Sedang Diproses';
      break;
    case 'Tindak Lanjut':
      badgeClass = 'gov-badge-tindak-lanjut';
      label = 'Tindak Lanjut';
      break;
    case 'Selesai':
      badgeClass = 'gov-badge-selesai';
      label = 'Selesai';
      break;
    case 'Ditolak':
      badgeClass = 'gov-badge-ditolak';
      label = 'Ditolak';
      break;
    default:
      badgeClass = 'gov-badge-baru';
      label = status || 'Baru';
  }

  return (
    <span className={`gov-badge ${badgeClass} ${size === 'sm' ? 'gov-badge-sm' : ''}`}>
      {label}
    </span>
  );
}
