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
  render() {
    const { label, date, onDeleted, onToggleCompleted, completed } = this.props;

    // const taskClassName = completed ? "completed" : "";
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
            <span className="description" onClick={onToggleCompleted}>
              {label}{" "}
            </span>
            <span className="created">{created}</span>
          </label>
          <button className="icon icon-edit" />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
      </li>
    );
  }
}
