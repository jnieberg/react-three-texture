import * as React from "react";
import { SRGBColorSpace } from "three";
import { TextureSetProps } from "../types/TextureSet";
import { PrimitiveProps } from "@react-three/fiber";
import { useTextureSet } from "./hooks/useTextureSet";

/**
 * A React component that creates a texture set from React nodes and renders it as a Three.js primitive. This component uses the `useTextureSet` hook to generate a texture from the provided children and dimensions, and then attaches it to a Three.js object.
 * @param props The properties for the texture set, including the map type, dimensions, and any additional props for the Three.js primitive.
 * @param forwardRef A ref that can be used to access the underlying Three.js primitive.
 * @returns A React component that renders a Three.js primitive with the generated texture set.
 */
const TextureSet: React.FC<TextureSetProps> = React.forwardRef(({ map, dimensions, children, ...propsMap }, forwardRef) => {
  const ref = React.useRef<PrimitiveProps>();
  const texture = useTextureSet(children, dimensions);

  React.useImperativeHandle(forwardRef, () => ref.current);

  return !!texture ? <primitive ref={ref} attach={map ? `${map}Map` : "map"} colorSpace={SRGBColorSpace} {...propsMap} object={texture} /> : null;
});

export { TextureSet };
