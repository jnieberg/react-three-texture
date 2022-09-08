import { BoxGeometryProps, MeshProps } from "@react-three/fiber";
import { ReactNode } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      roundedBoxGeometry: BoxGeometryProps;
    }
  }
}

export default interface PrettyMeshProps extends MeshProps {
  children: ReactNode;
  [key: string]: any;
}
