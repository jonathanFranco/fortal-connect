import {
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Color,
  CylinderGeometry,
  DirectionalLight,
  DynamicDrawUsage,
  EdgesGeometry,
  Float32BufferAttribute,
  Fog,
  GridHelper,
  Group,
  HemisphereLight,
  Line,
  LineBasicMaterial,
  LineDashedMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  PointsMaterial,
  Scene,
  Vector3,
} from "three";
import { createRenderer, startLoop, type SceneInit } from "./loop";
import {
  BLOCK,
  GRID,
  HALF,
  ROAD_HALF,
  STREETS,
  WRAP,
  carPose,
  lightAt,
  spawnCars,
  stepTraffic,
  type Light,
} from "./traffic";

const RING = WRAP * 2;

const CAR_COLORS = ["#e8e8e6", "#a3a8ad", "#26282c", "#b3262a", "#2f4e7a", "#5b6066"];

function bracketGeometry() {
  const c = 0.5;
  const l = 0.18;
  const v: number[] = [];
  for (const [sx, sy] of [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ]) {
    const x = sx * c;
    const y = sy * c;
    v.push(x, y, 0, x - sx * l, y, 0, x, y, 0, x, y - sy * l, 0);
  }
  const g = new BufferGeometry();
  g.setAttribute("position", new Float32BufferAttribute(v, 3));
  return g;
}

const init: SceneInit = (container, { reducedMotion, lowPower }) => {
  const renderer = createRenderer(container, lowPower);
  const scene = new Scene();
  scene.fog = new Fog(0x000000, 24, 46);
  const camera = new PerspectiveCamera(38, 1, 0.1, 120);
  const lookTarget = new Vector3();

  scene.add(new HemisphereLight(0xdfe6ff, 0x0c0c10, 1.6));
  const sun = new DirectionalLight(0xffffff, 1.4);
  sun.position.set(6, 12, 8);
  scene.add(sun);

  const disposables: { dispose(): void }[] = [];
  const track = <T extends { dispose(): void }>(x: T) => (disposables.push(x), x);

  const grid = new GridHelper(WRAP * 2.4, 48, 0x2a2d33, 0x16181c);
  track(grid.geometry);
  track(grid.material as LineBasicMaterial);
  scene.add(grid);

  const asphalt = track(new MeshBasicMaterial({ color: "#121418" }));
  const roadGeo = track(new PlaneGeometry(RING, ROAD_HALF * 2));
  roadGeo.rotateX(-Math.PI / 2);
  const dashMat = track(
    new LineDashedMaterial({ color: "#6a6f78", dashSize: 0.35, gapSize: 0.35 })
  );
  for (const s of STREETS) {
    for (const alongX of [true, false]) {
      const road = new Mesh(roadGeo, asphalt);
      road.position.set(alongX ? 0 : s, 0.004, alongX ? s : 0);
      if (!alongX) road.rotation.y = Math.PI / 2;
      scene.add(road);
      const lineGeo = track(
        new BufferGeometry().setFromPoints(
          alongX
            ? [new Vector3(-WRAP, 0.01, s), new Vector3(WRAP, 0.01, s)]
            : [new Vector3(s, 0.01, -WRAP), new Vector3(s, 0.01, WRAP)]
        )
      );
      const line = new Line(lineGeo, dashMat);
      line.computeLineDistances();
      scene.add(line);
    }
  }

  const faceMat = track(
    new MeshBasicMaterial({
      color: "#0b0c0e",
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    })
  );
  const edgeMat = track(new LineBasicMaterial({ color: "#c9c4be", transparent: true, opacity: 0.75 }));
  const unitBox = track(new BoxGeometry(1, 1, 1));
  unitBox.translate(0, 0.5, 0);
  const unitEdges = track(new EdgesGeometry(unitBox));
  for (let i = 0; i < GRID; i++) {
    for (let j = 0; j < GRID; j++) {
      const cx = STREETS[i] + BLOCK / 2;
      const cz = STREETS[j] + BLOCK / 2;
      const n = Math.random() < 0.4 ? 2 : 1;
      for (let k = 0; k < n; k++) {
        const w = n === 2 ? 1.1 + Math.random() * 0.2 : 2 + Math.random() * 0.9;
        const d = 2 + Math.random() * 0.9;
        const h = 0.7 + Math.random() * (Math.random() < 0.2 ? 3.4 : 1.8);
        const ox = n === 2 ? (k ? 0.8 : -0.8) : 0;
        const face = new Mesh(unitBox, faceMat);
        face.scale.set(w, h, d);
        face.position.set(cx + ox, 0, cz);
        const edges = new LineSegments(unitEdges, edgeMat);
        edges.scale.copy(face.scale);
        edges.position.copy(face.position);
        scene.add(face, edges);
      }
    }
  }

  type Signal = { xi: number; zi: number; alongX: boolean };
  const signals: Signal[] = [];
  const signalPos: number[] = [];
  STREETS.forEach((xs, xi) =>
    STREETS.forEach((zs, zi) => {
      for (const dir of [1, -1]) {
        signals.push({ xi, zi, alongX: true });
        signalPos.push(xs - dir * (ROAD_HALF + 0.15), 0.45, zs + dir * (ROAD_HALF + 0.15));
        signals.push({ xi, zi, alongX: false });
        signalPos.push(xs - dir * (ROAD_HALF + 0.15), 0.45, zs - dir * (ROAD_HALF + 0.15));
      }
    })
  );
  const signalGeo = track(new BufferGeometry());
  signalGeo.setAttribute("position", new Float32BufferAttribute(signalPos, 3));
  const signalColors = new BufferAttribute(new Float32Array(signals.length * 3), 3).setUsage(
    DynamicDrawUsage
  );
  signalGeo.setAttribute("color", signalColors);
  const signalMat = track(new PointsMaterial({ size: 0.22, vertexColors: true }));
  scene.add(new Points(signalGeo, signalMat));
  const LIGHT_RGB: Record<Light, Color> = {
    green: new Color("#3ddc84"),
    amber: new Color("#ffb020"),
    red: new Color("#ff3b3b"),
  };
  const paintSignals = (t: number) => {
    signals.forEach((s, k) => {
      const c = LIGHT_RGB[lightAt(t, s.xi, s.zi, s.alongX)];
      signalColors.setXYZ(k, c.r, c.g, c.b);
    });
    signalColors.needsUpdate = true;
  };

  const bodyGeo = track(new BoxGeometry(1, 0.2, 0.46));
  bodyGeo.translate(0, 0.16, 0);
  const cabinGeo = track(new BoxGeometry(0.52, 0.18, 0.42));
  cabinGeo.translate(-0.06, 0.35, 0);
  const roofGeo = track(new BoxGeometry(0.44, 0.03, 0.4));
  roofGeo.translate(-0.06, 0.455, 0);
  const wheelGeo = track(new CylinderGeometry(0.085, 0.085, 0.07, 12));
  wheelGeo.rotateX(Math.PI / 2);
  const lampGeo = track(new BoxGeometry(0.02, 0.05, 0.09));
  const glassMat = track(new MeshLambertMaterial({ color: "#16202c" }));
  const wheelMat = track(new MeshLambertMaterial({ color: "#0d0d0d" }));
  const headMat = track(new MeshBasicMaterial({ color: "#fff6e0" }));
  const paintMats = CAR_COLORS.map((c) => track(new MeshLambertMaterial({ color: c })));
  const bracketGeo = track(bracketGeometry());
  const TAIL_IDLE = new Color("#6e1212");
  const TAIL_BRAKE = new Color("#ff2a2a");

  const makeCarMesh = (paint: MeshLambertMaterial, tailMat: MeshBasicMaterial) => {
    const g = new Group();
    g.add(new Mesh(bodyGeo, paint), new Mesh(cabinGeo, glassMat), new Mesh(roofGeo, paint));
    for (const x of [-0.3, 0.3])
      for (const z of [-0.21, 0.21]) {
        const w = new Mesh(wheelGeo, wheelMat);
        w.position.set(x, 0.085, z);
        g.add(w);
      }
    for (const z of [-0.15, 0.15]) {
      const head = new Mesh(lampGeo, headMat);
      head.position.set(0.505, 0.18, z);
      const tail = new Mesh(lampGeo, tailMat);
      tail.position.set(-0.505, 0.18, z);
      g.add(head, tail);
    }
    return g;
  };

  const cars = spawnCars(lowPower ? 9 : 16);
  const visuals = cars.map((_, k) => {
    const tailMat = track(new MeshBasicMaterial({ color: TAIL_IDLE.clone() }));
    const bracketMat = track(new LineBasicMaterial({ color: "#ec3237", transparent: true }));
    const bracket = new LineSegments(bracketGeo, bracketMat);
    bracket.scale.setScalar(1.35);
    const obj = makeCarMesh(paintMats[k % paintMats.length], tailMat);
    scene.add(obj, bracket);
    return { obj, tailMat, bracket, bracketMat, seed: Math.random() * 10 };
  });

  const updateCars = (t: number, dt: number) => {
    stepTraffic(cars, t, dt);
    cars.forEach((c, k) => {
      const vis = visuals[k];
      const { x, z, heading } = carPose(c);
      vis.obj.position.set(x, 0, z);
      vis.obj.rotation.y = heading;
      vis.tailMat.color.copy(c.braking ? TAIL_BRAKE : TAIL_IDLE);
      vis.bracket.position.set(x, 0.3, z);
      vis.bracket.quaternion.copy(camera.quaternion);
      vis.bracketMat.opacity = 0.5 + 0.45 * Math.abs(Math.sin(t * 2.2 + vis.seed));
    });
  };

  const resize = (w: number, h: number) => {
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };

  const frame = (t: number, dt: number) => {
    const sweep = reducedMotion ? 0.3 : Math.sin(t * 0.16);
    camera.position.set(Math.sin(sweep * 0.8) * 15, 16, Math.cos(sweep * 0.8) * 15);
    lookTarget.set(sweep * 2, 0, sweep * -1.5);
    camera.lookAt(lookTarget);
    if (dt > 0 || reducedMotion) updateCars(t, dt || 0.016);
    paintSignals(t);
    renderer.render(scene, camera);
  };

  const loop = startLoop(container, renderer, reducedMotion, { resize, frame });

  return {
    setDark() {
    },
    dispose() {
      loop.stop();
      for (const d of disposables) d.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
};

export default init;
