let startTime;
let elapsedTime = 0;
let timerInterval;

const startStopBtn = document.getElementById('startStopBtn');
const lapResetBtn = document.getElementById('lapResetBtn');
const timeDisplay = document.getElementById('time');
const lapsList = document.getElementById('lapsList');

// Start or stop the stopwatch
function startStop() {
    if (timerInterval) {
        // to Stop the timer
        clearInterval(timerInterval);
        timerInterval = null;
        startStopBtn.textContent = 'Start';
    } else {
        //to Start the timer
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimeDisplay, 10);
        startStopBtn.textContent = 'Stop';
    }
}

//to Update time display every 10ms
function updateTimeDisplay() {
    const elapsedTimeMillis = Date.now() - startTime;
    const formattedTime = formatTime(elapsedTimeMillis);
    timeDisplay.textContent = formattedTime;
}

// Format time as HH:mm:ss.SSS
function formatTime(milliseconds) {
    const date = new Date(milliseconds);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const millis = date.getUTCMilliseconds().toString().padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${millis}`;
}

// Reset the stopwatch
function resetStopwatch() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    timeDisplay.textContent = '00:00:00.000';
    startStopBtn.textContent = 'Start';
    lapsList.innerHTML = '';
}

// Add lap time
function addLap() {
    if (!timerInterval) return; // Only add lap when stopwatch is running
    const elapsedTimeMillis = Date.now() - startTime;
    const formattedTime = formatTime(elapsedTimeMillis);
    const lapItem = document.createElement('li');
    lapItem.textContent = formattedTime;
    lapsList.appendChild(lapItem);
}

// Event listeners
startStopBtn.addEventListener('click', startStop);
lapResetBtn.addEventListener('click', function() {
    if (timerInterval) {
        addLap();
    } else {
        resetStopwatch();
    }
});