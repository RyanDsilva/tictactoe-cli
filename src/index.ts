#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import { Game } from "./game.js";
import { Player } from "./player.js";
import { CellValue } from "./helpers/types.js";
import { AIOpponent } from "./ai.js";

async function startGame() {
  console.clear();
  console.log(chalk.green("Welcome to Tic Tac Toe CLI!"));
  console.log(chalk.yellow("You are X and the computer is O.\n"));

  let game = new Game();
  let playerTurn = true;
  let player = new Player(CellValue.X);
  let ai = new AIOpponent(CellValue.O);

  game.displayBoard();

  while (true) {
    if (playerTurn) {
      const { row, col } = await askForMove();
      if (!player.makeMove(game.board, row, col)) {
        console.log(chalk.red("Invalid move, try again."));
        continue;
      }
    } else {
      console.log(chalk.blue("AI is making a move..."));
      ai.aiMove(game);
    }

    game.displayBoard();
    if (game.checkWin()) {
      console.log(
        chalk.green(
          playerTurn
            ? "Congratulations, you won!"
            : "AI wins. Better luck next time!"
        )
      );
      break;
    } else if (game.isDraw()) {
      console.log(chalk.yellow("It's a draw."));
      break;
    }

    playerTurn = !playerTurn;
  }

  if (!(await askToPlayAgain())) {
    console.log(chalk.blue("Thanks for playing!"));
    process.exit();
  } else {
    game.clearBoard();
    startGame();
  }
}

async function askForMove() {
  const answers = await inquirer.prompt([
    {
      type: "number",
      name: "row",
      message: "Enter row (0-2):",
      validate: (value: any) =>
        value >= 0 && value <= 2 ? true : "Please enter a number between 0 and 2.",
    },
    {
      type: "number",
      name: "col",
      message: "Enter column (0-2):",
      validate: (value: any) =>
        value >= 0 && value <= 2 ? true : "Please enter a number between 0 and 2.",
    },
  ]);

  // Adjusting for zero-based index
  return { row: answers.row, col: answers.col };
}

async function askToPlayAgain() {
  const answer = await inquirer.prompt([
    {
      type: "confirm",
      name: "playAgain",
      message: "Do you want to play again?",
      default: false,
    },
  ]);

  return answer.playAgain;
}

startGame().catch((err) => console.error(err));
