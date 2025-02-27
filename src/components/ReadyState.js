/** @format */

import { useQuestionsContext } from "../contexts/questionsContext";

function ReadyState() {
  const styles = {
    display: "flex",
    flexDirection: "column",
    gap: "3.7rem",
  };

  const { questions, startQuiz } = useQuestionsContext();
  const noOfQuestions = questions.length;

  return (
    <div style={styles}>
      <h1>Ready to take this quiz?</h1>
      <h3>You will go by different questions, cllect as much as possible</h3>
      <h5>You have {noOfQuestions} questions</h5>
      <button onClick={startQuiz}>START NOW</button>
    </div>
  );
}

export default ReadyState;
