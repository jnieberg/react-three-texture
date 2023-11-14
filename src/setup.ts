import { LayerProps } from "./types";

export const DEFAULT = {
  dimensions: 1024,
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

export const textureDefaults = (props: LayerProps) => {
  Object.assign(textureGlobals, props);
};
