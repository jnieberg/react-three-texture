import { LayerProps } from "../types";

export const effectNearest = (ctx: CanvasRenderingContext2D, props: LayerProps) => {
  ctx.imageSmoothingQuality = "low";
  ctx.imageSmoothingEnabled = !props.nearest;
};
