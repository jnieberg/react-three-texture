import { LayerProps } from "../types";

export const color = (ctx: CanvasRenderingContext2D, props: LayerProps) => {
  if (props.color) {
    const ctxColor = document.createElement("canvas").getContext("2d");
    if (!ctxColor) return null;

    ctxColor.canvas.width = ctx.canvas.width;
    ctxColor.canvas.height = ctx.canvas.height;

    ctxColor.globalCompositeOperation = "source-over";
    ctxColor.fillStyle = props.color;
    ctxColor.fillRect(0, 0, ctxColor.canvas.width, ctxColor.canvas.height);

    ctxColor.globalCompositeOperation = "destination-in";
    ctxColor.drawImage(ctx.canvas, 0, 0, ctxColor.canvas.width, ctxColor.canvas.height);

    // TO DO - find a way to make this generally work for both SVG and other image types
    if (props.src?.search(/\.svg$/) === -1) {
      ctxColor.globalCompositeOperation = "luminosity";
      ctxColor.drawImage(ctx.canvas, 0, 0, ctxColor.canvas.width, ctxColor.canvas.height);
    }

    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(ctxColor.canvas, 0, 0, ctxColor.canvas.width, ctxColor.canvas.height);
    ctxColor.canvas.remove();
  }
};
