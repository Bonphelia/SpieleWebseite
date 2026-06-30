// =========================================================================
// 1. GAME SETUP & STATE
// =========================================================================
const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const scoreDisplay = document.getElementById("score");

// Overlays
const menuOverlay = document.getElementById("menu-overlay");
const pauseOverlay = document.getElementById("pause-overlay");

// Zustandsvariablen (State Machine)
let gameState = "MENUE";    // Mögliche Zustände: "MENUE", "SPIELT", "PAUSE"
let currentMode = "AUSWEICHEN"; // "AUSWEICHEN" oder "FANGEN"

// Spieler- & Gegner-Basisinfos
let playerX = 380;
let rightPressed = false;
let leftPressed = false;

let enemyX = 390;
let enemyY = 0;
let enemySpeed = 4;
let score = 0;

// =========================================================================
// 2. INPUT HANDLER (Tastatur mit ESC-Erweiterung)
// =========================================================================
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") rightPressed = true;
    if (e.key === "ArrowLeft") leftPressed = true;
    
    // ESC Taste abfragen
    if (e.key === "Escape") {
        if (gameState === "SPIELT") {
            pauseGame();
        } else if (gameState === "PAUSE") {
            resumeGame();
        }
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight") rightPressed = false;
    if (e.key === "ArrowLeft") leftPressed = false;
});

// =========================================================================
// 3. MENÜ-STEUERUNG (Funktionen für Buttons)
// =========================================================================
function selectMode(mode) {
    currentMode = mode;
    
    // Visuelles Feedback: Buttons umfärben
    const buttons = document.querySelectorAll(".mode-btn");
    buttons.forEach(btn => btn.classList.remove("active"));
    
    // Fügt dem geklickten Button die 'active' Klasse hinzu
    event.target.classList.add("active");
}

function startGame() {
    gameState = "SPIELT";
    menuOverlay.classList.add("hidden");
    score = 0;
    resetEnemy();
}

function pauseGame() {
    gameState = "PAUSE";
    pauseOverlay.classList.remove("hidden");
}

function resumeGame() {
    gameState = "SPIELT";
    pauseOverlay.classList.add("hidden");
}

function backToMenu() {
    gameState = "MENUE";
    pauseOverlay.classList.add("hidden");
    menuOverlay.classList.remove("hidden");
}

// =========================================================================
// 4. SPIELLOGIK
// =========================================================================
function movePlayer() {
    if (rightPressed) playerX += 5;
    if (leftPressed) playerX -= 5;

    if (playerX < 0) playerX = 0;
    if (playerX > 760) playerX = 760;
}

function moveEnemies() {
    enemyY += enemySpeed;

    if (enemyY > 400) { // Ball fällt auf den Boden
        if (currentMode === "AUSWEICHEN") {
            // Beim Ausweichen ist es gut, wenn er den Boden berührt -> Punkte!
            score += 10;
        } else if (currentMode === "FANGEN") {
            // Beim Fangen hast du ihn durchgelassen -> Punktabzug oder Reset
            score = Math.max(0, score - 5); 
        }
        resetEnemy();
    }
}

function resetEnemy() {
    enemyY = 0;
    enemyX = Math.floor(Math.random() * 780);
}

function checkCollisions() {
    // Überschneidung auf der Y-Achse (Höhe des braunen Quadrats)
    if (enemyY >= 360 && enemyY <= 400) {
        // Überschneidung auf der X-Achse
        if (enemyX + 20 >= playerX && enemyX <= playerX + 40) {
            
            if (currentMode === "AUSWEICHEN") {
                // Getroffen beim Ausweichen = schlecht!
                score = 0; 
                resetEnemy();
            } 
            else if (currentMode === "FANGEN") {
                // Getroffen beim Fangen = super! Punkte!
                score += 10;
                resetEnemy();
            }
        }
    }
}

// =========================================================================
// 5. RENDER & GAME LOOP
// =========================================================================
function render() {
    player.style.left = playerX + "px";
    enemy.style.left = enemyX + "px";
    enemy.style.top = enemyY + "px";
    scoreDisplay.innerText = "Score: " + score;
}

function gameLoop() {
    // Nur wenn das Spiel aktiv läuft, berechnen wir die Physik/Logik
    if (gameState === "SPIELT") {
        movePlayer();
        moveEnemies();
        checkCollisions();
        render(); // Zeichnen auch nur bei Änderungen nötig
    }

    // Die Loop läuft im Hintergrund immer weiter, damit sie auf ESC-Druck reagieren kann
    requestAnimationFrame(gameLoop);
}

// Spiel-Loop direkt starten
gameLoop();