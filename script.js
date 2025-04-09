const gameBoard = document.getElementById('grid');
const newGameButton = document.getElementById('new-game');
const status = document.getElementById('status');
const cells = [];
let currentPlayer = 'X';

function initializeGame() {
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
    cells.forEach(cell => cell.disabled = false);
    status.textContent = `${currentPlayer}'s turn`;
}

newGameButton.addEventListener('click', () => {
    initializeGame();
});

function checkWin() {
    // Check win conditions and update UI
}

function checkDraw() {
    // Check if all cells are filled and no win condition is met
}

function handleCellClick(cell) {
    if (cell.textContent === '') {
        cell.textContent = currentPlayer;
        cell.disabled = true;
        if (checkWin()) {
            status.textContent = `${currentPlayer} wins!`;
            cells.forEach(cell => cell.disabled = true);
        } else if (checkDraw()) {
            status.textContent = "It's a draw!";
            cells.forEach(cell => cell.disabled = true);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `${currentPlayer}'s turn`;
        }
    }
}

function createGrid() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('button');
        cell.addEventListener('click', () => handleCellClick(cell));
        gameBoard.appendChild(cell);
        cells.push(cell);
    }
}

initializeGame();
createGrid();