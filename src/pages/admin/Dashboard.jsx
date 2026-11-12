import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from "../../components/Icon";
import StatusBadge from "../../components/StatusBadge";
import { CATEGORIES, RIAU_REGIONS, REPORT_STATUSES, getCategoryDetails } from '../../data/categories';
import { getReportStats, filterReports, exportReportsToCSV } from "../../services/storage";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    baru: 0,
    diverifikasi: 0,
    diproses: 0,
    tindakLanjut: 0,
    selesai: 0,
    ditolak: 0,
    dalamProses: 0
  });

  const [filterState, setFilterState] = useState({
    query: '',
    status: '',
    category: '',
    region: ''
  });

  const [reports, setReports] = useState([]);

  const loadData = () => {
    setStats(getReportStats());
    const filtered = filterReports(filterState);
    setReports(filtered);
  };

  useEffect(() => {
    loadData();
  }, [filterState]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterState(prev => ({ ...prev, [name]: value }));
  };

  const handleResetFilter = () => {
    setFilterState({
      query: '',
      status: '',
      category: '',
      region: ''
    });
  };

  const handleExport = () => {
    exportReportsToCSV(reports);
  };

  return (
    <div className="gov-container">
      {/* Header Dashboard */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <span className="gov-section-tag" style={{ color: "var(--ifpi-red)" }}>PANEL KENDALI IFPI</span>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--neutral-900)', margin: '0.15rem 0' }}>
            Rekapitulasi Layanan &amp; Pengaduan IFPI
          </h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--neutral-600)', margin: 0 }}>
            Pengelolaan permohonan konsultasi hukum pengadaan, penanganan aduan profesi, dan koordinasi narasumber resmi IFPI.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={handleExport}
            className="gov-btn gov-btn-outline-neutral gov-btn-sm"
            id="btn-admin-export-csv"
            title="Unduh seluruh data yang tersaring ke berkas spreadsheet CSV"
          >
            <Icon name="download" size={14} />
            <span>Ekspor CSV ({reports.length})</span>
          </button>
          <button
            type="button"
            onClick={loadData}
            className="gov-btn gov-btn-primary gov-btn-sm"
            title="Muat ulang data terbaru"
          >
            <span>Segarkan Data</span>
          </button>
        </div>
      </div>

      {/* Ringkasan Statistik Kartu */}
      <div className="gov-grid gov-grid-4" style={{ marginBottom: "1.75rem" }}>
        <div
          className="gov-card"
          style={{ padding: '1rem', cursor: 'pointer', borderLeft: filterState.status === '' ? '3px solid var(--neutral-800)' : '1px solid var(--neutral-200)' }}
          onClick={() => setFilterState(prev => ({ ...prev, status: '' }))}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--neutral-500)' }}>Total Pengaduan</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--neutral-900)' }}>{stats.total}</div>
          <span style={{ fontSize: '0.7rem', color: 'var(--neutral-400)' }}>Semua kategori & wilayah</span>
        </div>

        <div
          className="gov-card"
          style={{ padding: '1rem', cursor: 'pointer', borderLeft: filterState.status === 'Baru' ? '3px solid #1D4ED8' : '1px solid var(--neutral-200)' }}
          onClick={() => setFilterState(prev => ({ ...prev, status: 'Baru' }))}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1D4ED8' }}>Baru Diterima</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1D4ED8' }}>{stats.baru}</div>
          <span style={{ fontSize: '0.7rem', color: 'var(--neutral-500)' }}>Menunggu verifikasi admin</span>
        </div>

        <div
          className="gov-card"
          style={{ padding: '1rem', cursor: 'pointer', borderLeft: filterState.status === 'Diproses' ? '3px solid #B45309' : '1px solid var(--neutral-200)' }}
          onClick={() => setFilterState(prev => ({ ...prev, status: 'Diproses' }))}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#B45309' }}>Sedang Diproses</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#B45309' }}>{stats.dalamProses}</div>
          <span style={{ fontSize: '0.7rem', color: 'var(--neutral-500)' }}>Verif, Telaah & Tindak Lanjut</span>
        </div>

        <div
          className="gov-card"
          style={{ padding: '1rem', cursor: 'pointer', borderLeft: filterState.status === 'Selesai' ? '3px solid #15803D' : '1px solid var(--neutral-200)' }}
          onClick={() => setFilterState(prev => ({ ...prev, status: 'Selesai' }))}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#15803D' }}>Selesai Ditangani</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#15803D' }}>{stats.selesai}</div>
          <span style={{ fontSize: '0.7rem', color: 'var(--neutral-500)' }}>Diberi tanggapan resmi</span>
        </div>
      </div>

      {/* Panel Filter dan Pencarian */}
      <div className="gov-card" style={{ padding: '1.25rem', marginBottom: "1.5rem" }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Icon name="filter" size={16} color="var(--neutral-600)" />
          <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, margin: 0, color: 'var(--neutral-800)' }}>
            Filter & Pencarian Laporan
          </h2>
        </div>

        <div className="gov-grid gov-grid-4">
          <div className="gov-form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="filter-query" className="gov-label" style={{ fontSize: "0.775rem" }}>
              Cari Teks / Tiket / Pelapor
            </label>
            <input
              type="text"
              id="filter-query"
              name="query"
              className="gov-input"
              placeholder="Nomor tiket, nama, lokasi..."
              value={filterState.query}
              onChange={handleFilterChange}
              style={{ fontSize: '0.8125rem', padding: '0.45rem 0.65rem' }}
            />
          </div>

          <div className="gov-form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="filter-status" className="gov-label" style={{ fontSize: "0.775rem" }}>
              Status Penanganan
            </label>
            <select
              id="filter-status"
              name="status"
              className="gov-select"
              value={filterState.status}
              onChange={handleFilterChange}
              style={{ fontSize: '0.8125rem', padding: '0.45rem 0.65rem' }}
            >
              <option value="">-- Semua Status --</option>
              {REPORT_STATUSES.map(s => (
                <option key={s.id} value={s.id}>{s.id} ({s.label})</option>
              ))}
            </select>
          </div>

          <div className="gov-form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="filter-category" className="gov-label" style={{ fontSize: "0.775rem" }}>
              Kategori Layanan Resmi
            </label>
            <select
              id="filter-category"
              name="category"
              className="gov-select"
              value={filterState.category}
              onChange={handleFilterChange}
              style={{ fontSize: '0.8125rem', padding: '0.45rem 0.65rem' }}
            >
              <option value="">-- Semua Kategori (3 Layanan Utama) --</option>
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="gov-form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="filter-region" className="gov-label" style={{ fontSize: "0.775rem" }}>
              Kabupaten / Kota
            </label>
            <select
              id="filter-region"
              name="region"
              className="gov-select"
              value={filterState.region}
              onChange={handleFilterChange}
              style={{ fontSize: '0.8125rem', padding: '0.45rem 0.65rem' }}
            >
              <option value="">-- Semua Wilayah --</option>
              {RIAU_REGIONS.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        {(filterState.query || filterState.status || filterState.category || filterState.region) && (
          <div style={{ marginTop: '0.875rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--neutral-200)', fontSize: '0.775rem' }}>
            <span style={{ color: 'var(--neutral-600)' }}>
              Menemukan <strong>{reports.length}</strong> pengaduan sesuai kriteria penyaringan.
            </span>
            <button
              type="button"
              onClick={handleResetFilter}
              className="gov-btn gov-btn-outline-neutral gov-btn-sm"
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>

      {/* Tabel Data Laporan */}
      <div className="gov-card" style={{ overflow: "hidden" }}>
        <div className="gov-table-wrapper">
          <table className="gov-table">
            <thead>
              <tr>
                <th>No. Tiket</th>
                <th>Tanggal Masuk</th>
                <th>Status</th>
                <th>Kategori & Layanan</th>
                <th>Judul Permohonan / Aduan</th>
                <th>Pelapor & Kontak</th>
                <th>Tanggapan</th>
                <th style={{ textAlign: 'center' }}>Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => {
                const catObj = getCategoryDetails(report.category);
                return (
                  <tr key={report.id}>
                    <td>
                      <Link
                        to={`/admin/report/${report.id}`}
                        style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--gov-blue)' }}
                      >
                        {report.ticketNumber}
                      </Link>
                    </td>
                    <td style={{ fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
                      {new Date(report.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}<br />
                      <span style={{ fontSize: '0.7rem', color: 'var(--neutral-400)' }}>
                        {new Date(report.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={report.status} size="sm" />
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--neutral-800)' }}>
                        {catObj ? catObj.shortName || catObj.name : report.category}
                        {catObj?.isLegacy && (
                          <span style={{ fontSize: '0.65rem', marginLeft: '0.35rem', padding: '0.1rem 0.35rem', backgroundColor: '#F1F5F9', color: '#64748B', borderRadius: '4px', border: '1px solid #CBD5E1' }}>
                            Arsip
                          </span>
                        )}
                      </div>
                      {report.serviceType && (
                        <div style={{ fontSize: '0.725rem', color: 'var(--gov-blue-dark)', fontWeight: 500 }}>
                          {report.serviceType}
                        </div>
                      )}
                      <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)' }}>
                        {report.region}
                      </div>
                    </td>
                    <td style={{ maxWidth: '280px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--neutral-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {report.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {report.message}
                      </div>
                    </td>
                    <td style={{ fontSize: '0.8125rem' }}>
                      <div style={{ fontWeight: 600, color: 'var(--neutral-800)' }}>{report.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)' }}>{report.contact}</div>
                    </td>
                    <td>
                      {report.adminResponse ? (
                        <span style={{ color: 'var(--gov-green-dark)', fontWeight: 600, fontSize: '0.75rem' }}>
                          Sudah Ditanggapi
                        </span>
                      ) : (
                        <span style={{ color: '#D97706', fontSize: '0.75rem' }}>
                          Belum Dijawab
                        </span>
                      )}
                    </td>
                    <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                      <Link
                        to={`/admin/report/${report.id}`}
                        className="gov-btn gov-btn-secondary gov-btn-sm"
                        id={`btn-manage-${report.id}`}
                      >
                        <span>Kelola</span>
                        <Icon name="arrow-right" size={12} />
                      </Link>
                    </td>
                  </tr>
                );
              })}

              {reports.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <Icon name="alert-circle" size={32} color="var(--neutral-400)" />
                    <p style={{ marginTop: '0.5rem', color: 'var(--neutral-600)', fontWeight: 600 }}>
                      Tidak ada laporan yang sesuai dengan kriteria pencarian.
                    </p>
                    <button
                      type="button"
                      onClick={handleResetFilter}
                      className="gov-btn gov-btn-outline-neutral gov-btn-sm"
                      style={{ marginTop: '0.5rem' }}
                    >
                      Bersihkan Filter
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
