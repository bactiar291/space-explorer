"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { getPlanet } from "@/data/planets";
import { createPlanetTextureSet } from "@/lib/planet-textures";
import { Atmosphere } from "@/components/three/Atmosphere";

function Globe() {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const planet = useMemo(() => getPlanet("earth")!, []);
  const textures = useMemo(() => createPlanetTextureSet(planet, 1024), [planet]);
  const scroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.current = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => {
      textures.map?.dispose();
      textures.bumpMap?.dispose();
      textures.cloudMap?.dispose();
    };
  }, [textures]);

  useFrame(({ clock }, dt) => {
    const s = scroll.current;
    if (group.current) {
      group.current.rotation.y = clock.elapsedTime * 0.08 + s * Math.PI * 3.2;
      group.current.rotation.x = Math.sin(s * Math.PI) * 0.28;
    }
    const targetZ = 6.2 - s * 3.4;
    camera.position.z += (targetZ - camera.position.z) * Math.min(1, dt * 4);
    camera.position.y = s * 0.6;
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[2, 128, 128]} />
        <meshStandardMaterial
          map={textures.map}
          bumpMap={textures.bumpMap}
          bumpScale={0.04}
          roughness={0.9}
          metalness={0}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.02, 96, 96]} />
        <meshStandardMaterial map={textures.cloudMap} transparent opacity={0.85} depthWrite={false} />
      </mesh>
      <Atmosphere radius={2.08} color={planet.visual.color_secondary} intensity={1.2} />
    </group>
  );
}

export function ScrollGlobe() {
  return (
    <div className="scroll-globe" aria-hidden="true">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6.2], fov: 45 }} gl={{ antialias: true }}>
        <color attach="background" args={["#04060e"]} />
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 2.5, 5]} intensity={2.6} color="#fff2dd" />
        <directionalLight position={[-6, -2, -4]} intensity={0.5} color="#5b8cff" />
        <Stars radius={120} depth={60} count={2600} factor={4.5} saturation={0} fade speed={0.25} />
        <Globe />
      </Canvas>
    </div>
  );
}
