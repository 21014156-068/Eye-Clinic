import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const sceneThemes = {
  home: {
    aqua: "#89f2e8",
    warm: "#ffc98d",
    deep: "#0b2f47",
    ring: "#93f8f1",
    scale: 1.22,
  },
  about: {
    aqua: "#97dff9",
    warm: "#f9c1a7",
    deep: "#132d5a",
    ring: "#89d5ff",
    scale: 1.1,
  },
  services: {
    aqua: "#7ef1de",
    warm: "#ffd4a3",
    deep: "#09344f",
    ring: "#6ef0df",
    scale: 1.15,
  },
  technology: {
    aqua: "#9beeff",
    warm: "#ffca86",
    deep: "#112f63",
    ring: "#89baff",
    scale: 1.18,
  },
  doctors: {
    aqua: "#7be6d5",
    warm: "#ffbaa9",
    deep: "#123b52",
    ring: "#8cf4d8",
    scale: 1.08,
  },
  gallery: {
    aqua: "#a4f3d6",
    warm: "#ffd4a5",
    deep: "#233b68",
    ring: "#ffe4c4",
    scale: 1.14,
  },
  insights: {
    aqua: "#8fd0ff",
    warm: "#ffcb96",
    deep: "#1d2e5f",
    ring: "#95b7ff",
    scale: 1.08,
  },
  appointment: {
    aqua: "#86f0e9",
    warm: "#ffd7a0",
    deep: "#103754",
    ring: "#9feee7",
    scale: 1.1,
  },
  contact: {
    aqua: "#8de4ff",
    warm: "#ffbba6",
    deep: "#20385a",
    ring: "#9fd1ff",
    scale: 1.06,
  },
};

function createParticleCloud(theme) {
  const count = 220;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const colorA = new THREE.Color(theme.aqua);
  const colorB = new THREE.Color(theme.warm);

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    const radius = 3.6 + Math.random() * 2.4;
    const angle = Math.random() * Math.PI * 2;
    const height = (Math.random() - 0.5) * 3.8;

    positions[offset] = Math.cos(angle) * radius;
    positions[offset + 1] = height;
    positions[offset + 2] = Math.sin(angle) * radius;

    const mix = Math.random();
    colors[offset] = colorA.r * mix + colorB.r * (1 - mix);
    colors[offset + 1] = colorA.g * mix + colorB.g * (1 - mix);
    colors[offset + 2] = colorA.b * mix + colorB.b * (1 - mix);
  }

  return { positions, colors };
}

function ParticleCloud({ theme }) {
  const pointsRef = useRef(null);
  const cloudDataRef = useRef(createParticleCloud(theme));

  useFrame((state) => {
    if (!pointsRef.current) {
      return;
    }

    const elapsed = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = elapsed * 0.04;
    pointsRef.current.rotation.x = Math.sin(elapsed * 0.18) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={cloudDataRef.current.positions}
          count={cloudDataRef.current.positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={cloudDataRef.current.colors}
          count={cloudDataRef.current.colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.055} sizeAttenuation transparent opacity={0.85} vertexColors />
    </points>
  );
}

function OrbitRing({ color, radius, speed, rotation, tube = 0.028, opacity = 0.62 }) {
  const ringRef = useRef(null);

  useFrame((state) => {
    if (!ringRef.current) {
      return;
    }

    ringRef.current.rotation.z = rotation[2] + state.clock.getElapsedTime() * speed;
  });

  return (
    <mesh ref={ringRef} rotation={rotation}>
      <torusGeometry args={[radius, tube, 22, 240]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} transparent opacity={opacity} />
    </mesh>
  );
}

function DataPanels({ theme }) {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const elapsed = state.clock.getElapsedTime();
    groupRef.current.rotation.y = elapsed * 0.16;
    groupRef.current.rotation.x = Math.sin(elapsed * 0.3) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {[
        { position: [2.05, 0.55, 0.35], rotation: [0.24, -0.32, 0.16] },
        { position: [-2.08, -0.7, -0.24], rotation: [-0.18, 0.36, -0.18] },
        { position: [0.25, 1.95, -0.6], rotation: [0.48, 0.14, 0.34] },
      ].map((panel, index) => (
        <mesh key={index} position={panel.position} rotation={panel.rotation}>
          <planeGeometry args={[1.12, 1.5, 12, 12]} />
          <meshPhysicalMaterial
            color={theme.aqua}
            emissive={theme.deep}
            emissiveIntensity={0.45}
            metalness={0.22}
            roughness={0.12}
            transmission={0.75}
            transparent
            opacity={0.38}
          />
        </mesh>
      ))}
    </group>
  );
}

function EyeCore({ theme }) {
  const groupRef = useRef(null);
  const irisRef = useRef(null);
  const corneaRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current || !irisRef.current || !corneaRef.current) {
      return;
    }

    const elapsed = state.clock.getElapsedTime();
    groupRef.current.rotation.y = state.pointer.x * 0.32 + elapsed * 0.18;
    groupRef.current.rotation.x = state.pointer.y * 0.16 + Math.sin(elapsed * 0.42) * 0.12;
    groupRef.current.position.y = Math.sin(elapsed * 1.2) * 0.08;
    irisRef.current.rotation.z = elapsed * 0.45;
    corneaRef.current.position.z = 1.18 + Math.sin(elapsed * 2.2) * 0.03;
  });

  return (
    <group ref={groupRef} scale={theme.scale}>
      <mesh scale={[1.98, 1.28, 1.14]}>
        <sphereGeometry args={[1, 80, 80]} />
        <meshPhysicalMaterial
          color="#eef9ff"
          roughness={0.08}
          metalness={0.08}
          transmission={0.35}
          thickness={0.95}
          clearcoat={1}
          clearcoatRoughness={0.06}
        />
      </mesh>

      <mesh position={[0, 0, 0.18]} scale={[1.34, 0.95, 0.72]}>
        <sphereGeometry args={[1, 72, 72]} />
        <meshStandardMaterial color={theme.deep} emissive={theme.deep} emissiveIntensity={0.45} />
      </mesh>

      <group ref={irisRef} position={[0, 0, 1.04]}>
        <mesh scale={[0.82, 0.82, 0.12]}>
          <cylinderGeometry args={[1, 1, 0.16, 80]} />
          <meshStandardMaterial color={theme.aqua} emissive={theme.aqua} emissiveIntensity={0.88} />
        </mesh>
        <mesh scale={[0.56, 0.56, 0.09]}>
          <cylinderGeometry args={[1, 1, 0.2, 80]} />
          <meshStandardMaterial color="#08131f" />
        </mesh>
        <mesh position={[0, 0, 0.06]} scale={[0.16, 0.16, 0.06]}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.5} />
        </mesh>
      </group>

      <mesh ref={corneaRef} position={[0, 0, 1.18]} scale={[1.04, 0.82, 0.34]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          color="#dffcff"
          roughness={0}
          metalness={0.05}
          transmission={0.95}
          transparent
          opacity={0.26}
        />
      </mesh>
    </group>
  );
}

function SceneContent({ variant }) {
  const theme = sceneThemes[variant] ?? sceneThemes.home;

  return (
    <>
      <fog attach="fog" args={["#040812", 8, 20]} />
      <ambientLight intensity={0.95} />
      <directionalLight position={[4, 4, 5]} intensity={2.8} color={theme.aqua} />
      <pointLight position={[-4, -3, 2]} intensity={24} color={theme.warm} />
      <pointLight position={[0, 3, 6]} intensity={18} color={theme.ring} />

      <ParticleCloud theme={theme} />
      <DataPanels theme={theme} />
      <EyeCore theme={theme} />

      <OrbitRing color={theme.ring} radius={2.48} speed={0.18} rotation={[Math.PI / 2.3, 0.2, 0]} />
      <OrbitRing color={theme.warm} radius={3.08} speed={-0.11} rotation={[Math.PI / 1.9, 0.4, 0.4]} opacity={0.5} />
      <OrbitRing color={theme.aqua} radius={3.66} speed={0.07} rotation={[Math.PI / 2.5, 0.8, 0.2]} tube={0.018} opacity={0.34} />
    </>
  );
}

export default function ImmersiveScene({ variant = "home" }) {
  return (
    <div className="immersive-scene">
      <Canvas
        camera={{ position: [0, 0, 6.6], fov: 32 }}
        dpr={[1, 1.7]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <SceneContent variant={variant} />
      </Canvas>
    </div>
  );
}
