export function updateTurnInfo(currentPlayerName) {
    const turnInfo = document.getElementById("turnInfo");
    turnInfo.textContent = `It's ${currentPlayerName}'s turn`;
}

export function showGameScreen() {
    document.getElementById("inputScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
}

export function getPlayersNames() {
    const firstPlayer = document.getElementById("firstPlayer").value;
    const secondPlayer = document.getElementById("secondPlayer").value;

    return [firstPlayer, secondPlayer];
}