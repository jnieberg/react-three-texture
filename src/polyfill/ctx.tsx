export const ctxRoundRect = function (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  if (Math.abs(w) < 2 * r) r = Math.abs(w) / 2;
  if (Math.abs(h) < 2 * r) r = Math.abs(h) / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  return ctx;
};

type VectorProp = {
  x: number;
  y: number;
  nx?: number;
  ny?: number;
  radius?: number;
  len?: number;
  ang?: number;
};
type VectorType = {
  x: number;
  y: number;
  nx: number;
  ny: number;
  radius: number;
  len: number;
  ang: number;
};

// ctx is the context to add the path to
// points is a array of points [{x :?, y: ?},...
// radius is the max rounding radius
// this creates a closed polygon.
// To draw you must call between
//    ctx.beginPath();
//    roundedPoly(ctx, points, radius);
//    ctx.stroke();
//    ctx.fill();
// as it only adds a path and does not render.
export const ctxRoundPoly2 = (ctx: CanvasRenderingContext2D, points: VectorProp[], radiusAll: number = 0) => {
  let i: number;
  let x: number;
  let y: number;
  let len: number;
  let p1: VectorType;
  let p2: VectorType;
  let p3: VectorType;
  let v1: VectorType;
  let v2: VectorType;
  let sinA: number;
  let sinA90: number;
  let radDirection: number;
  let drawDirection: boolean;
  let angle: number;
  let halfAngle: number;
  let cRadius: number;
  let lenOut: number;
  let radius: number;

  // convert 2 points into vector form, polar form, and normalised
  const asVec = function (p: VectorType, pp: VectorType, v: VectorType) {
    v.x = pp.x - p.x;
    v.y = pp.y - p.y;
    v.len = Math.sqrt(v.x * v.x + v.y * v.y);
    v.nx = v.x / v.len;
    v.ny = v.y / v.len;
    v.ang = Math.atan2(v.ny, v.nx);
  };
  radius = radiusAll;
  v1 = { x: 0, y: 0, nx: 0, ny: 0, radius: 0, len: 0, ang: 0 };
  v2 = { x: 0, y: 0, nx: 0, ny: 0, radius: 0, len: 0, ang: 0 };
  len = points.length;
  p1 = points[len - 1] as VectorType;
  // for each point
  for (i = 0; i < len; i++) {
    p2 = points[i % len] as VectorType;
    p3 = points[(i + 1) % len] as VectorType;
    //-----------------------------------------
    // Part 1
    asVec(p2, p1, v1);
    asVec(p2, p3, v2);
    sinA = v1.nx * v2.ny - v1.ny * v2.nx;
    sinA90 = v1.nx * v2.nx - v1.ny * -v2.ny;
    angle = Math.asin(sinA < -1 ? -1 : sinA > 1 ? 1 : sinA);
    //-----------------------------------------
    radDirection = 1;
    drawDirection = false;
    if (sinA90 < 0) {
      if (angle < 0) {
        angle = Math.PI + angle;
      } else {
        angle = Math.PI - angle;
        radDirection = -1;
        drawDirection = true;
      }
    } else {
      if (angle > 0) {
        radDirection = -1;
        drawDirection = true;
      }
    }
    if (p2.radius !== undefined) {
      radius = p2.radius;
    } else {
      radius = radiusAll;
    }
    //-----------------------------------------
    // Part 2
    halfAngle = angle / 2;
    //-----------------------------------------

    //-----------------------------------------
    // Part 3
    lenOut = Math.abs((Math.cos(halfAngle) * radius) / Math.sin(halfAngle));
    //-----------------------------------------

    //-----------------------------------------
    // Special part A
    if (lenOut > Math.min(v1.len / 2, v2.len / 2)) {
      lenOut = Math.min(v1.len / 2, v2.len / 2);
      cRadius = Math.abs((lenOut * Math.sin(halfAngle)) / Math.cos(halfAngle));
    } else {
      cRadius = radius;
    }
    //-----------------------------------------
    // Part 4
    x = p2.x + v2.nx * lenOut;
    y = p2.y + v2.ny * lenOut;
    //-----------------------------------------
    // Part 5
    x += -v2.ny * cRadius * radDirection;
    y += v2.nx * cRadius * radDirection;
    //-----------------------------------------
    // Part 6
    ctx.arc(x, y, cRadius, v1.ang + (Math.PI / 2) * radDirection, v2.ang - (Math.PI / 2) * radDirection, drawDirection);
    //-----------------------------------------
    p1 = p2;
    p2 = p3;
  }
  ctx.closePath();
};

type VecProp = {
  x: number;
  y: number;
};
export const ctxRoundPoly = (ctx: CanvasRenderingContext2D, points: VecProp[], radius: number) => {
  const distance = (p1: VecProp, p2: VecProp) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

  const lerp = (a: number, b: number, x: number) => a + (b - a) * x;

  const lerp2D = (p1: VecProp, p2: VecProp, t: number) => ({
    x: lerp(p1.x, p2.x, t),
    y: lerp(p1.y, p2.y, t),
  });

  const numPoints = points.length;

  let corners = [];
  for (let i = 0; i < numPoints; i++) {
    let lastPoint = points[i];
    let thisPoint = points[(i + 1) % numPoints];
    let nextPoint = points[(i + 2) % numPoints];

    let lastEdgeLength = distance(lastPoint, thisPoint);
    let lastOffsetDistance = Math.min(lastEdgeLength / 2, radius);
    let start = lerp2D(thisPoint, lastPoint, lastOffsetDistance / lastEdgeLength);

    let nextEdgeLength = distance(nextPoint, thisPoint);
    let nextOffsetDistance = Math.min(nextEdgeLength / 2, radius);
    let end = lerp2D(thisPoint, nextPoint, nextOffsetDistance / nextEdgeLength);

    corners.push([start, thisPoint, end]);
  }

  ctx.moveTo(corners[0][0].x, corners[0][0].y);
  for (let [start, ctrl, end] of corners) {
    ctx.lineTo(start.x, start.y);
    ctx.quadraticCurveTo(ctrl.x, ctrl.y, end.x, end.y);
  }

  ctx.closePath();
};
