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
        <TextureSet name="texture/image-1">
          <Layer src={upload} image={`${fit} ${alignX} ${alignY}`} />
        </TextureSet>
      </Mesh>
      <Mesh>
        <TextureSet name="texture/image-2">
          <Layer fill="#113355" />
          <Layer src="burger.svg" scale={[0.75, 0.75]} image={`${fit} ${alignX} ${alignY}`} />
        </TextureSet>
        <TextureSet name="texture/image-2" map="roughness">
          <Layer fill="white" />
          <Layer src="burger.svg" scale={[0.75, 0.75]} image={`${fit} ${alignX} ${alignY}`} color="black" />
        </TextureSet>
      </Mesh>
      <Mesh position={[1.5, 0, 0]}>
        <TextureSet name="texture/image-3">
          <Layer src={url} image={`${fit} ${alignX} ${alignY}`} />
        </TextureSet>
      </Mesh>
    </>
  ) : null;
};

export default Images;
