import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { CosmicVisual } from "@/components/ui/CosmicCard";
import { cosmicObjects, getCosmicObject } from "@/data/cosmic-objects";

type Params = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cosmicObjects.map((object) => ({ slug: object.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const object = getCosmicObject(slug);
  if (!object) return {};

  return {
    title: `${object.name} - Manspace`,
    description: object.summary,
    openGraph: {
      title: `${object.name} | Manspace`,
      description: object.summary,
    },
  };
}

export default async function CosmicObjectPage({ params }: Params) {
  const { slug } = await params;
  const object = getCosmicObject(slug);
  if (!object) notFound();

  return (
    <main className="page-shell">
      <section className="hero-grid object-hero">
        <div className="hero-copy">
          <div className="eyebrow">{object.group}</div>
          <h1>{object.name}</h1>
          <p>{object.summary}</p>
          <div className="metric-strip">
            <div className="metric">
              <strong>{object.region}</strong>
              <span>wilayah</span>
            </div>
            <div className="metric">
              <strong>{object.distance}</strong>
              <span>jarak / waktu</span>
            </div>
            <div className="metric">
              <strong>{object.scale}</strong>
              <span>skala</span>
            </div>
          </div>
          <div style={{ marginTop: 28 }}>
            <Link className="ghost-button" href="/">Kembali ke atlas</Link>
          </div>
        </div>

        <div
          className="cosmic-stage glass-panel"
          style={{ "--orb": object.color, "--orb2": object.color2 } as CSSProperties}
        >
          <CosmicVisual object={object} large />
          <div className="cosmic-stage-text">
            <span>{object.kind}</span>
            <strong>{object.name}</strong>
            <em>{object.easy}</em>
          </div>
        </div>
      </section>

      <section className="section-stack">
        <div className="glass-panel" style={{ padding: 24 }}>
          <div className="eyebrow">Mudah dipahami</div>
          <h2>{object.easy}</h2>
        </div>

        <div className="explain-grid">
          {object.sections.map((section) => (
            <article className="glass-panel explain-card" key={section.title}>
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </article>
          ))}
        </div>

        <div className="glass-panel" style={{ padding: 24 }}>
          <div className="eyebrow">Fakta cepat</div>
          <div className="fact-row">
            {object.facts.map((fact) => (
              <span key={fact}>{fact}</span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
