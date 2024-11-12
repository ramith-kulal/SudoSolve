# SUDO SOLVE

A responsive Sudoku Solver web application built using **Next.js**, **TypeScript**, **React**, and **Tailwind CSS**. The app allows users to input Sudoku puzzles, validate them, and solve them using a backtracking algorithm. The project is deployed on Vercel: [Live Demo](https://sudosolve-six.vercel.app/).

## 🚀 Demo
Visit the live app: [SudoSolve](https://sudosolve-six.vercel.app/)

## 🛠️ Tech Stack
- **Next.js** for server-side rendering and routing
- **React** for interactive UI
- **TypeScript** for type-safe development
- **Tailwind CSS** for styling
- **Vercel** for deployment

## 🧩 Features
- **Input Sudoku Puzzle**: Users can input custom Sudoku puzzles using the interactive grid.
- **Clear Puzzle**: Reset the entire grid with a single click.
- **Check Validity**: Validate the current state of the puzzle.
- **Solve Puzzle**: Solve the puzzle using a backtracking algorithm.
- **Responsive Design**: The app is fully responsive, providing a seamless experience across devices.

## 📜 Approach

### 1. Validation Logic
The validation function checks if the current puzzle configuration follows the Sudoku rules:
- Each row must contain unique numbers (1-9).
- Each column must contain unique numbers (1-9).
- Each 3x3 subgrid must contain unique numbers (1-9).

If any duplicates are found in the row, column, or subgrid, the puzzle is marked as invalid.

### 2. Solving Algorithm
The Sudoku solver uses the **backtracking algorithm**:
- It finds the first empty cell (represented by `0`).
- It attempts to fill the cell with numbers from `1` to `9`.
- For each number, it checks if placing it in the current cell maintains the validity of the puzzle.
- If a valid number is found, it recursively attempts to solve the rest of the puzzle.
- If no valid number is found, it backtracks by resetting the cell to `0` and tries the next number.

This process continues until the entire puzzle is solved or deemed unsolvable.

### 3. Client-Side Rendering
The app uses client-side rendering with `useEffect` to handle navigation and state management. The `useRouter` hook from Next.js ensures smooth navigation back to the home page when the "Go Home" button is clicked.

## 💻 Running the Project Locally

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v18 or later)
- **npm** or **yarn**

### Installation
Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/yourusername/sudosolve.git
cd sudosolve
npm install
npm run dev
```
Open the app in your browser at http://localhost:3000.
## Acknowledgements

- Parts of the UI, including buttons and animations, were inspired by design snippets found on CodePen. Credits go to the original authors for their creative designs.

### Additional Notes:

Note: Some of the UI elements, such as buttons and animations, were adapted and modified from CodePen examples. Credit goes to the respective creators for their inspiring designs.

The project is deployed on Vercel. To deploy your own version:

- Connect your GitHub repository to Vercel.
- Click "Deploy" on Vercel's dashboard.
- Feel free to open issues or create pull requests if you find any bugs or want to add features.
  
  
