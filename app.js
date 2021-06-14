let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

const game = document.querySelector(".game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

minNum.textContent = min;
maxNum.textContent = max;

/* Listening and triggering the guess event. */
guessBtn.addEventListener("click", guessEvent);

/* Adding event listener for play again option after game over */
game.addEventListener("mousedown", function (event) {
  if (event.target.className === "play-again") {
    console.log("Event triggered : play again!!");
    window.location.reload();
  }
});

function guessEvent(event) {
  let guess = parseInt(guessInput.value);
  console.log(guess);
  /* validate the input */
  if (isNaN(guess) || guess > max || guess < min) {
    setMessage(`Please enter number in the range of ${min} and ${max}`, "red");
  }
  /* Win case */
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct , YOU WIN!!`);
  } else {
    guessesLeft -= 1;
    /* Lose case */
    if (guessesLeft === 0) {
      gameOver(
        false,
        `GAME OVER!! YOU LOST!! The correct number was ${winningNum} `
      );
    } else {
      setMessage(
        `${guess} is wrong!! Attempts remaining : ${guessesLeft}`,
        "red"
      );
      guessInput.value = "";
      guessInput.style.borderColor = "red";
    }
  }
}

function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}

function gameOver(won, msg) {
  let col;
  col = won === true ? (col = "green") : (col = "red");
  guessInput.disabled = true;
  guessInput.style.borderColor = col;
  setMessage(msg, col);
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

function getRandomNum(min, max) {
  console.log(
    "Correct num:",
    Math.floor(Math.random() * (max - min + 1) + min)
  );
  return Math.floor(Math.random() * (max - min + 1) + min);
}
