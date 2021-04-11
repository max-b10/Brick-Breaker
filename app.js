"use strict";
const grid = document.querySelector(".grid");
const gridWidth = 332;
const gridHeight = 332;
const brickWidth = 58;
const brickHeight = 18;

const startingPosition = [137, 40];
let currentPosition = startingPosition;

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

// Iterate over the bricks array to append the bricks to the grid:
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

// Create and append the user platform:
const platform = document.createElement("div");
platform.classList.add("platform");
placePlatform();
grid.appendChild(platform);

function placePlatform() {
  platform.style.left = `${startingPosition[0]}px`;
  platform.style.bottom = `${startingPosition[1]}px`;
}

// Arrow keys to control user platform:
function arrowControls(e) {
  if (e.code === "ArrowLeft") {
    currentPosition[0] -= 9;
    platform.style.left = `${startingPosition[0]}px`;

    // console.log("arrow left");
  } else if (e.code === "ArrowRight") {
    currentPosition[0] += 9;
    platform.style.left = `${startingPosition[0]}px`;

    // console.log("arrow right");
  }
}
document.addEventListener("keydown", arrowControls);
