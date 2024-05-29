/** @format */

function ReadyState({ noOfQuestions, handleClick }) {
  const styles = {
    display: "flex",
    flexDirection: "column",
    gap: "3.7rem",
  };
  return (
    <div style={styles}>
      <h1>Ready to take this quiz?</h1>
      <h3>You will go by different questions, cllect as much as possible</h3>
      <h5>You have {noOfQuestions} questions</h5>
      <button onClick={handleClick}>START NOW</button>
    </div>
  );
}

export default ReadyState;
