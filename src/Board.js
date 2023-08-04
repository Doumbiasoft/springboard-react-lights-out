import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/


function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());
 /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < nrows; i++) {
      let row = [];
      for (let j = 0; j < ncols; j++) {
        // Generate a random boolean value (true or false) for each cell
        const isLit = Math.random() < chanceLightStartsOn;
        row.push(isLit);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
     // TODO: check the board in state to determine whether the player has won.
      // Check if all cells are unlit
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j]) {
          return false;// If any cell is lit, the player has not won
        }
      }
    }
    return true;// All cells are unlit, the player has won
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
         // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };
    // TODO: Make a (deep) copy of the oldBoard
      const copy = oldBoard.map(row => [...row]);

    // TODO: in the copy, flip this cell and the cells around it

      flipCell(y, x, copy); // Flip the clicked cell
      flipCell(y - 1, x, copy); // Flip the cell above
      flipCell(y + 1, x, copy); // Flip the cell below
      flipCell(y, x - 1, copy); // Flip the cell to the left
      flipCell(y, x + 1, copy); // Flip the cell to the right

     // TODO: return the copy
      return copy;
    });
  }
  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if (hasWon()) {
    return <div>You won!</div>;
  }
  // make table board

  // TODO
  const tableBoard = board.map((row, y) => (
    <tr key={y}>
      {row.map((cell, x) => (
        <Cell
          key={`${y}-${x}`}
          isLit={cell}
          flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}
        />
      ))}
    </tr>
  ));

  return (
    <div>
      <table className="Board">
        <tbody>{tableBoard}</tbody>
      </table>
    </div>
  );

}

export default Board;
