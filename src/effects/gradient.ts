import { DEFAULT } from "../setup";
import { GradientLinearProps, GradientRadialProps, LayerProps } from "../types";

export const effectGradient = (ctx: CanvasRenderingContext2D, props: LayerProps) => {
  if (props.gradient) {
    const gradientProp = props.gradient as GradientLinearProps | GradientRadialProps;
    const { type, from, to, stops } = { ...DEFAULT.gradient[gradientProp.type || DEFAULT.gradient.type], ...gradientProp };
    const dims = props.dimensions || DEFAULT.dimensions;
    let args: number[] = [...from, ...to];
    args = args.map((a, i) => args[i] * dims);

    const canvasGradient =
      type === "radial"
        ? ctx.createRadialGradient(args[0], args[1], args[2], args[3], args[4], args[5]) // weird TS thing
        : ctx.createLinearGradient(args[0], args[1], args[2], args[3]);
    stops.forEach((stop) => canvasGradient.addColorStop(stop[0], stop[1]));
    ctx.fillStyle = canvasGradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
};
