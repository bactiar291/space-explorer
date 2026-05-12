import Link from "next/link";
import type { CSSProperties } from "react";
import type { PlanetData } from "@/types/planet";

export function PlanetCard({ planet }: { planet: PlanetData }) {
  return (
    <Link className="planet-card" href={`/planets/${planet.slug}`}>
      <div
        className="planet-orb"
        style={{ "--orb": planet.visual.color_primary } as CSSProperties}
      />
      <h3>{planet.name}</h3>
      <p>{planet.meta.description}</p>
      <span className="planet-link">Explore {planet.name}</span>
    </Link>
  );
}
