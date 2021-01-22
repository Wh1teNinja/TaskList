import ThemeContext from "../ThemeContext";

function TaskTime(props) {
  const tick = () => {
    props.timer.time++;
    props.timer.lastUpdate = new Date().getUTCDate();
    props.handleTimerChange(props.timer);
  };

  const handleTimeSwitchClick = () => {
    props.timer.enabled = !props.timer.enabled;
    if (props.timer.enabled) {
      props.timer.timerID = setInterval(() => tick(), 1000);
    } else {
      clearInterval(props.timer.timerID);
    }

    props.handleTimerChange(props.timer);
    props.multitaskingCheck();
  };       

  const formattedTime = () => {
    return (
      ("00" + Math.floor(props.timer.time / 3600)).slice(-2) +
      ":" +
      ("00" + Math.floor((props.timer.time / 60) % 60)).slice(-2) +
      ":" +
      ("00" + Math.floor(props.timer.time % 60)).slice(-2)
    );
  };

  let button = props.timer.enabled ? (
    <i className='fas fa-pause'></i>
  ) : (
    <i className='fas fa-play'></i>
  );

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div className='task-time' style={{backgroundColor: theme.listBackground, color: theme.text}}>
          <span className='timer'>{formattedTime()}</span>
          <button className='timer-button' onClick={handleTimeSwitchClick} style={{color: theme.text, borderColor: theme.text}}>
            {button}
          </button>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

export default TaskTime;
