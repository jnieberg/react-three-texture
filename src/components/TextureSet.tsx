import * as React from "react";
import { CanvasTexture, sRGBEncoding } from "three";
import { LayerProps } from "../types/Layer";
import toUUID from "../helpers/toUUID";
import { IMG, textureStorage, layerStorage } from "../storage/textureStorage";
import { TextureSetProps } from "../types/TextureSet";
import { color, alpha, shadow, outline, bloom, gradient, fill, transformation } from "../effects";
import { DEFAULT, textureGlobals } from "../setup";
import { PrimitiveProps } from "@react-three/fiber";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      primitive: PrimitiveProps;
    }
  }
}

const TextureSet: React.FC<TextureSetProps> = ({ name, map, children, ...setProps }) => {
  const [texture, setTexture] = React.useState<CanvasTexture | null>(null);
  const ctx = document.createElement("canvas").getContext("2d");
  const layers = Array.isArray(children) ? children : [children];
  const uuid = toUUID({
    name: name || "texture",
    map: map || "map",
    props: setProps,
    layers: layers.map((layer) => layer?.props),
  });

  React.useEffect(() => {
    const drawAll = () => {
      return new Promise<CanvasTexture>((resolve) => {
        const textureStored = textureStorage(uuid);
        if (typeof textureStored !== "undefined") {
          resolve(textureStored);
        } else {
          if (ctx) {
            const tex = new CanvasTexture(ctx.canvas);
            tex.name = uuid;
            textureStorage(uuid, tex);
            Promise.all(
              layers.map(async (layer) => {
                const layerProps: LayerProps = { ...textureGlobals, ...layer?.props };
                const { ...layerRestProps } = layerProps;
                const layerUuid = toUUID(layerRestProps);
                const layerStored = layerStorage(layerUuid);
                if (typeof layerStored !== "undefined") {
                  return { ctxLayer: ctx, canvas: layerStored, props: layerProps };
                } else {
                  const ctxLayer = document.createElement("canvas").getContext("2d");
                  if (ctxLayer) {
                    ctxLayer.canvas.width = ctx.canvas.width; //layerProps.dimensions ||
                    ctxLayer.canvas.height = ctx.canvas.height; //layerProps.dimensions ||
                    await drawLayer(ctxLayer, layerProps);
                    layerStorage(layerUuid, ctxLayer.canvas); // new CanvasTexture(ctxLayer.canvas).source.data
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
                    if (document.querySelector(domLayerPreview)) document.querySelector(domLayerPreview)?.prepend(layer.canvas);
                    else layer.canvas.remove();
                  }
                }
              });
              if (document.querySelector(domTexturePreview)) document.querySelector(domTexturePreview)?.prepend(tex.source.data);
              resolve(tex);
            });
          }
        }
      });
    };

    drawAll().then((tex) => setTexture(tex));
  }, [uuid]);

  if (!ctx) return null;

  const domPreview = "#textureset__preview";
  const domTexturePreview = `${domPreview} .texture`;
  const domLayerPreview = `${domPreview} .layer`;
  ctx.canvas.width = textureGlobals.dimensions;
  ctx.canvas.height = textureGlobals.dimensions;

  const setEffects = (ctxLayer: CanvasRenderingContext2D, props: LayerProps) => {
    const src = props.src;
    const target = (src && IMG[src]) || ctx.canvas;

    // Nearest neighbour rendering
    ctxLayer.imageSmoothingEnabled = !props.nearest;

    // Clear canvas
    ctxLayer.globalCompositeOperation = "source-over";
    ctxLayer.clearRect(0, 0, ctxLayer.canvas.width, ctxLayer.canvas.height);

    // Apply filters
    ctxLayer.filter = props.filter || "none";

    // Transformation (position / scale / rotation)
    transformation(ctxLayer, props);

    // Fill
    fill(ctxLayer, props);

    // Gradient
    gradient(ctxLayer, props);

    // Draw image
    ctxLayer.drawImage(target, 0, 0, ctxLayer.canvas.width, ctxLayer.canvas.height);

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
    return new Promise<void>((resolve, reject) => {
      const src = props.src;
      let srcString: string;
      if (src) {
        let image = document.createElement("img");
        if (IMG[src]) {
          srcString = IMG[src].src;
        } else {
          IMG[src] = image;
          if (src.search(/^(blob:)?https?:\/\//) === 0) {
            image.crossOrigin = "Anonymous";
            srcString = src;
          } else {
            srcString = require(`/src/assets/${src}`);
          }
        }
        image.src = srcString;
        image.onload = function () {
          setEffects(ctxLayer, props);
          resolve();
        };
      }
    });
  };

  const drawLayer = (ctxLayer: CanvasRenderingContext2D, props: LayerProps) => {
    return new Promise<void>(async (resolve, reject) => {
      if (props.src) {
        await setImage(ctxLayer, props);
        resolve();
      } else {
        setEffects(ctxLayer, props);
        resolve();
      }
    });
  };

  if (!texture) return null;
  if (!document.querySelector("#texture")) ctx.canvas.remove();

  return <primitive attach={map ? `${map}Map` : "map"} encoding={sRGBEncoding} {...setProps} object={texture} />;
};

export { TextureSet };
