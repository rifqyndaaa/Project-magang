import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
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
  const [selectedId, setSelectedId] = useState('pekanbaru');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedRegion = getRegionById(selectedId) || RIAU_REGIONS_DATA[0];

  // Hitung persentase keanggotaan wilayah terpilih
  const selectedRatioLetter = selectedRegion.jfCount
    ? Math.round(((selectedRegion.membersByLetter || 0) / selectedRegion.jfCount) * 100)
    : 0;

  // Filter baris rekapitulasi berdasarkan pencarian
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

  const handleSelectRegion = (id) => {
    setSelectedId(id);
    const panelEl = document.getElementById('selected-region-heading');
    if (panelEl) {
      panelEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
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
          lede="Jelajahi kabupaten dan kota di Provinsi Riau untuk melihat sebaran geografis, kepengurusan DPC, serta data rekonsiliasi Jabatan Fungsional (JF) pengadaan barang/jasa."
          meta={[
            { label: 'Kabupaten', value: '10 Wilayah' },
            { label: 'Kota', value: '2 Wilayah' },
            { label: 'Total JF Se-Riau', value: `${TOTAL_JF_RIAU.totalJf} Personel` },
          ]}
        />

        {/* Quick Pills Selector: Akses Cepat Kabupaten & Kota + Pemprov Riau */}
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
          <button
            type="button"
            className={`regions-pill-btn ${selectedRegion.id === 'prov-riau' ? 'is-active' : ''}`}
            onClick={() => setSelectedId('prov-riau')}
            aria-pressed={selectedRegion.id === 'prov-riau'}
            style={{ borderColor: 'rgba(184, 32, 45, 0.4)', fontWeight: 700 }}
          >
            Prov. Riau
          </button>
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
                  {selectedRegion.type === 'kota'
                    ? 'Daerah Otonom Kota'
                    : selectedRegion.type === 'provinsi'
                    ? 'Pemerintah Provinsi'
                    : 'Pemerintah Kabupaten'}
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
                {/* 1. BLOK STATISTIK PERSONEL & KEANGGOTAAN IFPI (DATA GAMBAR 1 & 2) */}
                <div className="region-panel-membership">
                  <div className="region-membership-header">
                    <div className="region-membership-title-wrap">
                      <Icon name="users" size={16} color="var(--ifpi-red)" />
                      <h3 className="region-membership-title">Statistik Personel &amp; IFPI</h3>
                    </div>
                    <span className="region-membership-ratio-pill">
                      {selectedRatioLetter}% Terdaftar
                    </span>
                  </div>

                  <div className="region-membership-grid">
                    <div className="region-membership-item">
                      <span className="region-membership-val">{selectedRegion.jfCount || 0}</span>
                      <span className="region-membership-lbl">Total JF PBJ</span>
                    </div>
                    <div className="region-membership-item highlight">
                      <span className="region-membership-val">{selectedRegion.membersByLetter || 0}</span>
                      <span className="region-membership-lbl">Surat Masuk</span>
                    </div>
                    <div className="region-membership-item">
                      <span className="region-membership-val">{selectedRegion.membersBySystem || 0}</span>
                      <span className="region-membership-lbl">By Sistem</span>
                    </div>
                    <div className="region-membership-item">
                      <span className="region-membership-val">{selectedRegion.notYetMembers || 0}</span>
                      <span className="region-membership-lbl">Belum Anggota</span>
                    </div>
                  </div>

                  {/* Progress Bar Rasio Keanggotaan */}
                  <div className="region-membership-bar-wrap">
                    <div className="region-membership-bar-bg">
                      <div
                        className="region-membership-bar-fill"
                        style={{ width: `${Math.min(100, selectedRatioLetter)}%` }}
                      />
                    </div>
                    <div className="region-membership-bar-legend">
                      <span>Rasio Terdaftar (Surat Masuk)</span>
                      <span><strong>{selectedRegion.membersByLetter || 0}</strong> dari {selectedRegion.jfCount || 0} JF</span>
                    </div>
                  </div>
                </div>

                {/* 2. Ringkasan Statistik Geografis */}
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

                {/* Tombol Aksi Menuju Struktur Organisasi Wilayah (jika bukan prov-riau) */}
                {selectedRegion.id !== 'prov-riau' ? (
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
                ) : (
                  <div className="region-panel-actions">
                    <Link
                      to="/struktur-organisasi"
                      className="region-btn-structure"
                      aria-label="Lihat Struktur Dewan Pengurus Wilayah IFPI Riau"
                    >
                      <span>Lihat Struktur DPW Riau</span>
                      <Icon name="arrow-right" size={16} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>

        {/* 3. TABEL REKAPITULASI LENGKAP SE-PROVINSI RIAU (KOMPARASI GAMBAR 1 & 3) */}
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
                            onClick={() => handleSelectRegion(item.id)}
                            title={`Lihat detail ${item.name} di panel atas`}
                          >
                            <Icon name="check" size={12} />
                            <span>{isSelected ? 'Terpilih' : 'Pilih'}</span>
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
