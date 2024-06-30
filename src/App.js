/** @format */

import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import logo from "./assets/logo192.png";
import ProgressBar from "./components/ProgressBar";
import Loading from "./components/Loading";
import ReadyState from "./components/ReadyState";
import ErrorState from "./components/ErrorState";
import QuestionContainer from "./components/QuestionContainer";
import Timer from "./components/Timer";
import FinishState from "./components/FinishState";
import { useQuestionsContext } from "./contexts/questionsContext";

function App() {
  const { status, questions, progress, getData } = useQuestionsContext();

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <Header img={logo}>CHEAT QUIZ APP</Header>
      <Main>
        {status === "ready" && <ReadyState />}
        {status === "loading" && <Loading />}
        {status.includes("error") && <ErrorState error={status} />}
        {status === "started" && (
          <>
            <QuestionContainer>
              <ProgressBar
                backgroundColor="lightgrey"
                color="green"
                width="100%"
                height="20px"
                current={progress}
                outOf={questions.length}
                borderRadius="8px"
              />
            </QuestionContainer>
            <Timer
              startMins={Math.ceil(questions.length * 0.5)}
              startSecs={0}
            />
          </>
        )}
        {status === "finished" && <FinishState />}
      </Main>
    </div>
  );
}

export default App;
