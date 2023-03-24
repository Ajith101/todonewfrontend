import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TodoDetails from "./components/todoDetails/TodoDetails";
import TodoContext from "./components/allTodoContext/TodoContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/details/:id", element: <TodoDetails /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <TodoContext>
    <RouterProvider router={router} />
  </TodoContext>
);
