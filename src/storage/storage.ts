import { CanvasTexture } from "three";

interface KeyProps<T> {
  [key: string]: T;
}

type Key = "IMG" | "LAY" | "TEX";

type StoreImg = KeyProps<HTMLImageElement>;
type StoreLay = KeyProps<HTMLCanvasElement>;
type StoreTex = KeyProps<CanvasTexture>;

type StoreKeyProps<T> = T extends "IMG" ? HTMLImageElement : T extends "LAY" ? HTMLCanvasElement : CanvasTexture;

type StorageRet<T> = {
  get: () => StoreKeyProps<T>;
  set: (layer?: StoreKeyProps<T>) => void;
};

const STORE = {
  IMG: {} as StoreImg,
  LAY: {} as StoreLay,
  TEX: {} as StoreTex,
};

export const storage = <T extends Key>(key: T, name: string = ""): StorageRet<T> => ({
  get: () => STORE[key][name] as any,
  set: (layer) => {
    if (typeof layer !== "undefined") STORE[key][name] = layer;
  },
});
