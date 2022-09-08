import "./Navigation.css";
import { Link, Redirect, Route, useLocation } from "wouter";
import Effects from "../demos/Effects";
import Gradient from "../demos/Gradient";
import Blending from "../demos/Blending";
import Transformation from "../demos/Transformation";
import Filters from "../demos/Filters";
import getControls from "../helpers/getControls";
import { folder, useControls } from "leva";
import PrettyBox from "../meshes/PrettyBox";
import PrettySphere from "../meshes/PrettySphere";
import PrettyCylinder from "../meshes/PrettyCylinder";
import Images from "../demos/Images";
import { Schema } from "leva/dist/declarations/src/types";

const menuItems = [Images, Transformation, Gradient, Blending, Filters, Effects];

export const Navigation = () => {
  const [location] = useLocation();

  return (
    <nav>
      {menuItems.map(({ name }) => {
        const className = location.indexOf(name.toLowerCase()) === 1 ? "selected" : "";
        return (
          <Link key={name} href={`/${name.toLowerCase()}`}>
            <a href="?" className={className}>
              {name}
            </a>
          </Link>
        );
      })}
    </nav>
  );
};

export const Routes = () => {
  const globalControl: Schema = {
    "Global Settings": folder({
      mesh: { options: { Box: PrettyBox, Sphere: PrettySphere, Cylinder: PrettyCylinder } },
      canvas: { value: false, onChange: (v) => document.querySelector("#textureset__preview")?.classList.toggle("show", v) },
    }),
  };
  const { layers: showLayers, textures: showTextures, ...globalControlProps } = useControls(globalControl);
  const [location] = useLocation();
  const controlProps = getControls(location);

  return (
    <>
      <Route path="">
        <Redirect to={`/${menuItems[0].name.toLowerCase()}`} />
      </Route>
      <group position={[0, 0.5, 0]}>
        {menuItems.map((MenuItem) => (
          <Route key={MenuItem.name} path={`/${MenuItem.name.toLowerCase()}`}>
            <MenuItem globalProps={globalControlProps} {...controlProps} />
          </Route>
        ))}
      </group>
    </>
  );
};
