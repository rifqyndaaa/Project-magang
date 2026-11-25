import { useCallback, useEffect, useMemo, useState } from 'react';
import Icon from '../../components/Icon';
import { RIAU_REGIONS_DATA } from '../../data/regionsData';
import {
  fetchAllMembers,
  fetchAllOfficials,
  saveMember,
  deleteMember,
  saveOfficial,
  deleteOfficial,
  normalizeStatus,
  normalizeAsn,
} from '../../services/regionDataService';
import './RegionStructurePanel.css';

const EMPTY_MEMBER = {
  id: null,
  regionId: '',
  no: '',
  name: '',
  asn: 'PNS',
  position: '',
  nip: '',
  kta: '',
  membershipStatus: 'Aktif',
  phone: '',
  email: '',
  note: '',
};

const EMPTY_OFFICIAL = {
  id: null,
  regionId: '',
  jabatan: '',
  nama: '',
  nip: '',
  status: 'PNS',
  urutan: '',
};

const ASN_OPTIONS = ['PNS', 'PPPK', 'CPNS'];
const STATUS_OPTIONS = ['Aktif', 'Tidak aktif', 'Belum Terdaftar'];

/**
 * RegionStructurePanel — CRUD personel & kepengurusan wilayah.
 *
 * Data dibaca dan ditulis langsung ke tabel Supabase `region_members`
 * dan `region_officials`. Tidak ada salinan di kode, sehingga perubahan
 * langsung tampil di portal publik tanpa perlu deploy ulang.
 */
export default function RegionStructurePanel() {
  const [tab, setTab] = useState('personel');
  const [members, setMembers] = useState([]);
  const [officials, setOfficials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const [regionFilter, setRegionFilter] = useState('');
  const [query, setQuery] = useState('');

  const [memberForm, setMemberForm] = useState(EMPTY_MEMBER);
  const [officialForm, setOfficialForm] = useState(EMPTY_OFFICIAL);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [showOfficialForm, setShowOfficialForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const flash = (type, message) => {
    setNotice({ type, message });
    window.setTimeout(() => setNotice(null), 6000);
  };

  const load = useCallback(() => {
    setLoading(true);
    setReloadKey((k) => k + 1);
  }, []);

  useEffect(() => {
    let active = true;
    const run = async () => {
      const [m, o] = await Promise.all([fetchAllMembers(), fetchAllOfficials()]);
      if (!active) return;
      setMembers(m.rows);
      setOfficials(o.rows);
      setLoadError(m.error || o.error || '');
      setLoading(false);
    };
    run();
    return () => {
      active = false;
    };
  }, [reloadKey]);

  const regionLabel = (id) =>
    RIAU_REGIONS_DATA.find((r) => r.id === id)?.shortName || id || '—';

  /* ---------------- daftar terlihat ---------------- */

  const visibleMembers = useMemo(() => {
    const q = query.toLowerCase().trim();
    return members.filter((m) => {
      if (regionFilter && m.regionId !== regionFilter) return false;
      if (!q) return true;
      return (
        m.name.toLowerCase().includes(q) ||
        m.nip.includes(q) ||
        (m.kta || '').toLowerCase().includes(q) ||
        m.position.toLowerCase().includes(q) ||
        (m.email || '').toLowerCase().includes(q)
      );
    });
  }, [members, regionFilter, query]);

  const visibleOfficials = useMemo(() => {
    const q = query.toLowerCase().trim();
    return officials.filter((o) => {
      if (regionFilter && o.regionId !== regionFilter) return false;
      if (!q) return true;
      return (
        o.nama.toLowerCase().includes(q) ||
        o.jabatan.toLowerCase().includes(q) ||
        (o.nip || '').includes(q)
      );
    });
  }, [officials, regionFilter, query]);

  const nextNumber = (regionId) => {
    const list = members.filter((m) => m.regionId === regionId);
    const max = list.reduce((acc, m) => Math.max(acc, Number(m.no) || 0), 0);
    return max + 1;
  };

  /* ---------------- Personel: simpan ---------------- */

  const submitMember = async (e) => {
    e.preventDefault();
    if (!memberForm.regionId) {
      flash('warn', 'Pilih wilayah lebih dulu.');
      return;
    }
    if (!memberForm.name.trim()) {
      flash('warn', 'Nama personel wajib diisi.');
      return;
    }

    setBusy(true);
    const res = await saveMember({
      ...memberForm,
      no: Number(memberForm.no) || nextNumber(memberForm.regionId),
    });
    setBusy(false);

    if (!res.success) {
      flash('err', `Gagal menyimpan: ${res.message}`);
      return;
    }
    setShowMemberForm(false);
    setMemberForm(EMPTY_MEMBER);
    flash('ok', res.mode === 'update' ? 'Data personel diperbarui.' : 'Personel baru ditambahkan.');
    load();
  };

  const editMember = (m) => {
    setMemberForm({ ...EMPTY_MEMBER, ...m, no: String(m.no ?? '') });
    setShowMemberForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeMember = async (id) => {
    setBusy(true);
    const res = await deleteMember(id);
    setBusy(false);
    if (!res.success) {
      flash('err', `Gagal menghapus: ${res.message}`);
      return;
    }
    setConfirmDelete(null);
    flash('ok', 'Personel dihapus dari basis data.');
    load();
  };

  /* ---------------- Kepengurusan: simpan ---------------- */

  const submitOfficial = async (e) => {
    e.preventDefault();
    if (!officialForm.regionId) {
      flash('warn', 'Pilih wilayah lebih dulu.');
      return;
    }
    if (!officialForm.jabatan.trim() || !officialForm.nama.trim()) {
      flash('warn', 'Jabatan dan nama pengurus wajib diisi.');
      return;
    }

    setBusy(true);
    const res = await saveOfficial(officialForm);
    setBusy(false);

    if (!res.success) {
      flash('err', `Gagal menyimpan: ${res.message}`);
      return;
    }
    setShowOfficialForm(false);
    setOfficialForm(EMPTY_OFFICIAL);
    flash('ok', res.mode === 'update' ? 'Data kepengurusan diperbarui.' : 'Pengurus baru ditambahkan.');
    load();
  };

  const editOfficial = (o) => {
    setOfficialForm({ ...EMPTY_OFFICIAL, ...o, urutan: String(o.urutan ?? '') });
    setShowOfficialForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeOfficial = async (id) => {
    setBusy(true);
    const res = await deleteOfficial(id);
    setBusy(false);
    if (!res.success) {
      flash('err', `Gagal menghapus: ${res.message}`);
      return;
    }
    setConfirmDelete(null);
    flash('ok', 'Pengurus dihapus dari basis data.');
    load();
  };

  /* ---------------- render ---------------- */

  const isPersonel = tab === 'personel';
  const shown = isPersonel ? visibleMembers.length : visibleOfficials.length;
  const totalAll = isPersonel ? members.length : officials.length;

  return (
    <section className="rsp" aria-labelledby="rsp-title">
      <div className="rsp-head">
        <div>
          <h2 id="rsp-title" className="rsp-head__title">
            Kelola Personel &amp; Kepengurusan
          </h2>
          <p className="rsp-head__desc">
            Data tersimpan langsung di basis data Supabase. Perubahan di sini langsung tampil di
            portal publik tanpa perlu deploy ulang.
          </p>
        </div>
        <button
          type="button"
          className="adx-btn adx-btn--quiet adx-btn--xs"
          onClick={load}
          disabled={loading}
        >
          <Icon name="refresh" size={13} color="currentColor" />
          <span>{loading ? 'Memuat…' : 'Muat Ulang'}</span>
        </button>
      </div>

      {loadError && (
        <div className="adx-notice adx-notice--warn" role="status">
          Sebagian data gagal dimuat: {loadError}
        </div>
      )}

      {notice && (
        <div className={`adx-notice adx-notice--${notice.type}`} role="status">
          {notice.message}
        </div>
      )}

      {/* ---------------- Tab ---------------- */}
      <div className="rsp-tabs" role="tablist" aria-label="Jenis data wilayah">
        <button
          type="button"
          role="tab"
          aria-selected={isPersonel}
          className={`rsp-tab ${isPersonel ? 'is-active' : ''}`}
          onClick={() => {
            setTab('personel');
            setConfirmDelete(null);
          }}
        >
          Personel / Anggota
          <span className="rsp-tab__count">{members.length}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={!isPersonel}
          className={`rsp-tab ${!isPersonel ? 'is-active' : ''}`}
          onClick={() => {
            setTab('kepengurusan');
            setConfirmDelete(null);
          }}
        >
          Kepengurusan
          <span className="rsp-tab__count">{officials.length}</span>
        </button>
      </div>

      {/* ---------------- Formulir Personel ---------------- */}
      {isPersonel && showMemberForm && (
        <form className="rsp-form" onSubmit={submitMember}>
          <div className="rsp-form__title">
            {memberForm.id ? 'Ubah Data Personel' : 'Tambah Personel Baru'}
          </div>

          <div className="rsp-row">
            <label className="rsp-field">
              <span className="rsp-label">Wilayah *</span>
              <select
                className="rsp-input"
                value={memberForm.regionId}
                onChange={(e) => setMemberForm({ ...memberForm, regionId: e.target.value })}
              >
                <option value="">— Pilih wilayah —</option>
                {RIAU_REGIONS_DATA.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="rsp-field rsp-field--wide">
              <span className="rsp-label">Nama Lengkap &amp; Gelar *</span>
              <input
                type="text"
                className="rsp-input"
                placeholder="Contoh: BUDI UTOMO, S.E."
                value={memberForm.name}
                onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
              />
            </label>

            <label className="rsp-field rsp-field--narrow">
              <span className="rsp-label">No. Urut</span>
              <input
                type="number"
                className="rsp-input"
                value={memberForm.no}
                onChange={(e) => setMemberForm({ ...memberForm, no: e.target.value })}
              />
            </label>
          </div>

          <div className="rsp-row">
            <label className="rsp-field">
              <span className="rsp-label">Jenis ASN</span>
              <select
                className="rsp-input"
                value={memberForm.asn}
                onChange={(e) => setMemberForm({ ...memberForm, asn: e.target.value })}
              >
                {ASN_OPTIONS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </label>

            <label className="rsp-field rsp-field--wide">
              <span className="rsp-label">Jabatan</span>
              <input
                type="text"
                className="rsp-input"
                placeholder="Contoh: JF PPBJ Ahli Muda"
                value={memberForm.position}
                onChange={(e) => setMemberForm({ ...memberForm, position: e.target.value })}
              />
            </label>

            <label className="rsp-field">
              <span className="rsp-label">Status Keanggotaan</span>
              <select
                className="rsp-input"
                value={normalizeStatus(memberForm.membershipStatus)}
                onChange={(e) =>
                  setMemberForm({ ...memberForm, membershipStatus: e.target.value })
                }
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="rsp-row">
            <label className="rsp-field">
              <span className="rsp-label">NIP</span>
              <input
                type="text"
                inputMode="numeric"
                className="rsp-input"
                placeholder="18 digit"
                value={memberForm.nip}
                onChange={(e) => setMemberForm({ ...memberForm, nip: e.target.value })}
              />
            </label>

            <label className="rsp-field">
              <span className="rsp-label">No. KTA</span>
              <input
                type="text"
                className="rsp-input"
                placeholder="Kosongkan bila belum punya"
                value={memberForm.kta}
                onChange={(e) => setMemberForm({ ...memberForm, kta: e.target.value })}
              />
            </label>

            <label className="rsp-field">
              <span className="rsp-label">No. HP</span>
              <input
                type="text"
                className="rsp-input"
                placeholder="08xxxxxxxxxx"
                value={memberForm.phone}
                onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })}
              />
            </label>

            <label className="rsp-field">
              <span className="rsp-label">Email</span>
              <input
                type="email"
                className="rsp-input"
                placeholder="nama@contoh.com"
                value={memberForm.email}
                onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
              />
            </label>
          </div>

          <label className="rsp-field rsp-field--block">
            <span className="rsp-label">Keterangan (opsional)</span>
            <input
              type="text"
              className="rsp-input"
              placeholder="Contoh: Belum Memiliki KTA"
              value={memberForm.note}
              onChange={(e) => setMemberForm({ ...memberForm, note: e.target.value })}
            />
          </label>

          <div className="rsp-footer">
            <button type="submit" className="adx-btn adx-btn--primary" disabled={busy}>
              <Icon name="check" size={14} color="currentColor" />
              <span>{busy ? 'Menyimpan…' : memberForm.id ? 'Simpan Perubahan' : 'Simpan Personel'}</span>
            </button>
            <button
              type="button"
              className="adx-btn adx-btn--quiet"
              onClick={() => {
                setMemberForm(EMPTY_MEMBER);
                setShowMemberForm(false);
              }}
            >
              Batal
            </button>
          </div>
        </form>
      )}

      {/* ---------------- Formulir Kepengurusan ---------------- */}
      {!isPersonel && showOfficialForm && (
        <form className="rsp-form" onSubmit={submitOfficial}>
          <div className="rsp-form__title">
            {officialForm.id ? 'Ubah Data Kepengurusan' : 'Tambah Pengurus Baru'}
          </div>

          <div className="rsp-row">
            <label className="rsp-field">
              <span className="rsp-label">Wilayah *</span>
              <select
                className="rsp-input"
                value={officialForm.regionId}
                onChange={(e) => setOfficialForm({ ...officialForm, regionId: e.target.value })}
              >
                <option value="">— Pilih wilayah —</option>
                {RIAU_REGIONS_DATA.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="rsp-field rsp-field--wide">
              <span className="rsp-label">Jabatan *</span>
              <input
                type="text"
                className="rsp-input"
                placeholder="Contoh: Kepala Bagian PBJ"
                value={officialForm.jabatan}
                onChange={(e) => setOfficialForm({ ...officialForm, jabatan: e.target.value })}
              />
            </label>
          </div>

          <div className="rsp-row">
            <label className="rsp-field rsp-field--wide">
              <span className="rsp-label">Nama &amp; Gelar *</span>
              <input
                type="text"
                className="rsp-input"
                placeholder="Contoh: ZULFAHMI, S.T., M.T."
                value={officialForm.nama}
                onChange={(e) => setOfficialForm({ ...officialForm, nama: e.target.value })}
              />
            </label>

            <label className="rsp-field">
              <span className="rsp-label">NIP</span>
              <input
                type="text"
                className="rsp-input"
                value={officialForm.nip}
                onChange={(e) => setOfficialForm({ ...officialForm, nip: e.target.value })}
              />
            </label>

            <label className="rsp-field">
              <span className="rsp-label">Jenis ASN</span>
              <select
                className="rsp-input"
                value={normalizeAsn(officialForm.status)}
                onChange={(e) => setOfficialForm({ ...officialForm, status: e.target.value })}
              >
                {ASN_OPTIONS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </label>

            <label className="rsp-field rsp-field--narrow">
              <span className="rsp-label">Urutan</span>
              <input
                type="number"
                className="rsp-input"
                value={officialForm.urutan}
                onChange={(e) => setOfficialForm({ ...officialForm, urutan: e.target.value })}
              />
            </label>
          </div>

          <div className="rsp-footer">
            <button type="submit" className="adx-btn adx-btn--primary" disabled={busy}>
              <Icon name="check" size={14} color="currentColor" />
              <span>{busy ? 'Menyimpan…' : officialForm.id ? 'Simpan Perubahan' : 'Simpan Pengurus'}</span>
            </button>
            <button
              type="button"
              className="adx-btn adx-btn--quiet"
              onClick={() => {
                setOfficialForm(EMPTY_OFFICIAL);
                setShowOfficialForm(false);
              }}
            >
              Batal
            </button>
          </div>
        </form>
      )}

      {/* ---------------- Toolbar ---------------- */}
      <div className="rsp-toolbar">
        <label className="rsp-field rsp-field--filter">
          <span className="rsp-label">Wilayah</span>
          <select
            className="rsp-input"
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
          >
            <option value="">Semua wilayah</option>
            {RIAU_REGIONS_DATA.map((r) => {
              const n = isPersonel
                ? members.filter((m) => m.regionId === r.id).length
                : officials.filter((o) => o.regionId === r.id).length;
              return (
                <option key={r.id} value={r.id}>
                  {r.shortName} ({n})
                </option>
              );
            })}
          </select>
        </label>

        <label className="rsp-field rsp-field--search">
          <span className="rsp-label">Cari</span>
          <div className="rsp-search">
            <Icon name="search" size={14} color="#8C8C8C" />
            <input
              type="search"
              className="rsp-input rsp-input--search"
              placeholder={isPersonel ? 'Nama, NIP, KTA, jabatan…' : 'Nama, jabatan, NIP…'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </label>

        <div className="rsp-toolbar__spacer" />

        <button
          type="button"
          className="adx-btn adx-btn--primary"
          onClick={() => {
            if (isPersonel) {
              if (showMemberForm && memberForm.id) setMemberForm(EMPTY_MEMBER);
              setShowMemberForm((v) => !v);
            } else {
              if (showOfficialForm && officialForm.id) setOfficialForm(EMPTY_OFFICIAL);
              setShowOfficialForm((v) => !v);
            }
          }}
        >
          <Icon
            name={(isPersonel ? showMemberForm : showOfficialForm) ? 'x' : 'plus'}
            size={14}
            color="currentColor"
          />
          <span>
            {(isPersonel ? showMemberForm : showOfficialForm)
              ? 'Tutup Formulir'
              : isPersonel
              ? 'Tambah Personel'
              : 'Tambah Pengurus'}
          </span>
        </button>
      </div>

      <p className="rsp-count">
        Menampilkan <strong>{shown}</strong> dari <strong>{totalAll}</strong> baris
        {regionFilter ? ` · ${regionLabel(regionFilter)}` : ' · seluruh wilayah'}
      </p>

      {/* ---------------- Tabel Personel ---------------- */}
      {isPersonel &&
        (visibleMembers.length > 0 ? (
          <div className="rsp-table-scroll">
            <table className="adx-table rsp-table">
              <thead>
                <tr>
                  <th style={{ width: '40px', textAlign: 'center' }}>No</th>
                  <th>Nama Lengkap</th>
                  <th>Wilayah</th>
                  <th style={{ width: '70px', textAlign: 'center' }}>ASN</th>
                  <th>Jabatan</th>
                  <th>NIP</th>
                  <th>KTA</th>
                  <th style={{ textAlign: 'center' }}>Status</th>
                  <th>HP / Email</th>
                  <th data-align="center">Tindakan</th>
                </tr>
              </thead>
              <tbody>
                {visibleMembers.map((m) => (
                  <tr key={m.id}>
                    <td style={{ textAlign: 'center', color: '#64748B' }}>{m.no || '—'}</td>
                    <td>
                      <span className="adx-subject__title">{m.name}</span>
                      {m.note && <span className="rsp-note">{m.note}</span>}
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>{regionLabel(m.regionId)}</td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`rsp-badge rsp-badge--${(m.asn || '').toLowerCase()}`}>
                        {m.asn}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.75rem', color: '#475569' }}>{m.position || '—'}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.71875rem' }}>
                      {m.nip || '—'}
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.71875rem' }}>
                      {m.kta || '—'}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span
                        className={`rsp-status ${
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
                    <td style={{ fontSize: '0.71875rem', color: '#475569' }}>
                      {m.phone || '—'}
                      {m.email && (
                        <span style={{ display: 'block', color: '#8C8C8C' }}>{m.email}</span>
                      )}
                    </td>
                    <td data-align="center" style={{ whiteSpace: 'nowrap' }}>
                      <button
                        type="button"
                        className="adx-btn adx-btn--xs"
                        onClick={() => editMember(m)}
                      >
                        Ubah
                      </button>
                      {confirmDelete === m.id ? (
                        <>
                          <button
                            type="button"
                            className="adx-btn adx-btn--xs rsp-btn-danger"
                            style={{ marginLeft: '0.3rem' }}
                            disabled={busy}
                            onClick={() => removeMember(m.id)}
                          >
                            Yakin hapus
                          </button>
                          <button
                            type="button"
                            className="adx-btn adx-btn--xs"
                            style={{ marginLeft: '0.25rem' }}
                            onClick={() => setConfirmDelete(null)}
                          >
                            Batal
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          className="adx-btn adx-btn--xs adx-btn--quiet"
                          style={{ marginLeft: '0.3rem' }}
                          onClick={() => setConfirmDelete(m.id)}
                        >
                          Hapus
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="adx-empty">
            <p className="adx-empty__title">
              {loading ? 'Memuat data…' : 'Tidak ada personel yang cocok'}
            </p>
            <p className="adx-empty__desc">
              Ubah saringan wilayah atau kata kunci, atau tekan “Tambah Personel” untuk memasukkan
              data baru.
            </p>
          </div>
        ))}

      {/* ---------------- Tabel Kepengurusan ---------------- */}
      {!isPersonel &&
        (visibleOfficials.length > 0 ? (
          <div className="rsp-table-scroll">
            <table className="adx-table rsp-table">
              <thead>
                <tr>
                  <th style={{ width: '70px', textAlign: 'center' }}>Urutan</th>
                  <th>Nama &amp; Gelar</th>
                  <th>Wilayah</th>
                  <th>Jabatan</th>
                  <th>NIP</th>
                  <th style={{ width: '70px', textAlign: 'center' }}>ASN</th>
                  <th data-align="center">Tindakan</th>
                </tr>
              </thead>
              <tbody>
                {visibleOfficials.map((o) => (
                  <tr key={o.id}>
                    <td style={{ textAlign: 'center', color: '#64748B' }}>{o.urutan || '—'}</td>
                    <td>
                      <span className="adx-subject__title">{o.nama}</span>
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>{regionLabel(o.regionId)}</td>
                    <td style={{ fontSize: '0.75rem', color: '#475569' }}>{o.jabatan}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.71875rem' }}>
                      {o.nip || '—'}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`rsp-badge rsp-badge--${(o.status || '').toLowerCase()}`}>
                        {o.status}
                      </span>
                    </td>
                    <td data-align="center" style={{ whiteSpace: 'nowrap' }}>
                      <button
                        type="button"
                        className="adx-btn adx-btn--xs"
                        onClick={() => editOfficial(o)}
                      >
                        Ubah
                      </button>
                      {confirmDelete === o.id ? (
                        <>
                          <button
                            type="button"
                            className="adx-btn adx-btn--xs rsp-btn-danger"
                            style={{ marginLeft: '0.3rem' }}
                            disabled={busy}
                            onClick={() => removeOfficial(o.id)}
                          >
                            Yakin hapus
                          </button>
                          <button
                            type="button"
                            className="adx-btn adx-btn--xs"
                            style={{ marginLeft: '0.25rem' }}
                            onClick={() => setConfirmDelete(null)}
                          >
                            Batal
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          className="adx-btn adx-btn--xs adx-btn--quiet"
                          style={{ marginLeft: '0.3rem' }}
                          onClick={() => setConfirmDelete(o.id)}
                        >
                          Hapus
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="adx-empty">
            <p className="adx-empty__title">
              {loading ? 'Memuat data…' : 'Tidak ada pengurus yang cocok'}
            </p>
            <p className="adx-empty__desc">
              Wilayah ini belum memiliki data kepengurusan, atau saringan Anda terlalu sempit.
            </p>
          </div>
        ))}
    </section>
  );
}
