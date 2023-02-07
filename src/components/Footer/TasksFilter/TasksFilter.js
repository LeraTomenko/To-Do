import React from "react";
import "./TasksFilter.css";

export default class TaskFilter extends React.Component {
  buttons = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "completed", label: "Completed" },
  ];
  render() {
    const { filterStatus, onFilterChange } = this.props;
    const button = this.buttons.map(({ name, label }) => {
      const isActive = filterStatus === name;
      const classBtn = isActive ? "selected" : "";

      return (
        <li key={name}>
          <button className={classBtn} onClick={() => onFilterChange(name)}>
            {label}{" "}
          </button>
        </li>
      );
    });
    return <ul className="filters">{button}</ul>;
  }
}
