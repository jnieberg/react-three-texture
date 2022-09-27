import { LayerProps } from "../../types";

export const shapeCurve = (ctx: CanvasRenderingContext2D, props: LayerProps) => {
  const curve = props.curve;
  if (curve) {
    const dims = props.dimensions || ctx.canvas.width;
    const curveArgs: [number, number, number, number, number, number, number?, number?] = [
      curve[0] * dims,
      curve[1] * dims,
      curve[2] * dims,
      curve[3] * dims,
      curve[4] * dims,
      curve[5] * dims,
      curve[6] ? curve[6] * dims : undefined,
      curve[7] ? curve[7] * dims : undefined,
    ];
    ctx.moveTo(curveArgs[0], curveArgs[1]);
    if (curveArgs[6] && curveArgs[7]) {
      ctx.bezierCurveTo(curveArgs[2], curveArgs[3], curveArgs[4], curveArgs[5], curveArgs[6], curveArgs[7]);
    } else {
      ctx.quadraticCurveTo(curveArgs[2], curveArgs[3], curveArgs[4], curveArgs[5]);
    }
  }
};
