export const rgbToHex = ([red, green, blue, alpha = 1.0]: number[]) => {
  var r = red & 0xff;
  var g = green & 0xff;
  var b = blue & 0xff;
  var a = Math.floor(alpha * 255) & 0xff;
  return a * 16777216 + b * 65536 + g * 256 + r;
};
