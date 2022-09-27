import * as React from "react";

const flattenChildren = (children: React.ReactNode) => {
  const childrenArray = Array.isArray(children) ? children : [children];
  const layers: React.Component<any>[] = childrenArray
    .map((child) =>
      child?.props?.children ? flattenChildren(child.props.children) : typeof child?.type === "function" && child.type() ? child.type() : child
    )
    .flat();
  return layers;
};

export default flattenChildren;
