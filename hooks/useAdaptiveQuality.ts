"use client";

import { useEffect, useState } from "react";

export type QualityTier = {
  dpr: [number, number];
  segments: number;
  asteroidCount: number;
};

export function useAdaptiveQuality(): QualityTier {
  const [tier, setTier] = useState<QualityTier>({
    dpr: [1, 1.5],
    segments: 40,
    asteroidCount: 420,
  });

  useEffect(() => {
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    const isMobile = window.matchMedia("(max-width: 760px)").matches;

    if (isMobile || memory <= 4 || cores <= 4) {
      setTier({ dpr: [1, 1], segments: 24, asteroidCount: 180 });
      return;
    }

    if (memory >= 8 && cores >= 8) {
      setTier({ dpr: [1, 2], segments: 56, asteroidCount: 720 });
    }
  }, []);

  return tier;
}
