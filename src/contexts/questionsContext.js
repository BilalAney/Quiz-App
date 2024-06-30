/** @format */

import { createContext, useContext, useReducer } from "react";

const Context = createContext();

function reducer(state, action) {
  const question = state.questions.at(state.progress);
  switch (action.type) {
    case "set_questions":
      return { ...state, questions: action.payload, status: "ready" };
    case "set_error":
      return { ...state, status: `error: ${action.payload}` };
    case "set_loading":
      return { ...state, status: "loading" };
    case "start_quiz":
      return { ...state, status: "started", progress: 0, points: 0 };
    case "increment_progress": {
      if (state.progress >= state.questions.length - 1)
        return {
          ...state,
          progress: 0,
          isSelected: false,
          status: "finished",
          highestMark:
            state.points > state.highestMark ? state.points : state.highestMark,
        };
      else
        return {
          ...state,
          isSelected: state.answers.at(state.progress + 1) >= 0,
          progress: state.progress + 1,
        };
    }
    case "decrement_progress":
      return { ...state, progress: state.progress - 1, isSelected: true };
    case "select_unselect_option": {
      //If the payload was null, that's mean it is "Deselect" task, so check if the previous answer of this question was true or no
      if (action.payload === null) {
        //check if the the selected answer is true, if so, then subtract the points
        if (state.answers.at(state.progress) === question.correctOption)
          return {
            ...state,
            isSelected: !state.isSelected,
            points: state.points - question.points,
            answers: state.answers.slice(0, state.progress),
          };
        else
          return {
            ...state,
            isSelected: !state.isSelected,
            answers: state.answers.slice(0, state.progress),
          };
      }
      //else if the answer id correct, increment the counter, if the payload was null, the deselect and that's it
      else
        return action.payload === question.correctOption
          ? {
              ...state,
              isSelected: !state.isSelected,
              points: state.points + question.points,
              answers: [...state.answers, action.payload],
            }
          : {
              ...state,
              isSelected: !state.isSelected,
              answers: [...state.answers, action.payload],
            };
    }
    case "time_finished":
      return { ...state, status: "finished" };

    default:
      throw new Error("Unknown Action");
  }
}

const initialState = {
  questions: [],
  status: "",
  progress: 0,
  points: 0,
  isSelected: false,
  answers: [],
  highestMark: 0,
};

function QuestionsProvider({ children }) {
  const [
    { status, questions, progress, isSelected, points, highestMark, answers },
    dispatch,
  ] = useReducer(reducer, initialState);

  function nextProgress() {
    dispatch({ type: "increment_progress" });
  }
  function previousProgress() {
    dispatch({ type: "decrement_progress" });
  }
  function deselectAnswer() {
    dispatch({ type: "select_unselect_option", payload: null });
  }

  function handleSelect(selectedIndex) {
    if (!isSelected)
      dispatch({ type: "select_unselect_option", payload: selectedIndex });
  }

  function timerFinish() {
    dispatch({ type: "time_finished" });
  }

  function startQuiz() {
    dispatch({ type: "start_quiz" });
  }

  async function getData() {
    try {
      dispatch({ type: "set_loading" });
      const response = await fetch("http://localhost:8000/questions");

      if (!response.ok) throw new Error("Unknown error");

      const data = await response.json();

      dispatch({ type: "set_questions", payload: data });
    } catch (error) {
      console.error(error.message);
      dispatch({ type: "set_error", payload: error.message });
    }
  }

  return (
    <Context.Provider
      value={{
        status,
        questions,
        progress,
        isSelected,
        points,
        highestMark,
        answers,
        nextProgress,
        previousProgress,
        deselectAnswer,
        handleSelect,
        timerFinish,
        startQuiz,
        getData,
      }}
    >
      {children}
    </Context.Provider>
  );
}

function useQuestionsContext() {
  const qContext = useContext(Context);
  if (qContext === undefined)
    throw new Error(
      "The useQuestionsContext was used outside the QuestionsProvider context!"
    );
  return qContext;
}

export { QuestionsProvider, useQuestionsContext };
