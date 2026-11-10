import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/common/Icon';

export default function Home() {
  const navigate = useNavigate();
  const [ticketInput, setTicketInput] = useState('');
  const [ticketError, setTicketError] = useState('');
  const [showTicketHelp, setShowTicketHelp] = useState(false);

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

  return (
    <div className="gov-guest-page">
      {/* ==================================================
          2. HERO SECTION (DARK IMMERSIVE CIVIC BANNER)
          ================================================== */}
      <section className="gov-hero-dark-section" aria-labelledby="hero-heading">
        <div className="gov-container">
          <div className="gov-hero-dark-grid">
            {/* Kolom Kiri: Teks & Aksi */}
            <div className="gov-hero-dark-content">
              <div className="gov-hero-dark-eyebrow">
                <span className="gov-hero-eyebrow-line" />
                <span className="gov-hero-eyebrow-text">LAYANAN PENGADUAN MASYARAKAT</span>
              </div>

              <h1 id="hero-heading" className="gov-hero-dark-title">
                Sampaikan Aspirasi
                <span className="gov-hero-title-accent">dan Pengaduan Anda.</span>
              </h1>

              <p className="gov-hero-dark-desc">
                Sampaikan laporan, keluhan, dan aspirasi terkait pelayanan publik di Provinsi Riau. Kanal terpadu resmi untuk menjembatani komunikasi masyarakat dan pemerintah daerah.
              </p>

              <div className="gov-hero-dark-actions">
                <Link to="/report" className="gov-hero-btn-primary" id="btn-hero-mulai-lapor">
                  <span>Mulai Sampaikan Laporan</span>
                  <Icon name="arrow-right" size={16} />
                </Link>
                <Link to="/track" className="gov-hero-btn-secondary" id="btn-hero-lacak-laporan">
                  <span>Lacak Laporan</span>
                </Link>
              </div>
            </div>

            {/* Kolom Kanan: Floating Info Cards over Background Image */}
            <div className="gov-hero-dark-visual">
              {/* Floating Card 1: Kategori Layanan */}
              <div className="gov-hero-float-card gov-hero-float-1">
                <div className="gov-float-icon-wrap">
                  <Icon name="shield" size={18} />
                </div>
                <div className="gov-float-info">
                  <span className="gov-float-label">LAYANAN RESMI</span>
                  <span className="gov-float-val">3 Kategori Utama</span>
                </div>
              </div>

              {/* Floating Card 2: Pemantauan Tiket */}
              <div className="gov-hero-float-card gov-hero-float-2">
                <div className="gov-float-icon-wrap">
                  <Icon name="file-check" size={18} />
                </div>
                <div className="gov-float-info">
                  <span className="gov-float-label">PEMANTAUAN TIKET</span>
                  <span className="gov-float-val">Online 24/7</span>
                </div>
              </div>

              {/* Floating Card 3: Tindak Lanjut OPD */}
              <div className="gov-hero-float-card gov-hero-float-3">
                <div className="gov-float-icon-wrap gov-float-icon-star">
                  <Icon name="check-circle" size={18} />
                </div>
                <div className="gov-float-info">
                  <span className="gov-float-label">TINDAK LANJUT</span>
                  <span className="gov-float-val">OPD Pemprov Riau</span>
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
                    Ajukan permohonan &rarr;
                  </Link>
                  <span className="gov-service-divider" aria-hidden="true">&bull;</span>
                  <Link to="/categories" className="gov-service-sub-link">
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
                    Ajukan permohonan &rarr;
                  </Link>
                  <span className="gov-service-divider" aria-hidden="true">&bull;</span>
                  <Link to="/categories" className="gov-service-sub-link">
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
                    Ajukan permohonan &rarr;
                  </Link>
                  <span className="gov-service-divider" aria-hidden="true">&bull;</span>
                  <Link to="/categories" className="gov-service-sub-link">
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
          8. STATISTIK
          ================================================== */}
      <section className="gov-stats-section" aria-labelledby="stats-heading">
        <div className="gov-container">
          <h2 id="stats-heading" className="gov-visually-hidden">
            Ringkasan Statistik Laporan
          </h2>

          {/* 
            Catatan Pengembang:
            Data di bawah ini merupakan data ringkasan prototype / placeholder resmi.
            Ketika backend dan database API sudah terhubung, ganti nilai statis ini 
            dengan nilai riil dari endpoint API statistik (misal: GET /api/stats).
          */}
          <div className="gov-stats-grid">
            <div className="gov-stat-item">
              <div className="gov-stat-value">1.250+</div>
              <div className="gov-stat-label">Laporan Diterima</div>
            </div>

            <div className="gov-stat-item">
              <div className="gov-stat-value">270+</div>
              <div className="gov-stat-label">Sedang Diproses</div>
            </div>

            <div className="gov-stat-item">
              <div className="gov-stat-value">980+</div>
              <div className="gov-stat-label">Telah Diselesaikan</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          9. CTA TERAKHIR
          ================================================== */}
      <section className="gov-final-cta-section" aria-labelledby="final-cta-heading">
        <div className="gov-container">
          <div className="gov-final-cta-inner">
            <h2 id="final-cta-heading" className="gov-final-cta-title">
              Temukan Permasalahan, Sampaikan Laporan
            </h2>
            <p className="gov-final-cta-desc">
              Partisipasi masyarakat membantu meningkatkan kualitas pelayanan publik.
            </p>
            <div className="gov-final-cta-action">
              <Link to="/report" className="gov-btn-primary gov-btn-large">
                Mulai Sampaikan Laporan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
