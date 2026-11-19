import { useState } from 'react';
import Icon from './Icon';
import { formatTanggal, hostnameOf, initialOf } from '../services/articleStorage';
import './BerandaArtikel.css';

/**
 * BerandaArtikel — section "Artikel & Informasi" di halaman Beranda.
 *
 * Konsep: pratinjau tautan seperti link yang dibagikan di aplikasi pesan,
 * tetapi ditata ulang secara editorial: satu informasi utama, sisanya
 * tersusun rapi sebagai daftar bergaris tipis. Tanpa gradien, tanpa bayangan,
 * merah IFPI hanya sebagai aksen.
 *
 * Sisanya ditampilkan lewat tombol "Lihat Selengkapnya" yang memperluas
 * daftar di tempat (tanpa berpindah halaman).
 */

function Sumber({ article }) {
  const sumber = article.sumber || hostnameOf(article.url) || 'Informasi IFPI';
  return (
    <div className="bart-source">
      <span className="bart-source__name">{sumber}</span>
      {article.tanggal && (
        <>
          <span className="bart-source__dot" aria-hidden="true">·</span>
          <time dateTime={article.tanggal}>{formatTanggal(article.tanggal)}</time>
        </>
      )}
    </div>
  );
}

function Thumb({ article, variant }) {
  const className = `bart-thumb bart-thumb--${variant}`;
  if (article.thumbnail) {
    return (
      <div className={className}>
        <img
          src={article.thumbnail}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
    );
  }
  return (
    <div className={`${className} bart-thumb--plain`} aria-hidden="true">
      <span>{initialOf(article.sumber || hostnameOf(article.url) || 'IFPI')}</span>
    </div>
  );
}

function FeaturedItem({ article }) {
  const href = article.url || '#';
  return (
    <article className="bart-featured">
      <a
        className="bart-featured__media"
        href={href}
        {...(article.url ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <Thumb article={article} variant="featured" />
      </a>

      <div className="bart-featured__body">
        <span className="bart-kicker">Informasi Utama</span>
        <h3 className="bart-featured__title">
          <a
            href={href}
            {...(article.url ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {article.judul}
          </a>
        </h3>
        <Sumber article={article} />
        {article.ringkasan && <p className="bart-featured__summary">{article.ringkasan}</p>}
        {article.url && (
          <a
            className="bart-readmore"
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Baca di sumber asli</span>
            <Icon name="arrow-right" size={13} color="currentColor" />
          </a>
        )}
      </div>
    </article>
  );
}

function ListItem({ article }) {
  const href = article.url || '#';
  return (
    <li className="bart-item">
      <a
        className="bart-item__link"
        href={href}
        {...(article.url ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <Thumb article={article} variant="list" />
        <span className="bart-item__body">
          <span className="bart-item__title">{article.judul}</span>
          <Sumber article={article} />
        </span>
      </a>
    </li>
  );
}

export default function BerandaArtikel({ articles = [] }) {
  const [expanded, setExpanded] = useState(false);

  const list = Array.isArray(articles) ? articles : [];
  const featured = list[0];
  const rest = list.slice(1);

  // Tampilkan dua informasi pendamping di samping informasi utama;
  // sisanya dibuka lewat "Lihat Selengkapnya" — tetap di Beranda.
  const VISIBLE_SIDE = 2;
  const visible = expanded ? rest : rest.slice(0, VISIBLE_SIDE);
  const hasHidden = rest.length > visible.length;

  return (
    <section className="bart" aria-labelledby="bart-heading">
      <div className="home-container">
        <div className="bart-head">
          <div>
            <span className="home-section-eyebrow">Artikel &amp; Informasi</span>
            <h2 id="bart-heading" className="home-section-title">
              Kabar Pengadaan Barang/Jasa
            </h2>
            <p className="bart-head__lede">
              Tautan berita, regulasi, dan bahan bacaan pengadaan yang kami himpun dari sumber
              resmi. Setiap entri mencantumkan sumber aslinya.
            </p>
          </div>
        </div>

        {list.length === 0 ? (
          <p className="bart-empty">
            Belum ada informasi yang diterbitkan. Tautan berita dan bahan bacaan pengadaan akan
            tampil pada bagian ini setelah dipublikasikan melalui panel petugas.
          </p>
        ) : (
          <div className="bart-layout">
            <FeaturedItem article={featured} />

            {visible.length > 0 && (
              <ul className="bart-list">
                {visible.map((a) => (
                  <ListItem key={a.id} article={a} />
                ))}
              </ul>
            )}
          </div>
        )}

        {(hasHidden || expanded) && (
          <div className="bart-more">
            <button
              type="button"
              className="bart-more__btn"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
            >
              <span>{expanded ? 'Tutup' : 'Lihat Selengkapnya'}</span>
              <Icon
                name={expanded ? 'chevron-up' : 'chevron-down'}
                size={14}
                color="currentColor"
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
