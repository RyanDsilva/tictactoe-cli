import chalk from "chalk";
import { winningLines } from "./helpers/winning_condition.js";
import { CellValue } from "./helpers/types.js";
class Game {
    board;
    constructor() {
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ];
    }
    clearBoard() {
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ];
    }
    displayBoard() {
        this.board.forEach((row, rowIndex) => {
            let rowDisplay = "";
            row.forEach((cell, cellIndex) => {
                const cellValue = cell ? cell : " ";
                const formattedCellValue = cellValue === CellValue.X ? chalk.red(cellValue) : chalk.blue(cellValue);
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
    checkWin() {
        for (let line of winningLines) {
            const [[x1, y1], [x2, y2], [x3, y3]] = line;
            if (this.board[x1][y1] &&
                this.board[x1][y1] === this.board[x2][y2] &&
                this.board[x1][y1] === this.board[x3][y3]) {
                return true;
            }
        }
        return false;
    }
    isDraw() {
        return this.board.every((row) => row.every((cell) => cell !== null));
    }
    resetCell(row, col) {
        this.board[row][col] = null;
    }
}
export { Game };
