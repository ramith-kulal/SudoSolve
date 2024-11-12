export const solveSudoku = (grid: number[][]): number[][] => {
    const findEmptyCell = (grid: number[][]) => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (grid[row][col] === 0) return { row, col };
        }
      }
      return null;
    };
  
    const isValidMove = (grid: number[][], row: number, col: number, num: number): boolean => {
          
      for (let c = 0; c < 9; c++) {
        if (grid[row][c] === num) return false;
      }
  

      for (let r = 0; r < 9; r++) {
        if (grid[r][col] === num) return false;
      }
  
      // Check 3x3 grid
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
          if (grid[r][c] === num) return false;
        }
      }
  
      return true;
    };
  
    const solve = (grid: number[][]): boolean => {
      const emptyCell = findEmptyCell(grid);
      if (!emptyCell) return true; // Puzzle solved
  
      const { row, col } = emptyCell;
  
      for (let num = 1; num <= 9; num++) {
        if (isValidMove(grid, row, col, num)) {
          grid[row][col] = num;
          if (solve(grid)) return true; // Recursively solve the next cells
          grid[row][col] = 0; // Backtrack if solution is not found
        }
      }
  
      return false; // No solution found
    };
  
    solve(grid);
    return grid;
  };
  