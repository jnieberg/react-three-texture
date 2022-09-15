import { storage } from "../storage/storage";
import { LayerProps } from "../types";

export const image = (ctx: CanvasRenderingContext2D, props: LayerProps) => {
  const src = props.src;
  const target = storage("IMG", src).get();
  if (target) ctx.drawImage(target, 0, 0, ctx.canvas.width, ctx.canvas.height);
};
