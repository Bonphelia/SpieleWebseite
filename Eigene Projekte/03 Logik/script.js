// =========================================================================
// 1. GAME SETUP & STATE (Deine Basis-Infos)
// =========================================================================
const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const scoreDisplay = document.getElementById("score"); // Neu für die Punkte

// Spieler-Zustand
let playerX = 380;
let rightPressed = false;
let leftPressed = false;

// Gegner-Zustand (Ein einzelner Ball für den Anfang)
let enemyX = 390; // Start in der Mitte (800 / 2 - 10)
let enemyY = 0;   // Start ganz oben am Himmel (0 ist top)
let enemySpeed = 4;

// Spiel-Statistiken
let score = 0;


// =========================================================================
// 2. INPUT HANDLER (Tastatur)
// =========================================================================
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") rightPressed = true;
    if (e.key === "ArrowLeft") leftPressed = true;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight") rightPressed = false;
    if (e.key === "ArrowLeft") leftPressed = false;
});


// =========================================================================
// 3. LOGIK-FUNKTIONEN (Berechnungen)
// =========================================================================

function movePlayer() {
    if (rightPressed) playerX += 5;
    if (leftPressed) playerX -= 5;

    // Grenzen checken
    if (playerX < 0) playerX = 0;
    if (playerX > 760) playerX = 760;
}

function moveEnemies() {
    // Der Ball fällt nach unten (Y-Wert wird größer)
    enemyY += enemySpeed;

    // Wenn der Ball den Boden berührt (Himmel ist 400px hoch)
    if (enemyY > 400) {
        resetEnemy();
        score += 10; // Punkte geben, wenn ausgewichen wurde
    }
}

function resetEnemy() {
    // Setzt den Ball wieder nach oben an eine zufällige X-Position
    enemyY = 0;
    enemyX = Math.floor(Math.random() * 780); // Zufall zwischen 0 und 780
}

function checkCollisions() {
    // Da wir CSS 'bottom' nutzen, müssen wir das für die Logik beachten.
    // Der Spieler ist bei bottom: 100px (Y-Achse von unten).
    // Der Ball fällt von top: 0px bis top: 400px (Grenze zum Boden).
    
    // Einfache Hitbox-Logik:
    // Wenn der Ball auf der Höhe des Spielers ist (Y-Wert im Bereich des Spielers)
    if (enemyY >= 360 && enemyY <= 400) {
        // Und wenn der Ball sich horizontal mit dem Spieler überschneidet
        if (enemyX + 20 >= playerX && enemyX <= playerX + 40) {
            // Treffer! Spiel zurücksetzen oder Leben abziehen
            score = 0; 
            resetEnemy();
        }
    }
}


// =========================================================================
// 4. RENDER-FUNKTIONEN (Visuelle Darstellung)
// =========================================================================
function render() {
    // Hier wird das gezeichnet, was in den Logik-Funktionen berechnet wurde
    player.style.left = playerX + "px";
    
    enemy.style.left = enemyX + "px";
    enemy.style.top = enemyY + "px"; // Wir steuern den Ball über 'top' statt 'bottom'
    
    scoreDisplay.innerText = "Score: " + score;
}


// =========================================================================
// 5. GAME LOOP
// =========================================================================
function gameLoop() {
    // 1. Logik updaten
    movePlayer();
    moveEnemies();
    checkCollisions();
    
    // 2. Alles auf dem Bildschirm zeichnen
    render();

    requestAnimationFrame(gameLoop);
}

// Spiel starten
resetEnemy();
gameLoop();