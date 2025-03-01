import { useEffect, useState } from "react";
import Task from "./components/Task";
import TaskForm from "./components/TaskForm";

function App() {
  return (
    <>
      <div>
        <div>
          <p className="mt-3">
            <a className="coder" href="https://darshan-gujrati.netlify.app/">
              Crafted By Darshan Gujrati
            </a>
          </p>
        </div>
        <TaskForm />
        <Task />
      </div>
    </>
  );
}

export default App;
