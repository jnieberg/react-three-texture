import { AlphaProps, LayerProps } from "../types";

export const alpha = (ctx: CanvasRenderingContext2D, props: LayerProps) => {
  if (props.alpha) {
    const alpha = props.alpha as AlphaProps;
    const level = typeof alpha.level !== "undefined" ? alpha.level : 1;
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let i = 0, n = imageData.data.length; i < n; i += 4) {
      let pixelAlpha = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2] + imageData.data[i + 3]) / (255 * 4);
      pixelAlpha = alpha.reverse ? 1 - pixelAlpha : pixelAlpha;
      pixelAlpha = (pixelAlpha + (alpha.offset || 0)) ** (alpha.power || 0) * level;
      imageData.data[i + 3] = pixelAlpha * 255;
    }
    ctx.globalCompositeOperation = "source-over";
    ctx.putImageData(imageData, 0, 0);
  }
};
