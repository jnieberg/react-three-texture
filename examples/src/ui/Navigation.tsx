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
import Misc from "../demos/Misc";
import Seamless from "../demos/Seamless";
import Renders from "../demos/Renders";
import Bricks from "../demos/Bricks";
import PrettyPlane from "../meshes/PrettyPlane";
import { Fragment } from "react";

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
  { Component: Renders, name: "Renders" },
  {
    name: "Presets",
    submenu: [{ Component: Bricks, name: "Bricks" }],
  },
  { Component: Misc, name: "Misc" },
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
      {menuItems.map(({ name, submenu }) => {
        const isCurrentPage = location.replace(/\/(.*?)(?:\/(.*$)|$)/, "$1") === name.toLowerCase();
        const className = isCurrentPage ? "selected" : "";
        return (
          <Fragment key={name}>
            <Link href={`/${name.toLowerCase()}`}>
              <a href="?" className={className}>
                {name}
              </a>
            </Link>
            {isCurrentPage && (
              <div className="submenu">
                {submenu?.map(({ name: subName }) => {
                  const isCurrentSubPage = location.replace(/\/(.*?)(?:\/(.*$)|$)/, "$2") === subName.toLowerCase();
                  const subClassName = isCurrentSubPage ? "selected" : "";
                  return (
                    <Link key={subName} href={`/${name.toLowerCase()}/${subName.toLowerCase()}`}>
                      <a href="?" className={subClassName}>
                        {subName}
                      </a>
                    </Link>
                  );
                })}
              </div>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
};

export const Pages = () => {
  const globalControl: Schema = {
    "Global Settings": folder({
      mesh: { options: { Box: PrettyBox, Sphere: PrettySphere, Cylinder: PrettyCylinder, Plane: PrettyPlane } },
      dimensions: { options: [1024, 512, 256, 128, 64, 32] },
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
        {menuItems.map(({ Component: Page, name, submenu }) => (
          <Fragment key={name}>
            <Route path={`/${name.toLowerCase()}`}>{Page && <Page globalProps={globalControlProps} {...controlProps} />}</Route>
            {submenu?.map(({ Component: SubPage, name: subName }) => (
              <Route key={name} path={`/${name.toLowerCase()}/${subName.toLowerCase()}`}>
                <SubPage globalProps={globalControlProps} {...controlProps} />
              </Route>
            ))}
          </Fragment>
        ))}
      </group>
    </>
  );
};
