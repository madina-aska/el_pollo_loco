let canvas;
let world;
let keyboard = new Keyboard();
let gamePaused = false;
let gameStarted = false;
let isSoundMuted = false;

let sounds = {
  background_sound: new Audio("audio/background.mp3"),
  win_sound: new Audio("audio/win.mp3"),
  lose_sound: new Audio("audio/lose.mp3"),
  walking_sound: new Audio("audio/running.mp3"),
  jumping_sound: new Audio("audio/jumping.mp3"),
  hurt_sound: new Audio("audio/hurt.mp3"),
  dying_sound: new Audio("audio/dying.mp3"),
  bounce_sound: new Audio("audio/boing.mp3"),
  coin_collecting: new Audio("audio/coin.mp3"),
  bottle_collecting: new Audio("audio/collect-bottle.mp3"),
  bottle_throwing: new Audio("audio/throw.mp3"),
  bottle_breaking: new Audio("audio/breaking-glass.mp3"),
  chicken_cluking: new Audio("audio/chicken-cluking.mp3"),
};

if (localStorage.getItem("isSoundMuted") !== null) {
  isSoundMuted = localStorage.getItem("isSoundMuted") === "true";
}

/**
 * Initializes the game when the window is fully loaded.
 * Sets up the level and key listeners.
 */
window.onload = function () {
  setupLevel();
  applySoundSetting();

  /**
   * Handles keyboard key press events.
   * Sets corresponding flags in the `keyboard` object.
   */
  document.onkeydown = function (e) {
    let key = e.key;
    if (key == "ArrowRight") keyboard.RIGHT = true;
    if (key == "ArrowLeft") keyboard.LEFT = true;
    if (key == "ArrowUp") keyboard.UP = true;
    if (key == "ArrowDown") keyboard.DOWN = true;
    if (key == " ") keyboard.SPACE = true;
    if (key == "d" || key == "D") keyboard.D = true;
  };

  /**
  * Initializes mobile touch controls for movement and actions.
  * Delayed slightly to ensure DOM elements are loaded.
  * Adds touch event listeners that prevent default behavior only if the event is cancelable,
  * to avoid browser warnings while ensuring game controls work smoothly on touch devices.
  */
  document.onkeyup = function (e) {
    let key = e.key;
    if (key == "ArrowRight") keyboard.RIGHT = false;
    if (key == "ArrowLeft") keyboard.LEFT = false;
    if (key == "ArrowUp") keyboard.UP = false;
    if (key == "ArrowDown") keyboard.DOWN = false;
    if (key == " ") keyboard.SPACE = false;
    if (key == "d" || key == "D") keyboard.D = false;
  };

  setupImpressumLoader();
};

/**
 * Sets up touch event handlers for a given button and keyboard key mapping.
 * The handlers set the corresponding key flag in the keyboard object on touch start/end.
 * Calls e.preventDefault() only if the event is cancelable to avoid browser warnings.
 * 
 * @param {string} buttonId - The ID of the button element.
 * @param {string} keyName - The name of the key in the keyboard object to toggle.
 */
setTimeout(initTouchControls, 100);

function initTouchControls() {
  setupTouchControl("btn-left", "LEFT");
  setupTouchControl("btn-right", "RIGHT");
  setupTouchControl("btn-jump", "SPACE");
  setupTouchControl("btn-throw", "D");
}

function setupTouchControl(buttonId, keyName) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;

  btn.ontouchstart = function (e) {
    if (e.cancelable) e.preventDefault();
    keyboard[keyName] = true;
  };

  btn.ontouchend = function (e) {
    if (e.cancelable) e.preventDefault();
    keyboard[keyName] = false;
  };
}


/**
 * Initializes the Impressum modal functionality.
 * Sets up click handlers for opening and closing the Impressum modal.
 */
function setupImpressumLoader() {
  const link = document.getElementById("impressum-link");
  const modal = document.getElementById("impressum-modal");
  const content = document.getElementById("impressum-content-container");
  const back = modal.querySelector("a.main-button");

  link.onclick = e => { e.preventDefault(); loadImpressum(content, modal); };
  back.onclick = e => { e.preventDefault(); closeImpressum(content, modal); };
}


/**
 * Loads the Impressum content asynchronously into the modal.
 * @param {HTMLElement} content - The container where Impressum HTML will be inserted.
 * @param {HTMLElement} modal - The modal element to show after content loads.
 */
function loadImpressum(content, modal) {
  const req = new XMLHttpRequest();
  req.open("GET", "impressum.html");
  req.onload = () => { content.innerHTML = req.responseText; modal.classList.remove("d-none"); };
  req.send();
}


/**
 * Closes the Impressum modal and clears its content.
 * @param {HTMLElement} content - The container whose content will be cleared.
 * @param {HTMLElement} modal - The modal element to hide.
 */
function closeImpressum(content, modal) {
  content.innerHTML = "";
  modal.classList.add("d-none");
}

/**
 * Starts the game by hiding the start screen and initializing game world.
 */
function startGame() {
  const startScreen = document.getElementById("start-screen");
  const canvas = document.getElementById("canvas-container");
  startScreen.classList.add("d-none");
  canvas.classList.remove("d-none");
  initGame();
  setupLevel();
}

/**
 * Restarts the game from a specific status (win or lose).
 * @param {string} status - ID of the status screen to remove (e.g., "winScreen", "loseScreen").
 */
function restartGame(status) {
  if (status) {
    document.getElementById("end-screen").classList.add("d-none");
    document.getElementById(`${status}`).remove();
  }

  const mobileIcons = document.getElementById("icons-mobile");
  if (mobileIcons) {
    mobileIcons.style.display = "flex";
  }

  gameStarted = false;
  clearAllIntervals();
  pauseAllAudio();
  setupLevel();
  initGame();
}

/**
 * Navigates back to the home page.
 */
function goToHomePage() {
  window.location.href = "index.html";
}

/**
 * Initializes the game world and starts background music.
 */
function initGame() {
  gameStarted = true;
  gamePaused = false;
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  sounds.background_sound.volume = 0.1;
  sounds.background_sound.loop = true;
  sounds.background_sound.play();
}

/**
 * Pauses all sound effects except for background, win, and lose sounds.
 */
function pauseAllAudio() {
  for (let audio in sounds) {
    if (
      audio != "background_sound" &&
      audio != "win_sound" &&
      audio != "lose_sound"
    ) {
      sounds[audio].pause();
    }
  }
}

/**
 * Clears all intervals in the game (used on restart).
 */
function clearAllIntervals() {
  for (let i = 0; i < 1000; i++) {
    window.clearInterval(i);
  }
}

/**
 * Displays the end screen for win or lose status.
 * @param {string} status - Either 'winScreen' or 'loseScreen'.
 */
async function displayGameOverScreen(status) {
  const endScreen = document.getElementById("end-screen");
  const statusContainer = document.getElementById(status);
  const mobileIcons = document.getElementById("icons-mobile");
  endScreen.classList.remove("d-none");
  if (!statusContainer) {
    const html = status === "winScreen" ? winScreen() : loseScreen();
    endScreen.innerHTML += html;
    animateEndScreen(status);
  }
  if (mobileIcons) {
    mobileIcons.style.display = "none";
  }
}

/**
 * Animates the end screen images and buttons after a delay.
 * @param {string} status - 'winScreen' or 'loseScreen'.
 */
function animateEndScreen(status) {
  const img = document.getElementById(`${status}-img`);
  const btn = document.getElementById(`${status}-btn`);
  if (!img || !btn) return;

  setTimeout(() => {
    img.classList.add("op-1");
  }, 200);

  setTimeout(() => {
    img.classList.remove("op-1");
    btn.classList.add("op-1");
  }, 3000);
}

/**
 * Toggles sound on/off and updates the sound button icon.
 */
function toggleSound() {
  isSoundMuted = !isSoundMuted;
  localStorage.setItem("isSoundMuted", isSoundMuted);
  applySoundSetting();
}


function applySoundSetting() {
  const soundBtn = document.getElementById("sound-button");
  if (soundBtn) {
    soundBtn.src = isSoundMuted ? "img/Icons/mute.png" : "img/Icons/unmute.png";
  }
  for (let key in sounds) {
    if (sounds[key] instanceof HTMLAudioElement) {
      sounds[key].muted = isSoundMuted;
    }
  }
}