const newCanvasHelper = (ctx: CanvasRenderingContext2D, callback: (ctxHelper: CanvasRenderingContext2D) => void) => {
  const ctxHelper = document.createElement("canvas").getContext("2d");
  if (!ctxHelper) return;

  ctxHelper.canvas.width = ctx.canvas.width;
  ctxHelper.canvas.height = ctx.canvas.height;

  callback(ctxHelper);

  ctx.drawImage(ctxHelper.canvas, 0, 0, ctxHelper.canvas.width, ctxHelper.canvas.height);

  ctxHelper.canvas.remove();
};

export default newCanvasHelper;
