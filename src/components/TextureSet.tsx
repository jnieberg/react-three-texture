import * as React from "react";
import { CanvasTexture, sRGBEncoding } from "three";
import { LayerProps } from "../types/Layer";
import toUUID from "../helpers/toUUID";
import { storage } from "../storage/storage";
import { TextureSetProps } from "../types/TextureSet";
import { color, alpha, shadow, outline, bloom, gradient, fill, transformation } from "../effects";
import { DEFAULT, textureGlobals } from "../setup";
import { PrimitiveProps } from "@react-three/fiber";
import { image } from "../effects/image";
import { repeat } from "../effects/repeat";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      primitive: PrimitiveProps;
    }
  }
}

const TextureSet: React.FC<TextureSetProps> = ({ map, children, ...setProps }) => {
  const layers = children ? (Array.isArray(children) ? children : [children]) : [];
  const [texture, setTexture] = React.useState<CanvasTexture | null>(null);
  let uuid = toUUID({ map: map, props: setProps, layers: layers.map((layer) => layer?.props) });

  const domPreview = "#textureset__preview";
  const domTexturePreview = `${domPreview} .texture`;
  const domLayerPreview = `${domPreview} .layer`;
  const textureStored = storage("TEX", uuid);

  React.useEffect(() => {
    drawAll().then((tex) => setTexture(tex as CanvasTexture));
  }, [uuid]);

  const drawAll = () => {
    return new Promise<CanvasTexture>((resolve) => {
      if (typeof textureStored.get() !== "undefined") {
        resolve(textureStored.get());
      } else {
        const ctx = document.createElement("canvas").getContext("2d");
        if (ctx) {
          ctx.canvas.width = textureGlobals.dimensions;
          ctx.canvas.height = textureGlobals.dimensions;
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
                  ctx.globalCompositeOperation = layer.props.blend || DEFAULT.blend;
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

  const setEffects = (ctxLayer: CanvasRenderingContext2D, props: LayerProps) => {
    // Nearest neighbour rendering
    ctxLayer.imageSmoothingEnabled = !props.nearest;

    // Apply filters
    ctxLayer.filter = props.filter || "none";

    // Transformation (position / scale / rotation)
    const transform = transformation(ctxLayer, props);

    // Fill
    fill(ctxLayer, props);

    // Gradient
    gradient(ctxLayer, props);

    // Draw image
    image(ctxLayer, props);

    // Repeat layer
    repeat(ctxLayer, props, transform);

    // Reset transformation
    ctxLayer.resetTransform();

    // Color override
    color(ctxLayer, props);

    // Alpha channels
    alpha(ctxLayer, props);

    // Shadow / glow effect
    shadow(ctxLayer, props);

    // Outline
    outline(ctxLayer, props);

    // Bloom effect
    bloom(ctxLayer, props);
  };

  const setImage = (ctxLayer: CanvasRenderingContext2D, props: LayerProps) => {
    return new Promise<void>((resolve) => {
      const src = props.src;
      let srcString: string;
      if (src) {
        let image = document.createElement("img");
        const imageSrc = storage("IMG", src).get();
        if (imageSrc) {
          srcString = imageSrc.src;
        } else {
          storage("IMG", src).set(image);
          if (src.search(/^(blob:)?https?:\/\//) === 0) {
            image.crossOrigin = "Anonymous";
            srcString = src;
          } else {
            srcString = require(`/src/assets/${src}`);
          }
        }
        image.src = srcString;
        image.onload = () => {
          setEffects(ctxLayer, props);
          resolve();
        };
      }
    });
  };

  const drawLayer = (ctxLayer: CanvasRenderingContext2D, props: LayerProps) => {
    return new Promise<void>((resolve) => {
      if (props.src) {
        setImage(ctxLayer, props).then(() => resolve());
      } else {
        setEffects(ctxLayer, props);
        resolve();
      }
    });
  };

  if (!texture) return null;

  return <primitive attach={map ? `${map}Map` : "map"} encoding={sRGBEncoding} {...setProps} object={texture} />;
};

export { TextureSet };
