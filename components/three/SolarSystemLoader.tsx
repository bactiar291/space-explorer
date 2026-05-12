"use client";

import dynamic from "next/dynamic";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

const SolarSystem = dynamic(() => import("@/components/three/SolarSystem"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export function SolarSystemLoader() {
  return <SolarSystem />;
}
