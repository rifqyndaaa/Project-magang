import { useEffect, useRef, useState } from 'react';
import './HomeSambutan.css';

/* ============================================================================
   AUDIO RESMI & SAMBUTAN DI BERANDA (MULTI-TREK)
   ----------------------------------------------------------------------------
   Mendukung 3 trek audio resmi:
   1. Sambutan Musyawarah (Pak Khalid Mustafa) -> /audio/sambutan-dpw-ifpi-riau.wav
   2. Mars IFPI -> /audio/mars-ifpi.wav (atau .mp3)
   3. Indonesia Raya -> /audio/indonesia-raya.wav (atau .mp3)

   Begitu berkas tersedia di public/audio/, trek langsung otomatis aktif.
   Audio TIDAK diputar otomatis demi kenyamanan pengunjung.
   ========================================================================== */

const AUDIO_TRACKS = [
  {
    id: 'sambutan',
    tabLabel: 'Sambutan Musyawarah',
    eyebrow: 'Sambutan',
    sectionTitle: 'Ucapan Selamat Datang',
    judul: 'Ucapan Musyawarah DPW IFPI Provinsi Riau',
    pembicara: 'Khalid Mustafa',
    jabatan: 'Praktisi & Ahli Pengadaan Barang/Jasa Pemerintah',
    foto: '/images/khalid-mustafa.jpg',
    monogram: 'KM',
    lede: 'Rekaman ucapan dan sambutan resmi dari Pak Khalid Mustafa pada Musyawarah DPW IFPI Provinsi Riau bagi aparatur pengadaan dan anggota organisasi.',
    src: '/audio/sambutan-dpw-ifpi-riau.wav',
    pesanKosong: 'Rekaman sambutan sedang disiapkan. Audio akan dapat diputar begitu berkas resmi tersedia.',
  },
  {
    id: 'mars-ifpi',
    tabLabel: 'Mars IFPI',
    eyebrow: 'Himne Organisasi',
    sectionTitle: 'Mars IFPI Resmi',
    judul: 'Mars Ikatan Fungsional Pengadaan Indonesia',
    pembicara: 'Dewan Pengurus IFPI',
    jabatan: 'Himne Resmi Korps Fungsional Pengadaan',
    foto: null,
    monogram: 'IFPI',
    lede: 'Himne kehormatan dan penyemangat integritas, profesionalitas, serta dedikasi seluruh fungsional pengadaan barang/jasa.',
    src: '/audio/mars-ifpi.wav',
    pesanKosong: 'Rekaman audio Mars IFPI sedang disiapkan. Begitu berkas audio ditambahkan, pemutar ini akan langsung aktif.',
  },
  {
    id: 'indonesia-raya',
    tabLabel: 'Indonesia Raya',
    eyebrow: 'Lagu Kebangsaan',
    sectionTitle: 'Indonesia Raya',
    judul: 'Indonesia Raya — W.R. Soepratman',
    pembicara: 'Republik Indonesia',
    jabatan: 'Lagu Kebangsaan Resmi Negara Kesatuan Republik Indonesia',
    foto: null,
    monogram: 'RI',
    lede: 'Lagu kebangsaan Indonesia Raya sebagai pengingat amanah pengabdian aparatur pengadaan barang dan jasa kepada nusa dan bangsa.',
    src: '/audio/indonesia-raya.wav',
    pesanKosong: 'Rekaman lagu Indonesia Raya sedang disiapkan. Begitu berkas audio ditambahkan, pemutar ini akan langsung aktif.',
  },
];

function formatWaktu(detik) {
  if (!Number.isFinite(detik) || detik < 0) return '00:00';
  const total = Math.floor(detik);
  const menit = Math.floor(total / 60);
  const sisa = total % 60;
  return `${String(menit).padStart(2, '0')}:${String(sisa).padStart(2, '0')}`;
}

export default function HomeSambutan() {
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const track = AUDIO_TRACKS[activeTrackIndex];

  const audioRef = useRef(null);
  const [memutar, setMemutar] = useState(false);
  const [durasi, setDurasi] = useState(0);
  const [posisi, setPosisi] = useState(0);
  // null = memeriksa, true = siap, false = berkas belum ada
  const [tersedia, setTersedia] = useState(null);

  // Pasang listener dan muat berkas setiap kali trek berganti
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return undefined;

    // Reset state saat berganti trek
    el.pause();
    el.currentTime = 0;
    setMemutar(false);
    setPosisi(0);
    setDurasi(0);
    setTersedia(null);

    const onMeta = () => {
      if (Number.isFinite(el.duration) && el.duration > 0) {
        setDurasi(el.duration);
        setTersedia(true);
      }
    };
    const onTime = () => setPosisi(el.currentTime || 0);
    const onPlay = () => setMemutar(true);
    const onPause = () => setMemutar(false);
    const onEnd = () => {
      setMemutar(false);
      setPosisi(0);
    };
    const onError = () => {
      setTersedia(false);
      setMemutar(false);
      setDurasi(0);
      setPosisi(0);
    };

    el.addEventListener('loadedmetadata', onMeta);
    el.addEventListener('durationchange', onMeta);
    el.addEventListener('canplay', onMeta);
    el.addEventListener('timeupdate', onTime);
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);
    el.addEventListener('ended', onEnd);
    el.addEventListener('error', onError);

    // Muat sumber trek baru
    el.src = track.src;
    el.load();

    return () => {
      el.removeEventListener('loadedmetadata', onMeta);
      el.removeEventListener('durationchange', onMeta);
      el.removeEventListener('canplay', onMeta);
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('ended', onEnd);
      el.removeEventListener('error', onError);
    };
  }, [track.src]);

  const alihkan = () => {
    const el = audioRef.current;
    if (!el || tersedia !== true) return;
    if (el.paused) {
      const janji = el.play();
      if (janji && typeof janji.catch === 'function') {
        janji.catch(() => setMemutar(false));
      }
    } else {
      el.pause();
    }
  };

  const geser = (event) => {
    const el = audioRef.current;
    if (!el) return;
    const nilai = Number(event.target.value);
    el.currentTime = nilai;
    setPosisi(nilai);
  };

  const siap = tersedia === true;
  const persen = durasi > 0 ? Math.min(100, (posisi / durasi) * 100) : 0;

  return (
    <section className="smb" aria-labelledby="smb-heading">
      <div className="home-container">
        {/* Tab Pilihan Trek Audio Resmi */}
        <div className="smb-tabs" role="tablist" aria-label="Pilihan Trek Audio Resmi">
          {AUDIO_TRACKS.map((t, idx) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={activeTrackIndex === idx}
              className={`smb-tab-btn ${activeTrackIndex === idx ? 'is-active' : ''}`}
              onClick={() => setActiveTrackIndex(idx)}
            >
              <span className="smb-tab-btn__dot" aria-hidden="true" />
              <span>{t.tabLabel}</span>
            </button>
          ))}
        </div>

        <div className="smb-card">
          <div className="smb-card__intro">
            <span className="home-section-eyebrow">{track.eyebrow}</span>
            <h2 id="smb-heading" className="home-section-title">
              {track.sectionTitle}
            </h2>
            <p className="smb-lede">{track.lede}</p>

            <div className="smb-speaker">
              <div className="smb-speaker__foto-wrap">
                {track.foto ? (
                  <img
                    src={track.foto}
                    alt={track.pembicara}
                    className="smb-speaker__foto"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="smb-speaker__monogram" aria-hidden="true">
                    {track.monogram}
                  </span>
                )}
              </div>
              <div className="smb-speaker__identitas">
                <span className="smb-speaker__label">
                  {track.id === 'sambutan' ? 'Disampaikan oleh' : 'Identitas Resmi'}
                </span>
                <span className="smb-speaker__nama">{track.pembicara}</span>
                <span className="smb-speaker__jabatan">{track.jabatan}</span>
              </div>
            </div>
          </div>

          <div className={`smb-player ${siap ? '' : 'is-gagal'}`}>
            <audio ref={audioRef} preload="metadata" playsInline>
              Peramban Anda tidak mendukung pemutar audio HTML5.
            </audio>

            <div className="smb-player__kepala">
              <span className="smb-player__eyebrow">Rekaman Audio</span>
              <span className={`smb-player__status ${memutar ? 'is-live' : ''}`}>
                {!siap ? 'Belum tersedia' : memutar ? 'Sedang diputar' : 'Siap diputar'}
              </span>
            </div>

            <p className="smb-player__judul">{track.judul}</p>

            {siap ? (
              <>
                <div className="smb-player__kontrol">
                  <button
                    type="button"
                    className="smb-play"
                    onClick={alihkan}
                    aria-label={memutar ? `Jeda ${track.judul}` : `Putar ${track.judul}`}
                  >
                    {memutar ? (
                      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
                        <rect x="7" y="5" width="3.6" height="14" rx="1" fill="currentColor" stroke="none" />
                        <rect x="13.4" y="5" width="3.6" height="14" rx="1" fill="currentColor" stroke="none" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
                        <path d="M8.5 5.6v12.8l10-6.4Z" fill="currentColor" stroke="none" />
                      </svg>
                    )}
                  </button>

                  <div className="smb-track">
                    <div className="smb-track__bar" aria-hidden="true">
                      <span className="smb-track__isi" style={{ width: `${persen}%` }} />
                    </div>
                    <input
                      type="range"
                      className="smb-track__input"
                      min="0"
                      max={durasi}
                      step="0.1"
                      value={posisi}
                      onChange={geser}
                      aria-label={`Posisi pemutaran ${track.judul}`}
                    />
                    <div className="smb-track__waktu">
                      <span>{formatWaktu(posisi)}</span>
                      <span>{formatWaktu(durasi)}</span>
                    </div>
                  </div>
                </div>

                <p className="smb-player__catatan">
                  Putar sesuai keinginan — audio tidak berbunyi otomatis saat halaman dibuka.
                </p>
              </>
            ) : (
              <div className="smb-kosong">
                <span className="smb-kosong__baris" aria-hidden="true" />
                <p className="smb-kosong__teks">{track.pesanKosong}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
