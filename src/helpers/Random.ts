/* eslint-disable */
export default class Random {
  _seedString: string = "";
  seedSuffix: string = "";
  _seedAdd: number = 0;
  _rnd: () => number = () => 0;

  constructor(seedSuffix = "foo", seedString = "") {
    this.seedSuffix = seedSuffix;
    this.seed = seedString;
  }

  _setSeed(str: string) {
    for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i += 1) {
      (h = Math.imul(h ^ str.charCodeAt(i), 3432918353)), (h = (h << 13) | (h >>> 19));
    }
    this._seedAdd = (function () {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      return (h ^= h >>> 16) >>> 0;
    })();
  }

  get seed() {
    return this._seedString;
  }

  set seed(seedString) {
    this._seedString = `${seedString}_${this.seedSuffix}`;
    this._setSeed(this._seedString);
    this._rnd = () => {
      let t = (this._seedAdd += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    // return this;
  }

  float(minA = 1, maxA = 0) {
    const min = minA < maxA ? minA : maxA;
    const max = minA < maxA ? maxA : minA;
    return this._rnd() * (max - min) + min;
  }

  int(minA = 1, maxA = 0) {
    const min = minA < maxA ? minA : maxA;
    const max = minA < maxA ? maxA : minA;
    return Math.floor(this._rnd() * (max - min + 1) + min);
  }
}
