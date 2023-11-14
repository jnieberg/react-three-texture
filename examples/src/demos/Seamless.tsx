import { useControls } from "leva";
import { FC } from "react";
import { RepeatWrapping } from "three";
import { Layer, TextureSet } from "react-three-texture";
import DemoProps from "../types/Demo";

const Seamless: FC<DemoProps> = ({ globalProps, ...props }) => {
  const { mesh: Mesh } = globalProps;
  const { url, offsetX, sizeX, offsetY, sizeY, "offset both": both, alphaOffset, alphaReverse, flipX, flipY } = useControls(props);
  return Mesh ? (
    <>
      <Mesh>
        <TextureSet repeat={[3, 3]} wrapS={RepeatWrapping} wrapT={RepeatWrapping}>
          <Layer src={url} fit seamless={{ offset: [offsetX, offsetY], size: [sizeX, sizeY], alphaOffset, alphaReverse, both, flipX, flipY }} />
        </TextureSet>
      </Mesh>
    </>
  ) : null;
};

export default Seamless;
