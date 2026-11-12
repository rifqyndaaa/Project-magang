import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Icon from '../../../components/Icon';
import { GALERI_DATA } from '../../../data/activitiesData';
import './Activities.css';

export default function GaleriFoto() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Tutup lightbox dengan tombol Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      }
    };
    if (selectedPhoto) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedPhoto]);

  return (
    <div className="act-page">
      <div className="gov-container">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Beranda', to: '/' },
            { label: 'Kegiatan', to: '/kegiatan' },
            { label: 'Galeri Foto' }
          ]}
        />

        {/* Header Halaman */}
        <header className="act-header">
          <div className="act-badge">
            <Icon name="image" size={14} />
            <span>Dokumentasi Visual Kegiatan</span>
          </div>

          <h1 className="act-title">
            Galeri Foto <span className="act-title-accent">IFPI Riau</span>
          </h1>

          <p className="act-desc">
            Dokumentasi visual rangkaian kegiatan, forum pengadaan, rapat kerja, dan kemitraan organisasi DPW IFPI Provinsi Riau.
          </p>
        </header>

        {/* Tab Navigasi 3 Submenu Kegiatan */}
        <nav className="act-nav-tabs" aria-label="Navigasi Bagian Kegiatan">
          <NavLink
            to="/kegiatan/program-kerja"
            className={({ isActive }) => `act-nav-tab-btn ${isActive ? 'is-active' : ''}`}
          >
            <Icon name="file-text" size={16} />
            <span>Program Kerja</span>
          </NavLink>

          <NavLink
            to="/kegiatan/agenda"
            className={({ isActive }) => `act-nav-tab-btn ${isActive ? 'is-active' : ''}`}
          >
            <Icon name="calendar" size={16} />
            <span>Agenda Kegiatan</span>
          </NavLink>

          <NavLink
            to="/kegiatan/galeri"
            className={({ isActive }) => `act-nav-tab-btn ${isActive ? 'is-active' : ''}`}
          >
            <Icon name="image" size={16} />
            <span>Galeri Foto</span>
          </NavLink>
        </nav>

        {/* Grid Galeri Foto */}
        {GALERI_DATA.length > 0 ? (
          <div className="act-gallery-grid">
            {GALERI_DATA.map((item) => (
              <div
                key={item.id}
                className="act-gallery-card"
                role="button"
                tabIndex={0}
                onClick={() => setSelectedPhoto(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedPhoto(item);
                  }
                }}
                aria-label={`Buka foto: ${item.judul}`}
              >
                <div className="act-gallery-img-wrap">
                  <img
                    src={item.foto}
                    alt={item.judul}
                    className="act-gallery-img"
                    loading="lazy"
                  />
                  <div className="act-gallery-zoom-pill" aria-hidden="true">
                    <Icon name="maximize-2" size={14} />
                  </div>
                </div>

                <div className="act-gallery-meta">
                  <span className="act-gallery-tag">{item.kategori} • {item.tanggal}</span>
                  <h2 className="act-gallery-title">{item.judul}</h2>
                  <p className="act-gallery-desc">{item.keterangan}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="act-empty-state">
            <div className="act-empty-icon">
              <Icon name="camera" size={28} />
            </div>
            <h2 className="act-empty-title">Dokumentasi Sedang Dalam Tahap Kurasi</h2>
            <p className="act-empty-desc">
              Dokumentasi foto kegiatan resmi kepengurusan DPW IFPI Provinsi Riau akan diunggah secara berkala setelah rangkaian acara terlaksana.
            </p>
          </div>
        )}

        {/* Lightbox Modal Tampilan Foto Lebih Besar */}
        {selectedPhoto && (
          <div
            className="act-lightbox-backdrop"
            onClick={() => setSelectedPhoto(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Penampil Foto Ukuran Besar"
          >
            <div
              className="act-lightbox-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="act-lightbox-close-btn"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Tutup foto"
              >
                <Icon name="x" size={18} />
              </button>

              <div className="act-lightbox-img-wrap">
                <img
                  src={selectedPhoto.foto}
                  alt={selectedPhoto.judul}
                  className="act-lightbox-img"
                />
              </div>

              <div className="act-lightbox-info">
                <div className="act-lightbox-info-top">
                  <span className="act-lightbox-cat">{selectedPhoto.kategori}</span>
                  <span className="act-lightbox-date">• Tahun {selectedPhoto.tanggal}</span>
                </div>
                <h3 className="act-lightbox-title">{selectedPhoto.judul}</h3>
                <p className="act-lightbox-text">{selectedPhoto.keterangan}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

