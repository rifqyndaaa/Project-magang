import { Link } from 'react-router-dom';
import Icon from "../../components/Icon";
import { RIAU_REGIONS_DATA } from '../../data/regionsData';

/**
 * Wilayah — table pandangan data 12 kabupaten/kota beserta status DPC.
 * Read-only: sumber data tetap src/data/regionsData.js.
 */
export default function AdminWilayah() {
  const totalDpc = RIAU_REGIONS_DATA.filter(r => r.isAvailable).length;

  return (
    <div>
      <header className="adx-page-head">
        <div className="adx-page-head__main">
          <span className="adx-page-head__eyebrow">Data Organisasi</span>
          <h1 className="adx-page-head__title">Wilayah &amp; DPC</h1>
          <p className="adx-page-head__desc">
            Sepuluh kabupaten dan dua kota di Provinsi Riau. Dari {RIAU_REGIONS_DATA.length} wilayah,
            {' '}{totalDpc} telah memiliki kepengurusan DPC resmi.
          </p>
        </div>
        <div className="adx-page-head__actions">
          <Link to="/wilayah" target="_blank" rel="noopener noreferrer" className="adx-btn">
            <Icon name="external-link" size={14} color="currentColor" />
            <span>Lihat di Portal</span>
          </Link>
        </div>
      </header>

      <section className="adx-panel">
        <div className="adx-table-scroll">
          <table className="adx-table">
            <thead>
              <tr>
                <th>Wilayah</th>
                <th>Jenis</th>
                <th>Ibu Kota</th>
                <th>Kecamatan / Desa</th>
                <th>Status DPC</th>
              </tr>
            </thead>
            <tbody>
              {RIAU_REGIONS_DATA.map((region) => (
                <tr key={region.id}>
                  <td>
                    <span className="adx-person__name">{region.name}</span>
                  </td>
                  <td style={{ textTransform: 'capitalize' }}>{region.type}</td>
                  <td>{region.capital}</td>
                  <td className="adx-person__contact" style={{ fontFamily: 'inherit' }}>{region.districts}</td>
                  <td>
                    {region.isAvailable ? (
                      <span className="adx-tag adx-tag--on">Aktif</span>
                    ) : (
                      <span className="adx-tag adx-tag--off">Konsolidasi</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
