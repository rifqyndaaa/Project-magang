import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/Icon';
import { TABEL_REKAP_RESMI, TOTAL_JF_RIAU } from '../../../data/regionsData';
import { fetchMemberCounts } from '../../../services/regionDataService';
import './RegionRecapTable.css';

export default function RegionRecapTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'kabupaten' | 'kota-prov'
  const [dbCounts, setDbCounts] = useState({});

  useEffect(() => {
    let active = true;
    fetchMemberCounts().then(({ counts, error }) => {
      if (active && !error && counts) {
        setDbCounts(counts);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const rowsWithDb = useMemo(() => {
    return TABEL_REKAP_RESMI.map((row) => ({
      ...row,
      jfCount: dbCounts[row.id] ?? row.jfCount,
    }));
  }, [dbCounts]);

  const totalJfAll = useMemo(
    () => rowsWithDb.reduce((acc, cur) => acc + (cur.jfCount || 0), 0),
    [rowsWithDb]
  );

  // Filter baris tabel berdasarkan tipe dan pencarian
  const filteredList = useMemo(() => {
    return rowsWithDb.filter((item) => {
      // Filter tipe
      if (filterType === 'kabupaten' && item.type !== 'kabupaten') return false;
      if (filterType === 'kota-prov' && item.type === 'kabupaten') return false;

      // Filter query pencarian
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        item.tableLabel.toLowerCase().includes(q) ||
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.officialFullName && item.officialFullName.toLowerCase().includes(q))
      );
    });
  }, [rowsWithDb, searchQuery, filterType]);

  // Hitung total ringkasan untuk data yang sedang difilter
  const summary = useMemo(() => {
    if (filterType === 'all' && !searchQuery.trim()) {
      const jf = totalJfAll;
      const bySys = TOTAL_JF_RIAU.totalMembersBySystem;
      const percent = jf > 0 ? `${((bySys / jf) * 100).toFixed(1)}%` : TOTAL_JF_RIAU.percentageBySystem;
      return {
        count: TOTAL_JF_RIAU.totalWilayah,
        jf,
        bySys,
        notYet: TOTAL_JF_RIAU.totalNotYetMembers,
        percent,
      };
    }
    const count = filteredList.length;
    const jf = filteredList.reduce((acc, cur) => acc + (cur.jfCount || 0), 0);
    const bySys = filteredList.reduce((acc, cur) => acc + (cur.membersBySystem || 0), 0);
    const notYet = filteredList.reduce((acc, cur) => acc + (cur.notYetMembers || 0), 0);
    const percent = jf > 0 ? `${((bySys / jf) * 100).toFixed(1)}%` : '0%';
    return { count, jf, bySys, notYet, percent };
  }, [filteredList, filterType, searchQuery, totalJfAll]);

  return (
    <section className="recap-section" id="tabel-rekapitulasi" aria-labelledby="recap-table-heading">
      {/* Header Bagian Tabel */}
      <div className="recap-header">
        <div className="recap-header__badge">
          <Icon name="file-text" size={14} color="var(--ifpi-red)" />
          <span>Rekapitulasi Data Resmi IFPI</span>
        </div>
        <h2 id="recap-table-heading" className="recap-header__title">
          Tabel Sebaran Personel JF &amp; Keanggotaan IFPI
        </h2>
        <p className="recap-header__desc">
          Data rekonsiliasi keanggotaan Pengelola Pengadaan Barang/Jasa (JF PBJ) se-Provinsi Riau 
          berdasarkan sinkronisasi sistem dan pangkalan data Dewan Pengurus Wilayah IFPI.
        </p>
      </div>

      {/* KPI Cards Ringkasan */}
      <div className="recap-kpi-grid">
        <div className="recap-kpi-card recap-kpi-card--total">
          <div className="recap-kpi-card__icon">
            <Icon name="folder" size={22} color="#1E293B" />
          </div>
          <div className="recap-kpi-card__body">
            <span className="recap-kpi-card__label">Total Personel JF</span>
            <div className="recap-kpi-card__value-row">
              <span className="recap-kpi-card__value">{totalJfAll}</span>
              <span className="recap-kpi-card__unit">Orang</span>
            </div>
            <span className="recap-kpi-card__hint">13 entitas se-Provinsi Riau</span>
          </div>
        </div>

        <div className="recap-kpi-card recap-kpi-card--active">
          <div className="recap-kpi-card__icon">
            <Icon name="check" size={22} color="#15803D" />
          </div>
          <div className="recap-kpi-card__body">
            <span className="recap-kpi-card__label">Anggota by Sistem</span>
            <div className="recap-kpi-card__value-row">
              <span className="recap-kpi-card__value">{TOTAL_JF_RIAU.totalMembersBySystem}</span>
              <span className="recap-kpi-card__badge-ratio">
                {totalJfAll > 0 ? `${((TOTAL_JF_RIAU.totalMembersBySystem / totalJfAll) * 100).toFixed(1)}%` : TOTAL_JF_RIAU.percentageBySystem}
              </span>
            </div>
            <span className="recap-kpi-card__hint">Akun aktif terverifikasi portal</span>
          </div>
        </div>

        <div className="recap-kpi-card recap-kpi-card--pending">
          <div className="recap-kpi-card__icon">
            <Icon name="info" size={22} color="#B8202D" />
          </div>
          <div className="recap-kpi-card__body">
            <span className="recap-kpi-card__label">Belum Jadi Anggota</span>
            <div className="recap-kpi-card__value-row">
              <span className="recap-kpi-card__value">{TOTAL_JF_RIAU.totalNotYetMembers}</span>
              <span className="recap-kpi-card__badge-ratio recap-kpi-card__badge-ratio--warm">
                {totalJfAll > 0 ? `${((TOTAL_JF_RIAU.totalNotYetMembers / totalJfAll) * 100).toFixed(1)}%` : '0%'}
              </span>
            </div>
            <span className="recap-kpi-card__hint">Potensi pendaftaran anggota baru</span>
          </div>
        </div>
      </div>

      {/* Toolbar Pencarian & Filter */}
      <div className="recap-toolbar">
        <div className="recap-toolbar__search">
          <Icon name="arrow-right" size={15} color="#94A3B8" />
          <input
            type="text"
            className="recap-search-input"
            placeholder="Cari wilayah (mis: INHU, Pekanbaru, Siak)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="recap-search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Bersihkan pencarian"
            >
              <Icon name="x" size={14} color="#64748B" />
            </button>
          )}
        </div>

        <div className="recap-toolbar__filters" role="tablist" aria-label="Filter Wilayah">
          <button
            type="button"
            className={`recap-filter-pill ${filterType === 'all' ? 'is-active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            Semua ({TABEL_REKAP_RESMI.length})
          </button>
          <button
            type="button"
            className={`recap-filter-pill ${filterType === 'kabupaten' ? 'is-active' : ''}`}
            onClick={() => setFilterType('kabupaten')}
          >
            Kabupaten (10)
          </button>
          <button
            type="button"
            className={`recap-filter-pill ${filterType === 'kota-prov' ? 'is-active' : ''}`}
            onClick={() => setFilterType('kota-prov')}
          >
            Kota &amp; Pemprov (3)
          </button>
        </div>
      </div>

      {/* Tabel Data Rekapitulasi */}
      <div className="recap-table-card">
        <div className="recap-table-responsive">
          <table className="recap-table">
            <thead>
              <tr>
                <th className="recap-th recap-th--no">NO</th>
                <th className="recap-th recap-th--name">NAMA WILAYAH</th>
                <th className="recap-th recap-th--num">JF</th>
                <th className="recap-th recap-th--num">ANGGOTA IFPI BY SISTEM</th>
                <th className="recap-th recap-th--num">YANG BELUM JD ANGGOTA</th>
                <th className="recap-th recap-th--ratio">RASIO CAPAIAN</th>
                <th className="recap-th recap-th--action">DETAIL</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length > 0 ? (
                filteredList.map((row) => {
                  const ratio = row.jfCount > 0 ? Math.round((row.membersBySystem / row.jfCount) * 100) : 0;
                  return (
                    <tr key={row.id} className="recap-tr">
                      <td className="recap-td recap-td--no">{row.no}</td>
                      <td className="recap-td recap-td--name">
                        <Link to={`/wilayah/${row.id}`} className="recap-region-link">
                          <div className="recap-region-head-wrap">
                            <span className="recap-region-code">{row.tableLabel}</span>
                            {row.id === 'prov-riau' && (
                              <span className="recap-tag-prov">Tingkat Provinsi</span>
                            )}
                          </div>
                          <span className="recap-region-full">
                            {row.officialFullName || row.name}
                          </span>
                        </Link>
                      </td>
                      <td className="recap-td recap-td--num">
                        <span className="recap-num-bold">{row.jfCount}</span>
                      </td>
                      <td className="recap-td recap-td--num">
                        <span className="recap-badge-active">
                          {row.membersBySystem}
                        </span>
                      </td>
                      <td className="recap-td recap-td--num">
                        <span className="recap-badge-pending">
                          {row.notYetMembers}
                        </span>
                      </td>
                      <td className="recap-td recap-td--ratio">
                        <div className="recap-progress-wrap">
                          <div className="recap-progress-bar">
                            <div
                              className="recap-progress-fill"
                              style={{ width: `${Math.min(ratio, 100)}%` }}
                            />
                          </div>
                          <span className="recap-progress-text">{ratio}%</span>
                        </div>
                      </td>
                      <td className="recap-td recap-td--action">
                        <Link to={`/wilayah/${row.id}`} className="recap-btn-detail">
                          <span>Detail</span>
                          <Icon name="arrow-right" size={12} color="currentColor" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="recap-td--empty">
                    Tidak ada wilayah yang sesuai dengan pencarian “{searchQuery}”.
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="recap-tfoot-tr">
                <td colSpan="2" className="recap-tf recap-tf--label">
                  JUMLAH
                </td>
                <td className="recap-tf recap-tf--num">
                  <span className="recap-total-val">{summary.jf}</span>
                </td>
                <td className="recap-tf recap-tf--num">
                  <span className="recap-total-val recap-total-val--active">
                    {summary.bySys}
                  </span>
                </td>
                <td className="recap-tf recap-tf--num">
                  <span className="recap-total-val recap-total-val--pending">
                    {summary.notYet}
                  </span>
                </td>
                <td className="recap-tf recap-tf--ratio">
                  <span className="recap-total-ratio">{summary.percent} Terverifikasi</span>
                </td>
                <td className="recap-tf recap-tf--action">
                  <span className="recap-total-entities">{summary.count} Wilayah</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Catatan Kaki Tabel */}
        <div className="recap-table-footer">
          <div className="recap-footer-note">
            <Icon name="info" size={14} color="#64748B" />
            <span>
              <strong>Keterangan:</strong> <em>JF</em> = Jumlah Fungsional Pengelola Pengadaan Barang/Jasa (PPBJ); 
              <em> Anggota IFPI by Sistem</em> = Personel terdaftar dengan KTA terverifikasi; 
              <em> Yang Belum Jd Anggota</em> = JF yang belum teregistrasi dalam pangkalan data anggota.
            </span>
          </div>
          <div className="recap-footer-link">
            <span>Klik nama wilayah atau tombol <strong>Detail</strong> untuk melihat daftar personel &amp; KTA tiap DPC.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
