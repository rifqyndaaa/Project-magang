# IFPI — Portal Layanan & Panel Admin

Website organisasi **Ikatan Fungsional Pengadaan Indonesia (IFPI) DPW Provinsi Riau**:
portal publik untuk pengajuan layanan dan panel admin untuk petugas verifikator.

## Teknologi

| Bagian | Keterangan |
|---|---|
| Framework | React 19 (tanpa TypeScript) |
| Build | Vite 8 |
| Routing | react-router-dom 7 |
| Gaya | CSS murni (tanpa Tailwind/framework CSS) |
| Penyimpanan | `localStorage` peramban (purwarupa, tanpa backend) |

## Perintah

```bash
npm run dev      # server pengembangan
npm run build    # build produksi ke dist/
npm run preview  # pratinjau hasil build
npm run lint     # pemeriksaan ESLint
```

## Struktur `src/`

```
src/
  main.jsx                  titik masuk + urutan muat CSS
  App.jsx                   seluruh definisi rute

  layouts/
    PublicLayout.jsx        kerangka halaman publik (Header + Footer)
    AdminLayout.jsx         kerangka panel admin (header gelap + sidebar)

  pages/
    guest/                  halaman publik
      Home/ Categories/ Services/ Information/ Contact/
      Report/ Success/ Track/                   alur pengajuan
      Organization/ Regions/ Activities/        profil organisasi
      Merchandise/ Products/                    etalase
      NotFound/
    admin/                  halaman panel admin
      Login.jsx             masuk petugas
      Dashboard.jsx         panel kendali + rekapitulasi
      Detail.jsx            detail pengajuan + tindakan petugas
      Pengajuan.jsx         daftar lengkap pengajuan
      Penanganan.jsx        antrean verifikasi & penanganan
      Organisasi.jsx        struktur organisasi
      Wilayah.jsx           data 12 kabupaten/kota
      Kegiatan.jsx          program kerja & agenda
      Merchandise.jsx       pengelolaan etalase produk
      Pengaturan.jsx        sesi petugas, konfigurasi, cadangan data

  components/               Header, Footer, Icon, StatusBadge, PageHeader,
                            Breadcrumbs, ProductCard, ProductDetailModal,
                            RiauMap, DocumentTitle
  contexts/                 AdminAuthContext
  data/                     sumber data tunggal (kategori, wilayah, org, kegiatan,
                            merchandise)
  hooks/                    useScroll
  lib/                      ticket.js (nomor tiket), validation.js
  services/                 storage.js (pengajuan + sesi admin),
                            productStorage.js (etalase)
  styles/
    base.css                reset & variabel dasar (dulu index.css)
    app.css                 gaya komponen publik
    premium.css             lapisan penyempurnaan desain
    admin.css               lapisan desain panel admin
    pages/                  CSS per halaman publik
```

## Urutan muat CSS (penting)

`main.jsx` memuat CSS dalam urutan yang menentukan siapa yang menang:

1. `base.css`
2. `App.jsx` → `app.css`
3. `premium.css`
4. `admin.css`

Aturan CSS baru yang perlu **menimpa** aturan lama harus ditambahkan ke berkas
yang dimuat paling akhir sesuai sasarannya. Jika aturan lama memakai
`!important`, aturan penimpa juga perlu `!important` — atau naikkan spesifisitas
selektornya.

## Alur data pengajuan

Tidak ada API. Semua lewat satu penyimpanan peramban di `src/services/storage.js`.

```
Halaman publik /report
    → saveReport()            menulis pengajuan baru, status "Baru"
    → Panel admin             membaca data yang sama lewat getAllReports()
    → updateReportStatus()    mengubah status + menambah riwayat
    → saveAdminResponse()     menyimpan tanggapan resmi
    → Halaman publik /track   membaca lewat getPublicReportByTicket()
```

Karena penyimpanannya satu, pengajuan dari portal publik **otomatis** muncul di
panel admin tanpa sinkronisasi atau penyimpanan kedua.

### Tiga kategori layanan resmi

1. `hukum` — Permasalahan dan Konsultasi Hukum
2. `pengaduan` — Konsultasi Terkait Pengaduan
3. `narasumber` — Permintaan Narasumber dan Undangan

Didefinisikan sekali di `src/data/categories.js`. Jangan menambah kategori baru
di tempat lain.

### Tiga tahap kerja admin

`ADMIN_STATUSES` di `src/data/categories.js`:

| Tahap | Arti |
|---|---|
| Baru Diterima | Masuk dari portal, belum ditangani |
| Sedang Diproses | Sedang ditelaah / ditindaklanjuti |
| Selesai Ditangani | Tuntas, tanggapan resmi terbit |

Data arsip lama (`Diverifikasi`, `Tindak Lanjut`, `Ditolak`) tetap dibaca dan
dipetakan lewat `normalizeWorkflowStatus()` — tidak ada data yang dihapus atau
diubah diam-diam.

## Akun purwarupa admin

| Pengguna | Kata sandi | Peran |
|---|---|---|
| `admin` | `admin123` | Super Admin |
| `petugas` | `riau2026` | Petugas Verifikator |

Autentikasi ini hanya untuk demonstrasi di peramban. Sistem produksi memerlukan
backend, token, dan kendali akses berbasis peran.
