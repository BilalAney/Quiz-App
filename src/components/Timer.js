/** @format */

import { useState } from "react";
import { useEffect } from "react";
import { useQuestionsContext } from "../contexts/questionsContext";

function Timer({ startMins, startSecs }) {
  const convertToCount = startMins * 60 + startSecs;
  const [counter, setCounter] = useState(convertToCount);
  const { timerFinish } = useQuestionsContext();

  if (counter === 0) timerFinish();

  useEffect(() => {
    const timerId = setInterval(() => setCounter((pre) => pre - 1), 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);
  const mins = `0${Math.floor(counter / 60)}`.slice(-2);
  const secs = `0${Math.floor(counter % 60)}`.slice(-2);
  return (
    <span>
      {mins}:{secs}
    </span>
  );
}

export default Timer;
