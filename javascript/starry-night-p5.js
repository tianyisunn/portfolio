const starryNightSketch = (p) => {
  let img;
  let tileSize;
  let particleCount;
  let offX;
  let offY;
  let velX;
  let velY;
  let time;
  let sizeNoise;

  const tiles = 100;
  const sketchWidth = 1200;
  const sketchHeight = 900;

  p.setup = () => {
    const canvas = p.createCanvas(sketchWidth, sketchHeight);
    canvas.parent("starry-night-sketch");
    p.pixelDensity(1);
    setupCodePanelHeightSync();

    img = createFallbackImage();
    p.loadImage(
      "media/processing/starynight.png",
      (loadedImage) => {
        img = loadedImage;
        img.resize(sketchWidth, sketchHeight);
      },
      () => {}
    );

    tileSize = p.width / tiles;
    particleCount = tiles * tiles;
    offX = Array(particleCount).fill(0);
    offY = Array(particleCount).fill(0);
    velX = Array(particleCount).fill(0);
    velY = Array(particleCount).fill(0);
    time = Array.from({ length: particleCount }, () => p.random(0, 1));
    sizeNoise = Array.from({ length: particleCount }, () => p.random(0.6, 1.2));
  };

  p.draw = () => {
    p.background("#20251F");

    const mx = p.mouseX;
    const my = p.mouseY;
    const radius = 300;
    const strength = 3;
    const damping = 0.5;
    const springK = 0.1;
    const maxOff = 55;
    const stopEps = 0.02;
    const step = 0.01;

    p.noStroke();

    for (let y = 0; y < tiles; y++) {
      for (let x = 0; x < tiles; x++) {
        const i = x + y * tiles;
        const px = x * tileSize;
        const py = y * tileSize;

        const c = img.get(Math.floor(px), Math.floor(py));
        let b = Math.max(c[0], c[1], c[2]) / 255.0;
        b = Math.pow(b, 0.6);

        let xNow = px + offX[i];
        let yNow = py + offY[i];
        const dx = xNow - mx;
        const dy = yNow - my;
        const d = Math.sqrt(dx * dx + dy * dy);

        if (d < radius && isInsideCanvas()) {
          const f = 1 - d / radius;
          const nx = dx / Math.max(d, 0.0001);
          const ny = dy / Math.max(d, 0.0001);
          const a = strength * f * f;
          velX[i] += nx * a;
          velY[i] += ny * a;
        }

        velX[i] += -offX[i] * springK;
        velY[i] += -offY[i] * springK;

        offX[i] += velX[i];
        offY[i] += velY[i];

        velX[i] *= damping;
        velY[i] *= damping;

        if (Math.abs(velX[i]) < stopEps) velX[i] = 0;
        if (Math.abs(velY[i]) < stopEps) velY[i] = 0;

        offX[i] = p.constrain(offX[i], -maxOff, maxOff);
        offY[i] = p.constrain(offY[i], -maxOff, maxOff);

        xNow = px + offX[i];
        yNow = py + offY[i];
        if (xNow < 0 || xNow > p.width) velX[i] *= -1;
        if (yNow < 0 || yNow > p.height) velY[i] *= -1;

        time[i] += step;
        if (time[i] > 1) time[i] = 0;
        const fade = Math.sin(time[i] * Math.PI);
        const baseAlpha = p.map(b, 0, 1, 50, 140);
        let boost = 0;

        if (d < radius && isInsideCanvas()) {
          const f2 = 1 - d / radius;
          boost = 240 * f2 * f2;
        }

        let alpha = (baseAlpha + boost) * (0.35 + 0.65 * fade);
        alpha = p.constrain(alpha, 0, 255);
        const r = tileSize * 0.85 * sizeNoise[i];

        if (fade < 0.03) {
          offX[i] = 0;
          offY[i] = 0;
          velX[i] = 0;
          velY[i] = 0;
          time[i] = 0;
          sizeNoise[i] = p.random(0.6, 1.2);
        }

        p.fill(c[0], c[1], c[2], alpha);
        p.ellipse(px + offX[i], py + offY[i], r, r);
      }
    }
  };

  function isInsideCanvas() {
    return p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height;
  }

  function setupCodePanelHeightSync() {
    const canvasHost = document.getElementById("starry-night-sketch");
    const row = canvasHost && canvasHost.closest(".processingWorkRow");
    const codePanel = row && row.querySelector(".processingCodePanel");
    if (!canvasHost || !codePanel) return;

    const syncHeight = () => {
      if (window.matchMedia("(max-width: 900px)").matches) {
        codePanel.style.removeProperty("--processing-code-height");
        return;
      }
      codePanel.style.setProperty("--processing-code-height", `${canvasHost.getBoundingClientRect().height}px`);
    };

    syncHeight();
    window.addEventListener("resize", syncHeight);
    if ("ResizeObserver" in window) {
      new ResizeObserver(syncHeight).observe(canvasHost);
    }
  }

  function createFallbackImage() {
    const g = p.createGraphics(sketchWidth, sketchHeight);
    g.pixelDensity(1);
    g.colorMode(p.HSB, 360, 100, 100, 255);
    g.background(218, 70, 12);

    for (let y = 0; y < sketchHeight; y += 4) {
      for (let x = 0; x < sketchWidth; x += 4) {
        const wave = Math.sin(x * 0.018 + y * 0.012) + Math.cos(y * 0.024);
        const n = p.noise(x * 0.006, y * 0.006);
        const hue = p.map(wave + n, -1.4, 2.1, 200, 54, true);
        const sat = p.map(n, 0, 1, 48, 92);
        const bri = p.map(y, 0, sketchHeight, 86, 26) + wave * 10;
        g.noStroke();
        g.fill(hue, sat, p.constrain(bri, 16, 96), 255);
        g.rect(x, y, 4, 4);
      }
    }

    drawFallbackStar(g, 220, 150, 46);
    drawFallbackStar(g, 420, 110, 26);
    drawFallbackStar(g, 730, 160, 34);
    drawFallbackStar(g, 940, 120, 58);
    drawFallbackStar(g, 1030, 300, 32);
    drawFallbackStar(g, 620, 250, 24);
    drawFallbackMoon(g);
    drawFallbackCypress(g);
    return g;
  }

  function drawFallbackStar(g, x, y, size) {
    g.noStroke();
    for (let r = size * 2.1; r > 0; r -= size * 0.24) {
      g.fill(52, 88, 98, p.map(r, 0, size * 2.1, 255, 18));
      g.circle(x, y, r);
    }
  }

  function drawFallbackMoon(g) {
    g.noStroke();
    g.fill(50, 86, 98, 245);
    g.circle(1020, 220, 96);
    g.fill(216, 70, 18, 210);
    g.circle(990, 205, 86);
  }

  function drawFallbackCypress(g) {
    g.noStroke();
    g.fill(140, 62, 8, 235);
    g.beginShape();
    g.vertex(98, 900);
    g.bezierVertex(70, 720, 120, 560, 160, 400);
    g.bezierVertex(210, 570, 230, 760, 254, 900);
    g.endShape(p.CLOSE);
  }
};

new p5(starryNightSketch);
