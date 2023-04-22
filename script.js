const character = document.querySelector("#character");
const game = document.querySelector("#game");
const rootElementStyle = window.getComputedStyle(document.documentElement);
const score = document.querySelector("#score");
const startMsg = document.querySelector("#start-msg");

//variables
let gameStarted = false;
const rootFontSize = rootElementStyle.fontSize;
const rootFontSizeNumber = parseFloat(rootFontSize);
let characterSpeed = 150;
let obstacleAmount = 6;
let obstacleSpeed = 2000;
let interval;
let interval2;
let gameover = false;
let animationInterval;

function startGame() {
  if(gameStarted) return
  gameStarted = true;
  startMsg.style.display = "none";
  document.addEventListener("mousemove", moveCharacter);

  //intervals
  interval = setInterval(generateObstacle, 3000);
  interval2 = setInterval(checkCollision, 10);


  //functions
  function moveCharacter(e) {
    character.style.left = e.clientX + "px";
  }

  function generateObstacle() {
    score.innerText = +score.innerText + 1;

    if (score.innerText >= 5) {
      obstacleAmount = 8;
      obstacleSpeed = 1800;
    }
    if (score.innerText >= 10) {
      obstacleAmount = 10;
      obstacleSpeed = 1700;
    }
    if (score.innerText >= 15) {
      obstacleAmount = 12;
      obstacleSpeed = 1600;
    }
    if (score.innerText >= 20) {
      obstacleAmount = 14;
      obstacleSpeed = 1500;
    }
    if (score.innerText >= 25) {
      obstacleAmount = 15;
      obstacleSpeed = 1400;
    }
    if (score.innerText >= 30) {
      obstacleAmount = 17;
      obstacleSpeed = 1300;
    }
    if (score.innerText >= 35) {
      obstacleAmount = 20;
      obstacleSpeed = 1200;
    }
    if (score.innerText >= 50) {
      score.innerText = "LEVEL: IMPOSSIBLE";
      obstacleSpeed = 400;
    }

    for (let i = 0; i < obstacleAmount; i++) {
      const obstacle = document.createElement("div");
      obstacle.classList.add("obstacle");
      obstacle.style.left = generateObstaclePosition() - rootFontSizeNumber * 5 + "px";
      game.appendChild(obstacle);

      dropObstacle(obstacle);
    }
  }

  function checkCollision() {
    const obstacles = document.querySelectorAll(".obstacle");
    obstacles.forEach((obst) => {
      const obstRect = obst.getBoundingClientRect();
      const characterRect = character.getBoundingClientRect();
      if (
        obstRect.right >= characterRect.left &&
        obstRect.left <= characterRect.right &&
        obstRect.bottom >= characterRect.top &&
        obstRect.top <= characterRect.bottom
      ) {
        alert("game over");
        window.location.reload();
      }
    });
  }

  //helper functions
  function generateObstaclePosition() {
    let windowWidth = window.innerWidth;

    let obstaclePosition = Math.random() * windowWidth;

    return obstaclePosition;
  }

  function dropObstacle(obst) {
    animationInterval = obst.animate([{ top: "100%" }], {
      duration: obstacleSpeed,
      delay: generateDelay(),
    });
    animationInterval.onfinish = () => {
      game.removeChild(obst);
    };
  }

  function generateDelay() {
    return Math.random() * 1500;
  }
}

window.addEventListener("click", startGame);
