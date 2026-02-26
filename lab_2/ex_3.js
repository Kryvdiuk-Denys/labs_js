const task_if = document.getElementById("task_if");
const task_and = document.getElementById("task_and");
const toggleButton = document.getElementById("toggleBtn");
let showingTask = true;

function toggleBtn() {
  if (showingTask) {
    task_if.style.display = "none";
    task_and.style.display = "block";
    toggleButton.textContent = "Перейти до завдання з використанням IF";
  } else {
    task_if.style.display = "block";
    task_and.style.display = "none";
    toggleButton.textContent = "Перейти до завдання з використанням ?";
  }
  showingTask = !showingTask;
};

const rating = document.querySelector(".rating");
const verbalFormat = document.querySelector(".verbalFormat");

function EvaluatePoints() {
const ratingValue = parseFloat(rating.value);

  if(ratingValue<5 && ratingValue>0){
   verbalFormat.textContent = "Незадовільно "
  }
  else if(ratingValue<9 && ratingValue>0){
   verbalFormat.textContent = "Задовільно"
  }
  else if(ratingValue<11 && ratingValue>0){
   verbalFormat.textContent = "Добре"
  }
  else if(ratingValue<13 && ratingValue>0){
   verbalFormat.textContent = "Відмінно"
  }
  else{
  verbalFormat.textContent = "Некоректний запис числа"
  }
}


const month = document.querySelector(".month");
const Season = document.querySelector(".Season");


function DetermineSeason() {
const monthValue = parseFloat(month.value);

if(monthValue<6 && monthValue>0){
    if(monthValue<3){
 Season.textContent = "Зима";
    }
    else{
 Season.textContent = "Весна";
    }
}
else if(monthValue<13 && monthValue>0){
    if(monthValue<9){
Season.textContent = "Літо";
    }
    else if(monthValue<12){
Season.textContent = "Осінь";
    }
    else{
        Season.textContent = "Зима";
    }
}
else{
Season.textContent = "Некоректний запис";
}
  
}




const rating2 = document.querySelector(".rating2");
const verbalFormat2 = document.querySelector(".verbalFormat2");

function EvaluatePoints2() {
  const ratingValue2 = parseFloat(rating2.value);

  verbalFormat2.textContent =
    ratingValue2 > 0 && ratingValue2 < 5 ? "Незадовільно" :
    ratingValue2 < 9 ? "Задовільно" :
    ratingValue2 < 11 ? "Добре" :
    ratingValue2 < 13 ? "Відмінно" :
    "Некоректний запис числа";
}

const month2 = document.querySelector(".month2");
const Season2 = document.querySelector(".Season2");

function DetermineSeason2() {
const monthValue2 = parseFloat(month2.value);

  Season2.textContent =
    monthValue2 > 0 && monthValue2 < 3 || monthValue2==12  ? "Зима" :
    monthValue2 < 6 ? "Весна" :
    monthValue2 < 9 ? "Літо" :
    monthValue2 < 12 ? "Осінь" :
    "Некоректний запис числа";
  
}