import { CellValue } from "./helpers/types.js";
import { winningLines } from "./helpers/winning_condition.js";
import { Player } from "./player.js";
/**
 * Represents an AI opponent in the game.
 */
class AIOpponent extends Player {
    /**
     * Creates an instance of AIOpponent.
     * @param token The player's token in the game.
     */
    constructor(token) {
        super(token);
    }
    /**
     * Evaluates the board from AI's point of view and returns a score based on the current state.
     * @param board The game board.
     * @returns The score of the board.
     */
    evaluate(board) {
        for (let combination of winningLines) {
            const [[x1, y1], [x2, y2], [x3, y3]] = combination;
            if (board[x1][y1] !== null &&
                board[x1][y1] === board[x2][y2] &&
                board[x1][y1] === board[x3][y3]) {
                return board[x1][y1] === CellValue.O ? 10 : -10;
            }
        }
        return 0;
    }
    /**
     * The minimax algorithm to determine the best move for the AI.
     * @param game The current game state.
     * @param depth The depth of the recursive call.
     * @param isMaximizing Indicates if the current move is maximizing or minimizing the score.
     * @returns The best score calculated by minimax.
     */
    minimax(game, depth, isMaximizing) {
        let score = this.evaluate(game.board);
        if (score === 10)
            return score - depth;
        if (score === -10)
            return score + depth;
        if (game.isDraw())
            return 0;
        if (isMaximizing) {
            let best = -Infinity;
            for (let i = 0; i < game.board.length; i++) {
                for (let j = 0; j < game.board.length; j++) {
                    if (game.board[i][j] === null) {
                        this.makeMove(game.board, i, j);
                        best = Math.max(best, this.minimax(game, depth + 1, !isMaximizing));
                        game.resetCell(i, j);
                    }
                }
            }
            return best;
        }
        else {
            let best = Infinity;
            for (let i = 0; i < game.board.length; i++) {
                for (let j = 0; j < game.board.length; j++) {
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
    /**
     * Finds the best move for the AI.
     * @param game The current game state.
     * @returns The best move as an object with row and column.
     */
    findBestMove(game) {
        let bestVal = -Infinity;
        let bestMove = { row: -1, col: -1 };
        for (let i = 0; i < game.board.length; i++) {
            for (let j = 0; j < game.board.length; j++) {
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
    /**
     * Makes the AI move on the game board.
     * @param game The current game state.
     */
    aiMove(game) {
        const { row, col } = this.findBestMove(game);
        if (row !== -1 && col !== -1) {
            this.makeMove(game.board, row, col);
            console.log(`AI placed an ${this.token} in row ${row + 1}, column ${col + 1}:`);
        }
    }
}
/**
 * Represents an AI opponent that makes random moves.
 */
class AIRandomOpponent extends Player {
    /**
     * Creates an instance of AIOpponent.
     * @param token The player's token in the game.
     */
    constructor(token) {
        super(token);
    }
    /**
     * Makes a random move on the game board.
     * @param game The current game state.
     */
    aiMove(game) {
        const emptyCells = game.getEmptyCells();
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const [row, col] = emptyCells[randomIndex];
            this.makeMove(game.board, row, col);
            console.log(`AI placed an ${this.token} in row ${row + 1}, column ${col + 1}.`);
        }
    }
}
export { AIOpponent, AIRandomOpponent };
