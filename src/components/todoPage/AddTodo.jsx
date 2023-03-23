import axios from "axios";
import React, { useContext } from "react";
import { BASE_URL, getAllTodoList } from "../allTodoContext/TodoContext";

const AddTodo = () => {
  const {
    inputTodo,
    setInputTodo,
    setAllTodo,
    allTodo,
    addORedite,
    setAddORedites,
    singleTodo,
    setSubmitLoading,
  } = useContext(getAllTodoList);

  //   add todo
  const addTodoBTn = () => {
    if (inputTodo === "") {
      return;
    } else {
      setSubmitLoading(true);
      axios
        .post(`${BASE_URL}/todos/api/`, {
          todo: inputTodo,
          like: false,
        })
        .then((res) => {
          setAllTodo([...allTodo, res.data]);
          setInputTodo("");
          setSubmitLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };

  // edite todoss and update todos
  const updateEdite = (values) => {
    const newList = [...allTodo];
    newList.forEach((items) => {
      if (items._id === values._id) {
        items.todo = values.todo;
      }
    });
    setAllTodo(newList);
    setInputTodo("");
    setAddORedites(false);
    setSubmitLoading(false);
  };
  const updateTodo = () => {
    if (inputTodo === "" || inputTodo === singleTodo.item.todo) {
      return;
    } else {
      setSubmitLoading(true);
      axios
        .put(`${BASE_URL}/todos/api/${singleTodo.item._id}`, {
          _id: singleTodo.item._id,
          todo: inputTodo,
          like: singleTodo.item.like,
        })
        .then((res) => updateEdite(res.data))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="flex gap-5 justify-center w-full items-center">
      <input
        value={inputTodo}
        onChange={(e) => setInputTodo(e.target.value)}
        type="text"
        className="border-[2px] w-[60%] px-1 py-2"
      />
      <div className="w-[40%]">
        <button
          onClick={() => (addORedite ? updateTodo() : addTodoBTn())}
          className="bg-green-700 hover:bg-blue-700 text-white text-lg px-3 py-2 text-center"
        >
          {addORedite ? "Update" : "Add Notes"}
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
