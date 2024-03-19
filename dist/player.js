import chalk from "chalk";
class Player {
    token;
    constructor(token) {
        this.token = token;
    }
    makeMove(board, row, col) {
        if (board[row][col] === null) {
            board[row][col] = this.token;
            return true;
        }
        else {
            console.log(chalk.yellow("This spot is already taken. Please choose another."));
            return false;
        }
    }
}
export { Player };
