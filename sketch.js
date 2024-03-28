let dots = [];
const initialDots = 50;

class Dot {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  display() {
    ellipse(this.x, this.y, this.size);
  }

  checkCollision(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    if (d < (this.size + other.size) / 2) {
      return true;
    }
    return false;
  }

  absorb(other) {
    let totalArea = PI * this.size * this.size + PI * other.size * other.size;
    this.size = sqrt(totalArea / PI);
  }
}

function setup() {
  createCanvas(500, 500);
  for (let i = 0; i < initialDots; i++) {
    dots.push(new Dot(random(width), random(height), random(10, 30)));
  }
}

function draw() {
  background(220);

  for (let i = dots.length - 1; i >= 0; i--) {
    dots[i].move();
    dots[i].display();

    for (let j = dots.length - 1; j >= 0; j--) {
      if (i !== j && dots[i].checkCollision(dots[j])) {
        if (dots[i].size >= dots[j].size) {
          dots[i].absorb(dots[j]);
          dots.splice(j, 1);
        } else {
          dots[j].absorb(dots[i]);
          dots.splice(i, 1);
          break;
        }
      }
    }
  }
}
