import React, { useContext, useEffect, useState } from "react";
import { taskContext } from "../context/TaskContext";
import { toast } from "react-toastify";

const EditTaskForm = ({ editTaskId }) => {
  const [editTaskName, setEditTaskName] = useState("");

  const [selectedOption, setSelectedOption] = useState("");
  const options = ["Critical", "High", "Medium", "Low"];

  const { todoData, setTodoData, showUpdateBox, setShowUpdateBox } =
    useContext(taskContext);

  const editInfo = todoData.filter((item) => item.id === editTaskId);

  // console.log("edit task detail", editInfo[0].task);

  useEffect(() => {
    setEditTaskName(editInfo[0].task);
    setSelectedOption(editInfo[0].priority);
  }, []);

  const selectPriorityHandle = (e) => {
    setSelectedOption(e.target.value);
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();

    console.log("edit task page :", editTaskName, selectedOption);

    if (!editTaskName) {
      alert("Enter Valid Task Name");
      return;
    }

    if (!selectedOption) {
      alert("Select Task Priority");
      return;
    }

    const data = todoData.map((item) =>
      item.id === editTaskId
        ? { ...item, task: editTaskName, priority: selectedOption }
        : item
    );

    // console.log(data);

    setTodoData(data);

    setShowUpdateBox(false);

    toast.success("Task Updated!", {});
  };

  return (
    <div>
      <div className="d-flex justify-content-center ">
        <form action="" onSubmit={onSubmitHandle}>
          <input
            type="text"
            className="inputText"
            placeholder="Update Task"
            value={editTaskName}
            onChange={(e) => setEditTaskName(e.target.value)}
          />

          <select
            className="selectPrority"
            id="priorityDropDown"
            value={selectedOption}
            onChange={(e) => selectPriorityHandle(e)}
          >
            <option value="" hidden>
              Select Task Priority
            </option>
            {options?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>

          <button type="submit" className="updateBtn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskForm;
