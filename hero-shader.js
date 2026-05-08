/* =============================================================
   UX Meas — hero-shader.js
   Simplex-noise WebGL hero field. Vanilla, no dependencies.
   ~140 lines. Falls back silently if WebGL is unavailable.
   ============================================================= */

(function () {
  'use strict';

  const canvas = document.querySelector('.hero-shader');
  if (!canvas) return;

  const gl = canvas.getContext('webgl', { antialias: false, alpha: true, premultipliedAlpha: true });
  if (!gl) { canvas.classList.add('webgl-disabled'); return; }

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const vsSrc = [
    'attribute vec2 a_position;',
    'void main() { gl_Position = vec4(a_position, 0.0, 1.0); }'
  ].join('\n');

  // Fragment shader — Simplex 2D noise (public-domain Ashima / Gustavson port)
  // → FBM → tri-stop colour blend
  const fsSrc = [
    'precision highp float;',
    'uniform vec2  u_resolution;',
    'uniform vec2  u_pointer;',
    'uniform float u_time;',
    'uniform vec3  u_dark;',
    'uniform vec3  u_accent;',
    'uniform vec3  u_teal;',
    '',
    'vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }',
    'vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }',
    'vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }',
    '',
    'float snoise(vec2 v) {',
    '  const vec4 C = vec4(0.211324865405187, 0.366025403784439,',
    '                     -0.577350269189626, 0.024390243902439);',
    '  vec2 i  = floor(v + dot(v, C.yy));',
    '  vec2 x0 = v - i + dot(i, C.xx);',
    '  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);',
    '  vec4 x12 = x0.xyxy + C.xxzz;',
    '  x12.xy -= i1;',
    '  i = mod289(i);',
    '  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))',
    '                          + i.x + vec3(0.0, i1.x, 1.0));',
    '  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);',
    '  m = m*m; m = m*m;',
    '  vec3 x = 2.0 * fract(p * C.www) - 1.0;',
    '  vec3 h = abs(x) - 0.5;',
    '  vec3 ox = floor(x + 0.5);',
    '  vec3 a0 = x - ox;',
    '  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);',
    '  vec3 g;',
    '  g.x  = a0.x  * x0.x  + h.x  * x0.y;',
    '  g.yz = a0.yz * x12.xz + h.yz * x12.yw;',
    '  return 130.0 * dot(m, g);',
    '}',
    '',
    'float fbm(vec2 p) {',
    '  float v = 0.0, a = 0.5;',
    '  for (int i = 0; i < 3; i++) { v += a * snoise(p); p *= 2.0; a *= 0.5; }',
    '  return v;',
    '}',
    '',
    'void main() {',
    '  vec2 uv = gl_FragCoord.xy / u_resolution.xy;',
    '  vec2 p  = (uv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);',
    '  vec2 ptr = (u_pointer - 0.5) * 0.04;',
    '  float n1 = fbm((p + ptr) * 1.6 + u_time * 0.04);',
    '  float n2 = fbm((p - ptr) * 2.4 - u_time * 0.06 + 100.0);',
    '  float n  = (n1 + n2) * 0.5;',
    '  float t1 = smoothstep(-0.30, 0.40, n);',
    '  float t2 = smoothstep( 0.05, 0.70, n);',
    '  vec3 col = mix(u_dark, u_teal, t1);',
    '  col = mix(col, u_accent, t2 * 0.6);',
    '  float vig = smoothstep(0.95, 0.30, length(p));',
    '  col = mix(u_dark, col, vig * 0.65);',
    '  gl_FragColor = vec4(col, 1.0);',
    '}'
  ].join('\n');

  function compile(type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.warn('[hero-shader] compile error:', gl.getShaderInfoLog(sh));
      return null;
    }
    return sh;
  }

  const vs = compile(gl.VERTEX_SHADER, vsSrc);
  const fs = compile(gl.FRAGMENT_SHADER, fsSrc);
  if (!vs || !fs) { canvas.classList.add('webgl-disabled'); return; }

  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    canvas.classList.add('webgl-disabled');
    return;
  }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, 'a_position');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uRes  = gl.getUniformLocation(prog, 'u_resolution');
  const uPtr  = gl.getUniformLocation(prog, 'u_pointer');
  const uTime = gl.getUniformLocation(prog, 'u_time');
  const uDark = gl.getUniformLocation(prog, 'u_dark');
  const uAcc  = gl.getUniformLocation(prog, 'u_accent');
  const uTeal = gl.getUniformLocation(prog, 'u_teal');

  // Theme-adaptive palette — re-read on prefers-color-scheme change
  function setPalette() {
    const isDark = matchMedia('(prefers-color-scheme: dark)').matches
                 || document.documentElement.dataset.theme === 'dark';
    const accent = isDark ? [0.498, 0.784, 1.000] : [0.118, 0.435, 0.722]; // #7FC8FF / #1E6FB8
    const teal   = isDark ? [0.20,  0.55, 0.65]   : [0.30,  0.55, 0.65];
    const dark   = isDark ? [0.07,  0.07, 0.075]  : [0.96,  0.95, 0.94];
    gl.uniform3fv(uDark, dark);
    gl.uniform3fv(uAcc,  accent);
    gl.uniform3fv(uTeal, teal);
  }
  setPalette();
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setPalette);

  let pointer = [0.5, 0.5], pointerTarget = [0.5, 0.5];
  const heroEl = canvas.parentElement;
  heroEl.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    pointerTarget[0] = (e.clientX - r.left) / r.width;
    pointerTarget[1] = 1.0 - (e.clientY - r.top) / r.height;
  });

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = canvas.getBoundingClientRect();
    canvas.width  = Math.max(1, Math.floor(r.width  * dpr));
    canvas.height = Math.max(1, Math.floor(r.height * dpr));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, canvas.width, canvas.height);
  }
  window.addEventListener('resize', resize);
  resize();

  let start = performance.now(), raf = null, isVisible = true;
  function render(now) {
    pointer[0] += (pointerTarget[0] - pointer[0]) * 0.06;
    pointer[1] += (pointerTarget[1] - pointer[1]) * 0.06;
    gl.uniform2f(uPtr, pointer[0], pointer[1]);
    gl.uniform1f(uTime, (now - start) / 1000.0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    if (!reducedMotion && isVisible) raf = requestAnimationFrame(render);
  }

  if (reducedMotion) {
    // Single static frame, no animation loop
    requestAnimationFrame((now) => {
      gl.uniform2f(uPtr, 0.5, 0.5);
      gl.uniform1f(uTime, 1.0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    });
  } else {
    raf = requestAnimationFrame(render);
    // Pause when scrolled off-screen — animation tax stays at zero past the hero
    new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        isVisible = e.isIntersecting;
        if (isVisible && !raf) {
          start = performance.now();
          raf = requestAnimationFrame(render);
        } else if (!isVisible && raf) {
          cancelAnimationFrame(raf); raf = null;
        }
      });
    }, { threshold: 0 }).observe(canvas);
  }
})();
