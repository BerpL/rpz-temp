import React, { useEffect, useState } from 'react';
import { number, func } from 'prop-types';

function Timer({ minutes, seconds = 0, onFinishTimer }) {
  const [time, setTime] = useState({ seconds, minutes });
  useEffect(
    () => {
      const myInterval = setInterval(() => {
        if (time.seconds > 0) {
          setTime(prevTime => ({
            ...prevTime,
            seconds: prevTime.seconds - 1,
          }));
        }
        if (time.seconds === 0) {
          if (time.minutes === 0) {
            onFinishTimer();
            clearInterval(myInterval);
          } else {
            setTime(prevTime => ({
              minutes: prevTime.minutes - 1,
              seconds: 59,
            }));
          }
        }
      }, 1000);

      return () => {
        clearInterval(myInterval);
      };
    },
    [time],
  );

  return (
    <div style={{ position: 'absolute', padding: 20, top: 0, right: 0 }} ß>
      <h1>
        Time Restante: {time.minutes}:
        {time.seconds < 10 ? `0${time.seconds}` : time.seconds}
      </h1>
    </div>
  );
}

Timer.propTypes = {
  seconds: number,
  minutes: number,
  onFinishTimer: func,
};

export default Timer;
