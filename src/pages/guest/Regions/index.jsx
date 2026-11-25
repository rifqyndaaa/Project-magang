import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import RiauMap from '../../../components/RiauMap';
import Icon from "../../../components/Icon";
import Breadcrumbs from "../../../components/Breadcrumbs";
import PageHeader from "../../../components/PageHeader";
import RegionRecapTable from './RegionRecapTable';
import {
  RIAU_REGIONS_DATA,
  REKAPITULASI_JF_RIAU,
  PROV_RIAU_DATA,
  getRegionById,
} from '../../../data/regionsData';
import { fetchMemberCounts } from '../../../services/regionDataService';
import './Regions.css';

export default function RegionsPage() {
  const navigate = useNavigate();
  const [dbCounts, setDbCounts] = useState({});
  const [selectedId, setSelectedId] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      const reg = getRegionById(hashId);
      if (reg) return reg.id;
    }
    return 'pekanbaru';
  });

  const selectedRegion = getRegionById(selectedId) || RIAU_REGIONS_DATA[0];

  useEffect(() => {
    let active = true;
    fetchMemberCounts().then(({ counts, error }) => {
      if (active && !error && counts) {
        setDbCounts(counts);
      }
    });
    if (typeof window !== 'undefined' && window.location.hash === '#tabel-rekapitulasi') {
      const el = document.getElementById('tabel-rekapitulasi');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    return () => {
      active = false;
    };
  }, []);

  const totalJf = useMemo(
    () => REKAPITULASI_JF_RIAU.reduce((sum, r) => sum + (dbCounts[r.id] ?? r.jfCount ?? 0), 0),
    [dbCounts]
  );
  const provJf = dbCounts['prov-riau'] ?? PROV_RIAU_DATA.jfCount;

  // Klik wilayah di peta -> buka halaman detail data personel
  const handleSelectRegion = (id) => {
    setSelectedId(id);
    navigate(`/wilayah/${id}`);
  };

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
          eyebrow="Peta Geografis & Sebaran Wilayah"
          title={<>Wilayah Kepengurusan <em>IFPI Provinsi Riau</em></>}
          lede="Jelajahi 10 kabupaten dan 2 kota di Provinsi Riau. Klik wilayah pada peta untuk melihat profil kepengurusan DPC dan daftar lengkap personel JF PBJ di daerah tersebut."
          meta={[
            { label: 'Kabupaten', value: '10 Wilayah' },
            { label: 'Kota', value: '2 Wilayah' },
            { label: 'Pemprov Riau', value: `1 Unit Kerja (${provJf} JF)` },
            { label: 'Total JF Se-Riau', value: `${totalJf} Personel` },
          ]}
        />

        {/* Card Akses Cepat: Pemerintah Provinsi Riau */}
        <div className="regions-prov-banner">
          <div className="regions-prov-banner__info">
            <div className="regions-prov-banner__icon">
              <Icon name="shield" size={24} color="#B8202D" />
            </div>
            <div className="regions-prov-banner__text">
              <div className="regions-prov-banner__tags">
                <span className="regions-prov-tag">Entitas Tingkat Provinsi</span>
                <span className="regions-prov-stat">{provJf} Personel JF PBJ (24 Terdaftar)</span>
              </div>
              <h3 className="regions-prov-banner__title">
                Pemerintah Provinsi Riau <span className="regions-prov-banner__sub">(Biro PBJ Setdaprov &amp; OPD)</span>
              </h3>
              <p className="regions-prov-banner__desc">
                Sekretariat: Gedung Menara Lancang Kuning Lt. 4, Kantor Gubernur Riau, Pekanbaru.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="regions-prov-banner__cta"
            onClick={() => handleSelectRegion('prov-riau')}
          >
            <span>Buka Personel Pemprov</span>
            <Icon name="arrow-right" size={14} color="currentColor" />
          </button>
        </div>

        {/* Area Utama: Peta Interaktif */}
        <div className="regions-map-col" style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
          <RiauMap
            selectedRegionId={selectedRegion.id}
            onSelectRegion={handleSelectRegion}
          />
          <div className="regions-map-hint-bar">
            <Icon name="info" size={14} color="#64748B" />
            <span>
              Klik salah satu wilayah pada peta untuk membuka halaman rincian nominatif personel JF &amp; kepengurusan DPC <strong>{selectedRegion.name}</strong>, atau gulir ke bawah untuk melihat tabel rekapitulasi lengkap.
            </span>
          </div>
        </div>

        {/* Tabel Rekapitulasi Data Model Spreadsheet */}
        <RegionRecapTable />
      </div>
    </div>
  );
}
