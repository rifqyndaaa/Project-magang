import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Icon from '../../components/common/Icon';
import { CATEGORIES, RIAU_REGIONS } from '../../data/categories';
import { validateReportForm } from '../../utils/validation';
import { saveReport } from '../../utils/storage';

export default function Report() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCategoryParam = searchParams.get('category') || '';
  const initialServiceParam = searchParams.get('service') || '';

  // Mencocokkan kategori awal dari parameter URL jika ada
  const initialMatchedCategory = CATEGORIES.find(
    (c) => c.id === initialCategoryParam || c.name === initialCategoryParam
  );

  const [formData, setFormData] = useState(() => ({
    name: '',
    contact: '',
    applicantAgency: '',
    category: initialMatchedCategory ? initialMatchedCategory.id : '',
    serviceType: initialServiceParam || (initialMatchedCategory ? initialMatchedCategory.name : ''),
    eventDate: '',
    eventPurpose: '',
    title: '',
    message: '',
    region: '',
    locationDetail: '',
    image: null,
    letterAttachment: null,
    agreement: false
  }));

  const [showAdditional, setShowAdditional] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectCategory = (categoryId) => {
    const selectedCat = CATEGORIES.find((c) => c.id === categoryId);
    setFormData((prev) => ({
      ...prev,
      category: categoryId,
      serviceType: selectedCat ? selectedCat.name : ''
    }));

    if (errors.category) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.category;
        return next;
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: 'Ukuran berkas maksimal 5MB. Silakan pilih berkas yang lebih kecil.'
      }));
      return;
    }

    const isImage = file.type.startsWith('image/');
    const reader = new FileReader();

    reader.onloadend = () => {
      const resultData = reader.result;

      if (isImage) {
        setFormData((prev) => ({
          ...prev,
          image: resultData,
          letterAttachment: null
        }));
        setFilePreview({
          isImage: true,
          data: resultData,
          name: file.name,
          size: `${(file.size / 1024).toFixed(1)} KB`
        });
      } else {
        const attachmentObj = {
          fileName: file.name,
          fileSize: `${(file.size / 1024).toFixed(1)} KB`,
          fileType: file.type,
          data: resultData
        };
        setFormData((prev) => ({
          ...prev,
          image: null,
          letterAttachment: attachmentObj
        }));
        setFilePreview({
          isImage: false,
          data: null,
          name: file.name,
          size: `${(file.size / 1024).toFixed(1)} KB`
        });
      }

      setErrors((prev) => {
        const next = { ...prev };
        delete next.image;
        delete next.letterAttachment;
        return next;
      });
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setFilePreview(null);
    setFormData((prev) => ({
      ...prev,
      image: null,
      letterAttachment: null
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validation = validateReportForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);

      const firstErrorField = Object.keys(validation.errors)[0];
      const element = document.getElementById(`field-${firstErrorField}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    try {
      const createdReport = saveReport(formData);
      navigate('/success', {
        state: { report: createdReport },
        replace: true
      });
    } catch (err) {
      console.error('Gagal mengirim permohonan:', err);
      setErrors({ form: 'Terjadi kendala saat menyimpan data permohonan. Silakan coba kembali.' });
      setIsSubmitting(false);
    }
  };

  // Helper petunjuk deskripsi berdasarkan kategori
  const getMessagePlaceholder = () => {
    if (formData.category === 'hukum') {
      return 'Jelaskan permasalahan hukum yang ingin Anda konsultasikan.';
    }
    if (formData.category === 'pengaduan') {
      return 'Jelaskan pengaduan atau hal yang ingin Anda konsultasikan.';
    }
    if (formData.category === 'narasumber') {
      return 'Jelaskan tujuan kegiatan, kebutuhan narasumber, atau informasi undangan.';
    }
    return 'Jelaskan secara jelas dan lengkap permasalahan atau kebutuhan layanan Anda...';
  };

  const getTitlePlaceholder = () => {
    if (formData.category === 'hukum') {
      return 'Contoh: Konsultasi Penelaahan Peraturan Daerah / Masalah Regulasi';
    }
    if (formData.category === 'pengaduan') {
      return 'Contoh: Konsultasi Tata Cara Pengaduan / Klarifikasi Penanganan Aduan';
    }
    if (formData.category === 'narasumber') {
      return 'Contoh: Permohonan Narasumber Kegiatan Workshop / Undangan Kedinasan';
    }
    return 'Tuliskan judul atau perihal permohonan Anda...';
  };

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Beranda', href: '/' }, { label: 'Formulir Pelayanan' }]} />

      <section style={{ padding: '2.5rem 0', backgroundColor: 'var(--neutral-50)' }}>
        <div className="gov-container" style={{ maxWidth: '800px' }}>
          
          {/* Header Formulir */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="gov-section-tag">PELAYANAN PUBLIK PEMPROV RIAU</span>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--neutral-900)', marginTop: '0.35rem', marginBottom: '0.5rem' }}>
              Formulir Permohonan Layanan
            </h1>
            <p style={{ color: 'var(--neutral-600)', fontSize: '0.9375rem', maxWidth: '620px', margin: '0 auto' }}>
              Silakan pilih salah satu kategori layanan di bawah ini, kemudian lengkapi empat informasi utama permohonan Anda.
            </p>
          </div>

          {errors.form && (
            <div className="gov-alert gov-alert-danger" style={{ marginBottom: '1.5rem' }}>
              {errors.form}
            </div>
          )}

          {/* LANGKAH 1: PILIHAN TIGA LAYANAN (KARTU PILIHAN) */}
          <div className="gov-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }} id="field-category">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
              <label className="gov-label" style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--gov-blue-dark)' }}>
                1. Pilih Kategori Layanan <span className="required">*</span>
              </label>
              {formData.category && (
                <span style={{ fontSize: '0.75rem', color: 'var(--gov-green)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Icon name="check" size={14} color="var(--gov-green)" />
                  Kategori Terpilih
                </span>
              )}
            </div>

            <div className="gov-category-cards-grid" role="radiogroup" aria-label="3 Kategori Layanan Pemerintah Provinsi Riau">
              {CATEGORIES.map((cat) => {
                const isSelected = formData.category === cat.id;
                return (
                  <div
                    key={cat.id}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={0}
                    id={`category-card-${cat.id}`}
                    className={`gov-category-card ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => handleSelectCategory(cat.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectCategory(cat.id);
                      }
                    }}
                  >
                    <div className="gov-category-card-top">
                      <div className="gov-category-card-icon-wrap">
                        <Icon name={cat.icon || 'file-check'} size={20} />
                      </div>
                      <div className="gov-category-card-indicator" aria-hidden="true">
                        {isSelected && <div className="gov-category-card-indicator-dot" />}
                      </div>
                    </div>
                    <div>
                      <h4 className="gov-category-card-title">{cat.name}</h4>
                      <p className="gov-category-card-desc">{cat.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {errors.category && (
              <span className="gov-error-text" style={{ marginTop: '0.75rem' }}>
                {errors.category}
              </span>
            )}
          </div>

          {/* FORMULIR UTAMA & INFORMASI TAMBAHAN */}
          {!formData.category ? (
            /* Pesan Ajakan Memilih Kategori Terlebih Dahulu */
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px dashed var(--neutral-300)',
                borderRadius: 'var(--radius-md)',
                padding: '2.5rem 1.5rem',
                textAlign: 'center',
                color: 'var(--neutral-500)'
              }}
            >
              <Icon name="info" size={32} color="var(--gov-blue)" style={{ margin: '0 auto 0.75rem auto' }} />
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--neutral-800)', marginBottom: '0.35rem' }}>
                Silakan Pilih Salah Satu Kategori Layanan di Atas
              </div>
              <p style={{ fontSize: '0.875rem', maxWidth: '480px', margin: '0 auto', color: 'var(--neutral-600)' }}>
                Klik salah satu dari 3 kartu layanan di atas untuk membuka formulir permohonan.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="gov-card" style={{ padding: '2rem' }}>
                
                {/* Petunjuk Formulir Terbuka */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--neutral-200)' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gov-blue)', textTransform: 'uppercase' }}>
                      2. Formulir Utama
                    </span>
                    <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--neutral-900)', marginTop: '0.15rem' }}>
                      Lengkapi Rincian Permohonan Anda
                    </h3>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--neutral-500)' }}>
                    <span className="required">*</span> Wajib diisi
                  </span>
                </div>

                {/* 1. IDENTITAS PEMOHON (2 KOLOM INTI) */}
                <div className="gov-grid gov-grid-2" style={{ marginBottom: '1.25rem' }}>
                  <div className="gov-form-group" id="field-name" style={{ marginBottom: 0 }}>
                    <label htmlFor="input-name" className="gov-label">
                      Nama Lengkap <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="input-name"
                      name="name"
                      className={`gov-input ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="Contoh: Ahmad Fadillah"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name ? (
                      <span className="gov-error-text">{errors.name}</span>
                    ) : (
                      <span className="gov-hint-text">Nama lengkap pemohon.</span>
                    )}
                  </div>

                  <div className="gov-form-group" id="field-contact" style={{ marginBottom: 0 }}>
                    <label htmlFor="input-contact" className="gov-label">
                      Nomor WhatsApp / Telepon Aktif <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="input-contact"
                      name="contact"
                      className={`gov-input ${errors.contact ? 'is-invalid' : ''}`}
                      placeholder="Contoh: 081234567890"
                      value={formData.contact}
                      onChange={handleChange}
                    />
                    {errors.contact ? (
                      <span className="gov-error-text">{errors.contact}</span>
                    ) : (
                      <span className="gov-hint-text">Nomor aktif untuk konfirmasi petugas.</span>
                    )}
                  </div>
                </div>

                {/* KOLOM KHUSUS KATEGORI NARASUMBER & UNDANGAN */}
                {formData.category === 'narasumber' && (
                  <div
                    style={{
                      backgroundColor: '#F8FAFC',
                      border: '1px solid var(--neutral-200)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '1.125rem',
                      marginBottom: '1.25rem'
                    }}
                  >
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--gov-blue-dark)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Icon name="briefcase" size={16} color="var(--gov-blue)" />
                      <span>Rincian Kegiatan (Khusus Kategori Narasumber & Undangan)</span>
                    </div>

                    <div className="gov-grid gov-grid-2">
                      <div className="gov-form-group" id="field-eventDate" style={{ marginBottom: 0 }}>
                        <label htmlFor="input-eventDate" className="gov-label">
                          Tanggal Rencana Kegiatan (Opsional)
                        </label>
                        <input
                          type="date"
                          id="input-eventDate"
                          name="eventDate"
                          className="gov-input"
                          value={formData.eventDate}
                          onChange={handleChange}
                        />
                        <span className="gov-hint-text">Perkiraan waktu acara/kegiatan.</span>
                      </div>

                      <div className="gov-form-group" id="field-eventPurpose" style={{ marginBottom: 0 }}>
                        <label htmlFor="input-eventPurpose" className="gov-label">
                          Tujuan / Tema Agenda Kegiatan (Opsional)
                        </label>
                        <input
                          type="text"
                          id="input-eventPurpose"
                          name="eventPurpose"
                          className={`gov-input ${errors.eventPurpose ? 'is-invalid' : ''}`}
                          placeholder="Contoh: Seminar Kepemimpinan Mahasiswa"
                          value={formData.eventPurpose}
                          onChange={handleChange}
                        />
                        {errors.eventPurpose ? (
                          <span className="gov-error-text">{errors.eventPurpose}</span>
                        ) : (
                          <span className="gov-hint-text">Tema atau agenda utama kegiatan.</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. INFORMASI PERMOHONAN (JUDUL & DESKRIPSI) */}
                <div className="gov-form-group" id="field-title" style={{ marginBottom: '1.25rem' }}>
                  <label htmlFor="input-title" className="gov-label">
                    Judul atau Perihal <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="input-title"
                    name="title"
                    className={`gov-input ${errors.title ? 'is-invalid' : ''}`}
                    placeholder={getTitlePlaceholder()}
                    value={formData.title}
                    onChange={handleChange}
                    maxLength={120}
                  />
                  {errors.title ? (
                    <span className="gov-error-text">{errors.title}</span>
                  ) : (
                    <span className="gov-hint-text">
                      Tuliskan ringkasan pokok permohonan ({formData.title.length}/120 karakter).
                    </span>
                  )}
                </div>

                <div className="gov-form-group" id="field-message" style={{ marginBottom: '1.5rem' }}>
                  <label htmlFor="input-message" className="gov-label">
                    Deskripsi Permasalahan atau Kebutuhan <span className="required">*</span>
                  </label>
                  <textarea
                    id="input-message"
                    name="message"
                    rows={6}
                    className={`gov-textarea ${errors.message ? 'is-invalid' : ''}`}
                    placeholder={getMessagePlaceholder()}
                    value={formData.message}
                    onChange={handleChange}
                  />
                  {errors.message ? (
                    <span className="gov-error-text">{errors.message}</span>
                  ) : (
                    <span className="gov-hint-text">
                      {getMessagePlaceholder()} (Minimal 20 karakter, terisi {formData.message.length} karakter).
                    </span>
                  )}
                </div>

                {/* 3. INFORMASI TAMBAHAN (BAGIAN YANG DAPAT DIBUKA DAN DITUTUP) */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <button
                    type="button"
                    onClick={() => setShowAdditional((prev) => !prev)}
                    aria-expanded={showAdditional}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '0.875rem 1.125rem',
                      backgroundColor: showAdditional ? '#F1F5F9' : '#F8FAFC',
                      border: '1px solid var(--neutral-300)',
                      borderRadius: showAdditional ? 'var(--radius-sm) var(--radius-sm) 0 0' : 'var(--radius-sm)',
                      color: 'var(--neutral-800)',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--gov-blue)', fontWeight: 700, fontSize: '0.9375rem' }}>+</span>
                      <span>Informasi Tambahan (Opsional)</span>
                      {(formData.applicantAgency || formData.region || formData.locationDetail || formData.image || formData.letterAttachment) && (
                        <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', backgroundColor: 'var(--gov-blue-soft)', color: 'var(--gov-blue-dark)', borderRadius: '10px' }}>
                          Terisi
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--neutral-500)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      {showAdditional ? 'Sembunyikan' : 'Buka Kolom'}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          transform: showAdditional ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease'
                        }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>

                  {showAdditional && (
                    <div
                      style={{
                        padding: '1.25rem',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--neutral-300)',
                        borderTop: 'none',
                        borderRadius: '0 0 var(--radius-sm) var(--radius-sm)'
                      }}
                    >
                      {/* Asal Instansi / Organisasi */}
                      <div className="gov-form-group" id="field-applicantAgency" style={{ marginBottom: '1.25rem' }}>
                        <label htmlFor="input-applicantAgency" className="gov-label">
                          Asal Instansi atau Organisasi (Opsional)
                        </label>
                        <input
                          type="text"
                          id="input-applicantAgency"
                          name="applicantAgency"
                          className="gov-input"
                          placeholder="Contoh: BEM Universitas / Komunitas / Nama Lembaga"
                          value={formData.applicantAgency}
                          onChange={handleChange}
                        />
                        <span className="gov-hint-text">Dapat dikosongkan jika permohonan atas nama perorangan.</span>
                      </div>

                      {/* Kabupaten / Kota & Detail Lokasi */}
                      <div className="gov-grid gov-grid-2" style={{ marginBottom: '1.25rem' }}>
                        <div className="gov-form-group" id="field-region" style={{ marginBottom: 0 }}>
                          <label htmlFor="input-region" className="gov-label">
                            Kabupaten/Kota (Opsional)
                          </label>
                          <select
                            id="input-region"
                            name="region"
                            className="gov-select"
                            value={formData.region}
                            onChange={handleChange}
                          >
                            <option value="">-- Pilih Kabupaten/Kota (Bila Relevan) --</option>
                            {RIAU_REGIONS.map((region) => (
                              <option key={region} value={region}>
                                {region}
                              </option>
                            ))}
                          </select>
                          <span className="gov-hint-text">Wilayah kabupaten/kota di Riau yang berkaitan.</span>
                        </div>

                        <div className="gov-form-group" id="field-locationDetail" style={{ marginBottom: 0 }}>
                          <label htmlFor="input-locationDetail" className="gov-label">
                            Detail Lokasi (Opsional)
                          </label>
                          <input
                            type="text"
                            id="input-locationDetail"
                            name="locationDetail"
                            className="gov-input"
                            placeholder="Contoh: Gedung Aula / Jl. Sudirman / Kantor Desa"
                            value={formData.locationDetail}
                            onChange={handleChange}
                          />
                          <span className="gov-hint-text">Nama tempat atau jalan spesifik jika diperlukan.</span>
                        </div>
                      </div>

                      {/* Upload Foto atau Dokumen Pendukung */}
                      <div className="gov-form-group" id="field-image" style={{ marginBottom: 0 }}>
                        <label htmlFor="input-file" className="gov-label">
                          Upload Foto atau Dokumen Pendukung (Opsional)
                        </label>
                        <input
                          type="file"
                          id="input-file"
                          accept="image/jpeg,image/png,image/webp,application/pdf"
                          onChange={handleFileUpload}
                          className="gov-input"
                          style={{ padding: '0.45rem 0.75rem' }}
                        />
                        {errors.image ? (
                          <span className="gov-error-text">{errors.image}</span>
                        ) : (
                          <span className="gov-hint-text">
                            Format berkas: Foto (JPG, PNG, WebP) atau Dokumen (PDF). Maksimal 5MB.
                          </span>
                        )}

                        {filePreview && (
                          <div
                            style={{
                              marginTop: '0.75rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              backgroundColor: '#F8FAFC',
                              border: '1px solid var(--neutral-300)',
                              padding: '0.5rem 0.75rem',
                              borderRadius: 'var(--radius-sm)'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
                              {filePreview.isImage ? (
                                <img
                                  src={filePreview.data}
                                  alt="Pratinjau"
                                  style={{ width: '38px', height: '38px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--neutral-200)' }}
                                />
                              ) : (
                                <div
                                  style={{
                                    width: '38px',
                                    height: '38px',
                                    backgroundColor: 'var(--gov-blue-soft)',
                                    color: 'var(--gov-blue)',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 700,
                                    fontSize: '0.7rem'
                                  }}
                                >
                                  PDF
                                </div>
                              )}
                              <div>
                                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--neutral-900)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '280px' }}>
                                  {filePreview.name}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)' }}>
                                  {filePreview.size}
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={handleRemoveFile}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#DC2626',
                                cursor: 'pointer',
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                padding: '0.2rem 0.4rem'
                              }}
                            >
                              Hapus Berkas
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* PERNYATAAN PERSETUJUAN */}
                <div className="gov-form-group" id="field-agreement" style={{ marginBottom: '1.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--neutral-200)' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--neutral-800)' }}>
                    <input
                      type="checkbox"
                      id="input-agreement"
                      name="agreement"
                      checked={formData.agreement}
                      onChange={handleChange}
                      style={{ marginTop: '0.2rem', width: '16px', height: '16px' }}
                    />
                    <span>
                      Saya menyatakan bahwa data dan informasi yang saya sampaikan adalah <strong>benar</strong> dan dapat dipertanggungjawabkan untuk keperluan pelayanan publik Pemerintah Provinsi Riau.
                    </span>
                  </label>
                  {errors.agreement && <span className="gov-error-text">{errors.agreement}</span>}
                </div>

                {/* TOMBOL AKSI */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <Link to="/" className="gov-btn gov-btn-outline-neutral">
                    <Icon name="arrow-left" size={15} />
                    <span>Kembali ke Beranda</span>
                  </Link>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="gov-btn gov-btn-primary gov-btn-lg"
                    id="btn-submit-report"
                  >
                    <Icon name="file-check" size={18} />
                    <span>{isSubmitting ? 'Mengirimkan Permohonan...' : 'Kirim Permohonan'}</span>
                  </button>
                </div>

              </div>
            </form>
          )}

        </div>
      </section>
    </div>
  );
}
