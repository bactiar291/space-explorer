import type { CSSProperties } from "react";

export function LoadingScreen({ label = "Memuat simulasi orbit" }: { label?: string }) {
  return (
    <div className="glass-panel" style={{ display: "grid", minHeight: 420, placeItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div className="planet-orb" style={{ "--orb": "#77d8ff", marginInline: "auto" } as CSSProperties} />
        <p>{label}</p>
      </div>
    </div>
  );
}
