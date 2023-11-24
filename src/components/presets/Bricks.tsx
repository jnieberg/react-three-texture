import Random from "../../helpers/Random";
import { Layer } from "../Layer";
import { BricksProps } from "../../types";

const Bricks = (props: BricksProps) => {
  const {
    color = "white",
    width = 0.5,
    height = 0.5,
    thickness = 0.01,
    offsetX = 0,
    seed = 0,
    randomize = [0.0, 0.0, 0.0],
    radius = 0.01,
    layer,
  } = props;
  const [shiftX = 0, shiftY = 0, shiftS = 0] = randomize;
  const random = new Random(`bricks_${seed}`);
  const sx = () => random.float(-shiftX * 0.5, shiftX * 0.5);
  const sy = () => random.float(-shiftY * 0.5, shiftY * 0.5);
  const ss = () => random.float(-shiftS * 0.5, shiftS * 0.5);
  const horizontals = new Array(Math.ceil(1.0 / height))
    .fill(null)
    .map((_, y) => (y + (y > 0 && y < Math.ceil(1.0 / height) - 1 ? sy() : 0)) * height);
  const verticals = new Array(Math.ceil(1.0 / height))
    .fill(null)
    .map((_, y) => new Array(Math.ceil(1.0 / width)).fill(null).map((_, x) => (x + sx()) * width + ((y * offsetX) % 1)));
  const verticalsS = verticals.map((vert) => vert.map((v) => ss()));
  const bricks: ({ x1: number; y1: number; x2: number; y2: number; s1: number; s2: number; color: string } | null)[] = [];

  horizontals.forEach((h1, i) =>
    verticals[i].forEach((v1, j) => {
      const v2 = verticals[i][(j + 1) % verticals[i].length] + (j < verticals[i].length - 1 ? 0 : 1);
      const h2 = horizontals[(i + 1) % horizontals.length] + (i < horizontals.length - 1 ? 0 : 1);
      const vs1 = verticalsS[i][j];
      const vs2 = verticalsS[i][(j + 1) % verticalsS[i].length];
      bricks.push(
        ...new Array(2).fill(null).map((_, o) => {
          let x1 = v1 + thickness * 0.5;
          let y1 = h1 + thickness * 0.5;
          let x2 = v2 - thickness * 0.5;
          let y2 = h2 - thickness * 0.5;
          const xmin1 = Math.floor(x1 - Math.abs(vs1));
          const xmin2 = Math.floor(x2 + Math.abs(vs2));
          if (o > 0) {
            if (xmin1 === 0 && xmin2 > 0) {
              x1 = x1 - xmin2;
              x2 = x2 - xmin2;
            } else if (xmin1 < 0 && xmin2 === 0) {
              x2 = x2 - xmin1;
              x1 = x1 - xmin1;
            } else {
              return null;
            }
          } else if (o === 0) {
            if (xmin1 > 0) {
              x2 = x2 - xmin1;
              x1 = x1 - xmin1;
            }
          }
          const newColor = Array.isArray(color) ? color : [color];
          const randomColor = new Random(`bricks_color_${seed}_${i}_${j}`);
          const c = randomColor.int(0, newColor.length - 1);
          return { x1: x1 - vs1, y1, x2: x2 - vs2, y2, s1: x1 + vs1, s2: x2 + vs2, color: newColor[c] };
        })
      );
    })
  );

  return (
    <>
      {bricks.map(
        (p, o) => p && <Layer key={`verticals_${o}`} color={p.color} poly={[p.x1, p.y1, p.x2, p.y1, p.s2, p.y2, p.s1, p.y2, radius]} {...layer} />
      )}
    </>
  );
};

export default Bricks;
