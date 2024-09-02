class Connect4Game {
    private rows: number;
    private cols: number;
    private boardElement: HTMLElement;
    private currentPlayer: number; // 1 for player1, 2 for player2
    private board: number[][]; // 2D array to represent the board state
    private player1Score: number = 0; // Score tracking for player 1
    private player2Score: number = 0; // Score tracking for player 2

    constructor(rows: number = 6, cols: number = 7) {
        this.rows = rows;
        this.cols = cols;
        this.currentPlayer = 1; // Player 1 starts first
        this.board = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
        this.boardElement = document.getElementById('connect4-board')!;
        console.log('Connect4Game initialized with', this.rows, 'rows and', this.cols, 'columns.');
        this.createGrid();
        this.addEventListeners();
        this.updateScore();
    }

    // Function to create the grid
    private createGrid(): void {
        this.boardElement.innerHTML = ''; // Clear any existing content
        console.log('Creating grid...');
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const cell = document.createElement('div');
                cell.classList.add('board-cell');
                cell.dataset.row = r.toString();
                cell.dataset.col = c.toString();
                this.boardElement.appendChild(cell);
            }
        }
        console.log('Grid created with', this.rows * this.cols, 'cells.');
    }

    // Function to add event listeners to each column and buttons
    private addEventListeners(): void {
        console.log('Adding event listeners...');
        // Add click event listener to the board element only once
        this.boardElement.removeEventListener('click', this.handleBoardClick); // Ensure no duplicate listeners
        this.boardElement.addEventListener('click', this.handleBoardClick);

        // Event listener for the New Game button
        const newGameButton = document.getElementById('new-game')!;
        newGameButton.addEventListener('click', () => this.resetGame());
    }

    // Event handler function for board clicks
    private handleBoardClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target && target.classList.contains('board-cell')) {
            console.log('Cell clicked:', target.dataset.row, target.dataset.col);
            this.handleCellClick(target);
        }
    }

    // Function to handle the click event on a cell
    private handleCellClick(cell: HTMLElement): void {
        const col = parseInt(cell.dataset.col!);
        console.log('Placing token in column:', col);
        this.placeToken(col);
    }

    // Function to place a token in the correct row in the clicked column
    private placeToken(col: number): void {
        for (let r = this.rows - 1; r >= 0; r--) { // Start from the bottom row
            const cell = this.boardElement.querySelector(`[data-row="${r}"][data-col="${col}"]`) as HTMLElement;
            if (!cell.classList.contains('player1') && !cell.classList.contains('player2')) {
                cell.classList.add(this.currentPlayer === 1 ? 'player1' : 'player2');
                this.board[r][col] = this.currentPlayer; // Update the board array
                console.log(`Placed token for player ${this.currentPlayer} at row ${r}, column ${col}`);
                
                if (this.checkWin(r, col)) {
                    console.log(`Player ${this.currentPlayer} wins!`);
                    this.updateScore(this.currentPlayer);
                    this.endGame(`Player ${this.currentPlayer} wins!`);
                    return;
                }

                if (this.checkDraw()) {
                    console.log('Game is a draw!');
                    this.endGame('Draw!');
                    return;
                }

                this.switchPlayer();
                break;
            }
        }
    }

    // Function to switch the current player
    private switchPlayer(): void {
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        console.log('Switched to player', this.currentPlayer);
    }

    // Function to check if the current player has won
    private checkWin(row: number, col: number): boolean {
        return (
            this.checkDirection(row, col, 1, 0) ||  // Horizontal
            this.checkDirection(row, col, 0, 1) ||  // Vertical
            this.checkDirection(row, col, 1, 1) ||  // Diagonal /
            this.checkDirection(row, col, 1, -1)    // Diagonal \
        );
    }

    // Function to check a specific direction for a win
    private checkDirection(row: number, col: number, rowDir: number, colDir: number): boolean {
        let count = 0;
        for (let i = -3; i <= 3; i++) {
            const r = row + i * rowDir;
            const c = col + i * colDir;
            if (r >= 0 && r < this.rows && c >= 0 && c < this.cols && this.board[r][c] === this.currentPlayer) {
                count++;
                if (count === 4) return true;
            } else {
                count = 0;
            }
        }
        return false;
    }

    // Function to check if the game is a draw
    private checkDraw(): boolean {
        return this.board[0].every(cell => cell !== 0);
    }

    // Function to end the game
    private endGame(message: string): void {
        alert(message);
        this.boardElement.removeEventListener('click', this.handleBoardClick); // Remove event listener after the game ends
    }

    // Function to reset the game board
    private resetGame(): void {
        console.log('Resetting the game...');
        this.currentPlayer = 1; // Player 1 starts first
        this.board = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
        this.createGrid(); // Recreate the grid
        this.addEventListeners(); // Re-add the event listeners
    }

    // Function to update the score
    private updateScore(winner?: number): void {
        if (winner === 1) {
            this.player1Score++;
        } else if (winner === 2) {
            this.player2Score++;
        }

        const scoreElement = document.getElementById('score')!;
        scoreElement.textContent = `Player One  ${this.player1Score} - ${this.player2Score}  Player Two`;
    }
}

const game = new Connect4Game();
