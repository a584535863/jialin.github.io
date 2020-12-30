export const Maf = {
  PI: Math.PI,
  TAU: Math.PI * 2,
  randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  },
  parabola(x: number, k: number): number {
    return Math.pow(4 * x * (1 - x), k);
  },
};
