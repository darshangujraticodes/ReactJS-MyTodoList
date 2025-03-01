import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import TaskContextProvider from "./context/TaskContext.jsx";
import App from "./App.jsx";
import { ToastContainer, toast } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <TaskContextProvider>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      limit={2}
      theme="light"
      hideProgressBar={false}
      closeOnClick={false}
      pauseOnHover
    />
  </TaskContextProvider>
);
