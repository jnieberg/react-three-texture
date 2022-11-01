import newCanvasHelper from "../helpers/newCanvasHelper";
import { DEFAULT } from "../setup";
import { LayerProps } from "../types";

export const effectColor = (ctx: CanvasRenderingContext2D, props: LayerProps) => {
  const isShape = props.circle || props.curve || props.line || props.rect || props.text;
  if (props.color && !isShape) {
    newCanvasHelper(ctx, (ctxColor) => {
      ctxColor.drawImage(ctx.canvas, 0, 0);
      ctxColor.globalCompositeOperation = "source-in";
      ctxColor.fillStyle = !props.color || typeof props.color === "boolean" ? DEFAULT.color : props.color;
      ctxColor.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      // TO DO - find a way to make this generally work for both SVG and other image types
      if (props.src?.search(/\.svg$/) === -1) {
        ctxColor.filter = "grayscale(100%)";
        ctxColor.globalCompositeOperation = "hard-light";
        ctxColor.drawImage(ctx.canvas, 0, 0);
      }
    });
  }
};
