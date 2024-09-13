"strict";

// #MOBILE MENU
const menuIcon = document.querySelector("#hamburger_menu");
const navListElement = document.querySelector("#list");

menuIcon.addEventListener("click", function () {
  this.classList.toggle("open");

  if (menuIcon.classList.contains("open")) {
    navListElement.classList.add("menu_open");
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  } else {
    navListElement.classList.remove("menu_open");
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }
});

// #SCROLL REVEAL HANDLING
const clientRow = document.querySelector(".client_row");
const hiddenEl = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("show");
    else entry.target.classList.remove("show");
  });
});

hiddenEl.forEach((el) => observer.observe(el));

// client scroll
window.addEventListener("scroll", function () {
  const scrollPosition = this.scrollY;

  const speed = 0.15;

  const translateValue = scrollPosition * speed;

  if (this.innerWidth <= 500) {
    clientRow.style.transform = "translate(0)";
  } else {
    clientRow.style.transform = `translateX(-${translateValue}px)`;
  }
});

// #WORK PROCESS ACCORDION
const wpAccordionTop = document.querySelectorAll(".box-top");

wpAccordionTop.forEach((accordion) => {
  accordion.addEventListener("click", function () {
    const parentBox = accordion.parentElement;

    const isActive = parentBox.classList.contains("active");

    document
      .querySelectorAll(".work_process_bottom_box.active")
      .forEach((activeBox) => {
        activeBox.classList.remove("active");
        activeBox.querySelector(".box-top").classList.remove("active");
        activeBox.querySelector(".box-bottom").classList.remove("active");
      });

    if (!isActive) {
      parentBox.classList.toggle("active");
      accordion.nextElementSibling.classList.toggle("active");
      accordion.classList.toggle("active");
    }
  });
});
