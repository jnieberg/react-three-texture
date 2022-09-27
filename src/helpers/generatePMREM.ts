import { EquirectangularReflectionMapping, PMREMGenerator, WebGLRenderer } from "three";
import { TextureResult } from "../types";

let pmremGenerator: PMREMGenerator;

const generatePMREM = (gl: WebGLRenderer, tex: TextureResult) => {
  if (tex) {
    if (!pmremGenerator) {
      pmremGenerator = new PMREMGenerator(gl);
      pmremGenerator.compileEquirectangularShader();
      tex = pmremGenerator.fromEquirectangular(tex).texture;
    }
    tex.mapping = EquirectangularReflectionMapping;
    pmremGenerator.dispose();
  }
  return tex;
};

export default generatePMREM;
