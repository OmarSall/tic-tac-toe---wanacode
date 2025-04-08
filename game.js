let boardState = ["", "", "", "", "", "", "", "", ""];


export function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return { combination, player: boardState[a] };
        }
    }
    return null;
}

export function makeMove(index, symbol) {
    if (boardState[index]) {
        return;
    }

    boardState[index] = symbol;
    return checkWinner();
}

export function getBoardState() {
    return [...boardState];
}

export function resetBoardState() {
    boardState = ["", "", "", "", "", "", "", "", ""];
}