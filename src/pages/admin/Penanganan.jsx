import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from "../../components/Icon";
import { getCategoryDetails } from '../../data/categories';
import { filterReports, syncReportsFromSupabase } from "../../services/storage";

const DAY = 1000 * 60 * 60 * 24;

function ageLabel(isoString) {
  const diff = Date.now() - new Date(isoString).getTime();
  const days = Math.floor(diff / DAY);
  if (days <= 0) return 'Hari ini';
  if (days === 1) return '1 hari lalu';
  return `${days} hari lalu`;
}

/**
 * Verifikasi & Penanganan — antrean kerja dua kolom resmi.
 */
export default function AdminPenanganan() {
  const [, setVersion] = useState(0);

  useEffect(() => {
    syncReportsFromSupabase().then(() => {
      setVersion(v => v + 1);
    });
  }, []);

  const baru = filterReports({ status: 'Baru' });
  const diproses = filterReports({ status: 'Diproses' });

  const load = () => {
    syncReportsFromSupabase().then(() => {
      setVersion(v => v + 1);
    });
  };

  const renderQueue = (items, tone, emptyText) => (
    <ul className="adx-queue__list">
      {items.map((report) => {
        const catObj = getCategoryDetails(report.category);
        return (
          <li key={report.id}>
            <Link to={`/admin/report/${report.id}`} className="adx-queue__item">
              <div className="adx-queue__row">
                <span className="adx-queue__ticket">{report.ticketNumber}</span>
                <span className="adx-queue__age">{ageLabel(report.createdAt)}</span>
              </div>
              <div className="adx-queue__title2">{report.title}</div>
              <div className="adx-queue__sub">
                <strong>{report.name}</strong> &middot; {catObj ? catObj.name : report.category} &middot; <span style={{ color: 'var(--adx-ink)' }}>{report.region || 'Provinsi Riau'}</span>
              </div>
            </Link>
          </li>
        );
      })}
      {items.length === 0 && <li className="adx-queue__empty">{emptyText}</li>}
    </ul>
  );

  return (
    <div>
      <header className="adx-page-head">
        <div className="adx-page-head__main">
          <span className="adx-page-head__eyebrow">Pengelolaan Layanan</span>
          <h1 className="adx-page-head__title">Verifikasi &amp; Penanganan</h1>
          <p className="adx-page-head__desc">
            Antrean kerja tindak lanjut pengajuan. Verifikasi keabsahan laporan baru, tetapkan bidang penanganan, dan berikan tanggapan resmi institusi.
          </p>
        </div>
        <div className="adx-page-head__actions">
          <button type="button" className="adx-btn adx-btn--primary" onClick={load}>
            <Icon name="refresh" size={14} color="currentColor" />
            <span>Segarkan Antrean</span>
          </button>
        </div>
      </header>

      {/* Ringkasan Ringkas Antrean */}
      <div className="adx-kpis" style={{ marginBottom: '1.5rem', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
        <div className="adx-kpi adx-kpi--baru">
          <span className="adx-kpi__label">Menunggu Verifikasi</span>
          <span className="adx-kpi__value">{baru.length}</span>
          <span className="adx-kpi__note">Pengajuan baru masuk</span>
        </div>
        <div className="adx-kpi adx-kpi--proses">
          <span className="adx-kpi__label">Sedang Ditangani</span>
          <span className="adx-kpi__value">{diproses.length}</span>
          <span className="adx-kpi__note">Dalam proses tindak lanjut</span>
        </div>
      </div>

      <div className="adx-queue">
        <section className="adx-queue__col">
          <div className="adx-queue__head">
            <h2 className="adx-queue__title">Perlu Verifikasi (Baru)</h2>
            <span className="adx-queue__count">{baru.length}</span>
          </div>
          {renderQueue(baru, 'baru', 'Tidak ada pengajuan yang menunggu verifikasi saat ini.')}
        </section>

        <section className="adx-queue__col">
          <div className="adx-queue__head adx-queue__head--proses">
            <h2 className="adx-queue__title">Sedang Ditangani (Diproses)</h2>
            <span className="adx-queue__count">{diproses.length}</span>
          </div>
          {renderQueue(diproses, 'proses', 'Tidak ada pengajuan dalam proses penanganan saat ini.')}
        </section>
      </div>
    </div>
  );
}
