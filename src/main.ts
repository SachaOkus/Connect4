import './style.css'

class Connect4Game {
  private rows: number;
  private cols: number;
  private boardElement: HTMLElement;


  constructor(rows: number = 6, cols: number = 7) {
      this.rows = rows;
      this.cols = cols;
      this.boardElement = document.getElementById('connect4-board')!;
      this.createGrid();
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
      this.boardElement.style.display = 'grid';
      this.boardElement.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;
      this.boardElement.style.gridGap = '5px';
  }
}


const game = new Connect4Game();