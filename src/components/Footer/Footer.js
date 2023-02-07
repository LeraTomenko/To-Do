import PropTypes from "prop-types";

import TaskFilter from "./TasksFilter/TasksFilter";
import "./Footer.css";

const Footer = ({ count, filterStatus, onFilterChange, clearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TaskFilter filterStatus={filterStatus} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};
Footer.propTypes = {
  count: PropTypes.number,
};

export default Footer;
