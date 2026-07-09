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

/* ---------- seamless 3D value noise (wraps around a sphere) ---------- */
function hash3(ix: number, iy: number, iz: number, seed: number) {
  let h = (seed ^ Math.imul(ix, 374761393) ^ Math.imul(iy, 668265263) ^ Math.imul(iz, 2147483647)) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}
const smooth = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function valueNoise3(x: number, y: number, z: number, seed: number) {
  const ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z);
  const fx = x - ix, fy = y - iy, fz = z - iz;
  const ux = smooth(fx), uy = smooth(fy), uz = smooth(fz);
  const c000 = hash3(ix, iy, iz, seed), c100 = hash3(ix + 1, iy, iz, seed);
  const c010 = hash3(ix, iy + 1, iz, seed), c110 = hash3(ix + 1, iy + 1, iz, seed);
  const c001 = hash3(ix, iy, iz + 1, seed), c101 = hash3(ix + 1, iy, iz + 1, seed);
  const c011 = hash3(ix, iy + 1, iz + 1, seed), c111 = hash3(ix + 1, iy + 1, iz + 1, seed);
  const x00 = lerp(c000, c100, ux), x10 = lerp(c010, c110, ux);
  const x01 = lerp(c001, c101, ux), x11 = lerp(c011, c111, ux);
  return lerp(lerp(x00, x10, uy), lerp(x01, x11, uy), uz);
}
function fbm3(x: number, y: number, z: number, seed: number, oct = 5) {
  let amp = 0.5, freq = 1, sum = 0, norm = 0;
  for (let i = 0; i < oct; i += 1) {
    sum += amp * valueNoise3(x * freq, y * freq, z * freq, seed + i * 101);
    norm += amp;
    amp *= 0.5;
    freq *= 2;
  }
  return sum / norm;
}

function hexToRgb(hex: string) {
  const num = Number.parseInt(hex.replace("#", ""), 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
function mixHex(a: string, b: string, t: number) {
  const ca = hexToRgb(a), cb = hexToRgb(b);
  return [Math.round(ca.r + (cb.r - ca.r) * t), Math.round(ca.g + (cb.g - ca.g) * t), Math.round(ca.b + (cb.b - ca.b) * t)];
}
function rgbStr(c: number[]) {
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}
function shade(c: number[], amt: number) {
  return [clamp01(c[0] / 255 + amt) * 255, clamp01(c[1] / 255 + amt) * 255, clamp01(c[2] / 255 + amt) * 255].map(Math.round);
}

/* point on unit sphere from equirectangular pixel */
function spherePoint(u: number, v: number) {
  const lon = u * Math.PI * 2;
  const lat = v * Math.PI - Math.PI / 2;
  const cl = Math.cos(lat);
  return [cl * Math.cos(lon), Math.sin(lat), cl * Math.sin(lon)] as const;
}

type Painter = (ctx: CanvasRenderingContext2D, w: number, h: number, seed: number) => Float32Array;

function buildSurface(planet: PlanetData, size: number, paint: Painter) {
  const width = size;
  const height = Math.round(size / 2);
  const seed = seedFrom(planet.slug);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const heights = paint(ctx, width, height, seed);
  return { canvas, ctx, width, height, heights };
}

function paintEarth(ctx: CanvasRenderingContext2D, width: number, height: number, seed: number): Float32Array {
  const heights = new Float32Array(width * height);
  const img = ctx.createImageData(width, height);
  const warp = seedFrom(`${seed}-warp`);
  for (let y = 0; y < height; y += 1) {
    const v = y / height;
    const lat = v * Math.PI - Math.PI / 2;
    const ice = Math.abs(lat) > 1.15;
    for (let x = 0; x < width; x += 1) {
      const u = x / width;
      const [px, py, pz] = spherePoint(u, v);
      const w = fbm3(px * 1.6, py * 1.6, pz * 1.6, warp, 3) * 0.35;
      const n = fbm3(px * 2.2 + w, py * 2.2 + w, pz * 2.2 + w, seed, 6);
      const i = y * width + x;
      heights[i] = n;
      let col: number[];
      if (n > 0.54) {
        const e = (n - 0.54) / 0.46;
        col = mixHex("#3f7d3a", "#8a6b3f", clamp01(e * 1.4));
        if (e > 0.6) col = mixHex(rgbStr(col), "#cfcabf", (e - 0.6) * 1.2);
      } else {
        col = mixHex("#0b3a78", "#1f6fb0", clamp01((0.54 - n) / 0.4));
      }
      if (ice) col = mixHex(rgbStr(col), "#eef4ff", clamp01((Math.abs(lat) - 1.15) * 3));
      const o = i * 4;
      img.data[o] = col[0]; img.data[o + 1] = col[1]; img.data[o + 2] = col[2]; img.data[o + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return heights;
}

function paintGasGiant(ctx: CanvasRenderingContext2D, width: number, height: number, seed: number, bands: number): Float32Array {
  const heights = new Float32Array(width * height);
  const img = ctx.createImageData(width, height);
  for (let y = 0; y < height; y += 1) {
    const v = y / height;
    const lat = v * Math.PI - Math.PI / 2;
    for (let x = 0; x < width; x += 1) {
      const u = x / width;
      const [px, py, pz] = spherePoint(u, v);
      const warp = fbm3(px * 2.2, py * 1.1, pz * 2.2, seed + 7, 4);
      const turb = fbm3(px * 4 + warp, py * 2, pz * 4 + warp, seed, 5);
      const band = Math.sin(lat * bands + turb * 2.4);
      const t = (band + 1) * 0.5;
      const i = y * width + x;
      heights[i] = t;
      let col = mixHex("#caa46a", "#7c4a2b", t);
      col = mixHex(rgbStr(col), "#e9d3a6", clamp01(turb * 0.8 - 0.2));
      const o = i * 4;
      img.data[o] = col[0]; img.data[o + 1] = col[1]; img.data[o + 2] = col[2]; img.data[o + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return heights;
}

function paintRocky(ctx: CanvasRenderingContext2D, width: number, height: number, seed: number, base: [string, string]): Float32Array {
  const heights = new Float32Array(width * height);
  const img = ctx.createImageData(width, height);
  const rough = seedFrom(`${seed}-r`);
  for (let y = 0; y < height; y += 1) {
    const v = y / height;
    const lat = v * Math.PI - Math.PI / 2;
    const ice = Math.abs(lat) > 1.3;
    for (let x = 0; x < width; x += 1) {
      const u = x / width;
      const [px, py, pz] = spherePoint(u, v);
      const macro = fbm3(px * 1.8, py * 1.8, pz * 1.8, seed, 6);
      const detail = fbm3(px * 7, py * 7, pz * 7, rough, 4);
      const n = macro * 0.7 + detail * 0.3;
      const i = y * width + x;
      heights[i] = n;
      let col = mixHex(base[0], base[1], clamp01(n));
      col = shade(col, (detail - 0.5) * 0.35);
      if (ice) col = mixHex(rgbStr(col), "#f2f6ff", clamp01((Math.abs(lat) - 1.3) * 3));
      const o = i * 4;
      img.data[o] = col[0]; img.data[o + 1] = col[1]; img.data[o + 2] = col[2]; img.data[o + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return heights;
}

function paintClouds(ctx: CanvasRenderingContext2D, width: number, height: number, planet: PlanetData, seed: number) {
  ctx.clearRect(0, 0, width, height);
  if (planet.slug !== "earth" && planet.slug !== "venus") return;
  const img = ctx.createImageData(width, height);
  const dense = planet.slug === "earth" ? 0.55 : 0.6;
  for (let y = 0; y < height; y += 1) {
    const v = y / height;
    for (let x = 0; x < width; x += 1) {
      const u = x / width;
      const [px, py, pz] = spherePoint(u, v);
      const n = fbm3(px * 3, py * 3, pz * 3, seed, 5);
      const a = clamp01((n - dense) / (1 - dense));
      const o = (y * width + x) * 4;
      img.data[o] = 255; img.data[o + 1] = 255; img.data[o + 2] = 255;
      img.data[o + 3] = Math.round(a * (planet.slug === "venus" ? 200 : 235));
    }
  }
  ctx.putImageData(img, 0, 0);
}

function paintJupiterSpot(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const cx = width * 0.68, cy = height * 0.58;
  const g = ctx.createRadialGradient(cx, cy, 4, cx, cy, 70);
  g.addColorStop(0, "rgba(220,120,80,0.85)");
  g.addColorStop(0.5, "rgba(170,80,55,0.6)");
  g.addColorStop(1, "rgba(120,60,40,0)");
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(1.7, 1);
  ctx.translate(-cx, -cy);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(cx, cy, 70, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function heightToBump(canvas: HTMLCanvasElement, heights: Float32Array, width: number, height: number) {
  const bump = document.createElement("canvas");
  bump.width = width;
  bump.height = height;
  const bctx = bump.getContext("2d");
  if (!bctx) return bump;
  const img = bctx.createImageData(width, height);
  for (let i = 0; i < heights.length; i += 1) {
    const v = clamp01(heights[i]) * 255;
    const o = i * 4;
    img.data[o] = v; img.data[o + 1] = v; img.data[o + 2] = v; img.data[o + 3] = 255;
  }
  bctx.putImageData(img, 0, 0);
  return bump;
}

export function createPlanetTextureSet(planet: PlanetData, size = 1024): TextureSet {
  if (typeof document === "undefined") {
    return { map: null, bumpMap: null, cloudMap: null };
  }

  let surface: ReturnType<typeof buildSurface> | null = null;
  if (planet.slug === "earth") {
    surface = buildSurface(planet, size, (c, w, h, s) => paintEarth(c, w, h, s));
  } else if (["jupiter", "saturn", "uranus", "neptune"].includes(planet.slug)) {
    const bands = planet.slug === "jupiter" || planet.slug === "saturn" ? 11 : 8;
    surface = buildSurface(planet, size, (c, w, h, s) => paintGasGiant(c, w, h, s, bands));
    if (planet.slug === "jupiter" && surface) paintJupiterSpot(surface.ctx, w_of(surface), h_of(surface));
  } else if (planet.slug === "venus") {
    surface = buildSurface(planet, size, (c, w, h, s) => paintGasGiant(c, w, h, s, 6));
  } else {
    const base: [string, string] =
      planet.slug === "mars" ? ["#7a3b25", "#c98a5e"] :
      planet.slug === "mercury" ? ["#5a5550", "#9c938a"] :
      ["#6b6258", "#a89c8c"];
    surface = buildSurface(planet, size, (c, w, h, s) => paintRocky(c, w, h, s, base));
  }

  if (!surface) return { map: null, bumpMap: null, cloudMap: null };
  const { canvas, ctx, width, height, heights } = surface;

  const bump = heightToBump(canvas, heights, width, height);
  const cloudCanvas = document.createElement("canvas");
  cloudCanvas.width = width;
  cloudCanvas.height = height;
  paintClouds(cloudCanvas.getContext("2d")!, width, height, planet, seedFrom(`${planet.slug}-cloud`));

  const map = new THREE.CanvasTexture(canvas);
  const bumpMap = new THREE.CanvasTexture(bump);
  const cloudMap = new THREE.CanvasTexture(cloudCanvas);
  for (const texture of [map, bumpMap, cloudMap]) {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    texture.wrapS = THREE.RepeatWrapping;
    texture.needsUpdate = true;
  }

  return { map, bumpMap, cloudMap };
}

function w_of(s: NonNullable<ReturnType<typeof buildSurface>>) { return s.width; }
function h_of(s: NonNullable<ReturnType<typeof buildSurface>>) { return s.height; }
