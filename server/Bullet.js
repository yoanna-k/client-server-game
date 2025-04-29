class Bullet {
  constructor(x, y, direction, speed, color, shoot, coord, extent) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.speed = speed;
    this.color = color;
    this.shoot = shoot;
    this.coord = coord;
    this.extent = extent;
    this.bulletObstacle = false;
  }
  // implement movement of bullet --Janka
  update() {
    this.collisionObstacles(this.coord);
    if (this.direction === "right") {
      this.x += this.speed;
      if (this.x > this.extent - 1) {
        this.shoot = false;
      }
    } else if (this.direction === "left") {
      this.x -= this.speed;
      if (this.x < 0) {
        this.shoot = false;
      }
    } else if (this.direction === "up") {
      this.y -= this.speed;
      if (this.y < 0) {
        this.shoot = false;
      }
    } else if (this.direction === "down") {
      this.y += this.speed;
      if (this.y > this.extent - 1) {
        this.shoot = false;
      }
    }
    return {
      x: this.x,
      y: this.y,
      direction: this.direction,
      color: this.color,
      bulletObstacle: this.bulletObstacle,
    };
  }
  // checks whether next field is obstacle --Janka
  collisionObstacles(coord) {
    for (let i = 0; i < coord.length; i++) {
      if (this.direction === "right") {
        if (
          this.x === coord[i].x &&
          (this.y === coord[i].y || this.y === coord[i].y + 1)
        ) {
          this.bulletObstacle = true;
        }
      } else if (this.direction === "left") {
        if (
          this.x === coord[i].x + 1 &&
          (this.y === coord[i].y || this.y === coord[i].y + 1)
        ) {
          this.bulletObstacle = true;
        }
      } else if (this.direction === "down") {
        if (
          this.y === coord[i].y &&
          (this.x === coord[i].x || this.x === coord[i].x + 1)
        ) {
          this.bulletObstacle = true;
        }
      } else if (this.direction === "up") {
        if (
          this.y === coord[i].y + 1 &&
          (this.x === coord[i].x || this.x === coord[i].x + 1)
        ) {
          this.bulletObstacle = true;
        }
      }
    }
  }
}

module.exports = {
  Bullet: Bullet,
};
