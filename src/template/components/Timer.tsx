import React from "react";

type Props = {
  time: number;
  highScore: number;
};

function Timer({ time, highScore }: Props) {
  const min: number = getMinute(time);
  const sec: number = getSec(time, min);
  const milli: number = getMilliSec(time, min, sec);

  const hs_min: number = getMinute(highScore);
  const hs_sec: number = getSec(highScore, hs_min);
  const hs_milli: number = getMilliSec(highScore, hs_min, hs_sec);

  function getMinute(time: number): number {
    const min = Math.floor(time / (60 * 60));
    return min;
  }

  function getSec(time: number, min: number): number {
    const sec = Math.floor((time - min * 60 * 60) / 60);
    return sec;
  }

  function getMilliSec(time: number, min: number, sec: number): number {
    const milli = time - min * 60 * 60 - sec * 60;
    return milli;
  }

  return (
    <div className="timer">
      <p className="display-title">time:</p>
      <p className="display-value">
        {`
            ${min < 10 ? "0" + min : min} : 
            ${sec < 10 ? "0" + sec : sec} : 
            ${milli < 10 ? "0" + milli : milli}
          `}
      </p>

      {highScore !== Infinity && (
        <React.Fragment>
          <p className="display-title mt-4">High Score:</p>
          <p className="display-value">
            {`
                ${hs_min < 10 ? "0" + hs_min : hs_min} : 
                ${hs_sec < 10 ? "0" + hs_sec : hs_sec} : 
                ${hs_milli < 10 ? "0" + hs_milli : hs_milli}
              `}
          </p>
        </React.Fragment>
      )}
    </div>
  );
}

export default Timer;
