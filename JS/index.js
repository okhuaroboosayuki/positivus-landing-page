"strict";

// global variables
const menuIcon = document.querySelector("#hamburger_menu");
const navListElement = document.querySelector("#list");

// Hamburger Menu
menuIcon.addEventListener("click", function () {
  this.classList.toggle("open");

  if (menuIcon.classList.contains("open")) {
    navListElement.classList.add("menu_open");
  } else {
    navListElement.classList.remove("menu_open");
  }
});
