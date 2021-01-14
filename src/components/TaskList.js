import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ThemeContext from "../ThemeContext";
import Task from "./Task";
import Utils from "../utils";

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
        key: new Date().getTime(),
        description: "",
        completed: false,
        timer: {
          timerID: "",
          enabled: false,
          time: 0,
          lastUpdate: new Date(),
        },
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

  //-----------------------------------------------------------------
  //Drag and drop function
  const handleDragEnd = (result) => {
    if (result.destination) {
      const changedList = tasks.slice();
      const [item] = changedList.splice(result.source.index, 1);
      changedList.splice(result.destination.index, 0, item);
      setTasks(changedList);
    }
  };
  //=================================================================

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <main
          className='flex ac-column'
          style={{ backgroundColor: theme.listBackground }}
        >
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId='task-list'>
              {(provided) => (
                <ul
                  id='task-list'
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {tasks.map((task, index) => {
                    return (
                      <Task
                        key={task.key}
                        deleteTask={deleteTask}
                        changeTask={changeTask}
                        task={task}
                        index={index}
                      />
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
          <button
            id='add-button'
            onClick={addNewTask}
            style={{ color: theme.text }}
            onMouseEnter={(e) =>
              Utils.handleHoverEnter(
                e,
                `color: ${theme.text};`,
                theme.listBackground
              )
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
