import { ctxRoundPoly } from "../../polyfill/ctx";
import { LayerProps } from "../../types";

export const shapePoly = (ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, props: LayerProps) => {
  const poly = props.poly;
  if (poly) {
    const dims = props.dimensions || ctx.canvas.width;
    const polyArgs = poly
      .filter((p, i) => i % 2 === 0 && i < poly.length - 1)
      .map((p, j) => ({
        x: p * dims,
        y: poly[j * 2 + 1] * dims,
      }));
    ctxRoundPoly(ctx, polyArgs, poly[poly.length - 1] * dims);
  }
};
