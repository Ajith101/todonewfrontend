import axios from "axios";
import React, { useContext } from "react";
import { BASE_URL, getAllTodoList } from "../allTodoContext/TodoContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTodo = () => {
  const notify = () =>
    toast.success("Added Succesfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifyUpdate = () =>
    toast.success("Updated Succesfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const dtates = new Date();
  const dTime = dtates.toLocaleTimeString();
  const getDate = dtates.toDateString();

  // console.log(getDate, dTime);
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
        .post(`${BASE_URL}`, {
          todo: inputTodo,
          like: false,
          time: `${getDate} , ${dTime}`,
        })
        .then((res) => {
          setAllTodo([...allTodo, res.data]);
          setInputTodo("");
          setSubmitLoading(false);
          notify();
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
    notifyUpdate();
  };
  const updateTodo = () => {
    if (inputTodo === "" || inputTodo === singleTodo.item.todo) {
      return;
    } else {
      setSubmitLoading(true);
      axios
        .put(`${BASE_URL}${singleTodo.item._id}`, {
          _id: singleTodo.item._id,
          todo: inputTodo,
          like: singleTodo.item.like,
        })
        .then((res) => updateEdite(res.data))
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <ToastContainer />

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
    </>
  );
};

export default AddTodo;
