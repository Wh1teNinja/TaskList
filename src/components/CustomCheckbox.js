import React from 'react';
import ThemeContext from "../ThemeContext";

// make this thing of adjustable size by css
function CustomCheckbox(props) {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <label>
          <input
            id={props.id}
            type='checkbox'
            onChange={props.onChange}
            checked={props.checked}
            style={{ display: "none" }}
          />
          <span
            className='custom-checkbox'
            style={{ color: theme.listBackground, border: "1px solid " + theme.text, backgroundColor: props.checked ? theme.text : props.listBackground}}
          >{props.checked ? <i className="fas fa-check"></i> : ""}</span>
        </label>
      )}
    </ThemeContext.Consumer>
  );
}

export default CustomCheckbox;
