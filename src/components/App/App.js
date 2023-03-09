import React, { useState } from "react";
import "./App.css";
// import { set } from "lodash";

import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";
const counter = () => {
  let maxId = 1;
  return () => maxId++;
};

const maxId = counter();

function App() {
  const [filter, setFilter] = useState("all");
  const [toDoData, setToDoData] = useState([]);

  // Добавление таска
  const addItem = (label, timer) => {
    const newItem = {
      label,
      date: new Date(),
      completed: false,
      id: maxId(),
      timer,
    };
    setToDoData((toDoData) => {
      return [...toDoData, newItem];
    });
  };

  // Удаление таска
  const deleteItem = (id) => {
    setToDoData((toDoData) => {
      const idx = toDoData.findIndex((el) => el.id === id);
      return [...toDoData.slice(0, idx), ...toDoData.slice(idx + 1)];
    });
  };

  // Смена состояния
  const onToggleCompleted = (id) => {
    setToDoData((toDoData) => {
      const idx = toDoData.findIndex((el) => el.id === id);
      const oldItem = toDoData[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed };
      return [...toDoData.slice(0, idx), newItem, ...toDoData.slice(idx + 1)];
    });
  };

  // Фильтр для отрисовки
  const filterTask = () => {
    switch (filter) {
      case "all":
        return toDoData;
      case "active":
        return toDoData.filter((item) => !item.completed);
      case "completed":
        return toDoData.filter((item) => item.completed);
      default:
        return toDoData;
    }
  };

  // Изменения фильтра
  const onFilterChange = (filter) => {
    setFilter(filter);
  };

  // Удаление выполненных тасков
  const clearCompleted = () => {
    const completedTask = toDoData.filter((item) => !item.completed);
    setToDoData(completedTask);
  };
  //Обновление таймера
  const updateTimer = (id, timer) => {
    setToDoData((toDoData) => {
      const idx = toDoData.findIndex((el) => el.id === id);
      const oldItem = toDoData[idx];
      if (typeof oldItem === "undefined") return toDoData;
      const newItem = { ...oldItem, timer: timer };
      return [...toDoData.slice(0, idx), newItem, ...toDoData.slice(idx + 1)];
    });
  };

  const countActivItems =
    toDoData.length !== 0
      ? toDoData.filter((item) => !item.completed).length
      : null;

  return (
    <div>
      <NewTaskForm addItem={addItem} />
      <TaskList
        todos={filterTask()}
        onDeleted={deleteItem}
        onToggleCompleted={onToggleCompleted}
        updateTimer={updateTimer}
      />
      <Footer
        count={countActivItems}
        filterStatus={filter}
        onFilterChange={onFilterChange}
        clearCompleted={clearCompleted}
      />
    </div>
  );
}
export default App;
