import { DEFAULT } from "../setup";
import storage from "../storage/storage";
import { LayerProps, TransformReturn } from "../types";

export const effectTransformation = async (
  ctx: CanvasRenderingContext2D,
  props: LayerProps,
  callback: (transform: TransformReturn) => Promise<void>
) => {
  const imgSrc = props.src && storage("IMG", props.src).get();
  const target = imgSrc || ctx.canvas;
  const tw = target.width;
  const th = target.height;

  let scale: [number, number] = [...(props.scale || DEFAULT.scale)];
  let position: [number, number] = [...(props.position || DEFAULT.position)];
  const rotation = props.rotation || DEFAULT.rotation;
  const dims = props.dimensions || ctx.canvas.width;

  if (props.image) {
    if (typeof props.image === "boolean") props.image = DEFAULT.image;
    props.image.split(" ").forEach((align) => {
      if (align === "fit-max") {
        align = th > tw ? "fit-x" : "fit-y";
      } else if (align === "fit-min") {
        align = th < tw ? "fit-x" : "fit-y";
      }
      if (align === "fit-x") {
        scale = [scale[0], scale[1] * (th / tw)];
      } else if (align === "fit-y") {
        scale = [scale[0] * (tw / th), scale[1]];
      } else if (align === "fit-none") {
        scale = [scale[0] * (tw / ctx.canvas.width), scale[1] * (th / ctx.canvas.height)];
      }
      if (align === "center") position[0] += 0.5 - scale[0] * 0.5;
      if (align === "middle") position[1] += 0.5 - scale[1] * 0.5;
      if (align === "bottom") position[1] += 1 - scale[1];
      if (align === "right") position[0] += 1 - scale[0];
    });
  }

  if (props.repeat) {
    position = [dims * position[0] - dims * 0.5, dims * position[1] - dims * 0.5];
  } else {
    position = [ctx.canvas.width * position[0] - dims * 0.5, ctx.canvas.height * position[1] - dims * 0.5];
    ctx.scale(dims / ctx.canvas.width, dims / ctx.canvas.height);
    ctx.translate(dims * 0.5, dims * 0.5);
    ctx.rotate(rotation);
    ctx.translate(position[0], position[1]);
    ctx.scale(scale[0], scale[1]);
  }

  position = [position[0] + dims * 0.5, position[1] + dims * 0.5];
  scale = [scale[0] * dims, scale[1] * dims];

  await callback({ position, scale, rotation });
  ctx.resetTransform();
};
