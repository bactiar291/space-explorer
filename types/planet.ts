export type AtmosphereItem = {
  gas: string;
  percentage: number;
};

export type PlanetData = {
  id: string;
  name: string;
  slug: string;
  symbol: string;
  order: number;
  physical: {
    diameter_km: number;
    radius_km: number;
    mass_kg: string;
    volume_km3: string;
    density_g_cm3: number;
    surface_area_km2: number;
    flattening: number;
  };
  orbital: {
    distance_from_sun_km: number;
    distance_from_sun_au: number;
    orbital_period_days: number;
    orbital_period_years: number;
    orbital_velocity_km_s: number;
    orbital_inclination_deg: number;
    orbital_eccentricity: number;
    perihelion_km: number;
    aphelion_km: number;
  };
  rotation: {
    rotation_period_hours: number;
    axial_tilt_deg: number;
    day_length_hours: number;
  };
  surface: {
    gravity_m_s2: number;
    escape_velocity_km_s: number;
    surface_temp_min_c: number;
    surface_temp_max_c: number;
    surface_temp_mean_c: number;
    surface_pressure_bar: number | null;
  };
  atmosphere: {
    present: boolean;
    composition: AtmosphereItem[];
    pressure_bar: number | null;
  };
  magnetic_field: {
    present: boolean;
    strength_relative_to_earth: number | null;
    notes: string;
  };
  moons: {
    count: number;
    notable: string[];
  };
  rings: {
    present: boolean;
    notes: string;
  };
  discovery: {
    known_since: string;
    discovered_by: string | null;
    discovery_year: number | null;
    spacecraft_visited: string[];
  };
  visual: {
    color_primary: string;
    color_secondary: string;
    has_rings: boolean;
  };
  meta: {
    description: string;
    fun_facts: string[];
    seo_keywords: string[];
  };
};
