// Komponen StatusBadge untuk status laporan pengaduan resmi IFPI

const STATUS_CONFIG = {
  'Baru': { badgeClass: 'gov-badge-baru', label: 'Baru Masuk' },
  'Diverifikasi': { badgeClass: 'gov-badge-diverifikasi', label: 'Terverifikasi' },
  'Diproses': { badgeClass: 'gov-badge-diproses', label: 'Sedang Diproses' },
  'Tindak Lanjut': { badgeClass: 'gov-badge-tindak-lanjut', label: 'Tindak Lanjut' },
  'Selesai': { badgeClass: 'gov-badge-selesai', label: 'Selesai' },
  'Ditolak': { badgeClass: 'gov-badge-ditolak', label: 'Ditolak' }
};

export default function StatusBadge({ status, size = 'md' }) {
  const current = STATUS_CONFIG[status] || { badgeClass: 'gov-badge-baru', label: status || 'Baru' };

  return (
    <span className={`gov-badge ${current.badgeClass} ${size === 'sm' ? 'gov-badge-sm' : ''}`}>
      {current.label}
    </span>
  );
}
