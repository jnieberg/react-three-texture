import { useControls } from "leva";
import { FC } from "react";
import { Layer, TextureSet } from "react-three-texture";
import DemoProps from "../types/Demo";

const Gradient: FC<DemoProps> = ({ globalProps, ...props }) => {
  const { mesh: Mesh } = globalProps;
  const { color1, color2, color3, from, to, fromRad, toRad } = useControls(props);

  return Mesh ? (
    <>
      <Mesh position={[-1.5, 0, 0]}>
        <TextureSet name="texture/gradient-1">
          <Layer
            gradient={{
              from: [from.x, from.y],
              to: [to.x, to.y],
            }}
          />
        </TextureSet>
      </Mesh>
      <Mesh>
        <TextureSet name="texture/gradient-2">
          <Layer
            gradient={{
              from: [from.x, from.y],
              to: [to.x, to.y],
              stops: [
                [0, color1],
                [0.5, color2],
                [1, color3],
              ],
            }}
          />
        </TextureSet>
      </Mesh>
      <Mesh position={[1.5, 0, 0]}>
        <TextureSet name="texture/gradient-3">
          <Layer
            gradient={{
              type: "radial",
              from: [from.x, from.y, fromRad],
              to: [to.x, to.y, toRad],
              stops: [
                [0, color1],
                [0.5, color2],
                [1, color3],
              ],
            }}
          />
        </TextureSet>
      </Mesh>
    </>
  ) : null;
};

export default Gradient;
