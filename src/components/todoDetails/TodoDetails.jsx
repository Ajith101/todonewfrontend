import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, getAllTodoList } from "../allTodoContext/TodoContext";
import Header from "../Header";
import Loader from "../todoPage/Loader";

const TodoDetails = () => {
  const params = useParams();
  const {
    allTodo,
    setAllTodo,
    setEdite,
    edite,
    setSubmitLoading,
    submitLoading,
  } = useContext(getAllTodoList);
  const [newData, setNewdata] = useState("");
  const [singleTodo, setSingleTodo] = useState("");

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
    axios
      .put(`${BASE_URL}${params.id}`, {
        todo: newData,
      })
      .then((res) => {
        const newList = [...allTodo];
        newList.forEach((item) => {
          if (item._id === params.id) {
            item.todo = res.data.todo;
          }
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Header />

      <div className="flex justify-center items-center">
        <div className="bg-yellow-200 w-[90%] md:w-[60%] p-3 my-4 rounded-md md:my-10">
          <h1 className="text-2xl mb-4 font-bold font-font-2">Todos Deatils</h1>
          {submitLoading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <div className="flex gap-5 justify-between">
              <textarea
                className="w-[70%] h-auto p-1"
                type="text"
                onChange={(e) => setNewdata(e.target.value)}
                value={newData}
              />
              <div className="w-[30%]">
                <button
                  onClick={() => updateTodo()}
                  className="bg-green-700 hover:bg-blue-700 text-white text-lg px-3 py-2 text-center"
                >
                  Update
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TodoDetails;
