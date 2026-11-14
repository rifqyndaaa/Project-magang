import { useState, useRef } from 'react';
import Icon from './Icon';

/**
 * Peta Geografis Interaktif Vektor Provinsi Riau
 * 12 Wilayah Administratif: 10 Kabupaten & 2 Kota
 *
 * Proyeksi topologi berbasis koordinat geografis Provinsi Riau
 * ViewBox: 0 0 920 660
 */

export const RIAU_MAP_REGIONS = [
  {
    id: 'rokan-hilir',
    name: 'Kabupaten Rokan Hilir',
    shortName: 'Rokan Hilir',
    type: 'kabupaten',
    labelX: 195,
    labelY: 135,
    path: 'M 100 85 L 145 60 L 225 50 L 260 80 L 290 100 L 295 135 L 280 170 L 240 185 L 195 210 L 140 190 L 110 145 Z',
  },
  {
    id: 'dumai',
    name: 'Kota Dumai',
    shortName: 'Dumai',
    type: 'kota',
    labelX: 330,
    labelY: 145,
    path: 'M 290 100 L 340 105 L 375 125 L 365 170 L 320 175 L 285 145 Z',
  },
  {
    id: 'bengkalis',
    name: 'Kabupaten Bengkalis',
    shortName: 'Bengkalis',
    type: 'kabupaten',
    labelX: 430,
    labelY: 190,
    // Meliputi daratan pesisir timur + Pulau Bengkalis + Pulau Rupat
    path: `
      M 340 105 L 385 110 L 440 140 L 490 185 L 480 235 L 430 250 L 385 225 L 365 170 L 375 125 Z
      M 315 35 L 365 30 L 380 65 L 350 85 L 310 65 Z
      M 505 160 L 555 170 L 565 215 L 530 235 L 495 205 Z
    `,
  },
  {
    id: 'rokan-hulu',
    name: 'Kabupaten Rokan Hulu',
    shortName: 'Rokan Hulu',
    type: 'kabupaten',
    labelX: 160,
    labelY: 260,
    path: 'M 110 145 L 140 190 L 195 210 L 240 215 L 245 270 L 220 325 L 155 335 L 90 280 L 80 215 Z',
  },
  {
    id: 'kampar',
    name: 'Kabupaten Kampar',
    shortName: 'Kampar',
    type: 'kabupaten',
    labelX: 265,
    labelY: 360,
    path: 'M 240 215 L 290 220 L 325 285 L 320 330 L 365 340 L 360 410 L 310 445 L 240 440 L 190 395 L 220 325 L 245 270 Z',
  },
  {
    id: 'pekanbaru',
    name: 'Kota Pekanbaru',
    shortName: 'Pekanbaru',
    type: 'kota',
    labelX: 345,
    labelY: 305,
    // Enklave ibu kota di antara Kampar dan Siak
    path: 'M 325 285 L 365 280 L 375 315 L 350 335 L 320 330 Z',
  },
  {
    id: 'siak',
    name: 'Kabupaten Siak',
    shortName: 'Siak',
    type: 'kabupaten',
    labelX: 435,
    labelY: 295,
    path: 'M 385 225 L 430 250 L 480 235 L 525 260 L 535 320 L 485 345 L 420 340 L 365 280 L 325 285 L 350 335 L 365 340 L 375 315 Z',
  },
  {
    id: 'kepulauan-meranti',
    name: 'Kabupaten Kepulauan Meranti',
    shortName: 'Kep. Meranti',
    type: 'kabupaten',
    labelX: 615,
    labelY: 250,
    // Gugusan kepulauan (Tebing Tinggi, Rangsang, Padang)
    path: `
      M 565 230 L 625 210 L 650 240 L 610 265 L 565 255 Z
      M 630 195 L 685 190 L 705 225 L 665 240 Z
      M 535 250 L 575 265 L 560 305 L 520 290 Z
    `,
  },
  {
    id: 'pelalawan',
    name: 'Kabupaten Pelalawan',
    shortName: 'Pelalawan',
    type: 'kabupaten',
    labelX: 475,
    labelY: 395,
    path: 'M 365 340 L 420 340 L 485 345 L 535 320 L 585 345 L 625 400 L 585 450 L 525 450 L 440 435 L 360 410 Z',
  },
  {
    id: 'kuantan-singingi',
    name: 'Kabupaten Kuantan Singingi',
    shortName: 'Kuansing',
    type: 'kabupaten',
    labelX: 275,
    labelY: 505,
    path: 'M 240 440 L 310 445 L 360 460 L 375 515 L 350 575 L 285 580 L 220 540 L 195 480 Z',
  },
  {
    id: 'indragiri-hulu',
    name: 'Kabupaten Indragiri Hulu',
    shortName: 'Indragiri Hulu',
    type: 'kabupaten',
    labelX: 435,
    labelY: 515,
    path: 'M 360 460 L 440 435 L 525 450 L 520 520 L 490 580 L 415 585 L 375 515 Z',
  },
  {
    id: 'indragiri-hilir',
    name: 'Kabupaten Indragiri Hilir',
    shortName: 'Indragiri Hilir',
    type: 'kabupaten',
    labelX: 630,
    labelY: 540,
    path: 'M 525 450 L 585 450 L 625 400 L 690 430 L 755 490 L 760 575 L 710 635 L 610 645 L 540 620 L 490 580 L 520 520 Z',
  },
];

export default function RiauMap({ selectedRegionId, onSelectRegion }) {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [filterType, setFilterType] = useState('all'); // 'all' | 'kabupaten' | 'kota'
  const svgRef = useRef(null);

  const handleZoom = (delta) => {
    setZoomLevel((prev) => {
      const next = prev + delta;
      if (next < 0.85) return 0.85;
      if (next > 2.2) return 2.2;
      return Number(next.toFixed(2));
    });
  };

  const handleReset = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const filteredRegions = RIAU_MAP_REGIONS.filter((r) => {
    if (filterType === 'all') return true;
    return r.type === filterType;
  });

  return (
    <div className="riau-map-card">
      {/* Kontrol Atas Peta: Filter Kabupaten/Kota & Tombol Zoom */}
      <div className="riau-map-controls">
        <div className="riau-map-filter-group" role="tablist" aria-label="Filter jenis wilayah">
          <button
            type="button"
            className={`riau-map-filter-btn ${filterType === 'all' ? 'is-active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            Semua Wilayah (12)
          </button>
          <button
            type="button"
            className={`riau-map-filter-btn ${filterType === 'kabupaten' ? 'is-active' : ''}`}
            onClick={() => setFilterType('kabupaten')}
          >
            10 Kabupaten
          </button>
          <button
            type="button"
            className={`riau-map-filter-btn ${filterType === 'kota' ? 'is-active' : ''}`}
            onClick={() => setFilterType('kota')}
          >
            2 Kota
          </button>
        </div>

        <div className="riau-map-zoom-group">
          <button
            type="button"
            className="riau-zoom-btn"
            onClick={() => handleZoom(0.2)}
            title="Perbesar Peta (+)"
            aria-label="Perbesar peta"
          >
            <Icon name="plus" size={16} />
          </button>
          <button
            type="button"
            className="riau-zoom-btn"
            onClick={() => handleZoom(-0.2)}
            title="Perkecil Peta (-)"
            aria-label="Perkecil peta"
          >
            <Icon name="minus" size={16} />
          </button>
          <button
            type="button"
            className="riau-zoom-btn riau-zoom-reset"
            onClick={handleReset}
            title="Reset Ukuran Peta"
            aria-label="Reset ukuran peta"
          >
            <Icon name="maximize" size={14} />
          </button>
        </div>
      </div>

      {/* SVG Canvas Peta Interaktif */}
      <div className="riau-map-viewport">
        <svg
          ref={svgRef}
          viewBox="0 0 860 670"
          className="riau-svg-canvas"
          role="img"
          aria-label="Peta Interaktif Batas Wilayah Kabupaten dan Kota Provinsi Riau"
          style={{
            transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
            transformOrigin: 'center center',
            transition: 'transform 0.22s ease-out',
          }}
        >
          <defs>
            {/* Filter Bayangan Halus untuk Wilayah Terpilih */}
            <filter id="riauActiveGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#B8202D" floodOpacity="0.35" />
            </filter>
            <filter id="riauHoverGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#1E293B" floodOpacity="0.18" />
            </filter>

            {/* Pola Perairan Selat Malaka */}
            <pattern id="seaWater" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 0 12 Q 6 8 12 12 T 24 12" fill="none" stroke="#E2E8F0" strokeWidth="0.8" />
            </pattern>
          </defs>

          {/* Latar Belakang Perairan / Selat Malaka */}
          <rect x="0" y="0" width="860" height="670" fill="#F8FAFC" />
          <rect x="420" y="0" width="440" height="350" fill="url(#seaWater)" opacity="0.6" />

          {/* Teks Label Laut / Selat Malaka */}
          <text x="640" y="100" className="riau-map-sea-label">SELAT MALAKA</text>
          <text x="730" y="380" className="riau-map-sea-label">LAUT NATUNA / RIAU TIMUR</text>

          {/* Batas Provinsi Tetangga (Sumut, Sumbar, Jambi) */}
          <g className="riau-map-neighbor-labels" opacity="0.65">
            <text x="45" y="100" className="riau-map-neighbor-text">← PROV. SUMATERA UTARA</text>
            <text x="35" y="420" className="riau-map-neighbor-text">← PROV. SUMATERA BARAT</text>
            <text x="350" y="650" className="riau-map-neighbor-text">↓ PROVINSI JAMBI</text>
          </g>

          {/* Path Seluruh Wilayah Kabupaten & Kota */}
          <g className="riau-map-regions-group">
            {RIAU_MAP_REGIONS.map((region) => {
              const isSelected = selectedRegionId === region.id;
              const isHovered = hoveredRegion?.id === region.id;
              const isDimmed = filterType !== 'all' && region.type !== filterType;

              return (
                <path
                  key={region.id}
                  id={`map-path-${region.id}`}
                  d={region.path}
                  className={`riau-region-path ${isSelected ? 'is-selected' : ''} ${isHovered ? 'is-hovered' : ''} ${isDimmed ? 'is-dimmed' : ''}`}
                  onClick={() => onSelectRegion(region.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                      e.preventDefault();
                      onSelectRegion(region.id);
                    }
                  }}
                  onFocus={() => setHoveredRegion(region)}
                  onBlur={() => setHoveredRegion(null)}
                  onMouseEnter={() => setHoveredRegion(region)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${region.name} (${region.type === 'kota' ? 'Kota' : 'Kabupaten'})`}
                  filter={isSelected ? 'url(#riauActiveGlow)' : isHovered ? 'url(#riauHoverGlow)' : 'none'}
                />
              );
            })}
          </g>

          {/* Pin & Label Titik Pusat Wilayah */}
          <g className="riau-map-labels-group" pointerEvents="none">
            {filteredRegions.map((region) => {
              const isSelected = selectedRegionId === region.id;
              const isKota = region.type === 'kota';

              return (
                <g key={`label-${region.id}`} transform={`translate(${region.labelX}, ${region.labelY})`}>
                  {/* Pin Circle */}
                  <circle
                    cx="0"
                    cy="0"
                    r={isSelected ? 6 : isKota ? 5 : 4}
                    className={`riau-map-pin-circle ${isSelected ? 'is-selected' : ''} ${isKota ? 'is-kota' : ''}`}
                  />

                  {/* Ring Denyut pada Wilayah Terpilih */}
                  {isSelected && (
                    <circle cx="0" cy="0" r="10" className="riau-map-pin-pulse" />
                  )}

                  {/* Label Nama Wilayah */}
                  <text
                    x="0"
                    y={isKota ? -10 : 15}
                    className={`riau-map-label-text ${isSelected ? 'is-selected' : ''} ${isKota ? 'is-kota' : ''}`}
                  >
                    {region.shortName}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Floating Tooltip Saat Cursor Berada di Atas Wilayah */}
        {hoveredRegion && (
          <div className="riau-map-tooltip" role="tooltip">
            <span className="riau-map-tooltip-type">
              {hoveredRegion.type === 'kota' ? 'Daerah Otonom Kota' : 'Pemerintah Kabupaten'}
            </span>
            <strong className="riau-map-tooltip-name">{hoveredRegion.name}</strong>
            <span className="riau-map-tooltip-cta">Klik untuk melihat profil wilayah</span>
          </div>
        )}
      </div>

      {/* Legend & Petunjuk Bawah Peta */}
      <div className="riau-map-footer">
        <div className="riau-map-legend">
          <div className="riau-legend-item">
            <span className="riau-legend-color is-active" />
            <span>Wilayah Terpilih (IFPI Red)</span>
          </div>
          <div className="riau-legend-item">
            <span className="riau-legend-color is-kota" />
            <span>Kota Otonom (2)</span>
          </div>
          <div className="riau-legend-item">
            <span className="riau-legend-color is-kab" />
            <span>Kabupaten (10)</span>
          </div>
        </div>
        <div className="riau-map-hint">
          <Icon name="info" size={14} color="#64748B" />
          <span>Arahkan atau klik salah satu wilayah untuk meninjau status kepengurusan.</span>
        </div>
      </div>
    </div>
  );
}

