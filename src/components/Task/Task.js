import React from "react";
import "./task.css";
import { formatDistance } from "date-fns";
import PropTypes from "prop-types";
import classNames from "classnames";

export default class Task extends React.Component {
  static defaultProps = {
    date: new Date(),
    onDeleted: () => {},
    onToggleCompleted: () => {},
    completed: false,
  };
  static propTypes = {
    date: PropTypes.object,
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    completed: PropTypes.bool,
  };
  state = {
    timer: this.props.timer,
    pause: true,
  };
  //Приобразование таймера
  modifyTime = (time) => {
    return time.toString().padStart(2, "0");
  };
  timerSet = () => {
    const { timer } = this.state;
    if (timer > 0) {
      return `${this.modifyTime(Math.floor(timer / 60))}:${this.modifyTime(
        Math.floor(timer % 60)
      )}`;
    } else {
      return `00:00`;
    }
  };
  handleStart = () => {
    this.setState({ pause: false });
  };
  handleStop = () => {
    this.setState({ pause: true });
  };

  startTimer = () => {
    this.interval = setInterval(() => {
      if (!this.state.pause && this.state.timer !== 0) {
        this.setState(({ timer }) => {
          return { timer: timer - 1 };
        });
      }
    }, 1000);
  };
  componentDidMount() {
    this.startTimer();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { label, date, onDeleted, onToggleCompleted, completed } = this.props;

    const taskClassName = classNames({ completed: completed === true });
    const checkbox = taskClassName;
    const currentDate = new Date();
    const createDate = date;
    const created = formatDistance(createDate, currentDate, {
      includeSeconds: true,
    });

    return (
      <li className={taskClassName}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={checkbox}
            onChange={onToggleCompleted}
          />
          <label>
            <span className="title" onClick={onToggleCompleted}>
              {label}
            </span>
            <span className="description">
              <button
                className="icon icon-play"
                onClick={this.handleStart}
              ></button>
              <button
                className="icon icon-pause"
                onClick={this.handleStop}
              ></button>
              <span className="timer">{this.timerSet()}</span>
            </span>
            <span className="description">{created}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    );
  }
}
