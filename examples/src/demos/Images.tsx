import { useControls } from "leva";
import { FC } from "react";
import { Layer, TextureSet } from "react-three-texture";
import DemoProps from "../types/Demo";

const Images: FC<DemoProps> = ({ globalProps, ...props }) => {
  const { mesh: Mesh } = globalProps;
  const { url, upload, "image fit": fit, "image horizontal alignment": alignX, "image vertical alignment": alignY } = useControls(props);

  return Mesh ? (
    <>
      <Mesh position={[-1.5, 0, 0]}>
        <TextureSet>
          <Layer src={upload} fit={`${fit} ${alignX} ${alignY}`} nearest />
        </TextureSet>
      </Mesh>
      <Mesh>
        <TextureSet>
          <Layer fill="#113355" />
          <Layer src="burger.svg" scale={[0.75, 0.75]} fit={`${fit} ${alignX} ${alignY}`} />
        </TextureSet>
        <TextureSet map="roughness">
          <Layer fill="white" />
          <Layer src="burger.svg" scale={[0.75, 0.75]} fit={`${fit} ${alignX} ${alignY}`} color="black" />
        </TextureSet>
      </Mesh>
      <Mesh position={[1.5, 0, 0]}>
        <TextureSet>
          <Layer src={url} fit={`${fit} ${alignX} ${alignY}`} />
        </TextureSet>
      </Mesh>
    </>
  ) : null;
};

export default Images;
