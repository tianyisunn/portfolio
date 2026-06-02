PImage img;

int tiles = 100;  //quantity of particles
float tileSize;
int N;
float[] offX, offY;
float[] velX, velY;// velocity
float[] time; //consistency
float[] sizeNoise;

void setup() {
  size(1200, 900);
  img = loadImage("starynight.png");
  img.resize(1200, 900);

  tileSize = width / (float)tiles;
  N = tiles * tiles;

  offX = new float[N];
  offY = new float[N];
  velX = new float[N];
  velY = new float[N];
  time  = new float[N];
  sizeNoise = new float[N];

  for (int i = 0; i < N; i++) {
    offX[i] = 0;
    offY[i] = 0;
    velX[i] = 0;
    velY[i] = 0;
    time[i]  = random(0, 1);
    sizeNoise[i] = random(0.6, 1.2);
  }
}

void draw() {
  background(#20251F);

  float mx = mouseX;
  float my = mouseY;
  float radius = 300;
  float strength = 3;
  float damping = 0.5;
  float springK = 0.1;
  float maxOff = 55;
  float stopEps = 0.02;
  float step = 0.01;

  noStroke();

  for (int y = 0; y < tiles; y++) {
    for (int x = 0; x < tiles; x++) {
      int i = x + y * tiles;
      float px = x * tileSize;
      float py = y * tileSize;

      color c = img.get((int)px, (int)py);// Sample image color + brightness
      float b = brightness(c) / 255.0;
      b = pow(b, 0.6);

      float xNow = px + offX[i];
      float yNow = py + offY[i];

      float dx = xNow - mx;    // Distance to mouse
      float dy = yNow - my;
      float d = sqrt(dx*dx + dy*dy);

      if (d < radius) {
        float f = 1 - d / radius;
        float nx = dx / max(d, 0.0001);
        float ny = dy / max(d, 0.0001);

        float a = strength * f * f;
        velX[i] += nx * a;
        velY[i] += ny * a;
      }

      velX[i] += (-offX[i]) * springK;
      velY[i] += (-offY[i]) * springK;

      offX[i] += velX[i];
      offY[i] += velY[i];

      velX[i] *= damping;
      velY[i] *= damping;

      if (abs(velX[i]) < stopEps) velX[i] = 0;//avoid drifting
      if (abs(velY[i]) < stopEps) velY[i] = 0;

      offX[i] = constrain(offX[i], -maxOff, maxOff);
      offY[i] = constrain(offY[i], -maxOff, maxOff);

      xNow = px + offX[i]; // Bounce near the edges
      yNow = py + offY[i];

      if (xNow < 0 || xNow > width)  velX[i] *= -1;
      if (yNow < 0 || yNow > height) velY[i] *= -1;

      time[i] += step;
      if (time[i] > 1) time[i] = 0;
      float fade = sin(time[i] * PI);

      float baseAlpha = map(b, 0, 1, 50, 140);

      float boost = 0;
      if (d < radius) {
        float f2 = 1 - d / radius;
        boost = 240 * f2 * f2;
      }
      float alpha = (baseAlpha + boost) * (0.35 + 0.65 * fade);
      alpha = constrain(alpha, 0, 255);
      float r = tileSize * 0.85 * sizeNoise[i];

      // Re-emit when particle is almost faded away
      if (fade < 0.03) {
        offX[i] = 0;
        offY[i] = 0;
        velX[i] = 0;
        velY[i] = 0;
        time[i] = 0;                 // restart particle
        sizeNoise[i] = random(0.6, 1.2);
      }
      fill(c, alpha);
      ellipse(px + offX[i], py + offY[i], r, r);
    }
  }
}
