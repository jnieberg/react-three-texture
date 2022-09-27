import { ReactNode } from "react";
import { CanvasTexture, Texture } from "three";

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

export interface TextureSetProps extends Record<string, any> {
  map?: MapType;
  dimensions?: number;
  children?: ReactNode;
}

export type TextureResult = CanvasTexture | Texture | null;
