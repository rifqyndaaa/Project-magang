import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumbs from "../../../components/Breadcrumbs";
import Icon from "../../../components/Icon";
import { getRegionById } from '../../../data/regionsData';
import { fetchRegionData, staticMembers } from '../../../services/regionDataService';
import './Regions.css';

export default function RegionStructure() {
  const { id } = useParams();
  const region = getRegionById(id);
  const isProvinsi = region?.type === 'provinsi';

  const [searchQuery, setSearchQuery] = useState('');
  const [asnFilter, setAsnFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Data personel: tampil dari file statis lebih dulu agar halaman tidak kosong,
  // lalu diganti data terbaru dari Supabase bila tersedia.
  // `dbData` menyimpan regionId agar data wilayah lama tidak bocor ke wilayah baru.
  const [dbData, setDbData] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  useEffect(() => {
    if (!region) return undefined;
    let active = true;
    fetchRegionData(region.id).then((res) => {
      if (!active) return;
      setDbData({ regionId: region.id, members: res.members });
    });
    return () => {
      active = false;
    };
  }, [region]);

  const members = useMemo(
    () =>
      dbData && region && dbData.regionId === region.id && dbData.members.length > 0
        ? dbData.members
        : region
        ? staticMembers(region.id)
        : [],
    [dbData, region]
  );

  const hasMembers = members.length > 0;
  const hasStructure = Boolean(
    region && region.isAvailable && ((region.kepengurusan && region.kepengurusan.length > 0) || hasMembers)
  );

  const filteredMembers = useMemo(() => {
    let list = members;
    if (asnFilter !== 'ALL') {
      list = list.filter((m) => m.asn.toUpperCase() === asnFilter);
    }
    if (statusFilter !== 'ALL') {
      list = list.filter((m) => m.membershipStatus === statusFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          (m.nip || '').includes(q) ||
          (m.kta && m.kta.includes(q)) ||
          (m.position || '').toLowerCase().includes(q) ||
          (m.email && m.email.toLowerCase().includes(q))
      );
    }
    return list;
  }, [members, searchQuery, asnFilter, statusFilter]);

  const stats = useMemo(() => {
    if (!members.length) return null;
    const total = members.length;
    const pns = members.filter((m) => m.asn.toUpperCase() === 'PNS').length;
    const pppk = members.filter((m) => m.asn.toUpperCase() === 'PPPK').length;
    const cpns = members.filter((m) => m.asn.toUpperCase() === 'CPNS').length;
    const aktif = members.filter((m) => m.membershipStatus === 'Aktif').length;
    return { total, pns, pppk, cpns, aktif };
  }, [members]);

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

  return (
    <div className="reg-struct-page">
      <div className="gov-container">
        {/* Breadcrumbs Navigasi */}
        <Breadcrumbs
          items={[
            { label: 'Beranda', to: '/' },
            { label: 'Wilayah Kepengurusan', to: '/wilayah' },
            { label: region.name, to: `/wilayah#${region.id}` },
            { label: 'Daftar Nominatif Anggota & Struktur' },
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
            <span>{isProvinsi ? 'Dewan Pengurus Wilayah (DPW) IFPI' : 'Dewan Pengurus Cabang (DPC) IFPI'}</span>
          </div>

          <h1 className="regions-title">
            {isProvinsi ? (
              <>Daftar Nominatif JF PPBJ <span className="regions-title-accent">{region.name}</span></>
            ) : (
              <>Daftar Personel &amp; Kepengurusan IFPI <span className="regions-title-accent">{region.name}</span></>
            )}
          </h1>

          <p className="regions-desc">
            Daftar nominatif resmi Pejabat Fungsional Pengelola Pengadaan Barang/Jasa (JF PPBJ) dan keanggotaan IFPI di lingkungan {region.name}.
          </p>

          {/* Keterangan Surat / Kontak Sekretariat jika ada */}
          {region.secretariat && (
            <div className="reg-struct-secretariat-card">
              <div className="reg-struct-secretariat-icon">
                <Icon name="map-pin" size={18} color="var(--ifpi-red)" />
              </div>
              <div className="reg-struct-secretariat-info">
                <strong>Sekretariat / Alamat Kedinasan:</strong>
                <p>{region.secretariat.address}</p>
                <div className="reg-struct-secretariat-links">
                  {region.secretariat.website && (
                    <a href={region.secretariat.website} target="_blank" rel="noopener noreferrer">
                      <Icon name="external-link" size={12} />
                      <span>{region.secretariat.website}</span>
                    </a>
                  )}
                  {region.secretariat.email && (
                    <a href={`mailto:${region.secretariat.email}`}>
                      <Icon name="mail" size={12} />
                      <span>{region.secretariat.email}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </header>

        {/* TAMPILAN JIKA DATA NOMINATIF ANGGOTA TERSEDIA */}
        {hasMembers ? (
          <div className="reg-struct-content">
            {/* KPI Ribbon Statistik Personel Wilayah */}
            {stats && (
              <div className="reg-struct-stats-grid">
                <div className="reg-struct-stat-tile">
                  <span className="reg-struct-stat-num">{stats.total}</span>
                  <span className="reg-struct-stat-lbl">Total JF PPBJ</span>
                  <span className="reg-struct-stat-sub">Personel Terdata</span>
                </div>
                <div className="reg-struct-stat-tile highlight">
                  <span className="reg-struct-stat-num">{stats.pns}</span>
                  <span className="reg-struct-stat-lbl">PNS</span>
                  <span className="reg-struct-stat-sub">Pegawai Negeri Sipil</span>
                </div>
                <div className="reg-struct-stat-tile">
                  <span className="reg-struct-stat-num">{stats.pppk}</span>
                  <span className="reg-struct-stat-lbl">PPPK</span>
                  <span className="reg-struct-stat-sub">Pegawai Pemerintah dg Perjanjian Kerja</span>
                </div>
                <div className="reg-struct-stat-tile">
                  <span className="reg-struct-stat-num">{stats.cpns}</span>
                  <span className="reg-struct-stat-lbl">CPNS</span>
                  <span className="reg-struct-stat-sub">Calon Pegawai Negeri Sipil</span>
                </div>
                <div className="reg-struct-stat-tile">
                  <span className="reg-struct-stat-num" style={{ color: 'var(--ifpi-red)' }}>{stats.aktif}</span>
                  <span className="reg-struct-stat-lbl">KTA Aktif</span>
                  <span className="reg-struct-stat-sub">Anggota Terdaftar IFPI</span>
                </div>
              </div>
            )}

            {/* TABEL NOMINATIF RESMI DOKUMEN */}
            <div className="reg-struct-table-wrapper">
              <div className="reg-struct-table-head-bar">
                <div className="reg-struct-table-title-group">
                  <Icon name="file-text" size={20} color="var(--ifpi-red)" />
                  <div>
                    <h2 className="reg-struct-table-title">Daftar Nominatif JF PPBJ {region.name}</h2>
                    <p className="reg-struct-table-subtitle">Data resmi sesuai surat usulan rekonsiliasi kepegawaian &amp; keanggotaan IFPI</p>
                  </div>
                </div>

                <div className="reg-struct-table-actions">
                  <button
                    type="button"
                    className="reg-struct-btn-print"
                    onClick={() => window.print()}
                    title="Cetak atau Simpan Dokumen PDF"
                  >
                    <Icon name="download" size={14} />
                    <span>Cetak Dokumen</span>
                  </button>
                </div>
              </div>

              {/* Toolbar Filter Tabel */}
              <div className="reg-struct-table-toolbar">
                <div className="reg-struct-search-wrap">
                  <Icon name="search" size={16} color="#64748B" />
                  <input
                    type="text"
                    className="reg-struct-search-input"
                    placeholder="Cari nama anggota, NIP, no. KTA, atau jabatan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="reg-struct-search-clear"
                      onClick={() => setSearchQuery('')}
                    >
                      ×
                    </button>
                  )}
                </div>

                <div className="reg-struct-filter-selects">
                  <div className="reg-struct-select-group">
                    <label htmlFor="filter-asn">Status ASN:</label>
                    <select
                      id="filter-asn"
                      value={asnFilter}
                      onChange={(e) => setAsnFilter(e.target.value)}
                      className="reg-struct-select"
                    >
                      <option value="ALL">Semua ASN</option>
                      <option value="PNS">PNS</option>
                      <option value="PPPK">PPPK</option>
                      <option value="CPNS">CPNS</option>
                    </select>
                  </div>

                  <div className="reg-struct-select-group">
                    <label htmlFor="filter-status">Keanggotaan:</label>
                    <select
                      id="filter-status"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="reg-struct-select"
                    >
                      <option value="ALL">Semua Status</option>
                      <option value="Aktif">Aktif</option>
                      <option value="Tidak aktif">Tidak aktif</option>
                      <option value="Belum Terdaftar">Belum Terdaftar</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Tabel Data Responsif */}
              <div className="reg-struct-table-scroll">
                <table className="reg-struct-official-table">
                  <thead>
                    <tr>
                      <th style={{ width: '48px', textAlign: 'center' }}>No</th>
                      <th>Nama Lengkap</th>
                      <th style={{ width: '80px', textAlign: 'center' }}>ASN</th>
                      <th>Jabatan</th>
                      <th>NIP</th>
                      <th>No. KTA</th>
                      <th style={{ textAlign: 'center' }}>Status Keanggotaan</th>
                      <th>No. HP</th>
                      <th>Email</th>
                      {members.some((m) => m.note) && <th>Keterangan</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMembers.length > 0 ? (
                      filteredMembers.map((m) => (
                        <tr key={m.no}>
                          <td style={{ textAlign: 'center', fontWeight: 600, color: '#64748B' }}>
                            {m.no}.
                          </td>
                          <td>
                            <strong className="reg-table-person-name">{m.name}</strong>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <span className={`reg-badge-asn reg-badge-asn--${m.asn.toLowerCase()}`}>
                              {m.asn}
                            </span>
                          </td>
                          <td style={{ color: '#334155', fontWeight: 500 }}>
                            {m.position}
                          </td>
                          <td style={{ fontFamily: 'monospace', fontSize: '0.8125rem', color: '#475569' }}>
                            {m.nip}
                          </td>
                          <td style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>
                            {m.kta && m.kta !== '-' ? (
                              <span style={{ fontWeight: 600, color: 'var(--ifpi-red)' }}>{m.kta}</span>
                            ) : (
                              <span style={{ color: '#94A3B8' }}>—</span>
                            )}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <span
                              className={`reg-table-status-pill ${
                                m.membershipStatus === 'Aktif'
                                  ? 'is-active'
                                  : m.membershipStatus === 'Tidak aktif'
                                  ? 'is-inactive'
                                  : 'is-pending'
                              }`}
                            >
                              {m.membershipStatus}
                            </span>
                          </td>
                          <td>
                            {m.phone ? (
                              <a
                                href={`https://wa.me/62${m.phone.replace(/^0/, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="reg-table-link-phone"
                                title="Chat WhatsApp"
                              >
                                <Icon name="phone" size={12} />
                                <span>{m.phone}</span>
                              </a>
                            ) : (
                              '—'
                            )}
                          </td>
                          <td>
                            {m.email ? (
                              <a
                                href={`mailto:${m.email}`}
                                className="reg-table-link-email"
                                title="Kirim Email"
                              >
                                <Icon name="mail" size={12} />
                                <span>{m.email}</span>
                              </a>
                            ) : (
                              '—'
                            )}
                          </td>
                          {members.some((item) => item.note) && (
                            <td style={{ fontSize: '0.75rem', color: '#64748B', fontStyle: m.note ? 'italic' : 'normal' }}>
                              {m.note || '—'}
                            </td>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={members.some((m) => m.note) ? 10 : 9} style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748B' }}>
                          <Icon name="search" size={28} color="#94A3B8" />
                          <p style={{ marginTop: '0.5rem', fontWeight: 600 }}>Tidak ada data yang sesuai dengan filter pencarian.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer Keterangan Resmi Dokumen */}
              <div className="reg-struct-table-footer">
                <div className="reg-struct-doc-meta">
                  <Icon name="info" size={16} color="var(--ifpi-red)" />
                  <span>
                    Catatan: Data di atas disinkronkan secara berkala dengan Sistem Basis Data Keanggotaan IFPI Riau.
                    Untuk permohonan pembaruan NIP, Nomor KTA, atau mutasi jabatan, hubungi Sekretariat DPW IFPI Riau.
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : hasStructure ? (
          /* JIKA MEMILIKI STRUKTUR ORGANISASI KEPENGURUSAN */
          <div className="reg-struct-tree-container">
            <p style={{ textAlign: 'center', color: '#64748B' }}>Bagan kepengurusan cabang aktif.</p>
          </div>
        ) : (
          /* JIKA BELUM MEMILIKI DATA */
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

