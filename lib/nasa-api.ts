import type { APOD, NEOItem } from "@/types/nasa-api";

const NASA_BASE = "https://api.nasa.gov";

export const fallbackAPOD: APOD = {
  title: "Solar System Portrait",
  explanation:
    "NASA live data is temporarily unavailable or the API key is not configured. Space Explorer keeps the platform usable with cached scientific context and local planet data.",
  url: "https://www.nasa.gov/wp-content/uploads/2023/03/stsci-01gwqjz7qmyrqwjazf1xyyg0jh.png",
  media_type: "image",
  date: "cached",
  copyright: "NASA",
};

export const fallbackNEO: NEOItem[] = [
  {
    id: "fallback-1",
    name: "Sample near-Earth object",
    diameter_m: 120,
    close_approach_date: "daily feed unavailable",
    relative_velocity_km_s: 18.4,
    miss_distance_km: 7400000,
    hazardous: false,
  },
];

function nasaKey() {
  return process.env.NASA_API_KEY || "DEMO_KEY";
}

export async function fetchAPOD(): Promise<APOD> {
  try {
    const res = await fetch(`${NASA_BASE}/planetary/apod?api_key=${nasaKey()}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return fallbackAPOD;
    const data = (await res.json()) as APOD;
    return data.title ? data : fallbackAPOD;
  } catch {
    return fallbackAPOD;
  }
}

function isoDate(offsetDays: number) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

export async function fetchNEO(): Promise<NEOItem[]> {
  try {
    const res = await fetch(
      `${NASA_BASE}/neo/rest/v1/feed?start_date=${isoDate(0)}&end_date=${isoDate(6)}&api_key=${nasaKey()}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return fallbackNEO;
    const data = await res.json();
    const objects = Object.values(data.near_earth_objects || {}).flat() as any[];
    const mapped = objects.slice(0, 12).map((item) => {
      const approach = item.close_approach_data?.[0] || {};
      const diameter = item.estimated_diameter?.meters || {};
      return {
        id: item.id,
        name: item.name,
        diameter_m: Math.round(((diameter.estimated_diameter_min || 0) + (diameter.estimated_diameter_max || 0)) / 2),
        close_approach_date: approach.close_approach_date || "unknown",
        relative_velocity_km_s: Number(approach.relative_velocity?.kilometers_per_second || 0),
        miss_distance_km: Number(approach.miss_distance?.kilometers || 0),
        hazardous: Boolean(item.is_potentially_hazardous_asteroid),
      } satisfies NEOItem;
    });
    return mapped.length ? mapped : fallbackNEO;
  } catch {
    return fallbackNEO;
  }
}
