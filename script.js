let activePlayer = 1;
let boardState = ['', '', '', '', '', '', '', '', ''];
let playersNames = ['', ''];
let winningCombination = [];

// Start the game after player names are entered
function startGame() {
    playersNames[0] = document.getElementById('firstPlayer').value;
    playersNames[1] = document.getElementById('secondPlayer').value;

    if (!playersNames[0] || !playersNames[1]) {
        alert('Please enter both player names!');
        return;
    }

    document.getElementById('inputScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    updateTurnInfo();
}

// Handle player's move
function makeMove(index) {
    if (boardState[index]) return; // Field already taken

    // Mark the cell as X or O
    boardState[index] = activePlayer === 1 ? 'O' : 'X';
    document.getElementsByClassName('cell')[index].innerText = boardState[index];

    // Check if there's a winner
    const winner = checkWinner();
    if (winner) {
        drawWinningLine(winner);
        setTimeout(() => {
            alert(`${playersNames[activePlayer - 1]} wins!`);
            resetGame();
        }, 500); // Wait before resetting the game
    } else if (!boardState.includes('')) {
        setTimeout(() => {
            alert('It\'s a draw!');
            resetGame();
        }, 500);
    } else {
        activePlayer = 3 - activePlayer; // Switch player (1 to 2 or 2 to 1)
        updateTurnInfo();
    }
}

// Update the turn information
function updateTurnInfo() {
    const turnInfo = document.getElementById('turnInfo');
    turnInfo.textContent = `It's ${playersNames[activePlayer - 1]}'s turn`;
}

// Check for a winner
function checkWinner() {
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

    return null; // No winner
}

// Draw the winning line
function drawWinningLine({ combination, player }) {
    const cells = document.getElementsByClassName('cell');
    const line = document.createElement('div');
    line.classList.add('winning-line');
    const [a, b, c] = combination;
    const cellA = cells[a].getBoundingClientRect();
    const cellB = cells[b].getBoundingClientRect();
    const cellC = cells[c].getBoundingClientRect();

    let left, top, width, height, transform;

    // Check for vertical win
    if (a % 3 === b % 3 && b % 3 === c % 3) { // Vertical line
        left = cellA.left + (cellA.width / 2) - 3; // Center of the column
        top = cellA.top;
        height = cellC.bottom - cellA.top;
        width = 5; // Small width for vertical line
    } 
    // Check for diagonal win (top-left to bottom-right)
    else if (a === 0 && b === 4 && c === 8) { // Diagonal (top-left to bottom-right)
        left = cellB.left + (cellB.width / 2) - 3;
        top = (1/12)*cellA.top;
        height = Math.sqrt(Math.pow(cellC.bottom - cellA.top, 2) + Math.pow(cellC.right - cellA.left, 2));
        transform = "rotate(-45deg)";
        width = 5;
    } 
    // Check for diagonal win (top-right to bottom-left)
    else if (a === 2 && b === 4 && c === 6) { // Diagonal (top-right to bottom-left)
        left = cellB.left + (cellB.width / 2) - 3;
        top = (1/12)*cellA.top;
        height = Math.sqrt(Math.pow(cellC.bottom - cellA.top, 2) + Math.pow(cellA.right - cellC.left, 2));
        transform = "rotate(45deg)";
        width = 5;
    }
    // Otherwise, it's a horizontal win
    else { // Horizontal line
        left = cellA.left;
        width = cellC.right - cellA.left;
        top = cellA.top + (cellA.height / 2) - 3; // Center the line vertically
        height = 5; // Small height for horizontal line
    }

    // Set the line properties
    line.style.left = `${left}px`;
    line.style.top = `${top}px`;
    line.style.width = `${width}px`;
    line.style.height = `${height}px`;
    line.style.transform = transform || ''; // Apply rotation if it's diagonal

    // Append the line to the game screen container
    document.getElementById('gameScreen').appendChild(line);
    console.log(line);
}

// Reset the game
function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    const cells = document.getElementsByClassName('cell');
    Array.from(cells).forEach(cell => cell.innerText = '');
    const existingLine = document.querySelector('.winning-line');
    if (existingLine) existingLine.remove();
    activePlayer = 1;
    updateTurnInfo();
}