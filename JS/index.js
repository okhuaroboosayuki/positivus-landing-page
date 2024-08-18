"strict";

// global variables
const menuIcon = document.querySelector("#hamburger_menu");
const navListElement = document.querySelector("#list");
const clientRow = document.querySelector(".client_row");

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

// scroll handling
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("show");
    else entry.target.classList.remove("show");
  });
});

hiddenEl.forEach((el) => observer.observe(el));

window.addEventListener("scroll", function () {
  const scrollPosition = this.scrollY;

  const speed = 0.3;

  const translateValue = scrollPosition * speed;

  clientRow.style.transform = `translateX(-${translateValue}px)`;
});
