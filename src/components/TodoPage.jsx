import React from "react";
import AddTodo from "./todoPage/AddTodo";
import TodoLists from "./todoPage/TodoLists";

const TodoPage = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-yellow-200 w-[90%] md:w-[60%] p-3 my-4 rounded-md md:my-10">
        <h1 className="text-2xl mb-4 font-bold font-font-2">
          Add Your Favorite notes Here
        </h1>
        <AddTodo />
        <TodoLists />
      </div>
    </div>
  );
};

export default TodoPage;
