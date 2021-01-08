/****************************************************************/
/* This Component provides a task element that handles
/* task description and completion changes where checkbox
/* is responsible for completion and text input for description.
/* Text input is disabled by default, but by double clicking on
/* it(its parent div wrapper to be precise) this input removes
/* disabled attribute and can be changed then goes back 'onBlur'.
/* This element provides delete button for the task as well. 
/****************************************************************/
import React, { useState, useEffect } from "react";
import { ThemeContext } from "./contexts";
import Utils from './Utils';

function Task(props) {
  // This state changes to 'false' when double clicked on task '<p>' and goes back to 'true' with 'onBlur'
  // it used to switch input 'disabled' attribute of task description where 'true' is disabled and 'false' not
  const [descInput, setDescInput] = useState(
    props.task.description === "" ? true : false
  );
  // reference to input of task description
  const inputRef = React.createRef();
  // it used here to focus and select text in it when desc input changes
  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
    // eslint-disable-next-line
  }, [descInput]);

  // Handles checkbox clicks to change completion of the task and lifts state up
  const checkboxOnChange = () => {
    const changedTask = props.task;
    changedTask.completed = !changedTask.completed;
    props.changeTask(changedTask);
  };

  // Handles user changes of input with task description and lifts state up
  const handleTextOnChange = (e) => {
    const changedTask = props.task;
    changedTask.description = e.target.value;
    props.changeTask(changedTask);
  };

  const handleOnDblClick = (e) => {
    setDescInput(true);
  };

  const handleOnBlur = () => {
    setDescInput(false);
  };

  //==========================================================================

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <li
          key={props.task.key}
          onMouseEnter={(e) => Utils.handleHoverEnter(e, "", theme.listBackground)}
          onMouseLeave={(e) => Utils.handleHoverLeave(e, "")}
        >
          <input
            type='checkbox'
            onChange={checkboxOnChange}
            style={{ backgroundColor: theme.listBackground }}
            checked={props.task.completed}
          />
          {/*onDoubleClick doesn't work with disabled input this is why this div is here*/}
          <div onDoubleClick={handleOnDblClick}>
            <input
              ref={inputRef}
              placeholder='Enter a task...'
              className={
                props.task.completed && !descInput
                  ? "task-text-input finished"
                  : "task-text-input"
              }
              type='text'
              onBlur={handleOnBlur}
              onChange={handleTextOnChange}
              value={props.task.description}
              style={{
                color: theme.text,
              }}
              disabled={!descInput}
              autoFocus
            />
          </div>
          <button
            className='delete-task-button'
            onClick={() => props.deleteTask(props.task.key)}
          >
            <i className='fas fa-trash' style={{ color: theme.text }}></i>
          </button>
        </li>
      )}
    </ThemeContext.Consumer>
  );
}

export default Task;
