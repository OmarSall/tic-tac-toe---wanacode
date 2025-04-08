export function drawWinningLine({ combination, player }) {
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
        top = (1/5)*cellA.top;
        height = Math.sqrt(Math.pow(cellC.bottom - cellA.top, 2) + Math.pow(cellC.right - cellA.left, 2));
        transform = "rotate(-45deg)";
        width = 5;
    } 
    // Check for diagonal win (top-right to bottom-left)
    else if (a === 2 && b === 4 && c === 6) { // Diagonal (top-right to bottom-left)
        left = cellB.left + (cellB.width / 2) - 3;
        top = (1/5)*cellA.top;
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
}