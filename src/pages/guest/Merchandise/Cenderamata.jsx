import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Icon from '../../../components/Icon';
import { CENDERAMATA_DATA } from '../../../data/merchandiseData';
import './Merchandise.css';

const CENDERAMATA_FILTERS = [
  { id: 'all', label: 'Semua Cenderamata' },
  { id: 'plakat', label: 'Plakat & Piagam' },
  { id: 'paket', label: 'Paket Souvenir' },
  { id: 'khas-riau', label: 'Cenderamata Khas Riau' }
];

export default function Cenderamata() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = selectedFilter === 'all'
    ? CENDERAMATA_DATA
    : CENDERAMATA_DATA.filter((item) => item.kategoriKode === selectedFilter);

  return (
    <div className="merch-page">
      <div className="gov-container">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Beranda', to: '/' },
            { label: 'Merchandise', to: '/merchandise' },
            { label: 'Cenderamata' }
          ]}
        />

        {/* Header Halaman */}
        <header className="merch-header">
          <div className="merch-badge">
            <Icon name="award" size={14} />
            <span>Kenang-kenangan &amp; Hadiah Resmi</span>
          </div>

          <h1 className="merch-title">
            Cenderamata Resmi <span className="merch-title-accent">IFPI Riau</span>
          </h1>

          <p className="merch-desc">
            Koleksi plakat penghargaan, piagam kedinasan, paket souvenir tamu kehormatan, dan cenderamata khas Riau beridentitas resmi IFPI.
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

        {/* Filter Kategori Cenderamata */}
        <div className="merch-filter-bar" role="toolbar" aria-label="Filter kategori cenderamata">
          {CENDERAMATA_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`merch-filter-btn ${selectedFilter === f.id ? 'is-active' : ''}`}
              onClick={() => setSelectedFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid Cenderamata */}
        {filteredItems.length > 0 ? (
          <div className="merch-grid">
            {filteredItems.map((item) => (
              <article key={item.id} className="merch-card">
                {/* Visual / Ikon Cenderamata */}
                <div className="merch-card-visual">
                  <span className="merch-card-status-pill merch-status-kedinasan">
                    {item.statusKetersediaan}
                  </span>
                  <div className="merch-card-icon-wrap" aria-hidden="true">
                    <Icon name="award" size={32} />
                  </div>
                  <span className="merch-card-code-pill">{item.kodeBarang}</span>
                </div>

                {/* Konten Kartu */}
                <div className="merch-card-body">
                  <span className="merch-card-cat">{item.kategori}</span>
                  <h2 className="merch-card-title">{item.nama}</h2>
                  <p className="merch-card-desc">{item.deskripsi}</p>

                  {/* Kotak Peruntukan Khusus */}
                  {item.peruntukan && (
                    <div className="merch-peruntukan-box">
                      <Icon name="info" size={14} className="merch-peruntukan-icon" />
                      <span><strong>Peruntukan:</strong> {item.peruntukan}</span>
                    </div>
                  )}

                  {/* Spesifikasi Teknis */}
                  {item.spesifikasi && item.spesifikasi.length > 0 && (
                    <div className="merch-specs-box">
                      <h3 className="merch-specs-title">Spesifikasi Material:</h3>
                      <ul className="merch-specs-list">
                        {item.spesifikasi.map((sp, idx) => (
                          <li key={idx}>{sp}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Footer Kartu & Aksi */}
                  <div className="merch-card-footer">
                    <div className="merch-price-wrap">
                      <span className="merch-price-label">Ketentuan Biaya:</span>
                      <span className="merch-price-val" style={{ fontSize: '0.875rem' }}>{item.harga}</span>
                    </div>

                    <button
                      type="button"
                      className="merch-btn-inquiry"
                      onClick={() => setSelectedItem(item)}
                      aria-label={`Lihat prosedur cenderamata ${item.nama}`}
                    >
                      <Icon name="file-text" size={13} />
                      <span>Prosedur</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="act-empty-state">
            <div className="act-empty-icon">
              <Icon name="award" size={28} />
            </div>
            <h2 className="act-empty-title">Cenderamata Belum Tersedia Pada Kategori Ini</h2>
            <p className="act-empty-desc">
              Informasi cenderamata resmi dan plakat kehormatan akan diperbarui berdasarkan keputusan protokoler DPW IFPI Riau.
            </p>
          </div>
        )}

        {/* Kotak Catatan Tata Kelola Cenderamata */}
        <div className="merch-notice-box">
          <strong>Tata Cara Permohonan Cenderamata Kedinasan:</strong> Plakat, piagam, dan paket cenderamata resmi IFPI dialokasikan khusus untuk keperluan seremoni organisasi, audiensi resmi dengan lembaga pemerintah (Gubernur, LKPP, BPKP, Kejaksaan), perpisahan purna bakti pengurus, serta penghargaan bagi narasumber ahli. Permohonan dapat diajukan secara kedinasan kepada Sekretaris DPW IFPI Riau.
        </div>

        {/* Modal Prosedur Permohonan Cenderamata */}
        {selectedItem && (
          <div
            className="merch-modal-backdrop"
            onClick={() => setSelectedItem(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Prosedur Permohonan Cenderamata"
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
                    <div><strong>Kode Inventaris:</strong> {selectedItem.kodeBarang}</div>
                    <div><strong>Status:</strong> {selectedItem.statusKetersediaan}</div>
                    <div><strong>Peruntukan Utama:</strong> {selectedItem.peruntukan}</div>
                  </div>
                </div>

                <div className="merch-specs-box">
                  <h4 className="merch-specs-title">Spesifikasi Pembuatan:</h4>
                  <ul className="merch-specs-list">
                    {selectedItem.spesifikasi.map((sp, idx) => (
                      <li key={idx}>{sp}</li>
                    ))}
                  </ul>
                </div>

                <div className="merch-modal-contact-row">
                  <Icon name="info" size={18} />
                  <span>
                    Untuk pengajuan plakat atau cenderamata kedinasan resmi, silakan mengirimkan surat permohonan ke Sekretariat DPW IFPI Provinsi Riau atau koordinasi langsung melalui nomor <strong>(0761) 31256</strong>.
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
                  href={`https://wa.me/?text=${encodeURIComponent(`Halo Sekretariat DPW IFPI Riau, saya ingin menanyakan prosedur permohonan cenderamata resmi: ${selectedItem.nama} (${selectedItem.kodeBarang})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="merch-modal-btn-contact"
                >
                  <Icon name="message-circle" size={14} />
                  <span>Hubungi Sekretariat</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

