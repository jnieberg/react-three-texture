import Random from "../helpers/Random";
import { mixColors } from "../helpers/mixColors";
import newCanvasHelper from "../helpers/newCanvasHelper";
import { rgbToHex } from "../helpers/rgbToHex";
import { LayerProps } from "../types";
import * as ColorString from "color-string";

export const effectNoise = (ctx: CanvasRenderingContext2D, props: LayerProps) => {
  const noise = props.noise;
  if (noise) {
    newCanvasHelper(ctx, (ctxNoise) => {
      const w = ctxNoise.canvas.width;
      const h = ctxNoise.canvas.height;
      const iData = ctxNoise.createImageData(w, h);
      const fromColor = ColorString.get.rgb(noise.from || "white");
      const toColor = ColorString.get.rgb(noise.to || "black");
      const random = new Random(`noise_${noise.seed}`);

      function getRand() {
        let rand = 0;
        if (noise?.seed) {
          rand = random.float();
        } else {
          rand = Math.random();
        }
        return rand;
      }

      function randomNoise(): CanvasRenderingContext2D {
        const buffer32 = new Uint32Array(iData.data.buffer);
        const len = buffer32.length;
        let i = 0;
        for (; i < len; i++) {
          let rand = 0;
          if (noise?.seed) {
            rand = random.float();
          } else {
            rand = Math.random();
          }
          const mixColor = mixColors(fromColor, toColor, rand);
          buffer32[i] = rgbToHex(mixColor);
        }
        ctxNoise.putImageData(iData, 0, 0);
        return ctxNoise;
      }

      function perlinNoise(): CanvasRenderingContext2D {
        ctxNoise = randomNoise();
        newCanvasHelper(ctxNoise, (ctxNoise2) => {
          let alpha = 1;
          for (var size = 4; size <= w; size *= 2) {
            var x = Math.floor(getRand() * (w - size));
            var y = Math.floor(getRand() * (h - size));

            ctxNoise2.globalAlpha = alpha;
            alpha /= noise?.detail || 2;
            ctxNoise2.drawImage(ctxNoise.canvas, x, y, size, size, 0, 0, w, h);
          }
        });
        return ctxNoise;
      }

      switch (noise.type) {
        case "random":
          ctxNoise = randomNoise();
          break;
        case "perlin":
          ctxNoise = perlinNoise();
      }
    });
  }
};
