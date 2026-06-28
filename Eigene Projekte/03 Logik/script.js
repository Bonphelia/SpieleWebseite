// ==========================
// PLAYER SETUP
// ==========================

const player = document.getElementById("player");

let playerX = 380;
let rightPressed = false;
let leftPressed = false;


// ==========================
// INPUT (TASTATUR)
// ==========================

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") rightPressed = true;
    if (e.key === "ArrowLeft") leftPressed = true;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight") rightPressed = false;
    if (e.key === "ArrowLeft") leftPressed = false;
});


// ==========================
// PLAYER BEWEGUNG
// ==========================

function movePlayer() {

    if (rightPressed) {
        playerX += 5;
    }

    if (leftPressed) {
        playerX -= 5;
    }

    // linke Grenze
    if (playerX < 0) {
        playerX = 0;
    }

    // rechte Grenze (800px Spielfeld - 40px Spieler)
    if (playerX > 760) {
        playerX = 760;
    }

    player.style.left = playerX + "px";
}


// ==========================
// PLACEHOLDER FUNKTIONEN
// (damit nichts crasht, falls du sie später baust)
// ==========================

//______________________________________________________________________

//Fallende Objekte
const enemy = document.getElementById("enemy");

let enemyx = 480;

function moveEnemies() {
    

}
// Für fall enemies damit automatisch jede sekunde
setInterval(function()
{

},1000)

function checkCollisions() {
    // später
}

function updateScore() {
    // später
}

function render() {
    // später
}


// ==========================
// GAME LOOP
// ==========================

function gameLoop() {

    movePlayer();
    moveEnemies();
    checkCollisions();
    updateScore();
    render();

    requestAnimationFrame(gameLoop);
}


// Start
gameLoop();