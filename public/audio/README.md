# Berkas Audio Beranda

Letakkan rekaman sambutan di folder ini dengan nama **tepat** seperti berikut:

```
public/audio/sambutan-dpw-ifpi-riau.mp3
```

Pemutar audio di Beranda (`src/pages/guest/Home/HomeSambutan.jsx`) akan
langsung aktif setelah berkas tersedia. Tidak perlu mengubah kode.

Ketentuan berkas yang disarankan:

- Format MP3 (H.264/AAC dalam .m4a juga didukung peramban modern, tetapi
  ganti konstanta `AUDIO_SRC` bila memakai ekstensi lain).
- Bitrate 96–128 kbps, mono atau stereo.
- Durasi 1–3 menit, ukuran di bawah 5 MB agar halaman tetap ringan.
- Audio tidak diputar otomatis; pengunjung menekan tombol putar sendiri.
