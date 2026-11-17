import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RiauMap from '../../../components/RiauMap';
import Icon from "../../../components/Icon";
import Breadcrumbs from "../../../components/Breadcrumbs";
import PageHeader from "../../../components/PageHeader";
import {
  RIAU_REGIONS_DATA,
  TOTAL_JF_RIAU,
  getRegionById,
} from '../../../data/regionsData';
import './Regions.css';

export default function RegionsPage() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      const reg = getRegionById(hashId);
      if (reg) return reg.id;
    }
    return 'pekanbaru';
  });

  const selectedRegion = getRegionById(selectedId) || RIAU_REGIONS_DATA[0];

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
            { label: 'Total JF Se-Riau', value: `${TOTAL_JF_RIAU.totalJf} Personel` },
          ]}
        />

        {/* Area Utama: Peta Interaktif */}
        <div className="regions-map-col" style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
          <RiauMap
            selectedRegionId={selectedRegion.id}
            onSelectRegion={handleSelectRegion}
          />
          <div className="regions-map-hint-bar">
            <Icon name="info" size={14} color="#64748B" />
            <span>
              Klik salah satu wilayah pada peta untuk membuka halaman rincian nominatif personel JF &amp; kepengurusan DPC <strong>{selectedRegion.name}</strong>.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
