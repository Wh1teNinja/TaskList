import { useState, useEffect } from "react";
import "./App.css";
import Task from "./Task";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addNewTask = () => {
    setTasks(
      tasks.concat({
        key: new Date().getUTCMilliseconds(),
        description: "",
        completed: false,
      })
    );
  };

  const changeTask = (changedTask) => {
    setTasks(tasks.map(task => {
      return task.key === changedTask.key ? changedTask : task;
    }));
  }

  const deleteTask = (key) => {
    setTasks(tasks.filter(task => {
      return task.key !== key;
    }))
  }

  return (
    <main id='app' className="flex cs-column">
      <ul id="task-list">
        {tasks.map((task) => {
          return (
            <Task
              key={task.key}
              deleteTask={deleteTask}
              changeTask={changeTask}
              task={task}
            />
          );
        })}
      </ul>
      <button id="add-button" onClick={addNewTask}>Add</button>
    </main>
  );
}

export default App;
