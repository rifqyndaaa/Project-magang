import Icon from '../../components/common/Icon';

export default function DeleteConfirmModal({ product, onConfirm, onCancel }) {
  if (!product) return null;

  return (
    <div
      className="gov-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
    >
      <div className="gov-modal-container" style={{ maxWidth: '440px', padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="alert-circle" size={24} color="#DC2626" />
          </div>
          <div>
            <h2 id="delete-modal-title" style={{ fontSize: '1.0625rem', fontWeight: 800, color: 'var(--neutral-900)', margin: 0 }}>
              Konfirmasi Hapus Produk
            </h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--neutral-500)' }}>
              Tindakan ini tidak dapat dibatalkan
            </span>
          </div>
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--neutral-700)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
          Apakah Anda yakin ingin menghapus produk <strong>"{product.name}"</strong> (ID: <code style={{ fontSize: '0.75rem' }}>{product.id}</code>) dari etalase?
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
          <button
            type="button"
            className="gov-btn gov-btn-outline-neutral gov-btn-sm"
            onClick={onCancel}
          >
            Batal
          </button>
          <button
            type="button"
            className="gov-btn gov-btn-sm"
            style={{ backgroundColor: '#DC2626', color: '#FFFFFF', borderColor: '#DC2626' }}
            onClick={onConfirm}
          >
            <Icon name="trash" size={13} color="#FFFFFF" />
            <span>Ya, Hapus Produk</span>
          </button>
        </div>
      </div>
    </div>
  );
}
