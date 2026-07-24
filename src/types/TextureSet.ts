import { ReactNode } from "react";
import { CanvasTexture, Texture } from "three";

/**
 * This type defines the return value of a transformation operation, which includes the position, scale, and rotation of an object. The `position` property is a tuple representing the x and y coordinates of the object's position, the `scale` property is a tuple representing the scaling factors along the x and y axes, and the `rotation` property is a number representing the rotation angle in radians. This type can be used to describe the transformation state of an object in a 2D or 3D space.
 */
export type TransformReturn = {
  position: [number, number];
  scale: [number, number];
  rotation: number;
};

/**
 * This type defines the possible map types that can be used in a texture set, representing different types of texture maps commonly used in 3D rendering. Each map type corresponds to a specific aspect of the material's appearance, such as environment mapping, specular highlights, displacement mapping, normal mapping, bump mapping, roughness, metalness, alpha transparency, light emission, emissive properties, clearcoat effects, sheen properties, specular intensity and color, thickness, transmission, and ambient occlusion (AO). These map types allow for fine-tuning the visual characteristics of materials in a 3D scene.
 */
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

/**
 * This interface defines the properties for a texture set component, which can be used to create and manage textures in a 3D rendering context. The `map` property specifies the type of texture map to be used, the `dimensions` property defines the size of the texture, and the `children` property allows for nesting React nodes that will be rendered onto the texture. Additionally, this interface extends a record of string keys to any values, allowing for flexibility in passing additional properties to the texture set component.
 */
export interface TextureSetProps extends Record<string, any> {
  map?: MapType;
  dimensions?: number;
  children?: ReactNode;
}

/**
 * This type defines the result of a texture generation operation, which can be either a `CanvasTexture`, a `Texture`, or `null`. A `CanvasTexture` is a texture created from an HTML canvas element, while a `Texture` is a more general representation of a texture in Three.js. The `null` value indicates that no texture was generated or available. This type can be used to represent the outcome of rendering operations that produce textures for use in 3D scenes.
 */
export type TextureResult = CanvasTexture | Texture | null;
