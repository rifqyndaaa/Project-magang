import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import { formatRupiah } from '../services/productStorage';

export default function ProductDetailModal({ product, onClose }) {
  // Tutup modal ketika tombol Escape ditekan
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const isForSale = product.productType === 'dijual';
  const hasContact = Boolean(product.sellerContact && product.sellerContact.trim().length > 0);

  // Format link WhatsApp demo jika ada nomor
  const cleanPhone = product.sellerContact ? product.sellerContact.replace(/\D/g, '') : '';
  const waUrl = cleanPhone
    ? `https://wa.me/${cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone}?text=${encodeURIComponent(
        `Halo, saya tertarik dengan produk ${product.name} yang tertera di Etalase Produk Pemprov Riau.`
      )}`
    : null;

  return (
    <div
      className="gov-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="gov-modal-container gov-product-modal">
        {/* Tombol Tutup Modal */}
        <button
          type="button"
          className="gov-modal-close-btn"
          onClick={onClose}
          aria-label="Tutup jendela rincian produk"
        >
          <Icon name="x" size={20} />
        </button>

        <div className="gov-product-modal-grid">
          {/* Kolom Kiri: Gambar Produk */}
          <div className="gov-product-modal-media">
            <div className="gov-product-modal-img-wrap">
              <img
                src={product.image || '/logo-riau.svg'}
                alt={product.name}
                className="gov-product-modal-img"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/logo-riau.svg';
                }}
              />
              {product.isDemo && (
                <div className="gov-product-modal-demo-tag">
                  PROTOTIPE DEMO
                </div>
              )}
            </div>

            {/* Kotak Catatan Prototipe Daerah */}
            <div className="gov-notice-box-subtle" style={{ marginTop: "1rem" }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <Icon name="info" size={16} color="var(--gov-blue)" />
                <div style={{ fontSize: '0.75rem', color: 'var(--neutral-600)', lineHeight: 1.5 }}>
                  <strong>Pemberitahuan Resmi:</strong> Halaman ini merupakan prototipe etalase produk unggulan daerah. Transaksi jual-beli dilakukan langsung antara peminat dan kontak pelaku usaha binaan daerah.
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Rincian Produk */}
          <div className="gov-product-modal-content">
            {/* Header: Kategori & Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
              <span className="gov-product-category-tag">
                {product.category || 'Umum'}
              </span>

              {isForSale ? (
                <span className="gov-product-badge gov-badge-sale">
                  <Icon name="tag" size={12} />
                  <span>Produk Dijual</span>
                </span>
              ) : (
                <span className="gov-product-badge gov-badge-exhibit">
                  <Icon name="eye" size={12} />
                  <span>Katalog Pameran Daerah</span>
                </span>
              )}

              {product.originRegion && (
                <span className="gov-product-region-tag">
                  <Icon name="map-pin" size={12} />
                  <span>{product.originRegion}</span>
                </span>
              )}
            </div>

            {/* Nama Produk */}
            <h2 id="modal-product-title" className="gov-product-modal-title">
              {product.name}
            </h2>

            {/* Harga atau Keterangan Pameran */}
            <div className="gov-product-modal-price-card">
              {isForSale ? (
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--neutral-500)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Harga Referensi Penjual
                  </span>
                  <div style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--gov-blue-dark)', lineHeight: 1.2 }}>
                    {formatRupiah(product.price)}
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--neutral-500)' }}>
                    *Harga sewaktu-waktu dapat disesuaikan oleh pihak pengrajin/UMKM terkait.
                  </span>
                </div>
              ) : (
                <div style={{ padding: '0.5rem 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#B45309', fontWeight: 700, fontSize: '0.9375rem' }}>
                    <Icon name="shield" size={18} color="#B45309" />
                    <span>Barang Koleksi Pameran (Tidak Diperjualbelikan)</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--neutral-600)', margin: '0.25rem 0 0 0' }}>
                    Produk ini terdaftar khusus sebagai artefak kebudayaan, karya seni pameran, atau cinderamata kehormatan daerah Provinsi Riau.
                  </p>
                </div>
              )}
            </div>

            {/* Identitas UMKM / Penjual jika tersedia */}
            {(product.sellerName || product.originRegion) && (
              <div className="gov-product-modal-seller-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <Icon name="store" size={16} color="var(--gov-blue)" />
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--neutral-800)' }}>
                    Pelaku Usaha / Pengrajin Binaan Daerah
                  </span>
                </div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--neutral-900)' }}>
                  {product.sellerName || 'Mitra Binaan Pemprov Riau'}
                </div>
                {product.originRegion && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)', marginTop: '0.2rem' }}>
                    Wilayah: <strong>{product.originRegion}</strong>, Provinsi Riau
                  </div>
                )}
                {isForSale && hasContact && (
                  <div style={{ fontSize: '0.775rem', color: 'var(--neutral-600)', marginTop: '0.35rem' }}>
                    Kontak Layanan: <code style={{ backgroundColor: 'var(--neutral-100)', padding: '0.15rem 0.4rem', borderRadius: '3px' }}>{product.sellerContact}</code>
                  </div>
                )}
              </div>
            )}

            {/* Deskripsi Lengkap Produk */}
            <div style={{ marginTop: '1.25rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--neutral-800)', marginBottom: '0.4rem' }}>
                Deskripsi & Keunggulan Produk
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--neutral-700)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                {product.description || product.shortDescription || 'Tidak ada deskripsi detail untuk produk ini.'}
              </p>
            </div>

            {/* Tombol Aksi: Pemesanan / Kontak / Buka Halaman Penuh */}
            <div className="gov-product-modal-actions">
              {isForSale && hasContact ? (
                <a
                  href={waUrl || `tel:${product.sellerContact}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gov-btn gov-btn-primary"
                  style={{ backgroundColor: '#15803D', borderColor: '#15803D' }}
                  title="Hubungi penjual melalui kontak yang tersedia"
                >
                  <Icon name="phone" size={15} />
                  <span>Hubungi Penjual / Pesan (Demo)</span>
                </a>
              ) : null}

              <Link
                to={`/produk/${product.id}`}
                className="gov-btn gov-btn-outline-neutral"
                onClick={onClose}
              >
                <Icon name="external-link" size={14} />
                <span>Buka Halaman Lengkap</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
