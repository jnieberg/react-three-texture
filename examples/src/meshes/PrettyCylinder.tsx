import { DoubleSide } from "three";
import PrettyMeshProps from "../types/PrettyMesh";

const PrettyCylinder = ({ children, ...props }: PrettyMeshProps) => {
  return (
    <mesh castShadow {...props} rotation={[0, Math.PI, 0]} position={[props.x || 0, 0, 0]}>
      <cylinderGeometry attach="geometry" args={[0.5, 0.5, 1, 24, 24]} />
      <meshStandardMaterial attach="material" emissiveIntensity={0.2} roughness={0.8} metalness={0.9} bumpScale={3} transparent side={DoubleSide}>
        {children}
      </meshStandardMaterial>
    </mesh>
  );
};

export default PrettyCylinder;
