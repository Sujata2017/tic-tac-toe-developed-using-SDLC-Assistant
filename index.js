const board = document.getElementById('board');
const newGameBtn = document.getElementById('newGame');
const resetGameBtn = document.getElementById('resetGame');
const statusDisplay = document.getElementById('status');

let currentPlayer = 'X';
let gameActive = false;
let gameBoard = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

newGameBtn.addEventListener('click', initializeGame);
resetGameBtn.addEventListener('click', resetGame);

function initializeGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    createBoard();
}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(e) {
    if (gameActive && !gameBoard[parseInt(e.target.dataset.index)] && !checkWin()) {
        const index = parseInt(e.target.dataset.index);
        gameBoard[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        e.target.classList.add(`player-${currentPlayer.toLowerCase()}`);
        if (checkWin()) {
            statusDisplay.textContent = `${currentPlayer} wins!`;
            gameActive = false;
        } else if (isBoardFull()) {
            statusDisplay.textContent = "It's a draw!";
            gameActive = false;
        } else {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            statusDisplay.textContent = `${currentPlayer}'s turn`;
        }
    } else if (gameBoard[parseInt(e.target.dataset.index)]) {
        alert('Cell already filled!');
    }
}

function checkWin() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

function isBoardFull() {
    return gameBoard.every(cell => cell !== '');
}

function resetGame() {
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
    initializeGame();
}

// Initialize the game
initializeGame();