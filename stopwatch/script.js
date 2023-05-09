var timer = document.getElementById("timer");
var startButton = document.getElementById("start-stopwatch");
var stopButton = document.getElementById("stop-stopwatch");
var resetButton = document.getElementById("reset-stopwatch");

var startTime;
var updatedTime;
var difference;
var tInterval;
var savedTime;
var paused = 0;
var running = 0;

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        // You can change 1 to 1000 above to run script every second instead of every millisecond
        paused = 0;
        running = 1;
        startButton.style.display = "none";
        stopButton.style.display = "inline";
    }
}

function stopTimer() {
    if (!difference) {
        // if timer never started, don't allow stop button to do anything
    } else if (!paused) {
        clearInterval(tInterval);
        savedTime = difference;
        paused = 1;
        running = 0;
        stopButton.style.display = "none";
        startButton.style.display = "inline";
    }
}

function resetTimer() {
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    paused = 0;
    running = 0;
    timer.innerHTML = "00:00:00";
    startButton.style.display = "inline";
    stopButton.style.display = "none";
}

function getShowTime() {
    updatedTime = new Date().getTime();
    if (savedTime) {
        difference = (updatedTime - startTime) + savedTime;
    } else {
        difference = updatedTime - startTime;
    }
    // var days = Math.floor(difference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((difference % (1000 * 60)) / 1000);
    var milliseconds = Math.floor((difference % (1000)));
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? "00" + milliseconds : "0" + milliseconds : milliseconds;
    timer.innerHTML = hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);