import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import Icon from '../../../components/common/Icon';
import { CATEGORIES } from '../../../data/categories';

export default function Services() {
  return (
    <div>
      <Breadcrumbs items={[{ label: 'Layanan & Konsultasi IFPI' }]} />

      <section style={{ padding: '2.5rem 0', backgroundColor: '#FFFFFF' }}>
        <div className="gov-container" style={{ maxWidth: '1080px' }}>
          {/* Header Bagian Layanan */}
          <div className="gov-section-header">
            <span className="gov-section-tag">Pelayanan Profesi Pengadaan</span>
            <h1 className="gov-section-title">3 Pilar Layanan Resmi IFPI</h1>
            <p className="gov-section-desc">
              Pilih kategori layanan yang sesuai dengan kebutuhan Anda. Klik tombol <strong>Ajukan Layanan</strong> pada kartu terkait untuk langsung mengisi formulir permohonan resmi.
            </p>
          </div>

          {/* 1. TIGA KARTU LAYANAN UTAMA DENGAN TOMBOL "AJUKAN LAYANAN" LANGSUNG */}
          <div className="gov-services-action-grid" role="region" aria-label="Daftar 3 Kategori Layanan">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="gov-service-card-interactive">
                <div className="gov-service-card-header">
                  <div className="gov-service-icon-box" aria-hidden="true">
                    <Icon name={cat.icon || 'file-check'} size={22} />
                  </div>
                  <span className="gov-service-opd-badge">{cat.shortName}</span>
                </div>

                <div className="gov-service-card-content">
                  <h2 className="gov-service-card-title">{cat.name}</h2>
                  <p className="gov-service-card-desc">{cat.description}</p>
                </div>

                <div className="gov-service-card-footer">
                  <Link
                    to={`/report?category=${cat.id}`}
                    className="gov-service-btn-ajukan"
                    id={`btn-ajukan-${cat.id}`}
                    aria-label={`Ajukan Layanan ${cat.name}`}
                  >
                    <span>Ajukan Layanan</span>
                    <Icon name="arrow-right" size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* 2. TOMBOL PELACAKAN TERPISAH (UNTUK MEMBEDAKAN PENGAJUAN BARU & PELACAKAN) */}
          <div className="gov-services-track-box" role="region" aria-label="Pelacakan Pengajuan Sebelumnya">
            <div className="gov-track-box-info">
              <div className="gov-service-icon-box" style={{ backgroundColor: '#FEF3C7', borderColor: '#FDE68A', color: '#B45309' }}>
                <Icon name="search" size={20} />
              </div>
              <div className="gov-track-box-info-text">
                <strong>Sudah Menyampaikan Laporan atau Pengajuan?</strong>
                <p>Gunakan nomor tiket resmi Anda (contoh: <code>Riau-2026-000001</code>) untuk memantau status verifikasi dan tindak lanjut.</p>
              </div>
            </div>
            <Link to="/track" className="gov-track-box-btn" id="btn-services-lacak-laporan">
              <Icon name="search" size={15} />
              <span>Lacak Laporan</span>
            </Link>
          </div>

          {/* 3. MAKLUMAT PELAYANAN DAN INTEGRITAS */}
          <div className="gov-card" style={{ borderLeft: '4px solid var(--ifpi-red)', padding: '1.5rem', marginBottom: '2.5rem', backgroundColor: 'var(--ifpi-red-soft)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--ifpi-red-dark)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              MAKLUMAT PELAYANAN &amp; INTEGRITAS IFPI
            </span>
            <p style={{ fontSize: '1rem', fontStyle: 'italic', color: 'var(--neutral-900)', marginTop: '0.5rem', marginBottom: '0.5rem', lineHeight: 1.6 }}>
              "Dengan ini kami menyatakan sanggup menyelenggarakan pelayanan konsultasi hukum, pengelolaan pengaduan, dan fasilitasi narasumber pengadaan secara profesional, objektif, dan akuntabel sesuai standar kode etik profesi fungsional pengadaan pemerintah."
            </p>
            <div style={{ fontSize: '0.8125rem', color: 'var(--ifpi-red-dark)', fontWeight: 600 }}>
              Dewan Pengurus Ikatan Fungsional Pengadaan Indonesia (IFPI)
            </div>
          </div>

          {/* 4. SLA (SERVICE LEVEL AGREEMENT) STANDAR WAKTU PENYELESAIAN */}
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gov-blue-dark)', marginBottom: '1rem' }}>
            Standar Waktu Penyelesaian (Service Level Agreement)
          </h2>
          <div className="gov-grid gov-grid-3" style={{ marginBottom: '2.5rem' }}>
            <div className="gov-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Icon name="clock" size={20} color="var(--gov-blue)" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Tahap 1: Verifikasi</h3>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gov-blue-dark)', marginBottom: '0.25rem' }}>
                Maks. 1x24 Jam
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--neutral-600)', margin: 0 }}>
                Pemeriksaan keabsahan laporan, lokasi administratif, dan kelengkapan bukti oleh verifikator Diskominfotik pada hari kerja.
              </p>
            </div>

            <div className="gov-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Icon name="file-check" size={20} color="#D97706" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Tahap 2: Disposisi OPD</h3>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#D97706', marginBottom: '0.25rem' }}>
                Maks. 3x24 Jam
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--neutral-600)', margin: 0 }}>
                Penerusan berkas permohonan ke biro/badan teknis (Biro Hukum, Inspektorat Daerah, atau Biro Administrasi Pimpinan) untuk telaah substansi.
              </p>
            </div>

            <div className="gov-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Icon name="check-circle" size={20} color="var(--gov-green)" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Tahap 3: Tindak Lanjut</h3>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gov-green-dark)', marginBottom: '0.25rem' }}>
                3 - 14 Hari Kerja
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--neutral-600)', margin: 0 }}>
                Pelaksanaan telaah regulasi hukum, fasilitasi tindak lanjut pengaduan, konfirmasi penugasan narasumber/undangan, serta pengunggahan tanggapan resmi.
              </p>
            </div>
          </div>

          {/* 5. KRITERIA LAPORAN PENGADUAN */}
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gov-blue-dark)', marginBottom: '1rem' }}>
            Kriteria Laporan Pengaduan
          </h2>
          <div className="gov-grid gov-grid-2" style={{ marginBottom: '2.5rem' }}>
            <div className="gov-card" style={{ padding: '1.25rem', borderTop: '3px solid var(--gov-green)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Icon name="check-circle" size={18} color="var(--gov-green)" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--gov-green-dark)', margin: 0 }}>
                  Laporan Memenuhi Syarat Diproses
                </h3>
              </div>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--neutral-700)', lineHeight: 1.6 }}>
                <li>Permasalahan berada dalam wilayah hukum & kewenangan Pemerintah Provinsi Riau.</li>
                <li>Menyertakan rincian lokasi kejadian secara jelas (nama jalan, desa/kelurahan, kecamatan).</li>
                <li>Uraian kejadian disampaikan secara faktual, runtut, dan tidak berbelit-belit.</li>
                <li>Didukung bukti foto/dokumen pendukung jika memungkinkan.</li>
                <li>Disampaikan dengan bahasa yang santun dan dapat dipertanggungjawabkan.</li>
              </ul>
            </div>

            <div className="gov-card" style={{ padding: '1.25rem', borderTop: '3px solid #DC2626' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Icon name="alert-circle" size={18} color="#DC2626" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#DC2626', margin: 0 }}>
                  Laporan Tidak Dapat Diproses
                </h3>
              </div>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--neutral-700)', lineHeight: 1.6 }}>
                <li>Mengandung fitnah, ujaran kebencian, pencemaran nama baik, atau isu SARA.</li>
                <li>Berada di luar kewenangan Pemprov Riau (misal: kewenangan penuh kementerian pusat atau privat).</li>
                <li>Perkara hukum atau sengketa perdata yang sedang dalam proses peradilan.</li>
                <li>Laporan anonim tanpa kontak yang tidak dapat diverifikasi kebenarannya.</li>
                <li>Laporan berulang (duplikasi) yang sudah pernah dijawab tuntas.</li>
              </ul>
            </div>
          </div>

          {/* 6. DASAR HUKUM */}
          <div className="gov-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--neutral-800)', marginBottom: '0.75rem' }}>
              Dasar Hukum Pelayanan Pengaduan
            </h3>
            <ol style={{ paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--neutral-600)', lineHeight: 1.6 }}>
              <li>Undang-Undang Republik Indonesia Nomor 25 Tahun 2009 tentang Pelayanan Publik.</li>
              <li>Undang-Undang Republik Indonesia Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik.</li>
              <li>Peraturan Presiden Nomor 76 Tahun 2013 tentang Pengelolaan Pengaduan Pelayanan Publik.</li>
              <li>Peraturan Menteri PAN-RB Nomor 62 Tahun 2018 tentang Pedoman Sistem Pengaduan Pelayanan Publik Nasional.</li>
              <li>Peraturan Gubernur Riau tentang Tata Kelola Sistem Pengaduan dan Aspirasi Masyarakat di Lingkungan Pemerintah Provinsi Riau.</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
