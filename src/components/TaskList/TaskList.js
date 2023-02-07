import "./TaskList.css";
import React from "react";
import PropTypes from "prop-types";

import Task from "./Task/task";

export default class TaskList extends React.Component {
  render() {
    const { todos, onDeleted, onToggleCompleted } = this.props;

    const elements = todos.map((item) => {
      return (
        <Task
          label={item.label}
          completed={item.completed}
          key={item.id}
          date={item.date}
          onDeleted={() => {
            onDeleted(item.id);
          }}
          onToggleCompleted={() => {
            onToggleCompleted(item.id);
          }}
        />
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
TaskList.propTypes = {
  todos: PropTypes.array,
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
};
