/// <reference types="vite/client" />

import { Object3DNode } from "@react-three/fiber";
import { RoundedBoxGeometry } from "three-stdlib";

declare module "@react-three/fiber" {
  interface ThreeElements {
    roundedBoxGeometry: Object3DNode<RoundedBoxGeometry, typeof RoundedBoxGeometry>;
  }
}
