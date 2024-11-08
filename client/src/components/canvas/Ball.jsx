import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, Float, OrbitControls, Preload } from "@react-three/drei";
import { MeshStandardMaterial, SphereGeometry } from "three";
import CanvasLoader from "../CanvasLoader";

const Ball = () => {
  const ballRef = useRef();
  const scale = window.innerWidth > 768 ? 2.75 : 2;

  useFrame((state) => {
    if (ballRef.current) {
      ballRef.current.rotation.x += 0.002;
      ballRef.current.rotation.y += 0.002;
    }
  });

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <mesh ref={ballRef} castShadow receiveShadow scale={scale}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshPhysicalMaterial
          color="#f2f2f2"
          metalness={0.4}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.2}
          flatShading
          envMapIntensity={0.5}
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = () => {
  return (
    <Canvas
      frameLoop="demand"
      gl={{ preserveDrawingBuffer: true, antialias: true }}
      camera={{ position: [0, 0, 5], fov: 75 }}
      shadows
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
