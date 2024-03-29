import storage from "../storage/storage";
import { LayerProps } from "../types";

export const effectImage = (ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, props: LayerProps) => {
  const src = props.src;
  const target = storage("IMG", src).get();
  if (target) ctx.drawImage(target, 0, 0, ctx.canvas.width, ctx.canvas.height);
};
