import { useState } from 'react';
import Icon from '../../components/common/Icon';
import { getProductCategories, saveProductCategory, deleteProductCategory } from '../../utils/productStorage';

export default function CategoryManageModal({ onClose, onCategoriesUpdated }) {
  const [categories, setCategories] = useState(getProductCategories());
  const [newCatInput, setNewCatInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    const res = saveProductCategory(newCatInput);
    if (!res.success) {
      setErrorMsg(res.message);
      return;
    }
    setCategories(res.categories);
    setNewCatInput('');
    setSuccessMsg('Kategori berhasil ditambahkan.');
    if (onCategoriesUpdated) onCategoriesUpdated(res.categories);
  };

  const handleDelete = (cat) => {
    setErrorMsg('');
    setSuccessMsg('');
    if (categories.length <= 1) {
      setErrorMsg('Minimal harus ada 1 kategori yang tersisa.');
      return;
    }
    const res = deleteProductCategory(cat);
    if (!res.success) {
      setErrorMsg(res.message);
      return;
    }
    setCategories(res.categories);
    setSuccessMsg(`Kategori "${cat}" berhasil dihapus.`);
    if (onCategoriesUpdated) onCategoriesUpdated(res.categories);
  };

  return (
    <div
      className="gov-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="category-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="gov-modal-container" style={{ maxWidth: '520px', padding: '1.75rem' }}>
        {/* Header Modal */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--neutral-200)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icon name="tag" size={18} color="var(--gov-blue)" />
            <h2 id="category-modal-title" style={{ fontSize: '1.0625rem', fontWeight: 800, margin: 0, color: 'var(--neutral-900)' }}>
              Kelola Kategori Etalase Produk
            </h2>
          </div>
          <button
            type="button"
            className="gov-modal-close-btn"
            style={{ position: 'static' }}
            onClick={onClose}
          >
            <Icon name="x" size={18} />
          </button>
        </div>

        {/* Feedback Pesan */}
        {errorMsg && (
          <div style={{ padding: '0.6rem 0.75rem', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '4px', fontSize: '0.8125rem', color: '#B91C1C', marginBottom: '1rem' }}>
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div style={{ padding: '0.6rem 0.75rem', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '4px', fontSize: '0.8125rem', color: '#15803D', marginBottom: '1rem' }}>
            {successMsg}
          </div>
        )}

        {/* Form Tambah Kategori */}
        <form onSubmit={handleAdd} style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="input-new-category" className="gov-label" style={{ fontSize: '0.8125rem' }}>
            Tambah Kategori Baru
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              id="input-new-category"
              className="gov-input"
              placeholder="Contoh: Tekstil Melayu, Souvenir Kayu..."
              value={newCatInput}
              onChange={(e) => setNewCatInput(e.target.value)}
              style={{ fontSize: '0.875rem' }}
            />
            <button
              type="submit"
              className="gov-btn gov-btn-primary gov-btn-sm"
              style={{ whiteSpace: 'nowrap' }}
            >
              <Icon name="plus" size={14} />
              <span>Tambah</span>
            </button>
          </div>
        </form>

        {/* Daftar Kategori Saat Ini */}
        <div>
          <label className="gov-label" style={{ fontSize: '0.8125rem', marginBottom: '0.5rem' }}>
            Daftar Kategori Aktif ({categories.length})
          </label>
          <div style={{ maxHeight: '240px', overflowY: 'auto', border: '1px solid var(--neutral-200)', borderRadius: '6px' }}>
            {categories.map((cat, idx) => (
              <div
                key={cat}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.6rem 0.85rem',
                  borderBottom: idx !== categories.length - 1 ? '1px solid var(--neutral-200)' : 'none',
                  backgroundColor: idx % 2 === 0 ? '#FFFFFF' : 'var(--neutral-50)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--neutral-400)', width: '20px' }}>{idx + 1}.</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--neutral-800)' }}>{cat}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(cat)}
                  disabled={categories.length <= 1}
                  className="gov-btn gov-btn-sm"
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: categories.length <= 1 ? 'var(--neutral-300)' : '#DC2626',
                    cursor: categories.length <= 1 ? 'not-allowed' : 'pointer',
                    padding: '0.2rem 0.4rem'
                  }}
                  title="Hapus Kategori"
                >
                  <Icon name="trash" size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Modal */}
        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="gov-btn gov-btn-primary gov-btn-sm"
            onClick={onClose}
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}
