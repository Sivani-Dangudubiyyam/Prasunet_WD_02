let startTime;
let currentTime = 0;
let lapCounter = 0;
let timerInterval;
let laps = [];

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapTimesList = document.getElementById('lapTimes');

function formatTime(ms) {
  let hours = Math.floor(ms / 3600000);
  let minutes = Math.floor((ms % 3600000) / 60000);
  let seconds = Math.floor((ms % 60000) / 1000);
  let milliseconds = ms % 1000;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function updateDisplay() {
  display.textContent = formatTime(currentTime);
}

function startTimer() {
  startTime = Date.now() - currentTime;
  timerInterval = setInterval(function() {
    currentTime = Date.now() - startTime;
    updateDisplay();
  }, 10);
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  currentTime = 0;
  laps = [];
  lapCounter = 0;
  updateDisplay();
  lapTimesList.innerHTML = '';
}

function lapTimer() {
  lapCounter++;
  laps.push(currentTime);
  let lapTime = document.createElement('li');
  lapTime.textContent = `Lap ${lapCounter}: ${formatTime(currentTime)}`;
  lapTimesList.appendChild(lapTime);
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);
