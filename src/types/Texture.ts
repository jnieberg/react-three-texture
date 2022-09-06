import { PrimitiveProps } from "@react-three/fiber";
import { CanvasTexture } from "three";

export type TextureT = {
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
  nearest?: boolean;
  once?: boolean | "x" | "y";
};

export interface TexProps extends PrimitiveProps, TextureT {
  object: CanvasTexture | null;
}
