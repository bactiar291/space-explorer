"use client";

import dynamic from "next/dynamic";

const ScrollGlobe = dynamic(() => import("./ScrollGlobe").then((m) => m.ScrollGlobe), { ssr: false });

export function HomeGlobe() {
  return <ScrollGlobe />;
}
