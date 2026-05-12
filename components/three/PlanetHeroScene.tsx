"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { PlanetData } from "@/types/planet";

function PlanetBody({ planet }: { planet: PlanetData }) {
  const group = useRef<THREE.Group>(null);
  const planetMesh = useRef<THREE.Mesh>(null);
  const cloudMesh = useRef<THREE.Mesh>(null);
  const tilt = THREE.MathUtils.degToRad(planet.rotation.axial_tilt_deg);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.08;
    if (planetMesh.current) planetMesh.current.rotation.y += delta * 0.28;
    if (cloudMesh.current) cloudMesh.current.rotation.y += delta * 0.38;
  });

  return (
    <group ref={group} rotation={[tilt * 0.35, 0, -tilt * 0.18]}>
      <mesh ref={planetMesh}>
        <sphereGeometry args={[2.25, 96, 96]} />
        <meshStandardMaterial
          color={planet.visual.color_primary}
          roughness={0.66}
          metalness={0.04}
          emissive={planet.visual.color_secondary}
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh ref={cloudMesh}>
        <sphereGeometry args={[2.31, 64, 64]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={planet.slug === "earth" ? 0.16 : 0.06}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.55, 64, 64]} />
        <meshBasicMaterial
          color={planet.visual.color_primary}
          transparent
          opacity={0.14}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
      {planet.visual.has_rings && (
        <mesh rotation={[Math.PI / 2.65, 0, 0]}>
          <ringGeometry args={[3.0, 4.45, 160]} />
          <meshBasicMaterial
            color={planet.visual.color_secondary}
            transparent
            opacity={0.52}
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
    <Canvas dpr={[1, 1.8]} camera={{ position: [0, 1.2, 8], fov: 42 }} gl={{ antialias: true }}>
      <color attach="background" args={["#02030a"]} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[5, 3, 7]} intensity={3.2} color="#f8d9a2" />
      <pointLight position={[-4, -3, 3]} intensity={10} color={planet.visual.color_primary} />
      <Stars radius={80} depth={40} count={1400} factor={3.8} saturation={0} fade speed={0.35} />
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
