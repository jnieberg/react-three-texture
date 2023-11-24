import { FC, useEffect, useRef, useState } from "react";
import DemoProps from "../types/Demo";
import { useCanvas } from "../temp/components/hooks/useCanvas";
import Bricks from "../temp/components/presets/Bricks";
import { Layer } from "react-three-texture";
import { CanvasTexture, MeshStandardMaterial } from "three";

const Misc: FC<DemoProps> = () => {
  const [texture, setTexture] = useState<CanvasTexture>();
  const ref = useRef<MeshStandardMaterial>(null);
  const canvas = useCanvas(
    <>
      <Layer fill="#000000" />
      <Bricks color="#888888" width={0.2} height={0.1} thickness={0.02} radius={0.04} offsetX={0.1} randomize={[1, 1]} layer={{ blend: "lighter" }} />
      <Bricks color="#444444" width={0.1} height={0.05} thickness={0.01} offsetX={0.02} randomize={[1, 1]} layer={{ blend: "lighter" }} />
      <Bricks color="#222222" width={0.05} height={0.025} thickness={0.005} offsetX={0.01} randomize={[1, 1]} layer={{ blend: "lighter" }} />
    </>,
    512
  );

  useEffect(() => {
    if (canvas) {
      canvas.style.zIndex = "999";
      canvas.style.position = "relative";
      canvas.style.top = "70px";
      canvas.style.left = "70px";
      document.body.append(canvas);
      setTexture(new CanvasTexture(canvas));
      if (ref.current) ref.current.needsUpdate = true;
    }
    return () => {
      canvas?.remove();
    };
  }, [canvas]);

  return (
    <mesh scale={[1.5, 1, 1.5]}>
      <roundedBoxGeometry attach="geometry" args={[1, 1, 1, 8, 0.25]} />
      <meshStandardMaterial ref={ref} attach="material" roughness={1} metalness={0} map={texture} />
    </mesh>
  );
};

export default Misc;
