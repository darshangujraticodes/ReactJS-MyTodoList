import { useEffect, useState } from "react";
import Task from "./components/Task";
import TaskForm from "./components/TaskForm";

function App() {
  return (
    <>
      <div>
        <div className="mt-3">
          <a className="coder" href="https://darshan-gujrati.netlify.app/">
            Crafted By Darshan Gujrati
          </a>
          |
          <a
            className="links ms-3"
            href="https://github.com/darshangujraticodes/ReactJS-MyTodoList"
          >
            Github Repo.
          </a>
        </div>
        <TaskForm />
        <Task />
      </div>
    </>
  );
}

export default App;
