import { CanvasTexture } from "three";

type KeyProps<T> = Record<string, T>;

type Key = "IMG" | "LAY" | "TEX" | "FON";

type StoredObject<T> = T extends "IMG" ? HTMLImageElement : T extends "LAY" ? HTMLCanvasElement : T extends "FON" ? FontFace : CanvasTexture;

type StorageRet<T> = {
  get: () => StoredObject<T>;
  set: (layer?: StoredObject<T>) => void;
};

const STORE = {
  IMG: {} as KeyProps<StoredObject<"IMG">>,
  LAY: {} as KeyProps<StoredObject<"LAY">>,
  TEX: {} as KeyProps<StoredObject<"TEX">>,
  FON: {} as KeyProps<StoredObject<"FON">>,
};

export const storage = <T extends Key>(key: T, name: string = ""): StorageRet<T> => ({
  get: () => STORE[key][name] as any,
  set: (layer) => {
    if (typeof layer !== "undefined") STORE[key][name] = layer;
  },
});
