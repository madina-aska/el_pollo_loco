let canvas;
let world;
let keyboard = new Keyboard();
let gamePaused = false;
let gameStarted = false;

//sets up keyboard and touch input controls to handle player movement, jumping, and throwing when the game loads.
window.onload = function () {
setupLevel();

  // Key press
  document.onkeydown = function (e) {
    let key = e.key;
    if (key == 'ArrowRight') keyboard.RIGHT = true;
    if (key == 'ArrowLeft') keyboard.LEFT = true;
    if (key == 'ArrowUp') keyboard.UP = true;
    if (key == 'ArrowDown') keyboard.DOWN = true;
    if (key == ' ') keyboard.SPACE = true;
    if (key == 'd' || key == 'D') keyboard.D = true;
  };

  // Key release
  document.onkeyup = function (e) {
    let key = e.key;
    if (key == 'ArrowRight') keyboard.RIGHT = false;
    if (key == 'ArrowLeft') keyboard.LEFT = false;
    if (key == 'ArrowUp') keyboard.UP = false;
    if (key == 'ArrowDown') keyboard.DOWN = false;
    if (key == ' ') keyboard.SPACE = false;
    if (key == 'd' || key == 'D') keyboard.D = false;
  };
};


setTimeout(function () {
  let btnLeft = document.getElementById('btn-left');
  let btnRight = document.getElementById('btn-right');
  let btnJump = document.getElementById('btn-jump');
  let btnThrow = document.getElementById('btn-throw');

  if (btnLeft) {
    btnLeft.ontouchstart = function (e) { e.preventDefault(); keyboard.LEFT = true; };
    btnLeft.ontouchend = function (e) { e.preventDefault(); keyboard.LEFT = false; };
  }

  if (btnRight) {
    btnRight.ontouchstart = function (e) { e.preventDefault(); keyboard.RIGHT = true; };
    btnRight.ontouchend = function (e) { e.preventDefault(); keyboard.RIGHT = false; };
  }

  if (btnJump) {
    btnJump.ontouchstart = function (e) { e.preventDefault(); keyboard.SPACE = true; };
    btnJump.ontouchend = function (e) { e.preventDefault(); keyboard.SPACE = false; };
  }

  if (btnThrow) {
    btnThrow.ontouchstart = function (e) { e.preventDefault(); keyboard.D = true; };
    btnThrow.ontouchend = function (e) { e.preventDefault(); keyboard.D = false; };
  }
}, 100); 


function startGame() {
    const startScreen = document.getElementById('start-screen');
    const canvas = document.getElementById('canvas-container');
    startScreen.classList.add('d-none');
    canvas.classList.remove('d-none');
    initGame();
   setupLevel();
    
}


function restartGame(status) {
    if (status) {
        document.getElementById('end-screen').classList.add('d-none');
        document.getElementById(`${status}`).remove();
    }
    gameStarted = false;
    clearAllIntervals();
    setupLevel();
    initGame();
}


function initGame() {
    gameStarted = true;
    gamePaused = false;
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

}

function clearAllIntervals() {
    for (let i = 0; i < 1000; i++) {
        window.clearInterval(i);
    }
}


async function displayGameOverScreen(status) {
    const endScreen = document.getElementById('end-screen');
    const statusContainer = document.getElementById(status);
    endScreen.classList.remove('d-none');
    if (!statusContainer) {
        const html = status === 'winScreen' ? winScreen() : loseScreen();
        endScreen.innerHTML += html;
        animateEndScreen(status);
    }
}


function animateEndScreen(status) {
    const img = document.getElementById(`${status}-img`);
    const btn = document.getElementById(`${status}-btn`);

    if (!img || !btn) return;

    setTimeout(() => {
        img.classList.add('op-1');
    }, 200);

    setTimeout(() => {
        img.classList.remove('op-1');
        btn.classList.add('op-1');
    }, 3000);
}