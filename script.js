let startTime, elapsedTime = 0, timerInterval;
const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const continueBtn = document.getElementById("continue");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const laps = document.getElementById("laps");
const themeToggle = document.getElementById("themeToggle");

function timeToString(time) {
  let hrs = Math.floor(time / 3600000);
  let mins = Math.floor((time % 3600000) / 60000);
  let secs = Math.floor((time % 60000) / 1000);
  let ms = Math.floor((time % 1000) / 10);
  return (
    (hrs < 10 ? "0" + hrs : hrs) + ":" +
    (mins < 10 ? "0" + mins : mins) + ":" +
    (secs < 10 ? "0" + secs : secs) + "." +
    (ms < 10 ? "0" + ms : ms)
  );
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    display.textContent = timeToString(elapsedTime);
  }, 10);
  startBtn.style.display = "none";
  continueBtn.style.display = "none";
  pauseBtn.disabled = false;
  lapBtn.disabled = false;
}

function pause() {
  clearInterval(timerInterval);
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
  continueBtn.style.display = "inline-block";
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  display.textContent = "00:00:00.00";
  laps.innerHTML = "";
  startBtn.style.display = "inline-block";
  continueBtn.style.display = "none";
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
}

function continueTimer() {
  start();
}

function recordLap() {
  const li = document.createElement("li");
  li.textContent = "Lap: " + timeToString(elapsedTime);
  laps.appendChild(li);
}

startBtn.addEventListener("click", start);
continueBtn.addEventListener("click", continueTimer);
pauseBtn.addEventListener("click", pause);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", recordLap);

// Disable on load
pauseBtn.disabled = true;
lapBtn.disabled = true;

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "🌞" : "🌙";
});
