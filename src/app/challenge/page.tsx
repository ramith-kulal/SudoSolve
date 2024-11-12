"use client";

import React, { useState, useEffect } from "react";
import { generateSudoku, getHint } from "@/app/utils/sudokuUtils";
import Link from "next/link";

type SudokuGrid = number[][];

const ChallengePage = () => {
  const [sudoku, setSudoku] = useState<{ puzzle: SudokuGrid; solution: SudokuGrid }>({
    puzzle: [],
    solution: [],
  });
  const [puzzle, setPuzzle] = useState<SudokuGrid>([]);
  const [solution, setSolution] = useState<SudokuGrid>([]);
  const [timer, setTimer] = useState<number>(0);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [usedHints, setUsedHints] = useState<number>(0);
  const [hintMessage, setHintMessage] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>("");

  useEffect(() => {
    const newSudoku = generateSudoku();
    setSudoku(newSudoku);
    setPuzzle(newSudoku.puzzle);
    setSolution(newSudoku.solution);
  }, []);
  useEffect(() => {
    if (isSolved) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isSolved]);

  const handleNewGame = () => {
    const newSudoku = generateSudoku();
    setSudoku(newSudoku);
    setPuzzle(newSudoku.puzzle);
    setSolution(newSudoku.solution);
    setTimer(0);
    setIsSolved(false);
    setUsedHints(0);
    setHintMessage("");
    setStatusMessage("");
  };

  const handleHint = () => {
    const { message, hint } = getHint(puzzle, solution);
    setHintMessage(message);
    if (hint) {
      const newPuzzle = puzzle.map((row) => row.slice());
      newPuzzle[hint.row][hint.col] = hint.value;
      setPuzzle(newPuzzle);
      setUsedHints((prev) => prev + 1);
      checkIfSolved(newPuzzle);
    }
  };

  const handleInputChange = (row: number, col: number, value: string) => {
    if (isSolved) return;
    const num = parseInt(value) || 0;
    if (num >= 0 && num <= 9) {
      const newPuzzle = puzzle.map((r) => r.slice());
      newPuzzle[row][col] = num;
      setPuzzle(newPuzzle);
      checkIfSolved(newPuzzle);
    }
  };

  const checkIfSolved = (grid: SudokuGrid) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] !== solution[row][col]) return;
      }
    }
    setIsSolved(true);
    setStatusMessage(`🎉 You solved it in ${Math.floor(timer / 60)} minutes and ${timer % 60} seconds!`);
  };

  const handleCheck = () => {
    if (isSolved) return;

    let correct = true;
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (puzzle[row][col] !== 0 && puzzle[row][col] !== solution[row][col]) {
          correct = false;
          break;
        }
      }
      if (!correct) break;
    }

    setStatusMessage(correct ? "All numbers correct so far!" : "Incorrect numbers found! Keep trying.");
   
  };

  return (
    <div className="flex flex-col items-center bg-black text-white min-h-screen p-4">
      <Link
        href="/" 
        className="absolute left-4 top-4 text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
      >
        Go Home
        <svg className="rtl:rotate-0 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
        </svg>
      </Link>

      <h1 className="text-3xl font-bold mb-4">Sudoku Challenge</h1>
      <div className="grid grid-cols-9 gap-1">
        {puzzle.length > 0 &&
          puzzle.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                className={`w-14 h-14 text-center text-2xl ${
                  isSolved ? "bg-green-600" : "bg-gray-800"
                } text-white border border-gray-600`}
                value={cell === 0 ? "" : cell}
                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                disabled={isSolved || sudoku.puzzle[rowIndex][colIndex] !== 0}
              />
            ))
          )}
      </div>
      <div className="flex mt-4 space-x-4">
        <button className="px-4 py-2 bg-purple-600 rounded" onClick={handleNewGame}>
          New Game
        </button>
        <button className="px-4 py-2 bg-blue-600 rounded" onClick={handleHint}>
          Hint
        </button>
        <button className="px-4 py-2 bg-green-600 rounded" onClick={handleCheck}>
          Check
        </button>
      </div>
      <div className="mt-4 text-xl">
        Time: {Math.floor(timer / 60)}:{timer % 60}
      </div>
      <div className="mt-2">{hintMessage}</div>
      <div className="mt-2">{statusMessage}</div>
      {isSolved && (
        <div className="mt-4 p-4 bg-green-600 rounded text-2xl font-bold">
          🎉 You Solved it in {Math.floor(timer / 60)} minutes and {timer % 60} seconds!
        </div>
      )}
    </div>
  );
};

export default ChallengePage;
