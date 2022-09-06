type GradientLinear = {
  type?: "linear";
  from?: [number, number];
  to?: [number, number];
  stops?: [number, string][];
};

type GradientRadial = {
  type?: "radial" | "circular";
  from?: [number, number, number];
  to?: [number, number, number];
  stops?: [number, string][];
};

type Image = {
  src?: string;
  image?: string; //"fit-max" | "fit-min" | "fit-x" | "fit-y" | "fit-fill" | "fit-none" | "center" | "left" | "right" | "middle" | "top" | "bottom";
};

type Transformation = {
  position?: [number, number];
  scale?: [number, number];
  rotation?: number;
};

type Color = {
  color?: string;
  fill?: string;
};

type Shadow = {
  color?: string;
  blur?: number;
  offset?: [number, number];
};

type Outline = {
  color?: string;
  size?: number;
  detail?: number;
};

type Alpha = {
  level?: number;
  power?: number;
  offset?: number;
  reverse?: boolean;
};

type Bloom = {
  size?: number;
  strength?: number;
  softness?: number;
  detail?: number;
};

export interface LayerProps extends Image, Transformation, Color {
  gradient?: GradientLinear | GradientRadial;
  nearest?: boolean;
  shadow?: Shadow;
  outline?: Outline;
  filter?: string;
  blend?: GlobalCompositeOperation;
  alpha?: Alpha;
  bloom?: Bloom;
}
