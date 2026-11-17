import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Icon from '../../../components/Icon';
import PageHeader from '../../../components/PageHeader';
import {
  PROGRAM_KERJA_DATA,
  PROGRAM_UNGGULAN,
  RENCANA_TAHUNAN,
  TARGET_KPI
} from '../../../data/activitiesData';
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
          lede="Rencana program strategis dan agenda kerja kepengurusan Ikatan Fungsional Pengadaan Indonesia Provinsi Riau masa bakti 2027–2032 guna mendukung tata kelola pengadaan yang transparan, akuntabel, dan bernilai tambah."
          meta={[
            { label: 'Periode Kepengurusan', value: '2027–2032' },
            { label: 'Divisi Pelaksana', value: '5 Divisi Kerja' },
            { label: 'Status Dokumen', value: 'Resmi Disahkan' }
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

        {/* ============================================================
            SECTION 1: 5 PROGRAM UNGGULAN ASOSIASI
            ============================================================ */}
        <section className="prog-section" aria-labelledby="unggulan-heading">
          <div className="prog-section-header">
            <span className="prog-section-badge">Prioritas Strategis</span>
            <h2 id="unggulan-heading" className="prog-section-title">
              5 Program Unggulan Asosiasi
            </h2>
            <p className="prog-section-desc">
              Inisiatif utama yang menjadi identitas tersendiri bagi DPW IFPI Riau dalam memajukan kompetensi dan integritas pengadaan di Bumi Lancang Kuning.
            </p>
          </div>

          <div className="prog-unggulan-grid">
            {PROGRAM_UNGGULAN.map((item) => (
              <div key={item.id} className="prog-unggulan-card">
                <span className="prog-unggulan-num">0{item.id}</span>
                <h3 className="prog-unggulan-title">{item.nama}</h3>
                <p className="prog-unggulan-desc">{item.ringkasan}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            SECTION 2: PROGRAM KERJA UTAMA PER DIVISI
            ============================================================ */}
        <section className="prog-section" aria-labelledby="divisi-heading">
          <div className="prog-section-header">
            <span className="prog-section-badge">Pelaksanaan Bidang</span>
            <h2 id="divisi-heading" className="prog-section-title">
              Rincian Program Kerja 5 Divisi
            </h2>
            <p className="prog-section-desc">
              Rencana aksi konkret, output yang terukur, dan penanggung jawab program kerja pada masing-masing divisi organisasi.
            </p>
          </div>

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

          {/* List Divisi dengan Tabel Kegiatan & Output */}
          <div className="prog-divisi-list">
            {filteredPrograms.map((prog) => (
              <article key={prog.id} className="prog-divisi-card">
                <div className="prog-divisi-card-header">
                  <div>
                    <span className="prog-divisi-pill">{prog.divisi}</span>
                    <h3 className="prog-divisi-nama">{prog.nama}</h3>
                  </div>
                  <div className="prog-divisi-meta">
                    <span className="prog-divisi-ketua-label">Ketua Divisi:</span>
                    <strong className="prog-divisi-ketua-val">{prog.ketuaDivisi}</strong>
                  </div>
                </div>

                <p className="prog-divisi-desc">{prog.deskripsi}</p>

                {/* Tabel Program Kegiatan & Output */}
                <div className="prog-table-wrap">
                  <table className="prog-table">
                    <thead>
                      <tr>
                        <th style={{ width: '60px' }}>No.</th>
                        <th>Program Kegiatan</th>
                        <th>Target Output</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prog.kegiatan.map((k) => (
                        <tr key={k.no}>
                          <td className="prog-td-no">{k.no}</td>
                          <td className="prog-td-nama">{k.nama}</td>
                          <td className="prog-td-output">{k.output}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* KPI Khusus jika ada (Divisi Humas & Diklat) */}
                {prog.kpi && (
                  <div className="prog-kpi-box">
                    <h4 className="prog-kpi-title">
                      <Icon name="check-circle" size={15} color="var(--ifpi-red)" />
                      Indikator Kinerja Utama (KPI) Divisi:
                    </h4>
                    <ul className="prog-kpi-list">
                      {prog.kpi.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* ============================================================
            SECTION 3: RENCANA PELAKSANAAN TAHUNAN & TARGET KPI
            ============================================================ */}
        <div className="prog-dual-grid">
          {/* Jadwal Tahunan */}
          <section className="prog-section" aria-labelledby="tahunan-heading">
            <div className="prog-section-header">
              <span className="prog-section-badge">Jadwal Tahunan</span>
              <h2 id="tahunan-heading" className="prog-section-title">
                Rencana Pelaksanaan Tahunan
              </h2>
            </div>
            <div className="prog-table-wrap">
              <table className="prog-table">
                <thead>
                  <tr>
                    <th style={{ width: '130px' }}>Bulan</th>
                    <th>Kegiatan Rencana Kerja</th>
                  </tr>
                </thead>
                <tbody>
                  {RENCANA_TAHUNAN.map((item, idx) => (
                    <tr key={idx}>
                      <td className="prog-td-bulan"><strong>{item.bulan}</strong></td>
                      <td>{item.kegiatan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Indikator Keberhasilan KPI */}
          <section className="prog-section" aria-labelledby="kpi-heading">
            <div className="prog-section-header">
              <span className="prog-section-badge">Indikator Kinerja</span>
              <h2 id="kpi-heading" className="prog-section-title">
                Target Keberhasilan Organisasi
              </h2>
            </div>
            <div className="prog-table-wrap">
              <table className="prog-table">
                <thead>
                  <tr>
                    <th>Indikator Capaian</th>
                    <th style={{ width: '160px' }}>Target Tahunan</th>
                  </tr>
                </thead>
                <tbody>
                  {TARGET_KPI.map((item) => (
                    <tr key={item.no}>
                      <td className="prog-td-nama">{item.indikator}</td>
                      <td><span className="prog-badge-target">{item.target}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* ============================================================
            SECTION 4: TANDA PENGESAHAN DOKUMEN RESMI
            ============================================================ */}
        <section className="prog-sign-box" aria-label="Tanda Pengesahan Dokumen">
          <div className="prog-sign-col">
            <span className="prog-sign-label">Diketahui Oleh:</span>
            <strong className="prog-sign-name">FERI SAPUTRA, SE., M.Si</strong>
            <span className="prog-sign-role">Ketua DPW IFPI Riau Periode 2027–2032</span>
          </div>
          <div className="prog-sign-col prog-sign-col--right">
            <span className="prog-sign-label">Pekanbaru, 05 November 2026</span>
            <span className="prog-sign-sub">Dibuat oleh:</span>
            <strong className="prog-sign-name">SYAHRIL</strong>
            <span className="prog-sign-role">Sekretaris DPW IFPI Riau</span>
          </div>
        </section>
      </div>
    </div>
  );
}
