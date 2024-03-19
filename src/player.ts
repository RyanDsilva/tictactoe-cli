import chalk from "chalk";
import { CellValue, Board } from "./helpers/types.js";

/**
 * Represents a player in the game.
 */
class Player {
  /**
   * The player's token (X or O).
   */
  token: CellValue;

  /**
   * Creates a new player with a specified token.
   *
   * @param token The token to be assigned to the player.
   */
  constructor(token: CellValue) {
    this.token = token;
  }

  /**
   * Makes a move on the board for the player.
   *
   * Attempts to place the player's token on the specified position of the board.
   * If the position is already occupied, the move is not made, and the function returns false.
   *
   * @param board The game board.
   * @param row The row number for the move (0-indexed).
   * @param col The column number for the move (0-indexed).
   * @returns {boolean} `true` if the move was successful, `false` if the position is already taken.
   */
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
