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
  fit?: string | boolean;
};

export type TransformationProps = {
  position?: [number, number];
  scale?: [number, number];
  rotation?: number;
};

export type ColorProps = {
  color?: string | boolean;
  fill?: string | boolean;
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

export type ShapeProps = {
  shapeThickness?: number;
  shapeRounded?: boolean;
  line?: [number, number, number, number, ...number[]];
  circle?: [number, number, number, number?, number?, number?, number?, boolean?];
  rect?: [number, number, number, number?, number?];
  curve?: [number, number, number, number, number, number, number?, number?];
  text?: TextProps;
};

export type SeamlessProps = {
  offset?: [number, number];
  size?: [number, number];
  both?: boolean;
  flipX?: boolean;
  flipY?: boolean;
  alphaOffset?: number;
  alphaReverse?: boolean;
};

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
}
