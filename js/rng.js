export class RNG {
  constructor(seed = Date.now()) {
    this.seed = seed >>> 0;
  }
  next() {
    this.seed = (1664525 * this.seed + 1013904223) % 4294967296;
    return this.seed / 4294967296;
  }
  nextInt(max) {
    return Math.floor(this.next() * max);
  }
}
