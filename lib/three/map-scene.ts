import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  EllipseCurve,
  Group,
  Line,
  LineBasicMaterial,
  LineLoop,
  LineSegments,
  MathUtils,
  Matrix3,
  NormalBlending,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector3,
} from "three";
import { BRAZIL, CEARA, FORTALEZA } from "./geo-data";
import { createRenderer, startLoop, trackPointer, type SceneInit } from "./loop";

const RADIUS = 2.4;
const CAMERA_Z = 9;
const NEIGHBORS = 3;
const RINGS = 3;

const lons = BRAZIL.map((p) => p[0]);
const lats = BRAZIL.map((p) => p[1]);
const LON0 = (Math.min(...lons) + Math.max(...lons)) / 2;
const LAT0 = (Math.min(...lats) + Math.max(...lats)) / 2;
const COS0 = Math.cos(MathUtils.degToRad(LAT0));
const K = 4.4 / (Math.max(...lats) - Math.min(...lats));
const project = (lon: number, lat: number) =>
  new Vector3((lon - LON0) * COS0 * K, (lat - LAT0) * K, 0);

function inside([lon, lat]: [number, number], ring: [number, number][]) {
  let hit = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

function dotRows(ring: [number, number][], step: number) {
  const ls = ring.map((p) => p[1]);
  const os = ring.map((p) => p[0]);
  const rows: [number, number][][] = [];
  for (let lat = Math.max(...ls); lat >= Math.min(...ls); lat -= step) {
    const row: [number, number][] = [];
    for (let lon = Math.min(...os); lon <= Math.max(...os); lon += step / COS0) {
      if (inside([lon, lat], ring)) row.push([lon, lat]);
    }
    if (row.length) rows.push(row);
  }
  return rows;
}

const ease = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
const easeInOut = (x: number) =>
  x <= 0 ? 0 : x >= 1 ? 1 : x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

const PALETTE = {
  dark: { line: "#7d828c", node: "#f3eee9", outline: "#9aa0aa", red: "#ec3237" },
  light: { line: "#2a2e35", node: "#1a1d22", outline: "#3a3d42", red: "#e3262c" },
};

const DEPTH_GLSL =  `
  float depthFade(float z) { return smoothstep(-11.6, -6.4, z); }
`;

const init: SceneInit = (container, { dark, reducedMotion, lowPower, onView }) => {
  const renderer = createRenderer(container, lowPower);
  const scene = new Scene();
  const camera = new PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.z = CAMERA_Z;

  const root = new Group();
  const tilt = new Group();
  const zoom = new Group();
  const content = new Group();
  const spin = new Group();
  root.add(tilt);
  tilt.add(zoom);
  zoom.add(content);
  content.add(spin);
  scene.add(root);

  const disposables: { dispose(): void }[] = [];
  const track = <T extends { dispose(): void }>(x: T) => (disposables.push(x), x);

  const rows = dotRows(BRAZIL, lowPower ? 1.9 : 1.35);
  const mapDots = rows.flat();
  const count = mapDots.length;

  const golden = Math.PI * (3 - Math.sqrt(5));
  const sphere = Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    return new Vector3(Math.cos(golden * i) * r, y, Math.sin(golden * i) * r).multiplyScalar(
      RADIUS * (1 + (Math.random() - 0.5) * 0.12)
    );
  });

  const bySphereY = sphere.map((_, i) => i).sort((a, b) => sphere[b].y - sphere[a].y);
  const aSphere = new Float32Array(count * 3);
  const aMap = new Float32Array(count * 3);
  const aDelay = new Float32Array(count);
  const aSize = new Float32Array(count);
  const aSeed = new Float32Array(count);
  const aInCE = new Float32Array(count);
  const xs = mapDots.map(([lon, lat]) => project(lon, lat).x);
  const minX = Math.min(...xs);
  const spanX = Math.max(...xs) - minX;
  let k = 0;
  for (const row of rows) {
    const chunk = bySphereY.slice(k, k + row.length).sort((a, b) => sphere[a].x - sphere[b].x);
    row.forEach((dot, j) => {
      const idx = k + j;
      const s = sphere[chunk[j]];
      const m = project(dot[0], dot[1]);
      s.toArray(aSphere, idx * 3);
      m.toArray(aMap, idx * 3);
      aDelay[idx] = (m.x - minX) / spanX;
      const hub = Math.random() < 0.1;
      aSize[idx] = hub ? 2.2 : 0.9 + Math.random() * 0.5;
      aSeed[idx] = Math.random();
      aInCE[idx] = inside(dot, CEARA) ? 1 : 0;
    });
    k += row.length;
  }

  const dotGeo = track(new BufferGeometry());
  dotGeo.setAttribute("position", new BufferAttribute(aMap, 3));
  dotGeo.setAttribute("aSphere", new BufferAttribute(aSphere, 3));
  dotGeo.setAttribute("aMap", new BufferAttribute(aMap, 3));
  dotGeo.setAttribute("aDelay", new BufferAttribute(aDelay, 1));
  dotGeo.setAttribute("aSize", new BufferAttribute(aSize, 1));
  dotGeo.setAttribute("aSeed", new BufferAttribute(aSeed, 1));
  dotGeo.setAttribute("aInCE", new BufferAttribute(aInCE, 1));
  const dotMat = track(
    new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uSpin: { value: new Matrix3() },
        uMorph: { value: 0 },
        uFocus: { value: 0 },
        uTime: { value: 0 },
        uScale: { value: 1 },
        uBase: { value: new Color() },
        uHub: { value: new Color() },
      },
      vertexShader:  `
        ${DEPTH_GLSL}
        uniform mat3 uSpin;
        uniform float uMorph, uFocus, uTime, uScale;
        attribute vec3 aSphere, aMap;
        attribute float aDelay, aSize, aSeed, aInCE;
        varying float vAlpha, vHub;
        void main() {
          float p = clamp(uMorph * 1.6 - aDelay * 0.6, 0.0, 1.0);
          p = p * p * (3.0 - 2.0 * p);
          vec3 pos = mix(uSpin * aSphere, aMap, p);
          pos.z += sin(p * 3.14159) * 0.9;
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          float depth = depthFade(mv.z);
          float twinkle = 0.7 + 0.3 * sin(uTime * (1.5 + aSeed * 2.0) + aSeed * 6.2831);
          vAlpha = mix(0.12 + 0.88 * depth, 1.0, p) * twinkle;
          vAlpha *= mix(1.0, 0.3, uFocus) * (1.0 - aInCE * uFocus);
          vHub = step(2.0, aSize);
          gl_PointSize = aSize * uScale * mix(0.55 + 0.45 * depth, 0.8, p) * (90.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader:  `
        uniform vec3 uBase, uHub;
        varying float vAlpha, vHub;
        void main() {
          float a = pow(smoothstep(0.5, 0.0, length(gl_PointCoord - 0.5)), 1.5);
          gl_FragColor = vec4(mix(uBase, uHub, vHub), a * vAlpha);
        }`,
    })
  );
  const dots = new Points(dotGeo, dotMat);
  dots.frustumCulled = false;
  content.add(dots);

  const edgeList: number[] = [];
  const seen = new Set<number>();
  for (let i = 0; i < count; i++) {
    const nearest = sphere
      .map((n, j) => [j, j === i ? Infinity : n.distanceToSquared(sphere[i])] as const)
      .sort((a, b) => a[1] - b[1])
      .slice(0, NEIGHBORS);
    for (const [j] of nearest) {
      const key = Math.min(i, j) * count + Math.max(i, j);
      if (seen.has(key)) continue;
      seen.add(key);
      edgeList.push(i, j);
    }
  }
  const edgePos = new Float32Array(edgeList.length * 3);
  edgeList.forEach((n, e) => sphere[n].toArray(edgePos, e * 3));
  const edgeGeo = track(new BufferGeometry());
  edgeGeo.setAttribute("position", new BufferAttribute(edgePos, 3));
  const edgeMat = track(
    new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uColor: { value: new Color() }, uOpacity: { value: 0.3 } },
      vertexShader:  `
        ${DEPTH_GLSL}
        varying float vDepth;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vDepth = depthFade(mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader:  `
        uniform vec3 uColor;
        uniform float uOpacity;
        varying float vDepth;
        void main() { gl_FragColor = vec4(uColor, uOpacity * (0.15 + 0.85 * vDepth)); }`,
    })
  );
  spin.add(new LineSegments(edgeGeo, edgeMat));

  const outline = (ring: [number, number][]) => {
    const pts = [...ring, ring[0]].map(([lon, lat]) => project(lon, lat));
    const geo = track(new BufferGeometry().setFromPoints(pts));
    const mat = track(new LineBasicMaterial({ transparent: true, depthWrite: false }));
    const line = new Line(geo, mat);
    line.frustumCulled = false;
    content.add(line);
    return { geo, mat, n: pts.length };
  };
  const brOutline = outline(BRAZIL);
  const ceOutline = outline(CEARA);

  const fort = project(FORTALEZA[0], FORTALEZA[1]);
  const ceDotsLL = dotRows(CEARA, lowPower ? 0.28 : 0.2).flat();
  const cePos = new Float32Array(ceDotsLL.length * 3);
  const ceDist = new Float32Array(ceDotsLL.length);
  const ceSeed = new Float32Array(ceDotsLL.length);
  const cePts = ceDotsLL.map(([lon, lat]) => project(lon, lat));
  const maxDist = Math.max(...cePts.map((p) => p.distanceTo(fort)));
  cePts.forEach((p, i) => {
    p.toArray(cePos, i * 3);
    ceDist[i] = p.distanceTo(fort) / maxDist;
    ceSeed[i] = Math.random();
  });
  const ceGeo = track(new BufferGeometry());
  ceGeo.setAttribute("position", new BufferAttribute(cePos, 3));
  ceGeo.setAttribute("aDist", new BufferAttribute(ceDist, 1));
  ceGeo.setAttribute("aSeed", new BufferAttribute(ceSeed, 1));
  const ceMat = track(
    new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uReveal: { value: 0 },
        uTime: { value: 0 },
        uScale: { value: 1 },
        uBase: { value: new Color() },
        uRed: { value: new Color() },
      },
      vertexShader:  `
        uniform float uReveal, uTime, uScale;
        attribute float aDist, aSeed;
        varying float vAlpha, vRed;
        void main() {
          float front = uReveal - aDist;
          float vis = smoothstep(0.0, 0.06, front);
          float wave = 1.0 - smoothstep(0.0, 0.22, front);
          float hub = step(0.9, aSeed);
          float twinkle = 0.75 + 0.25 * sin(uTime * (1.2 + aSeed * 2.0) + aSeed * 6.2831);
          vRed = max(wave * vis, hub);
          vAlpha = vis * twinkle;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = uScale * (0.8 + wave * vis * 1.2 + hub * 0.7) * (90.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader:  `
        uniform vec3 uBase, uRed;
        varying float vAlpha, vRed;
        void main() {
          float a = pow(smoothstep(0.5, 0.0, length(gl_PointCoord - 0.5)), 1.4);
          gl_FragColor = vec4(mix(uBase, uRed, vRed), a * vAlpha);
        }`,
    })
  );
  const ceDots = new Points(ceGeo, ceMat);
  ceDots.frustumCulled = false;
  content.add(ceDots);

  const pinGeo = track(new BufferGeometry().setFromPoints([fort.clone().setZ(0.002)]));
  const pinMat = track(
    new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uColor: { value: new Color() }, uSize: { value: 0 } },
      vertexShader:  `
        uniform float uSize;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = uSize * (90.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader:  `
        uniform vec3 uColor;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float core = smoothstep(0.22, 0.12, d);
          float glow = pow(smoothstep(0.5, 0.0, d), 2.0) * 0.8;
          gl_FragColor = vec4(mix(uColor, vec3(1.0), core * 0.7), max(core, glow));
        }`,
    })
  );
  const pin = new Points(pinGeo, pinMat);
  pin.frustumCulled = false;
  content.add(pin);

  const ringGeo = track(
    new BufferGeometry().setFromPoints(new EllipseCurve(0, 0, 1, 1, 0, Math.PI * 2).getPoints(64))
  );
  const rings = Array.from({ length: RINGS }, () => {
    const mat = track(new LineBasicMaterial({ transparent: true, depthWrite: false }));
    const ring = new LineLoop(ringGeo, mat);
    ring.position.copy(fort);
    content.add(ring);
    return { ring, mat };
  });

  const blendables = [dotMat, edgeMat, ceMat, pinMat, brOutline.mat, ceOutline.mat, ...rings.map((r) => r.mat)];
  const applyTheme = (isDark: boolean) => {
    const c = isDark ? PALETTE.dark : PALETTE.light;
    dotMat.uniforms.uBase.value.set(c.node);
    dotMat.uniforms.uHub.value.set(c.red);
    edgeMat.uniforms.uColor.value.set(c.line);
    edgeMat.uniforms.uOpacity.value = isDark ? 0.32 : 0.22;
    ceMat.uniforms.uBase.value.set(c.node);
    ceMat.uniforms.uRed.value.set(c.red);
    pinMat.uniforms.uColor.value.set(c.red);
    brOutline.mat.color.set(c.outline);
    ceOutline.mat.color.set(c.red);
    rings.forEach(({ mat }) => mat.color.set(c.red));
    for (const m of blendables) {
      m.blending = isDark ? AdditiveBlending : NormalBlending;
      m.needsUpdate = true;
    }
  };
  applyTheme(dark);

  const ceLats = CEARA.map((p) => p[1]);
  const ceLons = CEARA.map((p) => p[0]);
  const ceCenter = project(
    (Math.min(...ceLons) + Math.max(...ceLons)) / 2,
    (Math.min(...ceLats) + Math.max(...ceLats)) / 2
  );
  const ceHeight = (Math.max(...ceLats) - Math.min(...ceLats)) * K;
  const ZOOM = (RADIUS * 1.75) / ceHeight;

  let portrait = false;
  let baseY = 0;
  const resize = (w: number, h: number) => {
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const viewH = 2 * Math.tan(MathUtils.degToRad(camera.fov / 2)) * CAMERA_Z;
    const viewW = viewH * camera.aspect;
    portrait = camera.aspect < 1.05;
    if (portrait) {
      const s = Math.min(1.1, (Math.min(viewW, viewH) * 0.9) / (RADIUS * 2));
      root.scale.setScalar(s);
      root.position.set(0, 0, 0);
      baseY = 0;
    } else {
      const s = Math.min(0.95, (viewH * 0.6) / (RADIUS * 2));
      root.scale.setScalar(s);
      root.position.set(Math.min(viewW * 0.25, viewW / 2 - RADIUS * s * 1.25), 0.1, 0);
      baseY = 0.1;
    }
    const px = Math.max(0.7, (h / (portrait ? 520 : 900)) * Math.min(window.devicePixelRatio, 2));
    dotMat.uniforms.uScale.value = px;
    ceMat.uniforms.uScale.value = px;
  };

  const VIEWS: Record<string, { m: number; z: number }> = {
    globo: { m: 0, z: 0 },
    brasil: { m: 1, z: 0 },
    ceara: { m: 1, z: 1 },
  };
  const MORPH_SPEED = 1 / 2.4;
  const ZOOM_SPEED = 1 / 1.9;
  const target = { m: 0, z: 0 };
  const prog = { m: 0, z: 0 };
  let touring = !reducedMotion;

  const go = (view: string) => {
    const v = VIEWS[view];
    if (!v) return;
    target.m = v.m;
    target.z = v.z;
    if (reducedMotion) {
      prog.m = v.m;
      prog.z = v.z;
    }
  };

  const advance = (dt: number) => {
    if (target.z < prog.z) prog.z = Math.max(target.z, prog.z - ZOOM_SPEED * dt);
    else if (target.z > prog.z && prog.m >= 1)
      prog.z = Math.min(target.z, prog.z + ZOOM_SPEED * dt);
    if (target.m > prog.m) prog.m = Math.min(target.m, prog.m + MORPH_SPEED * dt);
    else if (target.m < prog.m && prog.z <= 0)
      prog.m = Math.max(target.m, prog.m - MORPH_SPEED * dt);
  };

  const { pointer, dispose: disposePointer } = trackPointer();
  const mouse = { x: 0, y: 0 };
  let spinAngle = 0;
  const spinMatrix = new Matrix3();

  const frame = (t: number, dt: number) => {
    if (touring) {
      if (t >= 1.2 && target.m === 0) {
        go("brasil");
        onView?.("brasil");
      } else if (prog.m >= 1 && t >= 4 && target.z === 0) {
        go("ceara");
        onView?.("ceara");
        touring = false;
      }
    }
    advance(dt);

    const morphE = ease(prog.m);
    const z = easeInOut(prog.z);
    const brDraw = ease((prog.m - 0.55) / 0.45);
    const ceDraw = ease((prog.z - 0.1) / 0.65);
    const reveal = ((prog.z - 0.2) / 0.8) * 1.25;
    const pinIn = Math.max(0.85 * ease((prog.m - 0.85) / 0.15), ease((prog.z - 0.5) / 0.5));

    const boost = Math.max(0, 1 - t / 1.5);
    spinAngle += dt * (0.3 + 0.65 * boost) * (1 - morphE);
    spin.rotation.y = spinAngle;
    spin.updateMatrix();
    spinMatrix.setFromMatrix4(spin.matrix);
    dotMat.uniforms.uSpin.value.copy(spinMatrix);

    dotMat.uniforms.uMorph.value = prog.m;
    dotMat.uniforms.uFocus.value = z;
    dotMat.uniforms.uTime.value = t;
    edgeMat.uniforms.uOpacity.value = (dark ? 0.32 : 0.22) * (1 - ease(prog.m * 2.2));
    brOutline.geo.setDrawRange(0, Math.max(0, Math.floor(brOutline.n * brDraw)));
    brOutline.mat.opacity = 0.65 * brDraw * (1 - 0.6 * z);
    ceOutline.geo.setDrawRange(0, Math.max(0, Math.floor(ceOutline.n * ceDraw)));
    ceOutline.mat.opacity = 0.9 * ceDraw;
    ceMat.uniforms.uReveal.value = Math.max(0, reveal);
    ceMat.uniforms.uTime.value = t;
    pinMat.uniforms.uSize.value = 5 * pinIn * (1 + 0.12 * Math.sin(t * 4));
    rings.forEach(({ ring, mat }, i) => {
      const ph = (t * 0.35 + i / RINGS) % 1;
      ring.scale.setScalar((0.03 + ph * 0.16) * MathUtils.lerp(2.5, 1, z));
      mat.opacity = Math.sin(ph * Math.PI) * 0.75 * pinIn;
    });

    tilt.rotation.x = MathUtils.lerp(0.32, -0.5, morphE);
    tilt.rotation.z = MathUtils.lerp(0.12, 0, morphE);
    zoom.scale.setScalar(MathUtils.lerp(1, ZOOM, z));
    content.position.copy(ceCenter).multiplyScalar(-z);

    const follow = Math.min(dt * 3, 1);
    mouse.x += ((pointer.active ? -pointer.y * 0.25 : 0) - mouse.x) * follow;
    mouse.y += ((pointer.active ? pointer.x * 0.35 : 0) - mouse.y) * follow;
    root.rotation.set(mouse.x, mouse.y, 0);

    root.position.y = baseY + (portrait ? morphE * 0.27 - z * 0.09 : 0);

    const rect = container.getBoundingClientRect();
    const scroll = portrait ? 0 : MathUtils.clamp(-rect.top / Math.max(rect.height, 1), 0, 1);
    camera.position.z = CAMERA_Z + scroll * 2.5;
    camera.position.y = -scroll * 1.2;

    renderer.render(scene, camera);
  };

  if (reducedMotion) {
    go("ceara");
    onView?.("ceara");
  }
  const loop = startLoop(container, renderer, reducedMotion, { resize, frame });

  return {
    setDark(isDark) {
      dark = isDark;
      applyTheme(isDark);
      loop.redraw();
    },
    setView(view) {
      touring = false;
      go(view);
      loop.redraw();
    },
    dispose() {
      loop.stop();
      disposePointer();
      for (const d of disposables) d.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
};

export default init;
