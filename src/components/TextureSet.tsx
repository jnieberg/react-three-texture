import * as React from "react";
import { sRGBEncoding } from "three";
import { TextureSetProps } from "../types/TextureSet";
import { PrimitiveProps } from "@react-three/fiber";
import { useTextureSetI } from "./hooks/useTextureSetI";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      primitive: PrimitiveProps;
    }
  }
}

const TextureSet: React.FC<TextureSetProps> = ({ map, dimensions, children, ...propsMap }) => {
  const texture = useTextureSetI(children, dimensions, map, propsMap);
  return !!texture ? <primitive attach={map ? `${map}Map` : "map"} encoding={sRGBEncoding} {...propsMap} object={texture} /> : null;
};

export { TextureSet };
