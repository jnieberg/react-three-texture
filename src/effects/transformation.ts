import { quality } from "../constants";
import { IMG } from "../storage/textureStorage";
import { LayerProps } from "../types";

export const transformation = (ctx: CanvasRenderingContext2D, layer: { canvas: HTMLCanvasElement; props: LayerProps }) => {
  const { canvas: canvasLayer, props } = layer;

  const imgSrc = props.src && IMG[props.src];
  const target = imgSrc || ctx.canvas;
  let scale = [props.scale?.[0] || 1, props.scale?.[1] || 1];
  let position = props.position || [0, 0];
  const rotation = props.rotation || 0;

  if (imgSrc && props.image) {
    if (typeof props.image === "boolean") props.image = "fit-max center middle";
    const imageAlign = props.image.split(" ");
    imageAlign.forEach((align) => {
      if (align === "fit-max") {
        align = imgSrc.naturalHeight > imgSrc.naturalWidth ? "fit-x" : "fit-y";
      } else if (align === "fit-min") {
        align = imgSrc.naturalHeight < imgSrc.naturalWidth ? "fit-x" : "fit-y";
      }
      if (align === "fit-x") {
        scale = [scale[0], scale[1] * (imgSrc.naturalHeight / imgSrc.naturalWidth)];
      } else if (align === "fit-y") {
        scale = [scale[0] * (imgSrc.naturalWidth / imgSrc.naturalHeight), scale[1]];
      } else if (align === "fit-none") {
        scale = [scale[0] * (imgSrc.naturalWidth / quality), scale[1] * (imgSrc.naturalHeight / quality)];
      }
      if (align === "center") position[0] += 0.5 - scale[0] * 0.5;
      if (align === "middle") position[1] += 0.5 - scale[1] * 0.5;
      if (align === "bottom") position[1] += 1 - scale[1];
      if (align === "right") position[0] += 1 - scale[0];
    });
  }

  position = [ctx.canvas.width * position[0] - target.width * 0.5, ctx.canvas.height * position[1] - target.height * 0.5];
  scale = [target.width * scale[0], target.height * scale[1]];

  ctx.globalCompositeOperation = props.blend || "source-over";
  ctx.save();
  ctx.translate(target.width * 0.5, target.height * 0.5);
  ctx.rotate(rotation);
  ctx.drawImage(canvasLayer, position[0], position[1], scale[0], scale[1]);
  ctx.restore();
  ctx.globalCompositeOperation = "source-over";
};
