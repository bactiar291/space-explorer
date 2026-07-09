"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { createPlanetTextureSet } from "@/lib/planet-textures";
import { Atmosphere } from "@/components/three/Atmosphere";
import type { PlanetData } from "@/types/planet";

const PLANET_RADIUS = 2.25;

function PlanetBody({ planet }: { planet: PlanetData }) {
  const group = useRef<THREE.Group>(null);
  const planetMesh = useRef<THREE.Mesh>(null);
  const cloudMesh = useRef<THREE.Mesh>(null);
  const tilt = THREE.MathUtils.degToRad(planet.rotation.axial_tilt_deg);
  const textures = useMemo(() => createPlanetTextureSet(planet, 1400), [planet]);

  useEffect(() => {
    return () => {
      textures.map?.dispose();
      textures.bumpMap?.dispose();
      textures.cloudMap?.dispose();
    };
  }, [textures]);

  const hasClouds = planet.slug === "earth" || planet.slug === "venus";
  const cloudOpacity = planet.slug === "earth" ? 0.85 : planet.slug === "venus" ? 0.6 : 0;

  useFrame((_, delta) => {
    if (planetMesh.current) planetMesh.current.rotation.y += delta * 0.06;
    if (cloudMesh.current) cloudMesh.current.rotation.y += delta * 0.085;
  });

  return (
    <group ref={group} rotation={[tilt, 0, 0]}>
      <mesh ref={planetMesh}>
        <sphereGeometry args={[PLANET_RADIUS, 128, 128]} />
        <meshStandardMaterial
          map={textures.map}
          bumpMap={textures.bumpMap}
          bumpScale={planet.slug === "jupiter" || planet.slug === "saturn" ? 0.02 : 0.04}
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {hasClouds && (
        <mesh ref={cloudMesh}>
          <sphereGeometry args={[PLANET_RADIUS * 1.015, 96, 96]} />
          <meshStandardMaterial
            map={textures.cloudMap}
            transparent
            opacity={cloudOpacity}
            depthWrite={false}
          />
        </mesh>
      )}

      <Atmosphere radius={PLANET_RADIUS * 1.04} color={planet.visual.color_secondary} intensity={1.15} />

      {planet.visual.has_rings && (
        <mesh rotation={[Math.PI / 2.2, 0, 0]}>
          <ringGeometry args={[PLANET_RADIUS * 1.4, PLANET_RADIUS * 2.1, 200]} />
          <meshBasicMaterial
            color={planet.visual.color_secondary}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

function MoonDots({ planet }: { planet: PlanetData }) {
  const group = useRef<THREE.Group>(null);
  const count = Math.min(8, Math.max(planet.moons.notable.length, planet.moons.count ? 3 : 0));
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        angle: (Math.PI * 2 * index) / Math.max(count, 1),
        radius: 3.2 + index * 0.24,
        size: 0.045 + (index % 3) * 0.018,
      })),
    [count],
  );

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.22;
  });

  if (!count) return null;

  return (
    <group ref={group}>
      {dots.map((dot, index) => (
        <mesh
          key={index}
          position={[
            Math.cos(dot.angle) * dot.radius,
            Math.sin(index * 1.7) * 0.34,
            Math.sin(dot.angle) * dot.radius,
          ]}
        >
          <sphereGeometry args={[dot.size, 16, 16]} />
          <meshBasicMaterial color="#dbe9ff" />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ planet }: { planet: PlanetData }) {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0.6, 7.4], fov: 42 }} gl={{ antialias: true }}>
      <color attach="background" args={["#02030a"]} />
      <ambientLight intensity={0.22} />
      <directionalLight position={[5, 2.5, 6]} intensity={2.6} color="#fff2dd" />
      <directionalLight position={[-6, -2, -4]} intensity={0.5} color={planet.visual.color_primary} />
      <Stars radius={90} depth={50} count={1800} factor={4} saturation={0} fade speed={0.3} />
      <PlanetBody planet={planet} />
      <MoonDots planet={planet} />
    </Canvas>
  );
}

export function PlanetHeroScene({
  planet,
  name,
  tagline,
}: {
  planet: PlanetData;
  name: string;
  tagline: string;
}) {
  return (
    <div className="planet-stage" aria-label={`Animasi 3D ${name}`}>
      <Scene planet={planet} />
      <div className="planet-stage-copy">
        <span>{planet.symbol}</span>
        <strong>{name}</strong>
        <em>{tagline}</em>
      </div>
    </div>
  );
}
