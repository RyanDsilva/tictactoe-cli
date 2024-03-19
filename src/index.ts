#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import { Game } from "./game.js";
import { Player } from "./player.js";
import { CellValue } from "./helpers/types.js";
import { AIOpponent, AIRandomOpponent } from "./ai.js";

/**
 * Prompts the user to select a difficulty level for the game.
 * This function uses the inquirer library to present a choice between 'easy' and 'hard' difficulty levels.
 * The 'easy' level might trigger an AI that makes random moves, making the game less challenging.
 * The 'hard' level triggers a more strategic AI opponent, providing a greater challenge to the player.
 *
 * @returns A promise that resolves to the user's selected difficulty level as a string ('easy' or 'hard').
 */
async function askForDifficulty() {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "difficulty",
      message: "Choose the difficulty level:",
      choices: ["easy", "hard"],
    },
  ]);
  return answer.difficulty;
}

/**
 * Starts the Tic Tac Toe game and manages the game flow.
 */
async function startGame() {
  console.clear();
  console.log(chalk.green("Welcome to Tic Tac Toe CLI!"));
  console.log(chalk.yellow("You are X and the computer is O.\n"));

  // Ask for difficulty level
  const difficulty = await askForDifficulty();

  // Initialize the game, player, and AI opponent
  let game = new Game();
  let playerTurn = true;
  let player = new Player(CellValue.X);
  let ai =
    difficulty === "easy"
      ? new AIRandomOpponent(CellValue.O)
      : new AIOpponent(CellValue.O);

  // Display the initial game board
  game.displayBoard();

  // Game loop
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
    // Reset the board and start a new game
    game.clearBoard();
    startGame();
  }
}

/**
 * Asks the player for their next move and validates the input.
 * @returns An object containing the row and column of the player's move.
 */
async function askForMove() {
  const answers = await inquirer.prompt([
    {
      type: "number",
      name: "row",
      message: "Enter row (1-3):",
      validate: (value: any) =>
        value >= 1 && value <= 3 ? true : "Please enter a number between 0 and 2.",
    },
    {
      type: "number",
      name: "col",
      message: "Enter column (1-3):",
      validate: (value: any) =>
        value >= 1 && value <= 3 ? true : "Please enter a number between 0 and 2.",
    },
  ]);

  // Adjusting for 0-indexed
  return { row: answers.row - 1, col: answers.col - 1 };
}

/**
 * Prompts the player to decide if they want to play another game.
 * @returns A boolean indicating whether the player wants to play again.
 */
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
