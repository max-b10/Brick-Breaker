"use strict";
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
let ballXDirection = -0.5;
let ballYDirection = 0.5;

let ballMovementInterval;

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

// Create and append the ball:
const ball = document.createElement("div");
ball.classList.add("ball");
placeBall();
grid.appendChild(ball);

function ballMovement() {
  ballPosition[0] += ballXDirection;
  ballPosition[1] += ballYDirection;
  placeBall();
  ifBallBounces();
}
// The lower the interval, the quicker the ball.
ballMovementInterval = setInterval(ballMovement, 1);

function ifBallBounces() {
  // If ball hits a wall:
  if (
    // top wall:
    ballPosition[1] >= gridHeight - ballSize ||
    // left wall:
    ballPosition[0] <= 0 ||
    // right wall:
    ballPosition[0] >= gridWidth - ballSize
  ) {
    changeDirection();
  }
  // If ball hits the platform:
  if (
    ballPosition[0] > currentPosition[0] &&
    ballPosition[0] < currentPosition[0] + brickWidth &&
    ballPosition[1] > currentPosition[1] &&
    ballPosition[1] < currentPosition[1] + brickHeight
  ) {
    // console.log(ballPosition);
    changeDirection();
  }
  // If ball hits a brick from the bricks array:
  for (let i = 0; i < bricks.length; i++) {
    if (
      ballPosition[0] > bricks[i].bottomLeft[0] &&
      ballPosition[0] < bricks[i].bottomRight[0] &&
      ballPosition[1] + ballSize > bricks[i].bottomLeft[1] &&
      ballPosition[1] < bricks[i].topLeft[1]
    ) {
      const allBricks = Array.from(document.querySelectorAll(".brick"));
      allBricks[i].classList.remove("brick");
      bricks.splice(i, 1);
      changeDirection();
    }
  }

  // If ball reaches bottom of grid i.e. game over:
  if (ballPosition[1] <= 0) {
    clearInterval(ballMovementInterval);
    document.removeEventListener("keydown", arrowControls);
  }
}
