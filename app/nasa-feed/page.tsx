import { fetchAPOD, fetchNEO } from "@/lib/nasa-api";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Feed NASA",
  description: "Gambar astronomi harian dan pelacak objek dekat Bumi dengan cache cadangan.",
};

export default async function NASAFeedPage() {
  const [apod, neos] = await Promise.all([fetchAPOD(), fetchNEO()]);

  return (
    <main className="page-shell">
      <section className="glass-panel" style={{ padding: 28 }}>
        <div className="eyebrow">Feed langsung NASA</div>
        <h1 className="display-title">Astronomi harian dan objek dekat Bumi.</h1>
        <p>
          Data diminta lewat route proxy Manspace dan diberi cache. Jika kuota
          NASA penuh atau jaringan bermasalah, halaman tetap menampilkan data
          cadangan agar tidak kosong.
        </p>
      </section>

      <section className="feed-grid" style={{ marginTop: 24 }}>
        <article className="glass-panel" style={{ padding: 20 }}>
          <div className="eyebrow">Gambar Astronomi Hari Ini</div>
          {apod.media_type === "image" ? (
            <img className="apod-media" src={apod.url} alt={apod.title} />
          ) : (
            <iframe className="apod-media" src={apod.url} title={apod.title} />
          )}
          <h2 style={{ marginTop: 18 }}>{apod.title}</h2>
          <p>{apod.explanation}</p>
          <p style={{ color: "var(--faint)" }}>
            {apod.date}
            {apod.copyright ? ` - ${apod.copyright}` : ""}
          </p>
        </article>

        <aside className="glass-panel" style={{ padding: 20 }}>
          <div className="eyebrow">Objek Dekat Bumi</div>
          <h2>Minggu ini</h2>
          <div className="neo-list" style={{ marginTop: 16 }}>
            {neos.map((neo) => (
              <div className="neo-item" key={neo.id}>
                <strong>{neo.name}</strong>
                <p style={{ margin: "6px 0" }}>
                  Diameter sekitar {neo.diameter_m.toLocaleString("id-ID")} m.
                  Perlintasan terdekat: {neo.close_approach_date}.
                </p>
                <p style={{ margin: 0, color: neo.hazardous ? "var(--danger)" : "var(--success)" }}>
                  {neo.relative_velocity_km_s.toFixed(1)} km/s - jarak lintas{" "}
                  {Math.round(neo.miss_distance_km).toLocaleString("id-ID")} km
                </p>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
