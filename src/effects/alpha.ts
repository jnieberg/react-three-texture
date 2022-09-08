import { LayerProps } from "../types";

export const alpha = (ctx: CanvasRenderingContext2D, props: LayerProps) => {
  if (props.alpha) {
    const level = typeof props.alpha.level !== "undefined" ? props.alpha.level : 1;
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let i = 0, n = imageData.data.length; i < n; i += 4) {
      let alpha = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2] + imageData.data[i + 3]) / (255 * 4);
      alpha = props.alpha.reverse ? 1 - alpha : alpha;
      alpha = (alpha + (props.alpha.offset || 0)) ** (props.alpha.power || 0) * level;
      imageData.data[i + 3] = alpha * 255;
    }
    ctx.globalCompositeOperation = "source-over";
    ctx.putImageData(imageData, 0, 0);
  }
};
