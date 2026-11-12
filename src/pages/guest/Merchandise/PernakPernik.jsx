import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Icon from '../../../components/Icon';
import { PERNAK_PERNIK_DATA } from '../../../data/merchandiseData';
import './Merchandise.css';

const CATEGORY_FILTERS = [
  { id: 'all', label: 'Semua Kategori' },
  { id: 'atribut', label: 'Atribut & Aksesoris' },
  { id: 'perlengkapan', label: 'Perlengkapan Harian' },
  { id: 'pakaian', label: 'Pakaian & Tekstil' }
];

export default function PernakPernik() {
  const [selectedCat, setSelectedCat] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = selectedCat === 'all'
    ? PERNAK_PERNIK_DATA
    : PERNAK_PERNIK_DATA.filter((item) => item.kategoriKode === selectedCat);

  return (
    <div className="merch-page">
      <div className="gov-container">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Beranda', to: '/' },
            { label: 'Merchandise', to: '/merchandise' },
            { label: 'Pernak-pernik' }
          ]}
        />

        {/* Header Halaman */}
        <header className="merch-header">
          <div className="merch-badge">
            <Icon name="tag" size={14} />
            <span>Atribut &amp; Identitas Organisasi</span>
          </div>

          <h1 className="merch-title">
            Pernak-pernik <span className="merch-title-accent">IFPI Riau</span>
          </h1>

          <p className="merch-desc">
            Koleksi resmi atribut identitas, pin logam, lencana, kaos, tumbler, dan perlengkapan profesi Ikatan Fungsional Pengadaan Indonesia.
          </p>
        </header>

        {/* Tab Navigasi 2 Submenu Merchandise */}
        <nav className="merch-nav-tabs" aria-label="Navigasi Bagian Merchandise">
          <NavLink
            to="/merchandise/pernak-pernik"
            className={({ isActive }) => `merch-nav-tab-btn ${isActive ? 'is-active' : ''}`}
          >
            <Icon name="tag" size={16} />
            <span>Pernak-pernik</span>
          </NavLink>

          <NavLink
            to="/merchandise/cenderamata"
            className={({ isActive }) => `merch-nav-tab-btn ${isActive ? 'is-active' : ''}`}
          >
            <Icon name="award" size={16} />
            <span>Cenderamata</span>
          </NavLink>
        </nav>

        {/* Filter Kategori */}
        <div className="merch-filter-bar" role="toolbar" aria-label="Filter berdasarkan kategori produk">
          {CATEGORY_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`merch-filter-btn ${selectedCat === f.id ? 'is-active' : ''}`}
              onClick={() => setSelectedCat(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid Kartu Produk Pernak-pernik */}
        {filteredItems.length > 0 ? (
          <div className="merch-grid">
            {filteredItems.map((prod) => {
              const isAvailable = prod.statusKetersediaan.toLowerCase().includes('tersedia');
              const statusClass = isAvailable
                ? 'merch-status-tersedia'
                : 'merch-status-preorder';

              return (
                <article key={prod.id} className="merch-card">
                  {/* Visual Produk / Ikon Resmi */}
                  <div className="merch-card-visual">
                    <span className={`merch-card-status-pill ${statusClass}`}>
                      {prod.statusKetersediaan}
                    </span>
                    <div className="merch-card-icon-wrap" aria-hidden="true">
                      <Icon name="shield" size={32} />
                    </div>
                    <span className="merch-card-code-pill">{prod.kodeBarang}</span>
                  </div>

                  {/* Isi Kartu */}
                  <div className="merch-card-body">
                    <span className="merch-card-cat">{prod.kategori}</span>
                    <h2 className="merch-card-title">{prod.nama}</h2>
                    <p className="merch-card-desc">{prod.deskripsi}</p>

                    {/* Spesifikasi Mini */}
                    {prod.spesifikasi && prod.spesifikasi.length > 0 && (
                      <div className="merch-specs-box">
                        <h3 className="merch-specs-title">Spesifikasi Singkat:</h3>
                        <ul className="merch-specs-list">
                          {prod.spesifikasi.map((spec, sIdx) => (
                            <li key={sIdx}>{spec}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Footer Kartu & Aksi */}
                    <div className="merch-card-footer">
                      <div className="merch-price-wrap">
                        <span className="merch-price-label">Estimasi Pengganti:</span>
                        <span className="merch-price-val">{prod.harga}</span>
                      </div>

                      <button
                        type="button"
                        className="merch-btn-inquiry"
                        onClick={() => setSelectedItem(prod)}
                        aria-label={`Tanya ketersediaan ${prod.nama}`}
                      >
                        <Icon name="info" size={13} />
                        <span>Detail &amp; Info</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="act-empty-state">
            <div className="act-empty-icon">
              <Icon name="tag" size={28} />
            </div>
            <h2 className="act-empty-title">Koleksi Belum Tersedia Pada Kategori Ini</h2>
            <p className="act-empty-desc">
              Pengadaan atribut dan pernak-pernik resmi organisasi sedang dalam tahap kurasi oleh Sekretariat DPW IFPI Riau.
            </p>
          </div>
        )}

        {/* Kotak Catatan Kebijakan Organisasi */}
        <div className="merch-notice-box">
          <strong>Informasi Distribusi Atribut Resmi:</strong> Seluruh pernak-pernik dan atribut berlogo resmi Ikatan Fungsional Pengadaan Indonesia (IFPI) diproduksi khusus untuk pembinaan integritas dan identitas anggota. Pemesanan serta distribusi dikelola secara langsung melalui Sekretariat DPW IFPI Provinsi Riau tanpa motif komersialisasi bebas.
        </div>

        {/* Modal Detail & Informasi Pemesanan */}
        {selectedItem && (
          <div
            className="merch-modal-backdrop"
            onClick={() => setSelectedItem(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Detail Produk Merchandise"
          >
            <div
              className="merch-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="merch-modal-header">
                <h3 className="merch-modal-title">{selectedItem.nama}</h3>
                <button
                  type="button"
                  className="merch-modal-close-btn"
                  onClick={() => setSelectedItem(null)}
                  aria-label="Tutup modal"
                >
                  <Icon name="x" size={18} />
                </button>
              </div>

              <div className="merch-modal-body">
                <div className="merch-modal-info-box">
                  <p style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
                    {selectedItem.deskripsi}
                  </p>
                  <div style={{ fontSize: '0.8125rem', color: '#64748B' }}>
                    <div><strong>Kode Produk:</strong> {selectedItem.kodeBarang}</div>
                    <div><strong>Status:</strong> {selectedItem.statusKetersediaan}</div>
                    <div><strong>Biaya Pengganti Cetak:</strong> {selectedItem.harga}</div>
                  </div>
                </div>

                <div className="merch-specs-box">
                  <h4 className="merch-specs-title">Spesifikasi Lengkap:</h4>
                  <ul className="merch-specs-list">
                    {selectedItem.spesifikasi.map((sp, idx) => (
                      <li key={idx}>{sp}</li>
                    ))}
                  </ul>
                </div>

                <div className="merch-modal-contact-row">
                  <Icon name="phone" size={18} />
                  <span>
                    Untuk pemesanan atribut anggota, silakan menghubungi Sekretariat DPW IFPI Provinsi Riau melalui telepon <strong>(0761) 31256</strong> atau hadir langsung di kantor sekretariat.
                  </span>
                </div>
              </div>

              <div className="merch-modal-footer">
                <button
                  type="button"
                  className="merch-modal-btn-close"
                  onClick={() => setSelectedItem(null)}
                >
                  Tutup
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Halo Sekretariat DPW IFPI Riau, saya ingin menanyakan ketersediaan atribut resmi: ${selectedItem.nama} (${selectedItem.kodeBarang})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="merch-modal-btn-contact"
                >
                  <Icon name="message-circle" size={14} />
                  <span>Tanya Sekretariat</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

