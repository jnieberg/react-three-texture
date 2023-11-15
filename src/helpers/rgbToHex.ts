export const rgbToHex = (red: number, green: number, blue: number, alpha: number = 1.0) => {
  var r = red & 0xff;
  var g = green & 0xff;
  var b = blue & 0xff;
  var a = Math.floor(alpha * 255) & 0xff;
  return a * 16777216 + b * 65536 + g * 256 + r;
};
