import chalk from "chalk";
import { winningLines } from "./helpers/winning_condition.js";
import { Board, CellValue } from "./helpers/types.js";

class Game {
  board: Board;

  constructor() {
    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  }

  clearBoard(): void {
    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  }

  displayBoard(): void {
    this.board.forEach((row, rowIndex) => {
      let rowDisplay = "";
      row.forEach((cell, cellIndex) => {
        const cellValue = cell ? cell : " ";
        const formattedCellValue =
          cellValue === CellValue.X ? chalk.red(cellValue) : chalk.blue(cellValue);
        rowDisplay +=
          cellIndex < row.length - 1
            ? `${formattedCellValue} | `
            : formattedCellValue;
      });
      console.log(rowDisplay);
      if (rowIndex < this.board.length - 1) {
        console.log(chalk.gray("---------"));
      }
    });
  }

  checkWin(): boolean {
    for (let line of winningLines) {
      const [[x1, y1], [x2, y2], [x3, y3]] = line;
      if (
        this.board[x1][y1] &&
        this.board[x1][y1] === this.board[x2][y2] &&
        this.board[x1][y1] === this.board[x3][y3]
      ) {
        return true;
      }
    }
    return false;
  }

  isDraw(): boolean {
    return this.board.every((row) => row.every((cell) => cell !== null));
  }

  resetCell(row: number, col: number): void {
    this.board[row][col] = null;
  }
}

export { Game };
