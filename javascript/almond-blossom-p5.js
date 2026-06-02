const almondBlossomSketch = (p) => {
  let imgBG, imgBranch, imgPetal, imgPetal2, fontTitle, fontBody;
  let scene = 0;
  let transition = 0;
  let transitioning = false;
  let transDir = 1;

  const COLS = 18;
  const ROWS = 14;
  const gridX = Array.from({ length: ROWS + 1 }, () => Array(COLS + 1).fill(0));
  const gridY = Array.from({ length: ROWS + 1 }, () => Array(COLS + 1).fill(0));

  const bx = [150, 180, 230, 290, 360, 440, 520, 600, 700, 780, 850, 950, 1050, 900, 1000, 1100, 500, 650];
  const by = [380, 310, 250, 200, 640, 730, 820, 900, 80, 120, 180, 150, 200, 350, 400, 450, 60, 100];
  const BN = bx.length;
  let bOffX, bOffY, bVelX, bVelY, bMass;

  const PETAL_COUNT = 55;
  let petals = [];
  let bgOffX = 0;
  let bgOffY = 0;

  let cloud = [];
  let cloudRotX = 0.3;
  let cloudRotY = 0;
  let prevMX = 0;
  let prevMY = 0;
  let dragging3D = false;
  let cloudScale = 1.0;
  let explodeT = 0;
  let exploding = false;
  const clickPetals = [];

  p.preload = () => {
    const base = "media/processing/almond-blossom/";
    imgBG = p.loadImage(base + "bg.jpg");
    imgBranch = p.loadImage(base + "branch.png");
    imgPetal = p.loadImage(base + "petal.png");
    imgPetal2 = p.loadImage(base + "petal2.png");
    fontTitle = p.loadFont(base + "FrederickatheGreat-Regular.ttf");
    fontBody = p.loadFont(base + "FrederickatheGreat-Regular.ttf");
  };

  p.setup = () => {
    const canvas = p.createCanvas(1200, 900, p.WEBGL);
    canvas.parent("almond-blossom-sketch");
    p.pixelDensity(1);
    imgBG.resize(1200, 900);
    imgBranch.resize(1200, 900);

    bOffX = Array(BN).fill(0);
    bOffY = Array(BN).fill(0);
    bVelX = Array(BN).fill(0);
    bVelY = Array(BN).fill(0);
    bMass = Array(BN).fill(1);

    for (let i = 0; i < BN; i++) {
      const distToCenter = p.dist(bx[i], by[i], p.width * 0.45, p.height * 0.85);
      bMass[i] = p.constrain(p.map(distToCenter, 0, 900, 3.5, 0.5), 0.5, 3.5);
    }

    petals = Array.from({ length: PETAL_COUNT }, () => new Petal());
    buildPointCloud();
    setupOverlayControls();
    setupCodePanelHeightSync();
  };

  function setupOverlayControls() {
    document.querySelectorAll("[data-almond-scene]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        requestScene(Number(button.dataset.almondScene));
      });
    });
  }

  function requestScene(nextScene) {
    if (transitioning || nextScene === scene) return;
    transDir = nextScene > scene ? 1 : -1;
    transitioning = true;
  }

  function updateOverlayState() {
    document.querySelectorAll("[data-almond-scene]").forEach((button) => {
      button.classList.toggle("active", Number(button.dataset.almondScene) === scene);
    });

    const hint = document.getElementById("almond-blossom-hint");
    if (!hint) return;
    hint.textContent = scene === 0
      ? "move mouse to create wind and shake branches, click to release petals"
      : "drag to rotate, scroll to zoom, click to explode";
  }

  function buildPointCloud() {
    cloud = [];
    imgBranch.loadPixels();
    const step = 4;
    for (let y = 0; y < imgBranch.height; y += step) {
      for (let x = 0; x < imgBranch.width; x += step) {
        const c = imgBranch.get(x, y);
        const a = c[3];
        if (a > 40) {
          const px = p.map(x, 0, imgBranch.width, -500, 500);
          const py = p.map(y, 0, imgBranch.height, -380, 380);
          const bval = (c[0] + c[1] + c[2]) / 3;
          const pz = p.map(bval, 0, 255, -120, 120) + p.random(-40, 40);
          cloud.push(new CloudPoint(px, py, pz, c, a));
        }
      }
    }
  }

  p.draw = () => {
    if (transitioning) {
      transition += transDir * 0.025;
      if (transition >= 1) {
        transition = 1;
        transitioning = false;
        scene = 1;
      }
      if (transition <= 0) {
        transition = 0;
        transitioning = false;
        scene = 0;
      }
    }

    if (scene === 0 && !transitioning) drawScene0();
    else if (scene === 1 && !transitioning) drawScene1();
    else drawTransition();
    updateOverlayState();
  };

  function setDepthTest(enabled) {
    const gl = p._renderer && p._renderer.GL;
    if (!gl) return;
    if (enabled) gl.enable(gl.DEPTH_TEST);
    else gl.disable(gl.DEPTH_TEST);
  }

  function drawScene0() {
    setDepthTest(false);
    p.camera();
    p.noLights();
    p.background(100, 175, 190);
    p.push();
    p.translate(-p.width / 2, -p.height / 2, 0);

    const mvx = p.mouseX - p.pmouseX;
    const mvy = p.mouseY - p.pmouseY;
    const mspeed = Math.sqrt(mvx * mvx + mvy * mvy);

    const targetBGX = (p.mouseX - p.width * 0.5) * -0.04;
    const targetBGY = (p.mouseY - p.height * 0.5) * -0.04;
    bgOffX = p.lerp(bgOffX, targetBGX, 0.05);
    bgOffY = p.lerp(bgOffY, targetBGY, 0.05);

    p.push();
    p.translate(bgOffX, bgOffY, 0);
    p.image(imgBG, -30, -30, p.width + 60, p.height + 60);
    p.pop();

    for (let i = 0; i < BN; i++) {
      const cx = bx[i] + bOffX[i];
      const cy = by[i] + bOffY[i];
      const dx = cx - p.mouseX;
      const dy = cy - p.mouseY;
      const d = Math.sqrt(dx * dx + dy * dy);

      if (d < 280 && mspeed > 1.2) {
        const f = 0.38 * (1 - d / 280) * Math.min(mspeed, 28) / bMass[i];
        bVelX[i] += (mvx / Math.max(mspeed, 1)) * f * 0.6 + (dx / Math.max(d, 1)) * f * 0.4;
        bVelY[i] += (mvy / Math.max(mspeed, 1)) * f * 0.6 + (dy / Math.max(d, 1)) * f * 0.4;
      }

      bVelX[i] += -bOffX[i] * 0.09;
      bVelY[i] += -bOffY[i] * 0.09;
      bVelX[i] *= 0.5;
      bVelY[i] *= 0.5;
      bOffX[i] += bVelX[i];
      bOffY[i] += bVelY[i];

      const maxOff = p.map(bMass[i], 0.5, 3.5, 55, 8);
      bOffX[i] = p.constrain(bOffX[i], -maxOff, maxOff);
      bOffY[i] = p.constrain(bOffY[i], -maxOff, maxOff);
    }

    const cw = p.width / COLS;
    const ch = p.height / ROWS;
    for (let gy = 0; gy <= ROWS; gy++) {
      for (let gx = 0; gx <= COLS; gx++) {
        const off = getWarpOffset(gx * cw, gy * ch);
        gridX[gy][gx] = gx * cw + off.x;
        gridY[gy][gx] = gy * ch + off.y;
      }
    }

    p.noStroke();
    p.texture(imgBranch);
    p.textureMode(p.IMAGE);
    p.beginShape(p.QUADS);
    for (let gy = 0; gy < ROWS; gy++) {
      for (let gx = 0; gx < COLS; gx++) {
        p.vertex(gridX[gy][gx], gridY[gy][gx], 0, gx * cw, gy * ch);
        p.vertex(gridX[gy][gx + 1], gridY[gy][gx + 1], 0, (gx + 1) * cw, gy * ch);
        p.vertex(gridX[gy + 1][gx + 1], gridY[gy + 1][gx + 1], 0, (gx + 1) * cw, (gy + 1) * ch);
        p.vertex(gridX[gy + 1][gx], gridY[gy + 1][gx], 0, gx * cw, (gy + 1) * ch);
      }
    }
    p.endShape();

    petals.forEach((petal) => {
      petal.applyWind(mvx * 0.45, mvy * 0.45, mspeed);
      petal.update();
      petal.display();
    });

    for (let i = clickPetals.length - 1; i >= 0; i--) {
      clickPetals[i].update();
      clickPetals[i].display();
      if (clickPetals[i].isDead()) clickPetals.splice(i, 1);
    }

    p.pop();
  }

  function drawScene1() {
    setDepthTest(true);
    p.background(8, 10, 14);
    if (dragging3D) {
      cloudRotY += (p.mouseX - prevMX) * 0.006;
      cloudRotX += (p.mouseY - prevMY) * 0.006;
      cloudRotX = p.constrain(cloudRotX, -p.PI * 0.5, p.PI * 0.5);
    }
    prevMX = p.mouseX;
    prevMY = p.mouseY;

    if (exploding) explodeT = Math.min(explodeT + 0.02, 1);
    else explodeT = Math.max(explodeT - 0.02, 0);

    p.camera(0, 0, 650, 0, 0, 0, 0, 1, 0);
    p.ambientLight(15, 18, 25);
    p.pointLight(220, 235, 255, 0, -400, 500);
    p.pointLight(80, 100, 120, 200, 300, -300);

    p.push();
    p.rotateX(cloudRotX);
    p.rotateY(cloudRotY);
    p.scale(cloudScale);

    const mxRaw = p.map(p.mouseX, 0, p.width, -500, 500);
    const myRaw = p.map(p.mouseY, 0, p.height, -380, 380);
    const localX = mxRaw * Math.cos(-cloudRotY);
    const localZ = -mxRaw * Math.sin(-cloudRotY);
    const localY = myRaw * Math.cos(-cloudRotX);

    cloud.forEach((cp) => {
      cp.update(localX, localY, localZ);
      cp.draw();
    });
    p.pop();
  }

  function drawTransition() {
    const t = transition;
    if (transDir > 0) {
      drawScene0();
      p.push();
      p.camera();
      p.translate(-p.width / 2, -p.height / 2, 0);
      p.noStroke();
      p.fill(0, p.map(t, 0, 0.5, 0, 255));
      p.rect(0, 0, p.width, p.height);
      p.pop();
      if (t > 0.5) drawScene1();
    } else {
      drawScene1();
      p.push();
      p.camera();
      p.translate(-p.width / 2, -p.height / 2, 0);
      p.noStroke();
      p.fill(0, p.map(1 - t, 0, 0.5, 0, 255));
      p.rect(0, 0, p.width, p.height);
      p.pop();
    }
  }

  function drawUI() {
    setDepthTest(false);
    p.push();
    p.camera();
    p.noLights();
    p.translate(-p.width / 2, -p.height / 2, 1);

    p.textFont(fontTitle);
    p.fill(255);
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(44);
    p.text("Almond Blossom", 30, 28);

    p.textFont(fontBody);
    p.fill(255, 215);
    p.textSize(24);
    p.text("Vincent van Gogh  ·  1890", 30, 70);

    drawModeButton(p.width - 160, p.height / 2 - 70, "Reality", scene === 0);
    drawModeButton(p.width - 160, p.height / 2 + 10, "Synthetic", scene === 1);

    p.fill(255);
    p.textSize(20);
    p.textAlign(p.CENTER, p.BOTTOM);
    if (scene === 0) p.text("move mouse to create wind and shake branches, click to release petals", p.width / 2, p.height - 18);
    if (scene === 1) p.text("drag to rotate, scroll to zoom, click to explode", p.width / 2, p.height - 18);
    p.pop();
    if (scene === 1) setDepthTest(true);
  }

  function drawModeButton(x, y, label, active) {
    p.noStroke();
    p.fill(255, 255, 255, active ? 218 : 72);
    p.rect(x - 12, y - 8, 144, 58, 34);
    p.textFont(fontBody);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(20);
    p.fill(20, 20, 20, active ? 230 : 185);
    p.text(label, x + 60, y + 21);
  }

  p.mousePressed = () => {
    if (!isInsideCanvas()) return;

    if (scene === 0) {
      for (let i = 0; i < 10; i++) clickPetals.push(new ClickPetal(p.mouseX, p.mouseY));
      return;
    }

    dragging3D = true;
    exploding = !exploding;
  };

  p.mouseReleased = () => {
    dragging3D = false;
  };

  p.mouseWheel = (event) => {
    if (scene === 1 && isInsideCanvas()) {
      cloudScale = p.constrain(cloudScale - event.delta * 0.001, 0.3, 3.0);
      return false;
    }
  };

  function isInsideCanvas() {
    return p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height;
  }

  function setupCodePanelHeightSync() {
    const canvasHost = document.getElementById("almond-blossom-sketch");
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

  function getWarpOffset(wx, wy) {
    let sumW = 0;
    let sumOX = 0;
    let sumOY = 0;
    for (let b = 0; b < BN; b++) {
      const d = p.dist(wx, wy, bx[b], by[b]);
      const w = 1.0 / Math.max(d * d * 0.00008, 0.00001);
      sumOX += bOffX[b] * w;
      sumOY += bOffY[b] * w;
      sumW += w;
    }
    return { x: sumOX / sumW, y: sumOY / sumW };
  }

  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  class CloudPoint {
    constructor(x, y, z, c, a) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.cx = x;
      this.cy = y;
      this.cz = z;
      this.vx = 0;
      this.vy = 0;
      this.vz = 0;
      this.c = c;
      this.a = a;
      this.sz = p.random(1.2, 3.0);
      const dir = p.createVector(x + p.random(-200, 200), y + p.random(-200, 200), z + p.random(-300, 300));
      dir.normalize();
      const d = p.random(200, 600);
      this.ex = dir.x * d;
      this.ey = dir.y * d;
      this.ez = dir.z * d;
    }

    update(mx, my, mz) {
      const tx = p.lerp(this.x, this.ex, easeInOut(explodeT));
      const ty = p.lerp(this.y, this.ey, easeInOut(explodeT));
      const tz = p.lerp(this.z, this.ez, easeInOut(explodeT));
      const dx = this.cx - mx;
      const dy = this.cy - my;
      const dz = this.cz - mz;
      const d3 = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (d3 < 120) {
        const f = (1 - d3 / 120) * 3.5;
        this.vx += (dx / Math.max(d3, 1)) * f;
        this.vy += (dy / Math.max(d3, 1)) * f;
        this.vz += (dz / Math.max(d3, 1)) * f;
      }

      this.vx += (tx - this.cx) * 0.06;
      this.vy += (ty - this.cy) * 0.06;
      this.vz += (tz - this.cz) * 0.06;
      this.vx *= 0.82;
      this.vy *= 0.82;
      this.vz *= 0.82;

      const noiseScale = 0.003;
      const noiseSpeed = p.frameCount * 0.005;
      this.cx += (p.noise(this.x * noiseScale, this.y * noiseScale, noiseSpeed) - 0.5) * 6.5;
      this.cy += (p.noise(this.x * noiseScale + 100, this.y * noiseScale, noiseSpeed) - 0.5) * 6.6;
      this.cz += (p.noise(this.x * noiseScale, this.y * noiseScale + 100, noiseSpeed) - 0.5) * 0.8;

      this.cx += this.vx;
      this.cy += this.vy;
      this.cz += this.vz;
    }

    draw() {
      const fade = p.map(this.cz, -400, 400, 0.3, 1.8);
      p.stroke(
        p.constrain(this.c[0] * fade, 0, 255),
        p.constrain(this.c[1] * fade, 0, 255),
        p.constrain(this.c[2] * fade, 0, 255),
        this.a * 0.85
      );
      p.strokeWeight(this.sz * fade);
      p.point(this.cx, this.cy, this.cz);
    }
  }

  class Petal {
    constructor() {
      this.reset();
    }

    reset() {
      this.anchorBone = Math.floor(p.random(BN));
      this.x = bx[this.anchorBone] + p.random(-50, 50);
      this.y = by[this.anchorBone] + p.random(-50, 50);
      this.vx = p.random(-0.25, 0.25);
      this.vy = p.random(-0.05, 0.3);
      this.rot = p.random(p.TWO_PI);
      this.rotV = p.random(-0.025, 0.025);
      this.sz = p.random(16, 30);
      this.alpha = p.random(150, 220);
      this.life = 1;
      this.decay = p.random(0.0006, 0.0018);
      this.onBranch = true;
    }

    applyWind(wx, wy, spd) {
      if (spd > 3.5) {
        this.onBranch = false;
        this.vx += wx * p.random(0.04, 0.09);
        this.vy += wy * p.random(0.04, 0.09);
        this.vx += p.random(-0.3, 0.3);
      }
    }

    update() {
      if (!this.onBranch) {
        this.vy += 0.022;
        this.vx *= 0.994;
        this.vy *= 0.994;
        this.x += this.vx + Math.sin(p.frameCount * 0.02 + this.rot) * 0.25;
        this.y += this.vy;
        this.rot += this.rotV;
        this.life -= this.decay;
        if (this.life <= 0 || this.y > p.height + 40) this.reset();
      } else {
        this.x += bOffX[this.anchorBone] * 0.015 + Math.sin(p.frameCount * 0.018 + this.anchorBone) * 0.12;
        this.y += bOffY[this.anchorBone] * 0.015;
      }
    }

    display() {
      p.push();
      p.translate(this.x, this.y, 1);
      p.rotate(this.rot);
      p.tint(255, this.alpha * this.life);
      p.imageMode(p.CENTER);
      p.image(this.anchorBone % 2 === 0 ? imgPetal : imgPetal2, 0, 0, this.sz, this.sz);
      p.imageMode(p.CORNER);
      p.noTint();
      p.pop();
    }
  }

  class ClickPetal {
    constructor(ox, oy) {
      const angle = p.random(p.TWO_PI);
      const speed = p.random(1.5, 5.0);
      this.x = ox + p.random(-20, 20);
      this.y = oy + p.random(-20, 20);
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - p.random(1.0, 3.0);
      this.rot = p.random(p.TWO_PI);
      this.rotV = p.random(-0.06, 0.06);
      this.sz = p.random(30, 70);
      this.life = 1;
      this.decay = p.random(0.008, 0.018);
      this.useSecond = p.random(1) > 0.5;
    }

    update() {
      this.vy += 0.12;
      this.vx *= 0.97;
      this.vy *= 0.97;
      this.x += this.vx;
      this.y += this.vy;
      this.rot += this.rotV;
      this.life -= this.decay;
    }

    display() {
      p.push();
      p.translate(this.x, this.y, 1);
      p.rotate(this.rot);
      p.tint(255, this.life * 230);
      p.imageMode(p.CENTER);
      p.image(this.useSecond ? imgPetal2 : imgPetal, 0, 0, this.sz, this.sz);
      p.imageMode(p.CORNER);
      p.noTint();
      p.pop();
    }

    isDead() {
      return this.life <= 0 || this.y > p.height + 60;
    }
  }
};

new p5(almondBlossomSketch);
