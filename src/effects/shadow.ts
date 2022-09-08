import { quality } from "../constants";
import { LayerProps } from "../types";

export const shadow = (ctx: CanvasRenderingContext2D, props: LayerProps) => {
  if (props.shadow) {
    ctx.shadowBlur = (typeof props.shadow.blur !== "undefined" ? props.shadow.blur : 20) * (quality / 512);
    ctx.shadowColor = props.shadow.color || "black";
    ctx.shadowOffsetX = props.shadow.offset?.[0] || 0;
    ctx.shadowOffsetY = props.shadow.offset?.[1] || 0;
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(ctx.canvas, 0, 0, ctx.canvas.width, ctx.canvas.height);
  }
};
