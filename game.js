let boardState = ["", "", "", "", "", "", "", "", ""];


export function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        const [firstCell, secondCell, thirdCell] = combination;
        if (boardState[firstCell] && boardState[firstCell] === boardState[secondCell] && boardState[firstCell] === boardState[thirdCell]) {
            return { combination, player: boardState[firstCell] };
        }
    }
    return null;
}

export function makeMove(index, symbol) {
    if (boardState[index]) {
        return;
    }
    return boardState[index] = symbol;
}

export function getBoardState() {
    return boardState;
}

export function resetBoardState() {
    boardState = ["", "", "", "", "", "", "", "", ""];
}