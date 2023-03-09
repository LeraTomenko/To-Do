import React from "react";
import "./TasksFilter.css";
// import PropTypes from "prop-types";
function TaskFilter({ filterStatus, onFilterChange }) {
  // static defaultProps = {
  //   filterStatus: "all",
  //   onFilterChange: () => {},
  // };
  // static propTypes = {
  //   filterStatus: PropTypes.string,
  //   onFilterChange: PropTypes.func,
  // };
  const buttons = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "completed", label: "Completed" },
  ];

  const button = buttons.map(({ name, label }) => {
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
export default TaskFilter;
