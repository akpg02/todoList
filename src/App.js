import React, { useState, useEffect } from "react";
import Todos from "./components/Todos";

function App() {
  const [todosList, setTodosList] = useState(() => {
    /* because localstorage is synchronous - that could slow down the application
     instead of using an just an empty array as the initial state - we can use a function in its place,  which will only be executed on the initial render 
     */
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  // Update local storage whenever TODOs change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todosList));
  }, [todosList]);

  return (
    <div className="App">
      <Todos todoItems={todosList} setTodosList={setTodosList} />
    </div>
  );
}

export default App;
