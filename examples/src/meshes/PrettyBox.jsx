import { extend } from "@react-three/fiber";
import { DoubleSide } from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

extend({ RoundedBoxGeometry });

const PrettyBox = ({ children, ...props }) => (
  <mesh castShadow {...props}>
    <roundedBoxGeometry attach="geometry" args={[1, 1, 1, 3, 0.05]} />
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
