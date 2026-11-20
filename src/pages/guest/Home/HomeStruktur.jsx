import Icon from '../../../components/Icon';
import { BAGIAN, BIRO_METADATA, KEPALA_BIRO } from '../../../data/biroStruktur';
import './HomeStruktur.css';

/**
 * HomeStruktur — bagan ringkas Struktur Organisasi Biro Pengadaan Barang dan
 * Jasa Setdaprov Riau di Beranda.
 *
 * Berdiri sendiri, TIDAK terkait dengan struktur kepengurusan DPW IFPI
 * (orgData.js). Hanya tiga kotak: satu Kepala Biro di puncak, dua unit kerja
 * sejajar di bawahnya. Data diambil dari src/data/biroStruktur.js.
 */

function inisial(nama) {
  return (nama || '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

function Foto({ orang, besar }) {
  if (!orang.foto && !orang.nama) return null;

  return (
    <div className={`hst-foto ${besar ? 'hst-foto--besar' : ''}`}>
      {orang.foto ? (
        <img
          src={orang.foto}
          alt={`Foto ${orang.nama}`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <span className="hst-foto__inisial" aria-hidden="true">
          {inisial(orang.nama)}
        </span>
      )}
    </div>
  );
}

function Nama({ orang, kecil }) {
  const kelas = `hst-name ${kecil ? 'hst-name--kecil' : ''}`;
  if (orang.nama) return <h3 className={kelas}>{orang.nama}</h3>;
  return <h3 className={`${kelas} hst-name--kosong`}>Nama pejabat belum tersedia</h3>;
}

export default function HomeStruktur() {
  return (
    <section className="hst" aria-labelledby="hst-heading">
      <div className="home-container">
        <div className="hst-head">
          <div>
            <span className="home-section-eyebrow">Struktur Organisasi</span>
            <h2 id="hst-heading" className="home-section-title">
              Struktur Organisasi Biro Pengadaan Barang dan Jasa
            </h2>
          </div>
          <p className="hst-head__lede">
            Susunan pimpinan {BIRO_METADATA.nama} {BIRO_METADATA.induk}: satu kepala biro
            sebagai penentu arah, didampingi dua unit kerja yang bekerja sejajar.
          </p>
        </div>

        <div className="hst-chart">
          {/* Puncak — Kepala Biro */}
          <div className="hst-level hst-level--puncak">
            <article className="hst-card hst-card--ketua">
              <Foto orang={KEPALA_BIRO} besar />
              <div className="hst-card__body">
                <span className="hst-role">{KEPALA_BIRO.jabatan}</span>
                <Nama orang={KEPALA_BIRO} />
                {KEPALA_BIRO.jabatanFungsional && (
                  <p className="hst-detail">{KEPALA_BIRO.jabatanFungsional}</p>
                )}
                {KEPALA_BIRO.unitKerja && <p className="hst-unit">{KEPALA_BIRO.unitKerja}</p>}
              </div>
            </article>
          </div>

          {/* Garis penghubung */}
          <div className="hst-connector" aria-hidden="true">
            <span className="hst-connector__stem" />
            <span className="hst-connector__bar" />
            <span className="hst-connector__drop hst-connector__drop--left" />
            <span className="hst-connector__drop hst-connector__drop--right" />
          </div>

          {/* Dua unit sejajar */}
          <div className={`hst-level hst-level--sejajar hst-level--${BAGIAN.length}`}>
            {BAGIAN.map((unit) => (
              <article className="hst-card" key={unit.id}>
                <Foto orang={unit} />
                <div className="hst-card__body">
                  <span className="hst-role">{unit.jabatan}</span>
                  <Nama orang={unit} kecil />
                  {unit.unit && <p className="hst-detail">{unit.unit}</p>}
                  {unit.keterangan && <p className="hst-unit">{unit.keterangan}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="hst-foot">
          <a
            className="hst-foot__link"
            href={BIRO_METADATA.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Sumber: SOTK &amp; laman resmi {BIRO_METADATA.nama}</span>
            <Icon name="arrow-right" size={14} color="currentColor" />
          </a>
        </div>
      </div>
    </section>
  );
}
