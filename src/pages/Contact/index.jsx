import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Icon from '../../components/common/Icon';

export default function Contact() {
  return (
    <div>
      <Breadcrumbs items={[{ label: 'Kontak & Sekretariat' }]} />

      <section style={{ padding: '2.5rem 0', backgroundColor: '#FFFFFF' }}>
        <div className="gov-container" style={{ maxWidth: '960px' }}>
          <div className="gov-section-header">
            <span className="gov-section-tag">Sekretariat Pengelola</span>
            <h1 className="gov-section-title">Kanal Informasi & Kontak Resmi</h1>
            <p className="gov-section-desc">
              Hubungi sekretariat pengelola portal pengaduan Pemerintah Provinsi Riau untuk konsultasi pelayanan publik, pendampingan pelaporan, atau informasi lanjutan.
            </p>
          </div>

          <div className="gov-grid gov-grid-2" style={{ marginBottom: '2.5rem' }}>
            {/* Kartu Alamat & Kontak Utama */}
            <div className="gov-card" style={{ padding: '1.5rem', borderTop: '4px solid var(--gov-blue)' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--gov-blue-dark)', marginBottom: '1rem' }}>
                Sekretariat Pengaduan Publik Diskominfotik Prov. Riau
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ color: 'var(--gov-blue)', marginTop: '0.15rem' }}>
                    <Icon name="map-pin" size={18} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--neutral-900)' }}>Alamat Kantor:</strong>
                    <span style={{ color: 'var(--neutral-600)' }}>
                      Gedung Dinas Komunikasi, Informatika dan Statistik Provinsi Riau<br />
                      Jl. Jenderal Sudirman No. 460, Kel. Jadirejo, Kec. Sukajadi<br />
                      Kota Pekanbaru, Riau 28126
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ color: 'var(--gov-blue)', marginTop: '0.15rem' }}>
                    <Icon name="phone" size={18} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--neutral-900)' }}>Telepon & Call Center:</strong>
                    <span style={{ color: 'var(--neutral-600)' }}>
                      Telepon Kantor: (0761) 31256 / 31257<br />
                      Hotline Bebas Pulsa: 112 (Siaga Kedaruratan Riau)
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ color: 'var(--gov-blue)', marginTop: '0.15rem' }}>
                    <Icon name="message" size={18} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--neutral-900)' }}>Surat Elektronik (Email):</strong>
                    <span style={{ color: 'var(--neutral-600)' }}>
                      pengaduan@riau.go.id / diskominfotik@riau.go.id
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ color: 'var(--gov-blue)', marginTop: '0.15rem' }}>
                    <Icon name="clock" size={18} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--neutral-900)' }}>Jam Pelayanan Petugas:</strong>
                    <span style={{ color: 'var(--neutral-600)' }}>
                      Senin – Kamis : 08:00 – 16:00 WIB<br />
                      Jumat : 08:00 – 16:30 WIB<br />
                      Sabtu, Minggu & Hari Libur Nasional : Tutup (Formulir online tetap menerima laporan 24 jam)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kartu Kontak 3 OPD Pembina Kategori Layanan Resmi */}
            <div className="gov-card" style={{ padding: '1.5rem', borderTop: '4px solid var(--gov-green)' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--gov-green-dark)', marginBottom: '1rem' }}>
                Kanal Koordinasi 3 OPD Pembina Layanan Resmi
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', fontSize: '0.8125rem' }}>
                <div style={{ backgroundColor: 'var(--neutral-50)', padding: '0.75rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--neutral-200)' }}>
                  <strong style={{ display: 'block', color: 'var(--neutral-900)', fontSize: '0.875rem' }}>
                    1. Biro Hukum Setda Prov. Riau
                  </strong>
                  <span style={{ color: 'var(--gov-blue-dark)', fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>
                    Bidang Permasalahan & Konsultasi Hukum
                  </span>
                  <span style={{ color: 'var(--neutral-600)' }}>
                    Kantor Gubernur Riau Gedung Menara Lancang Kuning Lt. 5, Jl. Jend. Sudirman Pekanbaru<br />
                    Layanan Konsultasi Regulasi: (0761) 31050 &bull; birohukum@riau.go.id
                  </span>
                </div>

                <div style={{ backgroundColor: 'var(--neutral-50)', padding: '0.75rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--neutral-200)' }}>
                  <strong style={{ display: 'block', color: 'var(--neutral-900)', fontSize: '0.875rem' }}>
                    2. Inspektorat Daerah & Diskominfotik Prov. Riau
                  </strong>
                  <span style={{ color: 'var(--gov-blue-dark)', fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>
                    Bidang Konsultasi Terkait Pengaduan
                  </span>
                  <span style={{ color: 'var(--neutral-600)' }}>
                    Sekretariat Pengawasan & Verifikasi Aduan Pelayanan Publik<br />
                    Helpdesk Pengaduan: (0761) 31256 &bull; pengaduan@riau.go.id
                  </span>
                </div>

                <div style={{ backgroundColor: 'var(--neutral-50)', padding: '0.75rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--neutral-200)' }}>
                  <strong style={{ display: 'block', color: 'var(--neutral-900)', fontSize: '0.875rem' }}>
                    3. Biro Administrasi Pimpinan / Protokol Prov. Riau
                  </strong>
                  <span style={{ color: 'var(--gov-blue-dark)', fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>
                    Bidang Permintaan Narasumber dan Undangan
                  </span>
                  <span style={{ color: 'var(--neutral-600)' }}>
                    Bagian Komunikasi dan Protokol Pimpinan Pemprov Riau<br />
                    Koordinasi Agenda Resmi: (0761) 31258 &bull; adpim@riau.go.id
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Footer */}
          <div style={{ backgroundColor: 'var(--gov-blue-soft)', border: '1px solid var(--gov-blue-border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--gov-blue-dark)', margin: 0 }}>
                Ingin Menyampaikan Laporan Langsung Secara Online?
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--neutral-600)', margin: '0.25rem 0 0 0' }}>
                Pengisian formulir online menjamin pengaduan Anda tercatat dengan nomor tiket resmi dan dapat dipantau tahapan tindak lanjutnya.
              </p>
            </div>
            <Link to="/report" className="gov-btn gov-btn-primary">
              <Icon name="message" size={16} />
              <span>Buka Formulir Pengaduan</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
