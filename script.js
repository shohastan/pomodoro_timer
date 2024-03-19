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
    const ctx = document.getElementById("timerCanvas").getContext("2d");
    ctx.clearRect(0, 0, 200, 224); // Clear the canvas
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
    const image = new Image();
    image.src = "tomato.png";
    image.onload = () => {
        ctx.drawImage(image, 0, 0, 200, 224); // Draw the tomato image

        // Calculate the position to center the timer text
        const textX = 100; // X-coordinate (center horizontally)
        const textY = 112; // Y-coordinate (center vertically)

        ctx.fillStyle = "white";
        ctx.font = "bold 35px Courier";
        ctx.textAlign = "center"; // Center the text horizontally
        ctx.textBaseline = "middle"; // Center the text vertically
        ctx.fillText(formattedTime, textX, textY); // Draw the updated time

        // Draw green checkmarks
        ctx.fillStyle = GREEN;
        const workSession = Math.floor(reps / 2);
        for (let i = 0; i < workSession; i++) {
            ctx.fillText("✔", textX + i * 20, textY + 40); // Adjust position as needed
        }
    };

    if (count > 0) {
        timer = setTimeout(() => countdown(count - 1), 1000);
    } else {
        startTimer();
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
