import { useControls } from "leva";
import { FC } from "react";
import { Layer, TextureSet } from "react-three-texture";
import DemoProps from "../types/Demo";

const Renders: FC<DemoProps> = ({ globalProps, ...props }) => {
  const { mesh: Mesh } = globalProps;
  const { "random seed": randomSeed, detail } = useControls(props);

  return (
    <>
      <Mesh x={-1.5}>
        <TextureSet>
          <Layer noise={{ type: "perlin", from: "yellow", to: "red", seed: `perlin_1_${randomSeed}`, detail }} />
        </TextureSet>
      </Mesh>
      <Mesh position={[0, 0, 0]} receiveShadow>
        <TextureSet>
          <Layer scale={[1, 1]} noise={{ type: "random", seed: `random_1_${randomSeed}`, from: "#000000", to: "#ffffff" }} />
        </TextureSet>
        <TextureSet map="bump">
          <Layer scale={[1, 1]} noise={{ type: "random", seed: `random_1_${randomSeed}`, from: "#000000", to: "#ffffff" }} />
        </TextureSet>
      </Mesh>
    </>
  );
};

export default Renders;
