/** @format */

import { useReducer, useState } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "increment_counter":
      return { ...state, count: state.count + state.step };
    case "decrement_counter":
      return { ...state, count: state.count - state.step };
    case "normal_typing":
      return { ...state, count: action.payload || "" };
    case "setting_step":
      return { ...state, step: action.payload };
    case "reset_all":
      return { count: 0, step: 1 };
    default:
      return state;
  }
}

export default function DateCounter() {
  const intialState = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(reducer, intialState);

  const date = new Date();

  // Derived State here
  date.setDate(date.getDate() + state.count);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return (
    <section className="DateCounter">
      <NumericSlider value={state.step} handleChange={dispatch} />
      <NumericFieldWithButtons
        value={state.count}
        handleChange={dispatch}
        step={state.step}
      />
      <div>
        {day} / {month} / {year}
      </div>
      <button onClick={() => dispatch({ type: "reset_all" })}>RESET</button>
    </section>
  );
}

function NumericFieldWithButtons({ value, handleChange, step }) {
  function handleIncrement() {
    handleChange({ type: "increment_counter", step });
  }

  function handleDecrement() {
    handleChange({ type: "decrement_counter", step });
  }

  const styles = {
    display: "flex",
    flexDirection: "row",
    gap: "0",
  };

  return (
    <div style={styles}>
      <button onClick={handleDecrement}>-</button>
      <input
        type="number"
        name="counter"
        value={value}
        onChange={(e) =>
          handleChange({
            type: "normal_typing",
            payload: Number(e.target.value),
          })
        }
        style={{ width: "auto", padding: "8px" }}
      />
      <button onClick={handleIncrement}>+</button>
    </div>
  );
}

function NumericSlider({ value, handleChange }) {
  const styles = {
    display: "flex",
    flexDirection: "row",
    gap: "4px",
    width: "auto",
  };
  return (
    <label style={styles}>
      <input
        type="range"
        value={value}
        onChange={(e) =>
          handleChange({
            type: "setting_step",
            payload: Number(e.target.value),
          })
        }
        max="10"
        min="1"
        step="1"
      />{" "}
      {value}
    </label>
  );
}
