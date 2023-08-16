    
    const boardElem = document.getElementById('board');
    const huPlayer = 'O';
    const aiPlayer = 'X';
    const winCombo = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    const cells = document.querySelectorAll('.cell');
    
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = huPlayer;
    let playerScore = 0;
    let opponentScore = 0;
    
    // Retrieve player names from local storage
    const playerName = localStorage.getItem('playerName') || 'Player';
    const opponentName = localStorage.getItem('opponentName') || 'Opponent';
    
    // Update the player names on the HTML
    document.getElementById('showing').textContent = playerName;
    document.getElementById('show').textContent = opponentName;
    
    startGame();
    updateScoreDisplay();


    function updateScoreDisplay() {
        document.getElementById('playerNameDisplay').textContent = playerName;
        document.getElementById('opponentNameDisplay').textContent = opponentName;
        document.getElementById('playerScoreDisplay').textContent = playerScore;
        document.getElementById('opponentScoreDisplay').textContent = opponentScore;
    }


    function increasePlayerScore() {
        playerScore++;
        updateScoreDisplay();
    }

    function increaseOpponentScore() {
        opponentScore++;
        updateScoreDisplay();
    }
    
    function startGame() {
        // Add click event listener to each cell to handle player moves
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                if (board[index] === '' && currentPlayer === huPlayer) {
                    // Player's move
                    makeMove(index, currentPlayer);
                    currentPlayer = aiPlayer;
                    setTimeout(makeAiMove, 500); // Add a delay for AI move for better visualization
                }
            });
        });
        
    }
    
    function makeMove(index, player) {
        board[index] = player;
        cells[index].innerText = player;
        cells[index].classList.add(player === 'X' ? 'symbol-x' : 'symbol-o');
        checkWin();
        checkDraw();
    }
    
    function makeAiMove() {
        // AI's move - Let's implement a simple AI that selects the first available empty cell
        const emptyCells = board.reduce((acc, cell, index) => {
            if (cell === '') acc.push(index);
            return acc;
        }, []);
    
        const aiMove = emptyCells[0]; // Select the first empty cell (you can implement a more advanced AI here)
        makeMove(aiMove, aiPlayer);
        currentPlayer = huPlayer;
    }
    
   

   
    function checkWin() {
        for (const combo of winCombo) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                // We have a winner
                setTimeout(() => {
                    highlightWinCombo(combo);
                    if (board[a] === huPlayer) {
                        increasePlayerScore();
                    } else if (board[a] === aiPlayer) {
                        increaseOpponentScore();
                    }
                    resetGame();
                }, 200);
                return true;
            }
        }
        return false;
    }
    
    
    
    
    
    
   

    function checkDraw() {
        if (!board.includes('')) {
            // Draw
            setTimeout(() => {
                alert("It's a draw!");
                resetGame();
            }, 200);
            return true;
        }
        return false;
    }
    
    function highlightWinCombo(combo) {
        combo.forEach((index) => {
            cells[index].classList.add('win');
        });
    }
    
    function resetGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        cells.forEach((cell) => {
            cell.innerText = '';
            cell.classList.remove('win');
            cell.classList.remove('symbol-x');
            cell.classList.remove('symbol-o');
        });
        currentPlayer = huPlayer;
    }
    
    function restartGame() {
        resetGame();
        startGame();
    }
    