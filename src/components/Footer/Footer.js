// import PropTypes from "prop-types";

import TaskFilter from "../TasksFilter/TasksFilter";
import "./Footer.css";

function Footer({ count, filterStatus, onFilterChange, clearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TaskFilter filterStatus={filterStatus} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}
// Footer.defaultProps = {
//   count: 0,
//   filterStatus: "all",
//   onFilterChange: () => {},
//   clearCompleted: () => {},
// };

// Footer.propTypes = {
//   count: PropTypes.number,
//   filterStatus: PropTypes.string,
//   onFilterChange: PropTypes.func,
//   clearCompleted: PropTypes.func,
// };
export default Footer;
