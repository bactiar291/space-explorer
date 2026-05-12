import Link from "next/link";
import { PlanetCard } from "@/components/ui/PlanetCard";
import { SolarSystemLoader } from "@/components/three/SolarSystemLoader";
import { planets } from "@/data/planets";
import { planetName } from "@/lib/planet-copy";

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">Atlas data NASA/JPL dalam bahasa Indonesia</div>
          <h1>Jelajahi tata surya dalam simulasi 3D real-time.</h1>
          <p>
            Manspace menggabungkan model WebGL responsif, data planet yang
            dikurasi, feed NASA, dan sejarah misi antariksa dalam satu platform
            yang ringan untuk desktop maupun HP.
          </p>
          <div className="metric-strip">
            <div className="metric">
              <strong>8</strong>
              <span>planet utama</span>
            </div>
            <div className="metric">
              <strong>3D</strong>
              <span>simulator orbit</span>
            </div>
            <div className="metric">
              <strong>24j</strong>
              <span>cache APOD NASA</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 28 }}>
            <Link className="primary-button" href="/nasa-feed">Buka Feed NASA</Link>
            <Link className="ghost-button" href="/timeline">Timeline Misi</Link>
          </div>
        </div>
        <SolarSystemLoader />
      </section>

      <section className="section-stack" aria-labelledby="planet-atlas">
        <div>
          <div className="eyebrow">Atlas planet</div>
          <h2 id="planet-atlas">Kartu ilmiah untuk semua planet utama.</h2>
          <p>
            Data inti planet disimpan lokal, jadi halaman detail tetap terbuka
            cepat tanpa menunggu API NASA. Pilih {planetName(planets[2])} atau
            planet lain untuk melihat dashboard planet dengan animasi 3D khusus.
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
