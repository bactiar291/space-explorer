"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import { planets } from "@/data/planets";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";
import { planetName } from "@/lib/planet-copy";
import { createPlanetTextureSet } from "@/lib/planet-textures";
import { Atmosphere } from "@/components/three/Atmosphere";
import type { PlanetData } from "@/types/planet";

type SceneState = {
  speed: number;
  showOrbits: boolean;
  showLabels: boolean;
};

function scaleDistance(au: number) {
  return 4 + Math.log2(au + 1) * 7.5;
}

function scaleRadius(radiusKm: number) {
  return Math.max(0.25, Math.log10(radiusKm) * 0.32 - 0.7);
}

function OrbitRing({ radius, visible }: { radius: number; visible: boolean }) {
  if (!visible) return null;
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.006, 8, 160]} />
      <meshBasicMaterial color="#35598f" transparent opacity={0.38} />
    </mesh>
  );
}

function Sun() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * 0.12;
  });
  return (
    <group>
      <mesh ref={mesh}>
        <sphereGeometry args={[2.05, 64, 64]} />
        <meshStandardMaterial emissive="#ffb347" emissiveIntensity={2.4} color="#ffcc70" />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.55, 48, 48]} />
        <meshBasicMaterial color="#ff9a2a" transparent opacity={0.12} blending={THREE.AdditiveBlending} />
      </mesh>
      <pointLight color="#ffd18a" intensity={430} distance={150} />
    </group>
  );
}

function PlanetMesh({
  planet,
  scene,
  segments,
}: {
  planet: PlanetData;
  scene: SceneState;
  segments: number;
}) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const distance = scaleDistance(planet.orbital.distance_from_sun_au);
  const radius = scaleRadius(planet.physical.radius_km);
  const phase = planet.order * 0.72;
  const orbitSpeed = (1 / Math.sqrt(planet.orbital.distance_from_sun_au)) * 0.12;
  const selfRotation = Math.sign(planet.rotation.rotation_period_hours || 1) * 0.35;
  const name = planetName(planet);
  const textures = useMemo(() => createPlanetTextureSet(planet, 512), [planet]);

  useEffect(() => {
    return () => {
      textures.map?.dispose();
      textures.bumpMap?.dispose();
      textures.cloudMap?.dispose();
    };
  }, [textures]);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime * scene.speed * orbitSpeed + phase;
    if (group.current) {
      group.current.position.set(Math.cos(t) * distance, 0, Math.sin(t) * distance);
    }
    if (mesh.current) {
      mesh.current.rotation.y += delta * selfRotation * scene.speed;
    }
  });

  return (
    <>
      <OrbitRing radius={distance} visible={scene.showOrbits} />
      <group ref={group}>
        <mesh
          ref={mesh}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onClick={() => router.push(`/planets/${planet.slug}`)}
        >
          <sphereGeometry args={[radius, segments, segments]} />
          <meshStandardMaterial
            map={textures.map}
            bumpMap={textures.bumpMap}
            bumpScale={0.035}
            color="#ffffff"
            roughness={0.82}
            metalness={0.02}
            emissive={planet.visual.color_secondary}
            emissiveIntensity={hovered ? 0.14 : 0.015}
          />
        </mesh>

        {(planet.slug === "earth" || planet.slug === "venus") && (
          <mesh>
            <sphereGeometry args={[radius * 1.018, Math.max(24, segments), Math.max(24, segments)]} />
            <meshBasicMaterial
              map={textures.cloudMap}
              color="#ffffff"
              transparent
              opacity={planet.slug === "earth" ? 0.28 : 0.18}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        )}

        {planet.visual.has_rings && (
          <mesh rotation={[Math.PI / 2 + planet.rotation.axial_tilt_deg * 0.01, 0, 0]}>
            <ringGeometry args={[radius * 1.45, radius * 2.2, 96]} />
            <meshBasicMaterial
              color={planet.visual.color_secondary}
              transparent
              opacity={0.44}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}

        <Atmosphere radius={radius * 1.08} color={planet.visual.color_secondary} intensity={0.9} />

        {scene.showLabels && (
          <Html distanceFactor={16} position={[0, radius + 0.55, 0]} center>
            <div
              style={{
                border: "1px solid rgba(151,190,255,.28)",
                background: "rgba(3,5,12,.68)",
                color: "#eef5ff",
                padding: "4px 8px",
                whiteSpace: "nowrap",
                fontSize: 11,
                letterSpacing: ".08em",
                textTransform: "uppercase",
              }}
            >
              {name}
            </div>
          </Html>
        )}

        {hovered && (
          <Html distanceFactor={10} position={[0, radius + 1.4, 0]} center>
            <div
              style={{
                width: 180,
                border: "1px solid rgba(151,190,255,.28)",
                background: "rgba(3,5,12,.84)",
                color: "#eef5ff",
                padding: 10,
                fontSize: 12,
                lineHeight: 1.45,
              }}
            >
              <strong>{name}</strong>
              <br />
              Diameter {planet.physical.diameter_km.toLocaleString("id-ID")} km
              <br />
              {planet.moons.count} bulan
            </div>
          </Html>
        )}
      </group>
    </>
  );
}

function AsteroidBelt({ count }: { count: number }) {
  const points = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 24 + Math.random() * 3.5;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.18;
      arr[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return arr;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#aab7d4" size={0.035} transparent opacity={0.65} />
    </points>
  );
}

function Scene({ state }: { state: SceneState }) {
  const quality = useAdaptiveQuality();

  return (
    <Canvas dpr={quality.dpr} camera={{ position: [0, 24, 35], fov: 48 }} gl={{ antialias: true }}>
      <color attach="background" args={["#02030a"]} />
      <ambientLight intensity={0.35} />
      <Stars radius={120} depth={60} count={2200} factor={4} saturation={0} fade speed={0.4} />
      <Sun />
      <AsteroidBelt count={quality.asteroidCount} />
      {planets.map((planet) => (
        <PlanetMesh key={planet.id} planet={planet} scene={state} segments={quality.segments} />
      ))}
      <OrbitControls enablePan={false} minDistance={10} maxDistance={86} />
    </Canvas>
  );
}

export default function SolarSystem() {
  const [state, setState] = useState<SceneState>({
    speed: 8,
    showOrbits: true,
    showLabels: false,
  });

  return (
    <div className="glass-panel canvas-card" aria-label="Simulasi 3D tata surya interaktif">
      <Scene state={state} />
      <div className="hud">
        <div className="hud-row">
          <label>
            Kecepatan {state.speed.toFixed(1)}x
            <input
              type="range"
              min="0.1"
              max="100"
              step="0.1"
              value={state.speed}
              onChange={(event) => setState((prev) => ({ ...prev, speed: Number(event.target.value) }))}
            />
          </label>
          <button onClick={() => setState((prev) => ({ ...prev, showOrbits: !prev.showOrbits }))}>
            {state.showOrbits ? "Sembunyikan orbit" : "Tampilkan orbit"}
          </button>
          <button onClick={() => setState((prev) => ({ ...prev, showLabels: !prev.showLabels }))}>
            {state.showLabels ? "Sembunyikan label" : "Tampilkan label"}
          </button>
        </div>
        <div className="hud-row">
          {planets.map((planet) => (
            <a className="planet-link" key={planet.slug} href={`/planets/${planet.slug}`}>
              {planetName(planet)}
            </a>
          ))}
        </div>
      </div>
      <noscript>
        <table className="fallback-table">
          <thead>
            <tr>
              <th>Planet</th>
              <th>Diameter</th>
              <th>Jarak dari Matahari</th>
            </tr>
          </thead>
          <tbody>
            {planets.map((planet) => (
              <tr key={planet.id}>
                <td>{planetName(planet)}</td>
                <td>{planet.physical.diameter_km.toLocaleString("id-ID")} km</td>
                <td>{planet.orbital.distance_from_sun_au} AU</td>
              </tr>
            ))}
          </tbody>
        </table>
      </noscript>
    </div>
  );
}
