"use client";

import { useMemo } from "react";
import * as THREE from "three";

type AtmosphereProps = {
  radius: number;
  color: string;
  power?: number;
  intensity?: number;
};

export function Atmosphere({ radius, color, power = 3.2, intensity = 1.1 }: AtmosphereProps) {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        glowColor: { value: new THREE.Color(color) },
        power: { value: power },
        intensity: { value: intensity },
      },
      vertexShader: /* glsl */ `
        varying vec3 vNormal;
        varying vec3 vView;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vView = mv.xyz;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 glowColor;
        uniform float power;
        uniform float intensity;
        varying vec3 vNormal;
        varying vec3 vView;
        void main() {
          vec3 viewDir = normalize(-vView);
          float fres = pow(1.0 - abs(dot(vNormal, viewDir)), power);
          gl_FragColor = vec4(glowColor, fres * intensity);
        }
      `,
    });
  }, [color, power, intensity]);

  return (
    <mesh material={material} scale={radius}>
      <sphereGeometry args={[1, 64, 64]} />
    </mesh>
  );
}
