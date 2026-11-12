import './Organization.css';
import { ORG_METADATA, KETUA, PENGURUS_INTI, DIVISI } from '../../../data/orgData';

/* ----------------------------------------------------------------
   Komponen Kotak Jabatan
   props: jabatan (string), nama (string|null), variant (string)
   ---------------------------------------------------------------- */
function OrgBox({ jabatan, nama, variant = '' }) {
  const hasName = nama && nama.trim().length > 0;
  return (
    <div className={`org-box ${variant ? `org-box--${variant}` : ''}`}>
      <div className="org-box__top">{jabatan}</div>
      <div className={`org-box__bot${hasName ? '' : ' org-box__bot--empty'}`}>
        {hasName ? nama : 'Nama belum tersedia'}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   Garis vertikal sederhana
   ---------------------------------------------------------------- */
function VLine({ height = 32 }) {
  return (
    <div
      style={{
        width: 'var(--org-line-width, 2px)',
        height: `${height}px`,
        background: 'var(--org-line, #555)',
        flexShrink: 0,
      }}
    />
  );
}

/* ----------------------------------------------------------------
   Komponen utama bagan
   ---------------------------------------------------------------- */
export default function Organization() {
  return (
    <section className="org-page">
      <div className="gov-container">
        {/* Header halaman */}
        <div className="org-page-header">
          <h1 className="org-page-title">
            Struktur <span className="org-title-accent">Organisasi</span>
          </h1>
          <p className="org-page-subtitle">
            Ikatan Fungsional Pengadaan Indonesia — Provinsi Riau
          </p>
          <p className="org-page-desc">
            Struktur Organisasi DPW Ikatan Fungsional Pengadaan Indonesia Provinsi Riau Masa Bakti 2027–2032.
          </p>
        </div>
      </div>

      {/* Wrapper horizontal scroll untuk mobile */}
      <div className="org-chart-wrapper">
        <div className="org-chart">

          {/* Judul bagan */}
          <div className="org-chart-title">
            <p className="title-main">{ORG_METADATA.title}</p>
            <p>{ORG_METADATA.province}</p>
            <p>{ORG_METADATA.period}</p>
          </div>

          {/* ========== LEVEL 1: KETUA ========== */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <OrgBox jabatan={KETUA.jabatan} nama={KETUA.nama} variant="ketua" />

            {/* Garis turun dari Ketua */}
            <VLine height={30} />

            {/* ========== LEVEL 2: BENDAHARA & SEKRETARIS ========== */}
            {/* Struktur SVG: horizontal bar + drop ke masing-masing */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              {/* Horizontal bar penghubung antara Bendahara dan Sekretaris */}
              <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                {/* Garis horizontal */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '340px',
                  height: 'var(--org-line-width, 2px)',
                  background: 'var(--org-line, #555)',
                }} />

                {/* Kolom kiri: BENDAHARA */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '0px' }}>
                  <VLine height={30} />
                  <OrgBox jabatan={PENGURUS_INTI[0].jabatan} nama={PENGURUS_INTI[0].nama} variant="t2" />
                </div>

                {/* Spacer */}
                <div style={{ width: '170px' }} />

                {/* Kolom kanan: SEKRETARIS I */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <VLine height={30} />
                  <OrgBox jabatan={PENGURUS_INTI[1].jabatan} nama={PENGURUS_INTI[1].nama} variant="t2" />
                </div>
              </div>

              {/* Garis turun dari tengah ke connector divisi */}
              <VLine height={36} />

              {/* ========== LEVEL 3: LIMA DIVISI ========== */}
              <DivisiLevel />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Komponen Level Divisi — 5 kolom berjajar
   ---------------------------------------------------------------- */
function DivisiLevel() {
  const count = DIVISI.length;
  const colWidth = 174; // lebar tiap kolom (px)
  const totalWidth = colWidth * count;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Horizontal bar panjang di atas 5 divisi */}
      <div style={{
        width: `${totalWidth}px`,
        height: 'var(--org-line-width, 2px)',
        background: 'var(--org-line, #555)',
        position: 'relative',
      }} />

      {/* Lima kolom divisi */}
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        {DIVISI.map((divisi, dIdx) => (
          <div
            key={dIdx}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: `${colWidth}px`,
            }}
          >
            {/* Garis turun dari bar ke header divisi */}
            <VLine height={30} />

            {/* Kotak Header Divisi */}
            <OrgBox
              jabatan={divisi.kode}
              nama={divisi.nama}
              variant="divisi"
            />

            {/* Daftar anggota divisi */}
            {divisi.anggota.map((anggota, aIdx) => (
              <div
                key={aIdx}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <VLine height={18} />
                <OrgBox
                  jabatan={anggota.jabatan}
                  nama={anggota.nama}
                  variant="anggota"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
