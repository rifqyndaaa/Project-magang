// Utility untuk pembuatan nomor tiket pengaduan
// Format: Riau-YYYY-000001 (tahun dinamis dari tanggal laporan, nomor urut unik)

/**
 * Menghasilkan nomor tiket berikutnya berdasarkan daftar laporan yang ada
 * @param {Array} existingReports - Daftar laporan yang sudah tersimpan
 * @param {Date} [date] - Tanggal pembuatan (default: saat ini)
 * @returns {string} Nomor tiket unik, contoh: "Riau-2026-000001"
 */
export function generateTicketNumber(existingReports = [], date = new Date()) {
  const year = date.getFullYear();
  const prefix = `Riau-${year}-`;

  // Cari nomor urut tertinggi untuk tahun yang sama
  let maxNumber = 0;
  
  if (Array.isArray(existingReports)) {
    for (const report of existingReports) {
      if (report && typeof report.ticketNumber === 'string') {
        const parts = report.ticketNumber.split('-');
        if (parts.length === 3 && parts[0] === 'Riau' && parts[1] === String(year)) {
          const num = parseInt(parts[2], 10);
          if (!isNaN(num) && num > maxNumber) {
            maxNumber = num;
          }
        }
      }
    }
  }

  const nextNumber = maxNumber + 1;
  const paddedNumber = String(nextNumber).padStart(6, '0');
  return `${prefix}${paddedNumber}`;
}

/**
 * Validasi apakah format nomor tiket sesuai standar Riau-YYYY-XXXXXX
 * @param {string} ticketNumber
 * @returns {boolean}
 */
export function isValidTicketFormat(ticketNumber) {
  if (!ticketNumber || typeof ticketNumber !== 'string') return false;
  const regex = /^Riau-\d{4}-\d{6}$/i;
  return regex.test(ticketNumber.trim());
}
