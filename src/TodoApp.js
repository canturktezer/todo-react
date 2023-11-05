import React, { useState, useEffect } from "react";
import { BiCheck, BiX, BiMoon, BiSun } from "react-icons/bi";
import "./App.css";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputValue) {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };

      setTasks([...tasks, newTask]);
      setInputValue("");

      saveTasks();
    }
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    setTasks(updatedTasks);
    saveTasks();
  };

  const removeTask = (id) => {
    setSelectedTaskId(id);
    setShowModal(true);
  };

  const confirmRemoveTask = () => {
    const updatedTasks = tasks.filter((task) => task.id !== selectedTaskId);
    setTasks(updatedTasks);
    saveTasks();
    setShowModal(false);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const storedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (storedDarkMode !== null) {
      setDarkMode(storedDarkMode);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("Dark-Body");
    } else {
      document.body.classList.remove("Dark-Body");
    }

    return () => {
      document.body.classList.remove("Dark-Body");
    };
  }, [darkMode]);

  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  return (
    <div className={`Container ${darkMode ? "Dark-Mode" : ""}`}>
      <div className="Darkmode-btn">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <BiSun style={{ color: "#ffffff" }}/> : <BiMoon style={{ color: "#ffffff" }}/>}
        </button>
      </div>

      <h1 className={`${darkMode ? "Dark-Mode" : ""}`}>To Do List</h1>

      <form onSubmit={handleSubmit}>
        <input
          className={`Todo-input ${darkMode ? "Dark-Mode" : ""}`}
          type="text"
          placeholder="Add a new task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="Add-btn" type="submit">
          Add
        </button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={` ${darkMode ? "Dark-Mode" : ""}`}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
            <button onClick={() => removeTask(task.id)}>
              <i>
                <BiX style={{ color: "#ffffff" }} />
              </i>
            </button>
            <button
              onClick={() => toggleTaskCompletion(task.id)}
              className={task.completed ? "Active Mark" : "Mark"}
            >
              <i>
                <BiCheck style={{ color: "#ffffff" }} />
              </i>
            </button>
          </li>
        ))}
      </ul>
      {showModal && (
        <div className="Modal Show">
          <p>Are you sure you want to remove this task?</p>
          <div className="Button-wrapper">
            <button onClick={confirmRemoveTask} id="confirmBtn">
              Yes
            </button>
            <button onClick={() => setShowModal(false)} id="cancelBtn">
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoApp;
