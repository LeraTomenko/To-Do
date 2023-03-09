import React, { useState, useEffect } from "react";
import "./task.css";
import { formatDistance } from "date-fns";
// import PropTypes from "prop-types";
import classNames from "classnames";

function Task({
  label,
  date,
  onDeleted,
  onToggleCompleted,
  completed,
  timer,
  updateTimer,
  id,
}) {
  // static defaultProps = {
  //   date: new Date(),
  //   onDeleted: () => {},
  //   onToggleCompleted: () => {},
  //   completed: false,
  // };
  // static propTypes = {
  //   date: PropTypes.object,
  //   onDeleted: PropTypes.func,
  //   onToggleCompleted: PropTypes.func,
  //   completed: PropTypes.bool,
  // };
  const [timerTask, setTimerTask] = useState(timer);
  const [pause, setPause] = useState(true);

  //Приобразование таймера
  const modifyTime = (time) => {
    return time.toString().padStart(2, "0");
  };
  const timerSet = () => {
    if (timerTask > 0) {
      return `${modifyTime(Math.floor(timerTask / 60))}:${modifyTime(
        Math.floor(timerTask % 60)
      )}`;
    } else {
      return `00:00`;
    }
  };
  const handleStart = () => {
    setPause(false);
  };
  const handleStop = () => {
    setPause(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pause && timerTask !== 0) {
        setTimerTask((timerTask) => {
          return timerTask - 1;
        });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      updateTimer(id, timerTask);
    };
  }, [pause, timerTask]);

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
            <button className="icon icon-play" onClick={handleStart}></button>
            <button className="icon icon-pause" onClick={handleStop}></button>
            <span className="timer">{timerSet()}</span>
          </span>
          <span className="description">{created}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    </li>
  );
}
export default Task;
