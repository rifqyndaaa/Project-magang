import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Icon from '../../../components/Icon';
import { AGENDA_DATA } from '../../../data/activitiesData';
import './Activities.css';

const STATUS_FILTERS = [
  { id: 'all', label: 'Semua Agenda' },
  { id: 'Akan Datang', label: 'Akan Datang' },
  { id: 'Sedang Berlangsung', label: 'Sedang Berlangsung' },
  { id: 'Selesai', label: 'Telah Terlaksana' }
];

export default function Agenda() {
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredAgenda = selectedStatus === 'all'
    ? AGENDA_DATA
    : AGENDA_DATA.filter((a) => a.status === selectedStatus);

  return (
    <div className="act-page">
      <div className="gov-container">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Beranda', to: '/' },
            { label: 'Kegiatan', to: '/kegiatan' },
            { label: 'Agenda Kegiatan' }
          ]}
        />

        {/* Header Halaman */}
        <header className="act-header">
          <div className="act-badge">
            <Icon name="calendar" size={14} />
            <span>Jadwal &amp; Forum Resmi</span>
          </div>

          <h1 className="act-title">
            Agenda Kegiatan <span className="act-title-accent">IFPI Riau</span>
          </h1>

          <p className="act-desc">
            Jadwal kegiatan rapat kerja, bimbingan teknis, forum koordinasi, dan seminar pengadaan barang/jasa di lingkungan Provinsi Riau.
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

        {/* Filter Status Agenda */}
        <div className="act-filter-bar" role="toolbar" aria-label="Filter berdasarkan status agenda">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`act-filter-btn ${selectedStatus === f.id ? 'is-active' : ''}`}
              onClick={() => setSelectedStatus(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Daftar Agenda */}
        {filteredAgenda.length > 0 ? (
          <div className="act-agenda-list">
            {filteredAgenda.map((item) => {
              // Parse date parts for display
              const parts = item.tanggal.split(' ');
              const dayNum = parts[0] || '01';
              const monthYear = parts.slice(1).join(' ') || '';

              return (
                <article key={item.id} className="act-agenda-card">
                  {/* Blok Tanggal */}
                  <div className="act-agenda-date-box" aria-hidden="true">
                    <span className="act-agenda-day">{item.hari}</span>
                    <span className="act-agenda-num">{dayNum}</span>
                    <span className="act-agenda-month">{monthYear}</span>
                  </div>

                  {/* Isi Konten Agenda */}
                  <div className="act-agenda-content">
                    <div className="act-agenda-top-meta">
                      <span className="act-agenda-badge-cat">{item.kategori}</span>
                      <span className="act-agenda-status">{item.status}</span>
                    </div>

                    <h2 className="act-agenda-title">{item.nama}</h2>

                    <div className="act-agenda-details">
                      <div className="act-agenda-detail-item">
                        <Icon name="clock" size={14} className="act-agenda-detail-icon" />
                        <span><strong>Waktu:</strong> {item.waktu}</span>
                      </div>

                      <div className="act-agenda-detail-item">
                        <Icon name="map-pin" size={14} className="act-agenda-detail-icon" />
                        <span><strong>Lokasi:</strong> {item.lokasi}</span>
                      </div>

                      {item.penyelenggara && (
                        <div className="act-agenda-detail-item">
                          <Icon name="users" size={14} className="act-agenda-detail-icon" />
                          <span><strong>Penyelenggara:</strong> {item.penyelenggara}</span>
                        </div>
                      )}
                    </div>

                    <p className="act-agenda-desc">{item.deskripsi}</p>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="act-empty-state">
            <div className="act-empty-icon">
              <Icon name="calendar" size={28} />
            </div>
            <h2 className="act-empty-title">Tidak Ada Agenda Pada Kategori Ini</h2>
            <p className="act-empty-desc">
              Jadwal kegiatan resmi akan diperbarui secara berkala setelah penetapan jadwal rapat koordinasi oleh pimpinan DPW IFPI Riau.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

