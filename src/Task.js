import { useState } from 'react';

function Task(props) {
  const [descInput, setDescInput] = useState(false);

  const checkboxOnChange = () => {
    const changedTask = props.task;
    changedTask.completed = !changedTask.completed;
    props.changeTask(changedTask);
  }

  const handleTextOnChange = (e) => {
    const changedTask = props.task;
    changedTask.description = e.target.value;
    props.changeTask(changedTask);
  }

  const handleOnDblClick = () => {
    setDescInput(false);
  }

  const handleOnBlur = (e) => {
    setDescInput(true);
  }

  if (descInput) {
    return (
      <li key={props.task.key}>
        <input type="checkbox" id="task" onChange={checkboxOnChange} checked={props.task.completed}/>
        <p className={props.task.completed && "finished"} onDoubleClick={handleOnDblClick}>{props.task.description}</p>
      </li>);
  }
  return (
    <li key={props.task.key}>
      <input type="checkbox" onChange={checkboxOnChange} checked={props.task.completed}/>
      <input type="text" onBlur={handleOnBlur} onChange={handleTextOnChange} value={props.task.description} autoFocus/>
    </li>);
}

export default Task;