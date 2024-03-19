/**
 * Represents the collection of winning line coordinates for a tic-tac-toe game.
 * Each winning line is defined as a series of points, where each point is represented
 * as a two-dimensional array with the first element being the row index (0-based)
 * and the second element being the column index (0-based).
 *
 * There are 8 possible winning lines in a standard 3x3 tic-tac-toe board:
 * - 3 rows
 * - 3 columns
 * - 2 diagonals
 */
export const winningLines = [
    [
        [0, 0],
        [0, 1],
        [0, 2],
    ],
    [
        [1, 0],
        [1, 1],
        [1, 2],
    ],
    [
        [2, 0],
        [2, 1],
        [2, 2],
    ],
    [
        [0, 0],
        [1, 0],
        [2, 0],
    ],
    [
        [0, 1],
        [1, 1],
        [2, 1],
    ],
    [
        [0, 2],
        [1, 2],
        [2, 2],
    ],
    [
        [0, 0],
        [1, 1],
        [2, 2],
    ],
    [
        [0, 2],
        [1, 1],
        [2, 0],
    ],
];
