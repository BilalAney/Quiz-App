/** @format */

import { memo } from "react";
import "../styles/questionStyles.css";
import { useQuestionsContext } from "../contexts/questionsContext";
function QuestionContainer({ children }) {
  const {
    isSelected,
    progress,
    questions,
    answers,
    handleSelect,
    nextProgress: handleNext,
    previousProgress: handleBack,
    deselectAnswer: handleDeselect,
  } = useQuestionsContext();

  const questionData = questions[progress];

  const selectedIndex = answers[progress];

  const answerElements = questionData.options.map((ele, ind) => (
    <OptionItem
      isCorrect={questionData.correctOption === ind}
      isChose={selectedIndex === ind}
      handleSelect={() => handleSelect(ind)}
      isSelected={isSelected}
      key={ind}
    >
      {ele}
    </OptionItem>
  ));
  return (
    <div className="question--container">
      {children}
      <h2>{questionData.question}</h2>
      <ol>{answerElements}</ol>
      <div className="question--btns--container">
        {progress !== 0 && <button onClick={handleBack}>Previous</button>}
        {isSelected && (
          <>
            <button onClick={handleDeselect}>Deselect</button>
            <button onClick={handleNext}>NEXT</button>
          </>
        )}
      </div>
    </div>
  );
}

function OptionItem({ children, handleSelect, isCorrect, isChose }) {
  const { isSelected } = useQuestionsContext();

  const styles = {
    width: "100%",
    height: "max-content",
    padding: "8px",
    border: "1px solid black",
    borderRadius: "12px",
  };

  const className = isCorrect ? "correct" : "wrong";

  return (
    <li
      className={`option--item ${isSelected && className} ${
        isChose && "selected"
      }`}
      style={styles}
      onClick={handleSelect}
    >
      {children}
    </li>
  );
}

export default memo(QuestionContainer);
