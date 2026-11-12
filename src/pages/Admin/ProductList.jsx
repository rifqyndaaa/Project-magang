import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/common/Icon';
import ProductFormModal from './ProductFormModal';
import CategoryManageModal from './CategoryManageModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import {
  getAllProducts,
  deleteProduct,
  toggleProductVisibility,
  resetProductsToDefault,
  getProductCategories,
  formatRupiah
} from '../../services/productStorage';

export default function AdminProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterQuery, setFilterQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Modals state
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);

  // Alert notification
  const [alertNotice, setAlertNotice] = useState(null);

  const loadData = () => {
    setProducts(getAllProducts());
    setCategories(getProductCategories());
  };

  useEffect(() => {
    loadData();
  }, []);

  const showAlert = (message, type = 'success') => {
    setAlertNotice({ message, type });
    setTimeout(() => {
      setAlertNotice(null);
    }, 4000);
  };

  // Toggle visibilitas produk (tampil / sembunyikan)
  const handleToggleStatus = (id) => {
    const res = toggleProductVisibility(id);
    if (res.success) {
      loadData();
      showAlert(
        res.newStatus === 'published'
          ? 'Produk kini ditampilkan ke portal publik.'
          : 'Produk kini disembunyikan dari portal publik (status draft).',
        'info'
      );
    }
  };

  // Hapus produk
  const handleConfirmDelete = () => {
    if (!deletingProduct) return;
    const res = deleteProduct(deletingProduct.id);
    if (res.success) {
      showAlert(`Produk "${deletingProduct.name}" berhasil dihapus.`);
      setDeletingProduct(null);
      loadData();
    }
  };

  // Reset ke data demo awal
  const handleResetDemo = () => {
    if (window.confirm('Apakah Anda ingin memulihkan seluruh data produk ke setelan demo awal Pemprov Riau? Produk baru yang Anda tambahkan akan direset.')) {
      resetProductsToDefault();
      loadData();
      showAlert('Data produk demo berhasil dipulihkan.');
    }
  };

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (filterQuery.trim()) {
        const q = filterQuery.toLowerCase();
        const matchName = (p.name || '').toLowerCase().includes(q);
        const matchId = (p.id || '').toLowerCase().includes(q);
        const matchSeller = (p.sellerName || '').toLowerCase().includes(q);
        const matchRegion = (p.originRegion || '').toLowerCase().includes(q);
        if (!matchName && !matchId && !matchSeller && !matchRegion) return false;
      }

      if (filterCategory && p.category !== filterCategory) return false;
      if (filterType && p.productType !== filterType) return false;
      if (filterStatus && p.status !== filterStatus) return false;

      return true;
    });
  }, [products, filterQuery, filterCategory, filterType, filterStatus]);

  // Statistik Produk
  const stats = useMemo(() => {
    const total = products.length;
    const forSale = products.filter(p => p.productType === 'dijual').length;
    const exhibit = products.filter(p => p.productType === 'dipamerkan').length;
    const published = products.filter(p => p.status === 'published').length;
    const hidden = products.filter(p => p.status === 'hidden').length;
    return { total, forSale, exhibit, published, hidden };
  }, [products]);

  return (
    <div className="gov-container">
      {/* Header Halaman Pengelolaan Produk */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="gov-section-tag" style={{ color: 'var(--gov-blue)' }}>MODUL ETALASE PRODUK</span>
            <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', backgroundColor: 'var(--gov-yellow-soft)', color: '#B45309', fontWeight: 700, borderRadius: '3px', border: '1px solid #FDE68A' }}>
              POTENSI DAERAH
            </span>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--neutral-900)', margin: '0.15rem 0' }}>
            Pengelolaan Etalase Produk Unggulan & UMKM Riau
          </h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--neutral-600)', margin: 0 }}>
            Kelola katalog produk binaan, atur visibilitas tampil/sembunyi, unggah foto, dan pisahkan produk pameran dengan produk komersial.
          </p>
        </div>

        {/* Tombol Aksi Utama */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handleResetDemo}
            className="gov-btn gov-btn-outline-neutral gov-btn-sm"
            title="Kembalikan data ke setelan demo awal"
          >
            <Icon name="refresh" size={13} />
            <span>Reset Data Demo</span>
          </button>

          <button
            type="button"
            onClick={() => setCategoryModalOpen(true)}
            className="gov-btn gov-btn-outline-neutral gov-btn-sm"
            title="Atur kategori produk yang tersedia"
          >
            <Icon name="tag" size={13} />
            <span>Kelola Kategori</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setEditingProduct(null);
              setFormModalOpen(true);
            }}
            className="gov-btn gov-btn-primary gov-btn-sm"
            id="btn-admin-add-product"
          >
            <Icon name="plus" size={15} />
            <span>Tambah Produk Baru</span>
          </button>
        </div>
      </div>

      {/* Alert Notifikasi */}
      {alertNotice && (
        <div
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '4px',
            marginBottom: '1.25rem',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: alertNotice.type === 'info' ? 'var(--gov-blue-soft)' : '#F0FDF4',
            border: alertNotice.type === 'info' ? '1px solid var(--gov-blue-border)' : '1px solid #BBF7D0',
            color: alertNotice.type === 'info' ? 'var(--gov-blue-dark)' : '#15803D'
          }}
        >
          <Icon name="check-circle" size={18} color="currentColor" />
          <span>{alertNotice.message}</span>
        </div>
      )}

      {/* Ringkasan Statistik Kartu */}
      <div className="gov-grid gov-grid-4" style={{ marginBottom: '1.5rem' }}>
        <div
          className="gov-card"
          style={{ padding: '1rem', cursor: 'pointer', borderLeft: filterStatus === '' && filterType === '' ? '3px solid var(--neutral-800)' : '1px solid var(--neutral-200)' }}
          onClick={() => {
            setFilterStatus('');
            setFilterType('');
          }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--neutral-500)' }}>Total Produk</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--neutral-900)' }}>{stats.total}</div>
          <span style={{ fontSize: '0.7rem', color: 'var(--neutral-400)' }}>Semua kategori produk</span>
        </div>

        <div
          className="gov-card"
          style={{ padding: '1rem', cursor: 'pointer', borderLeft: filterType === 'dijual' ? '3px solid #1D4ED8' : '1px solid var(--neutral-200)' }}
          onClick={() => setFilterType(prev => prev === 'dijual' ? '' : 'dijual')}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1D4ED8' }}>Produk Dijual</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1D4ED8' }}>{stats.forSale}</div>
          <span style={{ fontSize: '0.7rem', color: 'var(--neutral-500)' }}>Dengan harga & kontak UMKM</span>
        </div>

        <div
          className="gov-card"
          style={{ padding: '1rem', cursor: 'pointer', borderLeft: filterType === 'dipamerkan' ? '3px solid #B45309' : '1px solid var(--neutral-200)' }}
          onClick={() => setFilterType(prev => prev === 'dipamerkan' ? '' : 'dipamerkan')}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#B45309' }}>Dipamerkan Saja</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#B45309' }}>{stats.exhibit}</div>
          <span style={{ fontSize: '0.7rem', color: 'var(--neutral-500)' }}>Non-komersial / Pameran</span>
        </div>

        <div
          className="gov-card"
          style={{ padding: '1rem', cursor: 'pointer', borderLeft: filterStatus === 'published' ? '3px solid #15803D' : '1px solid var(--neutral-200)' }}
          onClick={() => setFilterStatus(prev => prev === 'published' ? '' : 'published')}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#15803D' }}>Tampil di Publik</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#15803D' }}>{stats.published}</div>
          <span style={{ fontSize: '0.7rem', color: 'var(--neutral-500)' }}>{stats.hidden} draft disembunyikan</span>
        </div>
      </div>

      {/* Filter dan Pencarian Bar */}
      <div className="gov-card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Icon name="filter" size={16} color="var(--neutral-600)" />
          <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, margin: 0, color: 'var(--neutral-800)' }}>
            Filter & Pencarian Produk
          </h2>
        </div>

        <div className="gov-grid gov-grid-4">
          <div className="gov-form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="filter-admin-product-query" className="gov-label" style={{ fontSize: '0.775rem' }}>
              Cari Nama / ID / UMKM
            </label>
            <input
              type="text"
              id="filter-admin-product-query"
              className="gov-input"
              placeholder="Kata kunci produk..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              style={{ fontSize: '0.8125rem', padding: '0.45rem 0.65rem' }}
            />
          </div>

          <div className="gov-form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="filter-admin-product-category" className="gov-label" style={{ fontSize: '0.775rem' }}>
              Kategori Produk
            </label>
            <select
              id="filter-admin-product-category"
              className="gov-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{ fontSize: '0.8125rem', padding: '0.45rem 0.65rem' }}
            >
              <option value="">-- Semua Kategori --</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="gov-form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="filter-admin-product-type" className="gov-label" style={{ fontSize: '0.775rem' }}>
              Jenis Produk
            </label>
            <select
              id="filter-admin-product-type"
              className="gov-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{ fontSize: '0.8125rem', padding: '0.45rem 0.65rem' }}
            >
              <option value="">-- Semua Jenis --</option>
              <option value="dijual">Dijual (Komersial)</option>
              <option value="dipamerkan">Dipamerkan Saja</option>
            </select>
          </div>

          <div className="gov-form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="filter-admin-product-status" className="gov-label" style={{ fontSize: '0.775rem' }}>
              Status Publikasi
            </label>
            <select
              id="filter-admin-product-status"
              className="gov-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ fontSize: '0.8125rem', padding: '0.45rem 0.65rem' }}
            >
              <option value="">-- Semua Status --</option>
              <option value="published">Tampil di Publik</option>
              <option value="hidden">Disembunyikan (Draft)</option>
            </select>
          </div>
        </div>

        {(filterQuery || filterCategory || filterType || filterStatus) && (
          <div style={{ marginTop: '0.875rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--neutral-200)', fontSize: '0.775rem' }}>
            <span style={{ color: 'var(--neutral-600)' }}>
              Menemukan <strong>{filteredProducts.length}</strong> produk sesuai filter.
            </span>
            <button
              type="button"
              onClick={() => {
                setFilterQuery('');
                setFilterCategory('');
                setFilterType('');
                setFilterStatus('');
              }}
              className="gov-btn gov-btn-outline-neutral gov-btn-sm"
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>

      {/* Tabel Data Produk */}
      <div className="gov-card" style={{ overflow: 'hidden' }}>
        <div className="gov-table-wrapper">
          <table className="gov-table">
            <thead>
              <tr>
                <th style={{ width: '60px', textAlign: 'center' }}>Foto</th>
                <th>Nama Produk & ID</th>
                <th>Kategori & Wilayah</th>
                <th>Jenis</th>
                <th>Harga</th>
                <th>UMKM / Penjual</th>
                <th>Status Tampil</th>
                <th style={{ textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => {
                const isForSale = p.productType === 'dijual';
                const isPublished = p.status === 'published';

                return (
                  <tr key={p.id}>
                    {/* Thumbnail Foto */}
                    <td style={{ textAlign: 'center', padding: '0.5rem' }}>
                      <div style={{ width: '50px', height: '40px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--neutral-300)', backgroundColor: 'var(--neutral-100)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img
                          src={p.image || '/logo-riau.svg'}
                          alt={p.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/logo-riau.svg';
                          }}
                        />
                      </div>
                    </td>

                    {/* Nama Produk & ID */}
                    <td style={{ maxWidth: '240px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--neutral-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--neutral-400)', fontFamily: 'monospace' }}>
                        {p.id}
                      </div>
                    </td>

                    {/* Kategori & Asal */}
                    <td>
                      <span className="gov-product-category-tag" style={{ fontSize: '0.75rem' }}>
                        {p.category}
                      </span>
                      <div style={{ fontSize: '0.725rem', color: 'var(--neutral-500)', marginTop: '0.2rem' }}>
                        {p.originRegion || '-'}
                      </div>
                    </td>

                    {/* Jenis (Dijual vs Dipamerkan) */}
                    <td>
                      {isForSale ? (
                        <span className="gov-product-badge gov-badge-sale" style={{ fontSize: '0.725rem' }}>
                          <Icon name="tag" size={11} />
                          <span>Dijual</span>
                        </span>
                      ) : (
                        <span className="gov-product-badge gov-badge-exhibit" style={{ fontSize: '0.725rem' }}>
                          <Icon name="eye" size={11} />
                          <span>Dipamerkan</span>
                        </span>
                      )}
                    </td>

                    {/* Harga */}
                    <td style={{ fontWeight: 600, color: isForSale ? 'var(--gov-blue-dark)' : 'var(--neutral-400)', fontSize: '0.8125rem' }}>
                      {isForSale ? formatRupiah(p.price) : <span style={{ fontStyle: 'italic', fontSize: '0.75rem' }}>Non-komersial</span>}
                    </td>

                    {/* UMKM / Penjual */}
                    <td style={{ fontSize: '0.775rem', maxWidth: '180px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--neutral-800)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {p.sellerName || '-'}
                      </div>
                      {p.sellerContact && (
                        <div style={{ fontSize: '0.7rem', color: 'var(--neutral-500)' }}>
                          {p.sellerContact}
                        </div>
                      )}
                    </td>

                    {/* Status Tampil / Sembunyi */}
                    <td>
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(p.id)}
                        className={`gov-btn gov-btn-sm ${isPublished ? 'gov-btn-status-active' : 'gov-btn-status-hidden'}`}
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '20px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          backgroundColor: isPublished ? '#F0FDF4' : '#F1F5F9',
                          borderColor: isPublished ? '#BBF7D0' : '#CBD5E1',
                          color: isPublished ? '#15803D' : '#64748B'
                        }}
                        title={isPublished ? 'Klik untuk menyembunyikan produk' : 'Klik untuk menampilkan ke publik'}
                      >
                        <Icon name={isPublished ? 'eye' : 'eye-off'} size={12} />
                        <span>{isPublished ? 'Tampil' : 'Disembunyikan'}</span>
                      </button>
                    </td>

                    {/* Aksi */}
                    <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                        {/* Preview Publik */}
                        <Link
                          to={`/produk/${p.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="gov-btn gov-btn-outline-neutral gov-btn-sm"
                          style={{ padding: '0.25rem 0.5rem' }}
                          title="Lihat Pratinjau Publik"
                        >
                          <Icon name="external-link" size={13} />
                        </Link>

                        {/* Edit */}
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProduct(p);
                            setFormModalOpen(true);
                          }}
                          className="gov-btn gov-btn-secondary gov-btn-sm"
                          style={{ padding: '0.25rem 0.5rem' }}
                          title="Edit Produk"
                        >
                          <Icon name="edit" size={13} />
                          <span>Edit</span>
                        </button>

                        {/* Hapus */}
                        <button
                          type="button"
                          onClick={() => setDeletingProduct(p)}
                          className="gov-btn gov-btn-sm"
                          style={{
                            padding: '0.25rem 0.5rem',
                            backgroundColor: '#FEF2F2',
                            borderColor: '#FECACA',
                            color: '#DC2626'
                          }}
                          title="Hapus Produk"
                        >
                          <Icon name="trash" size={13} color="#DC2626" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <Icon name="package" size={32} color="var(--neutral-400)" />
                    <p style={{ marginTop: '0.5rem', color: 'var(--neutral-600)', fontWeight: 600 }}>
                      Tidak ada produk yang sesuai dengan kriteria penyaringan.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setFilterQuery('');
                        setFilterCategory('');
                        setFilterType('');
                        setFilterStatus('');
                      }}
                      className="gov-btn gov-btn-outline-neutral gov-btn-sm"
                      style={{ marginTop: '0.5rem' }}
                    >
                      Bersihkan Filter
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Tambah / Edit */}
      {formModalOpen && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => {
            setFormModalOpen(false);
            setEditingProduct(null);
          }}
          onSaveSuccess={(savedItem) => {
            setFormModalOpen(false);
            setEditingProduct(null);
            loadData();
            showAlert(
              editingProduct
                ? `Perubahan data "${savedItem.name}" berhasil disimpan.`
                : `Produk baru "${savedItem.name}" berhasil ditambahkan ke etalase.`
            );
          }}
        />
      )}

      {/* Modal Kelola Kategori */}
      {categoryModalOpen && (
        <CategoryManageModal
          onClose={() => {
            setCategoryModalOpen(false);
            loadData();
          }}
          onCategoriesUpdated={(updated) => {
            setCategories(updated);
          }}
        />
      )}

      {/* Modal Konfirmasi Hapus */}
      {deletingProduct && (
        <DeleteConfirmModal
          product={deletingProduct}
          onCancel={() => setDeletingProduct(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
