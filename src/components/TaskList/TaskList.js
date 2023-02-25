import "./TaskList.css";
import React from "react";
import PropTypes from "prop-types";

import Task from "../Task/Task";

export default class TaskList extends React.Component {
  static defaultProps = {
    todos: [],
    onDeleted: () => {},
    onToggleCompleted: () => {},
  };
  static propTypes = {
    todos: PropTypes.array,
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
  };
  render() {
    const { todos, onDeleted, onToggleCompleted } = this.props;

    const elements = todos.map((item) => (
      <Task
        label={item.label}
        completed={item.completed}
        key={item.id}
        date={item.date}
        onDeleted={() => {
          onDeleted(item.id);
        }}
        timer={item.timer}
        onToggleCompleted={() => {
          onToggleCompleted(item.id);
        }}
      />
    ));

    return <ul className="todo-list">{elements}</ul>;
  }
}
