/** @format */

function FinishState({ points, userPoints, highestMark, handleClick, reason }) {
  const styles = {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  };

  return (
    <div style={styles}>
      <h2>
        {reason === "quiz_finished"
          ? "You have finished the quiz!"
          : "Time finished up!"}
      </h2>
      <h3>
        You got {userPoints} {userPoints > points / 2 ? "🎉🎈" : "💔"}{" "}
      </h3>
      <h3>Highest mark: {highestMark}</h3>
      <button onClick={handleClick}>Retake the quiz!</button>
    </div>
  );
}
export default FinishState;
