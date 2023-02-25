import React from "react";

import "./App.css";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";

export default class App extends React.Component {
  maxId = 100;

  state = {
    filter: "all",
    toDoData: [],
  };

  // Создание таска
  createToDoItem(label, timer) {
    return {
      label,
      date: new Date(),
      completed: false,
      id: this.maxId++,
      timer,
    };
  }

  // Добавление таска
  addItem = (text, timer) => {
    const newItem = this.createToDoItem(text, timer);
    this.setState(({ toDoData }) => {
      const newArray = [...toDoData, newItem];
      return { toDoData: newArray };
    });
  };

  // Удаление таска
  deleteItem = (id) => {
    this.setState(({ toDoData }) => {
      const idx = toDoData.findIndex((el) => el.id === id);
      const newArray = [...toDoData.slice(0, idx), ...toDoData.slice(idx + 1)];

      return { toDoData: newArray };
    });
  };

  // Смена состояния
  onToggleCompleted = (id) => {
    this.setState(({ toDoData }) => {
      const idx = toDoData.findIndex((el) => el.id === id);
      const oldItem = toDoData[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed };
      const newArray = [
        ...toDoData.slice(0, idx),
        newItem,
        ...toDoData.slice(idx + 1),
      ];

      return { toDoData: newArray };
    });
  };

  // Фильтр для отрисовки
  filterTask = () => {
    switch (this.state.filter) {
      case "all":
        return this.state.toDoData;
      case "active":
        return this.state.toDoData.filter((item) => !item.completed);
      case "completed":
        return this.state.toDoData.filter((item) => item.completed);
      default:
        return this.state.toDoData;
    }
  };

  // Изменения фильтра
  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  // Удаление выполненных тасков
  clearCompleted = () => {
    this.setState(({ toDoData }) => {
      const completedTask = toDoData.filter((item) => !item.completed);
      return { toDoData: completedTask };
    });
  };

  render() {
    const { toDoData, filter } = this.state;
    const countActivItems = toDoData.filter((item) => !item.completed).length;

    return (
      <div>
        <NewTaskForm addItem={this.addItem} />
        <TaskList
          todos={this.filterTask()}
          onDeleted={this.deleteItem}
          onToggleCompleted={this.onToggleCompleted}
        />

        <Footer
          count={countActivItems}
          filterStatus={filter}
          onFilterChange={this.onFilterChange}
          clearCompleted={this.clearCompleted}
        />
      </div>
    );
  }
}
