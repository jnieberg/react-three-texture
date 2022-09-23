import * as React from "react";
import { sRGBEncoding } from "three";
import { TextureSetProps } from "../types/TextureSet";
import { PrimitiveProps } from "@react-three/fiber";
import { useTextureSet } from ".";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      primitive: PrimitiveProps;
    }
  }
}

const TextureSet: React.FC<TextureSetProps> = ({ map, children, ...propsMap }) => {
  const texture = useTextureSet(children, propsMap, map);
  return !!texture ? <primitive attach={map ? `${map}Map` : "map"} encoding={sRGBEncoding} {...propsMap} object={texture} /> : null;
};

export { TextureSet };
