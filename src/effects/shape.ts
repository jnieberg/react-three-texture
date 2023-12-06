import { DEFAULT } from "../setup";
import { LayerProps } from "../types";
import { shapeLine, shapeCircle, shapeRect, shapeCurve, shapeText, shapePoly } from "./shapes";

export const effectShape = async (ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, props: LayerProps) => {
  const dims = props.dimensions || ctx.canvas.width;
  const color = !props.color || typeof props.color === "boolean" ? DEFAULT.color : props.color;
  const scale = props.scale?.[0] || 1;
  const thick: number = props.shapeThickness || DEFAULT.shapeThickness;
  if (!!thick) {
    ctx.strokeStyle = color;
    ctx.lineWidth = (thick * (dims / DEFAULT.dimensions)) / scale;
  } else {
    ctx.fillStyle = color;
  }
  ctx.lineCap = props.shapeRounded ? "round" : "butt";
  ctx.lineJoin = props.shapeRounded ? "round" : "miter";

  shapeLine(ctx, props);
  shapeCircle(ctx, props);
  shapeRect(ctx, props);
  shapePoly(ctx, props);
  shapeCurve(ctx, props);
  await shapeText(ctx, props);

  !!props.shapeThickness ? ctx.stroke() : ctx.fill();
};
