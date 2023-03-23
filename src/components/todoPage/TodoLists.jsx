import React, { useContext } from "react";
import { BASE_URL, getAllTodoList } from "../allTodoContext/TodoContext";
import { IoIosRemoveCircle } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import axios from "axios";

const TodoLists = () => {
  const {
    allTodo,
    setAllTodo,
    setInputTodo,
    inputTodo,
    addORedite,
    setAddORedites,
    setSingleTodo,
    loading,
  } = useContext(getAllTodoList);

  // remove todo and update todo
  const removeUpdate = (value) => {
    const newList = [...allTodo];
    const updateList = newList.filter((item) => !(item._id === value._id));
    setAllTodo(updateList);
    setInputTodo("");
  };
  const removeTodo = (item) => {
    axios
      .delete(`${BASE_URL}/todos/api/${item._id}`)
      .then((res) => removeUpdate(res.data))
      .catch((err) => console.log(err));
  };

  //   edite todos and update edites
  const editeTodo = (item) => {
    setInputTodo(item.todo);
    setAddORedites(true);
    setSingleTodo({ item });
  };

  //   like and upadate like todo
  const updateLike = (value) => {
    const newlist = [...allTodo];
    newlist.forEach((item) => {
      if (item._id === value._id) {
        item.like = value.like;
      }
    });
    setAllTodo(newlist);
  };
  const likeBTN = (item) => {
    axios
      .put(`${BASE_URL}/todos/api/${item._id}`, {
        like: !item.like,
      })
      .then((res) => updateLike(res.data))
      .catch((err) => console.log(err));
  };

  //   display todos
  const displayTodos =
    allTodo &&
    allTodo.map((item, id) => {
      return (
        <div
          key={id}
          className="bg-[#defdffe8] w-full flex gap-2 justify-between pr-5 p-1 border-[2px] border-white rounded-md"
        >
          <div className="flex font-font-2 text-xl w-[60%] items-center gap-3">
            <h1>
              {id + 1}
              {".) "}
            </h1>
            <h1>{item.todo}</h1>
          </div>
          <div className="flex w-[40%] justify-center items-center gap-4">
            <IoIosRemoveCircle
              onClick={() => removeTodo(item)}
              className="text-red-700"
              size={"20px"}
            />
            <FaPencilAlt
              onClick={() => editeTodo(item)}
              className="text-black"
              size={"20px"}
            />
            {item.like ? (
              <AiFillLike
                onClick={() => likeBTN(item)}
                className="text-blue-700"
                size={"20px"}
              />
            ) : (
              <AiOutlineLike
                onClick={() => likeBTN(item)}
                className="text-blue-700"
                size={"20px"}
              />
            )}
          </div>
        </div>
      );
    });

  return (
    <div>
      {loading ? <h1>loading</h1> : undefined}
      <h1 className="text-xl font-bold py-3">Lists Of Todos</h1>
      {allTodo.length > 0 ? (
        <div className="flex flex-col gap-2">{displayTodos}</div>
      ) : (
        <h1 className="text-2xl font-semibold font-signature-1">
          Nothing Here !
        </h1>
      )}
    </div>
  );
};

export default TodoLists;
