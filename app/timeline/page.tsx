import { missions } from "@/data/missions/nasa-missions";

export const metadata = {
  title: "Timeline Eksplorasi",
  description: "Timeline kronologis misi penting eksplorasi tata surya.",
};

export default function TimelinePage() {
  return (
    <main className="page-shell">
      <section className="glass-panel" style={{ padding: 28 }}>
        <div className="eyebrow">Timeline eksplorasi</div>
        <h1 className="display-title">Dari orbit pertama sampai penjelajah antarbintang.</h1>
        <p>
          Rangkaian misi dan penemuan yang mengubah cara manusia memahami
          tata surya, planet, bulan, asteroid, dan batas luar ruang antariksa.
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
