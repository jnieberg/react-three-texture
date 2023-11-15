import { useControls } from "leva";
import { FC } from "react";
import { Layer, TextureSet } from "react-three-texture";
import DemoProps from "../types/Demo";

const Renders: FC<DemoProps> = ({ globalProps, ...props }) => {
  const { mesh: Mesh } = globalProps;
  const { "random seed": randomSeed, "perlin seed": perlinSeed, "perlin detail": detail } = useControls(props);

  return (
    <>
      <Mesh x={-1.5}>
        <TextureSet>
          <Layer scale={[1, 1]} noise={{ type: "random", seed: `random_1_${randomSeed}`, from: "#000000", to: "#ffffff" }} />
        </TextureSet>
        <TextureSet map="bump">
          <Layer scale={[1, 1]} noise={{ type: "random", seed: `random_1_${randomSeed}`, from: "#000000", to: "#ffffff" }} />
        </TextureSet>
      </Mesh>
      <Mesh>
        <TextureSet>
          <Layer noise={{ type: "perlin", from: "yellow", to: "red", seed: `perlin_1_${perlinSeed}`, detail }} />
        </TextureSet>
      </Mesh>
    </>
  );
};

export default Renders;
