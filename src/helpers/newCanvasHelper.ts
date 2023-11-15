const newCanvasHelper = (ctx: CanvasRenderingContext2D, callback: (ctxHelper: CanvasRenderingContext2D) => void, draw = true) => {
  const ctxHelper = document.createElement("canvas").getContext("2d");
  if (!ctxHelper) return;

  ctxHelper.canvas.width = ctx.canvas.width;
  ctxHelper.canvas.height = ctx.canvas.height;

  callback(ctxHelper);

  if (draw) ctx.drawImage(ctxHelper.canvas, 0, 0); //, ctxHelper.canvas.width, ctxHelper.canvas.height

  ctxHelper.canvas.remove();
};

export default newCanvasHelper;
