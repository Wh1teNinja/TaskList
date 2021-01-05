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
        description: "Some text",
        completed: false,
      })
    );
  };
  
  const changeTask = (changedTask) => {
    setTasks(tasks.map(task => {
      return task.key === changedTask.key ? changedTask : task;
    }));
  }

  return (
    <main id='app' className="flex cs-column">
      <ul id="task-list">
        {tasks.map((task) => {
          return (
            <Task
              key={task.key}
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
