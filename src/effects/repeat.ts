import newCanvasHelper from "../helpers/newCanvasHelper";
import { LayerProps, TransformReturn } from "../types";
import { effectFlip } from "./flip";

export const effectRepeat = (ctx: CanvasRenderingContext2D, props: LayerProps, transform: TransformReturn) => {
  if (props.repeat) {
    const texSize = [ctx.canvas.width, ctx.canvas.height];

    newCanvasHelper(
      ctx,
      (ctxRepeat) => {
        const { position, scale, rotation } = transform;
        ctxRepeat.canvas.width = scale[0];
        ctxRepeat.canvas.height = scale[1];
        ctxRepeat.drawImage(ctx.canvas, 0, 0, texSize[0], texSize[1], 0, 0, scale[0], scale[1]);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.translate(texSize[0] * 0.5, texSize[1] * 0.5);
        ctx.rotate(rotation);
        ctx.translate(-texSize[0] * 0.5, -texSize[1] * 0.5);
        effectFlip(ctx, props);

        const offset = position.map((p, i) => (((p % scale[i]) + scale[i]) % scale[i]) - scale[i]);
        const repeat = scale.map((s, i) => Math.ceil(texSize[i] / s));
        for (let y = -Math.ceil(repeat[1] * 0.2); y <= Math.ceil(repeat[1] * 1.2); y += 1) {
          for (let x = -Math.ceil(repeat[0] * 0.2); x <= Math.ceil(repeat[0] * 1.2); x += 1) {
            ctx.drawImage(ctxRepeat.canvas, offset[0] + x * scale[0], offset[1] + y * scale[1], scale[0], scale[1]);
          }
        }
      },
      false
    );
  }
};
