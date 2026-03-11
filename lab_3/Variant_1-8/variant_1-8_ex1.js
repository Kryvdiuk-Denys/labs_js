//---------------------------------------------------------------------------ЗАВДАННЯ_1-------------------------------------------------------------------------------
const sum = document.querySelector(".sum");
let i = 1, n = 0;


function calculateSum(){
    console.log("%cЗавдання 1", "color: white; font-size: 18px");
    const sumValue = parseFloat(sum.value);
while(i<sumValue+1){
    n=n+i;
    i++;
}
console.log (`%c${n}`,"color: whitesmoke; font-size: 14px");

}


//---------------------------------------------------------------------------ЗАВДАННЯ_2-------------------------------------------------------------------------------


const factorial = document.querySelector(".factorial");

function calculateFactorial(){
    let n = 1;
    console.log("%cЗавдання 2", "color: white; font-size: 18px");
    const factorialValue = parseFloat(factorial.value);
for(let i = factorialValue; i > 0; i--){
n=n*i;
}
console.log (`%c${n}`,"color: whitesmoke; font-size: 14px");

}


//---------------------------------------------------------------------------ЗАВДАННЯ_3-------------------------------------------------------------------------------



const month = document.querySelector(".month");


function calculateMonth(){
    console.log("%cЗавдання 3", "color: white; font-size: 18px");
    const monthValue = parseFloat(month.value);

switch (monthValue) {
  case 1:
    console.log ("%cСічень","color: whitesmoke; font-size: 14px");
    break;
    case 2:
    console.log ("%cЛютий","color: whitesmoke; font-size: 14px");
    break;
     case 3:
    console.log ("%cБерезень","color: whitesmoke; font-size: 14px");
    break;
     case 4:
    console.log ("%cКвітень","color: whitesmoke; font-size: 14px");
    break;
     case 5:
    console.log ("%cТравень","color: whitesmoke; font-size: 14px");
    break;
     case 6:
    console.log ("%cЧервень","color: whitesmoke; font-size: 14px");
    break;
     case 7:
    console.log ("%cЛипень","color: whitesmoke; font-size: 14px");
    break;
     case 8:
    console.log ("%cСерпень","color: whitesmoke; font-size: 14px");
    break;
     case 9:
    console.log ("%cВересень","color: whitesmoke; font-size: 14px");
    break;
     case 10:
    console.log ("%cЖовтень","color: whitesmoke; font-size: 14px");
    break;
     case 11:
    console.log ("%cЛистопад","color: whitesmoke; font-size: 14px");
    break;
     case 12:
    console.log ("%cГрудень","color: whitesmoke; font-size: 14px");
    break;
    default:
    console.log("%cНевірне значення","color: whitesmoke; font-size: 14px");
}
}


//---------------------------------------------------------------------------ЗАВДАННЯ_4-------------------------------------------------------------------------------


const numbers = [];
const masive = document.querySelector(".masive");
const output = document.querySelector(".output");
const sumResult = document.querySelector(".sumResult");

function AddElementToMasive() {
  const masiveValue = parseInt(masive.value);

  if (!isNaN(masiveValue)) {
    numbers.push(masiveValue);
    output.textContent = numbers.join(", ");
    masive.value = "";
    masive.focus();
  } else {
    alert("Будь ласка, введіть коректне число!");
  }
}

function calculateSumMasive() {
    console.log("%cЗавдання 4", "color: white; font-size: 18px");
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
      sum += numbers[i];
    }
  } 
console.log(`%cСума парних чисел: ${sum}`, "color: whitesmoke; font-size: 14px");
}


//---------------------------------------------------------------------------ЗАВДАННЯ_5-------------------------------------------------------------------------------


const text = document.querySelector(".text");

  const countVowels = str => {
    const vowels = "аеєиіїоуюя";
    return [...str.toLowerCase()].filter(char => vowels.includes(char)).length;
  };

  function calculatelater() {
      console.log("%cЗавдання 5", "color: white; font-size: 18px");

    const inputValue = text.value;
    const vowelsCount = countVowels(inputValue);
    console.log(`%cКількість голосних: ${vowelsCount}`, "color: whitesmoke; font-size: 14px");
  }



//---------------------------------------------------------------------------ЗАВДАННЯ_6-------------------------------------------------------------------------------


const number1 = document.querySelector(".number_1");
const number2 = document.querySelector(".number_2");
const result = document.querySelector(".result");

function power(base, exponent) {
  return base ** exponent;
}

function calculatePower() {
  const base = parseFloat(number1.value);
  const exponent = parseFloat(number2.value);

  console.log("%cЗавдання 6", "color: white; font-size: 18px");
  if (isNaN(base) || isNaN(exponent)) {
    console.log ("%cБудь ласка, введіть обидва числа.","color: whitesmoke; font-size: 14px");  
    return;
  }
  const res = power(base, exponent);
      console.log(`%cРезультат: ${res}`, "color: whitesmoke; font-size: 14px");

}