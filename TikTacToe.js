const cells = document.querySelectorAll(".cell");
const board = document.getElementById("board");
const statusDisplay = document.querySelector(".status-display");
const gameOverScreen = document.getElementById("gameOverScreen");
const gameOverMessage = document.getElementById("gameOverMessage");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(e) {
    const clickedCell = e.target;
    const cellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));

    if (gameState[cellIndex] !== "" || !gameActive) {
        return;
    }

    updateCell(clickedCell, cellIndex);
    checkResult();
}

function updateCell(cell, index) {
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
}

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
    board.classList.toggle("x-turn", currentPlayer === "X");
    board.classList.toggle("o-turn", currentPlayer === "O");
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningCombinations.length; i++) {
        const winCondition = winningCombinations[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        endGame(false);
        return;
    }

    if (!gameState.includes("")) {
        endGame(true);
        return;
    }

    switchPlayer();
}

function endGame(isDraw) {
    gameActive = false;
    board.classList.add("game-over");

    if (isDraw) {
        gameOverMessage.textContent = "It's a Draw! 😅";
    } else {
        gameOverMessage.innerHTML = `Player <span class="${currentPlayer.toLowerCase()}">${currentPlayer}</span> Wins! 🎉`;
    }

    gameOverScreen.classList.remove("hidden");
    setTimeout(() => gameOverScreen.classList.add("show"), 10);
}

function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
    board.classList.remove("game-over", "o-turn");
    board.classList.add("x-turn");
    
    gameOverScreen.classList.remove("show");
    setTimeout(() => gameOverScreen.classList.add("hidden"), 300);

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o");
    });
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);

board.classList.add("x-turn");