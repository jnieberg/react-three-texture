/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { TextureResult } from "../../types";
import { useCanvas } from "./useCanvas";
import { CanvasTexture } from "three";
import { PrimitiveProps } from "@react-three/fiber";

/**
 * A custom hook for creating a texture set from React nodes
 * @param children The React nodes to be rendered onto the texture
 * @param dimensions The dimensions of the texture (width and height)
 * @returns A CanvasTexture created from the rendered React nodes
 */
export const useTextureSet = (children: React.ReactNode, dimensions: number): TextureResult => {
  const [texture, setTexture] = React.useState<CanvasTexture>();
  const ref = React.useRef<PrimitiveProps>();
  const canvas = useCanvas(children, dimensions);
  const domPreview = "#textureset__preview";
  const domTexturePreview = `${domPreview} .texture`;

  React.useEffect(() => {
    if (canvas) {
      setTexture(new CanvasTexture(canvas));
      if (ref.current) ref.current.needsUpdate = true;

      const texturePreview = document.querySelector(domTexturePreview);
      if (texturePreview?.hasChildNodes()) {
        if (document.querySelector(domTexturePreview)) {
          document.querySelector(domTexturePreview)?.prepend(canvas);
        }
        return () => {
          document.querySelector(domTexturePreview)?.removeChild(canvas);
          canvas.remove();
        };
      }
    }
  }, [canvas]);

  return texture as CanvasTexture;
};
