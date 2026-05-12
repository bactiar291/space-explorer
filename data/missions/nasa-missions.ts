export type Mission = {
  year: number;
  name: string;
  agency: string;
  target: string;
  summary: string;
};

export const missions: Mission[] = [
  {
    year: 1957,
    name: "Sputnik 1",
    agency: "Uni Soviet",
    target: "Orbit Bumi",
    summary: "Satelit buatan pertama yang membuka era antariksa modern.",
  },
  {
    year: 1962,
    name: "Mariner 2",
    agency: "NASA",
    target: "Venus",
    summary: "Lintasan dekat planet pertama yang sukses dan wahana pertama yang mempelajari Venus.",
  },
  {
    year: 1965,
    name: "Mariner 4",
    agency: "NASA",
    target: "Mars",
    summary: "Mengirim gambar jarak dekat pertama dari planet lain.",
  },
  {
    year: 1969,
    name: "Apollo 11",
    agency: "NASA",
    target: "Bulan",
    summary: "Pendaratan manusia pertama di Bulan.",
  },
  {
    year: 1973,
    name: "Pioneer 10",
    agency: "NASA",
    target: "Jupiter",
    summary: "Wahana pertama yang melintas dekat Jupiter dan memasuki wilayah tata surya luar.",
  },
  {
    year: 1977,
    name: "Voyager 1 dan 2",
    agency: "NASA",
    target: "Planet luar",
    summary: "Misi grand tour yang mengubah pemahaman tentang Jupiter, Saturnus, Uranus, dan Neptunus.",
  },
  {
    year: 1997,
    name: "Mars Pathfinder",
    agency: "NASA",
    target: "Mars",
    summary: "Mengirim Sojourner, rover pertama yang beroperasi di Mars.",
  },
  {
    year: 2004,
    name: "Cassini-Huygens",
    agency: "NASA/ESA/ASI",
    target: "Saturnus",
    summary: "Mengorbit Saturnus dan mendaratkan probe Huygens di Titan.",
  },
  {
    year: 2015,
    name: "New Horizons",
    agency: "NASA",
    target: "Pluto",
    summary: "Wahana pertama yang melintas dekat Pluto dan menjelajahi Sabuk Kuiper.",
  },
  {
    year: 2021,
    name: "Perseverance",
    agency: "NASA",
    target: "Mars",
    summary: "Rover Mars yang mengumpulkan sampel dan mendemonstrasikan penerbangan bertenaga dengan Ingenuity.",
  },
];
