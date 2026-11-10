import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Icon from '../../components/common/Icon';

export default function Services() {
  return (
    <div>
      <Breadcrumbs items={[{ label: 'Standar Layanan' }]} />

      <section style={{ padding: '2.5rem 0', backgroundColor: '#FFFFFF' }}>
        <div className="gov-container" style={{ maxWidth: '960px' }}>
          <div className="gov-section-header">
            <span className="gov-section-tag">Transparansi & Akuntabilitas</span>
            <h1 className="gov-section-title">Standar Layanan Pengaduan Masyarakat</h1>
            <p className="gov-section-desc">
              Pemerintah Provinsi Riau berkomitmen memberikan kepastian pelayanan, kecepatan respon, dan penyelesaian masalah publik sesuai peraturan perundang-undangan.
            </p>
          </div>

          {/* Maklumat Pelayanan */}
          <div className="gov-card" style={{ borderLeft: '4px solid var(--gov-blue)', padding: '1.5rem', marginBottom: '2rem', backgroundColor: 'var(--gov-blue-soft)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gov-blue-dark)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              MAKLUMAT PELAYANAN PENGADUAN PEMPROV RIAU
            </span>
            <p style={{ fontSize: '1rem', fontStyle: 'italic', color: 'var(--neutral-900)', marginTop: '0.5rem', marginBottom: '0.5rem', lineHeight: 1.6 }}>
              "Dengan ini kami menyatakan sanggup menyelenggarakan pelayanan pengaduan masyarakat sesuai standar pelayanan yang telah ditetapkan, dan apabila tidak menepati janji ini, kami siap menerima sanksi sesuai ketentuan peraturan perundang-undangan yang berlaku."
            </p>
            <div style={{ fontSize: '0.8125rem', color: 'var(--gov-blue-dark)', fontWeight: 600 }}>
              Dinas Komunikasi, Informatika dan Statistik Provinsi Riau
            </div>
          </div>

          {/* SLA (Service Level Agreement) Standar Waktu */}
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

          {/* Kriteria Laporan */}
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

          {/* Dasar Hukum */}
          <div className="gov-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
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

          {/* CTA */}
          <div style={{ textAlign: 'center' }}>
            <Link to="/report" className="gov-btn gov-btn-primary gov-btn-lg">
              <Icon name="message" size={18} />
              <span>Sampaikan Pengaduan Sekarang</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
