"use client";

import React, { useState } from "react";
import { solveSudoku } from "@/app/utils/solverUtils"; 
import Link from "next/link"; 

const ChallengePage = () => {
  
  const [puzzle, setPuzzle] = useState<number[][]>(Array(9).fill(Array(9).fill(0)));
  const [statusMessage, setStatusMessage] = useState("");
  const [isSolved, setIsSolved] = useState(false);

  const handleClear = () => {
    setPuzzle(Array(9).fill(Array(9).fill(0)));
    setStatusMessage("");
    setIsSolved(false);
  };

  const handleInputChange = (row: number, col: number, value: string) => {
    const num = parseInt(value) || 0;
    if (num >= 0 && num <= 9) {
      const newPuzzle = puzzle.map((r) => r.slice()); 
      newPuzzle[row][col] = num;
      setPuzzle(newPuzzle);
    }
  };

  const checkForDuplicates = () => {

    for (let row = 0; row < 9; row++) {
      const seen = new Set<number>();
      for (let col = 0; col < 9; col++) {
        const num = puzzle[row][col];
        if (num !== 0 && seen.has(num)) {
          return true; 
        }
        if (num !== 0) {
          seen.add(num);
        }
      }
    }


    for (let col = 0; col < 9; col++) {
      const seen = new Set<number>();
      for (let row = 0; row < 9; row++) {
        const num = puzzle[row][col];
        if (num !== 0 && seen.has(num)) {
          return true; 
        }
        if (num !== 0) {
          seen.add(num);
        }
      }
    }

    return false; 
  };


  const handleCheck = () => {
    if (checkForDuplicates()) {
      setStatusMessage("There are duplicate numbers in the puzzle! Please fix them.");
    } else {
      setStatusMessage("No duplicates found. You're good to go!");
    }
  };


  const handleSolver = () => {
    const newPuzzle = solveSudoku(puzzle.map((row) => row.slice())); 
    setPuzzle(newPuzzle);
    setStatusMessage("Puzzle Solved!");
    setIsSolved(true); 
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
      <h1 className="text-3xl font-bold mb-4">Sudoku Solver</h1>
      <div className="grid grid-cols-9 gap-1">
        {puzzle.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              className={`w-14 h-14 text-center text-2xl ${cell === 0 ? "bg-gray-800" : "bg-green-600"} text-white border border-gray-600`}
              value={cell === 0 ? "" : cell}
              onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
              disabled={isSolved} 
            />
          ))
        )}
      </div>
      <div className="flex mt-4 space-x-4">
        <button className="px-4 py-2 bg-gray-600 rounded" onClick={handleClear}>
          Clear
        </button>
        <button className="px-4 py-2 bg-blue-600 rounded" onClick={handleCheck}>
          Check
        </button>
        <button className="px-4 py-2 bg-green-600 rounded" onClick={handleSolver}>
          Solve
        </button>
      </div>
      <p className="mt-2 text-xl">{statusMessage}</p>
    </div>
  );
};

export default ChallengePage;
