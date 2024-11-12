"use client";

import Button from "../components/Button";

const SudokuSolver = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white p-4">
      <header className="text-center mb-8">
        <p className="text-3xl font-bold mb-2">
          Welcome to <span className="text-purple-400">SudoSolve</span>
        </p>
      </header>
      <div className="flex md:flex-row gap-4">
        <Button title="Sudoku Challenge" link="/challenge" />
        <Button title="Sudoku Solver" link="/solver" />
      </div>
      <p className="text-gray-300">
        Solve and challenge Sudoku puzzles with an interactive 9x9 grid.{" "}
        <strong className="text-orange-500">Validate</strong>,{" "}
        <strong className="text-orange-500">solve</strong>, and{" "}
        <strong className="text-orange-500">improve</strong> your skills!
      </p>
    </div>
  );
};

export default SudokuSolver;
