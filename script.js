import { makeMove, getBoardState, resetBoardState, checkWinner } from "./game.js"
import { showGameScreen, getPlayersNames, updateTurnInfo } from "./ui.js"
import { drawWinningLine } from "./board.js"

let playersNames = ["", ""];
let activePlayer = 1;

function handleMove(index) {
    const boardState = getBoardState();
    if (boardState[index]) {
        return;
    }
    const symbol = activePlayer === 1 ? "O" : "X";
    makeMove(index, symbol);
    document.getElementsByClassName("cell")[index].innerText = symbol;

    const winner = checkWinner();

    if (winner) {
        drawWinningLine(winner);
        setTimeout(() => {
            alert(`${playersNames[activePlayer - 1]} wins!`);
            resetAndPrepareGame();
        }, 500);
    } else if (!boardState.includes("")) {
        setTimeout(() => {
            alert("It\'s a draw!");
            resetAndPrepareGame();
        }, 500);
    } else {
        activePlayer = 3 - activePlayer;
        updateTurnInfo(playersNames[activePlayer - 1]);
    }
}

function resetAndPrepareGame() {
    resetBoardState();
    activePlayer = 1;
    const cells = document.getElementsByClassName("cell");
    Array.from(cells).forEach(cell => cell.innerText = "");
    const line = document.querySelector(".winning-line");
    if (line) {
        line.remove();
    }
    updateTurnInfo(playersNames[0]);
}

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("confirmButton").addEventListener("click", () => {
        const names = getPlayersNames();
        if (!names[0] || !names[1]) {
            alert("Please enter both player names!");
            return;
        }
        activePlayer = 1;
        playersNames = names;
        showGameScreen();
        updateTurnInfo(playersNames[0]);
    });

    document.querySelectorAll(".cell").forEach((cell, index) => {
        cell.addEventListener("click", () => handleMove(index));
    });

    document.getElementById("resetButton").addEventListener("click", () => {
        resetAndPrepareGame();
    });
});