import { FC } from "react";
import PrettyMeshProps from "./PrettyMesh";

export default interface DemoProps {
  globalProps: {
    mesh: FC<PrettyMeshProps>;
  };
  [key: string]: any;
}
