import { Link } from 'react-router-dom';
import Icon from './Icon';
import { formatRupiah } from '../services/productStorage';

export default function ProductCard({ product, onSelect }) {
  if (!product) return null;

  const isForSale = product.productType === 'dijual';

  return (
    <article className="gov-card gov-product-card" aria-labelledby={`product-title-${product.id}`}>
      {/* Header Gambar & Badge Status Produk */}
      <div className="gov-product-card-media">
        <img
          src={product.image || '/logo-riau.svg'}
          alt={`Foto produk ${product.name}`}
          className="gov-product-card-img"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/logo-riau.svg';
          }}
        />

        {/* Badge Jenis Produk: Dijual vs Dipamerkan */}
        <div className="gov-product-type-badge-container">
          {isForSale ? (
            <span className="gov-product-badge gov-badge-sale" title="Produk dapat dipesan melalui kontak UMKM">
              <Icon name="tag" size={12} />
              <span>Dijual</span>
            </span>
          ) : (
            <span className="gov-product-badge gov-badge-exhibit" title="Koleksi pameran dan promosi daerah (Non-Komersial)">
              <Icon name="eye" size={12} />
              <span>Dipamerkan</span>
            </span>
          )}
        </div>

        {/* Badge Demo Prototype */}
        {product.isDemo && (
          <span className="gov-product-demo-badge" title="Data simulasi prototipe resmi">
            DEMO
          </span>
        )}
      </div>

      {/* Konten Informasi Produk */}
      <div className="gov-product-card-body">
        {/* Kategori & Wilayah Asal */}
        <div className="gov-product-meta-row">
          <span className="gov-product-category-tag">
            {product.category || 'Umum'}
          </span>
          {product.originRegion && (
            <span className="gov-product-region-tag" title={`Asal: ${product.originRegion}`}>
              <Icon name="map-pin" size={11} />
              <span>{product.originRegion}</span>
            </span>
          )}
        </div>

        {/* Nama Produk */}
        <h3 id={`product-title-${product.id}`} className="gov-product-card-title">
          <Link to={`/produk/${product.id}`} onClick={(e) => {
            if (onSelect) {
              e.preventDefault();
              onSelect(product);
            }
          }}>
            {product.name}
          </Link>
        </h3>

        {/* UMKM / Penjual jika ada */}
        {product.sellerName && (
          <div className="gov-product-seller" title={product.sellerName}>
            <Icon name="store" size={13} color="var(--neutral-500)" />
            <span className="gov-product-seller-text">{product.sellerName}</span>
          </div>
        )}

        {/* Deskripsi Singkat */}
        <p className="gov-product-card-desc">
          {product.shortDescription || 'Informasi deskripsi produk khas daerah Provinsi Riau.'}
        </p>

        {/* Footer Kartu: Harga / Keterangan Pameran + Tombol Detail */}
        <div className="gov-product-card-footer">
          <div className="gov-product-price-box">
            {isForSale ? (
              <>
                <span className="gov-price-label">Harga Estimasi</span>
                <span className="gov-price-val">{formatRupiah(product.price)}</span>
              </>
            ) : (
              <>
                <span className="gov-price-label">Klasifikasi</span>
                <span className="gov-exhibit-label">Pameran Daerah</span>
              </>
            )}
          </div>

          <div className="gov-product-actions">
            <button
              type="button"
              className="gov-btn gov-btn-primary gov-btn-sm gov-product-detail-btn"
              onClick={() => onSelect ? onSelect(product) : null}
              aria-label={`Lihat detail produk ${product.name}`}
            >
              <span>Lihat Detail</span>
              <Icon name="arrow-right" size={13} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
