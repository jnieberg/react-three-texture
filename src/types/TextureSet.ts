import { TextureProps } from "@react-three/fiber";
import { ReactNode } from "react";

export type TransformReturn = {
  position: [number, number];
  scale: [number, number];
  rotation: number;
};

export type MapType =
  | "env"
  | "specular"
  | "displacement"
  | "normal"
  | "bump"
  | "roughness"
  | "metalness"
  | "alpha"
  | "light"
  | "emissive"
  | "clearcoat"
  | "clearcoatNormal"
  | "clearcoatRoughness"
  | "sheenRoughness"
  | "sheenColor"
  | "specularIntensity"
  | "specularColor"
  | "thickness"
  | "transmission"
  | "ao";

export interface TextureSetProps extends TextureProps {
  map?: MapType;
  children?: ReactNode;
}
