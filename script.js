const playMusic = new Audio("music/loop.mp3");
playMusic.loop = true;
document.body.addEventListener("click", () => {
  playMusic.play();
});

const overlay = document.querySelector(".overlay");
const colorBtn = document.querySelectorAll(".color");
const colors = [
  "rgb(29, 47, 111)",
  "rgb(250, 199, 72)",
  "rgb(131, 144, 250)",
  "rgb(0, 129, 167)",
  "rgb(0, 175, 185)",
  "rgb(248, 141, 173)",
];
let randomColor = colors[Math.floor(Math.random() * colors.length)];
const guessBox = document.querySelector(".guess-box");
guessBox.style.backgroundColor = randomColor;

let score = 0;
document.querySelector(".score").textContent = score;

let resultElement = document.querySelector(".result");

// Function to show the result
function showResult(isCorrect) {
  if (isCorrect) {
    resultElement.classList.remove("correct");
    void resultElement.offsetWidth;
    resultElement.classList.add("correct"); // Add celebration animation
    resultElement.classList.remove("wrong"); // Remove fade-out animation if wrong
    const playMusic = new Audio("music/correct-2.wav");
    playMusic.play();

    score++;
    document.querySelector(".score").textContent = score;
  } else {
    const failMusic = new Audio("music/fail-1.wav");
    failMusic.play();

    document.body.addEventListener("click", () => {
      playMusic.pause();
    });

    setTimeout(() => {
      overlay.classList.remove("hidden");
    }, 2000);

    // Remove "wrong" class and reset the animation before adding it again
    resultElement.classList.remove("wrong");
    void resultElement.offsetWidth; // Trigger reflow to reset animation
    resultElement.classList.add("wrong"); // Add fade-out animation
    resultElement.classList.remove("correct"); // Remove celebration animation if correct
  }
}

startGame();
let resultMessageTimeoutId;
function startGame() {
  for (let i = 0; i < colorBtn.length; i++) {
    colorBtn[i].addEventListener("click", () => {
      const colorChosen = window.getComputedStyle(colorBtn[i]).backgroundColor;
      if (colorChosen !== randomColor) {
        if (resultMessageTimeoutId) {
          clearTimeout(resultMessageTimeoutId);
        }
        resultElement.textContent = "You Lose ❌! Try again 😭";
        setTimeout(() => {
          resultElement.textContent = "";
        }, 2000);
        showResult(false);
        // 1. Disable all color "buttons"
        for (let i = 0; i < colorBtn.length; i++) {
          colorBtn[i].style.pointerEvents = "none";
          // make it look "dimmed"
          colorBtn[i].style.opacity = "0.5";
        }
      } else if (colorChosen === randomColor) {
        if (score === 5) {
          const winMusic = new Audio("music/win.wav");
          winMusic.play();
          document.body.addEventListener("click", () => {
            playMusic.pause();
          });
          const guessBox = document.querySelector(".guess-box");
          guessBox.querySelector("img").src = "win.gif";

          if (resultMessageTimeoutId) {
            clearTimeout(resultMessageTimeoutId);
          }

          setTimeout(() => {
            resultElement.classList.add("win");
            resultElement.textContent = "You win. Congratulations! 🎉🏆";
          }, 1000);

          for (let i = 0; i < colorBtn.length; i++) {
            colorBtn[i].style.pointerEvents = "none";
            // make it look "dimmed"
            colorBtn[i].style.opacity = "0.5";
          }
        } else {
          console.log("are we here!!!");
          showResult(true);
          colorBtn[i].querySelector("img").src = "win.gif";
          setTimeout(() => {
            colorBtn[i].querySelector("img").src = "";
          }, 1000);

          resultElement.textContent = "Correct. Congratulations! 🎉🏆";
          if (resultMessageTimeoutId) {
            clearTimeout(resultMessageTimeoutId);
          }

          resultMessageTimeoutId = setTimeout(() => {
            resultElement.textContent = "";
          }, 1000);

          randomColor = colors[Math.floor(Math.random() * colors.length)];
          guessBox.style.backgroundColor = randomColor;
        }
      }
    });
  }
}
const newGameBtn = document.querySelectorAll(".btn-new");

for (let i = 0; i < newGameBtn.length; i++) {
  newGameBtn[i].addEventListener("click", () => {
    console.log("inside new button", resultElement);
    document.body.addEventListener("click", () => {
      playMusic.pause();
    });
    overlay.classList.add("hidden");
    for (let j = 0; j < colorBtn.length; j++) {
      colorBtn[j].style.pointerEvents = "auto";
      colorBtn[j].style.opacity = "1"; // reset styling if you used opacity
    }
    score = 0;
    document.querySelector(".score").textContent = score;
    randomColor = colors[Math.floor(Math.random() * colors.length)];
    guessBox.style.backgroundColor = randomColor;
  });
}

// reset guess color
// result message