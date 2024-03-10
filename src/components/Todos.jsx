import React, { useState } from "react";
import PropTypes from "prop-types";

import Todo from "./Todo";

function Todos({ todoItems, setTodosList }) {
  const [todo, setTodo] = useState("");

  const now = new Date();
  const currentDateTime = now.toLocaleString("en", {
    hour: "2-digit",
    minute: "2-digit",
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo === "") return;
    const id = crypto.randomUUID();

    let newTodo = {
      id,
      description: todo.charAt(0).toUpperCase() + todo.slice(1),
      date: currentDateTime,
    };
    setTodosList([...todoItems, newTodo]);
    localStorage.setItem("todos", JSON.stringify(todoItems));
    setTodo("");
  };

  const handleEdit = (item) => {
    setTodosList(
      todoItems?.map((t) => (t.id === item.id ? { ...t, ...item } : t))
    );
    localStorage.setItem("todos", JSON.stringify(todoItems));
  };

  const handleDelete = (item) => {
    setTodosList(todoItems?.filter((t) => t.id !== item.id));
    localStorage.setItem("todos", JSON.stringify(todoItems));
  };

  return (
    <div className="todos-app">
      <h1>My To-Do List</h1>
      <div className="todos">
        <form className="input-section" onSubmit={handleSubmit}>
          <input
            className="todo-input"
            type="text"
            placeholder="Add Item"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <div className="todo-add-button">
            <button className="add-button">+</button>
          </div>
        </form>

        <div className="todos-container">
          {todoItems?.map((todo) => (
            <Todo
              key={todo.id}
              item={todo}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

Todos.propTypes = {
  todoItems: PropTypes.array,
  setTodosList: PropTypes.func,
};

export default Todos;
