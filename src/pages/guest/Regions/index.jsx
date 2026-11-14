import { useState } from 'react';
import { Link } from 'react-router-dom';
import RiauMap from '../../../components/RiauMap';
import Icon from "../../../components/Icon";
import Breadcrumbs from "../../../components/Breadcrumbs";
import PageHeader from "../../../components/PageHeader";
import { RIAU_REGIONS_DATA, getRegionById } from '../../../data/regionsData';
import './Regions.css';

export default function RegionsPage() {
  const [selectedId, setSelectedId] = useState('pekanbaru');

  const selectedRegion = getRegionById(selectedId) || RIAU_REGIONS_DATA[0];

  return (
    <div className="regions-page">
      <div className="gov-container">
        {/* Breadcrumbs Navigasi */}
        <Breadcrumbs
          items={[
            { label: 'Beranda', to: '/' },
            { label: 'Wilayah Kepengurusan' },
          ]}
        />

        {/* Header Halaman Utama */}
        <PageHeader
          eyebrow="Peta Geografis Administratif"
          title={<>Wilayah Kepengurusan <em>IFPI Provinsi Riau</em></>}
          lede="Jelajahi kabupaten dan kota di Provinsi Riau untuk mengetahui informasi serta kepengurusan IFPI di masing-masing wilayah."
          meta={[
            { label: 'Kabupaten', value: '10 Wilayah' },
            { label: 'Kota', value: '2 Wilayah' },
            { label: 'Total', value: '12 Wilayah' },
          ]}
        />

        {/* Quick Pills Selector: Akses Cepat 12 Kabupaten & Kota */}
        <div className="regions-pills-bar" role="toolbar" aria-label="Pilih Kabupaten atau Kota">
          {RIAU_REGIONS_DATA.map((r) => {
            const isActive = r.id === selectedRegion.id;
            return (
              <button
                key={r.id}
                type="button"
                className={`regions-pill-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => setSelectedId(r.id)}
                aria-pressed={isActive}
              >
                {r.shortName}
              </button>
            );
          })}
        </div>

        {/* Area Utama: Peta Interaktif di Kiri + Panel Detail di Kanan */}
        <div className="regions-main-grid">
          {/* Kolom Kiri: Peta Geografis Interaktif SVG */}
          <div className="regions-map-col">
            <RiauMap
              selectedRegionId={selectedRegion.id}
              onSelectRegion={(id) => setSelectedId(id)}
            />
          </div>

          {/* Kolom Kanan: Panel Informasi Wilayah Terpilih */}
          <aside className="regions-sidebar-col" aria-labelledby="selected-region-heading">
            <div className="region-info-panel">
              {/* Header Panel */}
              <div className="region-panel-banner">
                <span className="region-panel-type-tag">
                  {selectedRegion.type === 'kota' ? 'Daerah Otonom Kota' : 'Pemerintah Kabupaten'}
                </span>
                <h2 id="selected-region-heading" className="region-panel-title">
                  {selectedRegion.name.toUpperCase()}
                </h2>
              </div>

              {/* Visual Landmark jika Tersedia */}
              {selectedRegion.image ? (
                <div className="region-panel-visual-box">
                  <img
                    src={selectedRegion.image}
                    alt={selectedRegion.name}
                    className="region-panel-visual-img"
                  />
                  <div className="region-panel-visual-caption">
                    <Icon name="camera" size={12} style={{ display: "inline", marginRight: 4 }} />
                    {selectedRegion.landmark}
                  </div>
                </div>
              ) : null}

              {/* Isi Detail Wilayah */}
              <div className="region-panel-body">
                {/* Ringkasan Statistik */}
                <div className="region-panel-stats">
                  <div className="region-stat-item">
                    <span className="region-stat-label">Pusat Pemerintahan</span>
                    <span className="region-stat-val">{selectedRegion.capital}</span>
                  </div>
                  <div className="region-stat-item">
                    <span className="region-stat-label">Luas Wilayah</span>
                    <span className="region-stat-val">{selectedRegion.area}</span>
                  </div>
                  <div className="region-stat-item">
                    <span className="region-stat-label">Jumlah Penduduk</span>
                    <span className="region-stat-val">{selectedRegion.population}</span>
                  </div>
                  <div className="region-stat-item">
                    <span className="region-stat-label">Wilayah Administrasi</span>
                    <span className="region-stat-val">{selectedRegion.districts}</span>
                  </div>
                </div>

                {/* Deskripsi Singkat */}
                <p className="region-panel-desc">
                  {selectedRegion.description}
                </p>

                {/* Status Kepengurusan IFPI */}
                <div className="region-panel-status-card">
                  <div className="region-status-card-icon">
                    <Icon name="shield" size={18} color="var(--ifpi-red)" />
                  </div>
                  <div>
                    <h3 className="region-status-card-title">Status Kepengurusan IFPI</h3>
                    <p className="region-status-card-text">{selectedRegion.ifpiStatus}</p>
                  </div>
                </div>

                {/* Tombol Aksi Menuju Struktur Organisasi Wilayah */}
                <div className="region-panel-actions">
                  <Link
                    to={`/wilayah/${selectedRegion.id}`}
                    className="region-btn-structure"
                    aria-label={`Lihat Struktur Kepengurusan IFPI ${selectedRegion.name}`}
                  >
                    <span>Lihat Struktur Kepengurusan</span>
                    <Icon name="arrow-right" size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

