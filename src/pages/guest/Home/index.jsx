import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from "../../../components/Icon";
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [ticketInput, setTicketInput] = useState('');
  const [ticketError, setTicketError] = useState('');
  const [showTicketHelp, setShowTicketHelp] = useState(false);
  const [heroSearch, setHeroSearch] = useState('');

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    const cleanTicket = ticketInput.trim();
    if (!cleanTicket) {
      setTicketError('Silakan masukkan nomor tiket pengaduan.');
      return;
    }
    setTicketError('');
    navigate(`/track?ticket=${encodeURIComponent(cleanTicket)}`);
  };

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    const q = heroSearch.trim();
    if (!q) return;
    if (/^riau/i.test(q) || /^\d{4}/.test(q)) {
      navigate(`/track?ticket=${encodeURIComponent(q)}`);
      return;
    }
    const lower = q.toLowerCase();
    if (lower.includes('hukum') || lower.includes('perda') || lower.includes('sengketa')) {
      navigate('/report?category=hukum');
    } else if (lower.includes('aduan') || lower.includes('lapor') || lower.includes('keluh')) {
      navigate('/report?category=pengaduan');
    } else if (lower.includes('narasumber') || lower.includes('undang') || lower.includes('pemateri')) {
      navigate('/report?category=narasumber');
    } else if (lower.includes('lacak') || lower.includes('tiket')) {
      navigate(`/track?ticket=${encodeURIComponent(q)}`);
    } else {
      navigate(`/layanan?q=${encodeURIComponent(q)}`);
    }
  };

  return (
    <div className="home-page">

      {/* ============================================================
          HERO SECTION — FULLSCREEN RIAU STYLE (referensi PCR)
          ============================================================ */}
      <section className="home-hero" aria-labelledby="hero-heading">
        {/* Background image aerial Pekanbaru / Jembatan Siak */}
        <div className="home-hero__bg" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1920&q=80"
            alt=""
            className="home-hero__bg-img"
            loading="eager"
          />
          <div className="home-hero__overlay" />
        </div>

        {/* Konten Hero */}
        <div className="home-hero__container">
          {/* Tagline atas */}
          <div className="home-hero__eyebrow">
            <span className="home-hero__eyebrow-slash">// </span>
            IKATAN FUNGSIONAL PENGADAAN INDONESIA — DPW RIAU
          </div>

          {/* Judul Utama */}
          <h1 id="hero-heading" className="home-hero__title">
            Dewan Pengurus Wilayah<br />
            Ikatan Fungsional Pengadaan Indonesia<br />
            Provinsi Riau
          </h1>

          {/* Deskripsi */}
          <p className="home-hero__desc">
            Wadah resmi organisasi profesi pengadaan barang/jasa pemerintah
            untuk konsultasi regulasi hukum, penanganan aduan, dan permohonan narasumber kedinasan.
          </p>

          {/* Tombol Aksi */}
          <div className="home-hero__actions">
            <Link to="/report" className="home-hero__btn home-hero__btn--primary">
              Mulai Sampaikan Permohonan
              <Icon name="arrow-right" size={16} />
            </Link>
            <Link to="/track" className="home-hero__btn home-hero__btn--outline">
              Lacak Status Laporan
            </Link>
          </div>

          {/* Akses Cepat */}
          <div className="home-hero__chips">
            <Link to="/report?category=pengaduan" className="home-hero__chip">
              <Icon name="message-circle" size={13} />
              Konsultasi Pengaduan
            </Link>
            <Link to="/report?category=hukum" className="home-hero__chip">
              <Icon name="shield" size={13} />
              Konsultasi Hukum
            </Link>
            <Link to="/report?category=narasumber" className="home-hero__chip">
              <Icon name="users" size={13} />
              Narasumber &amp; Undangan
            </Link>
            <Link to="/track" className="home-hero__chip">
              <Icon name="search" size={13} />
              Lacak Tiket
            </Link>
          </div>
        </div>

        {/* Panel Info Kanan */}
        <div className="home-hero__panel">
          <div className="home-hero__panel-header">
            <div className="home-hero__panel-icon">
              <Icon name="shield" size={18} color="var(--ifpi-red)" />
            </div>
            <div>
              <h2 className="home-hero__panel-title">Sekretariat Layanan IFPI</h2>
              <span className="home-hero__panel-sub">Pengadaan Barang / Jasa Pemerintah</span>
            </div>
          </div>

          <div className="home-hero__panel-body">
            <div className="home-hero__panel-row">
              <span className="home-hero__panel-label">Jam Pelayanan Verifikator:</span>
              <span className="home-hero__panel-val">Senin – Jumat, 08.00 – 16.00 WIB</span>
            </div>
            <div className="home-hero__panel-row">
              <span className="home-hero__panel-label">Penerimaan Formulir Online:</span>
              <span className="home-hero__panel-val">
                <span className="home-hero__live-dot" aria-hidden="true" />
                Aktif 24 Jam Setiap Hari
              </span>
            </div>
            <div className="home-hero__panel-row">
              <span className="home-hero__panel-label">Kanal Pengaduan Cepat:</span>
              <span className="home-hero__panel-val">Call Center 112 / (0761) 31256</span>
            </div>
          </div>

          <div className="home-hero__panel-actions">
            <Link to="/report" className="home-hero__panel-btn-primary">
              Mulai Sampaikan Permohonan
            </Link>
            <Link to="/track" className="home-hero__panel-btn-secondary">
              Lacak Status Laporan
            </Link>
          </div>

          <div className="home-hero__panel-footer">
            <Icon name="map-pin" size={12} color="#D97706" />
            <span>Provinsi Riau, Indonesia</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="home-hero__scroll-hint" aria-hidden="true">
          <span className="home-hero__scroll-line" />
        </div>
      </section>

      {/* ============================================================
          LACAK LAPORAN
          ============================================================ */}
      <section className="home-track" aria-labelledby="track-heading">
        <div className="home-container">
          <div className="home-track__box">
            <div className="home-track__left">
              <Icon name="search" size={28} color="var(--ifpi-red)" />
              <div>
                <h2 id="track-heading" className="home-track__title">Sudah Menyampaikan Laporan?</h2>
                <p className="home-track__desc">
                  Gunakan nomor tiket untuk mengetahui perkembangan laporan Anda.
                </p>
              </div>
            </div>
            <form onSubmit={handleTrackSubmit} className="home-track__form">
              <input
                type="text"
                className="home-track__input"
                placeholder="Contoh: Riau-2026-000001"
                value={ticketInput}
                onChange={(e) => { setTicketInput(e.target.value); if (ticketError) setTicketError(''); }}
                aria-label="Nomor tiket pengaduan"
              />
              <button type="submit" className="home-track__btn">Lacak</button>
            </form>
          </div>
          {ticketError && <p className="home-track__error" role="alert">{ticketError}</p>}
          <div className="home-track__help-row">
            <button
              type="button"
              className="home-track__help-btn"
              onClick={() => setShowTicketHelp(p => !p)}
            >
              <Icon name="help-circle" size={14} />
              Cara menemukan nomor tiket?
            </button>
            <Link to="/track" className="home-track__full-link">
              Halaman Pelacakan Lengkap →
            </Link>
          </div>
          {showTicketHelp && (
            <div className="home-track__help-box" role="region" aria-live="polite">
              <p>
                <strong>Nomor tiket</strong> diterbitkan otomatis saat formulir laporan Anda berhasil dikirim
                (format: <code>Riau-2026-000001</code>). Nomor ini juga tercantum di halaman Tanda Terima.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================
          VIDEO RIAU — EMBED YOUTUBE PROFIL PROVINSI RIAU
          ============================================================ */}
      <section className="home-video" aria-labelledby="video-heading">
        <div className="home-container">
          <div className="home-section-intro">
            <span className="home-section-eyebrow">Tentang Kami</span>
            <h2 id="video-heading" className="home-section-title">
              Mengenal Provinsi Riau
            </h2>
            <p className="home-section-desc">
              Provinsi Riau — tanah yang kaya budaya, sumber daya, dan semangat pembangunan.
              IFPI berkomitmen melayani pengadaan barang/jasa pemerintah secara profesional di Bumi Lancang Kuning.
            </p>
          </div>

          <div className="home-video__wrapper">
            <div className="home-video__frame-wrap">
              <iframe
                className="home-video__iframe"
                src="https://www.youtube.com/embed/5SdXKrAKFYA?rel=0&modestbranding=1&showinfo=0"
                title="Profil Provinsi Riau"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>

            <div className="home-video__info">
              <div className="home-video__badge">
                <Icon name="map-pin" size={14} color="var(--ifpi-red)" />
                Provinsi Riau
              </div>
              <h3 className="home-video__info-title">
                Bumi Lancang Kuning — Tanah Melayu yang Kaya
              </h3>
              <p className="home-video__info-text">
                Riau adalah provinsi dengan kekayaan alam luar biasa di pesisir timur Sumatera.
                Sebagai salah satu daerah penghasil minyak dan kelapa sawit terbesar,
                Riau terus berbenah mewujudkan tata kelola pemerintahan yang bersih dan akuntabel.
              </p>
              <ul className="home-video__facts">
                <li>
                  <span className="home-video__fact-num">12</span>
                  <span className="home-video__fact-label">Kabupaten/Kota</span>
                </li>
                <li>
                  <span className="home-video__fact-num">9,2 Jt</span>
                  <span className="home-video__fact-label">Penduduk</span>
                </li>
                <li>
                  <span className="home-video__fact-num">87.844</span>
                  <span className="home-video__fact-label">km² Luas Wilayah</span>
                </li>
              </ul>
              <Link to="/informasi" className="home-video__link">
                Pelajari Lebih Lanjut →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          LAYANAN PENGADUAN
          ============================================================ */}
      <section className="home-services" aria-labelledby="services-heading">
        <div className="home-container">
          <div className="home-section-intro">
            <span className="home-section-eyebrow">Layanan Kami</span>
            <h2 id="services-heading" className="home-section-title">
              Layanan Pengaduan &amp; Konsultasi
            </h2>
            <p className="home-section-desc">
              Pilih kategori laporan yang sesuai dengan permasalahan atau aspirasi yang ingin Anda sampaikan.
            </p>
          </div>

          <div className="home-services__grid">
            {/* 01 */}
            <article className="home-service-card">
              <div className="home-service-card__num">01</div>
              <div className="home-service-card__icon-wrap">
                <Icon name="shield" size={28} color="var(--ifpi-red)" />
              </div>
              <h3 className="home-service-card__title">Permasalahan dan Konsultasi Hukum</h3>
              <p className="home-service-card__text">
                Konsultasi regulasi daerah, penelaahan produk hukum, bantuan penyelesaian sengketa,
                dan fasilitasi penyuluhan kepatuhan hukum.
              </p>
              <Link to="/report?category=hukum" className="home-service-card__link">
                Ajukan Layanan <Icon name="arrow-right" size={14} />
              </Link>
            </article>

            {/* 02 */}
            <article className="home-service-card">
              <div className="home-service-card__num">02</div>
              <div className="home-service-card__icon-wrap">
                <Icon name="message-circle" size={28} color="var(--ifpi-red)" />
              </div>
              <h3 className="home-service-card__title">Konsultasi Terkait Pengaduan</h3>
              <p className="home-service-card__text">
                Konsultasi prosedur pengaduan, konfirmasi progres laporan, pencegahan maladministrasi,
                dan fasilitasi tindak lanjut aduan.
              </p>
              <Link to="/report?category=pengaduan" className="home-service-card__link">
                Ajukan Layanan <Icon name="arrow-right" size={14} />
              </Link>
            </article>

            {/* 03 */}
            <article className="home-service-card">
              <div className="home-service-card__num">03</div>
              <div className="home-service-card__icon-wrap">
                <Icon name="users" size={28} color="var(--ifpi-red)" />
              </div>
              <h3 className="home-service-card__title">Permintaan Narasumber dan Undangan</h3>
              <p className="home-service-card__text">
                Permohonan pimpinan atau pejabat sebagai narasumber, pemateri seminar,
                fasilitator pelatihan, atau undangan resmi kedinasan.
              </p>
              <Link to="/report?category=narasumber" className="home-service-card__link">
                Ajukan Layanan <Icon name="arrow-right" size={14} />
              </Link>
            </article>
          </div>

          <div className="home-services__footer">
            <Link to="/layanan" className="home-services__all-link">
              Lihat Semua Layanan →
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          CARA MENYAMPAIKAN LAPORAN
          ============================================================ */}
      <section className="home-steps" aria-labelledby="steps-heading">
        <div className="home-container">
          <div className="home-section-intro">
            <span className="home-section-eyebrow">Panduan</span>
            <h2 id="steps-heading" className="home-section-title">
              Bagaimana Cara Menyampaikan Laporan?
            </h2>
          </div>

          <div className="home-steps__row">
            {[
              { num: '01', title: 'Pilih Kategori', desc: 'Pilih jenis laporan yang sesuai dengan kebutuhan Anda.' },
              { num: '02', title: 'Isi Laporan', desc: 'Jelaskan permasalahan secara jelas dan lengkap.' },
              { num: '03', title: 'Kirim Laporan', desc: 'Periksa kembali informasi sebelum mengirimkan.' },
              { num: '04', title: 'Tunggu Tindak Lanjut', desc: 'Petugas akan memproses laporan Anda.' },
            ].map((step) => (
              <div key={step.num} className="home-step">
                <div className="home-step__num">{step.num}</div>
                <h3 className="home-step__title">{step.title}</h3>
                <p className="home-step__desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          KOMITMEN INTEGRITAS
          ============================================================ */}
      <section className="home-commitment" aria-labelledby="commitment-heading">
        <div className="home-container">
          <div className="home-commitment__inner">
            <div className="home-commitment__icon">
              <Icon name="shield" size={40} color="#fff" />
            </div>
            <h2 id="commitment-heading" className="home-commitment__title">
              Komitmen Pengadaan Bersih, Kredibel &amp; Akuntabel
            </h2>
            <p className="home-commitment__text">
              IFPI berdedikasi membangun kapasitas pengelola pengadaan, menegakkan kepatuhan regulasi,
              serta memfasilitasi perlindungan hukum bagi aparatur pengadaan yang berintegritas.
            </p>
            <div className="home-commitment__actions">
              <Link to="/report" className="home-commitment__btn home-commitment__btn--white">
                Ajukan Permohonan
              </Link>
              <Link to="/kontak" className="home-commitment__btn home-commitment__btn--outline">
                Hubungi Sekretariat
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
