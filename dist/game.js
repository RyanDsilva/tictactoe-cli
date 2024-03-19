import chalk from "chalk";
import { winningLines } from "./helpers/winning_condition.js";
import { CellValue } from "./helpers/types.js";
/**
 * Represents a Tic Tac Toe game.
 */
class Game {
    /**
     * Represents the 3x3 board used for the game.
     */
    board;
    /**
     * Initializes a new instance of the Game class with an empty board.
     */
    constructor() {
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ];
    }
    /**
     * Clears the board state, setting all cells to null.
     */
    clearBoard() {
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ];
    }
    /**
     * Displays the current state of the board in the console, using chalk for coloring.
     * Xs are displayed in red, and Os are displayed in blue.
     */
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
    /**
     * Checks if there is a winning condition on the board.
     *
     * @returns {boolean} True if a winning line is detected, false otherwise.
     */
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
    /**
     * Checks if the game has ended in a draw.
     *
     * @returns {boolean} True if all cells are filled and no winner, false otherwise.
     */
    isDraw() {
        return this.board.every((row) => row.every((cell) => cell !== null));
    }
    /**
     * Resets the value of a specific cell on the board to null.
     *
     * @param row The row index of the cell to reset.
     * @param col The column index of the cell to reset.
     */
    resetCell(row, col) {
        this.board[row][col] = null;
    }
    /**
     * Gets the coordinates of all empty cells on the board.
     * @returns An array of empty cell coordinates, each represented as [row, col].
     */
    getEmptyCells() {
        const emptyCells = [];
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === null) {
                    emptyCells.push([row, col]);
                }
            }
        }
        return emptyCells;
    }
}
export { Game };
