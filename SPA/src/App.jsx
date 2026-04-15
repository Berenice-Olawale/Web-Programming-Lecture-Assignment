import { useState } from "react";
import Board from "./components/Board";
import Calculator from "./components/calculator/calculator";
import "./App.css";

function TicTacToeGame() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
  function restartGame() {
  setHistory([Array(9).fill(null)]);
  setCurrentMove(0);
  }

  const moves = history.map((squares, move) => {
    const description =
      move > 0 ? "Go to move #" + move : "Go to game start";

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <>
    <h2 className="section-title">Manage notebook stock with a simple game view</h2>
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          param3={handlePlay}
          onRestart={restartGame}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
    </>
  );
}

function App() {
  const [page, setPage] = useState("tictactoe");

  return (
    <div className="spa-page">
      <h1 className="spa-title">ReNew Notebook System</h1>
      <p className="spa-subtitle">ReNew Ltd. - Refurbished Notebooks</p>

    <div className="spa-menu">
      <button onClick={() => setPage("tictactoe")}>Inventory Game</button>
      <button onClick={() => setPage("calculator")}>Price Calculator</button>
    </div>

      <hr />

      <div className="spa-content">
        {page === "tictactoe" && <TicTacToeGame />}
        {page === "calculator" && <Calculator />}
      </div>
    </div>
  );
}

export default App;