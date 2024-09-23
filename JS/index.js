"strict";
import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

// #MOBILE MENU
const menuIcon = document.querySelector("#hamburger_menu");
const navListElement = document.querySelector("#list");

function setDocOverFlow() {
  if (document.documentElement.style.overflow === "hidden") {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  } else {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }
}

menuIcon.addEventListener("click", function (e) {
  e.stopPropagation();
  this.classList.toggle("open");

  if (menuIcon.classList.contains("open")) {
    navListElement.classList.add("menu_open");
    setDocOverFlow();
  } else {
    navListElement.classList.remove("menu_open");
    setDocOverFlow();
  }
});

window.addEventListener("resize", function () {
  if (menuIcon.classList.contains("open")) {
    navListElement.classList.remove("menu_open");
    menuIcon.classList.toggle("open");
    setDocOverFlow();
  }
});

document.addEventListener("click", function (e) {
  const screenWidth = window.innerWidth; // Corrected property

  if (screenWidth >= 500 && screenWidth <= 1055) {
    if (menuIcon.classList.contains("open")) {
      if (!navListElement.contains(e.target)) {
        navListElement.classList.remove("menu_open");
        menuIcon.classList.toggle("open");
        setDocOverFlow();
      }
    }
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

// SWIPER CAROUSEL
const swiper = new Swiper(".swiper", {
  slidesPerView: "auto",
  spaceBetween: 50,
  centeredSlides: true,
  initialSlide: 1,
  spaceBetween: 50,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

swiper.on("transitionEnd", function () {
  onAuthorVisibility();
});

function onAuthorVisibility() {
  const allSlides = document.querySelectorAll(".swiper-slide");

  allSlides.forEach((slide, index) => {
    const author = slide.querySelector(".author");

    if (author) {
      const activeIndex = swiper.activeIndex;

      if (index === activeIndex) {
        author.classList.remove("hidden");
      } else {
        author.classList.add("hidden");
      }
    }
  });
}

onAuthorVisibility();
