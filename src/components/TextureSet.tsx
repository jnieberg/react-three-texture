/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { CanvasTexture, sRGBEncoding } from "three";
import { LayerProps } from "../types/Layer";
import toUUID from "../helpers/toUUID";
import { storage } from "../storage/storage";
import { TextureSetProps } from "../types/TextureSet";
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
} from "../effects";
import { DEFAULT, textureGlobals } from "../setup";
import { PrimitiveProps } from "@react-three/fiber";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      primitive: PrimitiveProps;
    }
  }
}

const TextureSet: React.FC<TextureSetProps> = ({ map, children, ...propsMap }) => {
  const layers = children ? (Array.isArray(children) ? children : [children]) : [];
  const [texture, setTexture] = React.useState<CanvasTexture | null>(null);
  let uuid = toUUID({ ...textureGlobals, map: map, layers: layers.map((layer) => layer?.props), props: propsMap });

  const domPreview = "#textureset__preview";
  const domTexturePreview = `${domPreview} .texture`;
  const domLayerPreview = `${domPreview} .layer`;
  const textureStored = storage("TEX", uuid);

  const drawAll = () => {
    return new Promise<CanvasTexture>((resolve) => {
      if (typeof textureStored.get() !== "undefined") {
        resolve(textureStored.get());
      } else {
        const ctx = document.createElement("canvas").getContext("2d");
        if (ctx) {
          ctx.canvas.width = textureGlobals.dimensions as number;
          ctx.canvas.height = textureGlobals.dimensions as number;
          const tex = new CanvasTexture(ctx.canvas);
          tex.name = uuid;
          textureStored.set(tex);
          Promise.all(
            layers.map(async (layer) => {
              const layerProps: LayerProps = { ...textureGlobals, ...layer?.props };
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
                  if (typeof layer.props.alpha === "number") ctx.globalAlpha = layer.props.alpha;

                  // Nearest neighbour rendering
                  effectNearest(ctx, layer.props);

                  // Apply filters
                  ctx.filter = layer.props.filter || "none";

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
    await effectTransformation(ctxLayer, props, async (transform) => {
      effectFill(ctxLayer, props);
      effectGradient(ctxLayer, props);
      effectImage(ctxLayer, props);
      await effectShape(ctxLayer, props);
      effectRepeat(ctxLayer, props, transform);
    });
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
        img.onload = () => {
          setEffects(ctxLayer, props).then(() => resolve());
        };
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
    drawAll().then((tex) => setTexture(tex as CanvasTexture));
  }, [uuid]);

  return !!texture ? <primitive attach={map ? `${map}Map` : "map"} encoding={sRGBEncoding} {...propsMap} object={texture} /> : null;
};

export { TextureSet };
