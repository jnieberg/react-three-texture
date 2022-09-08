import { useControls } from "leva";
import { Layer, TextureSet } from "react-three-texture";

const Images = ({ globalProps, ...props }) => {
  const { mesh: Mesh } = globalProps;
  const { url, upload, "image fit": fit, "image horizontal alignment": alignX, "image vertical alignment": alignY } = useControls(props);

  return (
    <>
      <Mesh position={[-1.5, 0, 0]}>
        <TextureSet name="texture/cube-image-1">
          <Layer src={upload} image={`${fit} ${alignX} ${alignY}`} />
        </TextureSet>
      </Mesh>
      <Mesh>
        <TextureSet name="texture/cube-image-2">
          <Layer fill="#113355" />
          <Layer src="burger.svg" scale={[0.75, 0.75]} image={`${fit} ${alignX} ${alignY}`} />
        </TextureSet>
        <TextureSet name="texture/cube-image-2" map="roughness">
          <Layer fill="white" />
          <Layer src="burger.svg" scale={[0.75, 0.75]} image={`${fit} ${alignX} ${alignY}`} color="black" />
        </TextureSet>
      </Mesh>
      <Mesh position={[1.5, 0, 0]}>
        <TextureSet name="texture/cube-image-3">
          <Layer src={url} image={`${fit} ${alignX} ${alignY}`} />
        </TextureSet>
      </Mesh>
    </>
  );
};

export default Images;
