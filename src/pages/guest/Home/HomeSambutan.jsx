import { useEffect, useRef, useState } from 'react';
import './HomeSambutan.css';

/* ============================================================================
   SAMBUTAN AUDIO DI BERANDA
   ----------------------------------------------------------------------------
   CARA MENARUH BERKAS AUDIO:
   1. Siapkan rekaman sambutan dalam format .mp3
      (disarankan bitrate 96–128 kbps, durasi 1–3 menit, ukuran < 5 MB).
   2. Simpan berkasnya di:  public/audio/sambutan-dpw-ifpi-riau.mp3
   3. Selesai — pemutar di Beranda langsung aktif tanpa mengubah kode.

   Selama berkas belum ada, kartu tetap tampil rapi namun kontrol pemutar
   diganti keterangan "Rekaman belum tersedia" (bukan kotak rusak / ikon error).

   Audio TIDAK diputar otomatis — pengunjung yang menekan tombol putar.
   ========================================================================== */

const AUDIO_SRC = '/audio/sambutan-dpw-ifpi-riau.wav';
const AUDIO_JUDUL = 'Ucapan Musyawarah DPW IFPI Provinsi Riau';
const AUDIO_PEMBICARA = 'Khalid Mustafa';
const AUDIO_JABATAN = 'Praktisi & Ahli Pengadaan Barang/Jasa Pemerintah';
const AUDIO_FOTO = '/images/khalid-mustafa.jpg';

function formatWaktu(detik) {
  if (!Number.isFinite(detik) || detik < 0) return '00:00';
  const total = Math.floor(detik);
  const menit = Math.floor(total / 60);
  const sisa = total % 60;
  return `${String(menit).padStart(2, '0')}:${String(sisa).padStart(2, '0')}`;
}

export default function HomeSambutan() {
  const audioRef = useRef(null);
  const [memutar, setMemutar] = useState(false);
  const [durasi, setDurasi] = useState(0);
  const [posisi, setPosisi] = useState(0);
  // null = belum diketahui, true = rekaman siap, false = berkas tidak ditemukan
  const [tersedia, setTersedia] = useState(null);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return undefined;

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

    // Berkas bisa saja sudah termuat sebelum listener terpasang.
    if (el.readyState >= 1) onMeta();

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
  }, []);

  const alihkan = () => {
    const el = audioRef.current;
    if (!el) return;
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
        <div className="smb-card">
          <div className="smb-card__intro">
            <span className="home-section-eyebrow">Sambutan</span>
            <h2 id="smb-heading" className="home-section-title">
              Ucapan Selamat Datang
            </h2>
            <p className="smb-lede">
              Rekaman ucapan dan sambutan resmi dari Pak Khalid Mustafa pada Musyawarah
              DPW IFPI Provinsi Riau bagi aparatur pengadaan dan anggota organisasi.
            </p>

            <div className="smb-speaker">
              <div className="smb-speaker__foto-wrap">
                {AUDIO_FOTO ? (
                  <img
                    src={AUDIO_FOTO}
                    alt={AUDIO_PEMBICARA}
                    className="smb-speaker__foto"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="smb-speaker__monogram" aria-hidden="true">IFPI</span>
                )}
              </div>
              <div className="smb-speaker__identitas">
                <span className="smb-speaker__label">Disampaikan oleh</span>
                <span className="smb-speaker__nama">{AUDIO_PEMBICARA}</span>
                <span className="smb-speaker__jabatan">{AUDIO_JABATAN}</span>
              </div>
            </div>
          </div>

          <div className={`smb-player ${siap ? '' : 'is-gagal'}`}>
            <audio ref={audioRef} src={AUDIO_SRC} preload="metadata" playsInline>
              Peramban Anda tidak mendukung pemutar audio HTML5.
            </audio>

            <div className="smb-player__kepala">
              <span className="smb-player__eyebrow">Rekaman Audio</span>
              <span className={`smb-player__status ${memutar ? 'is-live' : ''}`}>
                {!siap ? 'Belum tersedia' : memutar ? 'Sedang diputar' : 'Siap diputar'}
              </span>
            </div>

            <p className="smb-player__judul">{AUDIO_JUDUL}</p>

            {siap ? (
              <>
                <div className="smb-player__kontrol">
                  <button
                    type="button"
                    className="smb-play"
                    onClick={alihkan}
                    aria-label={memutar ? 'Jeda rekaman sambutan' : 'Putar rekaman sambutan'}
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
                      aria-label="Posisi pemutaran rekaman sambutan"
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
                <p className="smb-kosong__teks">
                  Rekaman sambutan sedang disiapkan. Audio akan dapat diputar di bagian ini
                  begitu berkas resmi tersedia.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
