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
      <Mesh x={-1.5}>
        <TextureSet>
          <Layer src="girl.png" fit="size-max center" filter={filters} />
        </TextureSet>
      </Mesh>
      <Mesh>
        <TextureSet>
          <Layer src="desk.png" fit="size-max center" filter={filters} />
        </TextureSet>
      </Mesh>
      <Mesh x={1.5}>
        <TextureSet>
          <Layer src="city.png" fit="size-max center" filter={filters} />
        </TextureSet>
      </Mesh>
    </>
  ) : null;
};

export default Filters;
