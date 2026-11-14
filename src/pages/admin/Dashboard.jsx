import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from "../../components/Icon";
import StatusBadge from "../../components/StatusBadge";
import {
  CATEGORIES,
  RIAU_REGIONS,
  ADMIN_STATUSES,
  getCategoryDetails
} from '../../data/categories';
import { getReportStats, filterReports, exportReportsToCSV } from "../../services/storage";

const EMPTY_FILTER = { query: '', status: '', category: '', region: '' };

export default function AdminDashboard() {
  const [filterState, setFilterState] = useState(EMPTY_FILTER);
  // Data dibaca langsung dari penyimpanan pada setiap render. State hanya
  // menyimpan filter dan penghitung penyegaran, sehingga tidak ada salinan
  // yang bisa basi terhadap data yang ditulis halaman publik.
  const [, setRefreshKey] = useState(0);
  const reports = filterReports(filterState);
  const stats = getReportStats();
  const lastSynced = new Date();

  const loadData = () => setRefreshKey(k => k + 1);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterState(prev => ({ ...prev, [name]: value }));
  };

  const handleResetFilter = () => setFilterState(EMPTY_FILTER);

  const handleExport = () => exportReportsToCSV(reports);

  const hasFilter = Boolean(
    filterState.query || filterState.status || filterState.category || filterState.region
  );

  const kpis = [
    {
      key: '',
      tone: 'total',
      label: 'Total Pengajuan',
      value: stats.total,
      note: 'Seluruh kategori layanan'
    },
    {
      key: 'Baru',
      tone: 'baru',
      label: 'Baru Diterima',
      value: stats.baru,
      note: 'Menunggu verifikasi petugas'
    },
    {
      key: 'Diproses',
      tone: 'proses',
      label: 'Sedang Diproses',
      value: stats.diproses,
      note: 'Sedang ditelaah atau ditindaklanjuti'
    },
    {
      key: 'Selesai',
      tone: 'selesai',
      label: 'Selesai Ditangani',
      value: stats.selesai,
      note: `${stats.ditanggapi} pengajuan bertanggapan resmi`
    }
  ];

  return (
    <div>
      <header className="adx-page-head">
        <div className="adx-page-head__main">
          <span className="adx-page-head__eyebrow">Panel Kendali IFPI</span>
          <h1 className="adx-page-head__title">Rekapitulasi Layanan &amp; Pengaduan</h1>
          <p className="adx-page-head__desc">
            Daftar pengajuan yang masuk dari portal publik beserta status penanganannya.
            Seluruh angka di bawah dihitung langsung dari data pengajuan yang tersimpan.
          </p>
        </div>

        <div className="adx-page-head__actions">
          <button type="button" onClick={handleExport} className="adx-btn" id="btn-admin-export-csv">
            <Icon name="download" size={14} color="currentColor" />
            <span>Ekspor Data ({reports.length})</span>
          </button>
          <button type="button" onClick={loadData} className="adx-btn adx-btn--primary">
            <Icon name="refresh" size={14} color="currentColor" />
            <span>Segarkan Data</span>
          </button>
        </div>
      </header>

      {/* Pita indikator: satu blok terbagi garis, bukan empat kartu mengambang */}
      <div className="adx-kpis">
        {kpis.map((kpi) => (
          <button
            key={kpi.key}
            type="button"
            className={`adx-kpi adx-kpi--${kpi.tone}${filterState.status === kpi.key ? ' is-active' : ''}`}
            onClick={() => setFilterState(prev => ({ ...prev, status: kpi.key }))}
            aria-pressed={filterState.status === kpi.key}
          >
            <span className="adx-kpi__label">{kpi.label}</span>
            <span className="adx-kpi__value">{kpi.value}</span>
            <span className="adx-kpi__note">{kpi.note}</span>
          </button>
        ))}
      </div>

      <section className="adx-panel">
        <div className="adx-panel__head">
          <h2 className="adx-panel__title">Daftar Pengajuan</h2>
          <span className="adx-panel__meta">
            {lastSynced
              ? `Diperbarui ${lastSynced.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`
              : ''}
          </span>
        </div>

        {/* Pencarian & penyaringan */}
        <div className="adx-toolbar">
          <div className="adx-field">
            <label htmlFor="filter-query" className="adx-field__label">Pencarian</label>
            <div className="adx-search-wrap">
              <Icon name="search" size={14} color="currentColor" />
              <input
                type="text"
                id="filter-query"
                name="query"
                className="adx-input"
                placeholder="Nomor tiket, nama pelapor, atau lokasi"
                value={filterState.query}
                onChange={handleFilterChange}
              />
            </div>
          </div>

          <div className="adx-field">
            <label htmlFor="filter-status" className="adx-field__label">Status</label>
            <select
              id="filter-status"
              name="status"
              className="adx-select"
              value={filterState.status}
              onChange={handleFilterChange}
            >
              <option value="">Semua status</option>
              {ADMIN_STATUSES.map(s => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>

          <div className="adx-field">
            <label htmlFor="filter-category" className="adx-field__label">Kategori layanan</label>
            <select
              id="filter-category"
              name="category"
              className="adx-select"
              value={filterState.category}
              onChange={handleFilterChange}
            >
              <option value="">Semua kategori</option>
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="adx-field">
            <label htmlFor="filter-region" className="adx-field__label">Kabupaten / kota</label>
            <select
              id="filter-region"
              name="region"
              className="adx-select"
              value={filterState.region}
              onChange={handleFilterChange}
            >
              <option value="">Semua wilayah</option>
              {RIAU_REGIONS.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        {hasFilter && (
          <div className="adx-filterbar">
            <span>
              Menampilkan <strong>{reports.length}</strong> dari <strong>{stats.total}</strong> pengajuan
            </span>
            <button type="button" className="adx-filterbar__reset" onClick={handleResetFilter}>
              Bersihkan filter
            </button>
          </div>
        )}

        <div className="adx-table-scroll">
          <table className="adx-table">
            <thead>
              <tr>
                <th>Nomor Tiket</th>
                <th>Tanggal Masuk</th>
                <th>Status</th>
                <th>Kategori Layanan</th>
                <th>Judul Permohonan / Aduan</th>
                <th>Nama Pelapor</th>
                <th>Kontak</th>
                <th>Tanggapan</th>
                <th data-align="center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => {
                const catObj = getCategoryDetails(report.category);
                const created = new Date(report.createdAt);
                return (
                  <tr key={report.id}>
                    <td>
                      <Link to={`/admin/report/${report.id}`} className="adx-ticket">
                        {report.ticketNumber}
                      </Link>
                    </td>
                    <td>
                      <span className="adx-date">
                        {created.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                        <span className="adx-date__time">
                          {created.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                        </span>
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={report.status} size="sm" />
                    </td>
                    <td>
                      <span className="adx-cat">
                        <span className="adx-cat__name">
                          {catObj ? catObj.name : report.category}
                          {catObj?.isLegacy && <span className="adx-chip">Arsip</span>}
                        </span>
                        <span className="adx-cat__sub">{report.region || 'Provinsi Riau'}</span>
                      </span>
                    </td>
                    <td>
                      <span className="adx-subject">
                        <span className="adx-subject__title">{report.title}</span>
                        <span className="adx-subject__desc">{report.serviceType || report.message}</span>
                      </span>
                    </td>
                    <td>
                      <span className="adx-person">
                        <span className="adx-person__name">{report.name}</span>
                      </span>
                    </td>
                    <td>
                      <span className="adx-person__contact">{report.contact}</span>
                    </td>
                    <td>
                      {report.adminResponse?.message ? (
                        <span className="adx-flag adx-flag--yes">
                          <span className="adx-flag__dot" />
                          Sudah
                        </span>
                      ) : (
                        <span className="adx-flag adx-flag--no">
                          <span className="adx-flag__dot" />
                          Belum
                        </span>
                      )}
                    </td>
                    <td data-align="center">
                      <Link to={`/admin/report/${report.id}`} className="adx-btn adx-btn--xs">
                        Detail
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {reports.length === 0 && (
            <div className="adx-empty">
              <p className="adx-empty__title">
                {stats.total === 0 ? 'Belum ada pengajuan masuk' : 'Tidak ada pengajuan yang cocok'}
              </p>
              <p className="adx-empty__desc">
                {stats.total === 0
                  ? 'Pengajuan yang dikirim masyarakat melalui portal publik akan otomatis muncul di sini.'
                  : 'Ubah kata kunci pencarian atau bersihkan filter untuk melihat seluruh pengajuan.'}
              </p>
              {hasFilter && (
                <button type="button" onClick={handleResetFilter} className="adx-btn">
                  Bersihkan filter
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
