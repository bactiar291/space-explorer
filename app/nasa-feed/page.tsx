import { fetchAPOD, fetchNEO } from "@/lib/nasa-api";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "NASA Live Feed",
  description: "Astronomy Picture of the Day and near-Earth object tracker with cached fallback data.",
};

export default async function NASAFeedPage() {
  const [apod, neos] = await Promise.all([fetchAPOD(), fetchNEO()]);

  return (
    <main className="page-shell">
      <section className="glass-panel" style={{ padding: 28 }}>
        <div className="eyebrow">NASA live feed</div>
        <h1 className="display-title">Daily astronomy and near-Earth objects.</h1>
        <p>
          Data is requested through Space Explorer proxy routes and cached with
          graceful fallback when NASA API quota or network access is unavailable.
        </p>
      </section>

      <section className="feed-grid" style={{ marginTop: 24 }}>
        <article className="glass-panel" style={{ padding: 20 }}>
          <div className="eyebrow">Astronomy Picture of the Day</div>
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
          <div className="eyebrow">Near Earth Objects</div>
          <h2>This week</h2>
          <div className="neo-list" style={{ marginTop: 16 }}>
            {neos.map((neo) => (
              <div className="neo-item" key={neo.id}>
                <strong>{neo.name}</strong>
                <p style={{ margin: "6px 0" }}>
                  Diameter about {neo.diameter_m.toLocaleString()} m. Closest
                  approach: {neo.close_approach_date}.
                </p>
                <p style={{ margin: 0, color: neo.hazardous ? "var(--danger)" : "var(--success)" }}>
                  {neo.relative_velocity_km_s.toFixed(1)} km/s - miss distance{" "}
                  {Math.round(neo.miss_distance_km).toLocaleString()} km
                </p>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
