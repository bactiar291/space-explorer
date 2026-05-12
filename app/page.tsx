import Link from "next/link";
import { CosmicCard } from "@/components/ui/CosmicCard";
import { PlanetCard } from "@/components/ui/PlanetCard";
import { SolarSystemLoader } from "@/components/three/SolarSystemLoader";
import { cosmicObjects } from "@/data/cosmic-objects";
import { planets } from "@/data/planets";
import { planetName } from "@/lib/planet-copy";

export default function HomePage() {
  const totalAtlas = planets.length + cosmicObjects.length;

  return (
    <main className="page-shell">
      <section className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">Atlas data kosmos dalam bahasa Indonesia</div>
          <h1>Jelajahi planet, galaksi, dan awal semesta.</h1>
          <p>
            Manspace menggabungkan simulasi 3D tata surya, dashboard planet,
            eksoplanet, Bima Sakti, nebula, lubang hitam, dan penjelasan mudah
            dipahami untuk pemula.
          </p>
          <div className="metric-strip">
            <div className="metric">
              <strong>{totalAtlas}</strong>
              <span>objek atlas</span>
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

      <section className="launch-dashboard" aria-labelledby="mission-control">
        <div className="dashboard-panel dashboard-intro">
          <div className="eyebrow">Dashboard pembuka</div>
          <h2 id="mission-control">Mulai eksplorasi tanpa bingung.</h2>
          <p>
            Pilih jalur belajar: pahami awal semesta, masuk ke galaksi,
            lalu turun ke planet dan bulan yang paling menarik untuk dipelajari.
          </p>
          <div className="dashboard-actions">
            <Link href="/objects/dentuman-besar">Mulai dari Dentuman Besar</Link>
            <Link href="/objects/bima-sakti">Masuk ke Bima Sakti</Link>
            <Link href="/planets/earth">Lihat Bumi 3D</Link>
          </div>
        </div>
        <div className="dashboard-panel dashboard-orbit" aria-hidden="true">
          <span className="orbit-core">MS</span>
          <span className="orbit-ring ring-one" />
          <span className="orbit-ring ring-two" />
          <span className="orbit-dot dot-one" />
          <span className="orbit-dot dot-two" />
          <span className="orbit-dot dot-three" />
        </div>
        <div className="dashboard-panel dashboard-readout">
          <div>
            <strong>{totalAtlas}</strong>
            <span>objek kosmik</span>
          </div>
          <div>
            <strong>47</strong>
            <span>halaman statis cepat</span>
          </div>
          <div>
            <strong>HD</strong>
            <span>tekstur planet prosedural</span>
          </div>
        </div>
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

      <section className="section-stack" aria-labelledby="cosmic-atlas">
        <div>
          <div className="eyebrow">Atlas semesta</div>
          <h2 id="cosmic-atlas">Dari Dentuman Besar sampai planet di luar tata surya.</h2>
          <p>
            Bagian ini menambah objek kosmik populer dari Bima Sakti dan luar
            tata surya. Setiap kartu punya ilustrasi animasi dan halaman
            penjelasan singkat agar mudah dipahami.
          </p>
        </div>
        <div className="cosmic-grid">
          {cosmicObjects.map((object) => (
            <CosmicCard object={object} key={object.slug} />
          ))}
        </div>
      </section>
    </main>
  );
}
