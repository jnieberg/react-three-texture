import { BoxGeometryProps, MeshProps } from "@react-three/fiber";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      roundedBoxGeometry: BoxGeometryProps;
    }
  }
}

export default interface PrettyMeshProps extends MeshProps {}
