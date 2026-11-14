import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from "../../components/Icon";
import {
  getAllProducts,
  toggleProductVisibility,
  deleteProduct,
  resetProductsToDefault,
  formatRupiah
} from '../../services/productStorage';

/**
 * Merchandise — pengelolaan etalase produk.
 * Fungsi yang tersedia di lapisan penyimpanan: sembunyikan/tampilkan produk,
 * hapus produk, dan pulihkan data contoh. Tidak ada fungsi palsu.
 */
export default function AdminMerchandise() {
  const [, setVersion] = useState(0);
  const [notice, setNotice] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const products = getAllProducts();
  const load = () => setVersion(v => v + 1);

  const flash = (type, message) => {
    setNotice({ type, message });
    setTimeout(() => setNotice(null), 4000);
  };

  const handleToggle = (id) => {
    const res = toggleProductVisibility(id);
    if (res.success) {
      load();
      flash('ok', res.newStatus === 'published' ? 'Produk ditampilkan di portal publik.' : 'Produk disembunyikan dari portal publik.');
    }
  };

  const handleDelete = (id) => {
    const res = deleteProduct(id);
    if (res.success) {
      load();
      setConfirmDelete(null);
      flash('ok', 'Produk dihapus dari etalase.');
    }
  };

  const handleReset = () => {
    const res = resetProductsToDefault();
    if (res.success) {
      load();
      flash('warn', 'Data etalase dipulihkan ke daftar contoh awal.');
    }
  };

  const publishedCount = products.filter(p => p.status === 'published').length;

  return (
    <div>
      <header className="adx-page-head">
        <div className="adx-page-head__main">
          <span className="adx-page-head__eyebrow">Etalase</span>
          <h1 className="adx-page-head__title">Merchandise &amp; Produk</h1>
          <p className="adx-page-head__desc">
            {products.length} produk terdaftar, {publishedCount} tampil di portal publik.
            Perubahan visibilitas langsung berlaku pada halaman etalase masyarakat.
          </p>
        </div>
        <div className="adx-page-head__actions">
          <button type="button" className="adx-btn" onClick={handleReset}>
            <Icon name="refresh" size={14} color="currentColor" />
            <span>Pulihkan Contoh</span>
          </button>
        </div>
      </header>

      {notice && (
        <div className={`adx-notice adx-notice--${notice.type}`} role="status">
          {notice.message}
        </div>
      )}

      <section className="adx-panel">
        <div className="adx-table-scroll">
          <table className="adx-table">
            <thead>
              <tr>
                <th>Nama Produk</th>
                <th>Kategori</th>
                <th>Wilayah Asal</th>
                <th>Harga</th>
                <th>Status</th>
                <th data-align="center">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <span className="adx-subject">
                      <span className="adx-subject__title">{p.name}</span>
                      <span className="adx-subject__desc">{p.sellerName}</span>
                    </span>
                  </td>
                  <td>{p.category}</td>
                  <td>{p.originRegion}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {p.productType === 'dipamerkan' ? 'Dipamerkan' : formatRupiah(p.price)}
                  </td>
                  <td>
                    {p.status === 'published' ? (
                      <span className="adx-tag adx-tag--on">Tampil</span>
                    ) : (
                      <span className="adx-tag adx-tag--off">Disembunyikan</span>
                    )}
                  </td>
                  <td data-align="center" style={{ whiteSpace: 'nowrap' }}>
                    <button type="button" className="adx-btn adx-btn--xs" onClick={() => handleToggle(p.id)}>
                      {p.status === 'published' ? 'Sembunyikan' : 'Tampilkan'}
                    </button>
                    {confirmDelete === p.id ? (
                      <>
                        <button
                          type="button"
                          className="adx-btn adx-btn--xs"
                          style={{ marginLeft: '0.3rem', color: '#B8202D', borderColor: '#B8202D' }}
                          onClick={() => handleDelete(p.id)}
                        >
                          Yakin hapus
                        </button>
                        <button
                          type="button"
                          className="adx-btn adx-btn--xs"
                          style={{ marginLeft: '0.25rem' }}
                          onClick={() => setConfirmDelete(null)}
                        >
                          Batal
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        className="adx-btn adx-btn--xs adx-btn--quiet"
                        style={{ marginLeft: '0.3rem' }}
                        onClick={() => setConfirmDelete(p.id)}
                      >
                        Hapus
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="adx-empty">
              <p className="adx-empty__title">Etalase kosong</p>
              <p className="adx-empty__desc">Pulihkan data contoh untuk mengisi kembali daftar produk.</p>
              <button type="button" className="adx-btn" onClick={handleReset}>Pulihkan Contoh</button>
            </div>
          )}
        </div>
      </section>

      <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#8C8C8C' }}>
        Halaman etalase publik dapat dilihat di{' '}
        <Link to="/merchandise" target="_blank" rel="noopener noreferrer" style={{ color: '#B8202D' }}>
          /merchandise
        </Link>.
      </p>
    </div>
  );
}
