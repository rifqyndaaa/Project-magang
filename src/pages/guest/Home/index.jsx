import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from "../../../components/Icon";
import './Home.css';

const FAQ_ITEMS = [
  {
    q: 'Bagaimana cara menyampaikan pengaduan melalui portal ini?',
    a: 'Warga cukup membuka menu "Layanan", mengisi data diri nama dan nomor WhatsApp aktif, memilih kategori permasalahan serta Kabupaten/Kota, menuliskan lokasi spesifik dan kronologi kejadian, melampirkan foto jika ada, lalu menekan tombol "Kirim Pengaduan". Setelah itu, sistem akan menerbitkan nomor tiket resmi.'
  },
  {
    q: 'Apakah identitas dan nomor kontak saya aman dari publik?',
    a: 'Sangat aman. Sistem kami menerapkan prinsip perlindungan data pribadi pelapor. Nama lengkap dan nomor kontak Anda hanya dapat diakses oleh petugas verifikator resmi untuk keperluan konfirmasi data lapangan, dan tidak akan pernah ditampilkan pada halaman pelacakan status tiket yang dapat diakses publik.'
  },
  {
    q: 'Bagaimana cara melacak tindak lanjut atas laporan saya?',
    a: 'Gunakan nomor tiket yang Anda terima saat mendaftar (contoh: Riau-2026-000001) pada fitur "Lacak Status Laporan" di beranda atau menu pelacakan. Di halaman tersebut, Anda dapat memantau setiap perubahan status mulai dari Baru Masuk, Terverifikasi, Sedang Diproses, Tindak Lanjut, hingga Selesai beserta tanggapan resmi dari dinas terkait.'
  },
  {
    q: 'Berapa lama laporan saya akan ditanggapi oleh instansi terkait?',
    a: 'Standar waktu verifikasi awal oleh tim verifikator adalah maksimal 1x24 jam kerja. Setelah diverifikasi dan diteruskan ke dinas teknis, telaah dan jadwal tindakan lapangan disampaikan dalam 3 hingga 7 hari kerja tergantung tingkat kedaruratan dan jenis permasalahan.'
  },
  {
    q: 'Apa saja 3 kategori layanan resmi yang dapat diajukan melalui portal ini?',
    a: 'Portal ini melayani 3 kategori resmi: (1) Permasalahan dan Konsultasi Hukum oleh Biro Hukum Setda Prov. Riau (regulasi daerah, sengketa perdata/TUN, dan telaah kerja sama), (2) Konsultasi Terkait Pengaduan oleh Inspektorat Daerah & Diskominfotik (prosedur aduan, verifikasi berkas, dan pencegahan maladministrasi), serta (3) Permintaan Narasumber dan Undangan oleh Biro Administrasi Pimpinan (permohonan narasumber acara, workshop, pemateri ahli, dan undangan kedinasan).'
  },
  {
    q: 'Apakah pengajuan pengaduan ini dipungut biaya?',
    a: 'Tidak sama sekali. Seluruh proses penyampaian laporan, verifikasi, hingga tindak lanjut penanganan oleh Pemerintah Provinsi Riau dan DPW IFPI Riau adalah 100% bebas biaya (gratis). Waspadai oknum yang mengatasnamakan dinas dan meminta imbalan uang.'
  },
  {
    q: 'Apa yang harus dilakukan jika saya lupa mencatat nomor tiket?',
    a: 'Jika Anda lupa mencatat nomor tiket, Anda dapat menghubungi layanan bantuan Helpdesk Diskominfotik Provinsi Riau melalui telepon (0761) 31256 pada jam kerja dengan menyebutkan nama pelapor dan tanggal perkiraan pengiriman laporan untuk dibantu pencarian data.'
  }
];

export default function Home() {
  const navigate = useNavigate();
  const [ticketInput, setTicketInput] = useState('');
  const [ticketError, setTicketError] = useState('');
  const [showTicketHelp, setShowTicketHelp] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Penanganan scroll otomatis saat membuka URL dengan anchor hash (#faq, #kontak, #panduan)
  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, []);

  const toggleAccordion = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

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
    <div className="home-page">

      {/* ============================================================
          1. HERO SECTION — FULLSCREEN IDENTITAS RESMI IFPI RIAU
          ============================================================ */}
      <section className="home-hero" aria-labelledby="hero-heading">
        {/* Background Landmark Asli Provinsi Riau: Jembatan Siak (Tengku Agung Sultanah Latifah) */}
        <div className="home-hero__bg" aria-hidden="true">
          <img
            src="/images/jembatan-siak.jpg"
            alt="Landmark Ikonik Jembatan Siak (Tengku Agung Sultanah Latifah) Provinsi Riau"
            className="home-hero__bg-img"
            width="1600"
            height="900"
            loading="eager"
            onError={(e) => {
              // Fallback cadangan landmark Riau
              e.target.src = '/images/istana-siak.jpg';
            }}
          />
          <div className="home-hero__overlay" />
        </div>

        {/* Konten Hero */}
        <div className="home-hero__container">
          <div className="home-hero__eyebrow">
            <span className="home-hero__eyebrow-slash">// </span>
            IKATAN FUNGSIONAL PENGADAAN INDONESIA — DPW RIAU
          </div>

          <h1 id="hero-heading" className="home-hero__title">
            Dewan Pengurus Wilayah<br />
            Ikatan Fungsional Pengadaan Indonesia<br />
            Provinsi Riau
          </h1>

          <p className="home-hero__desc">
            Wadah resmi organisasi profesi pengadaan barang/jasa pemerintah
            untuk konsultasi regulasi hukum, penanganan aduan, dan permohonan narasumber kedinasan.
          </p>

          <div className="home-hero__actions">
            <Link to="/report" className="home-hero__btn home-hero__btn--primary">
              Mulai Sampaikan Permohonan
              <Icon name="arrow-right" size={16} />
            </Link>
            <a href="#faq" className="home-hero__btn home-hero__btn--outline">
              Pusat Informasi &amp; FAQ
            </a>
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
            <a href="#kontak" className="home-hero__chip">
              <Icon name="phone" size={13} />
              Kontak Sekretariat
            </a>
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
              <span className="home-hero__panel-label">Pelayanan Petugas:</span>
              <span className="home-hero__panel-val">Senin – Jumat, 08.00 – 16.00 WIB</span>
            </div>
            <div className="home-hero__panel-row">
              <span className="home-hero__panel-label">Penerimaan Formulir:</span>
              <span className="home-hero__panel-val">
                <span className="home-hero__live-dot" aria-hidden="true" />
                Daring 24 Jam
              </span>
            </div>
          </div>

          <div className="home-hero__panel-actions">
            <Link to="/track" className="home-hero__panel-btn-secondary">
              Lacak Status Laporan
            </Link>
          </div>

          <div className="home-hero__panel-footer">
            <span>Provinsi Riau, Indonesia</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="home-hero__scroll-hint" aria-hidden="true">
          <span className="home-hero__scroll-line" />
        </div>
      </section>

      {/* ============================================================
          2. LACAK STATUS LAPORAN CEPAT
          ============================================================ */}
      <section className="home-track" aria-labelledby="track-heading">
        <div className="home-container">
          <div className="home-track__box">
            <div className="home-track__left">
              <Icon name="search" size={28} color="var(--ifpi-red)" />
              <div>
                <h2 id="track-heading" className="home-track__title">Sudah Menyampaikan Laporan?</h2>
                <p className="home-track__desc">
                  Gunakan nomor tiket resmi untuk mengetahui perkembangan dan tindak lanjut laporan Anda.
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
              <button type="submit" className="home-track__btn">Lacak Tiket</button>
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
                (format: <code>Riau-2026-000001</code>). Nomor ini juga tercantum di halaman Tanda Terima dan dikonfirmasikan oleh sistem.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================
          3. PROFIL ORGANISASI & MENGENAL PROVINSI RIAU
          ============================================================ */}
      <section className="home-video" aria-labelledby="video-heading">
        <div className="home-container">
          <div className="home-section-intro">
            <span className="home-section-eyebrow">Tentang Kami</span>
            <h2 id="video-heading" className="home-section-title">
              Mengenal Provinsi Riau &amp; Komitmen IFPI
            </h2>
            <p className="home-section-desc">
              Provinsi Riau — tanah yang kaya budaya, sumber daya, dan semangat pembangunan.
              IFPI berkomitmen mengawal pengadaan barang/jasa pemerintah secara profesional, transparan, dan akuntabel di Bumi Lancang Kuning.
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
                Bumi Lancang Kuning — Pengadaan Bersih &amp; Berintegritas
              </h3>
              <p className="home-video__info-text">
                Riau adalah provinsi strategis dengan kekayaan alam luar biasa di pesisir timur Sumatera.
                Sebagai organisasi profesi fungsional pengadaan, DPW IFPI Riau membina aparatur pengadaan di 10 kabupaten dan 2 kota guna mewujudkan belanja pemerintah yang efisien dan bebas korupsi.
              </p>
              <ul className="home-video__facts">
                <li>
                  <span className="home-video__fact-num">10</span>
                  <span className="home-video__fact-label">Kabupaten</span>
                </li>
                <li>
                  <span className="home-video__fact-num">2</span>
                  <span className="home-video__fact-label">Kota</span>
                </li>
                <li>
                  <span className="home-video__fact-num">5</span>
                  <span className="home-video__fact-label">Divisi Bidang</span>
                </li>
              </ul>
              <a href="#faq" className="home-video__link">
                Pelajari Jawaban &amp; FAQ Layanan →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. INFORMASI LAYANAN & KONSULTASI RESMI
          ============================================================ */}
      <section id="layanan" className="home-services" aria-labelledby="services-heading">
        <div className="home-container">
          <div className="home-section-intro">
            <span className="home-section-eyebrow">Layanan Kami</span>
            <h2 id="services-heading" className="home-section-title">
              Layanan Pengaduan &amp; Konsultasi Profesi
            </h2>
            <p className="home-section-desc">
              Pilih kategori laporan atau konsultasi resmi yang sesuai dengan kebutuhan permasalahan Anda.
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
                Konsultasi regulasi pengadaan, penelaahan produk hukum kontrak, bantuan penyelesaian sengketa,
                dan pendampingan kepatuhan hukum oleh Biro Hukum Setda Provinsi Riau.
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
                Konsultasi prosedur tata cara pengaduan, konfirmasi progres laporan lapangan, pencegahan maladministrasi,
                dan verifikasi data oleh Inspektorat Daerah &amp; Diskominfotik Riau.
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
                Permohonan pimpinan atau pejabat fungsional ahli sebagai narasumber workshop, pemateri bimbingan teknis,
                fasilitator pelatihan, atau undangan resmi kedinasan.
              </p>
              <Link to="/report?category=narasumber" className="home-service-card__link">
                Ajukan Layanan <Icon name="arrow-right" size={14} />
              </Link>
            </article>
          </div>

          <div className="home-services__footer">
            <Link to="/layanan" className="home-services__all-link">
              Buka Halaman Rincian Layanan Lengkap →
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. PANDUAN PENGGUNAAN LAYANAN & TIPS EFEKTIF
          ============================================================ */}
      <section id="panduan" className="home-steps" aria-labelledby="steps-heading">
        <div className="home-container">
          <div className="home-section-intro">
            <span className="home-section-eyebrow">Panduan Layanan</span>
            <h2 id="steps-heading" className="home-section-title">
              Tahapan Penyampaian Laporan &amp; Tips Efektif
            </h2>
            <p className="home-section-desc">
              Ikuti empat langkah praktis serta panduan pengisian laporan agar permohonan Anda dapat segera diproses dan diverifikasi.
            </p>
          </div>

          {/* 4 Langkah Alur */}
          <div className="home-steps__row">
            {[
              { num: '01', title: 'Pilih Kategori', desc: 'Pilih jenis permasalahan pengadaan yang sesuai dengan kebutuhan Anda.' },
              { num: '02', title: 'Isi Data Lengkap', desc: 'Tuliskan kronologi permasalahan, lokasi spesifik, dan lampirkan bukti foto jika ada.' },
              { num: '03', title: 'Terima Nomor Tiket', desc: 'Sistem otomatis menerbitkan nomor tiket resmi (contoh: Riau-2026-000001).' },
              { num: '04', title: 'Tindak Lanjut & Verifikasi', desc: 'Petugas dinas teknis meneliti berkas dan memproses tindak lanjut maksimal 1x24 jam kerja.' },
            ].map((step) => (
              <div key={step.num} className="home-step">
                <div className="home-step__num">{step.num}</div>
                <h3 className="home-step__title">{step.title}</h3>
                <p className="home-step__desc">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* 3 Tips Melapor Efektif (Pindahan dari Informasi) */}
          <div className="home-tips-wrapper">
            <div className="home-tips-header">
              <Icon name="check-circle" size={20} color="var(--ifpi-red)" />
              <h3>Panduan Pengisian: Tips Agar Pengaduan Cepat Ditindaklanjuti</h3>
            </div>

            <div className="home-tips-grid">
              <div className="home-tip-card">
                <strong>1. Lokasi Spesifik</strong>
                <p>Cantumkan nama paket pekerjaan, dinas pemilik anggaran, atau lokasi fisik kejadian secara jelas (misal: "Proyek Ruang Kelas SDN 01 Pekanbaru").</p>
              </div>

              <div className="home-tip-card">
                <strong>2. Foto &amp; Dokumen Bukti Jelas</strong>
                <p>Lampirkan bukti foto kondisi lapangan atau dokumen pendukung dari sudut pandang yang terang dan dapat dipertanggungjawabkan.</p>
              </div>

              <div className="home-tip-card">
                <strong>3. Nomor Kontak Selalu Aktif</strong>
                <p>Pastikan nomor telepon WhatsApp aktif untuk mempermudah petugas verifikator mengonfirmasi klarifikasi data teknis lapangan.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          6. KOMITMEN INTEGRITAS PENGADAAN
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
              DPW IFPI Riau berdedikasi membangun kompetensi pengelola pengadaan, menegakkan kepatuhan regulasi,
              serta memfasilitasi perlindungan hukum bagi aparatur pengadaan yang berintegritas.
            </p>
            <div className="home-commitment__actions">
              <Link to="/layanan" className="home-commitment__btn home-commitment__btn--outline">
                Lihat Rincian Layanan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          7. PERTANYAAN YANG SERING DIAJUKAN (FAQ LENGKAP)
          ============================================================ */}
      <section id="faq" className="home-faq" aria-labelledby="faq-heading">
        <div className="home-container home-faq__container">
          <div className="home-section-intro">
            <span className="home-section-eyebrow">Tanya Jawab</span>
            <h2 id="faq-heading" className="home-section-title">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
            <p className="home-section-desc">
              Temukan jawaban atas pertanyaan seputar tata kelola layanan pengaduan, keamanan identitas pelapor, mekanisme tindak lanjut, dan komitmen IFPI.
            </p>
          </div>

          <div className="home-faq__list">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`home-faq__item ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    className="home-faq__btn"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <span className="home-faq__icon" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="home-faq__content">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bantuan Tambahan */}
          <div className="home-faq__help-box">
            <h3 className="home-faq__help-title">Masih Memiliki Pertanyaan Lain?</h3>
            <p className="home-faq__help-text">
              Tim pengelola sekretariat dan verifikator pengaduan siap membantu Anda melalui kanal kontak resmi Pemerintah Provinsi Riau.
            </p>
            <div className="home-faq__help-actions">
              <a href="#kontak" className="gov-btn gov-btn-primary gov-btn-sm">
                <Icon name="phone" size={14} />
                Lihat Kontak Resmi
              </a>
              <Link to="/report" className="gov-btn gov-btn-outline-neutral gov-btn-sm">
                <Icon name="message-circle" size={14} />
                Sampaikan Aduan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          8. INFORMASI KONTAK & SEKRETARIAT RESMI
          ============================================================ */}
      <section id="kontak" className="home-contact" aria-labelledby="contact-heading">
        <div className="home-container">
          <div className="home-section-intro">
            <span className="home-section-eyebrow">Hubungi Kami</span>
            <h2 id="contact-heading" className="home-section-title">
              Sekretariat &amp; Kanal Kontak Resmi IFPI
            </h2>
            <p className="home-section-desc">
              Hubungi sekretariat Ikatan Fungsional Pengadaan Indonesia untuk konsultasi pelayanan profesi, konfirmasi administrasi laporan, atau koordinasi narasumber pengadaan.
            </p>
          </div>

          <div className="home-contact__grid">
            {/* Kartu Sekretariat Utama */}
            <div className="home-contact__card home-contact__card--ifpi">
              <h3 className="home-contact__card-title">Sekretariat Pengurus IFPI Riau</h3>

              <div className="home-contact__list">
                <div className="home-contact__item">
                  <Icon name="map-pin" size={18} className="home-contact__item-icon" />
                  <div>
                    <span className="home-contact__item-label">Alamat Sekretariat:</span>
                    <span className="home-contact__item-val">
                      Gedung Dinas Komunikasi, Informatika dan Statistik Provinsi Riau<br />
                      Jl. Jenderal Sudirman No. 460, Kel. Jadirejo, Kec. Sukajadi<br />
                      Kota Pekanbaru, Riau 28126
                    </span>
                  </div>
                </div>

                <div className="home-contact__item">
                  <Icon name="phone" size={18} className="home-contact__item-icon" />
                  <div>
                    <span className="home-contact__item-label">Telepon &amp; Call Center:</span>
                    <span className="home-contact__item-val">
                      Telepon Kantor: (0761) 31256 / 31257<br />
                      Hotline Bebas Pulsa: 112 (Siaga Kedaruratan Riau)
                    </span>
                  </div>
                </div>

                <div className="home-contact__item">
                  <Icon name="mail" size={18} className="home-contact__item-icon" />
                  <div>
                    <span className="home-contact__item-label">Surat Elektronik (Email):</span>
                    <span className="home-contact__item-val">
                      pengaduan@riau.go.id / sekretariat@ifpi.or.id
                    </span>
                  </div>
                </div>

                <div className="home-contact__item">
                  <Icon name="clock" size={18} className="home-contact__item-icon" />
                  <div>
                    <span className="home-contact__item-label">Jam Pelayanan Verifikator:</span>
                    <span className="home-contact__item-val">
                      Senin – Kamis : 08:00 – 16:00 WIB<br />
                      Jumat : 08:00 – 16:30 WIB<br />
                      Sabtu, Minggu &amp; Libur Nasional : Formulir online tetap aktif 24 jam
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kartu Kanal Koordinasi 3 OPD Pembina */}
            <div className="home-contact__card home-contact__card--opd">
              <h3 className="home-contact__card-title">Kanal Koordinasi 3 OPD Pembina Layanan</h3>

              <div className="home-contact__list">
                <div className="home-opd-item">
                  <strong>1. Biro Hukum Setda Provinsi Riau</strong>
                  <span className="role">Bidang Permasalahan &amp; Konsultasi Hukum</span>
                  <p>
                    Gedung Menara Lancang Kuning Lt. 5, Kantor Gubernur Riau, Jl. Jend. Sudirman Pekanbaru<br />
                    Layanan Konsultasi Regulasi: (0761) 31050 • birohukum@riau.go.id
                  </p>
                </div>

                <div className="home-opd-item">
                  <strong>2. Inspektorat Daerah &amp; Diskominfotik Prov. Riau</strong>
                  <span className="role">Bidang Konsultasi Terkait Pengaduan</span>
                  <p>
                    Sekretariat Pengawasan &amp; Verifikasi Aduan Pelayanan Publik Riau<br />
                    Helpdesk Pengaduan: (0761) 31256 • pengaduan@riau.go.id
                  </p>
                </div>

                <div className="home-opd-item">
                  <strong>3. Biro Administrasi Pimpinan / Protokol Prov. Riau</strong>
                  <span className="role">Bidang Permintaan Narasumber &amp; Undangan</span>
                  <p>
                    Bagian Komunikasi dan Protokol Pimpinan Pemprov Riau<br />
                    Koordinasi Agenda Resmi: (0761) 31258 • adpim@riau.go.id
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
