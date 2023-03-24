import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, getAllTodoList } from "../allTodoContext/TodoContext";
import Header from "../Header";
import Loader from "../todoPage/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoDetails = () => {
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
  const params = useParams();
  const { allTodo, setSubmitLoading, submitLoading, setAllTodo } =
    useContext(getAllTodoList);
  const [newData, setNewdata] = useState("");
  const [singleTodo, setSingleTodo] = useState("");
  const [displayUpdatedTime, setDisplayUpdatedTime] = useState(null);

  // date and time
  const dtates = new Date();
  const dTime = dtates.toLocaleTimeString();
  const getDate = dtates.toDateString();

  const settingSingleTodo = (value) => {
    setNewdata(value.todo);
    setSingleTodo(value);
    setSubmitLoading(false);
  };

  const todoDatass = async () => {
    setSubmitLoading(true);
    await axios
      .get(`${BASE_URL}${params.id}`)
      .then((res) => {
        const [newelemt] = res.data;

        settingSingleTodo(newelemt);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    todoDatass();
  }, []);

  const updateTodo = () => {
    setSubmitLoading(true);
    axios
      .put(`${BASE_URL}${params.id}`, {
        todo: newData,
        edited: `${getDate} , ${dTime}`,
      })
      .then((res) => {
        const newList = [...allTodo];
        newList.forEach((item) => {
          if (item._id === params.id) {
            item.todo = res.data.todo;
            item.edited = res.data.edited;
          }
        });
        setAllTodo(newList);
        setSubmitLoading(false);
        notifyUpdate();
        setDisplayUpdatedTime(res.data.edited);
      })
      .catch((err) => console.log(err));
  };

  const displayUpdatedDate =
    allTodo &&
    allTodo
      .filter((item) => {
        return item._id === params.id;
      })
      .map((item, id) => {
        return (
          <div key={id}>
            <h2 className="py-2 text-slate-500">
              Added on :{" "}
              <span className="text-slate-600 text-sm">{item.time}</span>
            </h2>
            {item.edited && (
              <h2 className="py-2 text-slate-500">
                Edited on :{" "}
                <span className="text-slate-600 text-sm">{item.edited}</span>
              </h2>
            )}
          </div>
        );
      });
  // console.log(displayUpdatedTime);
  return (
    <>
      <Header />
      <ToastContainer />

      <div className="flex justify-center items-center">
        <div className="bg-yellow-200 w-[90%] md:w-[60%] p-3 my-4 rounded-md md:my-10">
          <h1 className="text-2xl mb-4 font-bold font-font-2">Todos Deatils</h1>

          {submitLoading ? (
            <div className="loader">
              <Loader />
            </div>
          ) : undefined}
          {displayUpdatedDate}

          <div className="flex gap-5 justify-between">
            <textarea
              className="w-[70%] h-auto p-1"
              type="text"
              onChange={(e) => setNewdata(e.target.value)}
              value={newData}
            />
            <div className="w-[30%]">
              <button
                onClick={() => (submitLoading ? undefined : updateTodo())}
                className="bg-green-700 hover:bg-blue-700 text-white text-lg px-3 py-2 text-center"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoDetails;
