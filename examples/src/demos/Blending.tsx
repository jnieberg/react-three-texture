import { useControls } from "leva";
import DemoProps from "../types/Demo";
import { FC } from "react";
import { Layer, TextureSet } from "react-three-texture";

const Blending: FC<DemoProps> = ({ globalProps, ...props }) => {
  const { mesh: Mesh } = globalProps;
  const { "compositing operation": blending } = useControls(props);

  return Mesh ? (
    <>
      <Mesh position={[-1.5, 0, 0]}>
        <TextureSet name="texture/cube-blend-1">
          <Layer fill="#004477" scale={[0.2, 1]} position={[0, 0]} />
          <Layer fill="#774400" scale={[0.2, 1]} position={[0.4, 0]} />
          <Layer fill="#447700" scale={[0.2, 1]} position={[0.8, 0]} />
          <Layer src="parchment.png" alpha={{ level: 1, power: 10, offset: 0.5, reverse: true }} blend={blending} />
        </TextureSet>
      </Mesh>
      <Mesh>
        <TextureSet name="texture/cube-blend-2">
          <Layer
            gradient={{
              type: "radial",
              from: [0.4, 0.4, 0.35],
              to: [0.4, 0.4, 0.4],
              stops: [
                [0, "#c08000ff"],
                [1, "#c0800000"],
              ],
            }}
          />
          <Layer
            gradient={{
              type: "radial",
              from: [0.6, 0.6, 0.35],
              to: [0.6, 0.6, 0.4],
              stops: [
                [0, "#0080c0ff"],
                [1, "#0080c000"],
              ],
            }}
            blend={blending}
          />
        </TextureSet>
      </Mesh>
      <Mesh position={[1.5, 0, 0]}>
        <TextureSet name="texture/cube-blend-1">
          <Layer src="wall.png" />
          <Layer
            gradient={{
              stops: [
                [0, "white"],
                [1, "transparent"],
              ],
            }}
            blend="xor"
          />
          <Layer src="castle.svg" image="center" color="#880088" blend={blending} />
        </TextureSet>
        <TextureSet name="texture/cube-blend-1" map="roughness">
          <Layer src="wall.png" />
          <Layer src="castle.svg" image="center" color="black" blend={blending} />
        </TextureSet>
      </Mesh>
    </>
  ) : null;
};

export default Blending;
