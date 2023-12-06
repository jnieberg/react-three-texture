/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { TextureResult } from "../../types";
import { useCanvas } from "./useCanvas";
import { CanvasTexture } from "three";
import { PrimitiveProps } from "@react-three/fiber";

export const useTextureSet = (children: React.ReactNode, dimensions: number, isEnvMap: boolean = false): TextureResult => {
  const [texture, setTexture] = React.useState<CanvasTexture>();
  const ref = React.useRef<PrimitiveProps>();
  const canvas = useCanvas(children, dimensions);
  const domPreview = "#textureset__preview";
  const domTexturePreview = `${domPreview} .texture`;

  React.useEffect(() => {
    if (canvas) {
      setTexture(new CanvasTexture(canvas));
      if (ref.current) ref.current.needsUpdate = true;

      if (document.querySelector(domTexturePreview)) {
        document.querySelector(domTexturePreview)?.prepend(canvas);
      }
      return () => {
        document.querySelector(domTexturePreview)?.removeChild(canvas);
        canvas.remove();
      };
    }
  }, [canvas]);

  return texture as CanvasTexture;
};
