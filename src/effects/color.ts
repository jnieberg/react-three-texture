import { DEFAULT } from "../setup";
import { LayerProps } from "../types";

export const effectColor = (ctx: CanvasRenderingContext2D, props: LayerProps) => {
  const isShape = props.circle || props.curve || props.line || props.rect || props.text;
  if (props.color && !isShape) {
    // TO DO - find a way to make this generally work for both SVG and other image types
    if (props.src?.search(/\.svg$/) === -1) {
      ctx.globalCompositeOperation = "color";
    } else {
      ctx.globalCompositeOperation = "source-in";
    }
    ctx.fillStyle = typeof props.color === "boolean" ? DEFAULT.color : props.color;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = "source-over";
  }
};
