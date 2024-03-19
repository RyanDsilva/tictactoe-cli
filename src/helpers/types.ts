/**
 * Enum for cell values in a tic-tac-toe game.
 * It defines two possible values for a cell: "X" or "O".
 */
export enum CellValue {
  X = "X",
  O = "O",
}

/**
 * Type definition for a Cell in a tic-tac-toe game.
 * A Cell can either hold a value of `CellValue` ("X" or "O") or be `null` if it's empty.
 */
export type Cell = CellValue | null;

/**
 * Type definition for a Board in a tic-tac-toe game.
 * The Board is represented as a 2D array of Cells, allowing for the representation of the game's state.
 */
export type Board = Cell[][];
