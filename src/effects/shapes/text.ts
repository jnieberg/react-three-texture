import wrapText from "../../helpers/wrapText";
import { DEFAULT } from "../../setup";
import storage from "../../storage/storage";
import { LayerProps } from "../../types";

export const shapeText = (ctx: CanvasRenderingContext2D, props: LayerProps) => {
  const text = props.text;
  if (text) {
    return new Promise<void>((resolve) => {
      const { font, style, weight, height, value, width, align, base } = { ...DEFAULT.text, ...text };
      const dims = props.dimensions || ctx.canvas.width;
      const scale = props.scale?.[0] || 1;
      const wrapWidth = (width * dims) / scale;

      const newSize = dims;
      const name = font.replace(/(\.[\w]*?$|\W)/g, "").slice(-48) || "Font";
      const drawText = () => {
        const fontString = `${style} ${weight} ${newSize}px ${name}`;
        ctx.font = fontString;
        const textLines = width > 0 ? wrapText(ctx, value, wrapWidth) : [value];
        textLines.forEach((line, index) => {
          let offset = index * height * dims;
          offset = base === "bottom" ? offset - (textLines.length - 1) * height * dims : offset;
          offset = base === "middle" ? offset - (textLines.length - 1) * height * dims * 0.5 : offset;
          const posProps = [0, offset] as const;
          !!props.shapeThickness ? ctx.strokeText(line, ...posProps) : ctx.fillText(line, ...posProps);
        });
      };
      ctx.textAlign = align;
      ctx.textBaseline = base;
      if (font.indexOf(".") > 0) {
        let fontFace = storage("FON", font).get();
        if (!fontFace) {
          const srcString = font.search(/^(blob:)?https?:\/\//) === 0 ? font : require(`/src/assets/${font}`);
          fontFace = new FontFace(name, `url(${srcString})`);
          storage("FON", font).set(fontFace);
        }
        fontFace.load().then((f) => {
          (document as any).fonts.add(f);
          drawText();
          resolve();
        });
      } else {
        drawText();
        resolve();
      }
    });
  }
};
