import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumbs from "../../../components/Breadcrumbs";
import Icon from "../../../components/Icon";
import { getRegionById, RIAU_REGIONS_DATA } from '../../../data/regionsData';
import './Regions.css';

export default function RegionStructure() {
  const { id } = useParams();
  const region = getRegionById(id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!region) {
    return (
      <div className="reg-struct-page">
        <div className="gov-container" style={{ maxWidth: '640px', padding: '4rem 1.5rem', textAlign: "center" }}>
          <div className="reg-struct-unfilled-card">
            <div className="reg-struct-unfilled-icon">
              <Icon name="alert-circle" size={36} />
            </div>
            <h2 className="reg-struct-unfilled-title">Wilayah Tidak Ditemukan</h2>
            <p className="reg-struct-unfilled-text">
              Wilayah kabupaten atau kota yang Anda tuju tidak tercatat dalam daftar administratif Provinsi Riau.
            </p>
            <Link to="/wilayah" className="region-btn-structure" style={{ display: "inline-flex" }}>
              <Icon name="arrow-left" size={16} />
              <span>Kembali ke Peta Wilayah</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const hasStructure = Boolean(region.isAvailable && region.kepengurusan && region.kepengurusan.length > 0);

  return (
    <div className="reg-struct-page">
      <div className="gov-container">
        {/* Breadcrumbs Navigasi */}
        <Breadcrumbs
          items={[
            { label: 'Beranda', to: '/' },
            { label: 'Wilayah Kepengurusan', to: '/wilayah' },
            { label: region.name, to: `/wilayah#${region.id}` },
            { label: 'Struktur Kepengurusan' },
          ]}
        />

        {/* Tombol Kembali ke Peta */}
        <div className="reg-struct-top-nav">
          <Link to="/wilayah" className="pcr-btn-back">
            <Icon name="arrow-left" size={16} />
            <span>Kembali ke Peta Interaktif Wilayah</span>
          </Link>
        </div>

        {/* Header Halaman Struktur Wilayah */}
        <header className="reg-struct-header">
          <div className="regions-badge">
            <Icon name="shield" size={14} />
            <span>Dewan Pengurus Cabang (DPC) IFPI</span>
          </div>

          <h1 className="regions-title">
            Struktur Kepengurusan IFPI <span className="regions-title-accent">{region.name}</span>
          </h1>

          <p className="regions-desc">
            Informasi susunan kepengurusan Ikatan Fungsional Pengadaan Indonesia di tingkat {region.type === 'kota' ? 'Kota' : 'Kabupaten'} {region.shortName}.
          </p>
        </header>

        {/* Tampilan Struktur Jika Data Tersedia ATAU Keterangan Resmi Jika Belum Tersedia */}
        {hasStructure ? (
          <div className="reg-struct-tree-container">
            {/* Render bagan pengurus cabang jika data resmi sudah diisi */}
            <p style={{ textAlign: 'center', color: '#64748B' }}>Bagan kepengurusan cabang aktif.</p>
          </div>
        ) : (
          <div className="reg-struct-unfilled-card">
            <div className="reg-struct-unfilled-icon">
              <Icon name="clock" size={36} />
            </div>

            <h2 className="reg-struct-unfilled-title">
              Struktur Kepengurusan IFPI {region.name}
            </h2>

            <div className="reg-struct-unfilled-lead">
              Informasi kepengurusan untuk wilayah ini belum tersedia.
            </div>

            <p className="reg-struct-unfilled-text">
              Formasi susunan kepengurusan Dewan Pengurus Cabang (DPC) IFPI {region.name} saat ini sedang dalam proses konsolidasi keanggotaan dan penetapan Surat Keputusan (SK) resmi oleh Dewan Pengurus Wilayah (DPW) IFPI Provinsi Riau.
            </p>

            <div className="reg-struct-unfilled-actions">
              <Link to="/wilayah" className="pcr-btn-secondary">
                <Icon name="map" size={16} />
                <span>Pilih Wilayah Lainnya</span>
              </Link>

              <Link to="/kontak" className="pcr-btn-primary">
                <Icon name="message-square" size={16} />
                <span>Hubungi Sekretariat DPW</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

