export function randomInt() {
  const low = 100000;
  const high = 999999;
  return Math.floor(Math.random() * (high - low) + low);
}
