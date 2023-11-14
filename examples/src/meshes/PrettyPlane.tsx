import { DoubleSide } from "three";
import PrettyMeshProps from "../types/PrettyMesh";

const PrettyPlane = ({ children, ...props }: PrettyMeshProps) => (
  <mesh castShadow receiveShadow {...props} position={[props.x || 0, -0.5, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
    <planeGeometry attach="geometry" args={[1.5, 1.5, 1, 1]} />
    <meshStandardMaterial attach="material" emissiveIntensity={0.2} roughness={0.8} metalness={0.9} bumpScale={3} transparent side={DoubleSide}>
      {children}
    </meshStandardMaterial>
  </mesh>
);

export default PrettyPlane;
