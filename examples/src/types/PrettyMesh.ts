import type { ThreeElements } from "@react-three/fiber";
import { ReactNode } from "react";

// Access JSX element prop types directly:
type MeshProps = ThreeElements["mesh"];

export interface PrettyMeshProps extends MeshProps, Record<string, any> {
  children?: ReactNode;
}
