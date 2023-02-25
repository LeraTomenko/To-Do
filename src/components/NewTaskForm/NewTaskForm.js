import "./NewTaskForm.css";
import React from "react";
import PropTypes from "prop-types";

export default class NewTaskForm extends React.Component {
  static defaultProps = {
    addItem: () => {},
  };

  static propTypes = {
    addItem: PropTypes.func,
  };
  const;
  state = {
    label: "",
    labelMin: "",
    labelSec: "",
  };
  modifyTime = (time) => {
    return time.toString().padStart(2, "0");
  };
  translateNumbTime = (value, min, max) => {
    if (value > max) return max;
    if (value < min) return min;
    return value;
  };

  onSubmit = (event) => {
    const { label, labelMin, labelSec } = this.state;
    event.preventDefault();
    const timer = parseInt(labelMin || 0) * 60 + parseInt(labelSec || 0) * 1;

    this.props.addItem(label, timer);
    this.setState({ label: "", labelMin: "", labelSec: "" });
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };
  onLabelMinChange = (event) => {
    let value = event.target.value;
    if (value != "")
      event.target.value = this.translateNumbTime(+value, 0, 1440) || 0;
    this.setState({ labelMin: event.target.value });
  };
  onLabeSecChange = (event) => {
    let value = event.target.value;
    if (value != "")
      event.target.value = this.translateNumbTime(+value, 0, 60) || 0;
    this.setState({ labelSec: event.target.value });
  };

  render() {
    const { label, labelMin, labelSec } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            required
            autoFocus
            value={label}
            onChange={this.onLabelChange}
            placeholder="Task"
          />
          <input
            type="number"
            className="new-todo-form__timer"
            placeholder="Min"
            value={labelMin}
            onChange={this.onLabelMinChange}
            pattern="[0-9]{2}"
            autoFocus
          />
          <input
            type="number"
            className="new-todo-form__timer"
            placeholder="Sec"
            value={labelSec}
            onChange={this.onLabeSecChange}
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
}
