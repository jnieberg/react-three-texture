import { extend } from "@react-three/fiber";
import { DoubleSide } from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import PrettyMeshProps from "../types/PrettyMesh";

extend({ RoundedBoxGeometry });

const PrettyBox = ({ children, ...props }: PrettyMeshProps) => (
  <mesh castShadow receiveShadow {...props}>
    <roundedBoxGeometry attach="geometry" args={[1, 1, 1, 3, 0.05]} />
    <meshStandardMaterial attach="material" emissiveIntensity={0.2} roughness={0.8} metalness={0.9} bumpScale={0.05} transparent side={DoubleSide}>
      {children}
    </meshStandardMaterial>
  </mesh>
);

export default PrettyBox;
