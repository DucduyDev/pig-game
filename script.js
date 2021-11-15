"use strict";

const player0El = document.querySelector(".player--0"); // Player 1
const player1El = document.querySelector(".player--1"); // Player 2

const score0 = document.getElementById("score--0"); // Player 1's score
const score1 = document.getElementById("score--1"); // PLayer 2's score

const current0El = document.getElementById("current--0"); // Player 1's current score
const current1El = document.getElementById("current--1"); // Player 1's current score

const btnNew = document.querySelector(".btn--new"); // New game button
const btnRoll = document.querySelector(".btn--roll"); // Roll dice button
const btnHold = document.querySelector(".btn--hold"); // Hold button
const diceEl = document.querySelector(".dice"); // Dice img

let scores, currentScore, activePlayer, playing;

const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;

  diceEl.classList.add("hidden");

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");

  player1El.classList.remove("player--active");

  player0El.classList.add("player--active");

  score0.textContent = 0;
  score1.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
};

init();

const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore; // Set current score of the current player to 0

  activePlayer = activePlayer === 0 ? 1 : 0; // Switch player 1 => 0, 0 => 1

  player0El.classList.toggle("player--active");

  player1El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", () => {
  if (playing) {
    let randomDice = Math.trunc(Math.random() * 6) + 1; // Random

    diceEl.classList.remove("hidden"); // Show the dice

    diceEl.setAttribute("src", `./images/dice-${randomDice}.png`); // Set img source

    if (randomDice !== 1) {
      currentScore += randomDice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 10) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

//  New game
btnNew.addEventListener("click", () => {
  init();
});
