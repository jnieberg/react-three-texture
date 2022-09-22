import { useControls } from "leva";
import { FC } from "react";
import { Layer, LayerProps, TextureSet } from "react-three-texture";
import DemoProps from "../types/Demo";

const Transformation: FC<DemoProps> = ({ globalProps, ...props }) => {
  const { mesh: Mesh } = globalProps;
  const { position, scale, rotation } = useControls(props);
  const centerX = 0.15 - scale.x * 0.15;
  const centerY = 0.15 - scale.y * 0.15;
  const greenBoxProps: LayerProps = { position: [position.x, position.y], rotation, image: "center middle" };
  const rubicProps: LayerProps = { scale: [scale.x * 0.3, scale.y * 0.3], rotation, blend: "lighten" };

  return Mesh ? (
    <>
      <Mesh position={[-1.5, 0, 0]}>
        <TextureSet>
          <Layer src="city.png" scale={[scale.x, scale.y]} position={[position.x, position.y]} rotation={rotation} repeat />
        </TextureSet>
      </Mesh>
      <Mesh>
        <TextureSet>
          <Layer fill="#446644" scale={[scale.x * 0.75, scale.y * 0.75]} {...greenBoxProps} />
          <Layer fill="#004400" scale={[scale.x * 0.5, scale.y * 0.5]} {...greenBoxProps} />
        </TextureSet>
        <TextureSet map="bump">
          <Layer fill="#000000" />
          <Layer fill="#ffffff" scale={[scale.x * 0.75, scale.y * 0.75]} {...greenBoxProps} />
          <Layer fill="#000000" scale={[scale.x * 0.5, scale.y * 0.5]} {...greenBoxProps} />
        </TextureSet>
      </Mesh>
      <Mesh position={[1.5, 0, 0]}>
        <TextureSet>
          <Layer fill="black" />
          <Layer fill="red" position={[centerX + position.x * 0.325 + 0.025, centerY + 0.025 + position.y * 0.325]} {...rubicProps} />
          <Layer fill="yellow" position={[centerX + 0.35 + position.x * 0.325 - position.y * 0.325, centerY + 0.025]} {...rubicProps} />
          <Layer fill="blue" position={[centerX + 0.675 - position.y * 0.325, centerY + 0.025 + position.x * 0.325]} {...rubicProps} />
          <Layer fill="green" position={[centerX + 0.025, centerY + 0.35 - position.x * 0.325 + position.y * 0.325]} {...rubicProps} />
          <Layer fill="orange" position={[centerX + 0.35, centerY + 0.35]} {...rubicProps} />
          <Layer fill="white" position={[centerX + 0.675, centerY + 0.35 + position.x * 0.325 - position.y * 0.325]} {...rubicProps} />
          <Layer fill="orange" position={[centerX + 0.025 + position.y * 0.325, centerY + 0.675 - position.x * 0.325]} {...rubicProps} />
          <Layer fill="blue" position={[centerX + 0.35 - position.x * 0.325 + position.y * 0.325, centerY + 0.675]} {...rubicProps} />
          <Layer fill="red" position={[centerX + 0.675 - position.x * 0.325, centerY + 0.675 - position.y * 0.325]} {...rubicProps} />
        </TextureSet>
      </Mesh>
    </>
  ) : null;
};

export default Transformation;
