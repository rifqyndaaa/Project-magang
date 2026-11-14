import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from "../../components/Icon";
import { getCategoryDetails } from '../../data/categories';
import { filterReports } from "../../services/storage";

const DAY = 1000 * 60 * 60 * 24;

function ageLabel(isoString) {
  const diff = Date.now() - new Date(isoString).getTime();
  const days = Math.floor(diff / DAY);
  if (days <= 0) return 'Hari ini';
  if (days === 1) return '1 hari';
  return `${days} hari`;
}

/**
 * Verifikasi & Penanganan — antrean kerja dua kolom.
 * Kolom kiri: pengajuan baru yang perlu diverifikasi.
 * Kolom kanan: pengajuan yang sedang ditangani.
 * Semua data berasal dari penyimpanan yang sama dengan portal publik.
 */
export default function AdminPenanganan() {
  const [, setVersion] = useState(0);

  const baru = filterReports({ status: 'Baru' });
  const diproses = filterReports({ status: 'Diproses' });

  const load = () => setVersion(v => v + 1);

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
                {report.name} &middot; {catObj ? catObj.name : report.category}
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
            Antrean kerja petugas. Pengajuan baru perlu diverifikasi, kemudian dipindahkan ke
            tahap penanganan. Setiap perubahan status tercatat pada riwayat pelapor.
          </p>
        </div>
        <div className="adx-page-head__actions">
          <button type="button" className="adx-btn" onClick={load}>
            <Icon name="refresh" size={14} color="currentColor" />
            <span>Segarkan</span>
          </button>
        </div>
      </header>

      <div className="adx-queue">
        <section className="adx-queue__col">
          <div className="adx-queue__head">
            <h2 className="adx-queue__title">Perlu Verifikasi</h2>
            <span className="adx-queue__count">{baru.length}</span>
          </div>
          {renderQueue(baru, 'baru', 'Tidak ada pengajuan yang menunggu verifikasi.')}
        </section>

        <section className="adx-queue__col">
          <div className="adx-queue__head adx-queue__head--proses">
            <h2 className="adx-queue__title">Sedang Ditangani</h2>
            <span className="adx-queue__count">{diproses.length}</span>
          </div>
          {renderQueue(diproses, 'proses', 'Tidak ada pengajuan dalam proses penanganan.')}
        </section>
      </div>
    </div>
  );
}
