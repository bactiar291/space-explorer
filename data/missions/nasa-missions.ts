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
    agency: "Soviet Union",
    target: "Earth orbit",
    summary: "First artificial satellite, opening the space age.",
  },
  {
    year: 1962,
    name: "Mariner 2",
    agency: "NASA",
    target: "Venus",
    summary: "First successful planetary flyby and first spacecraft to study Venus.",
  },
  {
    year: 1965,
    name: "Mariner 4",
    agency: "NASA",
    target: "Mars",
    summary: "Returned the first close-up images of another planet.",
  },
  {
    year: 1969,
    name: "Apollo 11",
    agency: "NASA",
    target: "Moon",
    summary: "First crewed landing on the Moon.",
  },
  {
    year: 1973,
    name: "Pioneer 10",
    agency: "NASA",
    target: "Jupiter",
    summary: "First spacecraft to fly by Jupiter and enter the outer Solar System.",
  },
  {
    year: 1977,
    name: "Voyager 1 and 2",
    agency: "NASA",
    target: "Outer planets",
    summary: "Grand tour missions that transformed knowledge of Jupiter, Saturn, Uranus, and Neptune.",
  },
  {
    year: 1997,
    name: "Mars Pathfinder",
    agency: "NASA",
    target: "Mars",
    summary: "Delivered Sojourner, the first rover to operate on Mars.",
  },
  {
    year: 2004,
    name: "Cassini-Huygens",
    agency: "NASA/ESA/ASI",
    target: "Saturn",
    summary: "Orbited Saturn and landed the Huygens probe on Titan.",
  },
  {
    year: 2015,
    name: "New Horizons",
    agency: "NASA",
    target: "Pluto",
    summary: "First spacecraft to fly by Pluto and explore the Kuiper Belt.",
  },
  {
    year: 2021,
    name: "Perseverance",
    agency: "NASA",
    target: "Mars",
    summary: "Mars rover collecting samples and demonstrating powered flight with Ingenuity.",
  },
];
