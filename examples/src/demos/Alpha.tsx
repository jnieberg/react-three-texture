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
        <TextureSet name="texture/alpha-1">
          <Layer src="city.png" alpha={{ level, power, offset, reverse }} />
        </TextureSet>
      </Mesh>
      <Mesh>
        <TextureSet name="texture/alpha-2">
          <Layer gradient alpha={{ level, power, offset, reverse }} />
        </TextureSet>
      </Mesh>
      <Mesh position={[1.5, 0, 0]}>
        <TextureSet name="texture/alpha-3">
          <Layer src="city.png" alpha={{ level, power, offset, reverse }} />
        </TextureSet>
      </Mesh>
    </>
  ) : null;
};

export default Alpha;
