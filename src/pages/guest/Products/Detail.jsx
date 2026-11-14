import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from "../../../components/Breadcrumbs";
import Icon from "../../../components/Icon";
import ProductCard from "../../../components/ProductCard";
import { getProductById, getPublicProducts, formatRupiah } from "../../../services/productStorage";

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
      <div className="pg">
        <div className="gov-container pg-body">
          <p className="pg-placeholder">Memuat rincian produk daerah…</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pg">
        <div className="gov-container pg-body">
          <div className="pg-empty">
            <h2 className="pg-empty__title">Produk Tidak Ditemukan</h2>
            <p className="pg-empty__desc">
              Produk dengan pengenal tersebut tidak ditemukan di etalase atau sedang
              disembunyikan oleh pihak pengelola.
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
    <div className="pg prod-detail">
      <Breadcrumbs
        items={[
          { label: 'Etalase Produk', path: '/produk' },
          { label: product.name }
        ]}
      />

      <div className="gov-container pg-body">
        <div className="prod-detail__toolbar">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="prod-detail__back"
          >
            <Icon name="arrow-left" size={14} />
            <span>Kembali</span>
          </button>
        </div>

        <div className="prod-detail__grid">
          {/* Kolom kiri: media */}
          <div className="prod-detail__media">
            <figure className="prod-detail__figure">
              <img
                src={product.image || '/logo-riau.svg'}
                alt={product.name}
                width="640"
                height="640"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/logo-riau.svg';
                }}
              />
              {product.isDemo && (
                <figcaption className="prod-detail__demo-tag">Data demo prototipe</figcaption>
              )}
            </figure>

            <p className="prod-detail__origin-note">
              <Icon name="shield" size={15} />
              <span>
                Dipublikasikan dalam rangka Gerakan Bangga Buatan Indonesia dan promosi
                kekayaan budaya Provinsi Riau.
              </span>
            </p>
          </div>

          {/* Kolom kanan: informasi */}
          <div className="prod-detail__info">
            <div className="prod-detail__tags">
              <span className="prod-detail__tag">{product.category || 'Umum'}</span>
              <span className="prod-detail__tag prod-detail__tag--type">
                <Icon name={isForSale ? 'tag' : 'eye'} size={12} />
                {isForSale ? 'Tersedia untuk dijual' : 'Koleksi pameran'}
              </span>
              {product.originRegion && (
                <span className="prod-detail__tag">
                  <Icon name="map-pin" size={12} />
                  {product.originRegion}
                </span>
              )}
            </div>

            <h1 className="prod-detail__title">{product.name}</h1>

            {isForSale ? (
              <div className="prod-detail__price">
                <span className="prod-detail__price-label">Harga penjualan estimasi</span>
                <span className="prod-detail__price-value">{formatRupiah(product.price)}</span>
                <span className="prod-detail__price-note">
                  Mengacu pada penetapan pihak pengrajin/UMKM binaan bersangkutan.
                </span>
              </div>
            ) : (
              <div className="prod-detail__exhibit">
                <span className="prod-detail__exhibit-label">
                  <Icon name="eye" size={14} />
                  Barang pameran non-komersial
                </span>
                <p className="prod-detail__exhibit-text">
                  Produk ini tidak diperjualbelikan melalui portal resmi, melainkan dipamerkan
                  sebagai dokumentasi warisan budaya dan potensi unggulan daerah.
                </p>
              </div>
            )}

            <section className="prod-detail__section">
              <h2 className="prod-detail__section-title">Pelaku Usaha / Pengrajin</h2>
              <dl className="prod-detail__facts">
                <div className="prod-detail__fact">
                  <dt>Nama</dt>
                  <dd>{product.sellerName || 'Mitra Binaan Pemprov Riau'}</dd>
                </div>
                <div className="prod-detail__fact">
                  <dt>Wilayah asal</dt>
                  <dd>{product.originRegion || 'Provinsi Riau'}</dd>
                </div>
                {isForSale && hasContact && (
                  <div className="prod-detail__fact">
                    <dt>Kontak pemesanan</dt>
                    <dd>{product.sellerContact}</dd>
                  </div>
                )}
              </dl>

              {isForSale && hasContact && (
                <a
                  href={waUrl || `tel:${product.sellerContact}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gov-btn gov-btn-primary prod-detail__contact-btn"
                >
                  <Icon name="phone" size={15} />
                  <span>Hubungi Penjual</span>
                </a>
              )}
            </section>

            <section className="prod-detail__section">
              <h2 className="prod-detail__section-title">Deskripsi</h2>
              <p className="prod-detail__description">
                {product.description || product.shortDescription}
              </p>
            </section>

            <section className="prod-detail__section">
              <h2 className="prod-detail__section-title">Parameter Katalog</h2>
              <dl className="prod-detail__facts">
                <div className="prod-detail__fact">
                  <dt>ID produk</dt>
                  <dd className="prod-detail__mono">{product.id}</dd>
                </div>
                <div className="prod-detail__fact">
                  <dt>Kategori</dt>
                  <dd>{product.category}</dd>
                </div>
                <div className="prod-detail__fact">
                  <dt>Sifat etalase</dt>
                  <dd>{isForSale ? 'Komersial (dijual)' : 'Eksibisi warisan budaya'}</dd>
                </div>
                <div className="prod-detail__fact">
                  <dt>Status kurasi</dt>
                  <dd className="prod-detail__verified">Terverifikasi pengelola</dd>
                </div>
              </dl>
            </section>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="prod-detail__related">
            <div className="prod-detail__related-head">
              <h2 className="prod-detail__related-title">Produk daerah lainnya</h2>
              <Link to="/produk" className="prod-detail__related-link">
                <span>Lihat semua produk</span>
                <Icon name="arrow-right" size={13} />
              </Link>
            </div>

            <div className="gov-products-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
