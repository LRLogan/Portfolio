// Fixed contour-map background inspired by the original p5 sketch.
// Tweak this CONFIG object to change the density, speed, colors, and glow.
const CONFIG = {
  cellSize: 11,
  levels: 9,
  noiseScale: 0.055,
  speed: 0.003,
  lineWidth: 1.0,
  lineAlpha: 0.72,
  backgroundAlpha: 0.1,
  colors: ["#0c1115", "#20272d", "#07a2f5", "#ff9500"]
};

export function createContourBackground(canvas) {
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return { stop() {} };
  }

  const context = canvas.getContext("2d", { alpha: true });
  let animationFrame = 0;
  let time = 0;
  let width = 0;
  let height = 0;
  let cols = 0;
  let rows = 0;
  let field = [];

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.ceil(width * dpr);
    canvas.height = Math.ceil(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(width / CONFIG.cellSize);
    rows = Math.ceil(height / CONFIG.cellSize);
  }

  function draw() {
    time += CONFIG.speed;
    generateField();
    drawBackground();
    drawContours();
    animationFrame = requestAnimationFrame(draw);
  }

  function generateField() {
    field = [];
    for (let y = 0; y <= rows; y += 1) {
      field[y] = [];
      for (let x = 0; x <= cols; x += 1) {
        field[y][x] = fractalNoise(x * CONFIG.noiseScale, y * CONFIG.noiseScale, time);
      }
    }
  }

  function drawBackground() {
    const gradient = context.createRadialGradient(width * 0.7, height * 0.28, 0, width * 0.5, height * 0.5, width);
    gradient.addColorStop(0, CONFIG.colors[1]);
    gradient.addColorStop(1, CONFIG.colors[0]);

    context.clearRect(0, 0, width, height);
    context.globalAlpha = CONFIG.backgroundAlpha;
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
    context.globalAlpha = 1;
  }

  function drawContours() {
    context.save();
    context.globalCompositeOperation = "screen";
    context.globalAlpha = CONFIG.lineAlpha;
    context.lineWidth = CONFIG.lineWidth;
    context.shadowBlur = 12;
    context.shadowColor = CONFIG.colors[3];

    for (let i = 1; i <= CONFIG.levels; i += 1) {
      const threshold = i / (CONFIG.levels + 1);
      context.strokeStyle = mixColor(CONFIG.colors[2], CONFIG.colors[3], threshold);
      traceContourSegments(threshold);
    }

    context.restore();
  }

  function traceContourSegments(threshold) {
    context.beginPath();

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const segments = getSegments(x, y, threshold);
        segments.forEach(([start, end]) => {
          context.moveTo(start.x, start.y);
          context.lineTo(end.x, end.y);
        });
      }
    }

    context.stroke();
  }

  function getSegments(x, y, threshold) {
    const x0 = x * CONFIG.cellSize;
    const y0 = y * CONFIG.cellSize;
    const x1 = (x + 1) * CONFIG.cellSize;
    const y1 = (y + 1) * CONFIG.cellSize;
    const tl = field[y][x];
    const tr = field[y][x + 1];
    const br = field[y + 1][x + 1];
    const bl = field[y + 1][x];
    const top = interpolatePoint(x0, y0, x1, y0, tl, tr, threshold);
    const right = interpolatePoint(x1, y0, x1, y1, tr, br, threshold);
    const bottom = interpolatePoint(x0, y1, x1, y1, bl, br, threshold);
    const left = interpolatePoint(x0, y0, x0, y1, tl, bl, threshold);

    let state = 0;
    if (tl > threshold) state |= 8;
    if (tr > threshold) state |= 4;
    if (br > threshold) state |= 2;
    if (bl > threshold) state |= 1;

    const lookup = {
      1: [[left, bottom]],
      2: [[right, bottom]],
      3: [[left, right]],
      4: [[top, right]],
      5: [[top, left], [right, bottom]],
      6: [[top, bottom]],
      7: [[top, left]],
      8: [[top, left]],
      9: [[top, bottom]],
      10: [[top, right], [left, bottom]],
      11: [[top, right]],
      12: [[left, right]],
      13: [[right, bottom]],
      14: [[left, bottom]]
    };

    return lookup[state] || [];
  }

  function interpolatePoint(x1, y1, x2, y2, value1, value2, threshold) {
    const range = value2 - value1 || 0.0001;
    const amount = Math.max(0, Math.min(1, (threshold - value1) / range));
    return {
      x: x1 + (x2 - x1) * amount,
      y: y1 + (y2 - y1) * amount
    };
  }

  resize();
  window.addEventListener("resize", resize);
  draw();

  return {
    stop() {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    }
  };
}

function fractalNoise(x, y, z) {
  return (
    valueNoise(x, y, z) * 0.62 +
    valueNoise(x * 2.1 + 7.2, y * 2.1 - 4.8, z * 1.25) * 0.28 +
    valueNoise(x * 4.2 - 3.5, y * 4.2 + 9.1, z * 1.8) * 0.1
  );
}

function valueNoise(x, y, z) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const z0 = Math.floor(z);
  const xf = smoothStep(x - x0);
  const yf = smoothStep(y - y0);
  const zf = smoothStep(z - z0);

  const x00 = lerp(hash(x0, y0, z0), hash(x0 + 1, y0, z0), xf);
  const x10 = lerp(hash(x0, y0 + 1, z0), hash(x0 + 1, y0 + 1, z0), xf);
  const x01 = lerp(hash(x0, y0, z0 + 1), hash(x0 + 1, y0, z0 + 1), xf);
  const x11 = lerp(hash(x0, y0 + 1, z0 + 1), hash(x0 + 1, y0 + 1, z0 + 1), xf);
  const y0Mix = lerp(x00, x10, yf);
  const y1Mix = lerp(x01, x11, yf);
  return lerp(y0Mix, y1Mix, zf);
}

function hash(x, y, z) {
  const value = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return value - Math.floor(value);
}

function smoothStep(value) {
  return value * value * (3 - 2 * value);
}

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

function mixColor(start, end, amount) {
  const a = hexToRgb(start);
  const b = hexToRgb(end);
  return `rgb(${Math.round(lerp(a.r, b.r, amount))}, ${Math.round(lerp(a.g, b.g, amount))}, ${Math.round(lerp(a.b, b.b, amount))})`;
}

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16)
  };
}
