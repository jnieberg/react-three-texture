export type GradientLinearProps = {
  type?: "linear";
  from?: [number, number];
  to?: [number, number];
  stops?: [number, string][];
};

export type GradientRadialProps = {
  type?: "radial";
  from?: [number, number, number];
  to?: [number, number, number];
  stops?: [number, string][];
};

export type ImageProps = {
  src?: string;
  image?: string; //"fit-max" | "fit-min" | "fit-x" | "fit-y" | "fit-fill" | "fit-none" | "center" | "left" | "right" | "middle" | "top" | "bottom";
};

export type TransformationProps = {
  position?: [number, number];
  scale?: [number, number];
  rotation?: number;
};

export type ColorProps = {
  color?: string;
  fill?: string;
};

export type ShadowProps = {
  color?: string;
  blur?: number;
  offset?: [number, number];
};

export type OutlineProps = {
  color?: string;
  size?: number;
  detail?: number;
};

export type AlphaProps = {
  level?: number;
  power?: number;
  offset?: number;
  reverse?: boolean;
};

export type BloomProps = {
  size?: number;
  strength?: number;
  softness?: number;
  detail?: number;
  darken?: boolean;
};

export interface LayerProps extends ImageProps, TransformationProps, ColorProps {
  dimensions?: number;
  gradient?: GradientLinearProps | GradientRadialProps | boolean;
  nearest?: boolean;
  repeat?: boolean;
  shadow?: ShadowProps | boolean;
  outline?: OutlineProps | boolean;
  filter?: string;
  blend?: GlobalCompositeOperation;
  alpha?: AlphaProps | boolean;
  bloom?: BloomProps | boolean;
}
