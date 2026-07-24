import { LayerProps } from "./types";

/**
 * This constant defines the default properties for a texture set, providing baseline values for various visual effects and transformations. It includes default settings for dimensions, image source, position, scale, rotation, color, fill, gradient, nearest neighbor filtering, shadow, outline, filter, blending mode, alpha settings, bloom effects, shape thickness, text properties, and seamless tiling. These defaults serve as a starting point for creating textures and can be overridden by user-defined properties when generating texture sets.
 */
export const DEFAULT = {
  dimensions: 256,
  src: "",
  image: "size-max center middle",
  position: [0, 0],
  scale: [1, 1],
  rotation: 0,
  color: "white",
  fill: "black",
  gradient: {
    type: "linear",
    linear: {
      from: [0, 0],
      to: [0, 1],
      stops: [
        [0, "white"],
        [1, "black"],
      ],
    },
    radial: {
      from: [0.5, 0.5, 0],
      to: [0.5, 0.5, 1],
      stops: [
        [0, "white"],
        [1, "black"],
      ],
    },
  },
  nearest: false,
  shadow: { color: "black", blur: 20, offset: [0, 0] },
  outline: { color: "black", size: 1, detail: 8 },
  filter: "none",
  blend: "source-over",
  alpha: { level: 1, power: 1, offset: 0, reverse: false },
  bloom: { size: 30, strength: 0.4, softness: 0.7, detail: 10, darken: false },
  shapeThickness: 0,
  text: {
    font: "serif",
    style: "",
    weight: "",
    width: 0,
    height: 1.3,
    align: "center",
    base: "middle",
  },
  seamless: {
    offset: [0.3, 0.3],
    size: [0.2, 0.2],
    both: false,
    alphaOffset: 0,
    alphaReverse: false,
    flipX: false,
    flipY: false,
  },
} as const;

/**
 * This variable holds the global properties for a texture set, allowing for the configuration of various visual effects and transformations. It includes properties for dimensions, image source, position, scale, rotation, color, fill, gradient, nearest neighbor filtering, shadow, outline, filter, blending mode, alpha settings, bloom effects, seamless tiling, and noise generation. These global properties can be modified to customize the appearance and behavior of textures generated within the application.
 */
export let textureGlobals: LayerProps = {
  dimensions: undefined,
  src: undefined,
  fit: undefined,
  position: undefined,
  scale: undefined,
  rotation: undefined,
  color: undefined,
  fill: undefined,
  gradient: undefined,
  nearest: DEFAULT.nearest,
  shadow: undefined,
  outline: undefined,
  filter: undefined,
  blend: undefined,
  alpha: undefined,
  bloom: undefined,
  seamless: undefined,
};

/**
 * This function updates the global properties for a texture set with the provided properties, allowing for the customization of various visual effects and transformations. It merges the specified properties into the existing `textureGlobals` object, enabling users to modify settings such as dimensions, image source, position, scale, rotation, color, fill, gradient, nearest neighbor filtering, shadow, outline, filter, blending mode, alpha settings, bloom effects, seamless tiling, and noise generation. This function can be used to set default values for texture generation operations within the application.
 * @param props The properties to be merged into the global texture settings, allowing for customization of visual effects and transformations in texture generation.
 */
export const textureDefaults = (props: LayerProps) => {
  Object.assign(textureGlobals, props);
};
