import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from "../../components/Icon";
import StatusBadge from "../../components/StatusBadge";
import { CATEGORIES, RIAU_REGIONS, ADMIN_STATUSES, getCategoryDetails } from '../../data/categories';
import { filterReports, getAllReports, exportReportsToCSV } from "../../services/storage";

const EMPTY = { query: '', status: '', category: '', region: '' };

/**
 * Data Pengajuan — daftar lengkap tanpa ringkasan statistik.
 * Dipisahkan dari Panel Kendali agar halaman ini fokus pada penelusuran data.
 */
export default function AdminPengajuan() {
  const [filterState, setFilterState] = useState(EMPTY);

  const reports = filterReports(filterState);
  const total = getAllReports().length;

  const change = (e) => {
    const { name, value } = e.target;
    setFilterState(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <header className="adx-page-head">
        <div className="adx-page-head__main">
          <span className="adx-page-head__eyebrow">Pengelolaan Layanan</span>
          <h1 className="adx-page-head__title">Data Pengajuan</h1>
          <p className="adx-page-head__desc">
            Seluruh pengajuan yang dikirim masyarakat melalui portal publik, termasuk data
            arsip dari kategori lama. Gunakan penyaringan untuk menelusuri data tertentu.
          </p>
        </div>
        <div className="adx-page-head__actions">
          <button type="button" className="adx-btn" onClick={() => exportReportsToCSV(reports)}>
            <Icon name="download" size={14} color="currentColor" />
            <span>Ekspor ({reports.length})</span>
          </button>
        </div>
      </header>

      <section className="adx-panel">
        <div className="adx-toolbar">
          <div className="adx-field">
            <label htmlFor="pengajuan-query" className="adx-field__label">Pencarian</label>
            <div className="adx-search-wrap">
              <Icon name="search" size={14} color="currentColor" />
              <input
                type="text"
                id="pengajuan-query"
                name="query"
                className="adx-input"
                placeholder="Nomor tiket, nama, atau lokasi"
                value={filterState.query}
                onChange={change}
              />
            </div>
          </div>

          <div className="adx-field">
            <label htmlFor="pengajuan-status" className="adx-field__label">Status</label>
            <select id="pengajuan-status" name="status" className="adx-select" value={filterState.status} onChange={change}>
              <option value="">Semua status</option>
              {ADMIN_STATUSES.map(s => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>

          <div className="adx-field">
            <label htmlFor="pengajuan-category" className="adx-field__label">Kategori</label>
            <select id="pengajuan-category" name="category" className="adx-select" value={filterState.category} onChange={change}>
              <option value="">Semua kategori</option>
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="adx-field">
            <label htmlFor="pengajuan-region" className="adx-field__label">Kabupaten / kota</label>
            <select id="pengajuan-region" name="region" className="adx-select" value={filterState.region} onChange={change}>
              <option value="">Semua wilayah</option>
              {RIAU_REGIONS.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="adx-filterbar">
          <span>
            <strong>{reports.length}</strong> dari <strong>{total}</strong> pengajuan
          </span>
          {(filterState.query || filterState.status || filterState.category || filterState.region) && (
            <button type="button" className="adx-filterbar__reset" onClick={() => setFilterState(EMPTY)}>
              Bersihkan filter
            </button>
          )}
        </div>

        <div className="adx-table-scroll">
          <table className="adx-table">
            <thead>
              <tr>
                <th>Nomor Tiket</th>
                <th>Tanggal Masuk</th>
                <th>Status</th>
                <th>Kategori Layanan</th>
                <th>Judul</th>
                <th>Pelapor</th>
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
                    <td><StatusBadge status={report.status} size="sm" /></td>
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
                      </span>
                    </td>
                    <td><span className="adx-person__name">{report.name}</span></td>
                    <td><span className="adx-person__contact">{report.contact}</span></td>
                    <td>
                      {report.adminResponse?.message ? (
                        <span className="adx-flag adx-flag--yes"><span className="adx-flag__dot" />Sudah</span>
                      ) : (
                        <span className="adx-flag adx-flag--no"><span className="adx-flag__dot" />Belum</span>
                      )}
                    </td>
                    <td data-align="center">
                      <Link to={`/admin/report/${report.id}`} className="adx-btn adx-btn--xs">Detail</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {reports.length === 0 && (
            <div className="adx-empty">
              <p className="adx-empty__title">Tidak ada data yang cocok</p>
              <p className="adx-empty__desc">Ubah kata kunci atau bersihkan filter untuk melihat seluruh pengajuan.</p>
              <button type="button" className="adx-btn" onClick={() => setFilterState(EMPTY)}>Bersihkan filter</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
