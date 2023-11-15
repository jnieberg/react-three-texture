import { folder } from "leva";

type LevaControls = Record<string, any>;

const getControls = (location: string) => {
  let controls: LevaControls = {};

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
              max: "size-max",
              min: "size-min",
              x: "size-x",
              y: "size-y",
              fill: "size-fill",
              none: "size-none",
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
            step: 0.1,
          },
        }),
        Extra: folder({
          flipX: false,
          flipY: false,
          repeat: false,
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
          invert: {
            value: 0,
            min: 0,
            max: 1,
            step: 0.05,
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
            value: 30,
            min: 0,
            max: 50,
            step: 1,
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
          darken: false,
        }),
        Shadow: folder({
          color: "#440000",
          blur: {
            value: 10,
            min: 0,
            max: 40,
            step: 2,
          },
          offset: {
            value: { x: 5, y: 5 },
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
            step: 0.05,
          },
          power: {
            value: 5,
            min: 0,
            max: 30,
            step: 0.05,
          },
          offset: {
            value: 0.3,
            min: -1,
            max: 1,
            step: 0.05,
          },
          reverse: false,
        }),
      };
      break;
    case "/shapes":
      controls = {
        Curve: folder({
          positionA: {
            value: { x: 0.2, y: 0.2 },
            step: 0.01,
          },
          positionB: {
            value: { x: 0.2, y: 0.8 },
            step: 0.01,
          },
          positionC: {
            value: { x: 0.8, y: 0.2 },
            step: 0.01,
          },
          positionD: {
            value: { x: 0.8, y: 0.8 },
            step: 0.01,
          },
        }),
        Text: folder({
          value: "This text looks cool in the Texture Tinker Tool",
          scale: {
            value: 0.5,
            min: 0.1,
            max: 1.5,
            step: 0.01,
          },
          alignment: false,
          bold: false,
          italic: false,
        }),
        "Rounded Box": folder({
          radius: {
            value: 0.1,
            min: 0,
            max: 0.5,
            step: 0.02,
          },
        }),
      };
      break;
    case "/seamless":
      controls = {
        Seamless: folder({
          url: {
            options: {
              castle: "castle.jpg",
              bricks: "bricks.jpg",
              "wooden floor":
                "https://plus.unsplash.com/premium_photo-1670159661171-4efef5308566?q=80&w=2972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              "egyptian wall":
                "https://images.unsplash.com/photo-1622366681698-af1f8305a17f?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
          },
          offsetX: {
            value: 0.3,
            min: 0,
            max: 1,
            step: 0.01,
          },
          offsetY: {
            value: 0.3,
            min: 0,
            max: 1,
            step: 0.01,
          },
          sizeX: {
            value: 0.2,
            min: 0,
            max: 0.5,
            step: 0.01,
          },
          sizeY: {
            value: 0.2,
            min: 0,
            max: 0.5,
            step: 0.01,
          },
          "offset both": false,
          flipX: false,
          flipY: false,
          alphaOffset: {
            value: 0,
            min: 0,
            max: 1,
            step: 0.01,
          },
          alphaReverse: false,
        }),
      };
      break;
    case "/renders":
      controls = {
        Noise: folder({
          "random seed": {
            value: 0,
            min: 0,
            max: 1000000,
            step: 1,
          },
          "perlin seed": {
            value: 0,
            min: 0,
            max: 1000000,
            step: 1,
          },
          "perlin detail": {
            value: 2,
            min: 1,
            max: 4,
            step: 0.1,
          },
        }),
      };
      break;
    default:
      break;
  }
  return controls;
};

export default getControls;
