import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 90;
const CONNECT_DISTANCE = 2.4;

function generateNodes(count: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
  }
  return positions;
}

function Network({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const positions = useMemo(() => generateNodes(NODE_COUNT), []);
  const velocities = useMemo(
    () =>
      Array.from({ length: NODE_COUNT }, () => ({
        x: (Math.random() - 0.5) * 0.004,
        y: (Math.random() - 0.5) * 0.004,
        z: (Math.random() - 0.5) * 0.002,
      })),
    []
  );

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const maxSegments = NODE_COUNT * 8;
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(maxSegments * 6), 3));
    return geometry;
  }, []);

  const pointsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [positions]);

  useFrame((state) => {
    const pos = pointsGeometry.attributes.position.array as Float32Array;

    for (let i = 0; i < NODE_COUNT; i++) {
      pos[i * 3] += velocities[i].x;
      pos[i * 3 + 1] += velocities[i].y;
      pos[i * 3 + 2] += velocities[i].z;

      if (Math.abs(pos[i * 3]) > 5.2) velocities[i].x *= -1;
      if (Math.abs(pos[i * 3 + 1]) > 3.2) velocities[i].y *= -1;
      if (Math.abs(pos[i * 3 + 2]) > 2.2) velocities[i].z *= -1;
    }
    pointsGeometry.attributes.position.needsUpdate = true;

    const linePos = lineGeometry.attributes.position.array as Float32Array;
    let segmentIndex = 0;
    const maxSegments = NODE_COUNT * 8;

    for (let i = 0; i < NODE_COUNT && segmentIndex < maxSegments; i++) {
      for (let j = i + 1; j < NODE_COUNT && segmentIndex < maxSegments; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONNECT_DISTANCE) {
          const base = segmentIndex * 6;
          linePos[base] = pos[i * 3];
          linePos[base + 1] = pos[i * 3 + 1];
          linePos[base + 2] = pos[i * 3 + 2];
          linePos[base + 3] = pos[j * 3];
          linePos[base + 4] = pos[j * 3 + 1];
          linePos[base + 5] = pos[j * 3 + 2];
          segmentIndex++;
        }
      }
    }

    lineGeometry.setDrawRange(0, segmentIndex * 2);
    lineGeometry.attributes.position.needsUpdate = true;

    if (groupRef.current) {
      const targetX = pointer.current.y * 0.18;
      const targetY = pointer.current.x * 0.24;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.03;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.03;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={pointsGeometry}>
        <pointsMaterial color="#e2a33d" size={0.045} sizeAttenuation transparent opacity={0.9} />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#4b4e8c" transparent opacity={0.35} />
      </lineSegments>
    </group>
  );
}

function ScrollCamera({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.z = 8 - scrollRef.current * 1.5;
  });
  return null;
}

interface SceneProps {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  scrollRef: React.MutableRefObject<number>;
}

export function NetworkScene({ pointer, scrollRef }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.6} />
      <Network pointer={pointer} />
      <ScrollCamera scrollRef={scrollRef} />
    </Canvas>
  );
}
