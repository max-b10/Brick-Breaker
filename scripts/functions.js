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

// Dtermine position of the ball:
function placeBall() {
  ball.style.left = `${ballPosition[0]}px`;
  ball.style.bottom = `${ballPosition[1]}px`;
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
  // test:
  if (ballXDirection === 0.9 && ballYDirection === 0.9) {
    ballYDirection = -0.9;
    return;
  }
  if (ballXDirection === -0.9 && ballYDirection === 0.9) {
    ballXDirection = 0.9;
    return;
  }
  if (ballXDirection === 0.9 && ballYDirection === -0.9) {
    ballXDirection = -0.9;
    return;
  }
  if (ballXDirection === -0.9 && ballYDirection === -0.9) {
    ballYDirection = 0.9;
    return;
  }
}
