module.exports = class Monster {
  /**
   * constructs a monster.
   * @param {number} x x position of the monster
   * @param {number} y y position of the monster
   * @param {string} color color of monster
   */
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.vertical = Boolean(Math.floor(Math.random() * 2));
    this.move = 1;
    this.speed = 7;
    this.alive = true;
  }
  /**
   * defines the movement of the monsters with help of collision checking functions
   * @param {number} frames framerate
   * @param {object} coord coordinates of the obstacles
   * @param {object} door coordinates of the door
   * @param {number} extent extent of the canvas
   */
  update(frames, coord, door, extent) {
    this.collisionObs(coord);
    this.collisionDoor(door);

    if (frames % this.speed === 0) {
      if (this.vertical) {
        if (this.y === extent - 1) {
          this.move = -1;
        } else if (this.y === 0) {
          this.move = 1;
        }
        this.y += this.move;
      } else {
        if (this.x === extent - 1) {
          this.move = -1;
        } else if (this.x === 0) {
          this.move = 1;
        }
        this.x += this.move;
      }
    }
  }
  /**
   * prevents overlap with the obstacles
   * @param {object} coord coordinates of the obstacles
   */
  collisionObs(coord) {
    for (let i = 0; i < coord.length; i++) {
      if (!this.vertical) {
        if (
          this.x + 1 === coord[i].x &&
          (this.y === coord[i].y || this.y === coord[i].y + 1)
        ) {
          this.move = -1;
        } else if (
          this.x - 1 === coord[i].x + 1 &&
          (this.y === coord[i].y || this.y === coord[i].y + 1)
        ) {
          this.move = 1;
        }
      } else {
        if (
          this.y + 1 === coord[i].y &&
          (this.x === coord[i].x || this.x === coord[i].x + 1)
        ) {
          this.move = -1;
        } else if (
          this.y - 1 === coord[i].y + 1 &&
          (this.x === coord[i].x || this.x === coord[i].x + 1)
        ) {
          this.move = 1;
        }
      }
    }
  }
  /**
   * prevents overlap with the door
   * @param {object} door coordinates of the door
   */
  collisionDoor(door) {
    if (!this.vertical) {
      if (this.x + 1 === door.x && (this.y === 0 || this.y === 1)) {
        this.move = -1;
      } else if (this.x - 1 === door.x + 7 && (this.y === 0 || this.y === 1)) {
        this.move = 1;
      }
    } else {
      if (this.x >= door.x && this.x <= door.x + 7 && this.y === 2) {
        this.move = 1;
      }
    }
  }
};
