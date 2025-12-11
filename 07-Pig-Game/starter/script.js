'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;

let currentScore, activePlayer, scores, playing;

// DRY - Don't Repeat Yourself - Function to initialize the game
const init = function () {
  //Remove winner class and hide the winner text
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  document.querySelector('#winner--0').classList.add('hidden');
  document.querySelector('#winner--1').classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  // Hide dice image at the start
  diceEl.classList.add('hidden');

  //Reset scores in the UI
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  //Reset all the values and classes
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
};

// DRY - Don't Repeat Yourself for Switching Player
function switchPlayer() {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// Call the init function to set up the game
init();

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (!playing) return;
  // 1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // 3. Check for rolled 1: if true,
  if (dice !== 1) {
    currentScore += dice;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // switch to next player
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (!playing) return;
  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 20) {
    // Finish the game
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`#winner--${activePlayer}`)
      .classList.remove('hidden');
    document.querySelector(`.dice`).classList.add('hidden');
    playing = false;
  } else {
    // Switch to the next player
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);

//Summary of DOM manipulation methods used:
// .querySelector() - Selects the first element that matches a specified CSS selector.
// .getElementById() - Selects an element by its ID.
// .textContent - Gets or sets the text content of an element.
// .classList.add() - Adds a specified class to an element's class list.
// .classList.remove() - Removes a specified class from an element's class list.
// .classList.toggle() - Toggles a specified class on or off for an element.
// .src - Gets or sets the source URL of an image element.
// .addEventListener() - Attaches an event handler to an element for a specified event type.
// .trunc() - A method of the Math object that truncates a number to its integer part.
// .random() - A method of the Math object that generates a random floating-point number between 0 (inclusive) and 1 (exclusive).
// Template literals (``) - A way to embed expressions within string literals using backticks and ${} syntax.
// Event listeners for button clicks to handle game actions.
// Functions to initialize the game and switch players, promoting code reusability and organization.
// Conditional statements to manage game logic based on player actions and scores.
// Overall, these methods and techniques are used to create an interactive web-based game by manipulating the Document Object Model (DOM) in response to user actions.
