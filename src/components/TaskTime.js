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
    <div className='task-time'>
      <span className='timer'>{formattedTime()}</span>
      <button className='timer-switch' onClick={handleTimeSwitchClick}>
        {button}
      </button>
    </div>
  );
}

export default TaskTime;
