import "./Navigation.css";
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
import Alpha from "../demos/Alpha";
import { Link, Redirect, Route, useLocation } from "wouter";

const menuItems = [
  { Component: Images, name: "Images" },
  { Component: Transformation, name: "Transformation" },
  { Component: Gradient, name: "Gradient" },
  { Component: Blending, name: "Blending" },
  { Component: Filters, name: "Filters" },
  { Component: Effects, name: "Effects" },
  { Component: Alpha, name: "Alpha" },
];

export const Navigation = () => {
  const [location] = useLocation();

  return (
    <nav>
      {menuItems.map(({ Component, name }) => {
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

export const Pages = () => {
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
        {menuItems.map(({ Component, name }) => (
          <Route key={name} path={`/${name.toLowerCase()}`}>
            <Component globalProps={globalControlProps} {...controlProps} />
          </Route>
        ))}
      </group>
    </>
  );
};
