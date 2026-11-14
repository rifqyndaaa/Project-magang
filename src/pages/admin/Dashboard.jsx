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
    <div className="gov-container adm-dash">
      {/* Header Dashboard */}
      <header className="adm-dash__head">
        <div className="adm-dash__head-main">
          <span className="adm-dash__eyebrow">Panel Kendali IFPI</span>
          <h1 className="adm-dash__title">Rekapitulasi Layanan &amp; Pengaduan</h1>
          <p className="adm-dash__lede">
            Pengelolaan permohonan konsultasi pengadaan, penanganan aduan profesi, dan
            koordinasi narasumber resmi DPW IFPI Provinsi Riau.
          </p>
        </div>

        <div className="adm-dash__head-actions">
          <button
            type="button"
            onClick={handleExport}
            className="gov-btn gov-btn-outline-neutral gov-btn-sm"
            id="btn-admin-export-csv"
            title="Unduh data yang tersaring ke berkas spreadsheet CSV"
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
      </header>

      {/* Ringkasan Statistik */}
      <div className="adm-stats">
        <button
          type="button"
          className={`adm-stat${filterState.status === '' ? ' is-active' : ''}`}
          onClick={() => setFilterState(prev => ({ ...prev, status: '' }))}
        >
          <span className="adm-stat__label">Total Pengaduan</span>
          <span className="adm-stat__value">{stats.total}</span>
          <span className="adm-stat__meta">Semua kategori &amp; wilayah</span>
        </button>

        <button
          type="button"
          className={`adm-stat adm-stat--new${filterState.status === 'Baru' ? ' is-active' : ''}`}
          onClick={() => setFilterState(prev => ({ ...prev, status: 'Baru' }))}
        >
          <span className="adm-stat__label">Baru Diterima</span>
          <span className="adm-stat__value">{stats.baru}</span>
          <span className="adm-stat__meta">Menunggu verifikasi admin</span>
        </button>

        <button
          type="button"
          className={`adm-stat adm-stat--progress${filterState.status === 'Diproses' ? ' is-active' : ''}`}
          onClick={() => setFilterState(prev => ({ ...prev, status: 'Diproses' }))}
        >
          <span className="adm-stat__label">Sedang Diproses</span>
          <span className="adm-stat__value">{stats.dalamProses}</span>
          <span className="adm-stat__meta">Verifikasi, telaah &amp; tindak lanjut</span>
        </button>

        <button
          type="button"
          className={`adm-stat adm-stat--done${filterState.status === 'Selesai' ? ' is-active' : ''}`}
          onClick={() => setFilterState(prev => ({ ...prev, status: 'Selesai' }))}
        >
          <span className="adm-stat__label">Selesai Ditangani</span>
          <span className="adm-stat__value">{stats.selesai}</span>
          <span className="adm-stat__meta">Diberi tanggapan resmi</span>
        </button>
      </div>


      {/* Panel Filter dan Pencarian */}
      <section className="adm-filters">
        <h2 className="adm-filters__title">Filter &amp; Pencarian Laporan</h2>

        <div className="adm-filters__grid">
          <div className="gov-form-group adm-filters__field">
            <label htmlFor="filter-query" className="gov-label">
              Cari teks / tiket / pelapor
            </label>
            <input
              type="text"
              id="filter-query"
              name="query"
              className="gov-input"
              placeholder="Nomor tiket, nama, lokasi…"
              value={filterState.query}
              onChange={handleFilterChange}
            />
          </div>

          <div className="gov-form-group adm-filters__field">
            <label htmlFor="filter-status" className="gov-label">Status penanganan</label>
            <select
              id="filter-status"
              name="status"
              className="gov-select"
              value={filterState.status}
              onChange={handleFilterChange}
            >
              <option value="">Semua status</option>
              {REPORT_STATUSES.map(s => (
                <option key={s.id} value={s.id}>{s.id} ({s.label})</option>
              ))}
            </select>
          </div>

          <div className="gov-form-group adm-filters__field">
            <label htmlFor="filter-category" className="gov-label">Kategori layanan</label>
            <select
              id="filter-category"
              name="category"
              className="gov-select"
              value={filterState.category}
              onChange={handleFilterChange}
            >
              <option value="">Semua kategori</option>
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="gov-form-group adm-filters__field">
            <label htmlFor="filter-region" className="gov-label">Kabupaten / kota</label>
            <select
              id="filter-region"
              name="region"
              className="gov-select"
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

        {(filterState.query || filterState.status || filterState.category || filterState.region) && (
          <div className="adm-filters__footer">
            <span>
              Menemukan <strong>{reports.length}</strong> pengaduan sesuai kriteria penyaringan.
            </span>
            <button
              type="button"
              onClick={handleResetFilter}
              className="adm-filters__reset"
            >
              Reset filter
            </button>
          </div>
        )}
      </section>

      {/* Tabel Data Laporan */}
      <div className="adm-table">
        <div className="gov-table-wrapper">
          <table className="gov-table">
            <thead>
              <tr>
                <th>No. Tiket</th>
                <th>Tanggal Masuk</th>
                <th>Status</th>
                <th>Kategori &amp; Layanan</th>
                <th>Judul Permohonan / Aduan</th>
                <th>Pelapor &amp; Kontak</th>
                <th>Tanggapan</th>
                <th className="adm-table__th-action">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => {
                const catObj = getCategoryDetails(report.category);
                return (
                  <tr key={report.id}>
                    <td>
                      <Link to={`/admin/report/${report.id}`} className="adm-table__ticket">
                        {report.ticketNumber}
                      </Link>
                    </td>
                    <td className="adm-table__date">
                      {new Date(report.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                      <span>
                        {new Date(report.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={report.status} size="sm" />
                    </td>
                    <td>
                      <div className="adm-table__cat">
                        {catObj ? catObj.shortName || catObj.name : report.category}
                        {catObj?.isLegacy && (
                          <span className="adm-table__chip">Arsip</span>
                        )}
                      </div>
                      {report.serviceType && (
                        <div className="adm-table__service">{report.serviceType}</div>
                      )}
                      <div className="adm-table__region">{report.region}</div>
                    </td>
                    <td className="adm-table__subject">
                      <div className="adm-table__subject-title">{report.title}</div>
                      <div className="adm-table__subject-desc">{report.message}</div>
                    </td>
                    <td className="adm-table__reporter">
                      <div>{report.name}</div>
                      <div className="adm-table__reporter-contact">{report.contact}</div>
                    </td>
                    <td>
                      {report.adminResponse ? (
                        <span className="adm-table__answered">Sudah ditanggapi</span>
                      ) : (
                        <span className="adm-table__unanswered">Belum dijawab</span>
                      )}
                    </td>
                    <td className="adm-table__td-action">
                      <Link
                        to={`/admin/report/${report.id}`}
                        className="gov-btn gov-btn-outline-neutral gov-btn-xs"
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
                  <td colSpan={8} className="adm-table__empty">
                    <p>Tidak ada laporan yang sesuai dengan kriteria pencarian.</p>
                    <button
                      type="button"
                      onClick={handleResetFilter}
                      className="gov-btn gov-btn-outline-neutral gov-btn-sm"
                    >
                      Bersihkan filter
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
