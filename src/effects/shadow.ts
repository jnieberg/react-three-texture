import { DEFAULT } from "../setup";
import { LayerProps, ShadowProps } from "../types";

export const effectShadow = (ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, props: LayerProps) => {
  if (props.shadow) {
    const { color, blur, offset } = { ...DEFAULT.shadow, ...(props.shadow as ShadowProps) };
    const dims = props.dimensions || ctx.canvas.width;
    ctx.shadowBlur = blur * (dims / DEFAULT.dimensions);
    ctx.shadowColor = color;
    ctx.shadowOffsetX = offset[0];
    ctx.shadowOffsetY = offset[1];
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(ctx.canvas, 0, 0, ctx.canvas.width, ctx.canvas.height);
  }
};
