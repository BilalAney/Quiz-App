/** @format */

import { useQuestionsContext } from "../contexts/questionsContext";

function FinishState() {
  const styles = {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  };

  const { questions, points, highestMark, progress, startQuiz } =
    useQuestionsContext();

  const totalPoints = questions.reduce((acc, cur) => cur.points + acc, 0);

  const reason =
    progress === questions.length - 1 ? "quiz_complete" : "time_finished";

  return (
    <div style={styles}>
      <h2>
        {reason === "quiz_finished"
          ? "You have finished the quiz!"
          : "Time finished up!"}
      </h2>
      <h3>
        You got {points} {points > totalPoints / 2 ? "🎉🎈" : "💔"}{" "}
      </h3>
      <h3>Highest mark: {highestMark}</h3>
      <button onClick={startQuiz}>Retake the quiz!</button>
    </div>
  );
}
export default FinishState;
