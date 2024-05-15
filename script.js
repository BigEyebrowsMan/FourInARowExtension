document.addEventListener("DOMContentLoaded", function() {
    const board = document.querySelector(".game-board");
    const ROWS = 6;
    const COLS = 7;
    let currentPlayer = 'red'; // Starting player
    let gameEnded = false; // Variable to track game state

    // Create the game board grid
    // Create the game board grid
for (let row = ROWS - 1; row >= 0; row--) { // Reverse the row iteration
    for (let col = 0; col < COLS; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = row; // Adjusted row index
        cell.dataset.col = col;
        board.appendChild(cell);
    }
}


    // Function to check for a win
    function checkWin(row, col) {
        function checkDirection(dx, dy) {
            let count = 1;
            let r = row + dx;
            let c = col + dy;
            while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`).classList.contains(currentPlayer)) {
                count++;
                r += dx;
                c += dy;
            }
            r = row - dx;
            c = col - dy;
            while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`).classList.contains(currentPlayer)) {
                count++;
                r -= dx;
                c -= dy;
            }
            return count >= 4;
        }

        return checkDirection(0, 1) || checkDirection(1, 0) || checkDirection(1, 1) || checkDirection(-1, 1) || checkDirection(1, -1);
    }

    // Function to check if the column is full
    function isColumnFull(col) {
        for (let row = 0; row < ROWS; row++) {
            const cell = board.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            if (!cell.classList.contains('red') && !cell.classList.contains('yellow')) {
                return false; // Column has at least one empty cell
            }
        }
        return true; // Column is full
    }

    // Add event listeners to each cell
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            // Check if the game has ended
            if (!gameEnded) {
                // Check if the column is full
                if (!isColumnFull(col)) {
                    // Find the lowest empty cell in the column
                    for (let i = 0; i < ROWS; i++) { // Iterate from bottom to top
                        const lowestEmptyCell = board.querySelector(`.cell[data-row="${i}"][data-col="${col}"]`);
                        if (!lowestEmptyCell.classList.contains('red') && !lowestEmptyCell.classList.contains('yellow')) {
                            // Set the color of the lowest empty cell based on the current player
                            lowestEmptyCell.classList.add(currentPlayer);
                            // Check for a win
                            if (checkWin(i, col)) {
                                alert(`${currentPlayer.toUpperCase()} wins!`);
                                gameEnded = true; // Update game state
                            } else {
                                // Toggle between red and yellow for the next player
                                currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
                            }
                            break;
                        }
                    }
                }
            }
        });
    });


const resetButton = document.createElement("button");
    resetButton.textContent = "Reset Game";
    resetButton.addEventListener("click", () => {
        // Reset game state and recreate the game board
        currentPlayer = 'red';
        gameEnded = false;
        for (const cell of cells) {
            cell.classList.remove('red', 'yellow');
        }
    });
    document.body.appendChild(resetButton);
});