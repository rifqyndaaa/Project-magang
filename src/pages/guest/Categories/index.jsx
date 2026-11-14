import { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from "../../../components/Breadcrumbs";
import Icon from "../../../components/Icon";
import PageHeader from "../../../components/PageHeader";
import { CATEGORIES } from '../../../data/categories';

export default function Categories() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = CATEGORIES.filter((cat) => {
    const term = searchTerm.toLowerCase();
    return (
      cat.name.toLowerCase().includes(term) ||
      cat.description.toLowerCase().includes(term) ||
      cat.opd.toLowerCase().includes(term) ||
      cat.examples.some(ex => ex.toLowerCase().includes(term))
    );
  });

  return (
    <div className="pg">
      <div className="gov-container">
        <Breadcrumbs items={[{ label: 'Kategori Layanan' }]} />

        <PageHeader
          eyebrow="Klasifikasi Layanan Publik"
          title={<>Katalog 3 Kategori <em>Layanan Resmi</em></>}
          lede="Tiga kategori layanan utama untuk konsultasi hukum, pengelolaan pengaduan masyarakat, serta koordinasi narasumber dan undangan kedinasan di lingkungan Pemerintah Provinsi Riau."
          meta={[
            { label: 'Jumlah Kategori', value: '3 Layanan' },
            { label: 'OPD Pembina', value: 'Biro Hukum · Inspektorat · Adpim' },
          ]}
        />

        <div className="pg-body">
          {/* Kotak Catatan Kewenangan Pemprov */}
          <div className="gov-alert gov-alert-info" style={{ display: 'flex', gap: '0.75rem', alignItems: "flex-start" }}>
            <div style={{ marginTop: '0.1rem' }}>
              <Icon name="info" size={20} color="var(--gov-blue)" />
            </div>
            <div>
              <strong style={{ display: 'block', marginBottom: '0.25rem' }}>
                Pedoman 3 Kategori Layanan Pemerintah Provinsi Riau:
              </strong>
              <p style={{ margin: 0, fontSize: '0.8125rem', lineHeight: 1.5 }}>
                Seluruh pengajuan masyarakat dan instansi diproses secara terpadu melalui 3 pilar layanan: <strong>Permasalahan dan Konsultasi Hukum</strong> (diampu oleh Biro Hukum Setda), <strong>Konsultasi Terkait Pengaduan</strong> (diampu oleh Inspektorat Daerah & Diskominfotik), serta <strong>Permintaan Narasumber dan Undangan</strong> (diampu oleh Biro Administrasi Pimpinan & BPSDM).
              </p>
            </div>
          </div>

          {/* Pencarian Kategori */}
          <div style={{ margin: '1.5rem 0 2rem 0', maxWidth: '550px' }}>
            <label htmlFor="search-category" className="gov-label">
              Cari Kategori atau Jenis Layanan
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                id="search-category"
                className="gov-input"
                placeholder="Ketik kata kunci, contoh: perda, narasumber, pengaduan, sengketa, undangan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingRight: '2.5rem' }}
              />
              <div style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--neutral-400)' }}>
                <Icon name="search" size={18} />
              </div>
            </div>
            {searchTerm && (
              <span className="gov-hint-text">
                Menampilkan {filteredCategories.length} kategori yang sesuai kata kunci "{searchTerm}".
              </span>
            )}
          </div>

          {/* Grid Kategori */}
          <div className="gov-grid gov-grid-3">
            {filteredCategories.map((cat) => (
              <div key={cat.id} className="gov-card" style={{ display: 'flex', flexDirection: "column" }}>
                <div className="gov-card-header" style={{ display: 'flex', alignItems: 'center', gap: "0.75rem" }}>
                  <div className="gov-cat-icon">
                    <Icon name={cat.icon} size={20} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, margin: 0, color: 'var(--gov-blue-dark)' }}>
                      {cat.name}
                    </h2>
                    <span style={{ fontSize: '0.75rem', color: 'var(--neutral-500)' }}>
                      {cat.shortName}
                    </span>
                  </div>
                </div>

                <div className="gov-card-body" style={{ flexGrow: 1 }}>
                  <p style={{ fontSize: '0.875rem', color: 'var(--neutral-700)', marginBottom: '1rem' }}>
                    {cat.description}
                  </p>

                  <div style={{ backgroundColor: 'var(--neutral-50)', padding: '0.75rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--neutral-200)', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--neutral-500)', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                      OPD Pembina Teknis:
                    </span>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--gov-blue-dark)' }}>
                      {cat.opd}
                    </span>
                  </div>

                  {cat.services && cat.services.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gov-blue-dark)', display: 'block', marginBottom: '0.4rem' }}>
                        Pilihan Layanan yang Tersedia:
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {cat.services.map((srv, sIdx) => (
                          <Link
                            key={sIdx}
                            to={`/report?category=${cat.id}&service=${encodeURIComponent(srv)}`}
                            style={{
                              fontSize: '0.775rem',
                              padding: '0.35rem 0.6rem',
                              backgroundColor: 'var(--ifpi-red-soft)',
                              color: 'var(--ifpi-red-dark)',
                              borderRadius: '4px',
                              border: '1px solid var(--ifpi-red-border)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              textDecoration: 'none'
                            }}
                            title={`Pilih layanan ${srv}`}
                          >
                            <span>{srv}</span>
                            <span style={{ fontSize: '0.85rem' }}>&rarr;</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neutral-700)', display: 'block', marginBottom: '0.4rem' }}>
                      Contoh Permohonan / Konsultasi:
                    </span>
                    <ul style={{ paddingLeft: '1.25rem', fontSize: '0.8125rem', color: 'var(--neutral-600)', margin: 0, lineHeight: 1.5 }}>
                      {cat.examples.map((ex, i) => (
                        <li key={i}>{ex}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="gov-card-footer" style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: "1px solid var(--neutral-100)" }}>
                  <Link
                    to={`/report?category=${cat.id}`}
                    className="gov-btn gov-btn-primary gov-btn-sm"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Ajukan Layanan</span>
                    <Icon name="arrow-right" size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', backgroundColor: 'var(--neutral-50)', border: '1px dashed var(--neutral-300)', borderRadius: 'var(--radius-sm)' }}>
              <Icon name="alert-circle" size={32} color="var(--neutral-400)" />
              <h3 style={{ marginTop: '0.75rem', color: 'var(--neutral-700)', fontSize: '1.125rem' }}>
                Kategori Tidak Ditemukan
              </h3>
              <p style={{ color: 'var(--neutral-500)', fontSize: '0.875rem' }}>
                Tidak ada kategori yang cocok dengan pencarian "{searchTerm}". Portal resmi Pemprov Riau melayani 3 kategori utama.
              </p>
              <Link to="/report" className="gov-btn gov-btn-secondary gov-btn-sm" style={{ marginTop: "1rem" }}>
                Buka Formulir Pengajuan
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
