class Connect4Game {
    private rows: number;
    private cols: number;
    private boardElement: HTMLElement;
    private currentPlayer: number; // 1 for player1, 2 for player2
    private board: number[][]; // 2D array to represent the board state
    private player1Score: number = 0; // Score tracking for player 1
    private player2Score: number = 0; // Score tracking for player 2
    private newGameButton: HTMLElement;
    

    constructor(rows: number = 6, cols: number = 7) {
        this.rows = rows;
        this.cols = cols;
        this.currentPlayer = 1; // Player 1 starts first
        this.board = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
        this.boardElement = document.getElementById('connect4-board')!;
        this.newGameButton = document.getElementById('new-game')!;
        this.createGrid();
        this.addEventListeners();
        this.addInfoButtonEvent();
    }

    // Function to create the grid
    private createGrid(): void {
        this.boardElement.innerHTML = ''; // Clear any existing content
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const cell = document.createElement('div');
                cell.classList.add('board-cell');
                cell.dataset.row = r.toString();
                cell.dataset.col = c.toString();
                this.boardElement.appendChild(cell);
            }
        }
    }

    // Function to add event listeners to the board and buttons
    private addEventListeners(): void {
        this.boardElement.removeEventListener('click', this.handleBoardClick); // Remove any existing listeners
        this.boardElement.addEventListener('click', this.handleBoardClick);

        // Attach event listener to the "New Game" button
        this.newGameButton.removeEventListener('click', this.resetGame);
        this.newGameButton.addEventListener('click', this.resetGame);
    }

    // Event handler function for board clicks
    private handleBoardClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target && target.classList.contains('board-cell')) {
            this.handleCellClick(target);
        }
    }

    // Function to handle the click event on a cell
    private handleCellClick(cell: HTMLElement): void {
        const col = parseInt(cell.dataset.col!);
        this.placeToken(col);
    }

    // Function to place a token in the correct row in the clicked column
    private placeToken(col: number): void {
        for (let r = this.rows - 1; r >= 0; r--) {
            const cell = this.boardElement.querySelector(`[data-row="${r}"][data-col="${col}"]`) as HTMLElement;
            if (!cell.classList.contains('player1') && !cell.classList.contains('player2')) {
                cell.classList.add(this.currentPlayer === 1 ? 'player1' : 'player2');
                this.board[r][col] = this.currentPlayer;

                if (this.checkWin(r, col)) {
                    this.incrementScore();
                    this.endGame(false); // Player has won
                } else if (this.checkDraw()) {
                    this.endGame(true); // It's a draw
                } else {
                    this.switchPlayer();
                }
                break;
            }
        }
    }

    // Function to increment the scoreboard
    private incrementScore(): void {
        if (this.currentPlayer === 1) {
            this.player1Score++;
        } else {
            this.player2Score++;
        }
        this.updateScoreboard();
    }

    // Function to update the scoreboard display
    private updateScoreboard(): void {
        const scoreElement = document.getElementById('score')!;
        scoreElement.textContent = `Player 1 ${this.player1Score} - ${this.player2Score} Player 2`;
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

    // Function to switch the current player
    private switchPlayer(): void {
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    }

    // Function to end the game
    private endGame(isDraw: boolean = false): void {
        if (isDraw) {
            this.displayEndScreen('It\'s a Draw!');
        } else {
            this.displayEndScreen(`Player ${this.currentPlayer} Wins!`);
        }
    }

    // Function to display the win or draw screen
    private displayEndScreen(message: string): void {
        const overlay = document.createElement('div');
        overlay.classList.add('end-screen-overlay');

        // Create a container for the content
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('end-screen-content');

        // Optionally, add an icon or image (e.g., a trophy or confetti)
        const icon = document.createElement('div');
        icon.classList.add('end-screen-icon');
        icon.innerHTML = '🏆'; // This can be an emoji or an image tag with a src attribute

        // Create the message box
        const messageBox = document.createElement('div');
        messageBox.classList.add('end-screen-message');
        messageBox.innerText = message;

        // Create the restart button
        const restartButton = document.createElement('button');
        restartButton.classList.add('restart-button');
        restartButton.innerText = 'Play Again';
        restartButton.addEventListener('click', () => this.resetGame());

        // Append elements to the content container
        contentContainer.appendChild(icon);
        contentContainer.appendChild(messageBox);
        contentContainer.appendChild(restartButton);

        // Append the content container to the overlay
        overlay.appendChild(contentContainer);

        // Append the overlay to the body
        document.body.appendChild(overlay);
    }

    private addInfoButtonEvent(): void {
        const infoButton = document.getElementById('info-button')!;
        const rulesModal = document.getElementById('rules-modal')!;
        const closeRules = document.getElementById('close-rules')!;

        infoButton.addEventListener('click', () => {
            rulesModal.classList.add('active'); // Show the modal
        });

        closeRules.addEventListener('click', () => {
            rulesModal.classList.remove('active'); // Hide the modal
        });

        // Close the modal when clicking outside of the content
        window.addEventListener('click', (event) => {
            if (event.target === rulesModal) {
                rulesModal.classList.remove('active');
            }
        });
    }

    // Function to reset the game board
    private resetGame = (): void => {
        const overlay = document.querySelector('.end-screen-overlay');
        if (overlay) {
            overlay.remove();
        }

        this.currentPlayer = 1; 
        this.board = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
        this.createGrid();
        this.addEventListeners();
    }
}

const game = new Connect4Game();
