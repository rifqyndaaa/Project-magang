import { Link } from 'react-router-dom';
import Icon from "../../components/Icon";
import { ORG_METADATA, KETUA, PENGURUS_INTI, DIVISI } from '../../data/orgData';

/**
 * Struktur Organisasi — pembacaan data kepengurusan yang sama dengan portal
 * publik. Halaman ini bersifat baca-saja: sumber data tunggal tetap di
 * src/data/orgData.js agar tidak terjadi duplikasi data.
 */
export default function AdminOrganisasi() {
  const totalAnggota =
    1 + PENGURUS_INTI.length + DIVISI.reduce((sum, d) => sum + d.anggota.length, 0);

  return (
    <div>
      <header className="adx-page-head">
        <div className="adx-page-head__main">
          <span className="adx-page-head__eyebrow">Data Organisasi</span>
          <h1 className="adx-page-head__title">Struktur Organisasi</h1>
          <p className="adx-page-head__desc">
            {ORG_METADATA.description} Total {totalAnggota} pengurus pada {DIVISI.length} divisi.
          </p>
        </div>
        <div className="adx-page-head__actions">
          <Link to="/struktur" target="_blank" rel="noopener noreferrer" className="adx-btn">
            <Icon name="external-link" size={14} color="currentColor" />
            <span>Lihat di Portal</span>
          </Link>
        </div>
      </header>

      <section className="adx-panel" style={{ marginBottom: '1.25rem' }}>
        <div className="adx-panel__head">
          <h2 className="adx-panel__title">Pimpinan &amp; Pengurus Inti</h2>
          <span className="adx-panel__meta">{ORG_METADATA.period}</span>
        </div>
        <ul className="adx-list">
          <li className="adx-list__row" style={{ gridTemplateColumns: 'minmax(0,1fr) 180px' }}>
            <div className="adx-list__main">
              <p className="adx-list__title">{KETUA.nama}</p>
              <p className="adx-list__sub">{KETUA.jabatanLengkap} &middot; {KETUA.jabatanFungsional}</p>
            </div>
            <span className="adx-list__value">{KETUA.jabatan}</span>
          </li>
          {PENGURUS_INTI.map((p) => (
            <li key={p.id} className="adx-list__row" style={{ gridTemplateColumns: 'minmax(0,1fr) 180px' }}>
              <div className="adx-list__main">
                <p className="adx-list__title">{p.nama}</p>
                <p className="adx-list__sub">{p.jabatanLengkap}</p>
              </div>
              <span className="adx-list__value">
                {p.foto ? <span className="adx-tag adx-tag--on">Foto ada</span> : <span className="adx-tag adx-tag--off">Tanpa foto</span>}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="adx-panel">
        <div className="adx-panel__head">
          <h2 className="adx-panel__title">Divisi</h2>
          <span className="adx-panel__meta">{DIVISI.length} divisi</span>
        </div>
        <ul className="adx-list">
          {DIVISI.map((div) => (
            <li key={div.id} className="adx-list__row" style={{ gridTemplateColumns: 'minmax(0,1fr) 120px' }}>
              <div className="adx-list__main">
                <p className="adx-list__title">{div.namaLengkap}</p>
                <p className="adx-list__sub">{div.deskripsi}</p>
              </div>
              <span className="adx-list__value">{div.anggota.length} anggota</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
