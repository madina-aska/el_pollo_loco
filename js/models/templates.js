/**
 * Generates the HTML string for the Win Screen modal.
 * @returns {string} HTML markup for the win screen.
 */
function winScreen() {
  return /*html*/ `
        <div id="winScreen" class="winScreen">
            <img id="winScreen-img" class="winScreen-img" src="img/You won, you lost/You Win A.png">
            <div id="winScreen-btn" class="winScreen-button-container">
                <button onclick="restartGame('winScreen')" class="main-button"> ▶ Play Again</button>
                ${homeButton()}
            </div>
        </div>
    `;
}

/**
 * Generates the HTML string for the Lose Screen modal.
 * @returns {string} HTML markup for the lose screen.
 */
function loseScreen() {
  return /*html*/ `
        <div id="loseScreen" class="loseScreen">
            <img id="loseScreen-img" class="loseScreen-img" src="img/9_intro_outro_screens/game_over/oh no you lost!.png">
            <div id="loseScreen-btn" class="loseScreen-button-container">
                <button onclick="restartGame('loseScreen')" class="main-button">Try Again</button>
                ${homeButton()}
            </div>
        </div>
    `;
}

/**
 * Generates the Home button HTML snippet.
 * @returns {string} HTML markup for the home button.
 */
function homeButton() {
  return `<button class="main-button" onclick="goToHomePage()"> Back to Home</button>`;
}
