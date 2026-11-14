import { Link } from 'react-router-dom';
import Breadcrumbs from "../../../components/Breadcrumbs";
import Icon from "../../../components/Icon";
import PageHeader from "../../../components/PageHeader";

const KONTAK_SEKRETARIAT = [
  {
    icon: 'map-pin',
    label: 'Alamat Kantor',
    value: (
      <>
        Gedung Dinas Komunikasi, Informatika dan Statistik Provinsi Riau<br />
        Jl. Jenderal Sudirman No. 460, Kel. Jadirejo, Kec. Sukajadi<br />
        Kota Pekanbaru, Riau 28126
      </>
    ),
  },
  {
    icon: 'phone',
    label: 'Telepon & Call Center',
    value: (
      <>
        Telepon Kantor: (0761) 31256 / 31257<br />
        Hotline Bebas Pulsa: 112 (Siaga Kedaruratan Riau)
      </>
    ),
  },
  {
    icon: 'mail',
    label: 'Surat Elektronik',
    value: <>pengaduan@riau.go.id / diskominfotik@riau.go.id</>,
  },
  {
    icon: 'clock',
    label: 'Jam Pelayanan Petugas',
    value: (
      <>
        Senin – Kamis: 08.00 – 16.00 WIB<br />
        Jumat: 08.00 – 16.30 WIB<br />
        Sabtu, Minggu &amp; libur nasional: tutup — formulir daring tetap menerima laporan 24 jam
      </>
    ),
  },
];

const OPD_PEMBINA = [
  {
    nama: 'Biro Hukum Setda Prov. Riau',
    bidang: 'Bidang Permasalahan & Konsultasi Hukum',
    alamat: 'Gedung Menara Lancang Kuning Lt. 5, Kantor Gubernur Riau, Jl. Jend. Sudirman Pekanbaru',
    kontak: 'Layanan Konsultasi Regulasi: (0761) 31050 · birohukum@riau.go.id',
  },
  {
    nama: 'Inspektorat Daerah & Diskominfotik Prov. Riau',
    bidang: 'Bidang Konsultasi Terkait Pengaduan',
    alamat: 'Sekretariat Pengawasan & Verifikasi Aduan Pelayanan Publik',
    kontak: 'Helpdesk Pengaduan: (0761) 31256 · pengaduan@riau.go.id',
  },
  {
    nama: 'Biro Administrasi Pimpinan / Protokol Prov. Riau',
    bidang: 'Bidang Permintaan Narasumber dan Undangan',
    alamat: 'Bagian Komunikasi dan Protokol Pimpinan Pemprov Riau',
    kontak: 'Koordinasi Agenda Resmi: (0761) 31258 · adpim@riau.go.id',
  },
];

export default function Contact() {
  return (
    <div className="pg">
      <div className="gov-container">
        <Breadcrumbs items={[{ label: 'Kontak & Sekretariat IFPI' }]} />

        <PageHeader
          eyebrow="Sekretariat Pengurus"
          title={<>Kanal Informasi &amp; Kontak <em>Resmi</em></>}
          lede="Hubungi sekretariat Ikatan Fungsional Pengadaan Indonesia untuk konsultasi pelayanan profesi, konfirmasi administrasi pengaduan, atau fasilitasi narasumber pengadaan."
          meta={[
            { label: 'Sekretariat', value: 'Pekanbaru, Riau' },
            { label: 'Jam Layanan', value: 'Senin – Jumat' },
            { label: 'OPD Pembina', value: '3 Instansi' },
          ]}
          action={{ to: '/report', label: 'Buka Formulir', icon: 'message' }}
        />

        <div className="pg-body">
          <section className="pg-section" aria-labelledby="kontak-sekretariat">
            <div className="pg-section__head">
              <h2 id="kontak-sekretariat" className="pg-section__title">Sekretariat Pengurus IFPI</h2>
              <p className="pg-section__desc">
                Alamat kedinasan, kanal telepon, dan jam pelayanan resmi petugas verifikator.
              </p>
            </div>

            <dl className="contact-list">
              {KONTAK_SEKRETARIAT.map((item) => (
                <div key={item.label} className="contact-list__row">
                  <div className="contact-list__icon" aria-hidden="true">
                    <Icon name={item.icon} size={17} />
                  </div>
                  <div>
                    <dt className="contact-list__label">{item.label}</dt>
                    <dd className="contact-list__value">{item.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </section>

          <section className="pg-section" aria-labelledby="kanal-opd">
            <div className="pg-section__head">
              <h2 id="kanal-opd" className="pg-section__title">Kanal Koordinasi OPD Pembina</h2>
              <p className="pg-section__desc">
                Tiga instansi pembina yang menaungi masing-masing kategori layanan resmi IFPI Riau.
              </p>
            </div>

            <ol className="opd-list">
              {OPD_PEMBINA.map((opd, i) => (
                <li key={opd.nama} className="opd-list__item">
                  <span className="opd-list__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div className="opd-list__body">
                    <h3 className="opd-list__name">{opd.nama}</h3>
                    <span className="opd-list__role">{opd.bidang}</span>
                    <p className="opd-list__detail">
                      {opd.alamat}<br />
                      {opd.kontak}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <div className="pg-callout">
            <div>
              <h3 className="pg-callout__title">Sampaikan Laporan Secara Daring</h3>
              <p className="pg-callout__text">
                Setiap laporan melalui formulir daring tercatat dengan nomor tiket resmi dan dapat dipantau tahapan tindak lanjutnya.
              </p>
            </div>
            <Link to="/report" className="gov-btn gov-btn-primary">
              <Icon name="message" size={16} />
              <span>Buka Formulir Pengaduan</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
