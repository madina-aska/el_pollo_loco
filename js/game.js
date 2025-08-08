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

/**
 * Initializes the game when the window is fully loaded.
 * Sets up the level and key listeners.
 */
window.onload = function () {
  setupLevel();

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
   * Handles keyboard key release events.
   * Resets corresponding flags in the `keyboard` object.
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
 * Initializes mobile touch controls for movement and actions.
 * Delayed slightly to ensure DOM elements are loaded.
 */
setTimeout(function () {
  let btnLeft = document.getElementById("btn-left");
  let btnRight = document.getElementById("btn-right");
  let btnJump = document.getElementById("btn-jump");
  let btnThrow = document.getElementById("btn-throw");

  if (btnLeft) {
    btnLeft.ontouchstart = function (e) {
      e.preventDefault();
      keyboard.LEFT = true;
    };
    btnLeft.ontouchend = function (e) {
      e.preventDefault();
      keyboard.LEFT = false;
    };
  }

  if (btnRight) {
    btnRight.ontouchstart = function (e) {
      e.preventDefault();
      keyboard.RIGHT = true;
    };
    btnRight.ontouchend = function (e) {
      e.preventDefault();
      keyboard.RIGHT = false;
    };
  }

  if (btnJump) {
    btnJump.ontouchstart = function (e) {
      e.preventDefault();
      keyboard.SPACE = true;
    };
    btnJump.ontouchend = function (e) {
      e.preventDefault();
      keyboard.SPACE = false;
    };
  }

  if (btnThrow) {
    btnThrow.ontouchstart = function (e) {
      e.preventDefault();
      keyboard.D = true;
    };
    btnThrow.ontouchend = function (e) {
      e.preventDefault();
      keyboard.D = false;
    };
  }
}, 100);

/**
 * Loads and displays the Impressum modal using AJAX.
 */
function setupImpressumLoader() {
  var link = document.getElementById("impressum-link");
  var modal = document.getElementById("impressum-modal");
  var content = document.getElementById("impressum-content-container");
  var back = modal.querySelector("a.main-button");

  link.onclick = function (event) {
    event.preventDefault();

    var request = new XMLHttpRequest();
    request.open("GET", "impressum.html", true);
    request.onload = function () {
      content.innerHTML = request.responseText;
      modal.classList.remove("d-none");
    };
    request.send();
  };

  back.onclick = function (event) {
    event.preventDefault();
    modal.classList.add("d-none");
    content.innerHTML = "";
  };
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

  const soundBtn = document.getElementById("sound-button");
  soundBtn.src = isSoundMuted ? "img/Icons/mute.png" : "img/Icons/unmute.png";

  for (let key in sounds) {
    if (sounds[key] instanceof HTMLAudioElement) {
      sounds[key].muted = isSoundMuted;
    }
  }
}
