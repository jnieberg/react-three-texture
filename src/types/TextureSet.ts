import { ReactElement } from "react";
import { LayerProps, TextureT } from ".";

export interface TextureSetProps extends TextureT {
  name?: string;
  children: ReactElement<LayerProps> | ReactElement<LayerProps>[];
}
