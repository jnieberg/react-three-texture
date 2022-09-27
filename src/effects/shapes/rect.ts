import { ctxRoundRect } from "../../polyfill/ctx";
import { LayerProps } from "../../types";

export const shapeRect = (ctx: CanvasRenderingContext2D, props: LayerProps) => {
  const rect = props.rect;
  if (rect) {
    const dims = props.dimensions || ctx.canvas.width;
    const rectArgs: [number, number, number, number, number] = [
      rect[0] * dims,
      rect[1] * dims,
      rect[2] * dims,
      (rect[3] || rect[2]) * dims,
      (rect[4] || 0) * dims,
    ];
    !!rectArgs[4] ? ctxRoundRect(ctx, ...rectArgs) : ctx.rect(rectArgs[0], rectArgs[1], rectArgs[2], rectArgs[3]);
  }
};
