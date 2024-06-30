/** @format */

import { memo } from "react";
import "../styles/questionStyles.css";
function QuestionContainer({
  children,
  questionData,
  handleSelect,
  handleNext,
  handleBack,
  handleDeselect,
  selectedIndex,
  isSelected,
}) {
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
        {handleBack && <button onClick={handleBack}>Previous</button>}
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

function OptionItem({
  children,
  handleSelect,
  isCorrect,
  isSelected,
  isChose,
}) {
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
