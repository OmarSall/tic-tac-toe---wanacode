export function drawWinningLine({ combination, player }) {
    const allBoardCells = document.getElementsByClassName("cell");
    const [firstMove, secondMove, thirdMove] = combination;

    const selectedCellRects  = getSelectedCellRects([firstMove, secondMove, thirdMove], allBoardCells);
    const winningLineStyle = calculateWinningLineStyle(firstMove, secondMove, thirdMove, selectedCellRects);

    const winningLineElement  = createWinningLineElement(winningLineStyle);
    document.getElementById("gameScreen").appendChild(winningLineElement);
}

function getSelectedCellRects(indices, cells) {
    return indices.map(index => cells[index].getBoundingClientRect());
}

function calculateWinningLineStyle(firstMove, secondMove, thirdMove, [firstWinCell, secondWinCell, thirdWinCell]) {
    let xPosition, yPosition, lineWidth, lineHeight, transform;

    const isVertical = firstMove % 3 === secondMove % 3 && secondMove % 3 === thirdMove % 3;
    const isDiagonalLeftTopRightBottom = firstMove === 0 && secondMove === 4 && thirdMove === 8;
    const isDiagonalRightTopLeftBottom = firstMove === 2 && secondMove === 4 && thirdMove === 6;

    if (isVertical) {
        xPosition = firstWinCell.left + (firstWinCell.width / 2) - 3;
        yPosition = firstWinCell.top;
        lineWidth = 5;
        lineHeight = thirdWinCell.bottom - firstWinCell.top;
    } else if (isDiagonalLeftTopRightBottom) {
        xPosition = secondWinCell.left + (secondWinCell.width / 2) - 3;
        yPosition = 0.2 * firstWinCell.top;
        lineWidth = 5;
        lineHeight = Math.hypot(thirdWinCell.bottom - firstWinCell.top, thirdWinCell.right - firstWinCell.left);
        transform = "rotate(-45deg)";
    } else if (isDiagonalRightTopLeftBottom) {
        xPosition = secondWinCell.left + (secondWinCell.width / 2) - 3;
        yPosition  = 0.2 * firstWinCell.top;
        lineWidth = 5;
        lineHeight = Math.hypot(thirdWinCell.bottom - firstWinCell.top, firstWinCell.right - thirdWinCell.left);
        transform = "rotate(45deg)";
    } else {
        // Horizontal
        xPosition = firstWinCell.left;
        yPosition  = firstWinCell.top + (firstWinCell.height / 2) - 3;
        lineWidth = thirdWinCell.right - firstWinCell.left;
        lineHeight = 5;
    }

    return { xPosition, yPosition, lineWidth, lineHeight, transform };
}

function createWinningLineElement({ xPosition, yPosition, lineWidth, lineHeight, transform = "" }) {
    const winningLine = document.createElement("div");
    winningLine.classList.add("winning-line");
    Object.assign(winningLine.style, {
        position: "absolute",
        backgroundColor: "red",
        left: `${xPosition}px`,
        top: `${yPosition}px`,
        width: `${lineWidth}px`,
        height: `${lineHeight}px`,
        transform,
        zIndex: 10,
    });
    return winningLine;
}