let stop = document.querySelector(".stopSignal");
let warning = document.querySelector(".warningSignal");
let movement = document.querySelector(".movementSignal");
let statusText = document.getElementById("status");

let state = 0;

let timer;
let blinkTimer;

function resetLights() {
  stop.className = "stopSignal off";
  warning.className = "warningSignal off";
  movement.className = "movementSignal off";
}

let timeRed = 5;
let timeGreen = 7;
let timeYellow = 3;

function nextState() {
  state = (state + 1) % 4;
}

function change() {
  let tRed = prompt("Введи новий час для червоного (зараз " + timeRed + " секунд)");
  let tYellow = prompt("Введи новий час для жовтого (зараз " + timeYellow + " секунд)");
  let tGreen = prompt("Введи новий час для зеленого (зараз " + timeGreen + " секунд)");

  if (tRed !== null) timeRed = Number(tRed);
  if (tYellow !== null) timeYellow = Number(tYellow);
  if (tGreen !== null) timeGreen = Number(tGreen);

  alert(
    "Нові значення:\n" +
    "Червоний: " + timeRed + " сек\n" +
    "Жовтий: " + timeYellow + " сек\n" +
    "Зелений: " + timeGreen + " сек"
  );
}

function TrafficLightCycle() {
  clearTimeout(timer);
  clearInterval(blinkTimer);

  resetLights();

  if (state === 0) {
    stop.classList.add("redOn");
    statusText.textContent = "Стан: - червоний";

    timer = setTimeout(() => {
      nextState(); 
      TrafficLightCycle();
    }, timeRed * 1000);

  } else if (state === 1) {
    warning.classList.add("yellowOn");
    statusText.textContent = "Стан: - жовтий";

    timer = setTimeout(() => {
      nextState(); // ✅ тут
      TrafficLightCycle();
    }, timeYellow * 1000);

  } else if (state === 2) {
    movement.classList.add("greenOn");
    statusText.textContent = "Стан: - зелений";

    timer = setTimeout(() => {
      nextState(); // ✅ тут
      TrafficLightCycle();
    }, timeGreen * 1000);

  } else if (state === 3) {
    let count = 0;
    statusText.textContent = "Стан: - жовтий ( миготіння )";

    blinkTimer = setInterval(() => {
      warning.classList.toggle("yellowOn");
      count++;

      if (count === 6) {
        clearInterval(blinkTimer);
        nextState(); // ✅ і тут
        TrafficLightCycle();
      }
    }, 400);
  }
}

// скіп
function skipState() {
  clearTimeout(timer);
  clearInterval(blinkTimer);

  nextState();
  TrafficLightCycle();
}

TrafficLightCycle();