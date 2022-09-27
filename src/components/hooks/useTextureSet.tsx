/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { MapType, TextureResult } from "../../types";
import { useTextureSetI } from "./useTextureSetI";

export const useTextureSet = (children: React.ReactNode, dimensions: number, isEnvMap: boolean = false): TextureResult =>
  useTextureSetI(children, dimensions, (isEnvMap && "env") as MapType);
