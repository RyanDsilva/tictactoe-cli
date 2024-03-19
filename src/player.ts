import chalk from "chalk";
import { CellValue, Board } from "./helpers/types.js";

class Player {
  token: CellValue;

  constructor(token: CellValue) {
    this.token = token;
  }

  makeMove(board: Board, row: number, col: number): boolean {
    if (board[row][col] === null) {
      board[row][col] = this.token;
      return true;
    } else {
      console.log(
        chalk.yellow("This spot is already taken. Please choose another.")
      );
      return false;
    }
  }
}

export { Player };
