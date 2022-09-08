import { Layer, TextureSet } from "react-three-texture";
import { useControls } from "leva";

const Gradient = ({ globalProps, ...props }) => {
  const { mesh: Mesh } = globalProps;
  const { color1, color2, color3, from, to, fromRad, toRad } = useControls(props);

  return (
    <>
      <Mesh position={[-1.5, 0, 0]}>
        <TextureSet name="texture/cube-gradient-1" once>
          <Layer
            gradient={{
              from: [from.x, from.y],
              to: [to.x, to.y],
            }}
          />
        </TextureSet>
      </Mesh>
      <Mesh>
        <TextureSet name="texture/cube-gradient-2" once>
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
        <TextureSet name="texture/cube-gradient-3" once>
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
  );
};

export default Gradient;
