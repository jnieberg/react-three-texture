/**
 * This type defines the properties for a linear gradient, which can be used to create a smooth color transition effect. The `type` property specifies that this is a linear gradient, while the `from` and `to` properties define the starting and ending colors of the gradient. The `stops` property allows for specifying multiple color stops along the gradient, each defined by a position (between 0 and 1) and a color value.
 */
export type GradientLinearProps = {
  type?: "linear";
  from?: [number, number];
  to?: [number, number];
  stops?: [number, string][];
};

/**
 * This type defines the properties for a radial gradient, which can be used to create a circular color transition effect. The `type` property specifies that this is a radial gradient, while the `from` and `to` properties define the starting and ending colors of the gradient. The `stops` property allows for specifying multiple color stops along the gradient, each defined by a position (between 0 and 1) and a color value.
 */
export type GradientRadialProps = {
  type?: "radial";
  from?: [number, number, number];
  to?: [number, number, number];
  stops?: [number, string][];
};

/**
 * This type defines the properties for an image layer, which can be used to include an image in a texture set. The `src` property specifies the source URL of the image, while the `fit` property determines how the image should be scaled or fitted within its container. The `fit` property can accept a string value (e.g., "cover", "contain") or a boolean value to indicate whether the image should be stretched to fill the container.
 */
export type ImageProps = {
  src?: string;
  fit?: string | boolean;
};

/**
 * This type defines the properties for transformations that can be applied to a layer, including position, scale, and rotation. The `position` property specifies the x and y coordinates for the layer's position, the `scale` property defines the scaling factors along the x and y axes, and the `rotation` property indicates the rotation angle in radians.
 */
export type TransformationProps = {
  position?: [number, number];
  scale?: [number, number];
  rotation?: number;
};

/**
 * This type defines the properties for a layer in a texture set, which can include various visual effects and transformations. The `LayerProps` interface extends several other property types, including `ImageProps`, `TransformationProps`, `ColorProps`, and `ShapeProps`. It also includes additional properties for dimensions, gradients, blending modes, alpha settings, bloom effects, seamless tiling, and noise generation. Each property allows for fine-tuning the appearance and behavior of the layer within the texture set.
 */
export type ColorProps = {
  color?: string | boolean;
  fill?: string | boolean;
};

/**
 * This type defines the properties for a shadow effect that can be applied to a layer. The `color` property specifies the color of the shadow, the `blur` property determines the amount of blur applied to the shadow, and the `offset` property defines the x and y offsets for the shadow's position relative to the layer.
 */
export type ShadowProps = {
  color?: string;
  blur?: number;
  offset?: [number, number];
};

/**
 * This type defines the properties for an outline effect that can be applied to a layer. The `color` property specifies the color of the outline, the `size` property determines the thickness of the outline, and the `detail` property allows for specifying the level of detail or smoothness of the outline's edges.
 */
export type OutlineProps = {
  color?: string;
  size?: number;
  detail?: number;
};

/**
 * This type defines the properties for an alpha effect that can be applied to a layer, allowing for control over the transparency and blending of the layer. The `level` property specifies the overall opacity level, the `power` property determines the intensity of the alpha effect, the `offset` property allows for adjusting the starting point of the alpha effect, and the `reverse` property indicates whether the alpha effect should be inverted.
 */
export type AlphaProps = {
  level?: number;
  power?: number;
  offset?: number;
  reverse?: boolean;
};

/**
 * This type defines the properties for a bloom effect that can be applied to a layer, creating a glowing or halo-like effect around bright areas. The `size` property specifies the size of the bloom effect, the `strength` property determines the intensity of the bloom, the `softness` property controls the softness or spread of the bloom, the `detail` property allows for specifying the level of detail in the bloom effect, and the `darken` property indicates whether the bloom effect should darken surrounding areas.
 */
export type BloomProps = {
  size?: number;
  strength?: number;
  softness?: number;
  detail?: number;
  darken?: boolean;
};

/**
 * This type defines the properties for text rendering within a layer, allowing for customization of the text's appearance and positioning. The `value` property specifies the text content, while the `font`, `style`, and `weight` properties allow for selecting the font family, style (e.g., italic), and weight (e.g., bold) of the text. The `width` and `height` properties define the dimensions of the text area, and the `align` and `base` properties control the horizontal alignment and vertical baseline of the text, respectively.
 */
export type TextProps = {
  value: string;
  font?: string;
  style?: string;
  weight?: string | number;
  width?: number;
  height?: number;
  align?: CanvasTextAlign;
  base?: CanvasTextBaseline;
};

/**
 * This type defines the properties for a layer in a texture set, which can include various visual effects and transformations. The `LayerProps` interface extends several other property types, including `ImageProps`, `TransformationProps`, `ColorProps`, and `ShapeProps`. It also includes additional properties for dimensions, gradients, blending modes, alpha settings, bloom effects, seamless tiling, and noise generation. Each property allows for fine-tuning the appearance and behavior of the layer within the texture set.
 */
export type ShapeProps = {
  shapeThickness?: number;
  shapeRounded?: boolean;
  line?: [number, number, number, number, ...number[]];
  circle?: [number, number, number, number?, number?, number?, number?, boolean?];
  rect?: [number, number, number, number?, number?];
  poly?: [...number[], number];
  curve?: [number, number, number, number, number, number, number?, number?];
  text?: TextProps;
};

/**
 * This type defines the properties for a seamless effect that can be applied to a layer, allowing for the creation of textures that can be tiled without visible seams. The `offset` property specifies the x and y offsets for the seamless effect, the `size` property defines the dimensions of the seamless area, the `both` property indicates whether the seamless effect should be applied in both directions, and the `flipX` and `flipY` properties control whether the texture should be flipped horizontally or vertically. The `alphaOffset` property allows for adjusting the transparency of the seamless effect, and the `alphaReverse` property indicates whether the alpha effect should be inverted.
 */
export type SeamlessProps = {
  offset?: [number, number];
  size?: [number, number];
  both?: boolean;
  flipX?: boolean;
  flipY?: boolean;
  alphaOffset?: number;
  alphaReverse?: boolean;
};

/**
 * This type defines the properties for a noise effect that can be applied to a layer, allowing for the generation of random or Perlin noise patterns. The `type` property specifies the type of noise to be generated (either "random" or "perlin"), while the `from` and `to` properties define the range of values for the noise. The `steps` property allows for specifying the number of discrete steps in the noise pattern, the `seed` property provides a seed value for random number generation, the `detail` property controls the level of detail in the noise, and the `offset` property allows for adjusting the starting point of the noise effect.
 */
export type NoiseRandomProps = {
  type: "random" | "perlin";
  from?: string;
  to?: string;
  steps?: number;
  seed?: string | number;
  detail?: number;
  offset?: number;
};

/**
 * This type defines the properties for a bricks pattern that can be applied to a layer, allowing for the creation of a brick-like texture. The `color` property specifies the color of the bricks, while the `width` and `height` properties define the dimensions of each brick. The `thickness` property determines the thickness of the mortar between bricks, and the `offsetX` property allows for adjusting the horizontal offset of the brick pattern. The `seed` property provides a seed value for random number generation, and the `randomize` property allows for introducing randomness in the brick placement. The `radius` property controls the corner radius of the bricks, and the `layer` property allows for specifying additional layer properties.
 */
export type BricksProps = {
  color?: string | string[];
  width?: number;
  height?: number;
  thickness?: number;
  offsetX?: number;
  seed?: number;
  randomize?: [number, number?, number?];
  radius?: number;
  layer?: LayerProps;
};

/**
 * This interface defines the properties for a layer in a texture set, which can include various visual effects and transformations.
 * The `LayerProps` interface extends several other property types, including `ImageProps`, `TransformationProps`, `ColorProps`, and `ShapeProps`. It also includes additional properties for dimensions, gradients, blending modes, alpha settings, bloom effects, seamless tiling, and noise generation. Each property allows for fine-tuning the appearance and behavior of the layer within the texture set.
 * @property dimensions - The dimensions of the layer (width and height).
 * @property gradient - The gradient effect to be applied to the layer, which can be linear or radial.
 * @property nearest - A boolean indicating whether to use nearest-neighbor interpolation for the layer.
 * @property repeat - A boolean indicating whether the layer should be repeated (tiled).
 * @property shadow - The shadow effect to be applied to the layer, which can be a `ShadowProps` object or a boolean.
 * @property outline - The outline effect to be applied to the layer, which can be an `OutlineProps` object or a boolean.
 * @property filter - A string specifying a CSS filter to be applied to the layer.
 * @property flipX - A boolean indicating whether the layer should be flipped horizontally.
 * @property flipY - A boolean indicating whether the layer should be flipped vertically.
 * @property blend - The blending mode to be used for the layer, specified as a `GlobalCompositeOperation` value.
 * @property alpha - The alpha effect to be applied to the layer, which can be an `AlphaProps` object, a number, or a boolean.
 * @property bloom - The bloom effect to be applied to the layer, which can be a `BloomProps` object or a boolean.
 * @property seamless - The seamless effect to be applied to the layer, which can be a `SeamlessProps` object or a boolean.
 * @property noise - The noise effect to be applied to the layer, specified as a `NoiseRandomProps` object.
 */
export interface LayerProps extends ImageProps, TransformationProps, ColorProps, ShapeProps {
  dimensions?: number;
  gradient?: GradientLinearProps | GradientRadialProps | boolean;
  nearest?: boolean;
  repeat?: boolean;
  shadow?: ShadowProps | boolean;
  outline?: OutlineProps | boolean;
  filter?: string;
  flipX?: boolean;
  flipY?: boolean;
  blend?: GlobalCompositeOperation;
  alpha?: AlphaProps | number | boolean;
  bloom?: BloomProps | boolean;
  seamless?: SeamlessProps | boolean;
  noise?: NoiseRandomProps;
}
