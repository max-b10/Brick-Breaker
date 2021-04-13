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

// Determine user platform position:
function placePlatform() {
  platform.style.left = `${startingPosition[0]}px`;
  platform.style.bottom = `${startingPosition[1]}px`;
}
// Start game button function:
function startGame() {
  document.addEventListener("keydown", arrowControls);
  // Create and append the ball:
  const ball = document.createElement("div");
  ball.classList.add("ball");
  // Determine position of the ball:
  function placeBall() {
    ball.style.left = `${ballPosition[0]}px`;
    ball.style.bottom = `${ballPosition[1]}px`;
  }
  grid.appendChild(ball);

  placeBall();

  // Starting directon of the ball:
  ballXDirection = 0.5;
  ballYDirection = 0.5;

  function ballMovement() {
    ballPosition[0] += ballXDirection;
    ballPosition[1] += ballYDirection;
    placeBall();
    ifBallBounces();
  }

  // The lower the interval, the quicker the ball moves.
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
      console.log(ballXDirection, ballYDirection);

      changeDirection();
    }
    // If ball hits the platform:
    if (
      ballPosition[0] > currentPosition[0] &&
      ballPosition[0] < currentPosition[0] + brickWidth &&
      ballPosition[1] > currentPosition[1] &&
      ballPosition[1] < currentPosition[1] + brickHeight
    ) {
      console.log(ballXDirection, ballYDirection);

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
      startButton.style.display = "block";
      startButton.innerHTML = "Play Again";
      ball.classList.remove("ball");
    }
  }
}

// Arrow keys to control user platform:
function arrowControls(e) {
  if (e.code === "ArrowLeft" && currentPosition[0] > 2) {
    currentPosition[0] -= 10;
    placePlatform();
  } else if (
    e.code === "ArrowRight" &&
    currentPosition[0] < gridWidth - brickWidth - 9 // && currentPosition[0] < 272
  ) {
    currentPosition[0] += 10;
    placePlatform();
  }
}
function changeDirection() {
  if (ballXDirection === 0.5 && ballYDirection === 0.5) {
    ballYDirection = -0.5;
    return;
  }
  if (ballXDirection === -0.5 && ballYDirection === 0.5) {
    ballXDirection = 0.5;
    return;
  }
  if (ballXDirection === 0.5 && ballYDirection === -0.5) {
    ballXDirection = -0.5;
    return;
  }
  if (ballXDirection === -0.5 && ballYDirection === -0.5) {
    ballYDirection = 0.5;
    return;
  }
}
