import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Icon from "../../../components/Icon";
import { ORG_METADATA, getMemberById, getAllMembers, KETUA, PENGURUS_INTI } from '../../../data/orgData';
import './Organization.css';

/**
 * Ekstraksi inisial nama untuk avatar fallback jika foto belum ada
 */
function getInitials(name, fallback = 'IFPI') {
  if (!name) return fallback.slice(0, 2).toUpperCase();
  const words = name
    .replace(/[^a-zA-Z\s]/g, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return 'IF';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export default function OrganizationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const found = getMemberById(id);
    setMember(found);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="pcr-profile-page">
        <div className="gov-container" style={{ textAlign: 'center', padding: "6rem 1rem" }}>
          <p style={{ color: '#64748B' }}>Memuat profil pengurus...</p>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="pcr-profile-page">
        <div className="gov-container" style={{ maxWidth: '640px', padding: '5rem 1.5rem', textAlign: "center" }}>
          <div className="pcr-notfound-card">
            <Icon name="alert-circle" size={48} color="var(--ifpi-red)" />
            <h2>Profil Pengurus Tidak Ditemukan</h2>
            <p>Pengenal pengurus yang Anda tuju tidak tercatat dalam struktur organisasi resmi DPW IFPI Provinsi Riau.</p>
            <Link to="/struktur" className="pcr-btn-back-link">
              <Icon name="arrow-left" size={16} />
              <span>Kembali ke Struktur Organisasi</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isFilled = Boolean(member.nama && member.nama.trim());
  const initials = getInitials(member.nama, member.jabatan);

  // Daftar pimpinan lain untuk navigasi cepat
  const keyLeaders = [KETUA, ...PENGURUS_INTI].filter((p) => p.id !== member.id);

  return (
    <div className="pcr-profile-page">
      {/* ============================================================
          1. HEADER BANNER BESAR (Model PCR Profil Dosen)
          ============================================================ */}
      <section className="pcr-profile-hero">
        <div className="pcr-profile-hero__bg" aria-hidden="true">
          <img
            src="/images/pelayanan-publik-riau.jpg"
            alt=""
            className="pcr-profile-hero__img"
            onError={(e) => {
              // fallback jika gambar lokal belum termuat
              e.target.src = 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1600&q=80';
            }}
          />
          <div className="pcr-profile-hero__overlay" />
        </div>

        <div className="pcr-profile-hero__content">
          <div className="gov-container">
            {/* Judul Besar: Profil + Nama Bergaris Bawah Merah */}
            <div className="pcr-profile-hero__title-wrap">
              <span className="pcr-profile-hero__prefix">Profil</span>
              <h1 className="pcr-profile-hero__name">
                {isFilled ? member.nama : member.jabatan}
              </h1>
              <div className="pcr-profile-hero__underline" />
            </div>

            {/* Breadcrumb teks mini di bawah garis */}
            <nav className="pcr-profile-hero__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">BERANDA</Link>
              <span className="pcr-breadcrumb-slash">/</span>
              <Link to="/struktur">STRUKTUR ORGANISASI</Link>
              <span className="pcr-breadcrumb-slash">/</span>
              <span className="pcr-breadcrumb-active">DETAIL PROFIL</span>
            </nav>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. KONTEN UTAMA: 2 KOLOM (FOTO KIRI + EDITORIAL KANAN)
          ============================================================ */}
      <main className="pcr-profile-body">
        <div className="gov-container">
          <div className="pcr-profile-layout">
            
            {/* ----- KOLOM KIRI: FOTO PORTRAIT BESAR & INFO SINGKAT ----- */}
            <aside className="pcr-profile-left">
              <div className="pcr-photo-card">
                {member.foto ? (
                  <div className="pcr-photo-wrap">
                    <img
                      src={member.foto}
                      alt={member.nama}
                      className="pcr-photo-img"
                    />
                  </div>
                ) : (
                  <div className="pcr-photo-placeholder">
                    <span className="pcr-photo-initials">{initials}</span>
                    <span className="pcr-photo-caption">{member.jabatan}</span>
                  </div>
                )}

                {/* Ringkasan Identitas di bawah Foto */}
                <div className="pcr-photo-meta">
                  <h2 className="pcr-meta-name">{isFilled ? member.nama : "Formasi Terdaftar"}</h2>
                  <div className="pcr-meta-role-badge">
                    {member.jabatanLengkap || member.jabatan}
                  </div>

                  {member.jabatanFungsional && (
                    <div className="pcr-meta-fungsional">
                      <Icon name="briefcase" size={14} color="var(--ifpi-red)" />
                      <span>{member.jabatanFungsional}</span>
                    </div>
                  )}

                  {member.unitKerja && (
                    <div className="pcr-meta-unit">
                      <Icon name="map-pin" size={14} color="var(--ifpi-red)" />
                      <span>{member.unitKerja}</span>
                    </div>
                  )}

                  <div className="pcr-meta-period">
                    <span>Masa Bakti:</span>
                    <strong>2027 – 2032</strong>
                  </div>

                  <div className="pcr-meta-status-chip">
                    <span className={`pcr-status-dot ${isFilled ? 'is-active' : 'is-pending'}`} />
                    <span>{isFilled ? 'Pengurus Aktif Definitif' : 'Tahap Penetapan SK'}</span>
                  </div>
                </div>
              </div>

              {/* Tombol Kembali ke Bagan */}
              <Link to="/struktur" className="pcr-btn-back">
                <Icon name="arrow-left" size={16} />
                <span>Kembali ke Bagan Struktur</span>
              </Link>

              {/* Sidebar Pimpinan Lainnya */}
              {keyLeaders.length > 0 && (
                <div className="pcr-sidebar-box">
                  <h3 className="pcr-sidebar-title">
                    <Icon name="users" size={15} color="var(--ifpi-red)" />
                    Pimpinan DPW Lainnya
                  </h3>
                  <div className="pcr-sidebar-list">
                    {keyLeaders.map((ldr) => (
                      <Link key={ldr.id} to={`/struktur/${ldr.id}`} className="pcr-sidebar-item">
                        <div className="pcr-sidebar-item__avatar">
                          {getInitials(ldr.nama, ldr.jabatan)}
                        </div>
                        <div className="pcr-sidebar-item__info">
                          <span className="pcr-sidebar-item__name">{ldr.nama}</span>
                          <span className="pcr-sidebar-item__role">{ldr.jabatan}</span>
                        </div>
                        <Icon name="chevron-right" size={13} color="#94A3B8" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>

            {/* ----- KOLOM KANAN: KONTEN ARTIKEL & PUBLIKASI (EDITORIAL STYLE) ----- */}
            <div className="pcr-profile-right">
              
              {/* Bagian 1: Biografi & Profil */}
              <section className="pcr-content-section">
                <h2 className="pcr-section-title">Profil &amp; Biodata</h2>
                {member.biodata?.deskripsi ? (
                  <p className="pcr-editorial-lead" style={{ whiteSpace: "pre-line" }}>
                    {member.biodata.deskripsi}
                  </p>
                ) : (
                  <p className="pcr-editorial-lead" style={{ color: '#64748B', fontStyle: "italic" }}>
                    Data biografi resmi untuk posisi ini sedang dalam proses verifikasi administratif oleh DPW IFPI Provinsi Riau.
                  </p>
                )}
              </section>

              {/* Bagian 2: Riwayat Karir ASN */}
              {member.biodata?.karirASN && (
                <section className="pcr-content-section">
                  <h2 className="pcr-section-title">Riwayat Karir ASN</h2>
                  <div className="pcr-timeline-card">
                    <div className="pcr-timeline-badge">
                      <Icon name="shield" size={18} color="#FFFFFF" />
                    </div>
                    <div className="pcr-timeline-content">
                      <h3 className="pcr-timeline-heading">Karir Kepegawaian ASN</h3>
                      <p className="pcr-timeline-text">{member.biodata.karirASN}</p>
                    </div>
                  </div>
                </section>
              )}

              {/* Bagian 3: Rincian Sesuai Data Resmi */}
              <section className="pcr-content-section">
                <h2 className="pcr-section-title">Informasi &amp; Kualifikasi</h2>
                <div className="pcr-facts-grid">
                  {member.biodata?.pendidikan && (
                    <div className="pcr-fact-card">
                      <div className="pcr-fact-label">Pendidikan</div>
                      <div className="pcr-fact-val">{member.biodata.pendidikan}</div>
                    </div>
                  )}

                  {member.biodata?.dosen && (
                    <div className="pcr-fact-card">
                      <div className="pcr-fact-label">Profesi Dosen</div>
                      <div className="pcr-fact-val">{member.biodata.dosen}</div>
                    </div>
                  )}

                  {member.biodata?.hobi && (
                    <div className="pcr-fact-card">
                      <div className="pcr-fact-label">Hobi &amp; Karya Tulisan</div>
                      <div className="pcr-fact-val">{member.biodata.hobi}</div>
                    </div>
                  )}

                  {member.biodata?.keluarga && (
                    <div className="pcr-fact-card">
                      <div className="pcr-fact-label">Keluarga &amp; Tempat Tinggal</div>
                      <div className="pcr-fact-val">
                        Lahir {member.biodata?.ttl || 'Pekanbaru'}. {member.biodata.keluarga}, bertempat tinggal di {member.biodata?.domisili || 'Kota Pekanbaru'}.
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Bagian 6: Banner Aksi Undangan / Konsultasi */}
              <div className="pcr-action-banner">
                <div className="pcr-action-banner__text">
                  <h3 className="pcr-action-banner__title">
                    Ingin Mengundang {member.nama || 'Pengurus'} sebagai Narasumber?
                  </h3>
                  <p className="pcr-action-banner__desc">
                    Instansi pemerintah, perguruan tinggi, atau organisasi dapat menyampaikan permohonan kehadiran narasumber resmi, bimtek, atau konsultasi regulasi melalui kanal resmi IFPI.
                  </p>
                </div>
                <div className="pcr-action-banner__buttons">
                  <Link to="/report?category=narasumber" className="pcr-btn-primary">
                    <Icon name="message-square" size={16} />
                    <span>Ajukan Undangan Narasumber</span>
                  </Link>
                  <Link to="/kontak" className="pcr-btn-secondary">
                    <span>Hubungi Sekretariat</span>
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
