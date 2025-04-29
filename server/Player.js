const bullet = require("./Bullet.js");
const Bullet = bullet.Bullet;

class Player {
  constructor(
    x,
    y,
    color,
    lifes,
    pressedKey,
    socketID,
    name,
    direction,
    shoot,
    extent
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.lifes = lifes;
    this.pressedKey = pressedKey;
    this.socketID = socketID;
    this.name = name;
    this.alive = true;
    this.direction = direction;
    this.shoot = shoot;
    this.extent = extent;
    this.ready = 0;
    this.bullet = new Bullet();
    this.obstacle = 0;
    this.colors = [
      ["navy", "royalblue", "lightsteelblue"],
      ["darkred", "red", "lightcoral"],
      ["gold", "yellow", "palegoldenrod"],
      ["darkgreen", "green", "mediumseagreen"],
      ["DarkOrange", "Orange", "LightSalmon"],
      ["MediumVioletRed", "HotPink", "LightPink"],
      ["SaddleBrown", "Peru", "BurlyWood"],
    ];
  }
  // player moves if there is nothing in his way --Janka
  updateMovement(pressedKey, coord) {
    if (pressedKey === "ArrowRight") {
      this.direction = "right";
      this.collisionObstacles(coord);
      if (this.x < this.extent - 1 && this.obstacle != 1) {
        this.x += 1;
      }
    } else if (pressedKey === "ArrowDown") {
      this.direction = "down";
      this.collisionObstacles(coord);
      if (this.y < this.extent - 1 && this.obstacle != 3) {
        this.y += 1;
      }
    } else if (pressedKey === "ArrowLeft") {
      this.direction = "left";
      this.collisionObstacles(coord);
      if (this.x > 0 && this.obstacle != 2) {
        this.x -= 1;
      }
    } else if (pressedKey === "ArrowUp") {
      this.direction = "up";
      this.collisionObstacles(coord);
      if (this.y > 0 && this.obstacle != 4) {
        this.y -= 1;
      }
    } else if (pressedKey === "Space") {
      this.shoot = true;
      this.bullet = new Bullet(
        this.x,
        this.y,
        this.direction,
        1,
        "black",
        this.shoot,
        coord
      );
    }
  }
  //changes color of player depending on number of lifes --Janka
  updateLives() {
    let result = "";
    let i = 0;
    let j = 0;
    switch (this.color) {
      case "blue":
        i = 0;
        break;
      case "red":
        i = 1;
        break;
      case "yellow":
        i = 2;
        break;
      case "green":
        i = 3;
        break;
      case "orange":
        i = 4;
        break;
      case "violet":
        i = 5;
        break;
      case "brown":
        i = 6;
        break;
      default:
        i = 0;
        break;
    }
    switch (this.lifes) {
      case 3:
        j = 0;
        break;
      case 2:
        j = 1;
        break;
      case 1:
        j = 2;
        break;
      default:
        j = 0;
        break;
    }
    result = this.colors[i][j];
    return result;
  }
  // prevents overlap with obstacles --Janka
  collisionObstacles(coord) {
    for (let i = 0; i < coord.length; i++) {
      if (this.direction === "right") {
        if (
          this.x + 1 === coord[i].x &&
          (this.y === coord[i].y || this.y === coord[i].y + 1)
        ) {
          this.obstacle = 1;
          return;
        } else this.obstacle = 0;
      } else if (this.direction === "left") {
        if (
          this.x - 1 === coord[i].x + 1 &&
          (this.y === coord[i].y || this.y === coord[i].y + 1)
        ) {
          this.obstacle = 2;
          return;
        } else this.obstacle = 0;
      } else if (this.direction === "down") {
        if (
          this.y + 1 === coord[i].y &&
          (this.x === coord[i].x || this.x === coord[i].x + 1)
        ) {
          this.obstacle = 3;
          return;
        } else this.obstacle = 0;
      } else if (this.direction === "up") {
        if (
          this.y - 1 === coord[i].y + 1 &&
          (this.x === coord[i].x || this.x === coord[i].x + 1)
        ) {
          this.obstacle = 4;
          return;
        } else this.obstacle = 0;
      }
    }
  }
  // sends values to game.js --Janka
  update() {
    let bullet1 = {};
    let drawColor = this.updateLives();
    if (this.shoot) {
      if (this.bullet.bulletObstacle === false) {
        bullet1 = this.bullet.update();
      }
      return {
        x: this.x,
        y: this.y,
        color: drawColor,
        direction: this.direction,
        shoot: this.shoot,
        bullet: bullet1,
      };
    } else {
      return {
        x: this.x,
        y: this.y,
        color: drawColor,
        direction: this.direction,
        shoot: this.shoot,
        bullet: {},
      };
    }
  }
}

module.exports = {
  Player: Player,
};
