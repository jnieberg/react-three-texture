import { LayerProps } from "../types";

export const effectFlip = (ctx: CanvasRenderingContext2D, props: LayerProps) => {
  if (props.flip) {
    const flip = props.flip === true ? ["horizontal"] : props.flip.split(" ");
    if (flip.indexOf("horizontal") > -1) {
      ctx.scale(-1, 1);
      ctx.translate(-ctx.canvas.width, 0);
      console.log(123456);
    }
    if (flip.indexOf("vertical") > -1) {
      ctx.scale(1, -1);
      ctx.translate(0, -ctx.canvas.height);
    }
  }
};
