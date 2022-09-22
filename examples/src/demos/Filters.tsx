import { useControls } from "leva";
import { FC } from "react";
import { Layer, TextureSet } from "react-three-texture";
import DemoProps from "../types/Demo";

const Filters: FC<DemoProps> = ({ globalProps, ...props }) => {
  const { mesh: Mesh } = globalProps;
  const { brightness, contrast, blur, hue, saturate, invert } = useControls(props);
  const filters = `brightness(${brightness}%) contrast(${contrast}%) blur(${blur}px) hue-rotate(${hue}deg) saturate(${saturate}%) invert(${invert})`;
  return Mesh ? (
    <>
      <Mesh position={[-1.5, 0, 0]}>
        <TextureSet>
          <Layer src="girl.png" image="fit-max center" filter={filters} />
        </TextureSet>
      </Mesh>
      <Mesh>
        <TextureSet>
          <Layer src="desk.png" image="fit-max center" filter={filters} />
        </TextureSet>
      </Mesh>
      <Mesh position={[1.5, 0, 0]}>
        <TextureSet>
          <Layer src="city.png" image="fit-max center" filter={filters} />
        </TextureSet>
      </Mesh>
    </>
  ) : null;
};

export default Filters;
