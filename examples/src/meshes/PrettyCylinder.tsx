import { DoubleSide } from "three";
import PrettyMeshProps from "../types/PrettyMesh";

const PrettyCylinder = ({ children, ...props }: PrettyMeshProps) => {
  return (
    <mesh castShadow {...props}>
      <cylinderBufferGeometry attach="geometry" args={[0.5, 0.5, 1, 24, 1]} />
      <meshStandardMaterial attach="material" emissiveIntensity={0.2} roughness={0.8} metalness={0.9} bumpScale={0.1} transparent side={DoubleSide}>
        {children}
      </meshStandardMaterial>
    </mesh>
  );
};

export default PrettyCylinder;
