import { BoxGeometryProps, extend, MeshProps } from "@react-three/fiber";
import { FC, ReactNode } from "react";
import { DoubleSide } from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

extend({ RoundedBoxGeometry });

const PrettyBox = ({ children, ...props }: { children: ReactNode; [key: string]: any }) => (
  <mesh castShadow {...props}>
    <roundedBoxGeometry attach="geometry" args={[1, 1, 1, 3, 0.05]} />
    {/* <boxBufferGeometry attach="geometry" args={[1, 1, 1, 1, 1]} /> */}
    <meshStandardMaterial
      attach="material"
      emissiveIntensity={0.2}
      roughness={0.8}
      metalness={0.9}
      bumpScale={0.1}
      transparent
      side={DoubleSide}
      {...props}
    >
      {children}
    </meshStandardMaterial>
  </mesh>
);

export default PrettyBox;
