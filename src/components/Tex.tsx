import { TEX } from "../storage/textureStorage";
import { ClampToEdgeWrapping, sRGBEncoding, RepeatWrapping, LinearFilter, NearestFilter, Texture, CanvasTexture, Vector2 } from "three";
import { FC } from "react";
import { Instance } from "@react-three/fiber/dist/declarations/src/core/renderer";
import { TexProps } from "../types/Texture";

const Tex: FC<TexProps> = ({
  name = "",
  object = null,
  map = "map",
  // repeat = new Vector2(1, 1),
  // offset = new Vector2(0, 0),
  rotation = 0,
  nearest = false,
  once = false,
  ...textureProps
}) => {
  // const { map = "map", repeat = [1, 1], offset = [0, 0], rotation = 0, nearest = false, once = false, ...textureProps } = props;
  const mapType = map === "map" ? map : `${map}Map`;
  const baseTexture = TEX[name];

  let primitive = object || (baseTexture?.matrix ? baseTexture : TEX[name] || null);

  if (baseTexture) {
    if (!TEX[name]) {
      TEX[name] = baseTexture.clone();
      TEX[name].name = name.toString();
      TEX[name].needsUpdate = true;
    }
    primitive = TEX[name];
  }
  if (!primitive) return null;

  return (
    <primitive
      attach={mapType}
      // offset={offset}
      // repeat={repeat}
      // rotation={rotation}
      wrapS={once === true || once === "x" ? ClampToEdgeWrapping : RepeatWrapping}
      wrapT={once === true || once === "y" ? ClampToEdgeWrapping : RepeatWrapping}
      encoding={sRGBEncoding}
      magFilter={nearest ? NearestFilter : LinearFilter}
      anisotropy={4}
      center={[0.5, 0.5]}
      onUpdate={(self: Instance) => {
        const material = self.__r3f?.parent;
        if (material) material.needsUpdate = true;
        self.needsUpdate = true;
      }}
      {...textureProps}
      object={primitive}
    />
  );
};

export default Tex;
