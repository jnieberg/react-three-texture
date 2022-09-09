import { LayerProps } from "./types";

export const DEFAULT = {
  dimensions: 512,
  src: "",
  image: "fit-max center middle",
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
  filter: "",
  blend: "source-over",
  alpha: { level: 1, power: 1, offset: 0, reverse: false },
  bloom: { size: 30, strength: 0.9, softness: 0.7, detail: 10 },
} as const;

export let textureGlobals = {
  dimensions: DEFAULT.dimensions,
  src: undefined,
  image: undefined,
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
};

export const textureDefaults = (props: LayerProps) => {
  Object.assign(textureGlobals, props);
};
