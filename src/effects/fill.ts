import { LayerProps } from "../types";

export const fill = (ctx: CanvasRenderingContext2D, props: LayerProps) => {
  if (props.fill) {
    ctx.fillStyle = props.fill;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
};
