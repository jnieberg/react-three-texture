import * as React from "react";
import { SRGBColorSpace } from "three";
import { TextureSetProps } from "../types/TextureSet";
import { PrimitiveProps } from "@react-three/fiber";
import { useTextureSet } from "./hooks/useTextureSet";

const TextureSet: React.FC<TextureSetProps> = React.forwardRef(({ map, dimensions = 512, children, ...propsMap }, forwardRef) => {
  const ref = React.useRef<PrimitiveProps>();
  const texture = useTextureSet(children, dimensions);

  React.useImperativeHandle(forwardRef, () => ref.current);

  return !!texture ? <primitive ref={ref} attach={map ? `${map}Map` : "map"} colorSpace={SRGBColorSpace} {...propsMap} object={texture} /> : null;
});

export { TextureSet };
