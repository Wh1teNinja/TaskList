import ThemeContext from "../ThemeContext";

function Tooltip(props) {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <span className='more-info'>
          <i className='fas fa-question-circle'></i>
          <p
            className='details'
            style={{ backgroundColor: theme.text, color: theme.listBackground }}
          >
            {props.details}
          </p>
        </span>
      )}
    </ThemeContext.Consumer>
  );
}

export default Tooltip;
