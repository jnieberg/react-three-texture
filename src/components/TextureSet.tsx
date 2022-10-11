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

const TextureSet: React.FC<TextureSetProps> = React.forwardRef(({ map, dimensions, children, ...propsMap }, forwardRef) => {
  const ref = React.useRef();
  const texture = useTextureSetI(children, dimensions, map, propsMap);
  React.useImperativeHandle(forwardRef, () => ref.current);
  return !!texture ? <primitive ref={ref} attach={map ? `${map}Map` : "map"} encoding={sRGBEncoding} {...propsMap} object={texture} /> : null;
});

export { TextureSet };
