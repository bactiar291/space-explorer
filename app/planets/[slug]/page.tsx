import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlanetHeroScene } from "@/components/three/PlanetHeroScene";
import { getPlanet, planets } from "@/data/planets";
import { copyFor, gasName, idPhrase, planetName } from "@/lib/planet-copy";
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
    title: `${planetName(planet)} - Dashboard Planet 3D`,
    description: copyFor(planet)?.summary || planet.meta.description,
    keywords: planet.meta.seo_keywords,
    openGraph: {
      title: `${planetName(planet)} | Manspace`,
      description: copyFor(planet)?.summary || planet.meta.description,
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
  const copy = copyFor(planet);
  const name = planetName(planet);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AstronomicalObject",
    name,
    description: copy?.summary || planet.meta.description,
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
          <div className="eyebrow">Dashboard planet</div>
          <h1>{name}</h1>
          <p>{copy?.summary || planet.meta.description}</p>
          <div className="metric-strip">
            <div className="metric">
              <strong>{formatCompact(planet.physical.diameter_km)}</strong>
              <span>diameter km</span>
            </div>
            <div className="metric">
              <strong>{planet.orbital.distance_from_sun_au}</strong>
              <span>satuan astronomi</span>
            </div>
            <div className="metric">
              <strong>{planet.moons.count}</strong>
              <span>bulan terkonfirmasi</span>
            </div>
          </div>
          <div style={{ marginTop: 28 }}>
            <Link className="ghost-button" href="/">Kembali ke Tata Surya</Link>
          </div>
        </div>
        <PlanetHeroScene planet={planet} name={name} tagline={copy?.tagline || "Planet utama tata surya"} />
      </section>

      <nav className="planet-switcher" aria-label="Pilih planet lain">
        {planets.map((p) => (
          <Link
            key={p.id}
            href={`/planets/${p.slug}`}
            className={p.slug === planet.slug ? "active" : ""}
          >
            {planetName(p)}
          </Link>
        ))}
      </nav>

      <section className="section-stack">
        <div className="glass-panel" style={{ padding: 24 }}>
          <div className="eyebrow">Data ilmiah</div>
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
          <div className="eyebrow">Penjelasan ringkas</div>
          <div className="explain-grid">
            <article>
              <h3>Orbit</h3>
              <p>{copy?.orbit}</p>
            </article>
            <article>
              <h3>Permukaan</h3>
              <p>{copy?.surface}</p>
            </article>
            <article>
              <h3>Atmosfer</h3>
              <p>{copy?.atmosphere}</p>
            </article>
            <article>
              <h3>Eksplorasi</h3>
              <p>{copy?.exploration}</p>
            </article>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: 24 }}>
          <div className="eyebrow">Atmosfer</div>
          <h2>{planet.atmosphere.present ? "Komposisi utama" : "Tidak ada atmosfer tebal"}</h2>
          <div className="data-grid" style={{ marginTop: 18 }}>
            {planet.atmosphere.composition.length > 0 ? (
              planet.atmosphere.composition.map((item) => (
                <div className="data-card" key={item.gas}>
                  <span>{gasName(item.gas)}</span>
                  <strong>{item.percentage}%</strong>
                </div>
              ))
            ) : (
              <p>Data komposisi atmosfer tidak tersedia.</p>
            )}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: 24 }}>
          <div className="eyebrow">Perbandingan</div>
          <h2>Diameter dibandingkan semua planet utama.</h2>
          <div style={{ display: "grid", gap: 10, marginTop: 20 }}>
            {comparison.map((row) => (
              <div key={row.planet.id} style={{ display: "grid", gridTemplateColumns: "90px 1fr 92px", gap: 12, alignItems: "center" }}>
                <span style={{ color: row.planet.slug === planet.slug ? row.planet.visual.color_primary : "var(--muted)" }}>
                  {planetName(row.planet)}
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
          <div className="eyebrow">Riwayat eksplorasi</div>
          <h2>Catatan penemuan dan kunjungan wahana.</h2>
          <div className="data-grid" style={{ marginTop: 18 }}>
            <div className="data-card">
              <span>Dikenal sejak</span>
              <strong>{idPhrase(planet.discovery.known_since)}</strong>
            </div>
            <div className="data-card">
              <span>Ditemukan oleh</span>
              <strong>{idPhrase(planet.discovery.discovered_by) || "Pengamat zaman kuno"}</strong>
            </div>
            <div className="data-card">
              <span>Dikunjungi oleh</span>
              <strong>{planet.discovery.spacecraft_visited.join(", ")}</strong>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: 24 }}>
          <div className="eyebrow">Fakta cepat</div>
          <div className="fact-row">
            {(copy?.facts || planet.meta.fun_facts).map((fact) => (
              <span key={fact}>{fact}</span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
