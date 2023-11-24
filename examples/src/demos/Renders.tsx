import { useControls } from "leva";
import { FC } from "react";
import { Layer, TextureSet } from "react-three-texture";
import DemoProps from "../types/Demo";

const Renders: FC<DemoProps> = ({ globalProps, ...props }) => {
  const { mesh: Mesh } = globalProps;
  const { "random seed": randomSeed, "perlin seed": perlinSeed, "perlin detail": detail } = useControls(props);

  return (
    <>
      <Mesh>
        <TextureSet>
          <Layer noise={{ type: "perlin", from: "yellow", to: "red", seed: `perlin_1_${perlinSeed}`, detail }} />
        </TextureSet>
        <TextureSet map="roughness">
          <Layer noise={{ type: "perlin", from: "white", to: "black", seed: `perlin_1_${perlinSeed}`, detail }} />
        </TextureSet>
      </Mesh>
    </>
  );
};

export default Renders;
