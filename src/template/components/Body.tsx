import React from "react";
import { State } from "../page/Game";

type Props = {
  startGame: (e: React.MouseEvent<HTMLButtonElement>) => void;
  state: State;
  checkInputString: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetTimer: (e: React.MouseEvent<HTMLDivElement>) => void;
};

function Body({ startGame, state, checkInputString, resetTimer }: Props) {
  const gameFinished: boolean =
    state.gameState === "Success!" || state.gameState === "Failure";

  return (
    <div className="container">
      <div className="play-btn">
        <button
          className={`btn btn-start ${state.gameState !== "ready" && "hide"}`}
          onClick={startGame}
        >
          Start Game
        </button>
      </div>

      {
        <div
          className={`game-container ${
            state.gameState !== "ready" && "active"
          }`}
        >
          <div className="char-screen">
            <span className={`${state.gameState === "Failure" && "error"}`}>
              {state.currChar ? state.currChar : state.gameState}
            </span>
          </div>

          <div className="input-group custom-input-group">
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Type here..."
              value={state.userInput}
              onChange={checkInputString}
              disabled={gameFinished}
            />
            <div className={`input-group-append`} onClick={resetTimer}>
              <span className="input-group-text">Reset</span>
            </div>
          </div>

          {state.error && (
            <span className="text-error">You have entered wrong character</span>
          )}
        </div>
      }
    </div>
  );
}

export default Body;
