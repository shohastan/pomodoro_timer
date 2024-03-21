const PINK = "#FF69B4"; // Pink color
const RED = "#FF0000"; // Red color
const GREEN = "#008000"; // Green color
const YELLOW = "#FFFF00"; // Yellow color
const FONT_NAME = "Courier";
const WORK_MIN = 25;
const SHORT_BREAK_MIN = 5;
const LONG_BREAK_MIN = 20;
let reps = 0;
let timer = null;

function getElement(id) {
    return document.getElementById(id);
}

function updateLabel(id, text, color) {
    const element = getElement(id);
    element.textContent = text;
    element.style.color = color;
}

function updateTimerLabel(text, color) {
    updateLabel("timerLabel", text, color);
}

function updateCheckmarkLabel(mark) {
    updateLabel("checkmarkLabel", mark);
}

function resetTimer() {
    clearTimeout(timer);
    reps = 0;
    updateTimerLabel("Timer", GREEN);
    const ctx = getElement("timerCanvas").getContext("2d");
    ctx.clearRect(0, 0, 200, 224); // Clear the canvas
    updateCheckmarkLabel("");
}

function startTimer() {
    reps += 1;
    const workSec = WORK_MIN * 60;
    const shortBreakSec = SHORT_BREAK_MIN * 60;
    const longBreakSec = LONG_BREAK_MIN * 60;

    if (reps % 8 === 0) {
        countdown(longBreakSec);
        updateTimerLabel("Break", RED);
    } else if (reps % 2 === 0) {
        countdown(shortBreakSec);
        updateTimerLabel("Break", PINK);
    } else {
        countdown(workSec);
        updateTimerLabel("WORK", GREEN);
    }
}

function countdown(count) {
    const minutes = Math.floor(count / 60);
    const seconds = count % 60;
    const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    const canvas = document.getElementById("timerCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.fillStyle = "white";
    ctx.font = "bold 35px Courier";
    ctx.textAlign = "center"; // Add this line
    ctx.textBaseline = "middle"; // Add this line
    ctx.fillText(formattedTime, canvas.width / 2, canvas.height / 2); // Update this line


    if (count > 0) {
        timer = setTimeout(() => countdown(count - 1), 1);
    } else {
        startTimer();

        let mark = "";
        const workSession = Math.floor(reps / 2);
        for (let i = 0; i < workSession; i++) {
            mark += "✔";
        }
        updateCheckmarkLabel(mark);

    }
}

// Add event listeners for buttons (startButton and resetButton)

getElement("startButton").addEventListener("click", startTimer);
getElement("resetButton").addEventListener("click", resetTimer);

