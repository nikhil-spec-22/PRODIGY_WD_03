document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    // Create the 9 squares
    for (let i = 0; i < 9; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.setAttribute("data-index", i);
        square.addEventListener("click", handleSquareClick);
        board.appendChild(square);
    }

    function handleSquareClick(event) {
        const index = event.target.getAttribute("data-index");

        // Check if the square is already filled or the game is over
        if (gameBoard[index] === "" && !isGameOver()) {
            gameBoard[index] = currentPlayer;
            event.target.textContent = currentPlayer;
            
            // Check for a winner
            if (checkForWinner()) {
                alert(`Player ${currentPlayer} wins!`);
                resetGame();
            } else if (isBoardFull()) {
                alert("It's a draw!");
                resetGame();
            } else {
                // Switch player
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    function checkForWinner() {
        // Define winning combinations
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        // Check if any winning combination is present
        return winningCombos.some(combo => {
            const [a, b, c] = combo;
            return gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
        });
    }

    function isBoardFull() {
        // Check if the board is completely filled
        return gameBoard.every(square => square !== "");
    }

    function isGameOver() {
        // Check if there's already a winner or the board is full
        return checkForWinner() || isBoardFull();
    }

    function resetGame() {
        // Clear the board and reset variables
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        document.querySelectorAll(".square").forEach(square => {
            square.textContent = "";
        });
    }
});
