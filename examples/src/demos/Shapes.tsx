import { useControls } from "leva";
import { FC } from "react";
import { Vec2 } from "three";
import { Layer, MapType, TextureSet } from "react-three-texture";
import DemoProps from "../types/Demo";

const ShapeTexture = ({ map, p1, p2, p3, p4 }: { map?: MapType; p1: Vec2; p2: Vec2; p3: Vec2; p4: Vec2 }) => {
  const props = { color: "black", outline: map ? false : { color: "#88ff00", size: 10, detail: 20 } };

  return (
    <TextureSet map={map}>
      <Layer fill={map ? "white" : "#448800"} />
      <Layer {...props} rect={[0.1, 0.1, 0.8, 0.8]} curve={[p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y]} shapeThickness={16} shapeRounded />
      <Layer {...props} circle={[0.7, 0.3, 0.1]} />
      <Layer {...props} circle={[0.3, 0.7, 0.1]} />
    </TextureSet>
  );
};

const TextTexture = ({
  map,
  value,
  scale,
  bold,
  italic,
  alignment,
}: {
  map?: MapType;
  value: string;
  scale: number;
  bold: boolean;
  italic: boolean;
  alignment: boolean;
}) => {
  const textProps = {
    value,
    width: 0.8,
    weight: bold ? "bold" : "",
    style: italic ? "italic" : "",
  };

  return (
    <TextureSet map={map}>
      <Layer fill={map ? "white" : "#884400"} color={map ? "black" : "#ff8800"} line={[0.1, 0.4, 0.2, 0.5, 0.8, 0.5, 0.9, 0.6]} shapeThickness={32} />
      <Layer
        color={map ? "black" : "yellow"}
        position={[alignment ? 0.1 : 0.9, 0.1]}
        scale={[scale * 0.15, scale * 0.15]}
        text={{
          ...textProps,
          font: "https://fonts.gstatic.com/s/chewy/v18/uK_94ruUb-k-wn52KjI9OPec.woff2",
          align: alignment ? "start" : "right",
          base: "top",
        }}
      />
      {!map ? (
        <Layer
          color="#220000"
          position={[alignment ? 0.9 : 0.1, 0.9]}
          scale={[scale * 0.08, scale * 0.08]}
          shapeThickness={2}
          text={{
            ...textProps,
            font: "moby.otf",
            align: alignment ? "right" : "left",
            base: "bottom",
          }}
        />
      ) : null}
    </TextureSet>
  );
};

const RectTexture = ({ map, radius }: { map?: MapType; radius: number }) => (
  <TextureSet map={map}>
    <Layer fill="#446688" color="#6688aa" rect={[0.1, 0.1, 0.8, 0.8, radius]} />
    <Layer color="#88aacc" rect={[0.2, 0.2, 0.6, 0.6, radius]} shapeThickness={32} />
    <Layer color="#aaccee" rect={[0.3, 0.3, 0.4, 0.4, radius]} />
  </TextureSet>
);

const Shapes: FC<DemoProps> = ({ globalProps, ...props }) => {
  const { positionA, positionB, positionC, positionD, value, scale, bold, italic, alignment, radius } = useControls(props);
  const { mesh: Mesh } = globalProps;

  return Mesh ? (
    <>
      <Mesh x={-1.5}>
        <ShapeTexture p1={positionA} p2={positionB} p3={positionC} p4={positionD} />
        <ShapeTexture p1={positionA} p2={positionB} p3={positionC} p4={positionD} map="alpha" />
      </Mesh>
      <Mesh position={[0, 0, 0]}>
        <TextTexture value={value} bold={bold} italic={italic} scale={scale} alignment={alignment} />
        <TextTexture value={value} bold={bold} italic={italic} scale={scale} alignment={alignment} map="bump" />
      </Mesh>
      <Mesh x={1.5}>
        <RectTexture radius={radius} map="roughness" />
        <RectTexture radius={radius} />
      </Mesh>
    </>
  ) : null;
};

export default Shapes;
