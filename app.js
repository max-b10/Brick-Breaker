"use strict";
const grid = document.querySelector(".grid");
const gridWidth = 332;
const gridHeight = 332;

const brickWidth = 58;
const brickHeight = 18;

// Brick class:
class Brick {
  constructor(xAxis, yAxis) {
    // position of bottom left corner of a brick:
    this.bottomLeft = [xAxis, yAxis];
    // position of bottom right corner of a brick:
    this.bottomRight = [xAxis + brickWidth, yAxis];
    // position of top left corner of a brick:
    this.topLeft = [xAxis, yAxis + brickHeight];
    // position of top right corner of a brick:
    this.topRight = [xAxis + brickWidth, yAxis + brickHeight];
  }
}

// Array of bricks in the game, constructed using brick class:
const bricks = [
  // top row:
  new Brick(7, 305),
  new Brick(72, 305),
  new Brick(137, 305),
  new Brick(202, 305),
  new Brick(267, 305),
  // second row:
  new Brick(7, 278),
  new Brick(72, 278),
  new Brick(137, 278),
  new Brick(202, 278),
  new Brick(267, 278),
  // third row:
  new Brick(7, 251),
  new Brick(72, 251),
  new Brick(137, 251),
  new Brick(202, 251),
  new Brick(267, 251),
];

function createBricks() {
  for (let i = 0; i < bricks.length; i++) {
    const brickDiv = document.createElement("div");
    brickDiv.classList.add("brick");

    //   State the position of the bottom left corner of each brick:
    brickDiv.style.left = bricks[i].bottomLeft[0] + "px";
    brickDiv.style.bottom = bricks[i].bottomLeft[1] + "px";
    grid.appendChild(brickDiv);
  }
}
createBricks();

const platform = document.createElement("div");
platform.classList.add("platform");

grid.appendChild(platform);
//   platform.style.left = 137 + "px";
//   platform.style.bottom = 40 + "px";
