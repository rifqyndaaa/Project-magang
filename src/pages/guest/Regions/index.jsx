import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import RiauMap from '../../../components/RiauMap';
import Icon from "../../../components/Icon";
import Breadcrumbs from "../../../components/Breadcrumbs";
import PageHeader from "../../../components/PageHeader";
import {
  RIAU_REGIONS_DATA,
  REKAPITULASI_JF_RIAU,
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
  const [searchQuery, setSearchQuery] = useState('');

  const selectedRegion = getRegionById(selectedId) || RIAU_REGIONS_DATA[0];

  const filteredRecap = useMemo(() => {
    if (!searchQuery.trim()) return REKAPITULASI_JF_RIAU;
    const q = searchQuery.toLowerCase().trim();
    return REKAPITULASI_JF_RIAU.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.shortName.toLowerCase().includes(q) ||
        (r.capital && r.capital.toLowerCase().includes(q))
    );
  }, [searchQuery]);

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
          eyebrow="Peta Geografis & Rekapitulasi Data"
          title={<>Wilayah Kepengurusan <em>IFPI Provinsi Riau</em></>}
          lede="Jelajahi kabupaten dan kota di Provinsi Riau. Klik wilayah pada peta untuk melihat daftar personel JF pengadaan barang/jasa dan data kepengurusan DPC setempat."
          meta={[
            { label: 'Kabupaten', value: '10 Wilayah' },
            { label: 'Kota', value: '2 Wilayah' },
            { label: 'Total JF Se-Riau', value: `${TOTAL_JF_RIAU.totalJf} Personel` },
          ]}
        />

        {/* Quick Pills Selector: Akses Cepat Kabupaten & Kota + Pemprov Riau */}
        <div className="regions-pills-bar" role="toolbar" aria-label="Pilih Kabupaten atau Kota">
          {RIAU_REGIONS_DATA.map((r) => (
            <button
              key={r.id}
              type="button"
              className={`regions-pill-btn ${selectedRegion.id === r.id ? 'is-active' : ''}`}
              onClick={() => navigate(`/wilayah/${r.id}`)}
              aria-pressed={selectedRegion.id === r.id}
            >
              {r.shortName}
            </button>
          ))}
          <button
            type="button"
            className={`regions-pill-btn ${selectedRegion.id === 'prov-riau' ? 'is-active' : ''}`}
            onClick={() => navigate('/wilayah/prov-riau')}
            aria-pressed={selectedRegion.id === 'prov-riau'}
            style={{ borderColor: 'rgba(184, 32, 45, 0.4)', fontWeight: 700 }}
          >
            Prov. Riau
          </button>
        </div>

        {/* Area Utama: Peta Interaktif */}
        <div className="regions-map-col" style={{ marginTop: '1.5rem' }}>
          <RiauMap
            selectedRegionId={selectedRegion.id}
            onSelectRegion={handleSelectRegion}
          />
          <div className="regions-map-hint-bar">
            <Icon name="info" size={14} color="#64748B" />
            <span>
              Klik salah satu wilayah pada peta untuk membuka halaman data personel JF &amp; kepengurusan DPC <strong>{selectedRegion.name}</strong>.
            </span>
          </div>
        </div>

        {/* TABEL REKAPITULASI LENGKAP SE-PROVINSI RIAU */}
        <section className="regions-recap-section" id="rekapitulasi-keanggotaan" aria-labelledby="rekap-heading">
          <div className="regions-recap-head">
            <div>
              <span className="regions-recap-eyebrow">Rekonsiliasi Data Organisasi</span>
              <h2 id="rekap-heading" className="regions-recap-title">
                Rekapitulasi Personel JF &amp; Keanggotaan IFPI Se-Riau
              </h2>
              <p className="regions-recap-desc">
                Data komparasi resmi antara total populasi Jabatan Fungsional Pengadaan Barang/Jasa (JF PBJ),
                anggota berdasarkan surat masuk fisik/SK, dan anggota yang telah terdaftar pada sistem portal.
              </p>
            </div>
          </div>

          {/* KPI Ribbon Ringkasan Provinsi */}
          <div className="regions-recap-kpis">
            <div className="regions-kpi-tile">
              <span className="regions-kpi-num">{TOTAL_JF_RIAU.totalJf}</span>
              <span className="regions-kpi-label">Total Personel JF PBJ</span>
              <span className="regions-kpi-sub">Populasi 12 Kab/Kota &amp; Pemprov</span>
            </div>
            <div className="regions-kpi-tile accent">
              <span className="regions-kpi-num">{TOTAL_JF_RIAU.totalMembersByLetter}</span>
              <span className="regions-kpi-label">Anggota (Surat Masuk)</span>
              <span className="regions-kpi-sub">{TOTAL_JF_RIAU.percentageByLetter} dari total populasi JF</span>
            </div>
            <div className="regions-kpi-tile">
              <span className="regions-kpi-num">{TOTAL_JF_RIAU.totalMembersBySystem}</span>
              <span className="regions-kpi-label">Terdaftar By Sistem</span>
              <span className="regions-kpi-sub">{TOTAL_JF_RIAU.percentageBySystem} akun aktif terverifikasi</span>
            </div>
            <div className="regions-kpi-tile">
              <span className="regions-kpi-num">{TOTAL_JF_RIAU.totalNotYetMembers}</span>
              <span className="regions-kpi-label">Belum Jadi Anggota</span>
              <span className="regions-kpi-sub">Potensi keanggotaan baru</span>
            </div>
          </div>

          {/* Toolbar Pencarian */}
          <div className="regions-recap-toolbar">
            <div className="regions-recap-search">
              <span className="regions-recap-search-icon">
                <Icon name="search" size={16} />
              </span>
              <input
                type="text"
                className="regions-recap-search-input"
                placeholder="Cari wilayah atau instansi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Cari wilayah pada tabel rekapitulasi"
              />
            </div>
            <span className="regions-recap-count">
              Menampilkan {filteredRecap.length} dari {REKAPITULASI_JF_RIAU.length} entitas
            </span>
          </div>

          {/* Tabel Data Rekapitulasi */}
          <div className="regions-table-card">
            <div className="regions-table-scroll">
              <table className="regions-recap-table">
                <thead>
                  <tr>
                    <th style={{ width: '48px', textAlign: 'center' }}>No</th>
                    <th>Nama Wilayah / Instansi</th>
                    <th>Jenis</th>
                    <th className="num">Total JF</th>
                    <th className="num" style={{ color: '#8F1723' }}>Surat Masuk</th>
                    <th className="num">By Sistem</th>
                    <th className="num">Belum Anggota</th>
                    <th className="num">Rasio Terdaftar</th>
                    <th style={{ textAlign: 'center' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecap.map((item, index) => {
                    const isSelected = item.id === selectedRegion.id;
                    const ratio = item.jfCount
                      ? Math.round(((item.membersByLetter || 0) / item.jfCount) * 100)
                      : 0;

                    return (
                      <tr key={item.id} className={isSelected ? 'is-selected' : ''}>
                        <td style={{ textAlign: 'center', color: '#64748B' }}>{index + 1}</td>
                        <td>
                          <strong>{item.name}</strong>
                          {item.capital && (
                            <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B' }}>
                              Ibu Kota: {item.capital}
                            </span>
                          )}
                        </td>
                        <td>
                          <span className={`regions-tag-type ${item.type}`}>
                            {item.type === 'kota' ? 'Kota' : item.type === 'provinsi' ? 'Provinsi' : 'Kabupaten'}
                          </span>
                        </td>
                        <td className="num"><strong>{item.jfCount}</strong></td>
                        <td className="num" style={{ color: '#B8202D', fontWeight: 700 }}>
                          {item.membersByLetter}
                        </td>
                        <td className="num">{item.membersBySystem}</td>
                        <td className="num" style={{ color: '#64748B' }}>{item.notYetMembers}</td>
                        <td className="num">
                          <span className="region-membership-ratio-pill">{ratio}%</span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            type="button"
                            className="regions-btn-select"
                            onClick={() => navigate(`/wilayah/${item.id}`)}
                            title={`Lihat data personel ${item.name}`}
                          >
                            <Icon name="arrow-right" size={12} />
                            <span>Detail</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                  {/* Baris Total Akumulasi Se-Provinsi Riau */}
                  {!searchQuery && (
                    <tr className="total-row">
                      <td colSpan={3} style={{ textAlign: 'left' }}>
                        JUMLAH / AKUMULASI SE-PROVINSI RIAU
                      </td>
                      <td className="num">{TOTAL_JF_RIAU.totalJf}</td>
                      <td className="num" style={{ color: '#B8202D' }}>{TOTAL_JF_RIAU.totalMembersByLetter}</td>
                      <td className="num">{TOTAL_JF_RIAU.totalMembersBySystem}</td>
                      <td className="num">{TOTAL_JF_RIAU.totalNotYetMembers}</td>
                      <td className="num">
                        <span className="region-membership-ratio-pill">{TOTAL_JF_RIAU.percentageByLetter}</span>
                      </td>
                      <td style={{ textAlign: 'center', color: '#64748B', fontSize: '0.75rem' }}>
                        13 Entitas
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
