import newCanvasHelper from "../helpers/newCanvasHelper";
import { DEFAULT } from "../setup";
import { BloomProps, LayerProps } from "../types";

export const effectBloom = (ctx: CanvasRenderingContext2D, props: LayerProps) => {
  if (props.bloom) {
    const { size, strength, softness, detail, darken } = { ...DEFAULT.bloom, ...(props.bloom as BloomProps) };
    newCanvasHelper(ctx, (ctxBloom) => {
      ctxBloom.drawImage(ctx.canvas, 0, 0);

      ctxBloom.globalCompositeOperation = darken ? "darken" : "lighten";

      // Sizes
      const dims = props.dimensions || DEFAULT.dimensions;
      const sizeDefault = 32;
      const sizeFactor = size / sizeDefault;
      let s = sizeDefault;
      for (; s >= 0; s--) {
        ctxBloom.globalAlpha = ((1.0 - (s / sizeDefault) ** (1.0 - softness)) * strength) / (sizeDefault * Math.sqrt(detail) * 0.1);

        // Rotations
        const sizeNormalized = s * sizeFactor * (dims / DEFAULT.dimensions);
        let i = 0;
        for (; i < detail; i++) {
          const angle = Math.PI * 2 * (i / detail) + Math.PI * 0.25;
          const direction = [Math.sin(angle), Math.cos(angle)];
          ctxBloom.drawImage(ctx.canvas, direction[0] * sizeNormalized, direction[1] * sizeNormalized, ctx.canvas.width, ctx.canvas.height);
        }
      }
    });
  }
};
