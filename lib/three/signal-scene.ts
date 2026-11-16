import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Line,
  LineBasicMaterial,
  PerspectiveCamera,
  Plane,
  Points,
  Raycaster,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
} from "three";
import { createRenderer, startLoop, trackPointer, type SceneInit } from "./loop";

const SPAN_X = 34;
const SPAN_Z = 28;

const init: SceneInit = (container, { reducedMotion, lowPower }) => {
  const renderer = createRenderer(container, lowPower);
  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 5, 12);
  camera.lookAt(0, 0, -3);

  const cols = lowPower ? 90 : 170;
  const rows = lowPower ? 60 : 110;
  const positions = new Float32Array(cols * rows * 3);
  for (let r = 0, k = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++, k += 3) {
      positions[k] = (c / (cols - 1) - 0.5) * SPAN_X;
      positions[k + 1] = 0;
      positions[k + 2] = (r / (rows - 1)) * -SPAN_Z + 8;
    }
  }
  const geo = new BufferGeometry();
  geo.setAttribute("position", new BufferAttribute(positions, 3));

  const uniforms = {
    uTime: { value: 0 },
    uRouter: { value: new Vector2(4, -4) },
    uSeeker: { value: new Vector2(-4, 0) },
    uSize: { value: 1 },
    uRed: { value: new Color("#ec3237") },
    uBase: { value: new Color("#8a909b") },
  };

  const mat = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms,
    vertexShader:  `
      uniform float uTime;
      uniform vec2 uRouter;
      uniform vec2 uSeeker;
      uniform float uSize;
      varying float vCrest;
      varying float vFade;
      void main() {
        vec3 p = position;
        float d1 = distance(p.xz, uRouter);
        float w1 = sin(d1 * 1.9 - uTime * 2.6) * exp(-d1 * 0.085);
        float d2 = distance(p.xz, uSeeker);
        float w2 = sin(d2 * 2.6 - uTime * 3.4) * exp(-d2 * 0.25) * 0.8;
        float w = w1 + w2;
        p.y += w * 0.42;
        vCrest = smoothstep(0.2, 0.95, w);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vFade = smoothstep(-34.0, -6.0, mv.z) * smoothstep(-1.0, -5.0, mv.z);
        gl_PointSize = uSize * (1.0 + vCrest * 1.8) * (34.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader:  `
      uniform vec3 uRed;
      uniform vec3 uBase;
      varying float vCrest;
      varying float vFade;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.15, d);
        vec3 col = mix(uBase, uRed, vCrest);
        gl_FragColor = vec4(col, a * vFade * (0.4 + 0.6 * vCrest));
      }`,
  });
  scene.add(new Points(geo, mat));

  const beamGeo = new BufferGeometry().setFromPoints([
    new Vector3(0, 0, 0),
    new Vector3(0, 2.6, 0),
  ]);
  const beamMat = new LineBasicMaterial({
    color: "#ec3237",
    transparent: true,
    opacity: 0.7,
    blending: AdditiveBlending,
  });
  const beam = new Line(beamGeo, beamMat);
  scene.add(beam);

  const resize = (w: number, h: number) => {
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const wide = camera.aspect > 1.1;
    uniforms.uRouter.value.set(wide ? 5.5 : 0, wide ? -4 : -6);
    beam.position.set(uniforms.uRouter.value.x, 0, uniforms.uRouter.value.y);
    uniforms.uSize.value = Math.max(0.8, (h / 800) * Math.min(window.devicePixelRatio, 2));
  };

  const { pointer, dispose: disposePointer } = trackPointer();
  const raycaster = new Raycaster();
  const plane = new Plane(new Vector3(0, 1, 0), 0);
  const ndc = new Vector2();
  const hit = new Vector3();
  const target = new Vector2();

  const frame = (t: number, dt: number) => {
    uniforms.uTime.value = reducedMotion ? 1.2 : t;
    const rect = container.getBoundingClientRect();
    const inside =
      pointer.active &&
      pointer.clientY >= rect.top &&
      pointer.clientY <= rect.bottom;
    if (inside) {
      ndc.set(
        ((pointer.clientX - rect.left) / rect.width) * 2 - 1,
        -((pointer.clientY - rect.top) / rect.height) * 2 + 1
      );
      raycaster.setFromCamera(ndc, camera);
      if (raycaster.ray.intersectPlane(plane, hit)) target.set(hit.x, hit.z);
    } else {
      target.set(Math.cos(t * 0.35) * 7, Math.sin(t * 0.5) * 3 - 2);
    }
    uniforms.uSeeker.value.lerp(target, Math.min(dt * 2.5, 1));
    beamMat.opacity = 0.45 + Math.sin(t * 4) * 0.25;
    renderer.render(scene, camera);
  };

  if (reducedMotion) uniforms.uTime.value = 1.2;
  const loop = startLoop(container, renderer, reducedMotion, { resize, frame });

  return {
    setDark() {
    },
    dispose() {
      loop.stop();
      disposePointer();
      geo.dispose();
      mat.dispose();
      beamGeo.dispose();
      beamMat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
};

export default init;
