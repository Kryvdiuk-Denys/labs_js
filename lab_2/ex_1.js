  const numbers = []; 
  let number_of_array_elements=-1;
  const input = document.querySelector(".number");
  const button = document.querySelector(".save");
  const output = document.querySelector(".output");
  let minMaxObj = {};

  button.addEventListener("click", function () {
    const value = parseFloat(input.value);

    if (!isNaN(value)) {
      numbers.push(value); 
      input.value = "";   
      output.textContent = numbers.join(", ");
      number_of_array_elements++;          
    } else {
      alert("Введи число!");
    }
  });

  const calculate = document.querySelector(".calculate");
  const Min_numb = document.querySelector(".Min_numb");
  const Max_numb = document.querySelector(".Max_numb");


calculate.addEventListener("click", function () {
  let n=-1, i=0, m=0;
    const value = parseFloat(calculate.value);
  if (number_of_array_elements>-1){
      while(n+1<number_of_array_elements+1){
        if(numbers[m]<numbers[i] ){
          m=i;
        }
      else{
        i++;
        n++;
      }
  }   
}
  Max_numb.textContent = (numbers[m]);

 n=-1, i=0, m=0;
  if (number_of_array_elements>-1){
      while(n+1<number_of_array_elements+1){
        if(numbers[m]>numbers[i] ){
          m=i;
        }
      else{
        i++;
        n++;
      }
  }   
Min_numb.textContent = (numbers[m]);

  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  Min_numb.textContent = " - " + min;
  Max_numb.textContent = " - " + max;
  minMaxObj = { min: min, max: max };
  
  numbers.length = 0;
  output.textContent = "";
}
  else {
      alert("Не введено жодного числа у Ввід!");
    }
  });

  input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      button.click(); 
    }
  });


const comparison1 = document.querySelector(".comparison1");
const comparison2 = document.querySelector(".comparison2");
calculate.addEventListener("click", function () {
  const minObj = { value: minMaxObj.min };
  const maxObj = { value: minMaxObj.max };

if (minObj.value === maxObj.value) {
  comparison1.textContent = `min і max однакові: ${minObj.value}`;
} else {
  comparison1.textContent = "min і max різні:";
  comparison2.textContent = minMaxObj.max - minMaxObj.min;
}
});