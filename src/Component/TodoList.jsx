import React, { useState, useEffect } from "react";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Low");
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (storedTasks.length > 0) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("filterType", filterType);
  }, [filterType]);

  const addTask = () => {
    if (newTask.trim() === "") return;

    const task = {
      id: new Date().getTime(),
      text: newTask,
      priority,
      completed: false,
      createdAt: new Date().toLocaleString(),
    };

    setTasks((prevTasks) => [...prevTasks, task]);
    setNewTask("");
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const togglePriority = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, priority: task.priority === "Low" ? "High" : "Low" }
          : task
      )
    );
  };

  const handleFilter = (type) => {
    setFilterType(type);
  };

  const filteredTasks = () => {
    if (filterType === "All") return tasks;
    if (filterType === "Completed")
      return tasks.filter((task) => task.completed);
    if (filterType === "Pending")
      return tasks.filter((task) => !task.completed);
    if (filterType === "Priority")
      return tasks.slice().sort((a, b) => (a.priority === "High" ? -1 : 1));

    return tasks;
  };

  return (
    <div className="container">
      <div className="row my-5 d-flex justify-content-center">
        <div className="col-6 shadow bg-light py-4 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6619/6619606.png"
            style={{ width: "175px" }}
            alt=""
            className="mx-auto"
          />
          <div className="d-flex mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <select
              className="form-select ms-3 w-25"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>Low</option>
              <option>High</option>
            </select>
            <button className="btn btn-primary ms-3" onClick={addTask}>
              ADD
            </button>
          </div>
          <div className="my-3 d-flex justify-content-end">
            <button
              className={`btn btn-info rounded-0 ${
                filterType === "Priority" ? "active" : ""
              }`}
              onClick={() => handleFilter("Priority")}
            >
              Priority
            </button>
            <button
              className={`btn btn-info rounded-0 ${
                filterType === "All" ? "active" : ""
              }`}
              onClick={() => handleFilter("All")}
            >
              All
            </button>
            <button
              className={`btn btn-info rounded-0 ${
                filterType === "Completed" ? "active" : ""
              }`}
              onClick={() => handleFilter("Completed")}
            >
              Completed
            </button>
            <button
              className={`btn btn-info rounded-0 ${
                filterType === "Pending" ? "active" : ""
              }`}
              onClick={() => handleFilter("Pending")}
            >
              Pending
            </button>
          </div>
          <div>
            <h3>TASK LIST</h3>
          </div>
          {filteredTasks().map((task) => (
            <div
              className="border bg-white shadow my-3 py-4 px-3"
              key={task.id}
            >
              <div className="my-3">
                <div className="d-flex justify-content-between my-2">
                  <div>
                    {" "}
                    <span className="text-primary fw-bold">
                      {task.createdAt}
                    </span>
                  </div>
                  <div>
                    <select
                      className="form-select"
                      value={task.priority}
                      onChange={() => togglePriority(task.id)}
                    >
                      <option>Low</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      value={task.text}
                      readOnly
                      style={{ width: "400px" }}
                    />
                  </div>
                  <div>
                    <button
                      className={`btn ${
                        task.completed ? "btn-success" : "btn-primary"
                      } ms-3`}
                      onClick={() => toggleComplete(task.id)}
                    >
                      {task.completed ? "Complete" : "Pending"}
                    </button>
                    <button
                      className="btn btn-danger ms-3"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
