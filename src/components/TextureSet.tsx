import { FC, ReactElement, useEffect, useState } from "react";
import { CanvasTexture } from "three";
import { LayerProps } from "../types/Layer";
import toUUID from "../helpers/toUUID";
import { IMG, textureStorage, layerStorage } from "../storage/textureStorage";
import Tex from "./Tex";
import { TextureSetProps } from "../types/TextureSet";

const TextureSet: FC<TextureSetProps> = ({ name, map, children, ...setProps }) => {
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return null;

  const layers = Array.isArray(children) ? children : [children];
  const uuid = toUUID({
    name: name || "texture",
    map: map || "map",
    props: setProps,
    layers: layers.map((layer) => layer?.props),
  });
  const domPreview = "#textureset__preview";
  const domTexturePreview = `${domPreview} .texture`;
  const domLayerPreview = `${domPreview} .layer`;
  const quality = 512;
  const qualityFactor = quality / 512;
  ctx.canvas.width = quality;
  ctx.canvas.height = quality;
  const cw = ctx.canvas.width;
  const ch = ctx.canvas.height;
  const [texture, setTexture] = useState<CanvasTexture | null>(null);

  const getTransformations = (props: LayerProps) => {
    const src = props.src;
    if (src) {
      const target = IMG[src] || ctx.canvas;
      let scale = [props.scale?.[0] || 1, props.scale?.[1] || 1];
      let position = props.position || [0, 0];

      if (IMG[src] && props.image) {
        console.log(props.image);
        if (typeof props.image === "boolean") props.image = "fit-max center middle";
        const imageAlign = props.image.split(" ");
        imageAlign.forEach((align) => {
          if (align === "fit-max") {
            align = IMG[src].naturalHeight > IMG[src].naturalWidth ? "fit-x" : "fit-y";
          } else if (align === "fit-min") {
            align = IMG[src].naturalHeight < IMG[src].naturalWidth ? "fit-x" : "fit-y";
          }
          if (align === "fit-x") {
            scale = [scale[0], scale[1] * (IMG[src].naturalHeight / IMG[src].naturalWidth)];
          } else if (align === "fit-y") {
            scale = [scale[0] * (IMG[src].naturalWidth / IMG[src].naturalHeight), scale[1]];
          } else if (align === "fit-none") {
            scale = [scale[0] * (IMG[src].naturalWidth / quality), scale[1] * (IMG[src].naturalHeight / quality)];
          }
          if (align === "center") position[0] += 0.5 - scale[0] * 0.5;
          if (align === "middle") position[1] += 0.5 - scale[1] * 0.5;
          if (align === "bottom") position[1] += 1 - scale[1];
          if (align === "right") position[0] += 1 - scale[0];
        });
      }

      position = [cw * position[0] - target.width * 0.5, ch * position[1] - target.height * 0.5];
      scale = [target.width * scale[0], target.height * scale[1]];
      const rotation = props.rotation || 0;
      return { position, scale, rotation };
    }
    return null;
  };

  const setEffects = (ctxLayer: CanvasRenderingContext2D, props: LayerProps) => {
    const src = props.src;
    const target = (src && IMG[src]) || ctx.canvas;

    ctxLayer.canvas.width = cw;
    ctxLayer.canvas.height = ch;

    // Nearest neighbour rendering
    ctxLayer.imageSmoothingEnabled = true;
    if (props.nearest) ctxLayer.imageSmoothingEnabled = false;

    // Clear canvas
    ctxLayer.globalCompositeOperation = "source-over";
    ctxLayer.clearRect(0, 0, ctxLayer.canvas.width, ctxLayer.canvas.height);

    // Apply filters
    ctxLayer.filter = props.filter || "none";

    // Fill
    if (props.fill) {
      ctxLayer.fillStyle = props.fill || "black";
      ctxLayer.fillRect(0, 0, cw, ch);
    }

    // Gradient
    if (props.gradient) {
      const isRadial = props.gradient.type === "radial" || props.gradient.type === "circular";
      const args: number[] = [
        ...(props.gradient?.from || isRadial ? [0.5, 0.5, 0] : [0, 0]),
        ...(props.gradient?.to || isRadial ? [0.5, 0.5, 1] : [0, 1]),
      ].map((a, i) => args[i] * quality);

      const gradient = isRadial
        ? ctxLayer.createRadialGradient(args[0], args[1], args[2], args[3], args[4], args[5]) // weird TS thing
        : ctxLayer.createLinearGradient(args[0], args[1], args[2], args[3]);
      (
        props.gradient.stops || [
          [0, "white"],
          [1, "black"],
        ]
      ).forEach((stop) => {
        gradient.addColorStop(...stop);
      });
      ctxLayer.fillStyle = gradient;
      ctxLayer.fillRect(0, 0, cw, ch);
    }

    // Draw image
    ctxLayer.globalCompositeOperation = "source-over";
    ctxLayer.drawImage(target, 0, 0, ctxLayer.canvas.width, ctxLayer.canvas.height);

    // Color override
    if (props.color) {
      const ctxColor = document.createElement("canvas").getContext("2d");
      if (!ctxColor) return null;

      ctxColor.canvas.width = ctxLayer.canvas.width;
      ctxColor.canvas.height = ctxLayer.canvas.height;

      ctxColor.globalCompositeOperation = "source-over";
      ctxColor.fillStyle = props.color || "white";
      ctxColor.fillRect(0, 0, ctxColor.canvas.width, ctxColor.canvas.height);

      ctxColor.globalCompositeOperation = "destination-in";
      ctxColor.drawImage(ctxLayer.canvas, 0, 0, ctxColor.canvas.width, ctxColor.canvas.height);

      // TO DO - find a way to make this generally work for both SVG and other image types
      if (src?.search(/\.svg$/) === -1) {
        ctxColor.globalCompositeOperation = "hard-light";
        ctxColor.drawImage(ctxLayer.canvas, 0, 0, ctxColor.canvas.width, ctxColor.canvas.height);
      }

      ctxLayer.globalCompositeOperation = "source-over";
      ctxLayer.drawImage(ctxColor.canvas, 0, 0, ctxColor.canvas.width, ctxColor.canvas.height);
      ctxColor.canvas.remove();
      // } else {
      //   ctxLayer.drawImage(target, 0, 0, ctxLayer.canvas.width, ctxLayer.canvas.height);
    }

    // Alpha channels
    if (props.alpha) {
      const level = typeof props.alpha.level !== "undefined" ? props.alpha.level : 1;
      const imageData = ctxLayer.getImageData(0, 0, ctxLayer.canvas.width, ctxLayer.canvas.height);
      for (let i = 0, n = imageData.data.length; i < n; i += 4) {
        let alpha = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2] + imageData.data[i + 3]) / (255 * 4);
        alpha = props.alpha.reverse ? 1 - alpha : alpha;
        alpha = (alpha + (props.alpha.offset || 0)) ** (props.alpha.power || 0) * level;
        imageData.data[i + 3] = alpha * 255;
      }
      ctxLayer.globalCompositeOperation = "source-over";
      ctxLayer.putImageData(imageData, 0, 0);
    }

    // Shadow / glow effect
    if (props.shadow) {
      ctxLayer.shadowBlur = (typeof props.shadow.blur !== "undefined" ? props.shadow.blur : 20) * qualityFactor;
      ctxLayer.shadowColor = props.shadow.color || "black";
      ctxLayer.shadowOffsetX = props.shadow.offset?.[0] || 0;
      ctxLayer.shadowOffsetY = props.shadow.offset?.[1] || 0;
      ctxLayer.globalCompositeOperation = "source-over";
      ctxLayer.drawImage(ctxLayer.canvas, 0, 0, ctxLayer.canvas.width, ctxLayer.canvas.height);
    }

    // Outline
    if (props.outline) {
      const ctxOutline = document.createElement("canvas").getContext("2d");
      if (!ctxOutline) return null;

      ctxOutline.canvas.width = ctxLayer.canvas.width;
      ctxOutline.canvas.height = ctxLayer.canvas.height;

      ctxOutline.globalCompositeOperation = "source-over";
      ctxOutline.fillStyle = props.outline.color || "black";
      ctxOutline.fillRect(0, 0, ctxOutline.canvas.width, ctxOutline.canvas.height);

      // The actual outlining
      const ctxOutlineIn = document.createElement("canvas").getContext("2d");
      if (!ctxOutlineIn) return null;

      ctxOutlineIn.canvas.width = ctxLayer.canvas.width;
      ctxOutlineIn.canvas.height = ctxLayer.canvas.height;
      ctxOutlineIn.globalCompositeOperation = "source-over";
      const size = (typeof props.outline.size !== "undefined" ? props.outline.size : 1) * qualityFactor;
      const detail = (typeof props.outline.detail !== "undefined" ? props.outline.detail : 8) * size;
      let i = 0;
      for (; i < detail; i++) {
        const angle = Math.PI * 2 * (i / detail);
        const direction = [Math.sin(angle), Math.cos(angle)];
        ctxOutlineIn.drawImage(ctxLayer.canvas, direction[0] * size, direction[1] * size, ctxOutlineIn.canvas.width, ctxOutlineIn.canvas.height);
      }
      ctxOutline.globalCompositeOperation = "destination-in";
      ctxOutline.drawImage(ctxOutlineIn.canvas, 0, 0, ctxLayer.canvas.width, ctxLayer.canvas.height);
      ctxOutlineIn.canvas.remove();

      ctxOutline.globalCompositeOperation = "source-over";
      ctxOutline.drawImage(ctxLayer.canvas, 0, 0, ctxOutline.canvas.width, ctxOutline.canvas.height);

      ctxLayer.globalCompositeOperation = "source-over";
      ctxLayer.drawImage(ctxOutline.canvas, 0, 0, ctxLayer.canvas.width, ctxLayer.canvas.height);
      ctxOutline.canvas.remove();
    }

    // Bloom effect
    if (props.bloom) {
      const { size = 30, strength = 0.9, softness = 0.7, detail = 10 } = props.bloom;
      const ctxBloom = document.createElement("canvas").getContext("2d");
      if (!ctxBloom) return null;

      ctxBloom.canvas.width = ctxLayer.canvas.width;
      ctxBloom.canvas.height = ctxLayer.canvas.height;
      ctxBloom.drawImage(ctxLayer.canvas, 0, 0);

      ctxBloom.globalCompositeOperation = "lighten";

      // Sizes
      const sizeDefault = 32;
      const sizeFactor = size / sizeDefault;
      let s = sizeDefault;
      for (; s >= 0; s--) {
        ctxBloom.globalAlpha = ((1.0 - (s / sizeDefault) ** (1.0 - softness)) * strength) / (sizeDefault * Math.sqrt(detail) * 0.1);

        // Rotations
        const sizeNormalized = s * sizeFactor * qualityFactor;
        let i = 0;
        for (; i < detail; i++) {
          const angle = Math.PI * 2 * (i / detail);
          const direction = [Math.sin(angle), Math.cos(angle)];
          ctxBloom.drawImage(ctxLayer.canvas, direction[0] * sizeNormalized, direction[1] * sizeNormalized, cw, ch);
        }
      }

      ctxLayer.globalCompositeOperation = "source-in";
      ctxLayer.drawImage(ctxBloom.canvas, 0, 0);
      ctxBloom.canvas.remove();
    }
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
          image.width = cw;
          image.height = ch;
          if (src.search(/^(blob:)?https?:\/\//) === 0) {
            image.crossOrigin = "anonymous";
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

  useEffect(() => {
    const drawAll = () => {
      return new Promise<CanvasTexture>((resolve, reject) => {
        const textureStored = textureStorage(uuid);
        if (typeof textureStored !== "undefined") {
          resolve(textureStored);
        } else {
          const tex = new CanvasTexture(ctx.canvas);
          tex.name = uuid;
          textureStorage(uuid, tex);
          Promise.all(
            layers.map(async (layer) => {
              const layerProps: LayerProps = { ...layer?.props };
              const { position: _, rotation: __, scale: ___, blend: _____, image: ______, ...layerRestProps } = layerProps;
              const layerUuid = toUUID(layerRestProps);
              const layerStored = layerStorage(layerUuid);
              if (typeof layerStored !== "undefined") {
                return { canvas: layerStored, props: layerProps };
              } else {
                const ctxLayer = document.createElement("canvas").getContext("2d");
                if (ctxLayer) {
                  await drawLayer(ctxLayer, layerProps);
                  layerStorage(layerUuid, ctxLayer.canvas); // new CanvasTexture(ctxLayer.canvas).source.data
                  return { canvas: ctxLayer.canvas, props: layerProps };
                }
              }
              return null;
            })
          ).then((all: ({ canvas: HTMLCanvasElement; props: LayerProps } | null)[]) => {
            // Draw each layer
            all.forEach((layer) => {
              if (layer) {
                const { canvas: canvasLayer, props: layerProps } = layer;
                const src = layerProps.src;
                const target = (src && IMG[src]) || canvasLayer;
                const transformations = getTransformations(layerProps);
                if (transformations) {
                  const { position, scale, rotation } = transformations;
                  ctx.globalCompositeOperation = layerProps.blend || "source-over";
                  ctx.save();
                  ctx.translate(target.width * 0.5, target.height * 0.5);
                  ctx.rotate(rotation);
                  ctx.drawImage(canvasLayer, position[0], position[1], scale[0], scale[1]);
                  ctx.restore();
                  ctx.globalCompositeOperation = "source-over";
                  if (canvasLayer) {
                    if (document.querySelector(domLayerPreview)) document.querySelector(domLayerPreview)?.prepend(canvasLayer);
                    if (!document.querySelector(domLayerPreview)) canvasLayer.remove();
                  }
                }
              }
            });
            if (document.querySelector(domTexturePreview)) document.querySelector(domTexturePreview)?.prepend(tex.source.data);
            resolve(tex);
          });
        }
      });
    };

    drawAll().then((tex) => setTexture(tex));
  }, [uuid]);

  if (!texture) return null;

  if (!document.querySelector("#texture")) ctx.canvas.remove();

  return <Tex {...setProps} name={uuid} object={texture} map={map} />;
};

export default TextureSet;
