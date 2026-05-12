import { missions } from "@/data/missions/nasa-missions";

export const metadata = {
  title: "Exploration Timeline",
  description: "Chronological timeline of important Solar System exploration missions.",
};

export default function TimelinePage() {
  return (
    <main className="page-shell">
      <section className="glass-panel" style={{ padding: 28 }}>
        <div className="eyebrow">Exploration timeline</div>
        <h1 className="display-title">From first orbit to interstellar pioneers.</h1>
        <p>
          A curated timeline of missions and discoveries that changed how humanity
          understands the Solar System.
        </p>
      </section>
      <section className="section-stack">
        <div className="timeline">
          {missions.map((mission) => (
            <article className="timeline-item" key={`${mission.year}-${mission.name}`}>
              <div className="timeline-year">{mission.year}</div>
              <div>
                <h3>{mission.name}</h3>
                <p style={{ margin: "4px 0", color: "var(--cyan)" }}>
                  {mission.agency} - {mission.target}
                </p>
                <p>{mission.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
