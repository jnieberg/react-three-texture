import { quality } from "../constants";
import { LayerProps } from "../types";

export const outline = (ctx: CanvasRenderingContext2D, props: LayerProps) => {
  if (props.outline) {
    const ctxOutline = document.createElement("canvas").getContext("2d");
    if (!ctxOutline) return null;

    ctxOutline.canvas.width = ctx.canvas.width;
    ctxOutline.canvas.height = ctx.canvas.height;

    ctxOutline.globalCompositeOperation = "source-over";
    ctxOutline.fillStyle = props.outline.color || "black";
    ctxOutline.fillRect(0, 0, ctxOutline.canvas.width, ctxOutline.canvas.height);

    // The actual outlining
    const ctxOutlineIn = document.createElement("canvas").getContext("2d");
    if (!ctxOutlineIn) return null;

    ctxOutlineIn.canvas.width = ctx.canvas.width;
    ctxOutlineIn.canvas.height = ctx.canvas.height;
    ctxOutlineIn.globalCompositeOperation = "source-over";
    const size = (typeof props.outline.size !== "undefined" ? props.outline.size : 1) * (quality / 512);
    const detail = (typeof props.outline.detail !== "undefined" ? props.outline.detail : 8) * size;
    let i = 0;
    for (; i < detail; i++) {
      const angle = Math.PI * 2 * (i / detail);
      const direction = [Math.sin(angle), Math.cos(angle)];
      ctxOutlineIn.drawImage(ctx.canvas, direction[0] * size, direction[1] * size, ctxOutlineIn.canvas.width, ctxOutlineIn.canvas.height);
    }
    ctxOutline.globalCompositeOperation = "destination-in";
    ctxOutline.drawImage(ctxOutlineIn.canvas, 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctxOutlineIn.canvas.remove();

    ctxOutline.globalCompositeOperation = "source-over";
    ctxOutline.drawImage(ctx.canvas, 0, 0, ctxOutline.canvas.width, ctxOutline.canvas.height);

    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(ctxOutline.canvas, 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctxOutline.canvas.remove();
  }
};
