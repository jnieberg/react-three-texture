import { LayerProps } from "../types";

export const effectFlip = (ctx: CanvasRenderingContext2D, props: LayerProps) => {
  if (props.flipX) {
    ctx.scale(-1, 1);
    ctx.translate(-ctx.canvas.width, 0);
  }
  if (props.flipY) {
    ctx.scale(1, -1);
    ctx.translate(0, -ctx.canvas.height);
  }
};
