import { extend } from "@react-three/fiber";
import { DoubleSide } from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import PrettyMeshProps from "../types/PrettyMesh";

extend({ RoundedBoxGeometry });

const PrettySphere = ({ children, ...props }: PrettyMeshProps) => {
  return (
    <mesh castShadow {...props}>
      <roundedBoxGeometry attach="geometry" args={[1, 1, 1, 4, 0.5]} />
      <meshStandardMaterial attach="material" emissiveIntensity={0.2} roughness={0.8} metalness={0.9} bumpScale={0.1} transparent side={DoubleSide}>
        {children}
      </meshStandardMaterial>
    </mesh>
  );
};

export default PrettySphere;
