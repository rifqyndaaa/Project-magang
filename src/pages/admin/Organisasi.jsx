import { Link } from 'react-router-dom';
import Icon from "../../components/Icon";
import { ORG_METADATA, KETUA, PENGURUS_INTI, DIVISI } from '../../data/orgData';

/**
 * Struktur Organisasi — pembacaan data kepengurusan DPW IFPI Riau.
 */
export default function AdminOrganisasi() {
  const totalAnggota =
    1 + PENGURUS_INTI.length + DIVISI.reduce((sum, d) => sum + d.anggota.length, 0);

  return (
    <div>
      <header className="adx-page-head">
        <div className="adx-page-head__main">
          <span className="adx-page-head__eyebrow">Data Organisasi</span>
          <h1 className="adx-page-head__title">Struktur Organisasi DPW IFPI</h1>
          <p className="adx-page-head__desc">
            {ORG_METADATA.description} Rekapitulasi pimpinan, pengurus harian, dan personel divisi kerja.
          </p>
        </div>
        <div className="adx-page-head__actions">
          <Link to="/struktur" target="_blank" rel="noopener noreferrer" className="adx-btn">
            <Icon name="external-link" size={14} color="currentColor" />
            <span>Lihat di Portal Publik</span>
          </Link>
        </div>
      </header>

      {/* Ringkasan Statistik Organisasi */}
      <div className="adx-kpis" style={{ marginBottom: '1.5rem' }}>
        <div className="adx-kpi adx-kpi--total">
          <span className="adx-kpi__label">Total Pengurus</span>
          <span className="adx-kpi__value">{totalAnggota}</span>
          <span className="adx-kpi__note">Seluruh personel terdata</span>
        </div>
        <div className="adx-kpi adx-kpi--baru">
          <span className="adx-kpi__label">Pengurus Harian</span>
          <span className="adx-kpi__value">{1 + PENGURUS_INTI.length}</span>
          <span className="adx-kpi__note">Ketua &amp; pengurus inti</span>
        </div>
        <div className="adx-kpi adx-kpi--proses">
          <span className="adx-kpi__label">Divisi Bidang</span>
          <span className="adx-kpi__value">{DIVISI.length}</span>
          <span className="adx-kpi__note">Unit kerja organisasi</span>
        </div>
        <div className="adx-kpi adx-kpi--selesai">
          <span className="adx-kpi__label">Masa Khidmat</span>
          <span className="adx-kpi__value" style={{ fontSize: '1.35rem' }}>{ORG_METADATA.period}</span>
          <span className="adx-kpi__note">Surat Keputusan Resmi</span>
        </div>
      </div>

      {/* Panel Pimpinan & Pengurus Inti */}
      <section className="adx-panel" style={{ marginBottom: '1.5rem' }}>
        <div className="adx-panel__head">
          <h2 className="adx-panel__title">Pimpinan &amp; Pengurus Inti</h2>
          <span className="adx-panel__meta">{ORG_METADATA.period}</span>
        </div>
        <ul className="adx-list">
          <li className="adx-list__row" style={{ gridTemplateColumns: 'minmax(0,1fr) 220px' }}>
            <div className="adx-list__main">
              <p className="adx-list__title" style={{ color: 'var(--adx-red)', fontWeight: 700 }}>
                {KETUA.nama}
              </p>
              <p className="adx-list__sub">
                {KETUA.jabatanLengkap} &middot; {KETUA.jabatanFungsional}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="adx-tag adx-tag--on">{KETUA.jabatan}</span>
            </div>
          </li>
          {PENGURUS_INTI.map((p) => (
            <li key={p.id} className="adx-list__row" style={{ gridTemplateColumns: 'minmax(0,1fr) 220px' }}>
              <div className="adx-list__main">
                <p className="adx-list__title">{p.nama}</p>
                <p className="adx-list__sub">{p.jabatanLengkap}</p>
              </div>
              <div style={{ textAlign: 'right', display: 'flex', gap: '0.4rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                <span className="adx-tag">{p.jabatan}</span>
                {p.foto ? (
                  <span className="adx-tag adx-tag--on">Foto Ada</span>
                ) : (
                  <span className="adx-tag adx-tag--off">Tanpa Foto</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Panel Divisi Organisasi */}
      <section className="adx-panel">
        <div className="adx-panel__head">
          <h2 className="adx-panel__title">Daftar Divisi &amp; Anggota</h2>
          <span className="adx-panel__meta">{DIVISI.length} divisi aktif</span>
        </div>
        <ul className="adx-list">
          {DIVISI.map((div) => (
            <li key={div.id} className="adx-list__row" style={{ gridTemplateColumns: 'minmax(0,1fr) 140px' }}>
              <div className="adx-list__main">
                <p className="adx-list__title">{div.namaLengkap}</p>
                <p className="adx-list__sub">{div.deskripsi}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="adx-tag adx-tag--on">{div.anggota.length} Personel</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
