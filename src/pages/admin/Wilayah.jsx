import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from "../../components/Icon";
import { REKAPITULASI_JF_RIAU, TOTAL_JF_RIAU } from '../../data/regionsData';
import { fetchMemberCounts } from '../../services/regionDataService';
import RegionStructurePanel from './RegionStructurePanel';

/**
 * Wilayah — Tabel pandangan data 12 kabupaten/kota + Pemprov Riau.
 * Menampilkan data rekonsiliasi Jabatan Fungsional (JF) & status DPC serta SK resmi.
 */
export default function AdminWilayah() {
  const [dbCounts, setDbCounts] = useState({});
  const totalDpc = REKAPITULASI_JF_RIAU.filter(r => r.isAvailable).length;

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

  const totalJf = useMemo(
    () => REKAPITULASI_JF_RIAU.reduce((sum, r) => sum + (dbCounts[r.id] ?? r.jfCount ?? 0), 0),
    [dbCounts]
  );

  const totalRatioByLetter = totalJf > 0
    ? `${((TOTAL_JF_RIAU.totalMembersByLetter / totalJf) * 100).toFixed(1)}%`
    : TOTAL_JF_RIAU.percentageByLetter;

  return (
    <div>
      <header className="adx-page-head">
        <div className="adx-page-head__main">
          <span className="adx-page-head__eyebrow">Data Organisasi &amp; Wilayah</span>
          <h1 className="adx-page-head__title">Wilayah &amp; Keanggotaan JF</h1>
          <p className="adx-page-head__desc">
            Sepuluh kabupaten, dua kota, dan unit kerja Pemerintah Provinsi Riau.
            Rekapitulasi resmi personel Jabatan Fungsional (JF PBJ) dan status konsolidasi kepengurusan DPC IFPI.
          </p>
        </div>
        <div className="adx-page-head__actions">
          <Link to="/wilayah" target="_blank" rel="noopener noreferrer" className="adx-btn">
            <Icon name="external-link" size={14} color="currentColor" />
            <span>Lihat di Portal Publik</span>
          </Link>
        </div>
      </header>

      {/* KPI Ribbon Personel & Keanggotaan */}
      <section className="adx-kpis" style={{ marginBottom: '1.5rem' }}>
        <div className="adx-kpi adx-kpi--total">
          <span className="adx-kpi__label">Total Personel JF PBJ</span>
          <span className="adx-kpi__value">{totalJf}</span>
          <span className="adx-kpi__note">13 entitas se-Provinsi Riau</span>
        </div>
        <div className="adx-kpi adx-kpi--baru">
          <span className="adx-kpi__label">Anggota (Surat Masuk)</span>
          <span className="adx-kpi__value">{TOTAL_JF_RIAU.totalMembersByLetter}</span>
          <span className="adx-kpi__note">{TOTAL_JF_RIAU.percentageByLetter} rasio terdata</span>
        </div>
        <div className="adx-kpi adx-kpi--proses">
          <span className="adx-kpi__label">Anggota (By Sistem)</span>
          <span className="adx-kpi__value">{TOTAL_JF_RIAU.totalMembersBySystem}</span>
          <span className="adx-kpi__note">{TOTAL_JF_RIAU.percentageBySystem} akun portal aktif</span>
        </div>
        <div className="adx-kpi adx-kpi--selesai">
          <span className="adx-kpi__label">Status Wilayah</span>
          <span className="adx-kpi__value">{totalDpc} / 13</span>
          <span className="adx-kpi__note">Telah berkonsolidasi resmi</span>
        </div>
      </section>

      <section className="adx-panel">
        <div className="adx-panel__head">
          <h2 className="adx-panel__title">Daftar Wilayah &amp; Rekonsiliasi Keanggotaan</h2>
          <span className="adx-panel__meta">13 Entitas Wilayah</span>
        </div>
        <div className="adx-table-scroll">
          <table className="adx-table">
            <thead>
              <tr>
                <th style={{ width: '40px', textAlign: 'center' }}>No</th>
                <th>Wilayah / Instansi</th>
                <th>Jenis</th>
                <th style={{ textAlign: 'right' }}>Total JF</th>
                <th style={{ textAlign: 'right', color: 'var(--adx-red)' }}>Surat Masuk</th>
                <th style={{ textAlign: 'right' }}>By Sistem</th>
                <th style={{ textAlign: 'right' }}>Belum Anggota</th>
                <th style={{ textAlign: 'right' }}>Rasio</th>
                <th style={{ textAlign: 'center' }}>Status DPC</th>
                <th style={{ textAlign: 'center' }}>Dokumen SK</th>
              </tr>
            </thead>
            <tbody>
              {REKAPITULASI_JF_RIAU.map((region, index) => {
                const jfCount = dbCounts[region.id] ?? region.jfCount;
                const ratio = jfCount
                  ? Math.round(((region.membersByLetter || 0) / jfCount) * 100)
                  : 0;

                return (
                  <tr key={region.id}>
                    <td style={{ textAlign: 'center', color: '#64748B' }}>{index + 1}</td>
                    <td>
                      <span className="adx-person__name">{region.name}</span>
                      {region.capital && (
                        <span className="adx-person__contact" style={{ display: 'block', fontSize: '0.6875rem' }}>
                          Ibu Kota: {region.capital}
                        </span>
                      )}
                    </td>
                    <td style={{ textTransform: 'capitalize' }}>{region.type}</td>
                    <td style={{ textAlign: 'right', fontWeight: 700 }}>{jfCount}</td>
                    <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--adx-red)' }}>
                      {region.membersByLetter}
                    </td>
                    <td style={{ textAlign: 'right' }}>{region.membersBySystem}</td>
                    <td style={{ textAlign: 'right', color: '#64748B' }}>{region.notYetMembers}</td>
                    <td style={{ textAlign: 'right', fontWeight: 600 }}>{ratio}%</td>
                    <td style={{ textAlign: 'center' }}>
                      {region.isAvailable ? (
                        <span className="adx-tag adx-tag--on">Aktif</span>
                      ) : (
                        <span className="adx-tag adx-tag--off">Konsolidasi</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <Link
                        to={`/wilayah/${region.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="adx-btn adx-btn--xs"
                        title="Lihat profil & SK resmi wilayah"
                      >
                        <Icon name="file-text" size={12} color="currentColor" />
                        <span>Lihat SK</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {/* Baris Total */}
              <tr style={{ backgroundColor: '#F8FAFC', fontWeight: 700, borderTop: '2px solid #CBD5E1' }}>
                <td colSpan={3} style={{ textAlign: 'left', padding: '0.9rem 1rem' }}>
                  JUMLAH TOTAL SE-PROVINSI RIAU
                </td>
                <td style={{ textAlign: 'right', padding: '0.9rem 1rem' }}>{totalJf}</td>
                <td style={{ textAlign: 'right', padding: '0.9rem 1rem', color: 'var(--adx-red)' }}>
                  {TOTAL_JF_RIAU.totalMembersByLetter}
                </td>
                <td style={{ textAlign: 'right', padding: '0.9rem 1rem' }}>{TOTAL_JF_RIAU.totalMembersBySystem}</td>
                <td style={{ textAlign: 'right', padding: '0.9rem 1rem' }}>{TOTAL_JF_RIAU.totalNotYetMembers}</td>
                <td style={{ textAlign: 'right', padding: '0.9rem 1rem' }}>{totalRatioByLetter}</td>
                <td colSpan={2} style={{ textAlign: 'center', color: '#64748B', fontSize: '0.78125rem' }}>
                  13 Entitas Resmi
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Kelola Personel & Kepengurusan (Supabase) */}
      <RegionStructurePanel />
    </div>
  );
}
