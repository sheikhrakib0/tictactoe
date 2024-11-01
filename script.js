// Game variables
let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;

// Select elements
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

// Winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]              // diagonals
];

// Event listeners for each cell
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Reset button
resetButton.addEventListener('click', resetGame);

// Handle cell click
function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-index');

    // If the cell is already taken or the game is over, ignore the click
    if (board[cellIndex] !== '' || !gameActive) return;

    // Update cell and board
    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    // Check for a win or draw
    if (checkWin()) {
        message.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (board.every(cell => cell !== '')) {
        message.textContent = "It's a draw!";
        gameActive = false;
    } else {
        // Switch players
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Check if the current player has won
function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

// Reset the game
function resetGame() {
    board = Array(9).fill('');
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => (cell.textContent = ''));
    message.textContent = "Player X's turn";
}
