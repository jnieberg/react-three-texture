import { Layer, TextureSet } from "../../../src";
import { useControls } from "leva";
import { FC } from "react";
import DemoProps from "../types/Demo";

const Filters: FC<DemoProps> = ({ globalProps, ...props }) => {
  const { mesh: Mesh } = globalProps;
  const { brightness, contrast, blur, hue, saturate } = useControls(props);
  const filters = `brightness(${brightness}%) contrast(${contrast}%) blur(${blur}px) hue-rotate(${hue}deg) saturate(${saturate}%)`;
  return (
    <>
      <Mesh position={[-1.5, 0, 0]}>
        <TextureSet name="texture/cube-filters">
          <Layer src="girl.png" image="fit-max center" filter={filters} />
        </TextureSet>
      </Mesh>
      <Mesh>
        <TextureSet name="texture/cube-filters">
          <Layer src="desk.png" image="fit-max center" filter={filters} />
        </TextureSet>
      </Mesh>
      <Mesh position={[1.5, 0, 0]}>
        <TextureSet name="texture/cube-filters">
          <Layer src="city.png" image="fit-max center" filter={filters} />
        </TextureSet>
      </Mesh>
    </>
  );
};

export default Filters;
