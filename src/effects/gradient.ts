import { quality } from "../constants";
import { LayerProps } from "../types";

export const gradient = (ctx: CanvasRenderingContext2D, props: LayerProps) => {
  if (props.gradient) {
    const isRadial = props.gradient.type === "radial" || props.gradient.type === "circular";
    let args: number[] = [
      ...(props.gradient?.from || (isRadial ? [0.5, 0.5, 0] : [0, 0])),
      ...(props.gradient?.to || (isRadial ? [0.5, 0.5, 1] : [0, 1])),
    ];
    args = args.map((a, i) => args[i] * quality);

    const gradient = isRadial
      ? ctx.createRadialGradient(args[0], args[1], args[2], args[3], args[4], args[5]) // weird TS thing
      : ctx.createLinearGradient(args[0], args[1], args[2], args[3]);
    (
      props.gradient.stops || [
        [0, "white"],
        [1, "black"],
      ]
    ).forEach((stop) => {
      gradient.addColorStop(...stop);
    });
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
};
