import Link from "next/link";
import type { CSSProperties } from "react";
import type { CosmicObject } from "@/types/cosmic";

export function CosmicVisual({ object, large = false }: { object: CosmicObject; large?: boolean }) {
  return (
    <div
      className={`cosmic-visual cosmic-${object.kind}${large ? " cosmic-visual-large" : ""}`}
      style={
        {
          "--orb": object.color,
          "--orb2": object.color2,
        } as CSSProperties
      }
      aria-hidden="true"
    />
  );
}

export function CosmicCard({ object }: { object: CosmicObject }) {
  return (
    <Link className="cosmic-card" href={`/objects/${object.slug}`}>
      <CosmicVisual object={object} />
      <div>
        <span>{object.group}</span>
        <h3>{object.name}</h3>
        <p>{object.easy}</p>
        <em>Buka penjelasan</em>
      </div>
    </Link>
  );
}
