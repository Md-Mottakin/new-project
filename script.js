let intervalId;
let startTime;
let elapsedTime = 0;
let isRunning = false;

const timeDisplay = document.querySelector('.time-display');
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');

function formatTime(ms) {
    const date = new Date(ms);
    return date.toISOString().substr(11, 8);
}

function updateDisplay() {
    timeDisplay.textContent = formatTime(elapsedTime);
}

function startStopwatch() {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 1000);
    rightButton.textContent = 'Stop';
    leftButton.textContent = 'Lap';
}

function stopStopwatch() {
    isRunning = false;
    clearInterval(intervalId);
    rightButton.textContent = 'Reset';
    leftButton.textContent = 'Resume';
}

function resetStopwatch() {
    elapsedTime = 0;
    updateDisplay();
    rightButton.textContent = 'Start';
    leftButton.textContent = 'Lap';
}

function toggleStopwatch() {
    if (isRunning) {
        stopStopwatch();
    } else {
        startStopwatch();
    }
}

function lapTime() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapEntry = document.createElement('div');
        lapEntry.textContent = lapTime;
        timeDisplay.appendChild(lapEntry);
    }
}

leftButton.addEventListener('click', () => {
    if (isRunning) {
        lapTime();
    } else {
        resetStopwatch();
    }
});

rightButton.addEventListener('click', toggleStopwatch);
