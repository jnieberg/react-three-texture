import { useControls } from "leva";
import { FC } from "react";
import { Layer, TextureSet } from "react-three-texture";
import DemoProps from "../types/Demo";

const Alpha: FC<DemoProps> = ({ globalProps, ...props }) => {
  const { mesh: Mesh } = globalProps;
  const { level, power, offset, reverse } = useControls(props);

  return Mesh ? (
    <>
      <Mesh position={[-1.5, 0, 0]}>
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
      <Mesh position={[1.5, 0, 0]}>
        <TextureSet>
          <Layer fill="#880088" />
          <Layer src="girl.png" color="#00ffff" image="fit-max" alpha={{ level, power, offset, reverse }} blend="hard-light" />
        </TextureSet>
      </Mesh>
    </>
  ) : null;
};

export default Alpha;
