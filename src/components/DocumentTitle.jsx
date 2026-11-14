import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE = 'DPW IFPI Provinsi Riau';

const TITLES = [
  { match: /^\/$/, title: `Beranda — ${BASE}` },
  { match: /^\/layanan/, title: `Layanan & Konsultasi — ${BASE}` },
  { match: /^\/report/, title: `Formulir Permohonan — ${BASE}` },
  { match: /^\/success/, title: `Tanda Terima Pengajuan — ${BASE}` },
  { match: /^\/track/, title: `Lacak Status Pengajuan — ${BASE}` },
  { match: /^\/kategori|^\/categories/, title: `Kategori Layanan — ${BASE}` },
  { match: /^\/struktur\/[^/]+/, title: `Profil Pengurus — ${BASE}` },
  { match: /^\/struktur/, title: `Struktur Organisasi — ${BASE}` },
  { match: /^\/wilayah\/[^/]+/, title: `Struktur Wilayah — ${BASE}` },
  { match: /^\/wilayah/, title: `Wilayah Kepengurusan — ${BASE}` },
  { match: /^\/kegiatan\/program-kerja/, title: `Program Kerja — ${BASE}` },
  { match: /^\/kegiatan\/agenda/, title: `Agenda Kegiatan — ${BASE}` },
  { match: /^\/kegiatan\/galeri/, title: `Galeri Foto — ${BASE}` },
  { match: /^\/kegiatan/, title: `Kegiatan — ${BASE}` },
  { match: /^\/merchandise\/pernak-pernik/, title: `Pernak-pernik — ${BASE}` },
  { match: /^\/merchandise\/cenderamata/, title: `Cenderamata — ${BASE}` },
  { match: /^\/merchandise/, title: `Merchandise — ${BASE}` },
  { match: /^\/kontak/, title: `Kontak Sekretariat — ${BASE}` },
  { match: /^\/admin\/login/, title: `Masuk Panel Petugas — ${BASE}` },
  { match: /^\/admin/, title: `Panel Petugas & Verifikator — ${BASE}` },
];

/**
 * Menetapkan judul dokumen sesuai rute aktif agar riwayat peramban,
 * tab, dan tautan yang dibagikan menampilkan konteks yang tepat.
 */
export default function DocumentTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    const found = TITLES.find((t) => t.match.test(pathname));
    document.title = found ? found.title : `Halaman Tidak Ditemukan — ${BASE}`;
  }, [pathname]);

  return null;
}
