import './App.css';
import { useState } from 'react';

// list of colors to generate the board
const colors: Array<string> = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'white'];

// creates the jewel circle
const jewel = (color: string) => <div className={'jewel'} style={{ backgroundColor: `${color}` }} />;

// generates a 1d array of valid bejeweled colors
const generateColumn = (height: number, gameBoard: Array<Array<string>>): Array<string> => {
	const column: Array<string> = [];
	const x = gameBoard.length; // using x and y to make things easier to understand
	let tempColors = colors;

	for (let y = 0; y < height; y++) {
		// filtering out colors that would cause a match
		if (y >= 2 && column[y - 1] === column[y - 2]) {
			tempColors = tempColors.filter((color) => color !== column[y - 1]);
		}
		if (x >= 2 && gameBoard[x - 2][y] === gameBoard[x - 1][y]) {
			tempColors = tempColors.filter(
				(color) => color !== gameBoard[x - 1][y]
			);
		}

		let selectedColor = tempColors[Math.floor(Math.random() * tempColors.length)];

		column.push(selectedColor);
		tempColors = colors;
	}
	return column;
};

// creates a 2d array of colors that don't match
const generateGameBoard = (height: number, width: number): Array<Array<string>> => {
	const gameBoard: Array<Array<string>> = [];
	let valid = false;
	// while there are no valid swaps we recreate the board
	while (!valid) {
		for (let i = 0; i < width; i++) {
			gameBoard.push(generateColumn(height, gameBoard));
		}
		valid = checkValidMatches(gameBoard);
	}
	return gameBoard;
};

const checkValidMatches = (gameBoard: Array<Array<string>>): boolean => {
	for (let x = 0; x < gameBoard.length; x++) {
		for (let y = 0; y < gameBoard[x].length; y++) {
			// alternatively could do a sliding window variant here to check for matches
			// or always insert a valid match on board generation

			// uses a naive brute force method to handle all cases to detect a match
			if (
				(gameBoard[x][y] === gameBoard[x]?.[y - 2] && gameBoard[x][y] === gameBoard[x]?.[y - 3]) || // handles moving and matching in the same direction
				(gameBoard[x][y] === gameBoard[x]?.[y + 2] && gameBoard[x][y] === gameBoard[x]?.[y + 3]) || // o x o o
				(gameBoard[x][y] === gameBoard[x - 2]?.[y] && gameBoard[x][y] === gameBoard[x - 3]?.[y]) ||
				(gameBoard[x][y] === gameBoard[x + 2]?.[y] && gameBoard[x][y] === gameBoard[x + 3]?.[y]) ||
				(gameBoard[x][y] === gameBoard[x + 1]?.[y + 1] && gameBoard[x][y] === gameBoard[x + 1]?.[y + 2]) || // handles moving and matching in opposite directions
				(gameBoard[x][y] === gameBoard[x + 1]?.[y - 1] && gameBoard[x][y] === gameBoard[x + 1]?.[y - 2]) || // x o o
				(gameBoard[x][y] === gameBoard[x - 1]?.[y + 1] && gameBoard[x][y] === gameBoard[x - 1]?.[y + 2]) || // o x x
				(gameBoard[x][y] === gameBoard[x - 1]?.[y - 1] && gameBoard[x][y] === gameBoard[x - 1]?.[y - 2]) ||
				(gameBoard[x][y] === gameBoard[x + 1]?.[y + 1] && gameBoard[x][y] === gameBoard[x + 2]?.[y + 1]) ||
				(gameBoard[x][y] === gameBoard[x - 1]?.[y + 1] && gameBoard[x][y] === gameBoard[x - 2]?.[y + 1]) ||
				(gameBoard[x][y] === gameBoard[x + 1]?.[y - 1] && gameBoard[x][y] === gameBoard[x + 2]?.[y - 1]) ||
				(gameBoard[x][y] === gameBoard[x - 1]?.[y - 1] && gameBoard[x][y] === gameBoard[x - 2]?.[y - 1]) ||
				(gameBoard[x][y] === gameBoard[x - 1]?.[y - 1] && gameBoard[x][y] === gameBoard[x + 1]?.[y - 1]) || // handles moving and matching in the same direction
				(gameBoard[x][y] === gameBoard[x - 1]?.[y + 1] && gameBoard[x][y] === gameBoard[x + 1]?.[y + 1])    // o x o
																													// x o x

			) {
				return true;
			};
		}
	}
	return false;
};



function App() {

	const [board, setBoard] = useState(() => generateGameBoard(7, 7).map((arr) => <div>{arr.map((color) => jewel(color))}</div>));
	return (
		<div className={'App'}>
			<button
				onClick={() =>
					setBoard(generateGameBoard(7, 7).map((arr) => <div>{arr.map((color) => jewel(color))}</div>))}
			>
				Generate Board
			</button>
			{board}
		</div>
	);
}

export default App;
