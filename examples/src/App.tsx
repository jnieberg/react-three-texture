import "./App.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ACESFilmicToneMapping, SpotLight, sRGBEncoding, Vector3, VSMShadowMap } from "three";
import { Suspense, useRef } from "react";
import { Environment, OrbitControls, Plane } from "@react-three/drei";
import { Navigation, Routes } from "./ui/Navigation";
import { useEffect } from "react";

const SceneSetup = () => {
  const { gl } = useThree();

  const floorColor = "#888888";
  const backColor = "#bbccdd";

  useEffect(() => {});

  gl.shadowMap.enabled = true;
  gl.shadowMap.type = VSMShadowMap;

  return (
    <>
      <fog attach="fog" color={backColor} near={25} far={50} />
      <color attach="background" args={[backColor]} />
      <Plane position={[0, -0.01, 0]} rotation={[-Math.PI * 0.5, 0, 0]} scale={[100, 100, 100]} receiveShadow>
        <meshStandardMaterial attach="material" color={floorColor} />
      </Plane>
      <spotLight
        castShadow
        intensity={100}
        distance={40}
        position={[0, 2, 3]}
        lookAt={() => new Vector3(0, 0, 0)}
        color="white"
        penumbra={1}
        angle={Math.PI * 0.3}
        decay={2}
        shadow-bias={-0.001}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.1}
        shadow-camera-far={40}
        shadow-radius={4}
        shadow-blurSamples={20}
      />
      <Environment preset="forest" />
    </>
  );
};

const Controls = () => {
  const light = useRef<SpotLight>(null);
  const { camera } = useThree();

  useFrame(() => {
    light.current?.position.copy(camera.position);
  });

  return (
    <>
      <spotLight
        ref={light}
        intensity={50}
        distance={40}
        color="white"
        lookAt={() => new Vector3(0, 0, 0)}
        penumbra={0.5}
        angle={Math.PI * 0.1}
        decay={2}
      />
      <OrbitControls target={[0, 0.5, 0]} minDistance={3} maxDistance={30} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} />
    </>
  );
};

const App = () => {
  return (
    <>
      <Navigation />
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          stencil: false,
          pixelRatio: window.devicePixelRatio,
          outputEncoding: sRGBEncoding,
          powerPreference: "high-performance",
          toneMapping: ACESFilmicToneMapping,
          physicallyCorrectLights: true,
        }}
        shadows
        camera={{ position: [-4, 2, 4], fov: 30 }}
        frameloop="demand"
      >
        <Controls />
        <Suspense fallback={null}>
          <SceneSetup />
          <Routes />
        </Suspense>
      </Canvas>
    </>
  );
};

export default App;