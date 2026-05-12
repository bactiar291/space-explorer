import { ImageResponse } from "next/og";
import { getPlanet } from "@/data/planets";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const planet = getPlanet(searchParams.get("planet") || "earth") || getPlanet("earth");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg,#02030a,#0b1530)",
          color: "#eef5ff",
          padding: 72,
          fontFamily: "Arial",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 54 }}>
          <div
            style={{
              width: 260,
              height: 260,
              borderRadius: 999,
              background: `radial-gradient(circle at 35% 28%, #fff, ${planet?.visual.color_primary} 35%, ${planet?.visual.color_secondary} 78%)`,
              boxShadow: `0 0 90px ${planet?.visual.color_primary}`,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "#77d8ff", letterSpacing: 8, fontSize: 24 }}>
              SPACE EXPLORER
            </div>
            <div style={{ fontSize: 110, fontWeight: 800, lineHeight: 1 }}>
              {planet?.name}
            </div>
            <div style={{ marginTop: 22, color: "#9fb0ca", fontSize: 30, maxWidth: 640 }}>
              {planet?.meta.description}
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
