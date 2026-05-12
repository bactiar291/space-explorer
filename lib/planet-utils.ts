import { planets } from "@/data/planets";
import type { PlanetData } from "@/types/planet";

export function formatCompact(value: number, unit = "") {
  const formatted = new Intl.NumberFormat("en-US", {
    notation: value >= 1_000_000 ? "compact" : "standard",
    maximumFractionDigits: 2,
  }).format(value);
  return `${formatted}${unit ? ` ${unit}` : ""}`;
}

export function planetMetrics(planet: PlanetData) {
  return [
    ["Diameter", formatCompact(planet.physical.diameter_km, "km")],
    ["Mass", planet.physical.mass_kg, "kg"],
    ["Density", `${planet.physical.density_g_cm3} g/cm3`],
    ["Gravity", `${planet.surface.gravity_m_s2} m/s2`],
    ["Escape velocity", `${planet.surface.escape_velocity_km_s} km/s`],
    ["Mean temperature", `${planet.surface.surface_temp_mean_c} C`],
    ["Distance from Sun", `${planet.orbital.distance_from_sun_au} AU`],
    ["Orbital period", `${planet.orbital.orbital_period_days} days`],
    ["Orbital speed", `${planet.orbital.orbital_velocity_km_s} km/s`],
    ["Day length", `${planet.rotation.day_length_hours} h`],
    ["Axial tilt", `${planet.rotation.axial_tilt_deg} deg`],
    ["Moons", String(planet.moons.count)],
  ];
}

export function comparisonRows(metric: "diameter" | "mass" | "gravity" | "distance") {
  const values = planets.map((planet) => {
    const value =
      metric === "diameter"
        ? planet.physical.diameter_km
        : metric === "gravity"
          ? planet.surface.gravity_m_s2
          : metric === "distance"
            ? planet.orbital.distance_from_sun_au
            : Number(planet.physical.mass_kg.replace("e", "E"));
    return { planet, value };
  });
  const max = Math.max(...values.map((row) => row.value));
  return values.map((row) => ({ ...row, percent: Math.max(4, (row.value / max) * 100) }));
}
