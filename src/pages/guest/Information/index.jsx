import { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from "../../../components/Breadcrumbs";
import Icon from "../../../components/Icon";

const FAQ_ITEMS = [
  {
    q: 'Bagaimana cara menyampaikan pengaduan melalui portal ini?',
    a: 'Warga cukup membuka menu "Sampaikan Pengaduan", mengisi data diri nama dan nomor WhatsApp aktif, memilih kategori permasalahan serta Kabupaten/Kota, menuliskan lokasi spesifik dan kronologi kejadian, melampirkan foto jika ada, lalu menekan tombol "Kirim Pengaduan". Setelah itu, sistem akan menerbitkan nomor tiket resmi.'
  },
  {
    q: 'Apakah identitas dan nomor kontak saya aman dari publik?',
    a: 'Sangat aman. Sistem kami menerapkan prinsip perlindungan data pribadi pelapor. Nama lengkap dan nomor kontak Anda hanya dapat diakses oleh petugas verifikator resmi untuk keperluan konfirmasi data lapangan, dan tidak akan pernah ditampilkan pada halaman pelacakan status tiket yang dapat diakses publik.'
  },
  {
    q: 'Bagaimana cara melacak tindak lanjut atas laporan saya?',
    a: 'Gunakan nomor tiket yang Anda terima saat mendaftar (contoh: Riau-2026-000001) pada menu "Lacak Status Tiket". Di halaman tersebut, Anda dapat memantau setiap perubahan status mulai dari Baru Masuk, Terverifikasi, Sedang Diproses, Tindak Lanjut, hingga Selesai beserta tanggapan resmi dari dinas terkait.'
  },
  {
    q: 'Berapa lama laporan saya akan ditanggapi oleh instansi terkait?',
    a: 'Standar waktu verifikasi awal oleh tim Diskominfotik adalah maksimal 1x24 jam kerja. Setelah diverifikasi dan diteruskan ke dinas teknis, telaah dan jadwal tindakan lapangan disampaikan dalam 3 hingga 7 hari kerja tergantung tingkat kedaruratan dan jenis permasalahan.'
  },
  {
    q: 'Apa saja 3 kategori layanan resmi yang dapat diajukan melalui portal ini?',
    a: 'Portal ini melayani 3 kategori resmi: (1) Permasalahan dan Konsultasi Hukum oleh Biro Hukum Setda Prov. Riau (regulasi daerah, sengketa perdata/TUN, dan telaah kerja sama), (2) Konsultasi Terkait Pengaduan oleh Inspektorat Daerah & Diskominfotik (prosedur aduan, verifikasi berkas, dan pencegahan maladministrasi), serta (3) Permintaan Narasumber dan Undangan oleh Biro Administrasi Pimpinan (permohonan narasumber acara, workshop, pemateri ahli, dan undangan kedinasan).'
  },
  {
    q: 'Apakah pengajuan pengaduan ini dipungut biaya?',
    a: 'Tidak sama sekali. Seluruh proses penyampaian laporan, verifikasi, hingga tindak lanjut penanganan oleh Pemerintah Provinsi Riau adalah 100% bebas biaya (gratis). Waspadai oknum yang mengatasnamakan dinas dan meminta imbalan uang.'
  },
  {
    q: 'Apa yang harus dilakukan jika saya lupa mencatat nomor tiket?',
    a: 'Jika Anda lupa mencatat nomor tiket, Anda dapat menghubungi layanan bantuan Helpdesk Diskominfotik Provinsi Riau melalui telepon (0761) 31256 pada jam kerja dengan menyebutkan nama pelapor dan tanggal perkiraan pengiriman laporan untuk dibantu pencarian.'
  }
];

export default function Information() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Panduan & Informasi Layanan IFPI' }]} />

      <section style={{ padding: '2.5rem 0', backgroundColor: '#FFFFFF' }}>
        <div className="gov-container" style={{ maxWidth: "880px" }}>
          <div className="gov-section-header">
            <span className="gov-section-tag">Pusat Edukasi &amp; Bantuan Profesi</span>
            <h1 className="gov-section-title">Panduan Layanan &amp; Pertanyaan Umum (FAQ) IFPI</h1>
            <p className="gov-section-desc">
              Temukan jawaban atas pertanyaan yang paling sering diajukan seputar mekanisme permohonan konsultasi regulasi pengadaan, tata kelola aduan profesi, dan layanan IFPI.
            </p>
          </div>

          {/* Tips Melapor Efektif / Panduan Penggunaan */}
          <div id="panduan" className="gov-card" style={{ padding: '1.5rem', marginBottom: '2.5rem', borderLeft: '4px solid var(--gov-green)', scrollMarginTop: "100px" }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Icon name="check-circle" size={20} color="var(--gov-green)" />
              <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--neutral-900)', margin: 0 }}>
                Panduan Penggunaan & Tips Agar Pengaduan Cepat Ditindaklanjuti
              </h2>
            </div>

            <div className="gov-grid gov-grid-3" style={{ marginTop: "1rem" }}>
              <div style={{ backgroundColor: 'var(--neutral-50)', padding: '0.875rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--neutral-200)' }}>
                <strong style={{ display: 'block', fontSize: '0.875rem', color: 'var(--gov-blue-dark)', marginBottom: '0.25rem' }}>
                  1. Lokasi Spesifik
                </strong>
                <p style={{ fontSize: '0.8125rem', color: 'var(--neutral-600)', margin: 0 }}>
                  Cantumkan kilometer jalan, nama gedung, atau patokan tempat yang jelas (misal: "KM 12 depan SPBU").
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--neutral-50)', padding: '0.875rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--neutral-200)' }}>
                <strong style={{ display: 'block', fontSize: '0.875rem', color: 'var(--gov-blue-dark)', marginBottom: '0.25rem' }}>
                  2. Foto Bukti Jelas
                </strong>
                <p style={{ fontSize: '0.8125rem', color: 'var(--neutral-600)', margin: 0 }}>
                  Sertakan foto kondisi kerusakan fisik dari sudut pandang yang terang dan memperlihatkan skala masalah.
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--neutral-50)', padding: '0.875rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--neutral-200)' }}>
                <strong style={{ display: 'block', fontSize: '0.875rem', color: 'var(--gov-blue-dark)', marginBottom: '0.25rem' }}>
                  3. Kontak Aktif
                </strong>
                <p style={{ fontSize: '0.8125rem', color: 'var(--neutral-600)', margin: 0 }}>
                  Pastikan nomor telepon atau WhatsApp selalu aktif agar tim teknis lapangan dapat melakukan koordinasi cepat.
                </p>
              </div>
            </div>
          </div>

          {/* Accordion FAQ */}
          <div id="faq" style={{ scrollMarginTop: "100px" }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gov-blue-dark)', marginBottom: '1.25rem' }}>
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="gov-card"
                  style={{
                    border: isOpen ? '1px solid var(--gov-blue)' : '1px solid var(--neutral-200)',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: isOpen ? 'var(--gov-blue-soft)' : '#FFFFFF',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontFamily: 'inherit'
                    }}
                  >
                    <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: isOpen ? 'var(--gov-blue-dark)' : 'var(--neutral-900)' }}>
                      {item.q}
                    </span>
                    <span style={{ color: isOpen ? 'var(--gov-blue)' : 'var(--neutral-400)', fontWeight: 'bold', fontSize: '1.125rem' }}>
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--neutral-200)', backgroundColor: '#FFFFFF', fontSize: '0.875rem', color: 'var(--neutral-700)', lineHeight: 1.6 }}>
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Kotak Bantuan Tambahan */}
          <div style={{ backgroundColor: 'var(--neutral-50)', border: '1px solid var(--neutral-200)', borderRadius: 'var(--radius-sm)', padding: '1.5rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--neutral-900)', marginBottom: '0.35rem' }}>
              Masih Memiliki Pertanyaan Lain?
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--neutral-600)', marginBottom: '1.25rem' }}>
              Tim pengelola portal pengaduan siap membantu Anda melalui kanal kontak resmi Pemerintah Provinsi Riau.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link to="/kontak" className="gov-btn gov-btn-primary gov-btn-sm">
                <Icon name="phone" size={14} />
                <span>Hubungi Layanan Bantuan</span>
              </Link>
              <Link to="/report" className="gov-btn gov-btn-outline-neutral gov-btn-sm">
                <Icon name="message" size={14} />
                <span>Langsung Buat Pengaduan</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
