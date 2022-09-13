import newCanvasHelper from "../helpers/newCanvasHelper";
import { DEFAULT } from "../setup";
import { LayerProps, OutlineProps } from "../types";

export const outline = (ctx: CanvasRenderingContext2D, props: LayerProps) => {
  if (props.outline) {
    const { color, size, detail } = { ...DEFAULT.outline, ...(props.outline as OutlineProps) };
    newCanvasHelper(ctx, (ctxOutline) => {
      // const ctxOutline = document.createElement("canvas").getContext("2d");
      // if (!ctxOutline) return null;

      // ctxOutline.canvas.width = ctx.canvas.width;
      // ctxOutline.canvas.height = ctx.canvas.height;

      // ctxOutline.globalCompositeOperation = "source-over";
      ctxOutline.fillStyle = color;
      ctxOutline.fillRect(0, 0, ctxOutline.canvas.width, ctxOutline.canvas.height);

      // The actual outlining
      // const ctxOutlineIn = document.createElement("canvas").getContext("2d");
      // if (!ctxOutlineIn) return null;
      newCanvasHelper(ctxOutline, (ctxOutlineIn) => {
        const dims = props.dimensions || DEFAULT.dimensions;
        // ctxOutlineIn.canvas.width = ctx.canvas.width;
        // ctxOutlineIn.canvas.height = ctx.canvas.height;
        // ctxOutlineIn.globalCompositeOperation = "source-over";
        const sizeNorm = size * (dims / DEFAULT.dimensions);
        const detailNorm = detail;
        let i = 0;
        for (; i < detailNorm; i++) {
          const angle = Math.PI * 2 * (i / detailNorm) + Math.PI * 0.25;
          const direction = [Math.sin(angle), Math.cos(angle)];
          ctxOutlineIn.drawImage(ctx.canvas, direction[0] * sizeNorm, direction[1] * sizeNorm, ctxOutlineIn.canvas.width, ctxOutlineIn.canvas.height);
        }
        ctxOutline.globalCompositeOperation = "destination-in";
        // ctxOutline.drawImage(ctxOutlineIn.canvas, 0, 0, ctx.canvas.width, ctx.canvas.height);
        //ctxOutlineIn.canvas.remove();
      });

      ctxOutline.globalCompositeOperation = "source-over";
      ctxOutline.drawImage(ctx.canvas, 0, 0, ctxOutline.canvas.width, ctxOutline.canvas.height);

      // ctx.globalCompositeOperation = "source-over";
      // ctx.drawImage(ctxOutline.canvas, 0, 0, ctx.canvas.width, ctx.canvas.height);
    });
  }
};
