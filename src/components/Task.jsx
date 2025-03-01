import React, { useContext, useEffect, useState } from "react";
import { taskContext } from "../context/TaskContext";
import EditTaskForm from "./EditTaskForm";
import { toast } from "react-toastify";

const Task = () => {
  const {
    todoData,
    setTodoData,
    showUpdateBox,
    setShowUpdateBox,
    checkedTask,
    setCheckedTask,
  } = useContext(taskContext);

  // console.log("task page", todoData);

  const [checkBoxID, setCheckBoxID] = useState(0);

  const [editTaskId, setEditTaskId] = useState(0);

  useEffect(() => {
    const taskId = checkBoxID;
    if (checkedTask.includes(taskId)) {
      // console.log("useeffect = ", checkedTask.includes(taskId));

      const updateData = todoData.map((item) =>
        item.id === taskId ? { ...item, isComplete: true } : item
      );

      setTodoData(updateData);
    } else {
      const updateData = todoData.map((item) =>
        item.id === taskId ? { ...item, isComplete: false } : item
      );

      setTodoData(updateData);
    }
  }, [checkedTask]);

  // delete handle opr
  const deleteHandle = (taskId) => {
    const newData = todoData.filter((item) => item.id != taskId);
    setTodoData(newData);
    setCheckedTask(checkedTask.filter((item) => item !== taskId));

    toast.success("Task Deleted!", {});
  };

  // edit handle opr
  const editHandle = (id) => {
    setShowUpdateBox(true);

    setEditTaskId(id);
  };

  // checkbox handle opr
  const checkedHandle = (event, taskId) => {
    const checked = event.target.checked;

    setCheckBoxID(taskId);

    if (checked) setCheckedTask([...checkedTask, taskId]);
    else setCheckedTask(checkedTask.filter((item) => item !== taskId));

    // console.log(checkedTask, checked, taskId);
  };

  const sortTaskHandle = () => {
    // console.log(todoData);

    const fetch1 = todoData.filter((item) => item.priority === "Critical");
    const fetch2 = todoData.filter((item) => item.priority === "High");
    const fetch3 = todoData.filter((item) => item.priority === "Medium");
    const fetch4 = todoData.filter((item) => item.priority === "Low");

    const newList = [...fetch1, ...fetch2, ...fetch3, ...fetch4];

    setTodoData(newList);

    // console.log(newList);
  };

  const deleteAllTodo = () => {
    setCheckedTask([]);
    setTodoData([]);

    toast.success("New Todo List is created!", {});
  };

  const getPriorityClass = (status) => {
    return status === "Critical"
      ? "critical"
      : status === "High"
      ? "high"
      : status === "Medium"
      ? "medium"
      : status === "Low"
      ? "low"
      : "low";
  };

  return (
    <div className="d-flex justify-content-center mt-3">
      <div>
        <div className="">
          <div className="btnWrap">
            <button onClick={sortTaskHandle} className="updateBtn">
              Sort Task
            </button>

            <button onClick={deleteAllTodo} className="updateBtn">
              New Todo
            </button>
          </div>
        </div>
        <div>
          {showUpdateBox ? <EditTaskForm editTaskId={editTaskId} /> : null}
        </div>

        <table>
          <thead>
            <tr>
              <th className="col1">Sr No.</th>
              <th className="col2 text-center">Mark</th>
              <th className="col3">Task Name</th>
              <th className="col4">Priority</th>
              <th className="col5 text-center ">Operation</th>
            </tr>
          </thead>
          <tbody>
            {todoData?.map((item, index) => (
              <tr key={item.id}>
                <td>
                  <div>
                    <p className="text-center mb-0">{index + 1}</p>
                  </div>
                </td>
                <td>
                  <div className="d-flex justify-content-center">
                    <input
                      type="checkbox"
                      checked={checkedTask.includes(item.id)}
                      onChange={(event) => checkedHandle(event, item.id)}
                    />
                  </div>
                </td>
                <td>
                  <p
                    className={` taskTitle ${
                      item.isComplete ? " taskDone " : " taskPending "
                    }  `}
                  >
                    {item.task}
                  </p>
                </td>
                <td>
                  <p
                    className={` text-center priorityText mb-0 ${getPriorityClass(
                      item.priority
                    )}   taskTitle ${
                      item.isComplete ? " statustaskDone " : " taskPending "
                    }   `}
                  >
                    {item.priority}
                  </p>
                </td>
                <td className="  ">
                  <div className="d-flex justify-content-center">
                    <button
                      disabled={item.isComplete}
                      onClick={() => editHandle(item.id)}
                      className={`iconBtn ${
                        item.isComplete ? " statustaskDone " : " taskPending "
                      } `}
                    >
                      <i className="fa-regular fa-pen-to-square  oprIcon"></i>
                    </button>

                    <button
                      onClick={() => deleteHandle(item.id)}
                      className="iconBtn"
                    >
                      <i className="fa-solid fa-trash mx-3 oprIcon"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Task;
