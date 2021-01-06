import React, { useState, useEffect } from "react";

function Task(props) {
  // This state changes to 'false' when double clicked on task '<p>' and goes back to 'true' with 'onBlur'
  const [descInput, setDescInput] = useState(
    props.task.description === "" ? true : false
  );

  const inputRef = React.createRef();

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, [descInput]);

  const checkboxOnChange = () => {
    // Handles checkbox clicks and lifting state up
    const changedTask = props.task;
    changedTask.completed = !changedTask.completed;
    props.changeTask(changedTask);
  };

  const handleTextOnChange = (e) => {
    // Handles user changes of input with task description and lifting state up
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

  return (
    <li key={props.task.key}>
      <input
        type='checkbox'
        onChange={checkboxOnChange}
        checked={props.task.completed}
      />
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
          disabled={!descInput}
          autoFocus
        />
      </div>
      <button
        className='delete-task-button'
        onClick={() => props.deleteTask(props.task.key)}
      >
        <i className='fas fa-trash'></i>
      </button>
    </li>
  );
}

export default Task;
