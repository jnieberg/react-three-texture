import newCanvasHelper from "../helpers/newCanvasHelper";
import { DEFAULT } from "../setup";
import { LayerProps, OutlineProps } from "../types";

export const effectOutline = (ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, props: LayerProps) => {
  if (props.outline) {
    const { color, size, detail } = { ...DEFAULT.outline, ...(props.outline as OutlineProps) };
    newCanvasHelper(ctx, (ctxOutline) => {
      ctxOutline.fillStyle = color;
      ctxOutline.fillRect(0, 0, ctxOutline.canvas.width, ctxOutline.canvas.height);

      // The actual outlining
      newCanvasHelper(ctxOutline, (ctxOutlineIn) => {
        const dims = props.dimensions || ctx.canvas.width;
        const sizeNorm = size * (dims / DEFAULT.dimensions);
        const detailNorm = detail;
        let i = 0;
        ctxOutline.globalCompositeOperation = "destination-in";
        for (; i < detailNorm; i++) {
          const angle = Math.PI * 2 * (i / detailNorm) + Math.PI * 0.25;
          const direction = [Math.sin(angle), Math.cos(angle)];
          ctxOutlineIn.drawImage(ctx.canvas, direction[0] * sizeNorm, direction[1] * sizeNorm, ctxOutlineIn.canvas.width, ctxOutlineIn.canvas.height);
        }
      });

      ctxOutline.globalCompositeOperation = "source-over";
      ctxOutline.drawImage(ctx.canvas, 0, 0, ctxOutline.canvas.width, ctxOutline.canvas.height);
    });
  }
};
