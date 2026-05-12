import Link from "next/link";
import type { CSSProperties } from "react";
import type { PlanetData } from "@/types/planet";
import { copyFor, planetName } from "@/lib/planet-copy";

export function PlanetCard({ planet }: { planet: PlanetData }) {
  const copy = copyFor(planet);
  const name = planetName(planet);

  return (
    <Link className="planet-card" href={`/planets/${planet.slug}`}>
      <div
        className="planet-orb"
        style={{ "--orb": planet.visual.color_primary } as CSSProperties}
      />
      <h3>{name}</h3>
      <p>{copy?.summary || planet.meta.description}</p>
      <span className="planet-link">Buka dashboard {name}</span>
    </Link>
  );
}
