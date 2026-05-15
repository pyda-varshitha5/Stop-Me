let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

let timer = null;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms =
    milliseconds < 10
      ? "0" + milliseconds
      : milliseconds;

  display.innerText = `${h}:${m}:${s}:${ms}`;
}

function stopwatch() {
  milliseconds++;

  if (milliseconds == 100) {
    milliseconds = 0;
    seconds++;
  }

  if (seconds == 60) {
    seconds = 0;
    minutes++;
  }

  if (minutes == 60) {
    minutes = 0;
    hours++;
  }

  updateDisplay();
}

document.getElementById("start").addEventListener("click", () => {
  if (timer !== null) return;

  timer = setInterval(stopwatch, 10);
});

document.getElementById("pause").addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
});

document.getElementById("reset").addEventListener("click", () => {
  clearInterval(timer);
  timer = null;

  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;

  updateDisplay();

  laps.innerHTML = "";
});

document.getElementById("lap").addEventListener("click", () => {
  if (
    hours === 0 &&
    minutes === 0 &&
    seconds === 0 &&
    milliseconds === 0
  )
    return;

  const li = document.createElement("li");

  li.innerHTML = `
    <span>Lap ${laps.children.length + 1}</span>
    <span>${display.innerText}</span>
  `;

  laps.prepend(li);
});