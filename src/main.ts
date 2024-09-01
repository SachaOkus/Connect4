

class Connect4Game {
    private rows: number;
    private cols: number;
    private boardElement: HTMLElement;
    private currentPlayer: number; // 1 for player1, 2 for player2

    constructor(rows: number = 6, cols: number = 7) {
        this.rows = rows;
        this.cols = cols;
        this.currentPlayer = 1; // Player 1 starts first
        this.boardElement = document.getElementById('connect4-board')!;
        console.log('Connect4Game initialized with', this.rows, 'rows and', this.cols, 'columns.');
        this.createGrid();
        this.addEventListeners();
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

    // Function to add event listeners to each column
    private addEventListeners(): void {
        console.log('Adding event listeners...');
        this.boardElement.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target && target.classList.contains('board-cell')) {
                console.log('Cell clicked:', target.dataset.row, target.dataset.col);
                this.handleCellClick(target);
            }
        });
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
                console.log(`Placed token for player ${this.currentPlayer} at row ${r}, column ${col}`);
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
}

const game = new Connect4Game();