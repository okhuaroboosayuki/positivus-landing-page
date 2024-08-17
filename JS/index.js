"strict";

// global variables
const menuIcon = document.querySelector("#hamburger_menu");
const navListElement = document.querySelector("#list");
const hiddenEl = document.querySelectorAll(".hidden");

// Hamburger Menu
menuIcon.addEventListener("click", function () {
  this.classList.toggle("open");

  if (menuIcon.classList.contains("open")) {
    navListElement.classList.add("menu_open");
  } else {
    navListElement.classList.remove("menu_open");
  }
});

// scroll animate
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);

    if (entry.isIntersecting) entry.target.classList.add("show");
    else entry.target.classList.remove("show");
  });
});

hiddenEl.forEach((el) => observer.observe(el));
