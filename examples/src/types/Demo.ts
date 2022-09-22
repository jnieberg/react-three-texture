import { FC } from "react";
import PrettyMeshProps from "./PrettyMesh";

export default interface DemoProps extends Record<string, any> {
  globalProps: GlobalControlProps;
}

export type GlobalControlProps = {
  mesh: FC<PrettyMeshProps>;
  dimensions: number;
  canvas: boolean;
};
