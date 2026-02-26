const elem = document.querySelectorAll("ul");
const btn = document.querySelector(".btn");
elem[0].onmousedown = function() {
  btn.textContent = "Денис";
};