import "./TaskList.css";
import React from "react";
import PropTypes from "prop-types";

import Task from "../Task/Task";

export default class TaskList extends React.Component {
  static defaultProps = {
    todos: [],
    onDeleted: () => {},
    onToggleCompleted: () => {},
    updateTimer: () => {},
  };
  static propTypes = {
    todos: PropTypes.array,
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    updateTimer: PropTypes.func,
  };
  render() {
    const { todos, onDeleted, onToggleCompleted, updateTimer } = this.props;

    const elements = todos.map((item) => (
      <Task
        label={item.label}
        completed={item.completed}
        key={item.id}
        id={item.id}
        date={item.date}
        onDeleted={() => {
          onDeleted(item.id);
        }}
        timer={item.timer}
        onToggleCompleted={() => {
          onToggleCompleted(item.id);
        }}
        updateTimer={(id, value) => updateTimer(id, value)}
      />
    ));

    return <ul className="todo-list">{elements}</ul>;
  }
}
