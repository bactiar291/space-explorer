import type { PlanetData } from "@/types/planet";

type Copy = {
  name: string;
  tagline: string;
  summary: string;
  orbit: string;
  surface: string;
  atmosphere: string;
  exploration: string;
  facts: string[];
};

export const planetCopy: Record<string, Copy> = {
  mercury: {
    name: "Merkurius",
    tagline: "Planet tercepat dan paling dekat dengan Matahari.",
    summary:
      "Merkurius adalah dunia berbatu kecil yang permukaannya penuh kawah. Karena hampir tidak punya atmosfer, sisi siang bisa sangat panas sementara sisi malam jatuh ke suhu beku ekstrem.",
    orbit:
      "Orbit Merkurius paling pendek di tata surya. Jaraknya yang dekat dengan Matahari membuat planet ini bergerak sangat cepat dan menyelesaikan satu tahun hanya dalam 88 hari Bumi.",
    surface:
      "Permukaannya mirip Bulan: kering, berbatu, dan dipenuhi bekas tumbukan. Es air tetap dapat bertahan di kawah kutub yang selalu berada dalam bayangan.",
    atmosphere:
      "Merkurius tidak memiliki atmosfer tebal. Lapisan gas tipisnya disebut eksosfer dan mudah tersapu angin Matahari.",
    exploration:
      "Mariner 10 dan MESSENGER memberi peta rinci Merkurius. BepiColombo sedang melanjutkan pengamatan untuk memahami inti dan medan magnetnya.",
    facts: ["Satu hari Matahari di Merkurius berlangsung sekitar 176 hari Bumi.", "Medan magnetnya lemah, tetapi nyata."],
  },
  venus: {
    name: "Venus",
    tagline: "Planet terpanas dengan atmosfer superpadat.",
    summary:
      "Venus sering disebut saudara Bumi karena ukurannya mirip, tetapi kondisinya sangat berbeda. Atmosfer karbon dioksida yang tebal memerangkap panas dan menciptakan efek rumah kaca ekstrem.",
    orbit:
      "Venus mengorbit Matahari dari dalam orbit Bumi. Rotasinya retrograde, sehingga Matahari tampak terbit dari arah barat jika dilihat dari permukaannya.",
    surface:
      "Tekanan permukaan Venus sekitar 92 kali tekanan Bumi. Suhunya cukup tinggi untuk melelehkan timbal, membuat pendaratan wahana hanya bertahan singkat.",
    atmosphere:
      "Atmosfer didominasi karbon dioksida dengan awan asam sulfat. Lapisan awan ini memantulkan cahaya kuat sehingga Venus tampak sangat terang dari Bumi.",
    exploration:
      "Program Venera, Magellan, Venus Express, dan Akatsuki membantu memetakan permukaan serta atmosfer Venus dari orbit maupun pendaratan singkat.",
    facts: ["Venus berotasi berlawanan arah dibanding sebagian besar planet.", "Satu hari di Venus lebih panjang daripada satu tahunnya."],
  },
  earth: {
    name: "Bumi",
    tagline: "Satu-satunya planet yang diketahui memiliki kehidupan.",
    summary:
      "Bumi memiliki air cair stabil, atmosfer pelindung, medan magnet, dan aktivitas geologi aktif. Kombinasi ini membuatnya menjadi planet paling dinamis yang kita kenal.",
    orbit:
      "Orbit Bumi berada di zona laik huni Matahari. Kemiringan sumbu 23,44 derajat menciptakan musim dan menjaga variasi iklim global.",
    surface:
      "Sekitar 71 persen permukaan Bumi tertutup air. Lempeng tektonik membentuk benua, gunung, gempa, dan siklus karbon jangka panjang.",
    atmosphere:
      "Atmosfer Bumi didominasi nitrogen dan oksigen. Lapisan ini menjaga suhu, memungkinkan cuaca, dan melindungi permukaan dari radiasi berbahaya.",
    exploration:
      "Ribuan satelit mengamati Bumi untuk cuaca, komunikasi, navigasi, iklim, dan penelitian lingkungan.",
    facts: ["Bumi tidak bulat sempurna; bagian ekuator sedikit menggembung.", "Medan magnet Bumi membantu membelokkan angin Matahari."],
  },
  mars: {
    name: "Mars",
    tagline: "Dunia gurun merah dengan jejak air purba.",
    summary:
      "Mars adalah planet berbatu dingin dengan lembah sungai purba, es kutub, gunung api raksasa, dan badai debu global. Planet ini menjadi target utama eksplorasi robotik.",
    orbit:
      "Tahun Mars berlangsung hampir dua kali lebih lama dari tahun Bumi. Orbitnya lebih lonjong, sehingga perbedaan musim bisa terasa kuat.",
    surface:
      "Permukaan Mars kaya oksida besi yang memberi warna merah. Olympus Mons adalah gunung api terbesar yang diketahui di tata surya.",
    atmosphere:
      "Atmosfer Mars sangat tipis dan didominasi karbon dioksida. Tekanannya terlalu rendah untuk air cair stabil di permukaan saat ini.",
    exploration:
      "Viking, Curiosity, Perseverance, MAVEN, dan banyak orbiter membantu mencari jejak air, geologi, serta kemungkinan lingkungan layak huni masa lalu.",
    facts: ["Satu hari Mars disebut sol.", "Mars punya dua bulan kecil: Phobos dan Deimos."],
  },
  jupiter: {
    name: "Jupiter",
    tagline: "Raksasa gas terbesar dengan badai abadi.",
    summary:
      "Jupiter adalah planet terbesar di tata surya. Komposisinya didominasi hidrogen dan helium, dengan sistem badai, sabuk awan, serta magnetosfer yang sangat kuat.",
    orbit:
      "Jupiter mengorbit Matahari dalam 11,86 tahun Bumi. Gravitasinya besar dan memengaruhi orbit asteroid, komet, serta objek kecil di tata surya.",
    surface:
      "Jupiter tidak memiliki permukaan padat seperti Bumi. Semakin turun ke dalam atmosfernya, tekanan dan suhu meningkat hingga materi berubah menjadi hidrogen metalik.",
    atmosphere:
      "Sabuk awan Jupiter terbentuk dari lapisan gas dan partikel es. Bintik Merah Besar adalah badai raksasa yang telah diamati selama berabad-abad.",
    exploration:
      "Pioneer, Voyager, Galileo, dan Juno membuka detail struktur atmosfer, medan magnet, serta bulan-bulan besar seperti Europa dan Ganymede.",
    facts: ["Ganymede lebih besar daripada Merkurius.", "Jupiter berotasi paling cepat di antara planet utama."],
  },
  saturn: {
    name: "Saturnus",
    tagline: "Raksasa gas dengan cincin paling ikonik.",
    summary:
      "Saturnus dikenal karena sistem cincin esnya yang luas dan terang. Planet ini juga memiliki banyak bulan, termasuk Titan yang atmosfernya tebal dan Enceladus yang menyemburkan uap air.",
    orbit:
      "Saturnus membutuhkan hampir 29,5 tahun Bumi untuk mengitari Matahari. Kemiringan sumbunya membuat cincin terlihat berubah sudut dari waktu ke waktu.",
    surface:
      "Seperti Jupiter, Saturnus tidak memiliki permukaan padat. Kerapatannya sangat rendah, bahkan lebih rendah dari air jika dibandingkan secara rata-rata.",
    atmosphere:
      "Atmosfernya didominasi hidrogen dan helium. Pola awan, badai kutub, dan angin cepat membentuk dinamika atmosfer yang kompleks.",
    exploration:
      "Cassini-Huygens menjadi misi paling penting untuk Saturnus, mempelajari cincin, atmosfer, Titan, dan Enceladus selama lebih dari satu dekade.",
    facts: ["Cincin Saturnus terutama tersusun dari es air.", "Titan memiliki danau metana cair di permukaannya."],
  },
  uranus: {
    name: "Uranus",
    tagline: "Raksasa es yang berotasi hampir menyamping.",
    summary:
      "Uranus adalah raksasa es dengan warna biru-hijau dari metana. Sumbunya sangat miring, kemungkinan akibat tumbukan besar pada masa awal tata surya.",
    orbit:
      "Uranus mengitari Matahari selama 84 tahun Bumi. Karena kemiringan ekstrem, kutubnya bisa mengalami siang atau malam yang berlangsung puluhan tahun.",
    surface:
      "Tidak ada permukaan padat yang jelas. Interiornya diperkirakan mengandung air, amonia, dan metana dalam kondisi tekanan tinggi.",
    atmosphere:
      "Metana menyerap cahaya merah dan memberi warna biru-hijau. Atmosfer Uranus relatif tenang, tetapi tetap memiliki awan dan badai musiman.",
    exploration:
      "Voyager 2 adalah satu-satunya wahana yang pernah melintas dekat Uranus, sehingga banyak detail planet ini masih menunggu misi lanjutan.",
    facts: ["Uranus seperti menggelinding saat mengorbit Matahari.", "Musim di Uranus dapat berlangsung lebih dari 20 tahun Bumi."],
  },
  neptune: {
    name: "Neptunus",
    tagline: "Raksasa es terluar dengan angin supersonik.",
    summary:
      "Neptunus adalah planet utama terjauh dari Matahari. Meski menerima sedikit energi Matahari, atmosfernya sangat aktif dengan angin tercepat yang pernah diukur di planet.",
    orbit:
      "Satu tahun Neptunus berlangsung sekitar 165 tahun Bumi. Orbitnya jauh membuat cahaya Matahari di sana sangat redup.",
    surface:
      "Neptunus tidak memiliki permukaan padat. Bagian dalamnya kemungkinan berupa campuran es, batuan, dan fluida bertekanan tinggi.",
    atmosphere:
      "Atmosfernya mengandung hidrogen, helium, dan metana. Metana memberi warna biru, sementara dinamika internal mendorong badai besar.",
    exploration:
      "Voyager 2 memotret Neptunus dan Triton pada 1989. Hingga kini, itu masih menjadi kunjungan jarak dekat utama ke planet ini.",
    facts: ["Neptunus diprediksi lewat matematika sebelum ditemukan langsung.", "Triton kemungkinan objek Sabuk Kuiper yang tertangkap gravitasi."],
  },
};

const gasLabels: Record<string, string> = {
  Oxygen: "Oksigen",
  Sodium: "Natrium",
  Hydrogen: "Hidrogen",
  "Carbon dioxide": "Karbon dioksida",
  Nitrogen: "Nitrogen",
  Argon: "Argon",
  Helium: "Helium",
  Methane: "Metana",
};

const phraseLabels: Record<string, string> = {
  Ancient: "Zaman kuno",
  "Ancient observers": "Pengamat zaman kuno",
  "Thousands of Earth-orbiting spacecraft": "Ribuan wahana dan satelit pengorbit Bumi",
  "Johann Galle and Urbain Le Verrier": "Johann Galle dan Urbain Le Verrier",
};

export function planetName(planet: PlanetData) {
  return planetCopy[planet.slug]?.name || planet.name;
}

export function copyFor(planet: PlanetData) {
  return planetCopy[planet.slug];
}

export function gasName(name: string) {
  return gasLabels[name] || name;
}

export function idPhrase(value: string | null) {
  if (!value) return null;
  return phraseLabels[value] || value;
}
