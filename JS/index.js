"strict";

// global variables
const menuIcon = document.querySelector("#hamburger_menu");

// Hamburger Menu
menuIcon.addEventListener("click", function () {
  this.classList.toggle("open");
});
