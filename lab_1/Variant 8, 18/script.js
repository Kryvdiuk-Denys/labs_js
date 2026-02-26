const elem = document.getElementsByClassName("text");
elem[0].onclick = function() {
  show("Денис");
};

function show(name) {
  console.log(name);
}