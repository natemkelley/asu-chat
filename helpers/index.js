export const pad = (num) => {
  return ("0" + num).slice(-2);
};

export const mmss = (secs) => {
  let minutes = Math.floor(secs / 60);
  secs = secs % 60;
  minutes = minutes % 60;
  return `${pad(minutes)}:${pad(secs)}`;
};

export const timerTime = (minutes, seconds) => {
  if (minutes <= 0 && seconds <= 0) {
    return `00:00`;
  }

  const totalSeconds = minutes * 60 + seconds;
  return mmss(totalSeconds);
};
