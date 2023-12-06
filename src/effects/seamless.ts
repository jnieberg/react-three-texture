import newCanvasHelper from "../helpers/newCanvasHelper";
import { DEFAULT } from "../setup";
import { LayerProps, SeamlessProps } from "../types";
import { effectAlpha, effectFlip, effectGradient } from ".";

export const effectSeamless = (ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, props: LayerProps) => {
  if (props.seamless) {
    const { offset, size, both, alphaOffset, alphaReverse, flipX, flipY } = { ...DEFAULT.seamless, ...(props.seamless as SeamlessProps) };
    const xyArr = both
      ? [[1, 1, 1, 0]]
      : [
          [1, 0, 1, 0],
          [0, 1, 0, 1],
        ];
    xyArr.forEach(([x, y, u, v], i) => {
      newCanvasHelper(ctx, (ctxSeamless) => {
        if (size[i] > 0) {
          ctxSeamless.globalCompositeOperation = "source-over";
          effectFlip(ctxSeamless, { flipX: flipX, flipY: flipY });
          ctxSeamless.translate(-ctx.canvas.width * offset[0] * x, -ctx.canvas.height * offset[1] * y);
          ctxSeamless.drawImage(ctx.canvas, 0, 0);
          ctxSeamless.drawImage(ctx.canvas, ctx.canvas.width * x, ctx.canvas.height * y);
          if (both) {
            ctxSeamless.drawImage(ctx.canvas, ctx.canvas.width * x, 0);
            ctxSeamless.drawImage(ctx.canvas, 0, ctx.canvas.height * y);
          }
          ctxSeamless.resetTransform();
          if (alphaOffset > 0) {
            ctxSeamless.globalCompositeOperation = "source-in";
            effectAlpha(ctxSeamless, { alpha: { power: 100, offset: alphaOffset, reverse: alphaReverse } });
          }
          ctxSeamless.globalCompositeOperation = "destination-in";
          newCanvasHelper(ctxSeamless, (ctxGradient) => {
            effectGradient(ctxGradient, {
              gradient: {
                from: [0, 0],
                to: [u, v],
                stops: [
                  [0, "#ffffffff"],
                  [size[i], "#ffffff00"],
                  [1 - size[i], "#ffffff00"],
                  [1, "#ffffffff"],
                ],
              },
            });
            if (both) {
              effectGradient(ctxGradient, {
                gradient: {
                  from: [0, 0],
                  to: [v, u],
                  stops: [
                    [0, "#ffffffff"],
                    [size[1], "#ffffff00"],
                    [1 - size[1], "#ffffff00"],
                    [1, "#ffffffff"],
                  ],
                },
              });
            }
          });
        }
      });
    });
  }
};
