const image = document.getElementById("fire");
const toggleBtn = document.getElementById("toggleBtn");

let animation;
let inactivityTimer;


const torches = {
  classic: {
    off: "NoActive.png",
    frames: [
      "fire_yellow_1.png",
      "fire_yellow_2.png"
    ]
  },
  eco: {
    off: "NoActive.png",
    frames: [
      "fire_pink_1.png",
      "fire_pink_2.png"
    ]
  },
  led: {
    off: "NoActive.png",
    frames: [
      "fire_green_1.png",
      "fire_green_2.png"
    ]
  }
};

function getType() {
  if (image.classList.contains("led")) return "led";
  if (image.classList.contains("eco")) return "eco";
  return "classic";
}


function startAnimation() {
  let index = 0;
  const type = getType();

  animation = setInterval(() => {
    const frames = torches[type].frames;
    image.src = frames[index];
    index = (index + 1) % frames.length;
  }, 300);
}


function stopAnimation() {
  clearInterval(animation);
  const type = getType();
  image.src = torches[type].off;
}


function resetInactivityTimer() {
  clearTimeout(inactivityTimer);

  inactivityTimer = setTimeout(() => {
    image.classList.remove("on");
    image.classList.add("off");
    stopAnimation();
  }, 10000); 
}


toggleBtn.addEventListener("click", () => {
  const isActive = image.classList.toggle("on");
  image.classList.toggle("off");

  if (isActive) {
    startAnimation();
    resetInactivityTimer();
  } else {
    stopAnimation();
  }
});


function changeType(type) {
  image.classList.remove("classic", "eco", "led");
  image.classList.add(type);

  if (image.classList.contains("on")) {
    stopAnimation();
    startAnimation();
  } else {
    image.src = torches[type].off;
  }

  resetInactivityTimer();
}

document.getElementById("typeClassic").onclick = () => changeType("classic");
document.getElementById("typeEco").onclick = () => changeType("eco");
document.getElementById("typeLed").onclick = () => changeType("led");


document.getElementById("brightnessBtn").addEventListener("click", () => {
  let value = prompt("Введіть яскравість (1 - 100)");

  value = parseFloat(value);

  if (!isNaN(value) && value >= 0 && value <= 100) {
    image.style.opacity = value/100;
  } else {
    alert("Невірне значення!");
  }

  resetInactivityTimer();
});