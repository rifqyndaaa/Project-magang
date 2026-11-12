/**
 * regionsData.js — Data 12 Wilayah Administratif Provinsi Riau & Status Kepengurusan IFPI
 *
 * 10 Kabupaten & 2 Kota sesuai data resmi Pemerintah Provinsi Riau.
 * Data kepengurusan DPC diisi jika SK resmi sudah diterbitkan.
 * Jangan mengarang nama atau susunan pengurus kabupaten/kota tanpa data resmi.
 */

export const RIAU_REGIONS_DATA = [
  {
    id: 'pekanbaru',
    name: 'Kota Pekanbaru',
    shortName: 'Pekanbaru',
    type: 'kota',
    capital: 'Pekanbaru',
    area: '632,26 km²',
    population: '1.020.308 Jiwa',
    districts: '15 Kecamatan, 83 Kelurahan',
    description:
      'Kota Pekanbaru adalah ibu kota Provinsi Riau sekaligus pusat perekonomian, perdagangan, dan sentra pelayanan publik terpadu di Bumi Lancang Kuning. Menjadi sentra koordinasi regional seluruh kegiatan aparatur pengadaan barang/jasa pemerintah di Riau.',
    landmark: 'Masjid Raya An-Nur & Kompleks Perkantoran Tenayan Raya',
    image: '/images/masjid-an-nur.jpg',
    ifpiStatus: 'DPC IFPI Kota Pekanbaru — Tahap Konsolidasi Kepengurusan',
    isAvailable: false,
    kepengurusan: null,
  },
  {
    id: 'dumai',
    name: 'Kota Dumai',
    shortName: 'Dumai',
    type: 'kota',
    capital: 'Dumai',
    area: '1.727,38 km²',
    population: '323.450 Jiwa',
    districts: '7 Kecamatan, 36 Kelurahan',
    description:
      'Kota Dumai merupakan kota pelabuhan utama di pesisir Selat Malaka serta kawasan industri perminyakan dan ekspor komoditas kelapa sawit terbesar di Sumatera. Memiliki peran strategis dalam pengadaan logistik maritim dan infrastruktur industri hilir.',
    landmark: 'Pelabuhan Internasional Dumai & Kawasan Industri Pelintung',
    image: null,
    ifpiStatus: 'DPC IFPI Kota Dumai — Tahap Konsolidasi Kepengurusan',
    isAvailable: false,
    kepengurusan: null,
  },
  {
    id: 'kampar',
    name: 'Kabupaten Kampar',
    shortName: 'Kampar',
    type: 'kabupaten',
    capital: 'Bangkinang',
    area: '10.983,47 km²',
    population: '862.800 Jiwa',
    districts: '21 Kecamatan, 242 Desa/Kelurahan',
    description:
      'Kabupaten Kampar dikenal sebagai Serambi Mekkah Riau dan lumbung pertanian serta PLTA Koto Panjang. Wilayah yang membentang luas berbatasan langsung dengan Provinsi Sumatera Barat dan mengelilingi barat Kota Pekanbaru.',
    landmark: 'Candi Muara Takus & Danau PLTA Koto Panjang',
    image: null,
    ifpiStatus: 'DPC IFPI Kabupaten Kampar — Tahap Konsolidasi Kepengurusan',
    isAvailable: false,
    kepengurusan: null,
  },
  {
    id: 'siak',
    name: 'Kabupaten Siak',
    shortName: 'Siak',
    type: 'kabupaten',
    capital: 'Siak Sri Indrapura',
    area: '8.275,18 km²',
    population: '468.200 Jiwa',
    districts: '14 Kecamatan, 122 Kampung/Kelurahan',
    description:
      'Kabupaten Siak merupakan pusat peradaban Kesultanan Siak Sri Indrapura yang kaya akan sejarah Melayu, cagar budaya nasional, dan pengelolaan lingkungan gambut berkelanjutan. Menjadi percontohan tata kelola pengadaan barang/jasa ramah lingkungan.',
    landmark: 'Istana Asserayah Hasyimiah (Istana Siak) & Jembatan Siak',
    image: '/images/istana-siak.jpg',
    ifpiStatus: 'DPC IFPI Kabupaten Siak — Tahap Konsolidasi Kepengurusan',
    isAvailable: false,
    kepengurusan: null,
  },
  {
    id: 'pelalawan',
    name: 'Kabupaten Pelalawan',
    shortName: 'Pelalawan',
    type: 'kabupaten',
    capital: 'Pangkalan Kerinci',
    area: '12.758,45 km²',
    population: '407.380 Jiwa',
    districts: '12 Kecamatan, 118 Desa/Kelurahan',
    description:
      'Kabupaten Pelalawan adalah pusat industri pulp and paper berskala global serta fenomena gelombang pasang Bono di muara Sungai Kampar. Wilayah koridor logistik penghubung jalur darat lintas timur Sumatera.',
    landmark: 'Gelombang Bono Sungai Kampar & Istana Sayap Pelalawan',
    image: null,
    ifpiStatus: 'DPC IFPI Kabupaten Pelalawan — Tahap Konsolidasi Kepengurusan',
    isAvailable: false,
    kepengurusan: null,
  },
  {
    id: 'bengkalis',
    name: 'Kabupaten Bengkalis',
    shortName: 'Bengkalis',
    type: 'kabupaten',
    capital: 'Bengkalis',
    area: '8.406,48 km²',
    population: '573.900 Jiwa',
    districts: '11 Kecamatan, 136 Desa/Kelurahan',
    description:
      'Kabupaten Bengkalis meliputi wilayah daratan pesisir Sumatera serta Pulau Bengkalis dan Pulau Rupat. Daerah penghasil minyak bumi dan sentra kelautan strategis yang berbatasan langsung dengan perairan internasional Selat Malaka.',
    landmark: 'Pantai Rupat Utara & Pulau Bengkalis',
    image: null,
    ifpiStatus: 'DPC IFPI Kabupaten Bengkalis — Tahap Konsolidasi Kepengurusan',
    isAvailable: false,
    kepengurusan: null,
  },
  {
    id: 'rokan-hilir',
    name: 'Kabupaten Rokan Hilir',
    shortName: 'Rokan Hilir',
    type: 'kabupaten',
    capital: 'Bagansiapiapi',
    area: '8.881,59 km²',
    population: '649.800 Jiwa',
    districts: '18 Kecamatan, 184 Desa/Kelurahan',
    description:
      'Kabupaten Rokan Hilir terletak di ujung utara Provinsi Riau dengan ibu kota Bagansiapiapi yang termasyhur sebagai bekas salah satu pelabuhan penghasil ikan terbesar di dunia dan tradisi budaya ritual Bakar Tongkang.',
    landmark: 'Kelenteng In Hok Kiong & Budaya Bakar Tongkang Bagansiapiapi',
    image: null,
    ifpiStatus: 'DPC IFPI Kabupaten Rokan Hilir — Tahap Konsolidasi Kepengurusan',
    isAvailable: false,
    kepengurusan: null,
  },
  {
    id: 'rokan-hulu',
    name: 'Kabupaten Rokan Hulu',
    shortName: 'Rokan Hulu',
    type: 'kabupaten',
    capital: 'Pasir Pengaraian',
    area: '7.588,13 km²',
    population: '573.200 Jiwa',
    districts: '16 Kecamatan, 145 Desa/Kelurahan',
    description:
      'Kabupaten Rokan Hulu berjuluk Negeri Seribu Suluk, dikelilingi pegunungan Bukit Barisan dan dialiri Sungai Rokan. Merupakan sentra perkebunan sawit, karet, dan wisata religi termegah di kawasan barat Riau.',
    landmark: 'Masjid Agung Islamic Centre Pasir Pengaraian',
    image: null,
    ifpiStatus: 'DPC IFPI Kabupaten Rokan Hulu — Tahap Konsolidasi Kepengurusan',
    isAvailable: false,
    kepengurusan: null,
  },
  {
    id: 'indragiri-hulu',
    name: 'Kabupaten Indragiri Hulu',
    shortName: 'Indragiri Hulu',
    type: 'kabupaten',
    capital: 'Rengat',
    area: '7.723,80 km²',
    population: '455.700 Jiwa',
    districts: '14 Kecamatan, 194 Desa/Kelurahan',
    description:
      'Kabupaten Indragiri Hulu adalah wilayah daratan subur di DAS Batang Kuantan/Indragiri dengan jejak sejarah Kesultanan Indragiri dan Danau Raja Rengat. Berperan penting dalam sektor agribisnis dan perdagangan lintas kabupaten.',
    landmark: 'Danau Raja Rengat & Kompleks Makam Raja-Raja Indragiri',
    image: null,
    ifpiStatus: 'DPC IFPI Kabupaten Indragiri Hulu — Tahap Konsolidasi Kepengurusan',
    isAvailable: false,
    kepengurusan: null,
  },
  {
    id: 'indragiri-hilir',
    name: 'Kabupaten Indragiri Hilir',
    shortName: 'Indragiri Hilir',
    type: 'kabupaten',
    capital: 'Tembilahan',
    area: '12.614,78 km²',
    population: '662.300 Jiwa',
    districts: '20 Kecamatan, 236 Desa/Kelurahan',
    description:
      'Kabupaten Indragiri Hilir berjuluk Negeri Hamparan Kelapa Dunia karena memiliki perkebunan kelapa rakyat dan industri kelapa terluas di dunia. Menjadi gerbang perairan selatan Riau yang terhubung dengan Jambi dan Kepulauan Riau.',
    landmark: 'Hamparan Kelapa Tembilahan & Kawasan Mangrove Pantai Solop',
    image: null,
    ifpiStatus: 'DPC IFPI Kabupaten Indragiri Hilir — Tahap Konsolidasi Kepengurusan',
    isAvailable: false,
    kepengurusan: null,
  },
  {
    id: 'kuantan-singingi',
    name: 'Kabupaten Kuantan Singingi',
    shortName: 'Kuantan Singingi',
    type: 'kabupaten',
    capital: 'Teluk Kuantan',
    area: '5.263,74 km²',
    population: '343.100 Jiwa',
    districts: '15 Kecamatan, 229 Desa/Kelurahan',
    description:
      'Kabupaten Kuantan Singingi (Kuansing) terkenal dengan tradisi pacu jalur nasional di Tepian Narosa Sungai Kuantan. Berada di jalur perbukitan selatan yang kaya sumber daya alam, hasil pertanian, dan kearifan lokal Melayu.',
    landmark: 'Tepian Narosa & Festival Pacu Jalur Tradisional',
    image: null,
    ifpiStatus: 'DPC IFPI Kabupaten Kuantan Singingi — Tahap Konsolidasi Kepengurusan',
    isAvailable: false,
    kepengurusan: null,
  },
  {
    id: 'kepulauan-meranti',
    name: 'Kabupaten Kepulauan Meranti',
    shortName: 'Kepulauan Meranti',
    type: 'kabupaten',
    capital: 'Selatpanjang',
    area: '3.707,84 km²',
    population: '211.100 Jiwa',
    districts: '9 Kecamatan, 101 Desa/Kelurahan',
    description:
      'Kabupaten Kepulauan Meranti terdiri dari gugusan pulau-pulau di pesisir timur Riau dengan Selatpanjang sebagai ibu kotanya. Merupakan sentra penghasil tepung sagu terbesar nasional dan wilayah terluar berbatasan dengan Selat Malaka.',
    landmark: 'Sentra Sagu Selatpanjang & Kawasan Pesisir Tasik Nambus',
    image: null,
    ifpiStatus: 'DPC IFPI Kabupaten Kepulauan Meranti — Tahap Konsolidasi Kepengurusan',
    isAvailable: false,
    kepengurusan: null,
  },
];

/**
 * Helper untuk mendapatkan data wilayah berdasarkan ID
 */
export function getRegionById(id) {
  if (!id) return null;
  const cleanId = String(id).toLowerCase().trim();
  return RIAU_REGIONS_DATA.find(
    (r) =>
      r.id.toLowerCase() === cleanId ||
      r.name.toLowerCase().replace(/\s+/g, '-').includes(cleanId) ||
      r.shortName.toLowerCase() === cleanId
  ) || null;
}

