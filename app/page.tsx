import Link from "next/link";
import { PlanetCard } from "@/components/ui/PlanetCard";
import { SolarSystemLoader } from "@/components/three/SolarSystemLoader";
import { planets } from "@/data/planets";

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">NASA/JPL inspired data atlas</div>
          <h1>Explore the Solar System in real-time 3D.</h1>
          <p>
            Space Explorer combines a responsive WebGL model, curated planetary
            science, NASA live feeds, and mission history in one Vercel-ready platform.
          </p>
          <div className="metric-strip">
            <div className="metric">
              <strong>8</strong>
              <span>major planets</span>
            </div>
            <div className="metric">
              <strong>3D</strong>
              <span>orbit simulator</span>
            </div>
            <div className="metric">
              <strong>24h</strong>
              <span>NASA APOD cache</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 28 }}>
            <Link className="primary-button" href="/nasa-feed">Open NASA Feed</Link>
            <Link className="ghost-button" href="/timeline">Mission Timeline</Link>
          </div>
        </div>
        <SolarSystemLoader />
      </section>

      <section className="section-stack" aria-labelledby="planet-atlas">
        <div>
          <div className="eyebrow">Planet atlas</div>
          <h2 id="planet-atlas">Scientific cards for every major planet.</h2>
          <p>
            Core planet properties are stored locally, so detail pages work without
            a runtime NASA dependency.
          </p>
        </div>
        <div className="planet-grid">
          {planets.map((planet) => (
            <PlanetCard planet={planet} key={planet.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
