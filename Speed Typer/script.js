const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("setting-btn");
const settings = document.getElementById("setting");
const settingsForm = document.getElementById("setting-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
var words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;
// set difficulty to value to local storage
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "easy";

//set difficulty select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "easy";

// focus on text on start
text.focus();

// start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
getRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

// add word to DOM
addWordToDOM = () => {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
};

// update score
updateScore = () => {
  score++;
  scoreEl.innerHTML = score;
};

// update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";
  if (time === 0) {
    clearInterval(timeInterval);
    // end Game
    gameOver();
  }
}

// Game Over , show and Screen
function gameOver() {
  endgameEl.innerHTML = `
  <h1>Time ran out</h1>
  <p>Your final score is  ${score}</p>
  <button class="reload-btn" onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = "flex";
}

addWordToDOM();
// event listeners

// typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    // clear
    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// setting difficulty
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

// settings select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
