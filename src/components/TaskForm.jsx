import React, { useContext, useEffect, useId, useState } from "react";
import { taskContext } from "../context/TaskContext";
import { toast } from "react-toastify";

const TaskForm = () => {
  const [taskName, setTaskName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const options = ["Critical", "High", "Medium", "Low"];

  const { todoData, setTodoData, checkedTask, editTaskId, setEditTaskId } =
    useContext(taskContext);

  useEffect(() => {
    if (editTaskId) {
      const editInfo = todoData.filter((item) => item.id === editTaskId);

      setTaskName(editInfo[0].task);
      setSelectedOption(editInfo[0].priority);
    }
  }, [editTaskId]);

  const selectPriorityHandle = (e) => {
    setSelectedOption(e.target.value);
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();
    // console.log(taskName);

    if (!taskName) {
      toast.error("Enter Valid Task Name", {});

      // alert("Enter Valid Task Name");
      return;
    }

    if (!selectedOption) {
      toast.error("Select Task Priority", {});

      // alert("Select Task Priority");
      return;
    }

    if (editTaskId) {
      console.log(editTaskId, typeof editTaskId);

      const data = todoData.map((item) =>
        item.id === editTaskId
          ? { ...item, task: taskName, priority: selectedOption }
          : item
      );

      // console.log(data);

      setTodoData(data);

      setEditTaskId("");

      toast.success("Task Updated in Todo List!", {});
    } else {
      setTodoData((prev) => {
        return [
          ...prev,
          {
            id: crypto.randomUUID(),
            task: taskName,
            isComplete: false,
            priority: selectedOption,
          },
        ];
      });

      toast.success("Task Added in Todo List!", {});
    }

    setTaskName("");
    setSelectedOption("");
  };

  return (
    <>
      <div>
        <h1 className="text-center mt-3">Get Things Done!</h1>
        <p className="text-center">
          {checkedTask.length} / {todoData.length} Task Completed
        </p>

        <div className="d-flex justify-content-center mt-3">
          <form action="" onSubmit={onSubmitHandle}>
            <input
              type="text"
              placeholder="Build Your Todays Task List"
              className="inputText"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
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
                  {" "}
                  {item}{" "}
                </option>
              ))}
            </select>
            <button type="submit" className="submitBtn">
              {editTaskId ? "Update" : "Add"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default TaskForm;
