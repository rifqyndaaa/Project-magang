import { CATEGORIES } from '../../data/categories';

// Validasi formulir pengaduan masyarakat
export function validateReportForm(formData) {
  const errors = {};

  // Validasi Nama
  if (!formData.name || formData.name.trim().length < 3) {
    errors.name = 'Nama lengkap wajib diisi minimal 3 karakter.';
  } else if (formData.name.trim().length > 80) {
    errors.name = 'Nama lengkap maksimal 80 karakter.';
  }

  // Validasi Kontak (Telepon/WhatsApp/Email)
  if (!formData.contact || formData.contact.trim().length < 8) {
    errors.contact = 'Nomor kontak / WhatsApp aktif wajib diisi minimal 8 digit.';
  } else {
    const contactClean = formData.contact.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactClean);
    const isPhone = /^[0-9+() -]{8,20}$/.test(contactClean);
    if (!isEmail && !isPhone) {
      errors.contact = 'Masukkan nomor telepon/WhatsApp atau alamat email yang valid.';
    }
  }

  // Validasi Judul
  if (!formData.title || formData.title.trim().length < 5) {
    errors.title = 'Judul permohonan / laporan wajib diisi minimal 5 karakter.';
  } else if (formData.title.trim().length > 120) {
    errors.title = 'Judul permohonan / laporan maksimal 120 karakter.';
  }

  // Validasi Kategori (Hanya 3 kategori resmi)
  const matchingCategory = CATEGORIES.find(
    (c) => c.id === formData.category || c.name === formData.category
  );

  if (!formData.category || formData.category.trim() === '') {
    errors.category = 'Pilih salah satu dari 3 kategori layanan resmi yang tersedia.';
  } else if (!matchingCategory) {
    errors.category = 'Kategori layanan tidak valid. Silakan pilih dari 3 kategori resmi yang tersedia.';
  }

  // Validasi Asal Instansi / Organisasi (Opsional)
  if (formData.applicantAgency && formData.applicantAgency.trim().length > 0 && formData.applicantAgency.trim().length < 2) {
    errors.applicantAgency = 'Nama instansi/organisasi minimal 2 karakter jika diisi.';
  }

  // Validasi Tujuan Kegiatan Khusus Narasumber (Opsional)
  if (formData.eventPurpose && formData.eventPurpose.trim().length > 0 && formData.eventPurpose.trim().length < 3) {
    errors.eventPurpose = 'Tujuan agenda kegiatan minimal 3 karakter jika diisi.';
  }

  // Validasi Wilayah & Lokasi (Opsional: Tidak mewajibkan kabupaten/kota atau alamat detail jika tidak relevan)
  if (formData.locationDetail && formData.locationDetail.trim().length > 0 && formData.locationDetail.trim().length < 3) {
    errors.locationDetail = 'Detail lokasi/alamat minimal 3 karakter jika diisi.';
  }

  // Validasi Isi Pengaduan / Pesan
  if (!formData.message || formData.message.trim().length < 20) {
    errors.message = 'Uraikan permasalahan secara jelas dan lengkap minimal 20 karakter.';
  } else if (formData.message.trim().length > 2500) {
    errors.message = 'Uraian pengaduan maksimal 2500 karakter.';
  }

  // Validasi Persetujuan
  if (!formData.agreement) {
    errors.agreement = 'Anda wajib menyetujui pernyataan kebenaran data laporan.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
