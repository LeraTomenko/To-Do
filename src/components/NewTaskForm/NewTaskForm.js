import "./NewTaskForm.css";
import React, { useState } from "react";
// import PropTypes from "prop-types";

function NewTaskForm({ addItem }) {
  // static defaultProps = {
  //   addItem: () => {},
  // };

  // static propTypes = {
  //   addItem: PropTypes.func,
  // };
  const [label, setLabel] = useState("");
  const [labelMin, setLabelMin] = useState("");
  const [labelSec, setLabelSec] = useState("");

  const translateNumbTime = (value, min, max) => {
    if (value > max) return max;
    if (value < min) return min;
    return value;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const timer = parseInt(labelMin || 0) * 60 + parseInt(labelSec || 0) * 1;
    addItem(label, timer);
    setLabel("");
    setLabelMin("");
    setLabelSec("");
  };

  const onLabelChange = (event) => {
    setLabel(event.target.value);
  };
  const onLabelMinChange = (event) => {
    let value = event.target.value;
    if (value != "") {
      event.target.value = translateNumbTime(+value, 0, 1440) || 0;
      setLabelMin(event.target.value);
    }
  };
  const onLabeSecChange = (event) => {
    let value = event.target.value;
    if (value != "") {
      event.target.value = translateNumbTime(+value, 0, 60) || 0;
      setLabelSec(event.target.value);
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          className="new-todo"
          required
          autoFocus
          value={label}
          onChange={onLabelChange}
          placeholder="Task"
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Min"
          value={labelMin}
          onChange={onLabelMinChange}
          pattern="[0-9]{2}"
          autoFocus
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          value={labelSec}
          onChange={onLabeSecChange}
          pattern="[0-9]{2}"
          autoFocus
        />
        <button type="submit" style={{ display: "none" }}>
          {" "}
        </button>
      </form>
    </header>
  );
}
export default NewTaskForm;
