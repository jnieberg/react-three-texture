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
import Shapes from "../demos/Shapes";
import { GlobalControlProps } from "../types/Demo";
import { textureDefaults } from "react-three-texture";
import Test from "../demos/Test";
import Seamless from "../demos/Seamless";

const menuItems = [
  { Component: Images, name: "Images" },
  { Component: Transformation, name: "Transformation" },
  { Component: Gradient, name: "Gradient" },
  { Component: Blending, name: "Blending" },
  { Component: Filters, name: "Filters" },
  { Component: Effects, name: "Effects" },
  { Component: Alpha, name: "Alpha" },
  { Component: Shapes, name: "Shapes" },
  { Component: Seamless, name: "Seamless" },
  { Component: Test, name: "Test" },
];

export const Navigation = () => {
  const [location] = useLocation();

  return (
    <nav>
      <a href="https://github.com/jnieberg/react-three-texture" className="more-info" title="Visit the Texture Tinker Tool on GitHub">
        More info
        <svg width="16" height="16" viewBox="0 -4 16 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9"
            stroke="#ffffff"
            strokeWidth="3"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </a>
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
      dimensions: { options: [512, 256, 128, 64, 32] },
      canvas: { value: false, onChange: (v) => document.querySelector("#textureset__preview")?.classList.toggle("show", v) },
    }),
  };
  const globalControlProps = useControls(globalControl) as unknown as GlobalControlProps;
  const dimensions = globalControlProps.dimensions as number;
  const [location] = useLocation();
  const { ...controlProps } = getControls(location);
  textureDefaults({ dimensions });

  return (
    <>
      <Route path="">
        <Redirect to={`/${menuItems[0].name.toLowerCase()}`} />
      </Route>
      <group position={[0, 0.5, 0]}>
        {menuItems.map(({ Component: Page, name }) => (
          <Route key={name} path={`/${name.toLowerCase()}`}>
            <Page globalProps={globalControlProps} {...controlProps} />
          </Route>
        ))}
      </group>
    </>
  );
};
