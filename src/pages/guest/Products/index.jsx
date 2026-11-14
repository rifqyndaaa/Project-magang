import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Breadcrumbs from "../../../components/Breadcrumbs";
import Icon from "../../../components/Icon";
import PageHeader from "../../../components/PageHeader";
import ProductCard from "../../../components/ProductCard";
import ProductDetailModal from "../../../components/ProductDetailModal";
import { getPublicProducts, getProductCategories, getProductById } from "../../../services/productStorage";
import { RIAU_REGIONS } from '../../../data/categories';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('kategori') || 'Semua Kategori');
  const [selectedType, setSelectedType] = useState(searchParams.get('jenis') || 'semua'); // 'semua' | 'dijual' | 'dipamerkan'
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get('wilayah') || '');
  const [sortBy, setSortBy] = useState('terbaru'); // 'terbaru' | 'harga-terendah' | 'harga-tertinggi' | 'nama-az'

  // Modal Detail State
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  // Muat data produk dan kategori
  useEffect(() => {
    const loadedProducts = getPublicProducts();
    setProducts(loadedProducts);
    setCategories(['Semua Kategori', ...getProductCategories()]);

    // Cek apakah ada query param ?detail=id
    const detailId = searchParams.get('detail');
    if (detailId) {
      const target = getProductById(detailId);
      if (target) {
        setActiveModalProduct(target);
      }
    }
  }, [searchParams]);

  // Sinkronisasi query params ke URL ketika filter berubah
  const updateFilterParam = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value && value !== 'semua' && value !== 'Semua Kategori') {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }
    setSearchParams(nextParams, { replace: true });
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    updateFilterParam('kategori', cat);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    updateFilterParam('jenis', type);
  };

  const handleRegionChange = (e) => {
    const val = e.target.value;
    setSelectedRegion(val);
    updateFilterParam('wilayah', val);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Semua Kategori');
    setSelectedType('semua');
    setSelectedRegion('');
    setSortBy('terbaru');
    setSearchParams({}, { replace: true });
  };

  // Filter & Urutkan Produk
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        // Filter Kata Kunci
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = (item.name || '').toLowerCase().includes(q);
          const matchDesc = (item.description || '').toLowerCase().includes(q) || (item.shortDescription || '').toLowerCase().includes(q);
          const matchSeller = (item.sellerName || '').toLowerCase().includes(q);
          const matchRegion = (item.originRegion || '').toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchSeller && !matchRegion) {
            return false;
          }
        }

        // Filter Kategori
        if (selectedCategory && selectedCategory !== 'Semua Kategori') {
          if (item.category !== selectedCategory) {
            return false;
          }
        }

        // Filter Jenis Produk (Dijual vs Dipamerkan)
        if (selectedType === 'dijual' && item.productType !== 'dijual') {
          return false;
        }
        if (selectedType === 'dipamerkan' && item.productType !== 'dipamerkan') {
          return false;
        }

        // Filter Wilayah
        if (selectedRegion && item.originRegion !== selectedRegion) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'harga-terendah') {
          return (a.price || 0) - (b.price || 0);
        }
        if (sortBy === 'harga-tertinggi') {
          return (b.price || 0) - (a.price || 0);
        }
        if (sortBy === 'nama-az') {
          return a.name.localeCompare(b.name, 'id');
        }
        // default: terbaru
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      });
  }, [products, searchQuery, selectedCategory, selectedType, selectedRegion, sortBy]);

  // Hitung jumlah per tipe untuk tab filter
  const countStats = useMemo(() => {
    const forSale = products.filter(p => p.productType === 'dijual').length;
    const exhibit = products.filter(p => p.productType === 'dipamerkan').length;
    return {
      all: products.length,
      forSale,
      exhibit
    };
  }, [products]);

  return (
    <div className="gov-products-page">
      {/* Breadcrumbs Navigasi */}
      <Breadcrumbs items={[{ label: 'Etalase Produk' }]} />

      {/* Header Halaman */}
      <div className="gov-container">
        <PageHeader
          eyebrow="Kerajinan, Kuliner & UMKM Daerah"
          title={<>Etalase Produk Unggulan <em>Provinsi Riau</em></>}
          lede="Katalog digital yang mempromosikan kerajinan khas, warisan budaya Melayu, kuliner tradisional, dan karya binaan UMKM dari kabupaten/kota se-Bumi Lancang Kuning."
          meta={[
            { label: 'Total Katalog', value: `${countStats.all} Produk` },
            { label: 'Dijual', value: `${countStats.forSale}` },
            { label: 'Dipamerkan', value: `${countStats.exhibit}` },
          ]}
        />

        <div className="pg-notice">
          <Icon name="info" size={15} />
          <p>
            <strong>Katalog prototipe daerah.</strong> Seluruh produk berstatus simulasi demo terkurasi;
            transaksi pemesanan dilakukan mandiri ke kontak UMKM binaan.
          </p>
        </div>
      </div>

      {/* Main Katalog Section */}
      <section style={{ padding: '2rem 0 4rem 0', backgroundColor: 'var(--neutral-50)' }}>
        <div className="gov-container">
          {/* Kontrol Pencarian & Filter Bar */}
          <div className="gov-card gov-products-control-panel">
            {/* Baris 1: Input Pencarian Teks */}
            <div className="gov-products-search-row">
              <div className="gov-products-search-input-wrap">
                <Icon name="search" size={18} color="var(--neutral-500)" className="gov-search-icon-left" />
                <input
                  type="text"
                  id="search-produk-input"
                  className="gov-input gov-products-search-input"
                  placeholder="Cari produk khas, nama pengrajin/UMKM, atau kata kunci..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    updateFilterParam('q', e.target.value);
                  }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="gov-search-clear-btn"
                    onClick={() => {
                      setSearchQuery('');
                      updateFilterParam('q', '');
                    }}
                    aria-label="Bersihkan pencarian"
                  >
                    <Icon name="x" size={14} />
                  </button>
                )}
              </div>

              {/* Filter Wilayah Kabupaten / Kota */}
              <div className="gov-products-region-filter">
                <select
                  id="select-wilayah-produk"
                  className="gov-select gov-select-compact"
                  value={selectedRegion}
                  onChange={handleRegionChange}
                  aria-label="Filter berdasarkan Kabupaten atau Kota"
                >
                  <option value="">-- Semua Wilayah Riau --</option>
                  {RIAU_REGIONS.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              {/* Urutkan Berdasarkan */}
              <div className="gov-products-sort-filter">
                <select
                  id="select-sort-produk"
                  className="gov-select gov-select-compact"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Urutkan daftar produk"
                >
                  <option value="terbaru">Terbaru Ditambahkan</option>
                  <option value="harga-terendah">Harga Terendah</option>
                  <option value="harga-tertinggi">Harga Tertinggi</option>
                  <option value="nama-az">Nama Produk (A - Z)</option>
                </select>
              </div>
            </div>

            {/* Baris 2: Tabs Jenis Produk (Semua / Dijual / Dipamerkan) */}
            <div className="gov-products-type-tabs">
              <button
                type="button"
                className={`gov-type-tab-btn ${selectedType === 'semua' ? 'is-active' : ''}`}
                onClick={() => handleTypeChange('semua')}
              >
                <span>Semua Produk</span>
                <span className="gov-tab-count">{countStats.all}</span>
              </button>
              <button
                type="button"
                className={`gov-type-tab-btn ${selectedType === 'dijual' ? 'is-active' : ''}`}
                onClick={() => handleTypeChange('dijual')}
              >
                <Icon name="tag" size={13} />
                <span>Tersedia Dijual</span>
                <span className="gov-tab-count">{countStats.forSale}</span>
              </button>
              <button
                type="button"
                className={`gov-type-tab-btn ${selectedType === 'dipamerkan' ? 'is-active' : ''}`}
                onClick={() => handleTypeChange('dipamerkan')}
              >
                <Icon name="eye" size={13} />
                <span>Hanya Dipamerkan</span>
                <span className="gov-tab-count">{countStats.exhibit}</span>
              </button>
            </div>

            {/* Baris 3: Filter Kategori Chips */}
            <div className="gov-products-category-chips">
              <span className="gov-chips-label">Kategori:</span>
              <div className="gov-chips-list">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      className={`gov-category-chip ${isActive ? 'is-active' : ''}`}
                      onClick={() => handleCategoryChange(cat)}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Baris Keterangan Hasil & Tombol Reset */}
          <div className="gov-products-status-bar">
            <div className="gov-products-found-text">
              Menampilkan <strong>{filteredProducts.length}</strong> produk dari total{' '}
              {products.length} koleksi etalase daerah.
            </div>

            {(searchQuery || selectedCategory !== 'Semua Kategori' || selectedType !== 'semua' || selectedRegion) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="gov-btn gov-btn-outline-neutral gov-btn-sm"
                style={{ fontSize: '0.775rem', padding: '0.25rem 0.6rem' }}
              >
                <Icon name="refresh" size={12} />
                <span>Reset Semua Filter</span>
              </button>
            )}
          </div>

          {/* Grid Daftar Produk */}
          {filteredProducts.length > 0 ? (
            <div className="gov-products-grid">
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onSelect={(selected) => setActiveModalProduct(selected)}
                />
              ))}
            </div>
          ) : (
            /* Kondisi Produk Tidak Ditemukan */
            <div className="gov-card gov-products-empty-state">
              <div className="gov-empty-icon-wrap">
                <Icon name="package" size={40} color="var(--neutral-400)" />
              </div>
              <h2 className="gov-empty-title">Tidak Ada Produk yang Sesuai</h2>
              <p className="gov-empty-desc">
                Tidak ditemukan produk dengan kriteria penyaringan yang Anda pilih. Silakan gunakan kata kunci lain atau bersihkan filter pencarian.
              </p>
              <button
                type="button"
                className="gov-btn gov-btn-primary gov-btn-sm"
                onClick={handleResetFilters}
              >
                <Icon name="refresh" size={14} />
                <span>Tampilkan Seluruh Produk</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Modal Detail Produk */}
      {activeModalProduct && (
        <ProductDetailModal
          product={activeModalProduct}
          onClose={() => {
            setActiveModalProduct(null);
            // Bersihkan query param detail
            if (searchParams.get('detail')) {
              const next = new URLSearchParams(searchParams);
              next.delete('detail');
              setSearchParams(next, { replace: true });
            }
          }}
        />
      )}
    </div>
  );
}
