const isValid = (grid: number[][], row: number, col: number, num: number) => {
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num || grid[x][col] === num) return false;
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[startRow + i][startCol + j] === num) return false;
    }
  }

  return true;
};

export const generateSudoku = () => {
  const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
  solveSudoku(grid);
  const puzzle = grid.map((row) => row.slice());

  for (let i = 0; i < 40; i++) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    puzzle[row][col] = 0;
  }

  return { puzzle, solution: grid };
};

export const solveSudoku = (grid: number[][]) => {
  const solve = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(grid, row, col, num)) {
              grid[row][col] = num;
              if (solve()) return true;
              grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  solve();
};

export const getHint = (puzzle: number[][], solution: number[][]) => {
  const emptyCells: { row: number; col: number }[] = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (puzzle[row][col] === 0) emptyCells.push({ row, col });
    }
  }

  if (emptyCells.length === 0) return { message: "No more hints available!", hint: null };
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  return {
    message: "Here's a hint!",
    hint: {
      row: randomCell.row,
      col: randomCell.col,
      value: solution[randomCell.row][randomCell.col],
    },
  };
};
