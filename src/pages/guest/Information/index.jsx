import { Navigate } from 'react-router-dom';

/**
 * Halaman Informasi/FAQ kini menyatu di Beranda (bagian #faq).
 * Rute /informasi tetap dipertahankan agar tautan lama tidak menghasilkan 404,
 * tetapi diarahkan ke pusat informasi pada Beranda.
 */
export default function Information() {
  return <Navigate to="/#faq" replace />;
}
