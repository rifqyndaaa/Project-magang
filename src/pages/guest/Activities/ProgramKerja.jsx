import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Icon from '../../../components/Icon';
import PageHeader from '../../../components/PageHeader';
import { PROGRAM_KERJA_DATA } from '../../../data/activitiesData';
import './Activities.css';

const DIVISI_FILTERS = [
  { id: 'all', label: 'Semua Divisi' },
  { id: 'div-1', label: 'Divisi I (Hukum)' },
  { id: 'div-2', label: 'Divisi II (Kesejahteraan)' },
  { id: 'div-3', label: 'Divisi III (Humas)' },
  { id: 'div-4', label: 'Divisi IV (Profesi)' },
  { id: 'div-5', label: 'Divisi V (Diklat)' }
];

export default function ProgramKerja() {
  const [selectedDivisi, setSelectedDivisi] = useState('all');

  const filteredPrograms = selectedDivisi === 'all'
    ? PROGRAM_KERJA_DATA
    : PROGRAM_KERJA_DATA.filter((p) => p.divisiKode === selectedDivisi);

  return (
    <div className="act-page">
      <div className="gov-container">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Beranda', to: '/' },
            { label: 'Kegiatan', to: '/kegiatan' },
            { label: 'Program Kerja' }
          ]}
        />

        {/* Header Halaman */}
        <PageHeader
          eyebrow="Rencana Strategis Organisasi"
          title={<>Program Kerja <em>DPW IFPI Riau</em></>}
          lede="Rencana program strategis dan agenda kerja kepengurusan Ikatan Fungsional Pengadaan Indonesia Provinsi Riau masa bakti 2027–2032."
          meta={[
            { label: 'Divisi Pelaksana', value: '5 Divisi' },
            { label: 'Masa Bakti', value: '2027–2032' },
          ]}
        />

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

        {/* Filter Divisi */}
        <div className="act-filter-bar" role="toolbar" aria-label="Filter berdasarkan divisi">
          {DIVISI_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`act-filter-btn ${selectedDivisi === f.id ? 'is-active' : ''}`}
              onClick={() => setSelectedDivisi(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Daftar Kartu Program Kerja */}
        {filteredPrograms.length > 0 ? (
          <div className="act-prog-grid">
            {filteredPrograms.map((prog) => (
              <article key={prog.id} className="act-prog-card">
                <div className="act-prog-header">
                  <span className="act-prog-divisi">{prog.divisi}</span>
                  <span className={`act-prog-status status-${prog.status.toLowerCase()}`}>
                    {prog.status}
                  </span>
                </div>

                <h2 className="act-prog-title">{prog.nama}</h2>
                <p className="act-prog-desc">{prog.deskripsi}</p>

                {prog.tujuan && prog.tujuan.length > 0 && (
                  <div className="act-prog-tujuan-box">
                    <h3 className="act-prog-tujuan-title">
                      <Icon name="check-circle" size={13} color="var(--ifpi-red, #B8202D)" />
                      Tujuan Kegiatan:
                    </h3>
                    <ul className="act-prog-tujuan-list">
                      {prog.tujuan.map((t, idx) => (
                        <li key={idx}>{t}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="act-prog-footer">
                  <Icon name="clock" size={13} />
                  <span>Periode: <strong>{prog.periode}</strong></span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="act-empty-state">
            <div className="act-empty-icon">
              <Icon name="folder" size={28} />
            </div>
            <h2 className="act-empty-title">Belum Ada Program Kerja Terdaftar</h2>
            <p className="act-empty-desc">
              Data program kerja resmi untuk divisi yang dipilih sedang dalam tahap penyusunan dan kurasi oleh tim sekretariat DPW IFPI Riau.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

