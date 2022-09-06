import { CanvasTexture } from "three";

interface ImgProps {
  [key: string]: HTMLImageElement;
}
interface LayProps {
  [key: string]: HTMLCanvasElement;
}
interface TexProps {
  [key: string]: CanvasTexture;
}

export const IMG: ImgProps = {};
export const LAY: LayProps = {};
export const TEX: TexProps = {};

const textureStorage = (key: string, tex?: CanvasTexture) => {
  if (typeof tex !== "undefined" && typeof TEX[key] === "undefined") TEX[key] = tex;
  return TEX[key];
};

const layerStorage = (key: string, layer?: HTMLCanvasElement) => {
  if (typeof layer !== "undefined" && typeof LAY[key] === "undefined") LAY[key] = layer;
  return LAY[key];
};

export { textureStorage, layerStorage };
