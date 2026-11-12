import './Organization.css';

/**
 * Data pengurus organisasi.
 * PENTING: Ganti placeholder ini dengan data resmi yang sebenarnya.
 * Setiap objek berisi: name, title (jabatan), img (path foto).
 * Jika foto belum tersedia, biarkan img kosong — komponen akan menampilkan avatar inisial.
 */
const members = [
  { name: 'Nama Ketua Umum',       title: 'Ketua Umum',           img: '' },
  { name: 'Nama Wakil Ketua',      title: 'Wakil Ketua',          img: '' },
  { name: 'Nama Sekretaris',       title: 'Sekretaris',           img: '' },
  { name: 'Nama Wakil Sekretaris', title: 'Wakil Sekretaris',     img: '' },
  { name: 'Nama Bendahara',        title: 'Bendahara',            img: '' },
  { name: 'Nama Koordinator I',    title: 'Koordinator Bidang I', img: '' },
  { name: 'Nama Koordinator II',   title: 'Koordinator Bidang II',img: '' },
  { name: 'Nama Koordinator III',  title: 'Koordinator Bidang III',img: '' },
  { name: 'Nama Anggota 1',        title: 'Anggota',              img: '' },
  { name: 'Nama Anggota 2',        title: 'Anggota',              img: '' },
  { name: 'Nama Anggota 3',        title: 'Anggota',              img: '' },
  { name: 'Nama Anggota 4',        title: 'Anggota',              img: '' },
];

/**
 * Komponen avatar fallback — menampilkan inisial jika foto tidak tersedia.
 */
function AvatarPlaceholder({ name }) {
  const initials = name
    .split(' ')
    .filter(w => w.length > 0)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');

  return (
    <div className="org-avatar-placeholder">
      <span>{initials}</span>
    </div>
  );
}

export default function Organization() {
  return (
    <section className="org-page">
      <div className="gov-container">
        {/* Header */}
        <div className="org-page-header">
          <h1 className="org-page-title">
            Profil <span className="org-title-accent">Pengurus</span>
          </h1>
          <p className="org-page-subtitle">
            Ikatan Fungsional Pengadaan Indonesia — Provinsi Riau
          </p>
          <p className="org-page-desc">
            Berikut adalah susunan pengurus organisasi yang bertugas dalam koordinasi
            dan pelaksanaan kegiatan. Data di bawah bersifat placeholder dan akan
            diperbarui setelah data resmi tersedia.
          </p>
        </div>

        {/* Grid kartu profil */}
        <div className="org-grid">
          {members.map((m, idx) => (
            <div key={idx} className="org-card">
              <div className="org-card-photo">
                {m.img ? (
                  <img src={m.img} alt={m.name} className="org-card-img" />
                ) : (
                  <AvatarPlaceholder name={m.name} />
                )}
              </div>
              <div className="org-card-info">
                <p className="org-card-name" title={m.name}>{m.name}</p>
                <p className="org-card-title">{m.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
