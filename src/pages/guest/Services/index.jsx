import { Link } from 'react-router-dom';
import Breadcrumbs from "../../../components/Breadcrumbs";
import Icon from "../../../components/Icon";
import PageHeader from "../../../components/PageHeader";
import { CATEGORIES } from '../../../data/categories';

const SLA_STEPS = [
  {
    tahap: 'Tahap 1',
    judul: 'Verifikasi Berkas',
    durasi: 'Maks. 1×24 Jam',
    isi: 'Pemeriksaan keabsahan laporan, lokasi administratif, dan kelengkapan bukti oleh verifikator pada hari kerja.',
  },
  {
    tahap: 'Tahap 2',
    judul: 'Disposisi OPD',
    durasi: 'Maks. 3×24 Jam',
    isi: 'Penerusan berkas permohonan ke biro/badan teknis — Biro Hukum, Inspektorat Daerah, atau Biro Administrasi Pimpinan — untuk telaah substansi.',
  },
  {
    tahap: 'Tahap 3',
    judul: 'Tindak Lanjut',
    durasi: '3 – 14 Hari Kerja',
    isi: 'Pelaksanaan telaah regulasi hukum, fasilitasi tindak lanjut pengaduan, konfirmasi penugasan narasumber, serta pengunggahan tanggapan resmi.',
  },
];

const KRITERIA_DITERIMA = [
  'Permasalahan berada dalam wilayah hukum & kewenangan Pemerintah Provinsi Riau.',
  'Menyertakan rincian lokasi kejadian secara jelas (nama jalan, desa/kelurahan, kecamatan).',
  'Uraian kejadian disampaikan secara faktual, runtut, dan tidak berbelit-belit.',
  'Didukung bukti foto atau dokumen pendukung jika memungkinkan.',
  'Disampaikan dengan bahasa yang santun dan dapat dipertanggungjawabkan.',
];

const KRITERIA_DITOLAK = [
  'Mengandung fitnah, ujaran kebencian, pencemaran nama baik, atau isu SARA.',
  'Berada di luar kewenangan Pemprov Riau (kewenangan penuh kementerian pusat atau sektor privat).',
  'Perkara hukum atau sengketa perdata yang sedang dalam proses peradilan.',
  'Laporan anonim tanpa kontak yang tidak dapat diverifikasi kebenarannya.',
  'Laporan berulang (duplikasi) yang sudah pernah dijawab tuntas.',
];

const DASAR_HUKUM = [
  'Undang-Undang Nomor 25 Tahun 2009 tentang Pelayanan Publik.',
  'Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik.',
  'Peraturan Presiden Nomor 76 Tahun 2013 tentang Pengelolaan Pengaduan Pelayanan Publik.',
  'Peraturan Menteri PAN-RB Nomor 62 Tahun 2018 tentang Pedoman Sistem Pengaduan Pelayanan Publik Nasional.',
  'Peraturan Gubernur Riau tentang Tata Kelola Sistem Pengaduan dan Aspirasi Masyarakat di Lingkungan Pemerintah Provinsi Riau.',
];

export default function Services() {
  return (
    <div className="pg">
      <div className="gov-container">
        <Breadcrumbs items={[{ label: 'Layanan & Konsultasi IFPI' }]} />

        <PageHeader
          eyebrow="Pelayanan Profesi Pengadaan"
          title={<>Layanan Resmi <em>IFPI</em> Provinsi Riau</>}
          lede="Tiga pilar layanan konsultasi hukum, penanganan pengaduan, dan fasilitasi narasumber pengadaan barang/jasa pemerintah. Pilih kategori yang sesuai, lalu lengkapi formulir permohonan resmi."
          meta={[
            { label: 'Kategori Layanan', value: '3 Pilar' },
            { label: 'Verifikasi', value: 'Maks. 1×24 Jam' },
            { label: 'Kanal', value: 'Daring 24 Jam' },
          ]}
          action={{ to: '/track', label: 'Lacak Laporan', icon: 'search' }}
        />

        <div className="pg-body">

          {/* Kategori layanan utama */}
          <section className="pg-section" aria-labelledby="kategori-layanan">
            <div className="pg-section__head">
              <h2 id="kategori-layanan" className="pg-section__title">Kategori Layanan</h2>
              <p className="pg-section__desc">
                Setiap kategori ditangani oleh instansi pembina yang berbeda sesuai kewenangannya.
              </p>
            </div>

            <div className="gov-services-action-grid" role="list">
              {CATEGORIES.map((cat) => (
                <div key={cat.id} className="gov-service-card-interactive" role="listitem">
                  <div className="gov-service-card-header">
                    <div className="gov-service-icon-box" aria-hidden="true">
                      <Icon name={cat.icon || 'file-check'} size={22} />
                    </div>
                    <span className="gov-service-opd-badge">{cat.shortName}</span>
                  </div>

                  <div className="gov-service-card-content">
                    <h3 className="gov-service-card-title">{cat.name}</h3>
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
          </section>

          {/* Standar waktu penyelesaian */}
          <section className="pg-section" aria-labelledby="sla-heading">
            <div className="pg-section__head">
              <h2 id="sla-heading" className="pg-section__title">Standar Waktu Penyelesaian</h2>
              <p className="pg-section__desc">
                Tahapan baku penanganan permohonan sejak diterima hingga ditindaklanjuti.
              </p>
            </div>

            <ol className="sla-list">
              {SLA_STEPS.map((s, i) => (
                <li key={s.tahap} className="sla-list__item">
                  <span className="sla-list__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div className="sla-list__body">
                    <span className="sla-list__tahap">{s.tahap}</span>
                    <h3 className="sla-list__title">{s.judul}</h3>
                    <span className="sla-list__durasi">{s.durasi}</span>
                    <p className="sla-list__desc">{s.isi}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Kriteria laporan */}
          <section className="pg-section" aria-labelledby="kriteria-heading">
            <div className="pg-section__head">
              <h2 id="kriteria-heading" className="pg-section__title">Kriteria Laporan Pengaduan</h2>
              <p className="pg-section__desc">
                Agar laporan dapat diproses, pastikan laporan Anda memenuhi kriteria berikut.
              </p>
            </div>

            <div className="criteria-grid">
              <div className="criteria-block criteria-block--accepted">
                <h3 className="criteria-block__title">
                  <Icon name="check-circle" size={17} />
                  Dapat diproses
                </h3>
                <ul className="criteria-block__list">
                  {KRITERIA_DITERIMA.map((k) => <li key={k}>{k}</li>)}
                </ul>
              </div>

              <div className="criteria-block criteria-block--rejected">
                <h3 className="criteria-block__title">
                  <Icon name="alert-circle" size={17} />
                  Tidak dapat diproses
                </h3>
                <ul className="criteria-block__list">
                  {KRITERIA_DITOLAK.map((k) => <li key={k}>{k}</li>)}
                </ul>
              </div>
            </div>
          </section>

          {/* Dasar hukum */}
          <section className="pg-section" aria-labelledby="hukum-heading">
            <div className="pg-section__head">
              <h2 id="hukum-heading" className="pg-section__title">Dasar Hukum Pelayanan</h2>
              <p className="pg-section__desc">
                Regulasi yang menjadi landasan penyelenggaraan layanan pengaduan dan konsultasi.
              </p>
            </div>

            <ol className="legal-list">
              {DASAR_HUKUM.map((d, i) => (
                <li key={d} className="legal-list__item">
                  <span className="legal-list__num" aria-hidden="true">{i + 1}</span>
                  <span>{d}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Maklumat pelayanan */}
          <section className="pg-section" aria-labelledby="maklumat-heading">
            <div className="pg-section__head">
              <h2 id="maklumat-heading" className="pg-section__title">Maklumat Pelayanan &amp; Integritas</h2>
            </div>

            <blockquote className="pg-quote">
              <p className="pg-quote__text">
                Dengan ini kami menyatakan sanggup menyelenggarakan pelayanan konsultasi hukum, pengelolaan pengaduan,
                dan fasilitasi narasumber pengadaan secara profesional, objektif, dan akuntabel sesuai standar kode etik
                profesi fungsional pengadaan pemerintah.
              </p>
              <footer className="pg-quote__source">
                Dewan Pengurus Wilayah IFPI Provinsi Riau
              </footer>
            </blockquote>
          </section>

          {/* Pelacakan */}
          <div className="pg-callout">
            <div>
              <h3 className="pg-callout__title">Sudah menyampaikan laporan atau pengajuan?</h3>
              <p className="pg-callout__text">
                Gunakan nomor tiket resmi Anda (format <code>Riau-2026-000001</code>) untuk memantau status verifikasi dan tindak lanjut.
              </p>
            </div>
            <Link to="/track" className="gov-btn gov-btn-primary">
              <Icon name="search" size={16} />
              <span>Lacak Laporan</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
