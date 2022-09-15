import { useControls } from "leva";
import { FC } from "react";
import { Layer, TextureSet } from "react-three-texture";
import DemoProps from "../types/Demo";

const Effects: FC<DemoProps> = ({ globalProps, ...props }) => {
  const { mesh: Mesh } = globalProps;
  const { size, strength, softness, detail, darken, blur, color, offset, colorO, sizeO, detailO } = useControls(props);

  return Mesh ? (
    <>
      <Mesh position={[-1.5, 0, 0]}>
        <TextureSet>
          <Layer src="girl.png" scale={[1, 1.5]} bloom={{ size, strength, softness, detail, darken }} />
        </TextureSet>
      </Mesh>
      <Mesh>
        <TextureSet>
          <Layer fill="#ff4400" />
          <Layer
            src="burning-meteor.svg"
            scale={[0.75, 0.75]}
            image="center middle"
            color="#ffee66"
            shadow={{ color, blur, offset: [offset.x, offset.y] }}
          />
        </TextureSet>
      </Mesh>
      <Mesh position={[1.5, 0, 0]}>
        <TextureSet>
          <Layer fill="#0000ff" />
          <Layer
            src="wolf-head.svg"
            scale={[0.75, 0.75]}
            image="center middle"
            color="#4488ff"
            outline={{ color: colorO, size: sizeO, detail: detailO }}
          />
        </TextureSet>
      </Mesh>
    </>
  ) : null;
};

export default Effects;
