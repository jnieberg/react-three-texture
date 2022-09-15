import { ReactElement } from "react";
import { LayerProps } from ".";

export type TransformReturn = {
  position: [number, number];
  scale: [number, number];
  rotation: number;
};

export interface TextureSetProps {
  map?:
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
  children?: ReactElement<LayerProps> | ReactElement<LayerProps>[];
}
