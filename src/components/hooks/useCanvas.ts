/* eslint-disable react-hooks/exhaustive-deps */
import { LayerProps } from "../../types";
import { DEFAULT, textureGlobals } from "../../setup";
import toUUID from "../../helpers/toUUID";
import {
  effectAlpha,
  effectBloom,
  effectColor,
  effectFill,
  effectFlip,
  effectGradient,
  effectImage,
  effectNearest,
  effectOutline,
  effectRepeat,
  effectSeamless,
  effectShadow,
  effectShape,
  effectTransformation,
} from "../../effects";
import { effectNoise } from "../../effects/noise";
import storage from "../../storage/storage";
import { useEffect, useState } from "react";
import flattenChildren from "../../helpers/flattenChildren";

export const useCanvas = (
  children: React.ReactNode,
  dimensions: number = textureGlobals.dimensions || DEFAULT.dimensions
): HTMLCanvasElement | null => {
  const [texture, setTexture] = useState<HTMLCanvasElement | null>(null);
  const layers = flattenChildren(children);
  let uuid = toUUID({ ...textureGlobals, layers: layers.map((layer) => layer?.props), dimensions });

  const ctx = document.createElement("canvas").getContext("2d");

  const drawAll = async () => {
    return new Promise<CanvasRenderingContext2D>((resolve) => {
      if (ctx) {
        ctx.canvas.width = dimensions;
        ctx.canvas.height = dimensions;
        ctx.canvas.id = uuid;
        Promise.all(
          layers.map(async (layer) => {
            const layerProps: LayerProps = { ...textureGlobals, dimensions, ...layer?.props };
            const ctxLayer = document.createElement("canvas").getContext("2d");
            if (ctxLayer) {
              ctxLayer.canvas.width = ctx.canvas.width;
              ctxLayer.canvas.height = ctx.canvas.height;
              await drawLayer(ctxLayer, layerProps);
              return { ctxLayer, canvas: ctxLayer.canvas, props: layerProps };
            }
            // }
            return null;
          })
        ).then((all: ({ ctxLayer: CanvasRenderingContext2D; canvas: HTMLCanvasElement; props: LayerProps } | null)[]) => {
          // Draw each layer
          all.forEach((layer) => {
            if (layer) {
              const cw = layer.props.dimensions || layer.canvas.width;
              const ch = layer.props.dimensions || layer.canvas.height;

              if (layer.canvas) {
                // Blending
                ctx.globalCompositeOperation = layer.props.blend || DEFAULT.blend;

                // Alpha
                ctx.globalAlpha = typeof layer.props.alpha === "number" ? layer.props.alpha : 1.0;

                // Nearest neighbour rendering
                effectNearest(ctx, layer.props);

                // Apply filters
                ctx.filter = layer.props.filter || DEFAULT.filter;

                ctx.drawImage(layer.canvas, 0, 0, cw, ch, 0, 0, layer.canvas.width, layer.canvas.height);
              }
            }
          });
          resolve(ctx);
        });
      }
      // }
    });
  };

  const setEffects = async (ctxLayer: CanvasRenderingContext2D, props: LayerProps) => {
    effectNearest(ctxLayer, props);
    if (!props.repeat) effectFlip(ctxLayer, props);
    await effectTransformation(ctxLayer, props, async (transform) => {
      effectFill(ctxLayer, props);
      effectNoise(ctxLayer, props);
      effectGradient(ctxLayer, props);
      effectImage(ctxLayer, props);
      await effectShape(ctxLayer, props);
      effectRepeat(ctxLayer, props, transform);
    });
    effectSeamless(ctxLayer, props);
    effectColor(ctxLayer, props);
    effectAlpha(ctxLayer, props);
    effectShadow(ctxLayer, props);
    effectOutline(ctxLayer, props);
    effectBloom(ctxLayer, props);
  };

  const setImage = (ctxLayer: CanvasRenderingContext2D, props: LayerProps) => {
    return new Promise<void>((resolve) => {
      const src = props.src;
      let srcString: string;
      if (src) {
        let img = document.createElement("img");
        const imgSrc = storage("IMG", src).get();
        if (imgSrc) {
          srcString = imgSrc.src;
        } else {
          storage("IMG", src).set(img);
          if (src.search(/^(blob:)?https?:\/\//) === 0) {
            img.crossOrigin = "Anonymous";
            srcString = src;
          } else {
            srcString = require(`/src/assets/${src}`);
          }
        }
        img.src = srcString;
        img.onload = () => setEffects(ctxLayer, props).then(() => resolve());
      }
    });
  };

  const drawLayer = (ctxLayer: CanvasRenderingContext2D, props: LayerProps) => {
    return new Promise<void>((resolve) => {
      if (props.src) {
        setImage(ctxLayer, props).then(() => resolve());
      } else {
        setEffects(ctxLayer, props).then(() => resolve());
      }
    });
  };

  useEffect(() => {
    drawAll().then((tex) => {
      if (tex) setTexture(tex.canvas);
    });
  }, [uuid]);

  return texture;
};
