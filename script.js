// Constants
const PINK = "#e2979c";
const RED = "#e7305b";
const GREEN = "#9bdeac";
const YELLOW = "#f7f5dd";
const FONT_NAME = "Courier";
const WORK_MIN = 25;
const SHORT_BREAK_MIN = 5;
const LONG_BREAK_MIN = 20;
let reps = 0;
let timer = null;

// Timer reset
function resetTimer() {
    clearTimeout(timer);
    reps = 0;
    document.getElementById("timer-label").innerText = "Timer";
    document.getElementById("timer-label").style.color = GREEN;
    document.getElementById("timer-text").innerText = "00:00";
    document.getElementById("checkmark-label").innerText = "";
}

// Timer mechanism
function startTimer() {
    reps++;
    const workSec = WORK_MIN * 60;
    const shortBreakSec = SHORT_BREAK_MIN * 60;
    const longBreakSec = LONG_BREAK_MIN * 60;
    if (reps % 8 === 0) {
        countdown(longBreakSec);
        document.getElementById("timer-label").innerText = "Break";
        document.getElementById("timer-label").style.color = RED;
    } else if (reps % 2 === 0) {
        countdown(shortBreakSec);
        document.getElementById("timer-label").innerText = "Break";
        document.getElementById("timer-label").style.color = PINK;
    } else {
        countdown(workSec);
        document.getElementById("timer-label").innerText = "WORK";
        document.getElementById("timer-label").style.color = GREEN;
    }
}

// Countdown mechanism
function countdown(count) {
    const minutes = Math.floor(count / 60);
    let seconds = count % 60;
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    document.getElementById("timer-text").innerText = `${minutes}:${seconds}`;
    if (count > 0) {
        timer = setTimeout(() => countdown(count - 1), 1000);
    } else {
        startTimer();
        let mark = "";
        const workSession = Math.floor(reps / 2);
        for (let i = 0; i < workSession; i++) {
            mark += "✔";
        }
        document.getElementById("checkmark-label").innerText = mark;
    }
}

// UI setup
const timerLabel = document.createElement("label");
timerLabel.id = "timer-label";
timerLabel.innerText = "Timer";
timerLabel.style.color = GREEN;
document.getElementById("root").appendChild(timerLabel);

const checkmarkLabel = document.createElement("label");
checkmarkLabel.id = "checkmark-label";
checkmarkLabel.style.color = GREEN;
checkmarkLabel.style.backgroundColor = YELLOW;
checkmarkLabel.style.fontFamily = FONT_NAME;
checkmarkLabel.style.fontSize = "20px";
document.getElementById("root").appendChild(checkmarkLabel);

const photo = new Image();
photo.src = "images/tomato.png";
photo.width = 200;
photo.height = 224;
document.getElementById("root").appendChild(photo);

const canvas = document.createElement("canvas");
canvas.width = 200;
canvas.height = 224;
canvas.style.backgroundColor = YELLOW;
canvas.style.border = "none";
document.getElementById("root").appendChild(canvas);

const context = canvas.getContext("2d");
context.font = "35px " + FONT_NAME;
context.fillStyle = "white";
context.textAlign = "center";
context.textBaseline = "middle";
context.fillText("00:00", 100, 130);

const buttonStart = document.createElement("button");
buttonStart.innerText = "Start";
buttonStart.addEventListener("click", startTimer);
document.getElementById("root").appendChild(buttonStart);

const buttonReset = document.createElement("button");
buttonReset.innerText = "Reset";
buttonReset.addEventListener("click", resetTimer);
document.getElementById("root").appendChild(buttonReset);



