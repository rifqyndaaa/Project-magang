import { Link } from 'react-router-dom';
import Icon from "../../components/Icon";
import { PROGRAM_KERJA_DATA, AGENDA_DATA, GALERI_DATA } from '../../data/activitiesData';

/**
 * Kegiatan — ringkasan program kerja, agenda, dan galeri dokumentasi.
 * Read-only, memakai data yang sama dengan portal publik.
 */
export default function AdminKegiatan() {
  return (
    <div>
      <header className="adx-page-head">
        <div className="adx-page-head__main">
          <span className="adx-page-head__eyebrow">Data Organisasi</span>
          <h1 className="adx-page-head__title">Kegiatan</h1>
          <p className="adx-page-head__desc">
            Program kerja, agenda kegiatan, dan galeri dokumentasi DPW IFPI Provinsi Riau.
          </p>
        </div>
        <div className="adx-page-head__actions">
          <Link to="/kegiatan" target="_blank" rel="noopener noreferrer" className="adx-btn">
            <Icon name="external-link" size={14} color="currentColor" />
            <span>Lihat di Portal</span>
          </Link>
        </div>
      </header>

      <section className="adx-kpis" style={{ marginBottom: '1.25rem' }}>
        <div className="adx-kpi adx-kpi--total">
          <span className="adx-kpi__label">Program Kerja</span>
          <span className="adx-kpi__value">{PROGRAM_KERJA_DATA.length}</span>
          <span className="adx-kpi__note">Rencana strategis divisi</span>
        </div>
        <div className="adx-kpi adx-kpi--baru">
          <span className="adx-kpi__label">Agenda Terjadwal</span>
          <span className="adx-kpi__value">{AGENDA_DATA.length}</span>
          <span className="adx-kpi__note">Rakerwil, bimtek, forum</span>
        </div>
        <div className="adx-kpi adx-kpi--proses">
          <span className="adx-kpi__label">Dokumentasi</span>
          <span className="adx-kpi__value">{GALERI_DATA.length}</span>
          <span className="adx-kpi__note">Foto kegiatan resmi</span>
        </div>
        <div className="adx-kpi adx-kpi--selesai">
          <span className="adx-kpi__label">Program Berjalan</span>
          <span className="adx-kpi__value">
            {PROGRAM_KERJA_DATA.filter(p => p.status === 'Berjalan').length}
          </span>
          <span className="adx-kpi__note">Status pelaksanaan aktif</span>
        </div>
      </section>

      <section className="adx-panel" style={{ marginBottom: '1.25rem' }}>
        <div className="adx-panel__head">
          <h2 className="adx-panel__title">Program Kerja</h2>
          <span className="adx-panel__meta">{PROGRAM_KERJA_DATA.length} program</span>
        </div>
        <ul className="adx-list">
          {PROGRAM_KERJA_DATA.map((prog) => (
            <li key={prog.id} className="adx-list__row" style={{ gridTemplateColumns: 'minmax(0,1fr) 200px' }}>
              <div className="adx-list__main">
                <p className="adx-list__title">{prog.nama}</p>
                <p className="adx-list__sub">{prog.divisi} &middot; {prog.periode}</p>
              </div>
              <span className="adx-list__value">
                <span className={prog.status === 'Berjalan' ? 'adx-tag adx-tag--on' : 'adx-tag adx-tag--off'}>
                  {prog.status}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="adx-panel">
        <div className="adx-panel__head">
          <h2 className="adx-panel__title">Agenda Terjadwal</h2>
          <span className="adx-panel__meta">{AGENDA_DATA.length} agenda</span>
        </div>
        <ul className="adx-list">
          {AGENDA_DATA.map((agenda) => (
            <li key={agenda.id} className="adx-list__row" style={{ gridTemplateColumns: 'minmax(0,1fr) 180px' }}>
              <div className="adx-list__main">
                <p className="adx-list__title">{agenda.nama}</p>
                <p className="adx-list__sub">{agenda.kategori} &middot; {agenda.lokasi}</p>
              </div>
              <span className="adx-list__value">{agenda.tanggal}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
