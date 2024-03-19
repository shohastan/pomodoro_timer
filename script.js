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

function resetTimer() {
    clearTimeout(timer);
    reps = 0;
    document.getElementById("timerLabel").textContent = "Timer";
    document.getElementById("timerLabel").style.color = GREEN;
    document.getElementById("timerCanvas").getContext("2d").clearRect(0, 0, 200, 224);
    document.getElementById("checkmarkLabel").textContent = "";
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

    const ctx = document.getElementById("timerCanvas").getContext("2d");
    ctx.clearRect(0, 0, 200, 224); // Clear the canvas
    ctx.fillText(formattedTime, 100, 112); // Draw the updated time

    if (count > 0) {
        timer = setTimeout(() => countdown(count - 1), 1);
    } else {
        startTimer();
        let mark = "";
        const workSession = Math.floor(reps / 2);
        for (let i = 0; i < workSession; i++) {
            mark += "✔";
        }
        document.getElementById("checkmarkLabel").textContent = mark;
    }
}

function updateTimerLabel(text, color) {
    document.getElementById("timerLabel").textContent = text;
    document.getElementById("timerLabel").style.color = color;
}

// Add event listeners for buttons (startButton and resetButton)

// Example:
document.getElementById("startButton").addEventListener("click", () => {
    startTimer();
});

document.getElementById("resetButton").addEventListener("click", () => {
    resetTimer();
});
