import { quality } from "../constants";
import { LayerProps } from "../types";

export const bloom = (ctx: CanvasRenderingContext2D, props: LayerProps) => {
  if (props.bloom) {
    const { size = 30, strength = 0.9, softness = 0.7, detail = 10 } = props.bloom;
    const ctxBloom = document.createElement("canvas").getContext("2d");
    if (!ctxBloom) return null;

    ctxBloom.canvas.width = ctx.canvas.width;
    ctxBloom.canvas.height = ctx.canvas.height;
    ctxBloom.drawImage(ctx.canvas, 0, 0);

    ctxBloom.globalCompositeOperation = "lighten";

    // Sizes
    const sizeDefault = 32;
    const sizeFactor = size / sizeDefault;
    let s = sizeDefault;
    for (; s >= 0; s--) {
      ctxBloom.globalAlpha = ((1.0 - (s / sizeDefault) ** (1.0 - softness)) * strength) / (sizeDefault * Math.sqrt(detail) * 0.1);

      // Rotations
      const sizeNormalized = s * sizeFactor * (quality / 512);
      let i = 0;
      for (; i < detail; i++) {
        const angle = Math.PI * 2 * (i / detail);
        const direction = [Math.sin(angle), Math.cos(angle)];
        ctxBloom.drawImage(ctx.canvas, direction[0] * sizeNormalized, direction[1] * sizeNormalized, ctx.canvas.width, ctx.canvas.height);
      }
    }

    ctx.globalCompositeOperation = "source-in";
    ctx.drawImage(ctxBloom.canvas, 0, 0);
    ctxBloom.canvas.remove();
  }
};
