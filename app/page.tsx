import Link from "next/link";
import { CosmicCard } from "@/components/ui/CosmicCard";
import { PlanetCard } from "@/components/ui/PlanetCard";
import { SolarSystemLoader } from "@/components/three/SolarSystemLoader";
import { HomeGlobe } from "@/components/three/HomeGlobe";
import { cosmicObjects } from "@/data/cosmic-objects";
import { planets } from "@/data/planets";

export default function HomePage() {
  const totalAtlas = planets.length + cosmicObjects.length;

  return (
    <div className="home">
      <HomeGlobe />

      <section className="home-hero">
        <div className="kicker">Atlas Astronomi Interaktif</div>
        <h1>
          MAN<span>SPACE</span>
        </h1>
        <p className="lede">
          Satu panggung untuk menjelajahi tata surya, galaksi, dan awal semesta —
          lengkap dengan simulasi 3D, data ilmiah, dan feed langsung dari NASA.
        </p>
        <div className="home-cta">
          <Link className="primary-button" href="/planets/earth">Lihat Bumi 3D</Link>
          <Link className="ghost-button" href="/nasa-feed">Feed NASA</Link>
          <Link className="ghost-button" href="/timeline">Timeline Misi</Link>
        </div>
        <div className="scrollcue"><span className="dot" /> Geser untuk memutar bumi</div>
      </section>

      <section className="home-section">
        <div className="index">01 — Pendahuluan</div>
        <div className="head">
          <h2>Memulai dari yang dekat, lalu melesat keluar angkasa.</h2>
          <p>
            Manspace menyusun objek kosmos dalam bahasa Indonesia: dari planet
            yang bisa kaulihat tiap malam, hingga galaksi dan lubang hitam yang
            cuma sempat terekam cahayanya. {totalAtlas} objek siap dijelajahi.
          </p>
        </div>
      </section>

      <section className="home-section">
        <div className="index">02 — Atlas Planet</div>
        <div className="head">
          <h2>Delapan dunia, masing-masing dengan dashboard 3D.</h2>
          <p>Pilih planet untuk membuka data fisik, orbit, atmosfer, dan riwayat eksplorasinya.</p>
        </div>
        <div className="planet-grid">
          {planets.map((planet) => (
            <PlanetCard planet={planet} key={planet.id} />
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="index">03 — Tata Surya Langsung</div>
        <div className="head">
          <h2>Simulasi orbit yang bisa kauputar sendiri.</h2>
          <p>Geser kecepatan, sembunyikan garis orbit, atau klik sebuah planet untuk masuk ke dalamnya.</p>
        </div>
        <SolarSystemLoader />
      </section>

      <section className="home-section">
        <div className="index">04 — Atlas Semesta</div>
        <div className="head">
          <h2>Dari Dentuman Besar ke galaksi di ujung jangkauan.</h2>
          <p>Objek di luar tata surya, dengan penjelasan singkat agar mudah dipahami pemula.</p>
        </div>
        <div className="cosmic-grid">
          {cosmicObjects.map((object) => (
            <CosmicCard object={object} key={object.slug} />
          ))}
        </div>
      </section>

      <footer className="site-foot">
        <span className="brand-foot">MANSPACE</span>
        <span>Atlas Astronomi Interaktif · {totalAtlas} objek</span>
        <span>Data & visualisasi 3D · Feed NASA</span>
      </footer>
    </div>
  );
}
