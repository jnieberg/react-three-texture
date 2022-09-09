import { folder } from "leva";

const getControls = (location: string) => {
  let controls = null;

  switch (location) {
    case "/images":
      controls = {
        "Image source": folder({
          upload: {
            image: "girl.png",
          },
          url: "https://images.unsplash.com/photo-1581373449483-37449f962b6c",
        }),
        "Image positioning": folder({
          "image fit": {
            options: {
              max: "fit-max",
              min: "fit-min",
              x: "fit-x",
              y: "fit-y",
              fill: "fit-fill",
              none: "fit-none",
            },
          },
          "image horizontal alignment": {
            options: {
              center: "center",
              left: "left",
              right: "right",
            },
          },
          "image vertical alignment": {
            options: {
              middle: "middle",
              top: "top",
              bottom: "bottom",
            },
          },
        }),
      };
      break;
    case "/transformation":
      controls = {
        Transformation: folder({
          position: {
            value: { x: 0, y: 0 },
            step: 0.01,
          },
          scale: {
            value: { x: 1, y: 1 },
            step: 0.01,
          },
          rotation: {
            value: 0,
            min: 0,
            max: Math.PI * 2,
            step: 0.01,
          },
        }),
      };
      break;
    case "/gradient":
      controls = {
        Colors: folder({
          color1: "#00ffff",
          color2: "#ff00ff",
          color3: "#ffff00",
        }),
        "Gradient Points": folder({
          from: {
            value: { x: 0.3, y: 0.3 },
            x: {
              min: 0,
              max: 1,
              step: 0.01,
            },
            y: {
              min: 0,
              max: 1,
              step: 0.01,
            },
          },
          to: {
            value: { x: 0.7, y: 0.7 },
            x: {
              min: 0,
              max: 1,
              step: 0.01,
            },
            y: {
              min: 0,
              max: 1,
              step: 0.01,
            },
          },
        }),
        "Radial Gradient": folder({
          fromRad: {
            value: 0,
            min: 0,
            max: 1,
            step: 0.01,
          },
          toRad: {
            value: 0.7,
            min: 0,
            max: 1,
            step: 0.01,
          },
        }),
      };
      break;
    case "/blending":
      controls = {
        Blending: folder({
          "compositing operation": {
            options: {
              "source over": "source-over",
              "source in": "source-in",
              "source out": "source-out",
              "source atop": "source-atop",
              "destination over": "destination-over",
              "destination in": "destination-in",
              "destination out": "destination-out",
              "destination atop": "destination-atop",
              copy: "copy",
              xor: "xor",
              lighter: "lighter",
              multiply: "multiply",
              screen: "screen",
              overlay: "overlay",
              lighten: "lighten",
              darken: "darken",
              "color dodge": "color-dodge",
              "color burn": "color-burn",
              "hard light": "hard-light",
              "soft light": "soft-light",
              difference: "difference",
              exclusion: "exclusion",
              hue: "hue",
              saturation: "saturation",
              color: "color",
              luminosity: "luminosity",
            },
          },
        }),
      };
      break;
    case "/filters":
      controls = {
        Filters: folder({
          brightness: {
            value: 100,
            min: 0,
            max: 400,
            step: 10,
          },
          contrast: {
            value: 100,
            min: 0,
            max: 400,
            step: 10,
          },
          hue: {
            value: 0,
            min: 0,
            max: 360,
            step: 10,
          },
          saturate: {
            value: 100,
            min: 0,
            max: 400,
            step: 10,
          },
          blur: {
            value: 0,
            min: 0,
            max: 20,
            step: 1,
          },
        }),
      };
      break;
    case "/effects":
      controls = {
        Bloom: folder({
          size: {
            value: 20,
            min: 0,
            max: 40,
            step: 5,
          },
          strength: {
            value: 0.4,
            min: 0,
            max: 1,
            step: 0.05,
          },
          softness: {
            value: 0.7,
            min: 0,
            max: 1,
            step: 0.05,
          },
          detail: {
            value: 10,
            min: 1,
            max: 20,
            step: 1,
          },
        }),
        Shadow: folder({
          color: "#440000",
          blur: {
            value: 20,
            min: 0,
            max: 40,
            step: 2,
          },
          offset: {
            value: { x: 0, y: 0 },
            step: 1,
          },
        }),
        Outline: folder({
          colorO: "#ffffff",
          sizeO: {
            value: 4,
            min: 0,
            max: 20,
            step: 1,
          },
          detailO: {
            value: 10,
            min: 1,
            max: 20,
            step: 1,
          },
        }),
      };
      break;
    case "/alpha":
      controls = {
        Alpha: folder({
          level: {
            value: 1,
            min: 0,
            max: 1,
            step: 0.02,
          },
          power: {
            value: 15,
            min: 0,
            max: 30,
            step: 0.1,
          },
          offset: {
            value: 0.33,
            min: -1,
            max: 1,
            step: 0.02,
          },
          reverse: false,
        }),
      };
      break;
    default:
      break;
  }
  return controls;
};

export default getControls;
