import { createContext, useEffect, useState } from "react";

export const taskContext = createContext();

const taskContextProvider = ({ children }) => {
  const [todoData, setTodoData] = useState([]);

  const [checkedTask, setCheckedTask] = useState([]);

  const [editTaskId, setEditTaskId] = useState(0);

  const data = {
    todoData,
    setTodoData,

    checkedTask,
    setCheckedTask,
    editTaskId,
    setEditTaskId,
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("todoTaskData"));

    const checkData = JSON.parse(localStorage.getItem("checkedTaskData"));

    // console.log("fetch localstorage data = ", data);

    if (data && data.length > 0) setTodoData(data);

    if (checkData && checkData.length > 0) setCheckedTask(checkData);
  }, []);

  useEffect(() => {
    localStorage.setItem("todoTaskData", JSON.stringify(todoData));

    localStorage.setItem("checkedTaskData", JSON.stringify(checkedTask));
  }, [todoData]);

  // console.log("context = ", todoData);

  // console.log(todoData);

  return <taskContext.Provider value={data}>{children}</taskContext.Provider>;
};

export default taskContextProvider;
