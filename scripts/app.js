"use strict";

const startButton = document.querySelector(".start-button");
const grid = document.querySelector(".grid");
const gridWidth = 332;
const gridHeight = 332;
const brickWidth = 58;
const brickHeight = 18;
const ballSize = 20;

const startingPosition = [137, 40]; // [xAxis, yAxis]
let currentPosition = startingPosition;

const ballStartPosition = [157.5, 59];
let ballPosition = ballStartPosition;

// Set these to determine direction of ball when game starts (pixels):
let ballXDirection = 0;
let ballYDirection = 0;

let ballMovementInterval;

startButton.addEventListener("click", () => {
  startGame();
  startButton.style.display = "none";
});

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
createBricks();

// Create and append the user platform:
const platform = document.createElement("div");
platform.classList.add("platform");
placePlatform();
grid.appendChild(platform);

document.addEventListener("keydown", arrowControls);
