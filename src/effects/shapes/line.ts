import { LayerProps } from "../../types";

export const shapeLine = (ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, props: LayerProps) => {
  const line = props.line;
  if (line) {
    const dims = props.dimensions || ctx.canvas.width;
    ctx.beginPath();
    for (var i = 0; i < line.length; i += 2) {
      const x = line[i];
      const y = line[i + 1];
      if (i === 0) {
        ctx.moveTo(x * dims, y * dims);
      } else {
        ctx.lineTo(x * dims, y * dims);
      }
    }
    if (line[0] === line[line.length - 2] && line[1] === line[line.length - 1]) ctx.closePath();
  }
};
