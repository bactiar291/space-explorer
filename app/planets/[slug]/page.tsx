import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { getPlanet, planets } from "@/data/planets";
import { comparisonRows, formatCompact, planetMetrics } from "@/lib/planet-utils";

type Params = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return planets.map((planet) => ({ slug: planet.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const planet = getPlanet(slug);
  if (!planet) return {};

  return {
    title: `${planet.name} - Interactive 3D Planet`,
    description: planet.meta.description,
    keywords: planet.meta.seo_keywords,
    openGraph: {
      title: `${planet.name} | Space Explorer`,
      description: planet.meta.description,
      images: [`/api/og?planet=${planet.slug}`],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function PlanetDetailPage({ params }: Params) {
  const { slug } = await params;
  const planet = getPlanet(slug);
  if (!planet) notFound();
  const metrics = planetMetrics(planet);
  const comparison = comparisonRows("diameter");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AstronomicalObject",
    name: planet.name,
    description: planet.meta.description,
    url: `/planets/${planet.slug}`,
  };

  return (
    <main className="page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">Planet profile</div>
          <h1>{planet.name}</h1>
          <p>{planet.meta.description}</p>
          <div className="metric-strip">
            <div className="metric">
              <strong>{formatCompact(planet.physical.diameter_km)}</strong>
              <span>diameter km</span>
            </div>
            <div className="metric">
              <strong>{planet.orbital.distance_from_sun_au}</strong>
              <span>astronomical units</span>
            </div>
            <div className="metric">
              <strong>{planet.moons.count}</strong>
              <span>confirmed moons</span>
            </div>
          </div>
          <div style={{ marginTop: 28 }}>
            <Link className="ghost-button" href="/">Back to Solar System</Link>
          </div>
        </div>
        <div className="glass-panel canvas-card" style={{ display: "grid", placeItems: "center" }}>
          <div
            style={{
              "--orb": planet.visual.color_primary,
              width: "min(52vw, 340px)",
              height: "min(52vw, 340px)",
            } as CSSProperties}
            className="planet-orb"
            aria-label={`${planet.name} visual rendering`}
          />
          {planet.visual.has_rings && (
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                width: "min(70vw, 520px)",
                height: "min(24vw, 150px)",
                border: `2px solid ${planet.visual.color_secondary}`,
                transform: "rotate(-14deg)",
                borderRadius: "50%",
                opacity: 0.48,
              }}
            />
          )}
        </div>
      </section>

      <section className="section-stack">
        <div className="glass-panel" style={{ padding: 24 }}>
          <div className="eyebrow">Scientific data</div>
          <div className="data-grid">
            {metrics.map(([label, value, unit]) => (
              <div className="data-card" key={label}>
                <span>{label}</span>
                <strong>
                  {value}
                  {unit ? ` ${unit}` : ""}
                </strong>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: 24 }}>
          <div className="eyebrow">Atmosphere</div>
          <h2>{planet.atmosphere.present ? "Composition profile" : "No substantial atmosphere"}</h2>
          <div className="data-grid" style={{ marginTop: 18 }}>
            {planet.atmosphere.composition.length > 0 ? (
              planet.atmosphere.composition.map((item) => (
                <div className="data-card" key={item.gas}>
                  <span>{item.gas}</span>
                  <strong>{item.percentage}%</strong>
                </div>
              ))
            ) : (
              <p>No atmospheric composition data available.</p>
            )}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: 24 }}>
          <div className="eyebrow">Comparison</div>
          <h2>Diameter relative to every major planet.</h2>
          <div style={{ display: "grid", gap: 10, marginTop: 20 }}>
            {comparison.map((row) => (
              <div key={row.planet.id} style={{ display: "grid", gridTemplateColumns: "90px 1fr 92px", gap: 12, alignItems: "center" }}>
                <span style={{ color: row.planet.slug === planet.slug ? row.planet.visual.color_primary : "var(--muted)" }}>
                  {row.planet.name}
                </span>
                <div style={{ height: 12, border: "1px solid var(--line)", background: "rgba(0,0,0,.2)" }}>
                  <div
                    style={{
                      width: `${row.percent}%`,
                      height: "100%",
                      background: row.planet.visual.color_primary,
                    }}
                  />
                </div>
                <span style={{ color: "var(--faint)", textAlign: "right" }}>
                  {formatCompact(row.value, "km")}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: 24 }}>
          <div className="eyebrow">Exploration history</div>
          <h2>Spacecraft and discovery record.</h2>
          <div className="data-grid" style={{ marginTop: 18 }}>
            <div className="data-card">
              <span>Known since</span>
              <strong>{planet.discovery.known_since}</strong>
            </div>
            <div className="data-card">
              <span>Discovered by</span>
              <strong>{planet.discovery.discovered_by || "Ancient observers"}</strong>
            </div>
            <div className="data-card">
              <span>Visited by</span>
              <strong>{planet.discovery.spacecraft_visited.join(", ")}</strong>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
