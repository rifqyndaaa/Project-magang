import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Icon from '../../../components/Icon';
import PageHeader from '../../../components/PageHeader';
import { BUKU_DATA, BUKU_FILTERS } from '../../../data/bukuData';
import './Merchandise.css';

export default function Buku() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = selectedFilter === 'all'
    ? BUKU_DATA
    : BUKU_DATA.filter((item) => item.kategoriKode === selectedFilter);

  return (
    <div className="merch-page">
      <div className="gov-container">
        <Breadcrumbs
          items={[
            { label: 'Beranda', to: '/' },
            { label: 'Merchandise', to: '/merchandise' },
            { label: 'Buku' }
          ]}
        />

        <PageHeader
          eyebrow="Publikasi & Referensi Profesi"
          title={<>Buku &amp; Karya Tulis <em>IFPI Riau</em></>}
          lede="Katalog buku saku, monograf regulasi, dan kompilasi artikel pengadaan barang/jasa pemerintah yang diterbitkan dalam lingkup DPW IFPI Provinsi Riau."
        />

        {/* Tab Navigasi Submenu Merchandise */}
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

          <NavLink
            to="/merchandise/buku"
            className={({ isActive }) => `merch-nav-tab-btn ${isActive ? 'is-active' : ''}`}
          >
            <Icon name="book" size={16} />
            <span>Buku</span>
          </NavLink>
        </nav>

        {/* Filter Kategori Buku */}
        <div className="merch-filter-bar" role="toolbar" aria-label="Filter kategori buku">
          {BUKU_FILTERS.map((f) => (
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

        {/* Grid Katalog Buku */}
        {filteredItems.length > 0 ? (
          <div className="merch-grid">
            {filteredItems.map((item) => (
              <article key={item.id} className="merch-card">
                <div className={`merch-card-visual ${item.foto ? 'is-cover' : ''}`}>
                  <span className="merch-card-status-pill merch-status-tersedia">
                    {item.statusKetersediaan}
                  </span>
                  {item.foto ? (
                    <img
                      src={item.foto}
                      alt={`Sampul buku ${item.judul}`}
                      className="buku-cover-img"
                      loading="lazy"
                    />
                  ) : (
                    <div className="merch-card-icon-wrap" aria-hidden="true">
                      <Icon name="book" size={32} />
                    </div>
                  )}
                  <span className="merch-card-code-pill">{item.kodeBarang}</span>
                </div>

                <div className="merch-card-body">
                  <span className="merch-card-cat">{item.kategori}</span>
                  <h2 className="merch-card-title">{item.judul}</h2>
                  <p className="merch-card-desc">{item.deskripsi}</p>

                  <div className="merch-specs-box">
                    <h3 className="merch-specs-title">Identitas Terbitan:</h3>
                    <ul className="merch-specs-list">
                      <li>Penulis: {item.penulis}</li>
                      <li>Penerbit: {item.penerbit}</li>
                      <li>Tahun Terbit: {item.tahun}</li>
                      {item.halaman && <li>Jumlah Halaman: {item.halaman} halaman</li>}
                      {item.rujukanRegulasi && item.rujukanRegulasi.length > 0 && (
                        <li>Rujukan Regulasi: {item.rujukanRegulasi.join('; ')}</li>
                      )}
                    </ul>
                  </div>

                  <div className="merch-card-footer">
                    <div className="merch-price-wrap">
                      <span className="merch-price-label">ISBN:</span>
                      <span className="merch-price-val" style={{ fontSize: '0.875rem' }}>
                        {item.isbn || 'Dalam Proses'}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="merch-btn-inquiry"
                      onClick={() => setSelectedItem(item)}
                      aria-label={`Lihat detail buku ${item.judul}`}
                    >
                      <Icon name="file-text" size={13} />
                      <span>Detail</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="act-empty-state">
            <div className="act-empty-icon">
              <Icon name="book" size={28} />
            </div>
            <h2 className="act-empty-title">Katalog Buku Belum Tersedia</h2>
            <p className="act-empty-desc">
              Daftar buku dan karya tulis resmi DPW IFPI Provinsi Riau akan ditampilkan pada halaman ini setelah diterbitkan oleh Divisi Pengembangan Profesi.
            </p>
          </div>
        )}

        {/* Kotak Catatan Penerbitan */}
        <div className="merch-notice-box">
          <strong>Ketentuan Penerbitan &amp; Distribusi Buku:</strong> Buku saku, monograf, dan kompilasi artikel pengadaan diterbitkan terbatas untuk kebutuhan pembinaan kompetensi jabatan fungsional pengadaan barang/jasa. Permintaan salinan dapat diajukan secara kedinasan kepada Sekretariat DPW IFPI Provinsi Riau.
        </div>

        {/* Modal Detail Buku */}
        {selectedItem && (
          <div
            className="merch-modal-backdrop"
            onClick={() => setSelectedItem(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Detail Buku"
          >
            <div className="merch-modal" onClick={(e) => e.stopPropagation()}>
              <div className="merch-modal-header">
                <h3 className="merch-modal-title">{selectedItem.judul}</h3>
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
                    <div><strong>Kode Katalog:</strong> {selectedItem.kodeBarang}</div>
                    <div><strong>Penulis:</strong> {selectedItem.penulis}</div>
                    <div><strong>Penerbit:</strong> {selectedItem.penerbit}</div>
                    <div><strong>Status:</strong> {selectedItem.statusKetersediaan}</div>
                  </div>
                </div>

                <div className="merch-modal-contact-row">
                  <Icon name="phone" size={18} />
                  <span>
                    Permintaan salinan buku dapat dikonsultasikan ke Sekretariat DPW IFPI Provinsi Riau melalui nomor <strong>0811762451</strong>.
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
                  href={`https://wa.me/62811762451?text=${encodeURIComponent(`Halo Sekretariat DPW IFPI Riau, saya ingin menanyakan buku: ${selectedItem.judul} (${selectedItem.kodeBarang})`)}`}
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
