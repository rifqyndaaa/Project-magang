import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Organization.css';
import { ORG_METADATA, KETUA, PENGURUS_INTI, DIVISI } from '../../../data/orgData';
import Icon from "../../../components/Icon";
import PageHeader from "../../../components/PageHeader";

/**
 * Ekstraksi inisial nama atau singkatan jabatan untuk avatar fallback
 */
function getInitials(name, fallback = 'IFPI') {
  if (!name) return fallback.slice(0, 2).toUpperCase();
  const words = name
    .replace(/[^a-zA-Z\s]/g, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return 'IF';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/**
 * Komponen Avatar Foto Berbentuk Lingkaran
 */
function AvatarCircle({ foto, nama, fallback, sizeClass }) {
  const hasPhoto = Boolean(foto && foto.trim());
  const initials = getInitials(nama, fallback);

  return (
    <div className={`org-avatar-ring ${sizeClass ? `${sizeClass}__avatar-ring` : ''}`}>
      <div className="org-avatar-inner">
        {hasPhoto ? (
          <img
            src={foto}
            alt={nama || 'Foto Pengurus'}
            className="org-avatar-img"
            loading="lazy"
          />
        ) : (
          <div className="org-avatar-placeholder" aria-label={nama || "Foto belum tersedia"}>
            {nama ? (
              <span className="org-avatar-initials">{initials}</span>
            ) : (
              <Icon name="user" size={sizeClass === "org-card--ketua" ? 36 : 24} color="var(--ifpi-red)" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Kartu Profil Setiap Pengurus pada Bagan Pohon
 */
function ProfileCard({ data, variant = 'anggota' }) {
  const isFilled = Boolean(data.nama && data.nama.trim());

  return (
    <Link
      to={`/struktur/${data.id}`}
      className={`org-profile-card org-card--${variant}`}
      aria-label={`Buka halaman profil ${data.jabatan}: ${data.nama || 'Nama belum tersedia'}`}
      title="Buka rincian profil di halaman baru"
    >
      {/* Icon indikator interaksi hover */}
      <span className="org-card-hover-pill" aria-hidden="true">
        <Icon name="arrow-right" size={11} />
      </span>

      {/* Foto Profil Berbentuk Lingkaran */}
      <AvatarCircle
        foto={data.foto}
        nama={data.nama}
        fallback={data.jabatan}
        sizeClass={`org-card--${variant}`}
      />

      {/* Nama Lengkap Pengurus */}
      <div className={`org-card-name ${isFilled ? '' : 'org-card-name--empty'}`}>
        {isFilled ? data.nama : 'Nama belum tersedia'}
      </div>

      {/* Jabatan Organisasi */}
      <div className="org-card-jabatan-badge">
        {data.jabatan}
      </div>
    </Link>
  );
}

/**
 * Kartu Profil Pengurus untuk Tampilan Vertikal (Mobile-Friendly List)
 */
function MobileMemberCard({ data, isLeader = false, isKoordinator = false }) {
  const isFilled = Boolean(data.nama && data.nama.trim());

  return (
    <Link
      to={`/struktur/${data.id}`}
      className={`org-mob-card ${isLeader ? 'is-leader' : ''} ${isKoordinator ? 'is-koordinator' : ''}`}
      aria-label={`Buka detail ${data.nama || data.jabatan}`}
    >
      <div className="org-mob-card__avatar">
        <AvatarCircle
          foto={data.foto}
          nama={data.nama}
          fallback={data.jabatan}
          sizeClass="org-mob-avatar"
        />
      </div>

      <div className="org-mob-card__content">
        <div className="org-mob-card__role">
          {data.jabatan}
        </div>
        <div className={`org-mob-card__name ${isFilled ? '' : 'is-empty'}`}>
          {isFilled ? data.nama : 'Nama belum diisi'}
        </div>
        {data.jabatanFungsional && (
          <div className="org-mob-card__meta">
            {data.jabatanFungsional}
          </div>
        )}
      </div>

      <div className="org-mob-card__action" aria-hidden="true">
        <Icon name="chevron-right" size={16} />
      </div>
    </Link>
  );
}

/**
 * Komponen Garis Vertikal
 */
function VLine({ height = 28 }) {
  return (
    <div
      className="org-vline"
      style={{ height: `${height}px` }}
      aria-hidden="true"
    />
  );
}

/**
 * Halaman Utama Struktur Organisasi (Bagan Hierarki & Tampilan Mobile)
 */
export default function Organization() {
  const [viewMode, setViewMode] = useState('chart'); // 'chart' | 'list'
  const [activeDivisionTab, setActiveDivisionTab] = useState(DIVISI[0].id);
  const scrollWrapperRef = useRef(null);

  // Lebar bus divisi: 5 kolom x (lebar kolom + gap)
  const colWidth = 200;
  const colGap = 18;
  const totalDivisionsWidth = colWidth * 5 + colGap * 4; // ~1072px

  // Auto-center posisi horizontal scroll bagan saat pertama kali dibuka pada layar mobile/tablet
  useEffect(() => {
    if (viewMode === 'chart' && scrollWrapperRef.current) {
      const wrapper = scrollWrapperRef.current;
      // Beri sedikit jeda agar DOM terukur sempurna
      const timer = setTimeout(() => {
        const target = (wrapper.scrollWidth - wrapper.clientWidth) / 2;
        if (target > 0) {
          wrapper.scrollTo({ left: target, behavior: 'smooth' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [viewMode]);

  // Tombol pintas geser bagan pada layar mobile
  const handleScrollTo = (pos) => {
    if (!scrollWrapperRef.current) return;
    const wrapper = scrollWrapperRef.current;
    if (pos === 'left') {
      wrapper.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (pos === 'center') {
      const target = (wrapper.scrollWidth - wrapper.clientWidth) / 2;
      wrapper.scrollTo({ left: target, behavior: 'smooth' });
    } else if (pos === 'right') {
      wrapper.scrollTo({ left: wrapper.scrollWidth, behavior: 'smooth' });
    }
  };

  const currentDivisi = DIVISI.find((d) => d.id === activeDivisionTab) || DIVISI[0];

  return (
    <div className="pg">
      <div className="gov-container">
        {/* Header Halaman Publik */}
        <PageHeader
          eyebrow="Tata Kelola Organisasi Resmi"
          title={<>Struktur <em>Organisasi</em></>}
          lede="Bagan hierarki kepengurusan resmi DPW IFPI Provinsi Riau masa bakti 2027–2032. Klik pada setiap kartu profil untuk membuka halaman rincian biodata dan tugas pokok."
          meta={[
            { label: 'Masa Bakti', value: '2027–2032' },
            { label: 'Pengurus Inti', value: '3 Jabatan' },
            { label: 'Divisi Bidang', value: '5 Divisi' },
          ]}
        />

        <div className="pg-body">
          {/* Toggle Pilihan Tampilan: Bagan Pohon vs Mode Daftar Vertikal */}
          <div className="org-view-toggle-bar">
            <div className="org-view-toggle-group" role="tablist" aria-label="Pilihan Model Tampilan Organisasi">
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'chart'}
                className={`org-view-toggle-btn ${viewMode === 'chart' ? 'is-active' : ''}`}
                onClick={() => setViewMode('chart')}
              >
                <Icon name="git-branch" size={15} />
                <span>Bagan Hierarki</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'list'}
                className={`org-view-toggle-btn ${viewMode === 'list' ? 'is-active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <Icon name="list" size={15} />
                <span>Daftar Vertikal</span>
              </button>
            </div>
          </div>

          {/* Petunjuk Interaksi pada Mode Bagan */}
          {viewMode === 'chart' && (
            <div className="org-hint-bar" role="note">
              <Icon name="arrow-right" size={14} color="var(--ifpi-red)" />
              <span>Klik profil pengurus untuk membuka halaman detail &amp; tugas pokok.</span>
            </div>
          )}
        </div>

        {/* ================================================================
            TAMPILAN 1: BAGAN POHON LENGKAP (HORIZONTAL SCROLLABLE)
            ================================================================ */}
        {viewMode === 'chart' && (
          <div className="org-chart-viewport">
            {/* Navigasi Cepat Geser Bagan Khusus Mobile / Tablet */}
            <div className="org-mobile-scroll-nav" aria-label="Navigasi cepat geser bagan">
              <div className="org-mobile-scroll-hint">
                <Icon name="move" size={13} color="var(--ifpi-red)" />
                <span>Geser ke samping untuk melihat seluruh divisi:</span>
              </div>
              <div className="org-mobile-scroll-btns">
                <button
                  type="button"
                  className="org-scroll-nav-btn"
                  onClick={() => handleScrollTo('left')}
                  title="Geser ke Divisi 1 & 2"
                >
                  ◀ Divisi 1–2
                </button>
                <button
                  type="button"
                  className="org-scroll-nav-btn is-center"
                  onClick={() => handleScrollTo('center')}
                  title="Pusatkan posisi ke Ketua DPW"
                >
                  • Ketua DPW
                </button>
                <button
                  type="button"
                  className="org-scroll-nav-btn"
                  onClick={() => handleScrollTo('right')}
                  title="Geser ke Divisi 4 & 5"
                >
                  Divisi 4–5 ▶
                </button>
              </div>
            </div>

            {/* Area Bagan dengan Horizontal Scroll */}
            <div className="org-scroll-wrapper" ref={scrollWrapperRef}>
              <div className="org-chart-canvas">

                {/* Judul Dokumen Bagan Formal */}
                <div className="org-doc-header">
                  <div className="org-doc-logo-title">
                    <Icon name="award" size={20} color="var(--ifpi-red)" />
                    <h2 className="org-doc-title-main">{ORG_METADATA.title}</h2>
                  </div>
                  <p className="org-doc-title-sub">{ORG_METADATA.province}</p>
                  <p className="org-doc-title-period">{ORG_METADATA.period}</p>
                </div>

                {/* ==================================================
                    TINGKAT 1: KETUA (Tengah Atas)
                    ================================================== */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <ProfileCard
                    data={KETUA}
                    variant="ketua"
                  />

                  {/* Garis Vertikal turun dari Ketua */}
                  <VLine height={34} />

                  {/* ==================================================
                      TINGKAT 2: BENDAHARA & SEKRETARIS I (Sejajar)
                      ================================================== */}
                  <div className="org-t2-wrapper">
                    {/* Garis Horizontal Penghubung Bendahara & Sekretaris */}
                    <div className="org-t2-horizontal-line" aria-hidden="true" />

                    <div className="org-t2-row">
                      {/* Kolom Kiri: BENDAHARA */}
                      <div className="org-t2-col">
                        <VLine height={30} />
                        <ProfileCard
                          data={PENGURUS_INTI[0]}
                          variant="t2"
                        />
                      </div>

                      {/* Kolom Kanan: SEKRETARIS I */}
                      <div className="org-t2-col">
                        <VLine height={30} />
                        <ProfileCard
                          data={PENGURUS_INTI[1]}
                          variant="t2"
                        />
                      </div>
                    </div>

                    {/* Garis Vertikal turun dari tengah tingkat 2 ke 5 divisi */}
                    <VLine height={42} />
                  </div>

                  {/* ==================================================
                      TINGKAT 3: LIMA DIVISI BERJAJAR HORIZONTAL
                      ================================================== */}
                  <div className="org-divisi-section">
                    {/* Horizontal Busbar Utama Penghubung 5 Divisi */}
                    <div
                      className="org-divisi-horizontal-bus"
                      style={{ width: `${totalDivisionsWidth}px` }}
                      aria-hidden="true"
                    />

                    {/* Grid 5 Kolom Divisi */}
                    <div className="org-divisi-grid">
                      {DIVISI.map((divisi) => (
                        <div key={divisi.id} className="org-divisi-col">
                          {/* Garis Vertikal dari Busbar ke Banner Header Divisi */}
                          <VLine height={30} />

                          {/* Banner Nama Divisi */}
                          <div className="org-divisi-header-badge" title={divisi.deskripsi}>
                            <div className="org-divisi-code">{divisi.kode}</div>
                            <h3 className="org-divisi-name">{divisi.nama}</h3>
                          </div>

                          {/* Garis ke Koordinator */}
                          <VLine height={22} />

                          {/* Koordinator & Anggota dalam Stack Vertikal */}
                          <div className="org-divisi-stack">
                            {divisi.anggota.map((member, mIdx) => {
                              const isKoordinator = member.jabatan.toLowerCase().includes('koordinator');
                              return (
                                <div key={member.id} className="org-member-connector">
                                  {mIdx > 0 && <VLine height={18} />}
                                  <ProfileCard
                                    data={member}
                                    variant={isKoordinator ? 'koordinator' : 'anggota'}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        )}

        {/* ================================================================
            TAMPILAN 2: MODE DAFTAR VERTIKAL (SANGAT NYAMAN DI LAYAR HP)
            ================================================================ */}
        {viewMode === 'list' && (
          <div className="org-mob-view-container">

            {/* 1. TINGKAT PERTAMA: KETUA DPW */}
            <div className="org-mob-section">
              <div className="org-mob-section__header">
                <span className="org-mob-section__tier-pill">Tingkat I</span>
                <h2 className="org-mob-section__title">Ketua DPW IFPI Riau</h2>
              </div>

              <div className="org-mob-hero-card">
                <div className="org-mob-hero-card__top">
                  <div className="org-mob-hero-card__avatar-wrap">
                    <AvatarCircle
                      foto={KETUA.foto}
                      nama={KETUA.nama}
                      fallback="Ketua"
                      sizeClass="org-mob-hero"
                    />
                  </div>
                  <div className="org-mob-hero-card__meta">
                    <span className="org-mob-hero-card__badge">{KETUA.jabatan}</span>
                    <h3 className="org-mob-hero-card__name">{KETUA.nama}</h3>
                    {KETUA.jabatanFungsional && (
                      <p className="org-mob-hero-card__fungsional">{KETUA.jabatanFungsional}</p>
                    )}
                    {KETUA.unitKerja && (
                      <p className="org-mob-hero-card__unit">{KETUA.unitKerja}</p>
                    )}
                  </div>
                </div>

                <div className="org-mob-hero-card__footer">
                  <Link to={`/struktur/${KETUA.id}`} className="org-mob-btn-detail">
                    <span>Lihat Biodata &amp; Profil Lengkap</span>
                    <Icon name="arrow-right" size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* 2. TINGKAT KEDUA: BENDAHARA & SEKRETARIS */}
            <div className="org-mob-section">
              <div className="org-mob-section__header">
                <span className="org-mob-section__tier-pill">Tingkat II</span>
                <h2 className="org-mob-section__title">Pengurus Inti (Bendahara &amp; Sekretaris)</h2>
              </div>

              <div className="org-mob-cards-grid">
                {PENGURUS_INTI.map((pejabat) => (
                  <MobileMemberCard
                    key={pejabat.id}
                    data={pejabat}
                    isLeader={true}
                  />
                ))}
              </div>
            </div>

            {/* 3. TINGKAT KETIGA: LIMA DIVISI OPERASIONAL */}
            <div className="org-mob-section">
              <div className="org-mob-section__header">
                <span className="org-mob-section__tier-pill">Tingkat III</span>
                <h2 className="org-mob-section__title">Lima Divisi Bidang</h2>
              </div>

              {/* Tab Selector Divisi (Horizontal Scrollable pada HP) */}
              <div className="org-mob-tabs-scroll" role="tablist" aria-label="Daftar Divisi">
                {DIVISI.map((divisi) => {
                  const isActive = divisi.id === currentDivisi.id;
                  return (
                    <button
                      key={divisi.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`org-mob-tab-btn ${isActive ? 'is-active' : ''}`}
                      onClick={() => setActiveDivisionTab(divisi.id)}
                    >
                      <span className="org-mob-tab-btn__code">{divisi.kode}</span>
                      <span className="org-mob-tab-btn__name">{divisi.nama.replace(/^Divisi\s+[IVX]+\s*—\s*/, '')}</span>
                    </button>
                  );
                })}
              </div>

              {/* Rincian Divisi Terpilih */}
              <div className="org-mob-divisi-panel" role="tabpanel">
                <div className="org-mob-divisi-card-header">
                  <div className="org-mob-divisi-card-header__code">
                    {currentDivisi.kode}
                  </div>
                  <div>
                    <h3 className="org-mob-divisi-card-header__title">
                      {currentDivisi.nama}
                    </h3>
                    <p className="org-mob-divisi-card-header__desc">
                      {currentDivisi.deskripsi}
                    </p>
                  </div>
                </div>

                {/* Daftar Koordinator & Anggota */}
                <div className="org-mob-divisi-members">
                  <h4 className="org-mob-members-subtitle">
                    <Icon name="users" size={14} color="var(--ifpi-red)" />
                    Susunan Personalia Divisi
                  </h4>

                  <div className="org-mob-cards-list">
                    {currentDivisi.anggota.map((member) => {
                      const isKoordinator = member.jabatan.toLowerCase().includes('koordinator');
                      return (
                        <MobileMemberCard
                          key={member.id}
                          data={member}
                          isKoordinator={isKoordinator}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
