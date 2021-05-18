import React from 'react';
import { useContext, useEffect, useState, useMemo } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ThemeContext from "../ThemeContext";
import ModulesContext from "../ModulesContext";
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
  // Drag and drop function
  const handleDragEnd = (result) => {
    if (result.destination) {
      const changedList = tasks.slice();
      const [item] = changedList.splice(result.source.index, 1);
      changedList.splice(result.destination.index, 0, item);
      setTasks(changedList);
    }
  };
  //-----------------------------------------------------------------
  // Task time function
  //Multitasking check
  const taskTimeParams = useContext(ModulesContext).params.taskTime;
  const multitaskingCheck = (changedTaskIndex) => {
    if (!taskTimeParams.enabled) return;
    if (taskTimeParams.multitasking.enabled) return;

    stopAllTimers(changedTaskIndex);
  };

  const stopAllTimers = (exceptionTaskIndex = -1) => {
    setTasks(
      tasks.map((task, index) => {
        if (index !== exceptionTaskIndex && task.timer.enabled) {
          task.timer.enabled = false;
          clearInterval(task.timer.timerID);
        }
        return task;
      })
    );
  };

  // eslint-disable-next-line
  useMemo(taskTimeParams.multitasking.enabled ? () => {} : stopAllTimers, [
    taskTimeParams.multitasking.enabled,
  ]);
  //=================================================================

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div
          id='task-list-area'
          className='flex ac-column'
          style={{ backgroundColor: theme.listBackground }}
        >
          <header style={{ color: theme.text }}>
            <h1>Task List</h1>
          </header>
          <span className='line' style={{ backgroundColor: theme.text }}></span>
          <main>
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
                          multitaskingCheck={
                            taskTimeParams.enabled && multitaskingCheck
                          }
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
              onMouseLeave={(e) =>
                Utils.handleHoverLeave(e, `color: ${theme.text};`)
              }
            >
              + Add
            </button>
          </main>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

export default TaskList;
