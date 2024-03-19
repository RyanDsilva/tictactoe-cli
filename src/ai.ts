import { Game } from "./game.js";
import { Board, CellValue } from "./helpers/types.js";
import { winningLines } from "./helpers/winning_condition.js";
import { Player } from "./player.js";

class AIOpponent extends Player {
  constructor(token: CellValue) {
    super(token);
  }

  evaluate(board: Board): number {
    for (let combination of winningLines) {
      const [[x1, y1], [x2, y2], [x3, y3]] = combination;

      if (
        board[x1][y1] !== null &&
        board[x1][y1] === board[x2][y2] &&
        board[x1][y1] === board[x3][y3]
      ) {
        return board[x1][y1] === "O" ? 10 : -10;
      }
    }
    return 0;
  }

  minimax(game: Game, depth: number, isMaximizing: boolean): number {
    let score = this.evaluate(game.board);

    if (score === 10) return score - depth;
    if (score === -10) return score + depth;
    if (game.isDraw()) return 0;

    if (isMaximizing) {
      let best = -Infinity;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (game.board[i][j] === null) {
            this.makeMove(game.board, i, j);
            best = Math.max(best, this.minimax(game, depth + 1, !isMaximizing));
            game.resetCell(i, j);
          }
        }
      }
      return best;
    } else {
      let best = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (game.board[i][j] === null) {
            game.board[i][j] = CellValue.X;
            best = Math.min(best, this.minimax(game, depth + 1, !isMaximizing));
            game.resetCell(i, j);
          }
        }
      }
      return best;
    }
  }

  findBestMove(game: Game): { row: number; col: number } {
    let bestVal = -Infinity;
    let bestMove = { row: -1, col: -1 };
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (game.board[i][j] === null) {
          this.makeMove(game.board, i, j);
          let moveVal = this.minimax(game, 0, false);
          game.resetCell(i, j);
          if (moveVal > bestVal) {
            bestMove = { row: i, col: j };
            bestVal = moveVal;
          }
        }
      }
    }
    return bestMove;
  }

  aiMove(game: Game): void {
    const { row, col } = this.findBestMove(game);
    if (row !== -1 && col !== -1) {
      this.makeMove(game.board, row, col);
      console.log(`AI placed an 'O' in row ${row + 1}, column ${col + 1}:`);
    }
  }
}

export { AIOpponent };
