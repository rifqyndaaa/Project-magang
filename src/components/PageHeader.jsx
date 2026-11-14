import { Link } from 'react-router-dom';
import Icon from './Icon';

/**
 * PageHeader — kepala halaman editorial untuk halaman dalam.
 * Menggantikan pola "tag + judul + deskripsi" yang seragam dan datar.
 *
 * Props:
 *  - eyebrow  : label kecil di atas judul (uppercase)
 *  - title    : judul utama (string) — boleh berisi <em> untuk aksen merah
 *  - lede     : paragraf pengantar
 *  - meta     : array { label, value } untuk baris fakta singkat
 *  - action   : { to, label, icon } tombol aksi di kanan (opsional)
 */
export default function PageHeader({ eyebrow, title, lede, meta = [], action = null }) {
  return (
    <header className="pg-head">
      <div className="pg-head__grid">
        <div className="pg-head__inner">
          {eyebrow && <span className="pg-head__eyebrow">{eyebrow}</span>}
          <h1 className="pg-head__title">{title}</h1>
          {lede && <p className="pg-head__lede">{lede}</p>}

          {meta.length > 0 && (
            <dl className="pg-head__meta">
              {meta.map((m) => (
                <div key={m.label} className="pg-head__meta-item">
                  <dt>{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {action && (
          <div className="pg-head__aside">
            <Link to={action.to} className="pg-head__action">
              {action.icon && <Icon name={action.icon} size={15} />}
              <span>{action.label}</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
