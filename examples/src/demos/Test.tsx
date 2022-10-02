import { invalidate, useFrame } from "@react-three/fiber";
import { FC, useEffect, useRef } from "react";
import { MeshStandardMaterial, RepeatWrapping } from "three";
import PrettyBox from "../meshes/PrettyBox";
import PrettySphere from "../meshes/PrettySphere";
import { MapType, Layer, TextureSet, useTextureSet } from "react-three-texture";
import DemoProps from "../types/Demo";

const LayerHelp = {
  Sky: ({ color, fill }: { color: string; fill: string }) => (
    <>
      <Layer src="parchment.png" repeat seamless={{ offset: [0.5, 0], size: [0.3, 0], flipX: true }} />
      <Layer
        gradient={{
          stops: [
            [0, color],
            [0.4, color],
            [0.6, fill],
          ],
        }}
        blend="color"
      />
    </>
  ),
};

const Test: FC<DemoProps> = () => {
  const refCube = useRef<any>(null);
  const ref = useRef<MeshStandardMaterial>(null);

  useFrame(() => {
    if (refCube.current) {
      refCube.current.rotateY(0.002);
      invalidate();
    }
  });

  const ExtraLayer = () => <Layer src="burger.svg" scale={[0.5, 0.5]} fit />;

  const texture = useTextureSet(
    <>
      <Layer fill="white" />
      <Layer circle={[0.5, 0.5, 0.4]} color="black" shapeThickness={16} />
      <ExtraLayer />
    </>,
    64
  );

  const envTexture = useTextureSet(<Layer src="https://images.unsplash.com/photo-1570284613060-766c33850e00" />, 2048, true);

  const children = (
    <>
      <Layer circle={[0.5, 0.5, 0.4]} color="black" shapeThickness={16} />
      <ExtraLayer />
    </>
  );

  const TestTextureSet = ({ map }: { map?: MapType }) => (
    <TextureSet map={map}>
      <Layer fill="lightGrey" />
      {children}
    </TextureSet>
  );

  useEffect(() => {
    if (ref.current) ref.current.needsUpdate = true;
  }, [texture]);

  return (
    <>
      <PrettyBox position={[-1.5, 0, 0]}>
        <TextureSet repeat={[4, 4]} wrapS={RepeatWrapping} wrapT={RepeatWrapping}>
          <Layer fill="lightGrey" />
          {children}
        </TextureSet>
        <TextureSet map="roughness">
          <Layer fill="black" />
        </TextureSet>
        <TextureSet map="env" dimensions={2048}>
          <Layer src="https://images.unsplash.com/photo-1582129165473-a878f105f3b8" />
        </TextureSet>
      </PrettyBox>
      <mesh ref={refCube} castShadow receiveShadow position={[0, 0, 0]} scale={[1.5, 1, 1.5]}>
        <roundedBoxGeometry attach="geometry" args={[1, 1, 1, 8, 0.5]} />
        <meshStandardMaterial
          ref={ref}
          attach="material"
          emissiveIntensity={1}
          roughness={0}
          metalness={1}
          map={texture}
          bumpMap={texture}
          envMap={envTexture}
          envMapIntensity={1}
        />
      </mesh>
      <PrettySphere position={[1.5, 0, 0]}>
        <TestTextureSet map="roughness" />
        <TextureSet map="env" dimensions={2048}>
          <Layer src="https://images.unsplash.com/photo-1582129165473-a878f105f3b8" />
        </TextureSet>
      </PrettySphere>
      <PrettyBox position={[0, 0, 1.5]}>
        <TextureSet repeat={[2, 2]} wrapS={RepeatWrapping} wrapT={RepeatWrapping}>
          <LayerHelp.Sky color="blue" fill="red" />
        </TextureSet>
      </PrettyBox>
    </>
  );
};

export default Test;
