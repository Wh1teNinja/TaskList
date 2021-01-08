import { useEffect, useState } from "react";
import { ThemeContext } from "./contexts";
import Task from "./Task";
import Utils from "./Utils";

function TaskList(props) {
  //==========================< Hooks >=============================
  // Hooks to get, set and save tasks
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  //================================================================

  //=========================< Functions >==========================
  // Function to work with tasks
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
    setTasks(
      tasks.map((task) => {
        return task.key === changedTask.key ? changedTask : task;
      })
    );
  };

  const deleteTask = (key) => {
    setTasks(
      tasks.filter((task) => {
        return task.key !== key;
      })
    );
  };

  //=================================================================

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <main
          className='flex ac-column'
          style={{ backgroundColor: theme.listBackground }}
        >
          <ul id='task-list'>
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
          <button
            id='add-button'
            onClick={addNewTask}
            style={{color: theme.text}}
            onMouseEnter={(e) =>
              Utils.handleHoverEnter(e, `color: ${theme.text};`, theme.listBackground)
            }
            onMouseLeave={(e) => Utils.handleHoverLeave(e, `color: ${theme.text};`)}
          >
            + Add
          </button>
        </main>
      )}
    </ThemeContext.Consumer>
  );
}

export default TaskList;
