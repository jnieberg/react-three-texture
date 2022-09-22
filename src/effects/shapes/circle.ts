import { DEFAULT } from "../../setup";
import { LayerProps } from "../../types";

export const shapeCircle = (ctx: CanvasRenderingContext2D, props: LayerProps) => {
  const circle = props.circle;
  if (circle) {
    const dims = props.dimensions || DEFAULT.dimensions;
    const circleArgs: [number, number, number, number, number, number, number, boolean?] = [
      circle[0] * dims,
      circle[1] * dims,
      circle[2] * dims,
      (circle[3] || circle[2]) * dims,
      circle[4] || 0,
      circle[5] || 0,
      circle[6] || Math.PI * 2,
      circle[7],
    ];
    ctx.ellipse(...circleArgs);
  }
};
