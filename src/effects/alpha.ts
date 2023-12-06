import { DEFAULT } from "../setup";
import { AlphaProps, LayerProps } from "../types";

export const effectAlpha = (ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, props: LayerProps) => {
  if (props.alpha && typeof props.alpha !== "number") {
    const { level, power, offset, reverse } = { ...DEFAULT.alpha, ...(props.alpha as AlphaProps) };
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let i = 0, n = imageData.data.length; i < n; i += 4) {
      let pixelAlpha = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2] + imageData.data[i + 3]) / (255 * 4);
      pixelAlpha = (pixelAlpha + offset) ** power;
      pixelAlpha = Math.max(0, Math.min(pixelAlpha, 1.0));
      pixelAlpha = reverse ? 1 - pixelAlpha : pixelAlpha;
      pixelAlpha *= level;
      imageData.data[i + 3] = pixelAlpha * 255;
    }
    ctx.globalCompositeOperation = "source-over";
    ctx.putImageData(imageData, 0, 0);
  }
};
