/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { CanvasTexture } from "three";
import { LayerProps } from "../../types";
import toUUID from "../../helpers/toUUID";
import storage from "../../storage/storage";
import {
  effectColor,
  effectAlpha,
  effectShadow,
  effectOutline,
  effectBloom,
  effectGradient,
  effectFill,
  effectTransformation,
  effectImage,
  effectRepeat,
  effectShape,
  effectNearest,
  effectFlip,
  effectSeamless,
} from "../../effects";
import { DEFAULT, textureGlobals } from "../../setup";
import { useThree } from "@react-three/fiber";
import { MapType, TextureResult } from "../../types";
import flattenChildren from "../../helpers/flattenChildren";
import generatePMREM from "../../helpers/generatePMREM";
import { effectNoise } from "../../effects/noise";

export const useTextureSetI = (
  children: React.ReactNode,
  dimensions: number = textureGlobals.dimensions || DEFAULT.dimensions,
  map?: MapType,
  propsMap: any = {}
): TextureResult => {
  const { gl } = useThree();
  const layers = flattenChildren(children);

  let uuid = toUUID({ ...textureGlobals, layers: layers.map((layer) => layer?.props), map, dimensions, props: propsMap });
  const [texture, setTexture] = React.useState<TextureResult>(null);
  const domPreview = "#textureset__preview";
  const domTexturePreview = `${domPreview} .texture`;
  const domLayerPreview = `${domPreview} .layer`;
  const textureStored = storage("TEX", uuid);

  const drawAll = async () => {
    return new Promise<TextureResult>((resolve) => {
      if (typeof textureStored.get() !== "undefined") {
        resolve(textureStored.get());
      } else {
        const ctx = document.createElement("canvas").getContext("2d");
        if (ctx) {
          ctx.canvas.width = dimensions;
          ctx.canvas.height = dimensions;
          let tex: CanvasTexture = new CanvasTexture(ctx.canvas);
          textureStored.set(tex);
          tex.name = uuid;
          Promise.all(
            layers.map(async (layer) => {
              const layerProps: LayerProps = { ...textureGlobals, dimensions, ...layer?.props };
              const layerUuid = toUUID(layerProps);
              const layerStored = storage("LAY", layerUuid);
              if (typeof layerStored.get() !== "undefined") {
                return { ctxLayer: ctx, canvas: layerStored.get(), props: layerProps };
              } else {
                const ctxLayer = document.createElement("canvas").getContext("2d");
                if (ctxLayer) {
                  ctxLayer.canvas.width = ctx.canvas.width;
                  ctxLayer.canvas.height = ctx.canvas.height;
                  await drawLayer(ctxLayer, layerProps);
                  layerStored.set(ctxLayer.canvas);
                  return { ctxLayer, canvas: ctxLayer.canvas, props: layerProps };
                }
              }
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

                  if (document.querySelector(domLayerPreview)) {
                    document.querySelector(domLayerPreview)?.prepend(layer.canvas);
                  } else {
                    layer.canvas.remove();
                  }
                }
              }
            });
            if (document.querySelector(domTexturePreview)) {
              document.querySelector(domTexturePreview)?.prepend(tex.source.data);
            } else {
              ctx.canvas.remove();
            }
            resolve(tex);
          });
        }
      }
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

  React.useEffect(() => {
    drawAll().then((tex) => {
      if (tex) {
        if (map === "env") generatePMREM(gl, tex);
        setTexture(tex);
        tex.dispose();
      }
    });
  }, [uuid]);

  if (!texture) return null;

  return texture;
};
