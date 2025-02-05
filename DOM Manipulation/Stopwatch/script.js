const timer = document.querySelector("#timer");
const startButton = document.querySelector("#start-button");
const stopButton = document.querySelector("#stop-button");
const resetButton = document.querySelector("#reset-button");

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

let TimerId;
const TIME_INTERVAL = 1000 / 60;
let stopWatchTime = 0;
let lastStartTime = 0;
let elapsedTime = 0;
let lastStoppedTime = 0;

function startTimer() {
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = false;

  lastStartTime = Date.now();
  TimerId = setInterval(UpdateTimer, TIME_INTERVAL);
}

function stopTimer() {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;

  lastStartTime = elapsedTime;
  clearInterval(TimerId);
}

function resetTimer() {
  startButton.disabled = false;
  stopButton.disabled = false;
  resetButton.disabled = true;

  elapsedTime = 0;
  lastStoppedTime = 0;
  stopWatchTime = "00:00:000";
  timer.innerText = stopWatchTime;
}

function msToTime(duration) {
  let miliseconds = parseInt(duration % 1000);
  let seconds = parseInt((duration % 1000) % 1000) % 60;
  let minutes = parseInt((((duration % 1000) % 1000) % 60) % 60);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  miliseconds = miliseconds < 100 ? "0" + miliseconds : miliseconds;

  return `${minutes}:${seconds}:${miliseconds}`;
}

function UpdateTimer() {
  elapsedTime = Date.now() - lastStartTime + lastStoppedTime;
  stopWatchTime = msToTime(elapsedTime);
  timer.innerText = stopWatchTime;
}
