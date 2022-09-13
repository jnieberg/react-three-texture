import { DEFAULT } from "../setup";
import { LayerProps } from "../types";

export const color = (ctx: CanvasRenderingContext2D, props: LayerProps) => {
  if (props.color) {
    // TO DO - find a way to make this generally work for both SVG and other image types
    if (props.src?.search(/\.svg$/) === -1) {
      ctx.globalCompositeOperation = "color";
    } else {
      ctx.globalCompositeOperation = "source-in";
    }
    ctx.fillStyle = props.color || DEFAULT.color;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = "source-over";
  }
};
