/**
 * regionDataService.js — Data Personel & Kepengurusan Wilayah (Supabase)
 * DPW IFPI Provinsi Riau
 *
 * Sumber kebenaran: tabel `region_members` dan `region_officials` di Supabase.
 * File `src/data/regionsData.js` tetap disimpan sebagai CADANGAN (fallback)
 * agar portal publik tidak pernah kosong bila jaringan/DB bermasalah.
 *
 * Bentuk data yang dipakai aplikasi (sama seperti regionsData.js):
 *   member   : { id, regionId, no, name, asn, position, nip, kta,
 *                membershipStatus, phone, email, note }
 *   official : { id, regionId, jabatan, nama, nip, status, urutan }
 */

import { supabase } from '../lib/supabase';
import { RIAU_REGIONS_DATA } from '../data/regionsData';

/* ------------------------------------------------------------------ */
/* Pemetaan baris database → bentuk aplikasi                          */
/* ------------------------------------------------------------------ */

const STATUS_VALID = ['Aktif', 'Tidak aktif', 'Belum Terdaftar'];

/** Menyeragamkan label status ("Tidak Aktif" → "Tidak aktif") */
export function normalizeStatus(value) {
  const raw = (value || '').trim();
  if (!raw) return 'Belum Terdaftar';
  const key = raw.toLowerCase().replace(/\s+/g, ' ');
  if (key === 'aktif') return 'Aktif';
  if (key === 'tidak aktif') return 'Tidak aktif';
  if (key === 'belum terdaftar' || key === 'belum aktif') return 'Belum Terdaftar';
  const found = STATUS_VALID.find((s) => s.toLowerCase() === key);
  return found || raw;
}

const ASN_VALID = ['PNS', 'PPPK', 'CPNS'];

export function normalizeAsn(value) {
  const raw = (value || '').trim().toUpperCase();
  return ASN_VALID.includes(raw) ? raw : 'PNS';
}

export function mapMemberRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    regionId: row.region_id || '',
    no: Number(row.no) || 0,
    name: (row.name || '').trim(),
    asn: normalizeAsn(row.asn),
    position: (row.position || '').trim(),
    nip: (row.nip || '').trim(),
    kta: (row.kta || '').trim() || '-',
    membershipStatus: normalizeStatus(row.membership_status),
    phone: (row.phone || '').trim(),
    email: (row.email || '').trim(),
    note: (row.note || '').trim(),
  };
}

export function mapOfficialRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    regionId: row.region_id || '',
    jabatan: (row.jabatan || '').trim(),
    nama: (row.nama || '').trim(),
    nip: (row.nip || '').trim(),
    status: normalizeAsn(row.status),
    urutan: Number(row.urutan) || 0,
  };
}

/* ------------------------------------------------------------------ */
/* Cadangan dari file statis                                          */
/* ------------------------------------------------------------------ */

export function staticMembers(regionId) {
  const region = RIAU_REGIONS_DATA.find((r) => r.id === regionId);
  return (region?.members || []).map((m, i) => ({
    id: `static-${regionId}-${m.no ?? i + 1}`,
    regionId,
    no: m.no ?? i + 1,
    name: m.name,
    asn: normalizeAsn(m.asn),
    position: m.position,
    nip: m.nip,
    kta: m.kta || '-',
    membershipStatus: normalizeStatus(m.membershipStatus),
    phone: m.phone || '',
    email: m.email || '',
    note: m.note || '',
  }));
}

export function staticOfficials(regionId) {
  const region = RIAU_REGIONS_DATA.find((r) => r.id === regionId);
  return (region?.kepengurusan || []).map((k, i) => ({
    id: `static-off-${regionId}-${i + 1}`,
    regionId,
    jabatan: k.jabatan,
    nama: k.nama,
    nip: k.nip || '',
    status: normalizeAsn(k.status),
    urutan: i + 1,
  }));
}

/* ------------------------------------------------------------------ */
/* Baca                                                               */
/* ------------------------------------------------------------------ */

/**
 * Mengambil data satu wilayah dari Supabase.
 * Bila gagal / kosong, otomatis memakai data statis dari regionsData.js.
 * @returns {Promise<{members, officials, source: 'database'|'cadangan', error?: string}>}
 */
export async function fetchRegionData(regionId) {
  const [membersRes, officialsRes] = await Promise.all([
    supabase
      .from('region_members')
      .select('*')
      .eq('region_id', regionId)
      .order('no', { ascending: true }),
    supabase
      .from('region_officials')
      .select('*')
      .eq('region_id', regionId)
      .order('urutan', { ascending: true }),
  ]);

  const error = membersRes.error?.message || officialsRes.error?.message || '';
  const members = (membersRes.data || []).map(mapMemberRow).filter(Boolean);
  const officials = (officialsRes.data || []).map(mapOfficialRow).filter(Boolean);

  if (error || (members.length === 0 && officials.length === 0)) {
    return {
      members: staticMembers(regionId),
      officials: staticOfficials(regionId),
      source: 'cadangan',
      error: error || 'Data wilayah belum tersedia di basis data.',
    };
  }

  return { members, officials, source: 'database' };
}

/** Semua personel (dipakai panel admin) */
export async function fetchAllMembers() {
  const { data, error } = await supabase
    .from('region_members')
    .select('*')
    .order('region_id', { ascending: true })
    .order('no', { ascending: true });
  if (error) {
    console.warn('[Wilayah] Gagal memuat personel:', error.message);
    return { rows: [], error: error.message };
  }
  return { rows: (data || []).map(mapMemberRow).filter(Boolean), error: '' };
}

/** Semua kepengurusan (dipakai panel admin) */
export async function fetchAllOfficials() {
  const { data, error } = await supabase
    .from('region_officials')
    .select('*')
    .order('region_id', { ascending: true })
    .order('urutan', { ascending: true });
  if (error) {
    console.warn('[Wilayah] Gagal memuat kepengurusan:', error.message);
    return { rows: [], error: error.message };
  }
  return { rows: (data || []).map(mapOfficialRow).filter(Boolean), error: '' };
}

/** Jumlah personel per wilayah — untuk KPI/hitungan rekap */
export async function fetchMemberCounts() {
  const { rows, error } = await fetchAllMembers();
  if (error) return { counts: {}, error };
  const counts = {};
  for (const row of rows) {
    counts[row.regionId] = (counts[row.regionId] || 0) + 1;
  }
  return { counts, error: '' };
}

/* ------------------------------------------------------------------ */
/* Tulis — Personel                                                   */
/* ------------------------------------------------------------------ */

function memberPayload(data) {
  return {
    region_id: data.regionId,
    region_name:
      RIAU_REGIONS_DATA.find((r) => r.id === data.regionId)?.name || data.regionId,
    no: Number(data.no) || 0,
    name: (data.name || '').trim(),
    asn: normalizeAsn(data.asn),
    position: (data.position || '').trim() || null,
    nip: (data.nip || '').trim() || null,
    kta: (data.kta || '').trim() || '-',
    membership_status: normalizeStatus(data.membershipStatus),
    phone: (data.phone || '').trim() || null,
    email: (data.email || '').trim() || null,
    note: (data.note || '').trim() || null,
    updated_at: new Date().toISOString(),
  };
}

export async function saveMember(data) {
  if (!data.regionId) return { success: false, message: 'Wilayah wajib dipilih.' };
  if (!(data.name || '').trim()) return { success: false, message: 'Nama personel wajib diisi.' };

  const payload = memberPayload(data);
  try {
    if (data.id && !String(data.id).startsWith('static-')) {
      const { error } = await supabase
        .from('region_members')
        .update(payload)
        .eq('id', data.id);
      if (error) return { success: false, message: error.message };
      return { success: true, mode: 'update' };
    }

    const { error } = await supabase.from('region_members').insert([payload]);
    if (error) return { success: false, message: error.message };
    return { success: true, mode: 'insert' };
  } catch (err) {
    return { success: false, message: err.message || 'Gagal menyimpan.' };
  }
}

export async function deleteMember(id) {
  try {
    const { error } = await supabase.from('region_members').delete().eq('id', id);
    if (error) return { success: false, message: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, message: err.message || 'Gagal menghapus.' };
  }
}

/* ------------------------------------------------------------------ */
/* Tulis — Kepengurusan                                               */
/* ------------------------------------------------------------------ */

function officialPayload(data) {
  return {
    region_id: data.regionId,
    region_name:
      RIAU_REGIONS_DATA.find((r) => r.id === data.regionId)?.name || data.regionId,
    jabatan: (data.jabatan || '').trim(),
    nama: (data.nama || '').trim(),
    nip: (data.nip || '').trim() || null,
    status: normalizeAsn(data.status),
    urutan: Number(data.urutan) || 0,
    updated_at: new Date().toISOString(),
  };
}

export async function saveOfficial(data) {
  if (!data.regionId) return { success: false, message: 'Wilayah wajib dipilih.' };
  if (!(data.jabatan || '').trim()) return { success: false, message: 'Jabatan wajib diisi.' };
  if (!(data.nama || '').trim()) return { success: false, message: 'Nama pengurus wajib diisi.' };

  const payload = officialPayload(data);
  try {
    if (data.id && !String(data.id).startsWith('static-')) {
      const { error } = await supabase
        .from('region_officials')
        .update(payload)
        .eq('id', data.id);
      if (error) return { success: false, message: error.message };
      return { success: true, mode: 'update' };
    }
    const { error } = await supabase.from('region_officials').insert([payload]);
    if (error) return { success: false, message: error.message };
    return { success: true, mode: 'insert' };
  } catch (err) {
    return { success: false, message: err.message || 'Gagal menyimpan.' };
  }
}

export async function deleteOfficial(id) {
  try {
    const { error } = await supabase.from('region_officials').delete().eq('id', id);
    if (error) return { success: false, message: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, message: err.message || 'Gagal menghapus.' };
  }
}
