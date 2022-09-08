import { useControls } from "leva";
import { FC } from "react";
import { Layer, TextureSet } from "react-three-texture";
import DemoProps from "../types/Demo";

const Transformation: FC<DemoProps> = ({ globalProps, ...props }) => {
  const { mesh: Mesh } = globalProps;
  const { position, scale, rotation } = useControls(props);
  const centerX = 0.15 - scale.x * 0.15;
  const centerY = 0.15 - scale.y * 0.15;

  return Mesh ? (
    <>
      <Mesh position={[-1.5, 0, 0]}>
        <TextureSet name="texture/cube-transform-1">
          <Layer src="girl.png" scale={[scale.x * 2, scale.y * 3]} position={[position.x - 0.5, position.y * 1.5 - 0.5]} rotation={rotation} />
        </TextureSet>
      </Mesh>
      <Mesh>
        <TextureSet name="texture/cube-transform-2">
          <Layer fill="#446644" position={[position.x + 0.125, position.y + 0.125]} scale={[scale.x * 0.75, scale.y * 0.75]} rotation={rotation} />
          <Layer fill="#004400" position={[position.x + 0.25, position.y + 0.25]} scale={[scale.x * 0.5, scale.y * 0.5]} rotation={rotation} />
        </TextureSet>
        <TextureSet name="texture/cube-transform-2" map="bump">
          <Layer fill="#000000" />
          <Layer fill="#ffffff" position={[position.x + 0.125, position.y + 0.125]} scale={[scale.x * 0.75, scale.y * 0.75]} rotation={rotation} />
          <Layer fill="#000000" position={[position.x + 0.25, position.y + 0.25]} scale={[scale.x * 0.5, scale.y * 0.5]} rotation={rotation} />
        </TextureSet>
      </Mesh>
      <Mesh position={[1.5, 0, 0]}>
        <TextureSet name="texture/cube-transform-3">
          <Layer fill="black" />
          <Layer
            fill="red"
            position={[centerX + position.x * 0.325 + 0.025, centerY + 0.025 + position.y * 0.325]}
            scale={[scale.x * 0.3, scale.y * 0.3]}
            rotation={rotation}
          />
          <Layer
            fill="yellow"
            position={[centerX + 0.35 + position.x * 0.325 - position.y * 0.325, centerY + 0.025]}
            scale={[scale.x * 0.3, scale.y * 0.3]}
            rotation={rotation}
          />
          <Layer
            fill="blue"
            position={[centerX + 0.675 - position.y * 0.325, centerY + 0.025 + position.x * 0.325]}
            scale={[scale.x * 0.3, scale.y * 0.3]}
            rotation={rotation}
          />
          <Layer
            fill="green"
            position={[centerX + 0.025, centerY + 0.35 - position.x * 0.325 + position.y * 0.325]}
            scale={[scale.x * 0.3, scale.y * 0.3]}
            rotation={rotation}
          />
          <Layer fill="orange" scale={[scale.x * 0.3, scale.y * 0.3]} position={[centerX + 0.35, centerY + 0.35]} rotation={rotation} />
          <Layer
            fill="white"
            position={[centerX + 0.675, centerY + 0.35 + position.x * 0.325 - position.y * 0.325]}
            scale={[scale.x * 0.3, scale.y * 0.3]}
            rotation={rotation}
          />
          <Layer
            fill="orange"
            position={[centerX + 0.025 + position.y * 0.325, centerY + 0.675 - position.x * 0.325]}
            scale={[scale.x * 0.3, scale.y * 0.3]}
            rotation={rotation}
          />
          <Layer
            fill="blue"
            position={[centerX + 0.35 - position.x * 0.325 + position.y * 0.325, centerY + 0.675]}
            scale={[scale.x * 0.3, scale.y * 0.3]}
            rotation={rotation}
          />
          <Layer
            fill="red"
            position={[centerX + 0.675 - position.x * 0.325, centerY + 0.675 - position.y * 0.325]}
            scale={[scale.x * 0.3, scale.y * 0.3]}
            rotation={rotation}
          />
        </TextureSet>
      </Mesh>
    </>
  ) : null;
};

export default Transformation;
