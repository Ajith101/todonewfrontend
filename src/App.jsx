import React from "react";
import TodoContext from "./components/allTodoContext/TodoContext";
import Header from "./components/Header";
import TodoPage from "./components/TodoPage";

const App = () => {
  return (
    <>
      <Header />
      <TodoPage />
    </>
  );
};

export default App;
