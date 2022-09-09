import { quality } from "../constants";
import { GradientLinearProps, GradientRadialProps, LayerProps } from "../types";

export const gradient = (ctx: CanvasRenderingContext2D, props: LayerProps) => {
  if (props.gradient) {
    const gradient = props.gradient as GradientLinearProps | GradientRadialProps;
    const isRadial = gradient.type === "radial" || gradient.type === "circular";
    let args: number[] = [...(gradient?.from || (isRadial ? [0.5, 0.5, 0] : [0, 0])), ...(gradient?.to || (isRadial ? [0.5, 0.5, 1] : [0, 1]))];
    args = args.map((a, i) => args[i] * quality);

    const canvasGradient = isRadial
      ? ctx.createRadialGradient(args[0], args[1], args[2], args[3], args[4], args[5]) // weird TS thing
      : ctx.createLinearGradient(args[0], args[1], args[2], args[3]);
    (
      gradient.stops || [
        [0, "white"],
        [1, "black"],
      ]
    ).forEach((stop) => {
      canvasGradient.addColorStop(...stop);
    });
    ctx.fillStyle = canvasGradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
};
