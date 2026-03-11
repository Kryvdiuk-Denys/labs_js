function checkRange() {
  const from = document.querySelector(".From");
  const to = document.querySelector(".To");
  const input = document.querySelector("#numberInput");
  const resultt = document.querySelector(".Result");

  const fromValue = parseFloat(from.value);
  const toValue = parseFloat(to.value);
  const inputValue = parseFloat(input.value);

  if (!isNaN(fromValue) && !isNaN(toValue) && !isNaN(inputValue)) {
    if (inputValue > fromValue && inputValue < toValue) {
      resultt.textContent = "Число " + inputValue + " входить у межі";
    } else {
      resultt.textContent = "Число " + inputValue + " НЕ входить у межі";
    }
  } else {
    resultt.textContent = "Будь ласка, введи всі значення правильно";
  }
}


    let flag = true;
    function toggleFlag() {
      flag = !flag; 
      document.getElementById("flagStatus").textContent = flag;
    }
