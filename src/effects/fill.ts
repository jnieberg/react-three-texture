import { DEFAULT } from "../setup";
import { LayerProps } from "../types";

export const effectFill = (ctx: CanvasRenderingContext2D, props: LayerProps) => {
  if (props.fill) {
    ctx.fillStyle = typeof props.fill === "boolean" ? DEFAULT.fill : props.fill;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
};
