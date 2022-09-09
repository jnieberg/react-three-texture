import { ReactElement } from "react";
import { LayerProps } from ".";

export interface TextureSetProps {
  name?: string;
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
  children: ReactElement<LayerProps> | ReactElement<LayerProps>[];
}
