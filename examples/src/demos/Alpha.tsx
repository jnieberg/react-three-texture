import { useControls } from "leva";
import { FC } from "react";
import { Layer, TextureSet } from "react-three-texture";
import DemoProps from "../types/Demo";

const Alpha: FC<DemoProps> = ({ globalProps, ...props }) => {
  const { mesh: Mesh } = globalProps;
  const { level, power, offset, reverse } = useControls(props);

  return Mesh ? (
    <>
      <Mesh x={-1.5}>
        <TextureSet>
          <Layer src="city.png" alpha={{ level, power, offset, reverse }} />
        </TextureSet>
      </Mesh>
      <Mesh>
        <TextureSet>
          <Layer gradient alpha={{ level, power, offset, reverse }} />
          <Layer gradient={{ to: [1, 0] }} alpha={{ level, power, offset, reverse }} blend="overlay" />
        </TextureSet>
      </Mesh>
      <Mesh x={1.5}>
        <TextureSet>
          <Layer fill="#ff00ff" />
          <Layer src="girl.png" color="#00ffff" fit="size-max" alpha={{ level, power, offset, reverse }} />
        </TextureSet>
      </Mesh>
    </>
  ) : null;
};

export default Alpha;
