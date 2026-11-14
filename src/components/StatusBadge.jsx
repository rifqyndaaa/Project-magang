// Komponen StatusBadge untuk status laporan pengaduan resmi IFPI

// Tiga tahap kerja resmi dipakai pada seluruh tampilan. Status arsip lama
// tetap dikenali agar riwayat penanganan lama tidak kehilangan makna.
const STATUS_CONFIG = {
  'Baru': { badgeClass: 'gov-badge-baru', label: 'Baru Diterima' },
  'Diverifikasi': { badgeClass: 'gov-badge-diverifikasi', label: 'Terverifikasi' },
  'Diproses': { badgeClass: 'gov-badge-diproses', label: 'Sedang Diproses' },
  'Tindak Lanjut': { badgeClass: 'gov-badge-tindak-lanjut', label: 'Tindak Lanjut' },
  'Selesai': { badgeClass: 'gov-badge-selesai', label: 'Selesai Ditangani' },
  'Ditolak': { badgeClass: 'gov-badge-ditolak', label: 'Tidak Dapat Diproses' }
};

export default function StatusBadge({ status, size = 'md' }) {
  const current = STATUS_CONFIG[status] || { badgeClass: 'gov-badge-baru', label: status || 'Baru' };

  return (
    <span className={`gov-badge ${current.badgeClass} ${size === 'sm' ? 'gov-badge-sm' : ''}`}>
      {current.label}
    </span>
  );
}
