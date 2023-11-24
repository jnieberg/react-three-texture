import { useControls } from "leva";
import { FC } from "react";
import { Layer, MapType, TextureSet } from "react-three-texture";
import DemoProps from "../types/Demo";
import Bricks from "../temp/components/presets/Bricks";

const Presets: FC<DemoProps> = ({ globalProps, ...props }) => {
  const { mesh: Mesh } = globalProps;
  const { width, height, thickness, radius, offsetX, randomizeX, randomizeY, randomizeS, "random seed": seed } = useControls(props);

  const PrettyBricks = ({ map }: { map?: MapType }) => (
    <TextureSet map={map}>
      <Layer fill={map === "bump" ? "black" : map === "roughness" ? "#eeeeee" : "#554433"} />
      <Bricks
        color={map === "bump" ? "white" : map === "roughness" ? "#888888" : ["#ffffee", "#ffeecc", "#eeccaa", "#ccaa88", "#aa8866"]}
        width={width}
        height={height}
        thickness={thickness}
        offsetX={offsetX}
        seed={seed}
        randomize={[randomizeX, randomizeY, randomizeS]}
        radius={radius}
        layer={map === "bump" ? { filter: `blur(3px)` } : undefined}
      />
      {map && <Layer noise={{ type: "perlin", from: "#333333", to: "#ffffff", seed, detail: 1.3 }} blend="hard-light" />}
    </TextureSet>
  );

  return (
    <Mesh>
      <PrettyBricks />
      <PrettyBricks map="bump" />
      <PrettyBricks map="roughness" />
    </Mesh>
  );
};

export default Presets;
