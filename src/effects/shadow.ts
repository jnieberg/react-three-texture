import { quality } from "../constants";
import { LayerProps, ShadowProps } from "../types";

export const shadow = (ctx: CanvasRenderingContext2D, props: LayerProps) => {
  if (props.shadow) {
    const shadow = props.shadow as ShadowProps;
    ctx.shadowBlur = (typeof shadow.blur !== "undefined" ? shadow.blur : 20) * (quality / 512);
    ctx.shadowColor = shadow.color || "black";
    ctx.shadowOffsetX = shadow.offset?.[0] || 0;
    ctx.shadowOffsetY = shadow.offset?.[1] || 0;
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(ctx.canvas, 0, 0, ctx.canvas.width, ctx.canvas.height);
  }
};
