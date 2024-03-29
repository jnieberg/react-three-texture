import { useControls } from "leva";
import { FC } from "react";
import { Layer, TextureSet } from "react-three-texture";
import DemoProps from "../types/Demo";

const Effects: FC<DemoProps> = ({ globalProps, ...props }) => {
  const { mesh: Mesh } = globalProps;
  const { size, strength, softness, detail, darken, blur, color, offset, colorO, sizeO, detailO } = useControls(props);

  return Mesh ? (
    <>
      <Mesh x={-1.5}>
        <TextureSet>
          <Layer src="girl.png" scale={[1, 1.5]} bloom={{ size, strength, softness, detail, darken }} />
        </TextureSet>
      </Mesh>
      <Mesh>
        <TextureSet>
          <Layer fill="#ff4400" />
          <Layer src="wall.svg" color="#ffee66" shadow={{ color, blur, offset: [offset.x, offset.y] }} />
        </TextureSet>
        <TextureSet map="bump">
          <Layer fill="black" />
          <Layer src="wall.svg" color="white" shadow={{ color: "white", blur: 10 }} />
        </TextureSet>
      </Mesh>
      <Mesh x={1.5}>
        <TextureSet>
          <Layer fill="#0000ff" />
          <Layer
            src="wolf-head.svg"
            scale={[0.75, 0.75]}
            fit="center middle"
            color="#4488ff"
            outline={{ color: colorO, size: sizeO, detail: detailO }}
          />
        </TextureSet>
      </Mesh>
    </>
  ) : null;
};

export default Effects;
