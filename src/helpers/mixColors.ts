export const mixColors = (c1: number[], c2: number[], factor: number) => {
  const [r1, g1, b1, a1] = c1;
  const [r2, g2, b2, a2] = c2;
  const mix = (start: number, end: number) => {
    return start + factor * (end - start);
  };
  var red = Math.round(mix(r1, r2));
  var green = Math.round(mix(g1, g2));
  var blue = Math.round(mix(b1, b2));
  var alpha = Math.round(mix(a1, a2));
  return [red, green, blue, alpha];
};
