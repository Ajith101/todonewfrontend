import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// export const BASE_URL = "https://todonewbcknd.onrender.com/todos/api/";
export const BASE_URL = "http://localhost:2050/todos/api/";

export const getAllTodoList = createContext();

const TodoContext = ({ children }) => {
  const [allTodo, setAllTodo] = useState("");
  const [inputTodo, setInputTodo] = useState("");
  const [addORedite, setAddORedites] = useState(false);
  const [singleTodo, setSingleTodo] = useState("");
  const [loading, setLOading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [edite, setEdite] = useState("");

  async function getTodos() {
    await axios
      .get(`${BASE_URL}`)
      .then((res) => {
        setAllTodo(res.data);
        setLOading(true);
      })
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
        loading,
        submitLoading,
        setSubmitLoading,
        edite,
        setEdite,
      }}
    >
      {children}
    </getAllTodoList.Provider>
  );
};

export default TodoContext;
