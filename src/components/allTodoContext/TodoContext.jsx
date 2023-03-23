import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const BASE_URL = "https://todonewbcknd.onrender.com";

export const getAllTodoList = createContext();

const TodoContext = ({ children }) => {
  const [allTodo, setAllTodo] = useState("");
  const [inputTodo, setInputTodo] = useState("");
  const [addORedite, setAddORedites] = useState(false);
  const [singleTodo, setSingleTodo] = useState("");

  async function getTodos() {
    axios
      .get(`${BASE_URL}/todos/api/`)
      .then((res) => setAllTodo(res.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <getAllTodoList.Provider
      value={{
        allTodo,
        setAllTodo,
        inputTodo,
        setInputTodo,
        addORedite,
        setAddORedites,
        singleTodo,
        setSingleTodo,
      }}
    >
      {children}
    </getAllTodoList.Provider>
  );
};

export default TodoContext;
