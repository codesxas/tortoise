import React, { useState } from "react";

import Body from "../components/Body";
import Header from "../components/header/Header";
import Timer from "../components/Timer";

export interface State {
  time: number;
  timer: number | undefined;

  randomAlphabets: string;
  currChar: string;
  currCharIndex: number;

  error: boolean;
  userInput: string;

  gameState: string;
  highScore: number;
}

const alphabets: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const maxLength: number = 20;

function Game() {
  const [state, setState] = useState<State>({
    time: 0,
    timer: undefined,

    randomAlphabets: "",
    currChar: "",
    currCharIndex: 0,

    error: false,
    userInput: "",

    gameState: "ready",
    highScore: Infinity,
  });

  const startGame = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const randomAlphabets = randomStringGenerator(maxLength);
    handleChange("randomAlphabets", randomAlphabets);
    handleChange("currChar", randomAlphabets[0]);
    handleChange("currCharIndex", 0);
    handleChange("gameState", "start");
    handleChange("userInput", "");

    startTimer(0);
  };

  const randomStringGenerator = (length: number): string => {
    var result = "";
    const alphabetsLength = alphabets.length;

    for (var i = 0; i < length; i++) {
      result += alphabets.charAt(Math.floor(Math.random() * alphabetsLength));
    }

    return result;
  };

  const checkInputString = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();

    var currInput = e.target.value;

    if (currInput.length) {
      var lastSubmittedChar = currInput[currInput.length - 1].toLowerCase();

      if (lastSubmittedChar.toLowerCase() === state.currChar.toLowerCase()) {
        var currCharIndex = state.currCharIndex + 1;
        var currChar = state.randomAlphabets[currCharIndex];

        handleChange("currCharIndex", currCharIndex);
        handleChange("currChar", currChar);
        if (state.error) handleChange("error", false);

        if (currCharIndex === maxLength) {
          stopTimer();

          if (state.time > state.highScore) {
            handleChange("gameState", "Failure");
          } else {
            handleChange("highScore", state.time);
            handleChange("gameState", "Success!");
          }
        }
      } else {
        handleChange("error", true);
      }
    }

    handleChange("userInput", currInput);
  };

  const startTimer = (time: number): void => {
    let timer = window.setInterval(() => {
      time = time + 1;
      handleChange("time", time);
    }, 100);

    handleChange("timer", timer);
  };

  const stopTimer = (): void => {
    clearInterval(state.timer);
    handleChange("timer", undefined);
  };

  const resetTimer = (e: React.MouseEvent<HTMLDivElement>): void => {
    clearInterval(state.timer);
    handleChange("time", 0);
    handleChange("timer", undefined);
    handleChange("gameState", "ready");
  };

  const handleChange = (check: string, value: any): void => {
    setState((prevState) => ({
      ...prevState,
      [check]: value,
    }));
  };

  return (
    <div className="main">
      <Timer time={state.time} highScore={state.highScore} />
      <Header />
      <Body
        startGame={startGame}
        state={state}
        checkInputString={checkInputString}
        resetTimer={resetTimer}
      />
    </div>
  );
}

export default Game;
