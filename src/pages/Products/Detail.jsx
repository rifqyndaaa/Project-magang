import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Icon from '../../components/common/Icon';
import ProductCard from '../../components/products/ProductCard';
import { getProductById, getPublicProducts, formatRupiah } from '../../utils/productStorage';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const item = getProductById(id);
    setProduct(item);

    if (item) {
      const allPublic = getPublicProducts();
      const related = allPublic
        .filter((p) => p.id !== item.id && (p.category === item.category || p.originRegion === item.originRegion))
        .slice(0, 3);
      setRelatedProducts(related);
    }

    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '4rem 1rem', textAlign: 'center', backgroundColor: 'var(--neutral-50)', minHeight: '60vh' }}>
        <p style={{ color: 'var(--neutral-600)' }}>Memuat rincian produk daerah...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: '4rem 1rem', textAlign: 'center', backgroundColor: 'var(--neutral-50)', minHeight: '60vh' }}>
        <div className="gov-container" style={{ maxWidth: '600px' }}>
          <div className="gov-card" style={{ padding: '3rem 1.5rem' }}>
            <Icon name="alert-circle" size={48} color="var(--neutral-400)" />
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '1rem 0 0.5rem 0', color: 'var(--neutral-900)' }}>
              Produk Tidak Ditemukan
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--neutral-600)', marginBottom: '1.5rem' }}>
              Produk dengan pengenal tersebut tidak ditemukan di etalase atau sedang disembunyikan oleh pihak pengelola.
            </p>
            <Link to="/produk" className="gov-btn gov-btn-primary">
              <Icon name="arrow-left" size={15} />
              <span>Kembali ke Etalase Produk</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isForSale = product.productType === 'dijual';
  const hasContact = Boolean(product.sellerContact && product.sellerContact.trim().length > 0);

  const cleanPhone = product.sellerContact ? product.sellerContact.replace(/\D/g, '') : '';
  const waUrl = cleanPhone
    ? `https://wa.me/${cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone}?text=${encodeURIComponent(
        `Halo, saya ingin menanyakan produk ${product.name} yang tertera di Etalase Produk Pemprov Riau.`
      )}`
    : null;

  return (
    <div className="gov-product-detail-page">
      <Breadcrumbs
        items={[
          { label: 'Etalase Produk', path: '/produk' },
          { label: product.name }
        ]}
      />

      <section style={{ padding: '2rem 0 3.5rem 0', backgroundColor: '#FFFFFF' }}>
        <div className="gov-container">
          {/* Tombol Kembali Cepat */}
          <div style={{ marginBottom: '1.5rem' }}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="gov-btn gov-btn-outline-neutral gov-btn-sm"
            >
              <Icon name="arrow-left" size={14} />
              <span>Kembali</span>
            </button>
          </div>

          <div className="gov-product-detail-grid">
            {/* Kolom Kiri: Galeri Foto */}
            <div className="gov-product-detail-media">
              <div className="gov-card gov-product-detail-img-box">
                <img
                  src={product.image || '/logo-riau.svg'}
                  alt={product.name}
                  className="gov-product-detail-hero-img"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/logo-riau.svg';
                  }}
                />

                {product.isDemo && (
                  <span className="gov-product-demo-badge-large">
                    DATA DEMO PROTOTIPE
                  </span>
                )}
              </div>

              {/* Box Info Verifikasi Pemprov Riau */}
              <div className="gov-card" style={{ marginTop: '1.25rem', padding: '1rem', backgroundColor: 'var(--gov-blue-soft)', borderLeft: '4px solid var(--gov-blue)' }}>
                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                  <Icon name="shield" size={20} color="var(--gov-blue)" />
                  <div>
                    <h2 style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--gov-blue-dark)', margin: 0 }}>
                      Katalog Resmi Mitra Binaan Daerah
                    </h2>
                    <p style={{ fontSize: '0.75rem', color: 'var(--neutral-700)', margin: '0.2rem 0 0 0', lineHeight: 1.5 }}>
                      Produk ini dipublikasikan dalam rangka mendukung program Gerakan Bangga Buatan Indonesia (BBI) dan promosi kekayaan budaya daerah Provinsi Riau.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Detail Informasi Lengkap */}
            <div className="gov-product-detail-info">
              {/* Badges Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                <span className="gov-product-category-tag" style={{ fontSize: '0.8125rem', padding: '0.25rem 0.65rem' }}>
                  {product.category || 'Umum'}
                </span>

                {isForSale ? (
                  <span className="gov-product-badge gov-badge-sale" style={{ fontSize: '0.8125rem', padding: '0.25rem 0.65rem' }}>
                    <Icon name="tag" size={13} />
                    <span>Tersedia untuk Dijual</span>
                  </span>
                ) : (
                  <span className="gov-product-badge gov-badge-exhibit" style={{ fontSize: '0.8125rem', padding: '0.25rem 0.65rem' }}>
                    <Icon name="eye" size={13} />
                    <span>Koleksi Pameran Daerah</span>
                  </span>
                )}

                {product.originRegion && (
                  <span className="gov-product-region-tag" style={{ fontSize: '0.8125rem', padding: '0.25rem 0.65rem' }}>
                    <Icon name="map-pin" size={13} />
                    <span>{product.originRegion}</span>
                  </span>
                )}
              </div>

              {/* Judul Produk */}
              <h1 className="gov-product-detail-title">
                {product.name}
              </h1>

              {/* Kotak Harga atau Pameran */}
              <div className="gov-product-detail-price-panel">
                {isForSale ? (
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neutral-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Harga Penjualan Estimasi
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--gov-blue-dark)', marginTop: '0.15rem' }}>
                      {formatRupiah(product.price)}
                    </div>
                    <span style={{ fontSize: '0.725rem', color: 'var(--neutral-500)' }}>
                      *Harga mengacu pada penetapan pihak pengrajin/UMKM binaan bersangkutan.
                    </span>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#B45309', fontWeight: 800, fontSize: '1rem' }}>
                      <Icon name="eye" size={18} color="#B45309" />
                      <span>Barang Pameran & Eksibisi Non-Komersial</span>
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--neutral-600)', margin: '0.35rem 0 0 0', lineHeight: 1.5 }}>
                      Produk ini tidak diperjualbelikan secara langsung melalui portal resmi ini, melainkan dipamerkan sebagai dokumentasi warisan budaya dan potensi unggulan daerah Provinsi Riau.
                    </p>
                  </div>
                )}
              </div>

              {/* Kartu Pelaku Usaha / Pengrajin */}
              {(product.sellerName || product.originRegion) && (
                <div className="gov-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', backgroundColor: 'var(--neutral-50)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Icon name="store" size={18} color="var(--gov-blue)" />
                    <h2 style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--neutral-900)', margin: 0 }}>
                      Informasi Pelaku Usaha / Pengrajin
                    </h2>
                  </div>

                  <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--neutral-900)' }}>
                    {product.sellerName || 'Mitra Binaan Pemprov Riau'}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginTop: '0.75rem', fontSize: '0.8125rem' }}>
                    <div>
                      <span style={{ color: 'var(--neutral-500)' }}>Wilayah Asal:</span>
                      <div style={{ fontWeight: 600, color: 'var(--neutral-800)' }}>{product.originRegion || 'Provinsi Riau'}</div>
                    </div>

                    {isForSale && hasContact && (
                      <div>
                        <span style={{ color: 'var(--neutral-500)' }}>Kontak Pemesanan:</span>
                        <div style={{ fontWeight: 600, color: 'var(--neutral-800)' }}>{product.sellerContact}</div>
                      </div>
                    )}
                  </div>

                  {/* Tombol Kontak WhatsApp / Telepon jika Dijual */}
                  {isForSale && hasContact && (
                    <div style={{ marginTop: '1rem', paddingTop: '0.875rem', borderTop: '1px solid var(--neutral-200)' }}>
                      <a
                        href={waUrl || `tel:${product.sellerContact}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gov-btn gov-btn-primary"
                        style={{ backgroundColor: '#15803D', borderColor: '#15803D', display: 'inline-flex' }}
                        title="Hubungi langsung penjual atau UMKM"
                      >
                        <Icon name="phone" size={16} />
                        <span>Hubungi Penjual / Pesan (Demo Kontak)</span>
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Deskripsi Lengkap Produk */}
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.0625rem', fontWeight: 800, color: 'var(--neutral-900)', marginBottom: '0.75rem' }}>
                  Deskripsi Lengkap
                </h2>
                <div style={{ fontSize: '0.9375rem', color: 'var(--neutral-700)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                  {product.description || product.shortDescription}
                </div>
              </div>

              {/* Tabel Spesifikasi & Parameter Produk */}
              <div className="gov-card" style={{ padding: '1.25rem', overflow: 'hidden' }}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--neutral-900)', marginBottom: '0.75rem' }}>
                  Parameter Katalog Resmi
                </h3>
                <table className="gov-table" style={{ fontSize: '0.8125rem' }}>
                  <tbody>
                    <tr>
                      <td style={{ width: '35%', color: 'var(--neutral-600)', fontWeight: 600 }}>ID Produk</td>
                      <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>{product.id}</td>
                    </tr>
                    <tr>
                      <td style={{ color: 'var(--neutral-600)', fontWeight: 600 }}>Kategori</td>
                      <td>{product.category}</td>
                    </tr>
                    <tr>
                      <td style={{ color: 'var(--neutral-600)', fontWeight: 600 }}>Sifat Etalase</td>
                      <td>{isForSale ? 'Produk Komersial (Dijual)' : 'Eksibisi Warisan Budaya (Dipamerkan)'}</td>
                    </tr>
                    <tr>
                      <td style={{ color: 'var(--neutral-600)', fontWeight: 600 }}>Asal Daerah</td>
                      <td>{product.originRegion || 'Provinsi Riau'}</td>
                    </tr>
                    <tr>
                      <td style={{ color: 'var(--neutral-600)', fontWeight: 600 }}>Status Kurasi</td>
                      <td>
                        <span style={{ color: 'var(--gov-green-dark)', fontWeight: 700 }}>
                          Terverifikasi Pengelola
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Produk Terkait Lainnya */}
          {relatedProducts.length > 0 && (
            <div style={{ marginTop: '4rem', paddingTop: '2.5rem', borderTop: '1px solid var(--neutral-200)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <span className="gov-section-tag" style={{ color: 'var(--gov-blue)' }}>REKOMENDASI PRODUK</span>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--neutral-900)', margin: '0.2rem 0 0 0' }}>
                    Produk Daerah Terkait Lainnya
                  </h2>
                </div>
                <Link to="/produk" className="gov-btn gov-btn-outline-neutral gov-btn-sm">
                  <span>Lihat Semua Produk</span>
                  <Icon name="arrow-right" size={13} />
                </Link>
              </div>

              <div className="gov-products-grid">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
