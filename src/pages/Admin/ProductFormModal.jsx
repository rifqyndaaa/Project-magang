import { useState, useRef } from 'react';
import Icon from '../../components/common/Icon';
import { getProductCategories, saveProduct } from '../../utils/productStorage';
import { RIAU_REGIONS } from '../../data/categories';

// Pilihan Gambar Cepat Khas Daerah Riau
const REGIONAL_PHOTO_PRESETS = [
  { label: 'Tenun Songket Siak', url: '/images/products/songket-siak.svg' },
  { label: 'Bolu Kemojo Pandan', url: '/images/products/bolu-kemojo.svg' },
  { label: 'Tanjak Melayu Diraja', url: '/images/products/tanjak-melayu.svg' },
  { label: 'Kopi Liberika Meranti', url: '/images/products/kopi-liberika.svg' },
  { label: 'Lempuk Durian Bengkalis', url: '/images/products/lempuk-durian.svg' },
  { label: 'Tas Anyaman Pandan', url: '/images/products/anyaman-kuansing.svg' },
  { label: 'Miniatur Candi Muara Takus', url: '/images/products/replika-candi.svg' },
  { label: 'Perahu Baganduang Kuansing', url: '/images/products/perahu-baganduang.svg' }
];

export default function ProductFormModal({ product, onClose, onSaveSuccess }) {
  const isEdit = Boolean(product && product.id);
  const categories = getProductCategories();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    id: product?.id || '',
    name: product?.name || '',
    category: product?.category || categories[0] || 'Produk UMKM',
    productType: product?.productType || 'dijual', // 'dijual' | 'dipamerkan'
    price: product?.price !== undefined ? product.price : 50000,
    sellerName: product?.sellerName || '',
    sellerContact: product?.sellerContact || '',
    originRegion: product?.originRegion || 'Kota Pekanbaru',
    image: product?.image || '/images/products/songket-siak.svg',
    shortDescription: product?.shortDescription || '',
    description: product?.description || '',
    status: product?.status || 'published', // 'published' | 'hidden'
    featured: product?.featured || false
  });

  const [imageTab, setImageTab] = useState('preset'); // 'upload' | 'preset' | 'url'
  const [errorMsg, setErrorMsg] = useState('');
  const [fileError, setFileError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handler Unggah Berkas Foto (Mendukung Konversi Base64 untuk localStorage)
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    setFileError('');
    if (!file) return;

    // Batasan ukuran file gambar agar tidak melebihi kapasitas localStorage browser (maks 800 KB)
    if (file.size > 800 * 1024) {
      setFileError('Ukuran file terlalu besar (maksimal 800 KB). Disarankan kompres gambar terlebih dahulu.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData(prev => ({ ...prev, image: reader.result }));
    };
    reader.onerror = () => {
      setFileError('Gagal membaca file gambar.');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Validasi Dasar
    if (!formData.name.trim()) {
      setErrorMsg('Nama produk wajib diisi.');
      return;
    }

    if (!formData.category) {
      setErrorMsg('Kategori produk wajib dipilih.');
      return;
    }

    if (formData.productType === 'dijual') {
      const numPrice = Number(formData.price);
      if (isNaN(numPrice) || numPrice < 0) {
        setErrorMsg('Harga produk yang dijual harus berupa nominal angka valid.');
        return;
      }
    }

    const result = saveProduct(formData);
    if (!result.success) {
      setErrorMsg(result.error || 'Terjadi kesalahan saat menyimpan produk.');
      return;
    }

    onSaveSuccess(result.product);
  };

  return (
    <div
      className="gov-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-form-modal-title"
    >
      <div className="gov-modal-container gov-product-form-modal" style={{ maxWidth: '780px', maxHeight: '90vh', overflowY: 'auto' }}>
        {/* Header Modal */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.85rem', borderBottom: '1px solid var(--neutral-200)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '4px', backgroundColor: 'var(--gov-blue-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={isEdit ? 'edit' : 'plus'} size={18} color="var(--gov-blue)" />
            </div>
            <div>
              <h2 id="product-form-modal-title" style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--neutral-900)' }}>
                {isEdit ? 'Edit Data Produk Etalase' : 'Tambah Produk Baru ke Etalase'}
              </h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--neutral-500)' }}>
                Panel Pengelolaan Potensi Daerah &bull; Pemprov Riau
              </span>
            </div>
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

        {/* Pesan Kesalahan Validasi */}
        {errorMsg && (
          <div style={{ padding: '0.75rem 1rem', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '4px', fontSize: '0.8125rem', color: '#B91C1C', marginBottom: '1.25rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Icon name="alert-circle" size={16} color="#DC2626" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Sifat Produk (Dijual vs Dipamerkan) */}
          <div className="gov-card" style={{ padding: '1rem', marginBottom: '1.25rem', backgroundColor: 'var(--neutral-50)', border: '1px solid var(--neutral-200)' }}>
            <label className="gov-label" style={{ fontWeight: 800, marginBottom: '0.5rem' }}>
              Klasifikasi / Jenis Produk <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: formData.productType === 'dijual' ? '2px solid var(--gov-blue)' : '1px solid var(--neutral-300)',
                  backgroundColor: formData.productType === 'dijual' ? '#FFFFFF' : 'transparent',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="radio"
                  name="productType"
                  value="dijual"
                  checked={formData.productType === 'dijual'}
                  onChange={handleChange}
                  style={{ marginTop: '0.2rem' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--neutral-900)' }}>
                    1. Dijual (Komersial)
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--neutral-600)', marginTop: '0.2rem' }}>
                    Menampilkan nominal harga dan menyediakan tombol kontak/pemesanan ke pihak UMKM.
                  </div>
                </div>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: formData.productType === 'dipamerkan' ? '2px solid #D97706' : '1px solid var(--neutral-300)',
                  backgroundColor: formData.productType === 'dipamerkan' ? '#FFFFFF' : 'transparent',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="radio"
                  name="productType"
                  value="dipamerkan"
                  checked={formData.productType === 'dipamerkan'}
                  onChange={handleChange}
                  style={{ marginTop: '0.2rem' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--neutral-900)' }}>
                    2. Dipamerkan Saja (Non-Komersial)
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--neutral-600)', marginTop: '0.2rem' }}>
                    Khusus benda bersejarah/pameran budaya. Harga dan tombol pembelian tidak ditampilkan.
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Baris 1: Nama Produk & Kategori */}
          <div className="gov-grid gov-grid-2" style={{ marginBottom: '1rem' }}>
            <div className="gov-form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="input-product-name" className="gov-label">
                Nama Produk Daerah <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input
                type="text"
                id="input-product-name"
                name="name"
                className="gov-input"
                placeholder="Contoh: Tenun Songket Siak Corak Pucuk Rebung..."
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="gov-form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="select-product-category" className="gov-label">
                Kategori Produk <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <select
                id="select-product-category"
                name="category"
                className="gov-select"
                value={formData.category}
                onChange={handleChange}
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Baris 2: Harga (hanya aktif jika Dijual) & Wilayah Asal */}
          <div className="gov-grid gov-grid-2" style={{ marginBottom: '1rem' }}>
            <div className="gov-form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="input-product-price" className="gov-label">
                Harga Produk (Rp){' '}
                {formData.productType === 'dijual' ? (
                  <span style={{ color: '#DC2626' }}>*</span>
                ) : (
                  <span style={{ color: 'var(--neutral-500)', fontSize: '0.75rem' }}>(Dinonaktifkan pada mode pameran)</span>
                )}
              </label>
              <input
                type="number"
                id="input-product-price"
                name="price"
                className="gov-input"
                placeholder="Contoh: 150000"
                value={formData.productType === 'dipamerkan' ? '' : formData.price}
                onChange={handleChange}
                disabled={formData.productType === 'dipamerkan'}
                min="0"
                step="1000"
              />
            </div>

            <div className="gov-form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="select-product-region" className="gov-label">
                Asal Kabupaten / Kota
              </label>
              <select
                id="select-product-region"
                name="originRegion"
                className="gov-select"
                value={formData.originRegion}
                onChange={handleChange}
              >
                {RIAU_REGIONS.map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Baris 3: UMKM / Penjual & Kontak */}
          <div className="gov-grid gov-grid-2" style={{ marginBottom: '1rem' }}>
            <div className="gov-form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="input-seller-name" className="gov-label">
                Nama Pengrajin / UMKM Penjual
              </label>
              <input
                type="text"
                id="input-seller-name"
                name="sellerName"
                className="gov-input"
                placeholder="Contoh: Rumah Tenun Siak Indah (Demo)"
                value={formData.sellerName}
                onChange={handleChange}
              />
            </div>

            <div className="gov-form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="input-seller-contact" className="gov-label">
                Kontak Layanan / WhatsApp Penjual
              </label>
              <input
                type="text"
                id="input-seller-contact"
                name="sellerContact"
                className="gov-input"
                placeholder="Contoh: 0812-7654-3210 (Demo)"
                value={formData.sellerContact}
                onChange={handleChange}
                disabled={formData.productType === 'dipamerkan'}
              />
              {formData.productType === 'dipamerkan' && (
                <span style={{ fontSize: '0.7rem', color: 'var(--neutral-400)' }}>
                  Tidak memerlukan kontak karena produk hanya dipamerkan.
                </span>
              )}
            </div>
          </div>

          {/* Bagian Foto Produk & Unggah */}
          <div className="gov-card" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
            <label className="gov-label" style={{ fontWeight: 800, marginBottom: '0.5rem' }}>
              Foto / Visual Produk
            </label>

            {/* Pilihan Metode Input Gambar */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--neutral-200)', paddingBottom: '0.5rem' }}>
              <button
                type="button"
                className={`gov-btn gov-btn-sm ${imageTab === 'preset' ? 'gov-btn-primary' : 'gov-btn-outline-neutral'}`}
                onClick={() => setImageTab('preset')}
              >
                Pilihan Visual Khas Riau
              </button>
              <button
                type="button"
                className={`gov-btn gov-btn-sm ${imageTab === 'upload' ? 'gov-btn-primary' : 'gov-btn-outline-neutral'}`}
                onClick={() => setImageTab('upload')}
              >
                <Icon name="upload" size={13} />
                <span>Unggah Foto dari Perangkat</span>
              </button>
              <button
                type="button"
                className={`gov-btn gov-btn-sm ${imageTab === 'url' ? 'gov-btn-primary' : 'gov-btn-outline-neutral'}`}
                onClick={() => setImageTab('url')}
              >
                Tautan URL Gambar
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1.25rem', alignItems: 'center' }}>
              {/* Preview Gambar */}
              <div style={{ width: '120px', height: '90px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--neutral-300)', backgroundColor: 'var(--neutral-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={formData.image || '/logo-riau.svg'}
                  alt="Pratinjau Foto Produk"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/logo-riau.svg';
                  }}
                />
              </div>

              {/* Konten Tab */}
              <div>
                {imageTab === 'preset' && (
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--neutral-600)', display: 'block', marginBottom: '0.4rem' }}>
                      Pilih ilustrasi vektor SVG khas daerah:
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {REGIONAL_PHOTO_PRESETS.map((preset) => (
                        <button
                          key={preset.url}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, image: preset.url }))}
                          className="gov-btn gov-btn-outline-neutral gov-btn-sm"
                          style={{
                            fontSize: '0.75rem',
                            padding: '0.2rem 0.5rem',
                            borderColor: formData.image === preset.url ? 'var(--gov-blue)' : undefined,
                            backgroundColor: formData.image === preset.url ? 'var(--gov-blue-soft)' : undefined
                          }}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {imageTab === 'upload' && (
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png, image/jpeg, image/webp, image/svg+xml"
                      onChange={handleFileUpload}
                      style={{ fontSize: '0.8125rem' }}
                    />
                    <span style={{ fontSize: '0.7rem', color: 'var(--neutral-500)', display: 'block', marginTop: '0.35rem' }}>
                      Format: PNG, JPG, WebP, atau SVG (maks. 800 KB untuk localStorage).
                    </span>
                    {fileError && (
                      <span style={{ fontSize: '0.75rem', color: '#DC2626', display: 'block', marginTop: '0.2rem' }}>
                        {fileError}
                      </span>
                    )}
                  </div>
                )}

                {imageTab === 'url' && (
                  <div>
                    <input
                      type="text"
                      name="image"
                      className="gov-input"
                      placeholder="https://... atau /images/..."
                      value={formData.image}
                      onChange={handleChange}
                      style={{ fontSize: '0.8125rem' }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Deskripsi Singkat */}
          <div className="gov-form-group" style={{ marginBottom: '1rem' }}>
            <label htmlFor="input-short-desc" className="gov-label">
              Deskripsi Singkat (Ringkasan untuk Tampilan Kartu)
            </label>
            <input
              type="text"
              id="input-short-desc"
              name="shortDescription"
              className="gov-input"
              placeholder="Deskripsi singkat maksimal 150 karakter..."
              value={formData.shortDescription}
              onChange={handleChange}
            />
          </div>

          {/* Deskripsi Lengkap */}
          <div className="gov-form-group" style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="input-full-desc" className="gov-label">
              Deskripsi Lengkap & Keunggulan Produk
            </label>
            <textarea
              id="input-full-desc"
              name="description"
              className="gov-textarea"
              rows={4}
              placeholder="Jelaskan sejarah, bahan baku, cara pembuatan, atau keistimewaan produk khas ini..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Pengaturan Visibilitas (Tampil / Sembunyikan) */}
          <div className="gov-card" style={{ padding: '1rem', marginBottom: '1.5rem', backgroundColor: 'var(--neutral-50)' }}>
            <label className="gov-label" style={{ fontWeight: 800, marginBottom: '0.4rem' }}>
              Status Publikasi Produk
            </label>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                <input
                  type="radio"
                  name="status"
                  value="published"
                  checked={formData.status === 'published'}
                  onChange={handleChange}
                />
                <span style={{ fontWeight: 600, color: 'var(--gov-green-dark)' }}>Tampil di Publik (Aktif)</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                <input
                  type="radio"
                  name="status"
                  value="hidden"
                  checked={formData.status === 'hidden'}
                  onChange={handleChange}
                />
                <span style={{ fontWeight: 600, color: 'var(--neutral-600)' }}>Disembunyikan (Draft)</span>
              </label>
            </div>
          </div>

          {/* Tombol Aksi Form */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--neutral-200)' }}>
            <button
              type="button"
              className="gov-btn gov-btn-outline-neutral"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              type="submit"
              className="gov-btn gov-btn-primary"
            >
              <Icon name="check" size={16} />
              <span>{isEdit ? 'Simpan Perubahan' : 'Terbitkan Produk'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
