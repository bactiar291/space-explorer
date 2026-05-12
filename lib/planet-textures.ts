import * as THREE from "three";
import type { PlanetData } from "@/types/planet";

type TextureSet = {
  map: THREE.CanvasTexture | null;
  bumpMap: THREE.CanvasTexture | null;
  cloudMap: THREE.CanvasTexture | null;
};

function seedFrom(value: string) {
  let seed = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    seed ^= value.charCodeAt(i);
    seed = Math.imul(seed, 16777619);
  }
  return seed >>> 0;
}

function random(seed: number) {
  let state = seed || 1;
  return () => {
    state = Math.imul(1664525, state) + 1013904223;
    return ((state >>> 0) / 4294967296);
  };
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const num = Number.parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function mix(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

function colorMix(a: string, b: string, t: number) {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  return `rgb(${mix(ca.r, cb.r, t)}, ${mix(ca.g, cb.g, t)}, ${mix(ca.b, cb.b, t)})`;
}

function paintStars(ctx: CanvasRenderingContext2D, width: number, height: number, rand: () => number) {
  for (let i = 0; i < 180; i += 1) {
    const alpha = rand() * 0.18;
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fillRect(rand() * width, rand() * height, rand() * 2 + 0.4, rand() * 1.6 + 0.4);
  }
}

function paintRocky(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  planet: PlanetData,
  rand: () => number,
) {
  const base = ctx.createLinearGradient(0, 0, width, height);
  base.addColorStop(0, colorMix("#ffffff", planet.visual.color_primary, 0.25));
  base.addColorStop(0.38, planet.visual.color_primary);
  base.addColorStop(1, colorMix("#05070d", planet.visual.color_secondary, 0.55));
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < 1300; i += 1) {
    const x = rand() * width;
    const y = rand() * height;
    const shade = rand() > 0.5 ? "255,255,255" : "0,0,0";
    ctx.fillStyle = `rgba(${shade},${0.025 + rand() * 0.08})`;
    ctx.fillRect(x, y, rand() * 4 + 0.5, rand() * 2 + 0.5);
  }

  for (let i = 0; i < (planet.slug === "mercury" ? 74 : 34); i += 1) {
    const radius = 4 + rand() * (planet.slug === "mars" ? 18 : 34);
    const x = rand() * width;
    const y = rand() * height;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,0,0,${0.12 + rand() * 0.22})`;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x - radius * 0.24, y - radius * 0.24, radius * 0.86, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,255,255,${0.05 + rand() * 0.18})`;
    ctx.lineWidth = 1 + rand() * 2;
    ctx.stroke();
  }
}

function paintEarth(ctx: CanvasRenderingContext2D, width: number, height: number, rand: () => number) {
  const ocean = ctx.createLinearGradient(0, 0, width, height);
  ocean.addColorStop(0, "#2a79d4");
  ocean.addColorStop(0.55, "#124f97");
  ocean.addColorStop(1, "#06234e");
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < 34; i += 1) {
    const x = rand() * width;
    const y = rand() * height;
    const rx = 30 + rand() * 110;
    const ry = 18 + rand() * 70;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rand() * Math.PI);
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = rand() > 0.4 ? "#2e8f57" : "#a47d45";
    ctx.fill();
    ctx.restore();
  }

  ctx.fillStyle = "rgba(255,255,255,.88)";
  ctx.fillRect(0, 0, width, 16 + height * 0.05);
  ctx.fillRect(0, height - 24 - height * 0.06, width, 28 + height * 0.06);
}

function paintGasGiant(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  planet: PlanetData,
  rand: () => number,
) {
  const bands = planet.slug === "jupiter" || planet.slug === "saturn" ? 28 : 14;
  for (let i = 0; i < bands; i += 1) {
    const y = (i / bands) * height;
    const h = height / bands + 3;
    const t = (Math.sin(i * 1.7) + 1) * 0.5;
    ctx.fillStyle = colorMix(planet.visual.color_primary, planet.visual.color_secondary, t * 0.75);
    ctx.fillRect(0, y, width, h);
    ctx.fillStyle = `rgba(255,255,255,${0.04 + rand() * 0.08})`;
    ctx.fillRect(0, y + h * 0.25, width, 1 + rand() * 3);
  }

  for (let i = 0; i < 620; i += 1) {
    const y = rand() * height;
    ctx.fillStyle = `rgba(255,255,255,${0.025 + rand() * 0.07})`;
    ctx.fillRect(rand() * width, y, 22 + rand() * 130, 0.6 + rand() * 2.4);
  }

  if (planet.slug === "jupiter") {
    ctx.save();
    ctx.translate(width * 0.68, height * 0.55);
    ctx.rotate(-0.12);
    const storm = ctx.createRadialGradient(0, 0, 6, 0, 0, 66);
    storm.addColorStop(0, "#ffd4a4");
    storm.addColorStop(0.45, "#bd5d38");
    storm.addColorStop(1, "rgba(80,24,18,0)");
    ctx.fillStyle = storm;
    ctx.beginPath();
    ctx.ellipse(0, 0, 86, 42, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function paintClouds(ctx: CanvasRenderingContext2D, width: number, height: number, planet: PlanetData, rand: () => number) {
  ctx.clearRect(0, 0, width, height);
  if (planet.slug !== "earth" && planet.slug !== "venus") return;
  for (let i = 0; i < (planet.slug === "earth" ? 130 : 220); i += 1) {
    const y = rand() * height;
    const x = rand() * width;
    const w = 30 + rand() * 190;
    ctx.fillStyle = `rgba(255,255,255,${0.06 + rand() * (planet.slug === "earth" ? 0.2 : 0.13)})`;
    ctx.beginPath();
    ctx.ellipse(x, y, w, 3 + rand() * 14, rand() * 0.8 - 0.4, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function createPlanetTextureSet(planet: PlanetData, size = 1024): TextureSet {
  if (typeof document === "undefined") {
    return { map: null, bumpMap: null, cloudMap: null };
  }

  const width = size;
  const height = Math.round(size / 2);
  const rand = random(seedFrom(planet.slug));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return { map: null, bumpMap: null, cloudMap: null };

  if (planet.slug === "earth") {
    paintEarth(ctx, width, height, rand);
  } else if (["jupiter", "saturn", "uranus", "neptune", "venus"].includes(planet.slug)) {
    paintGasGiant(ctx, width, height, planet, rand);
  } else {
    paintRocky(ctx, width, height, planet, rand);
  }
  paintStars(ctx, width, height, rand);

  const bump = document.createElement("canvas");
  bump.width = width;
  bump.height = height;
  const bumpCtx = bump.getContext("2d");
  if (bumpCtx) {
    bumpCtx.drawImage(canvas, 0, 0);
    const img = bumpCtx.getImageData(0, 0, width, height);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = (img.data[i] + img.data[i + 1] + img.data[i + 2]) / 3;
      img.data[i] = v;
      img.data[i + 1] = v;
      img.data[i + 2] = v;
    }
    bumpCtx.putImageData(img, 0, 0);
  }

  const cloud = document.createElement("canvas");
  cloud.width = width;
  cloud.height = height;
  const cloudCtx = cloud.getContext("2d");
  if (cloudCtx) paintClouds(cloudCtx, width, height, planet, random(seedFrom(`${planet.slug}-cloud`)));

  const map = new THREE.CanvasTexture(canvas);
  const bumpMap = new THREE.CanvasTexture(bump);
  const cloudMap = new THREE.CanvasTexture(cloud);
  for (const texture of [map, bumpMap, cloudMap]) {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    texture.wrapS = THREE.RepeatWrapping;
    texture.needsUpdate = true;
  }

  return { map, bumpMap, cloudMap };
}
