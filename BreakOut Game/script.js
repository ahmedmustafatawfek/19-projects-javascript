const rulesBtn = document.querySelector("#rules-btn");
const closeBtn = document.querySelector("#close-btn");
const rules = document.querySelector("#rules");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;

// create ball props
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
  visible: true,
};

// create paddle props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height / 2 - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
  visible: true,
};

// create brick props
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

// create bricks


// Draw ball on canvas
function drawball() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

// Draw paddle on canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

// draw everyThing
function draw() {
  drawball();
  drawPaddle();
  drawScore();
}

// draw score on canvas
function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillText(`Score : ${score}`, canvas.width - 100, 30);
}

draw();

// rules and close event listener
rulesBtn.addEventListener("click", () => {
  rules.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  rules.classList.remove("show");
});
