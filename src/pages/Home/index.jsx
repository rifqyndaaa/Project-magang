import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/common/Icon';
import LiveClock from '../../components/common/LiveClock';

export default function Home() {
  const navigate = useNavigate();
  const [ticketInput, setTicketInput] = useState('');
  const [ticketError, setTicketError] = useState('');
  const [showTicketHelp, setShowTicketHelp] = useState(false);
  const [heroSearch, setHeroSearch] = useState('');
  const [activeLandmark, setActiveLandmark] = useState('siak'); // 'siak' | 'annur'

  // Handler Lacak Laporan Cepat
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

  // Handler Pencarian Hero (Model Jabarprov)
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
    <div className="gov-guest-page">
      {/* ==================================================
          2. HERO SECTION (PORTAL RESMI PEMERINTAH PROVINSI RIAU)
          ================================================== */}
      <section
        className={`gov-hero-jabar-section ${activeLandmark === 'annur' ? 'is-landmark-annur' : 'is-landmark-siak'}`}
        aria-labelledby="hero-heading"
      >
        <div className="gov-container">
          <div className="gov-hero-jabar-grid">
            {/* Kolom Kiri: Informasi Utama, Judul & Pencarian */}
            <div className="gov-hero-jabar-left">
              <div className="gov-hero-tag-civic">
                <span className="gov-hero-tag-gold-bar" aria-hidden="true" />
                <span>PEMERINTAH PROVINSI RIAU</span>
              </div>

              <h1 id="hero-heading" className="gov-hero-jabar-title">
                 Ikatan Fungsional Pengadaan Indonesia
              </h1>

              <p className="gov-hero-jabar-desc">
                Kanal resmi Pemerintah Daerah Provinsi Riau untuk menyampaikan permohonan konsultasi hukum, pengelolaan pengaduan pelayanan publik, serta koordinasi narasumber dan undangan kedinasan.
              </p>

              {/* Form Pencarian Resmi */}
              <form onSubmit={handleHeroSearchSubmit} className="gov-hero-search-box">
                <div className="gov-hero-search-inner">
                  <span className="gov-hero-search-icon-wrap" aria-hidden="true">
                    <Icon name="search" size={18} color="var(--neutral-500)" />
                  </span>
                  <input
                    type="text"
                    className="gov-hero-search-input"
                    placeholder="Cari layanan, panduan informasi, atau masukkan nomor tiket..."
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    aria-label="Cari layanan atau informasi publik"
                  />
                  <button type="submit" className="gov-hero-search-btn" id="btn-hero-cari">
                    Cari
                  </button>
                </div>
              </form>

              {/* Akses Cepat Layanan */}
              <div className="gov-hero-popular-chips">
                <span className="gov-popular-label">Akses cepat layanan resmi:</span>
                <div className="gov-chips-list">
                  <Link to="/report?category=pengaduan" className="gov-chip-item">
                    <span>Konsultasi Pengaduan</span>
                    <Icon name="arrow-right" size={12} />
                  </Link>
                  <Link to="/report?category=hukum" className="gov-chip-item">
                    <span>Konsultasi Hukum</span>
                    <Icon name="arrow-right" size={12} />
                  </Link>
                  <Link to="/report?category=narasumber" className="gov-chip-item">
                    <span>Narasumber &amp; Undangan</span>
                    <Icon name="arrow-right" size={12} />
                  </Link>
                  <Link to="/track" className="gov-chip-item">
                    <span>Lacak Tiket</span>
                    <Icon name="arrow-right" size={12} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Panel Informasi Resmi Pelayanan Publik */}
            <div className="gov-hero-jabar-right">
              <div className="gov-hero-official-panel">
                <div className="gov-panel-header">
                  <div className="gov-panel-header-icon" aria-hidden="true">
                    <Icon name="shield" size={18} color="var(--gov-blue)" />
                  </div>
                  <div>
                    <h2 className="gov-panel-title">Pusat Layanan Terpadu</h2>
                    <span className="gov-panel-subtitle">Provinsi Riau</span>
                  </div>
                </div>

                <div className="gov-panel-body">
                  <div className="gov-panel-info-row">
                    <span className="gov-panel-info-label">Jam Pelayanan Verifikator:</span>
                    <span className="gov-panel-info-val">Senin – Jumat, 08.00 – 16.00 WIB</span>
                  </div>

                  <div className="gov-panel-info-row">
                    <span className="gov-panel-info-label">Penerimaan Formulir Online:</span>
                    <span className="gov-panel-info-val">
                      <span className="gov-live-pulse-dot" aria-hidden="true" />
                      Aktif 24 Jam Setiap Hari
                    </span>
                  </div>

                  <div className="gov-panel-info-row">
                    <span className="gov-panel-info-label">Kanal Pengaduan Cepat:</span>
                    <span className="gov-panel-info-val">Call Center 112 / (0761) 31256</span>
                  </div>
                </div>

                <div className="gov-panel-actions">
                  <Link to="/report" className="gov-btn-panel-primary">
                    Mulai Sampaikan Permohonan
                  </Link>
                  <Link to="/track" className="gov-btn-panel-secondary">
                    Lacak Status Laporan
                  </Link>
                </div>

                {/* Pemilih Landmark Resmi */}
                <div className="gov-panel-landmark-footer">
                  <span className="gov-landmark-caption">
                    <Icon name="map-pin" size={12} color="#D97706" />
                    Latar Daerah:
                  </span>
                  <div className="gov-landmark-buttons">
                    <button
                      type="button"
                      className={`gov-landmark-btn ${activeLandmark === 'siak' ? 'is-active' : ''}`}
                      onClick={() => setActiveLandmark('siak')}
                    >
                      Istana Siak
                    </button>
                    <button
                      type="button"
                      className={`gov-landmark-btn ${activeLandmark === 'annur' ? 'is-active' : ''}`}
                      onClick={() => setActiveLandmark('annur')}
                    >
                      Masjid Raya An-Nur
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          3. LACAK LAPORAN
          ================================================== */}
      <section className="gov-track-section" aria-labelledby="track-heading">
        <div className="gov-container">
          <div className="gov-track-box">
            <div className="gov-track-header">
              <h2 id="track-heading" className="gov-track-title">
                Sudah Menyampaikan Laporan?
              </h2>
              <p className="gov-track-desc">
                Gunakan nomor tiket untuk mengetahui perkembangan laporan yang telah Anda sampaikan.
              </p>
            </div>

            <form onSubmit={handleTrackSubmit} className="gov-track-form">
              <div className="gov-track-input-group">
                <label htmlFor="input-nomor-tiket" className="gov-visually-hidden">
                  Nomor Tiket Pengaduan
                </label>
                <input
                  type="text"
                  id="input-nomor-tiket"
                  className="gov-track-input"
                  placeholder="Contoh: Riau-2026-000001"
                  value={ticketInput}
                  onChange={(e) => {
                    setTicketInput(e.target.value);
                    if (ticketError) setTicketError('');
                  }}
                  aria-invalid={ticketError ? 'true' : 'false'}
                />
                <button type="submit" className="gov-track-btn" id="btn-lacak-submit">
                  Lacak Laporan
                </button>
              </div>

              {ticketError && (
                <p className="gov-track-error-message" role="alert">
                  {ticketError}
                </p>
              )}

              <div className="gov-track-footer">
                <button
                  type="button"
                  className="gov-track-help-link"
                  onClick={() => setShowTicketHelp(prev => !prev)}
                  aria-expanded={showTicketHelp}
                >
                  <Icon name="help-circle" size={15} />
                  <span>Cara menemukan nomor tiket?</span>
                </button>

                <Link to="/track" className="gov-track-all-link">
                  Buka Halaman Pelacakan Lengkap &rarr;
                </Link>
              </div>

              {/* Bantuan Menemukan Tiket */}
              {showTicketHelp && (
                <div className="gov-track-help-content" role="region" aria-live="polite">
                  <p>
                    <strong>Nomor tiket</strong> diterbitkan secara otomatis oleh sistem saat Anda selesai mengirimkan formulir laporan pengaduan (contoh format: <code>Riau-2026-000001</code>).
                  </p>
                  <p>
                    Nomor tiket juga tercantum pada halaman <em>Tanda Terima Pendaftaran</em>. Jika Anda lupa atau kehilangan nomor tiket, Anda dapat memeriksa kembali riwayat bukti lapor atau membaca panduan di <Link to="/informasi">Halaman Informasi</Link>.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ==================================================
          4. LAYANAN PENGADUAN
          ================================================== */}
      <section className="gov-services-section" aria-labelledby="services-heading">
        <div className="gov-container">
          <div className="gov-section-intro">
            <h2 id="services-heading" className="gov-section-main-title">
              Layanan Pengaduan
            </h2>
            <p className="gov-section-main-desc">
              Pilih kategori laporan yang sesuai dengan permasalahan atau aspirasi yang ingin Anda sampaikan.
            </p>
          </div>

          <div className="gov-service-list">
            {/* 01: Permasalahan dan Konsultasi Hukum */}
            <article className="gov-service-item">
              <div className="gov-service-number" aria-hidden="true">01</div>
              <div className="gov-service-info">
                <h3 className="gov-service-name">Permasalahan dan Konsultasi Hukum</h3>
                <p className="gov-service-text">
                  Layanan konsultasi regulasi daerah, penelaahan produk hukum, bantuan penyelesaian sengketa perdata dan tata usaha negara, serta fasilitasi penyuluhan kepatuhan hukum.
                </p>
                <div className="gov-service-actions">
                  <Link to="/report?category=hukum" className="gov-service-action-link">
                    Ajukan Layanan &rarr;
                  </Link>
                  <span className="gov-service-divider" aria-hidden="true">&bull;</span>
                  <Link to="/layanan" className="gov-service-sub-link">
                    Lihat rincian layanan
                  </Link>
                </div>
              </div>
            </article>

            {/* 02: Konsultasi Terkait Pengaduan */}
            <article className="gov-service-item">
              <div className="gov-service-number" aria-hidden="true">02</div>
              <div className="gov-service-info">
                <h3 className="gov-service-name">Konsultasi Terkait Pengaduan</h3>
                <p className="gov-service-text">
                  Layanan konsultasi prosedur pengaduan masyarakat, konfirmasi dan klarifikasi progres laporan penanganan, konsultasi pencegahan maladministrasi, serta fasilitasi tindak lanjut.
                </p>
                <div className="gov-service-actions">
                  <Link to="/report?category=pengaduan" className="gov-service-action-link">
                    Ajukan Layanan &rarr;
                  </Link>
                  <span className="gov-service-divider" aria-hidden="true">&bull;</span>
                  <Link to="/layanan" className="gov-service-sub-link">
                    Lihat rincian layanan
                  </Link>
                </div>
              </div>
            </article>

            {/* 03: Permintaan Narasumber dan Undangan */}
            <article className="gov-service-item">
              <div className="gov-service-number" aria-hidden="true">03</div>
              <div className="gov-service-info">
                <h3 className="gov-service-name">Permintaan Narasumber dan Undangan</h3>
                <p className="gov-service-text">
                  Layanan permohonan kehadiran pimpinan atau pejabat daerah sebagai narasumber kegiatan, pemateri workshop/seminar, fasilitator pelatihan, serta penyampaian undangan resmi kedinasan.
                </p>
                <div className="gov-service-actions">
                  <Link to="/report?category=narasumber" className="gov-service-action-link">
                    Ajukan Layanan &rarr;
                  </Link>
                  <span className="gov-service-divider" aria-hidden="true">&bull;</span>
                  <Link to="/layanan" className="gov-service-sub-link">
                    Lihat rincian layanan
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ==================================================
          5. CARA MENYAMPAIKAN LAPORAN
          ================================================== */}
      <section className="gov-steps-section" aria-labelledby="steps-heading">
        <div className="gov-container">
          <div className="gov-section-intro">
            <h2 id="steps-heading" className="gov-section-main-title">
              Bagaimana Cara Menyampaikan Laporan?
            </h2>
            <p className="gov-section-main-desc">
              Empat tahapan sederhana untuk menyampaikan laporan atau aspirasi Anda kepada pemerintah daerah.
            </p>
          </div>

          <div className="gov-steps-row">
            {/* Step 01 */}
            <div className="gov-step-col">
              <div className="gov-step-num">01</div>
              <h3 className="gov-step-title">Pilih Kategori</h3>
              <p className="gov-step-desc">Pilih jenis laporan yang sesuai.</p>
            </div>

            {/* Step 02 */}
            <div className="gov-step-col">
              <div className="gov-step-num">02</div>
              <h3 className="gov-step-title">Isi Laporan</h3>
              <p className="gov-step-desc">Jelaskan permasalahan secara jelas.</p>
            </div>

            {/* Step 03 */}
            <div className="gov-step-col">
              <div className="gov-step-num">03</div>
              <h3 className="gov-step-title">Kirim Laporan</h3>
              <p className="gov-step-desc">Periksa kembali informasi sebelum dikirim.</p>
            </div>

            {/* Step 04 */}
            <div className="gov-step-col">
              <div className="gov-step-num">04</div>
              <h3 className="gov-step-title">Tunggu Tindak Lanjut</h3>
              <p className="gov-step-desc">Petugas akan memproses laporan yang masuk.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          6. INFORMASI PENGADUAN
          ================================================== */}
      <section className="gov-info-section" aria-labelledby="info-heading">
        <div className="gov-container">
          <div className="gov-info-card">
            <h2 id="info-heading" className="gov-info-title">
              Informasi Sebelum Mengirim Laporan
            </h2>

            <ul className="gov-info-checklist">
              <li>Jelaskan permasalahan secara jelas.</li>
              <li>Cantumkan lokasi kejadian jika diperlukan.</li>
              <li>Gunakan judul laporan yang sesuai.</li>
              <li>Lampirkan foto atau bukti pendukung jika tersedia.</li>
              <li>Pastikan informasi yang diberikan benar.</li>
            </ul>

            <div className="gov-info-link-wrapper">
              <Link to="/informasi" className="gov-info-link">
                Lihat Panduan Pengaduan &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          7. KOMITMEN PELAYANAN
          ================================================== */}
      <section className="gov-commitment-section" aria-labelledby="commitment-heading">
        <div className="gov-container">
          <div className="gov-commitment-inner">
            <h2 id="commitment-heading" className="gov-commitment-title">
              Mendengar Aspirasi Masyarakat
            </h2>
            <p className="gov-commitment-text">
              Laporan dan aspirasi masyarakat merupakan bagian penting dalam upaya meningkatkan kualitas pelayanan publik di Provinsi Riau.
            </p>
            <p className="gov-commitment-supporting">
              Setiap laporan menjadi informasi bagi pemerintah untuk memahami permasalahan yang terjadi di lapangan.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          8. KANAL BANTUAN & LAYANAN TERPADU
          ================================================== */}
      <section className="gov-final-cta-section" aria-labelledby="final-cta-heading">
        <div className="gov-container">
          <div className="gov-final-cta-inner">
            <h2 id="final-cta-heading" className="gov-final-cta-title">
              Pemerintah Provinsi Riau Siap Mendengar &amp; Melayani
            </h2>
            <p className="gov-final-cta-desc">
              Sampaikan aspirasi dan konsultasi Anda melalui kanal pengaduan resmi atau hubungi Call Center 112 untuk bantuan cepat.
            </p>
            <div className="gov-final-cta-action">
              <Link to="/report" className="gov-btn gov-btn-primary">
                Ajukan Permohonan Sekarang
              </Link>
              <Link to="/kontak" className="gov-btn gov-btn-secondary" style={{ marginLeft: '0.75rem' }}>
                Hubungi Sekretariat
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
