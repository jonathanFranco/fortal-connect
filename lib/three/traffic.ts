export const BLOCK = 5;
export const GRID = 4;
export const HALF = (GRID * BLOCK) / 2;
export const STREETS = Array.from({ length: GRID + 1 }, (_, i) => -HALF + BLOCK * i);
export const ROAD_HALF = 0.8;
export const LANE = 0.34;
export const WRAP = HALF + 8;
const RING = WRAP * 2;

export const CAR_HALF = 0.5;
export const CAR_HALF_WIDTH = 0.23;
const MIN_GAP = 0.35;
const ACCEL = 2.2;
const BRAKE = 7;
const COMFORT_BRAKE = 4.5;
const STOP_OFFSET = ROAD_HALF + CAR_HALF + 0.08;
const BOX_LEN = 2 * ROAD_HALF + 2 * CAR_HALF + MIN_GAP;
const LINE_TOLERANCE = 0.05;

const GREEN = 3.8;
const AMBER = 1.1;
const ALL_RED = 1.4;
const HALF_CYCLE = GREEN + AMBER + ALL_RED;
const CYCLE = HALF_CYCLE * 2;

export type Light = "green" | "amber" | "red";
export const mod = (a: number, n: number) => ((a % n) + n) % n;

const offsets = STREETS.map((_, i) => STREETS.map((__, j) => mod(i * 2.3 + j * 3.1, CYCLE)));

export function lightAt(t: number, xi: number, zi: number, alongX: boolean): Light {
  const local = mod(t + offsets[xi][zi] + (alongX ? 0 : HALF_CYCLE), CYCLE);
  if (local < GREEN) return "green";
  if (local < GREEN + AMBER) return "amber";
  return "red";
}

export type Car = {
  alongX: boolean;
  laneIdx: number;
  dir: 1 | -1;
  pos: number;
  v: number;
  vmax: number;
  committedTo: number;
  braking: boolean;
};

export function spawnCars(total: number, random = Math.random): Car[] {
  const midpoints = [
    ...STREETS.slice(0, -1).map((s) => s + BLOCK / 2),
    -HALF - BLOCK / 2,
    HALF + BLOCK / 2,
  ];
  const lanes = STREETS.flatMap((_, laneIdx) =>
    [true, false].flatMap((alongX) => ([1, -1] as const).map((dir) => ({ laneIdx, alongX, dir })))
  ).sort(() => random() - 0.5);

  const cars: Car[] = [];
  for (let k = 0; k < total; k++) {
    const lane = lanes[k % lanes.length];
    const occupied = cars.filter(
      (c) => c.laneIdx === lane.laneIdx && c.alongX === lane.alongX && c.dir === lane.dir
    );
    const free = midpoints.filter((m) => !occupied.some((c) => Math.abs(c.pos - m) < 1));
    if (!free.length) continue;
    cars.push({
      ...lane,
      pos: free[Math.floor(random() * free.length)],
      v: 0,
      vmax: 2.2 + random() * 1.1,
      committedTo: -1,
      braking: false,
    });
  }
  return cars;
}

const sameLane = (a: Car, b: Car) =>
  a !== b && a.laneIdx === b.laneIdx && a.alongX === b.alongX && a.dir === b.dir;

export function stepTraffic(cars: Car[], t: number, dt: number) {
  for (const c of cars) {
    let free = Infinity;
    for (const o of cars) {
      if (!sameLane(c, o)) continue;
      free = Math.min(free, mod((o.pos - c.pos) * c.dir, RING) - 2 * CAR_HALF - MIN_GAP);
    }

    let stopDist = free;
    let nearest = Infinity;
    let crossIdx = -1;
    STREETS.forEach((s, idx) => {
      const raw = mod((s - c.dir * STOP_OFFSET - c.pos) * c.dir, RING);
      const ds = raw > RING - LINE_TOLERANCE ? raw - RING : raw;
      if (ds < nearest) {
        nearest = ds;
        crossIdx = idx;
      }
    });
    if (nearest > 3) c.committedTo = -1;
    if (nearest < 6) {
      const xi = c.alongX ? crossIdx : c.laneIdx;
      const zi = c.alongX ? c.laneIdx : crossIdx;
      const light = lightAt(t, xi, zi, c.alongX);
      const canStop = (c.v * c.v) / (2 * COMFORT_BRAKE) <= nearest;
      if (light === "amber" && !canStop) c.committedTo = crossIdx;
      const committed = c.committedTo === crossIdx;
      const mustStop =
        (!committed && light !== "green") ||
        free < nearest + BOX_LEN;
      if (mustStop) stopDist = Math.min(stopDist, Math.max(nearest, 0));
      else if (nearest < 0.6) c.committedTo = crossIdx;
    }

    const limit = stopDist <= 0 ? 0 : Math.sqrt(2 * BRAKE * stopDist);
    const prev = c.v;
    c.v = Math.min(c.v + ACCEL * dt, c.vmax, limit);
    c.pos += c.dir * c.v * dt;
    if (c.pos * c.dir > WRAP) c.pos -= c.dir * RING;
    c.braking = c.v < prev - 0.005 || (c.v < 0.05 && stopDist < 1);
  }
}

export function carPose(c: Car) {
  const street = STREETS[c.laneIdx];
  return {
    x: c.alongX ? c.pos : street - LANE * c.dir,
    z: c.alongX ? street + LANE * c.dir : c.pos,
    heading: c.alongX ? (c.dir > 0 ? 0 : Math.PI) : c.dir > 0 ? -Math.PI / 2 : Math.PI / 2,
  };
}
