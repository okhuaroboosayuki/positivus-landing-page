"strict";

// #MOBILE MENU
const menuIcon = document.querySelector("#hamburger_menu");
const navListElement = document.querySelector("#list");

menuIcon.addEventListener("click", function () {
  this.classList.toggle("open");

  if (menuIcon.classList.contains("open")) {
    navListElement.classList.add("menu_open");
  } else {
    navListElement.classList.remove("menu_open");
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

// case studies infinite scroll
const caseStudiesBottom = document.querySelector(".case_studies_bottom");

let scrollInterval;
let isScrolling = false;
const scrollSpeed = 2;

const startScroll = () => {
  scrollInterval = setInterval(() => {
    if (isScrolling) {
      caseStudiesBottom.scrollLeft += scrollSpeed;

      if (
        caseStudiesBottom.scrollLeft >=
        caseStudiesBottom.scrollWidth - caseStudiesBottom.clientWidth
      ) {
        isScrolling = false;

        caseStudiesBottom.scrollLeft = 0; // Reset to the start

        // Re-enable smooth scroll after resetting
        setTimeout(() => {
          isScrolling = true;
        }, 2000);
      }
    }
  }, 16);
};

const stopScroll = () => {
  clearInterval(scrollInterval);
};

const handleResize = () => {
  // handle scrolling when screen width resizes
  const mediaQuery = window.matchMedia("(max-width: 1055px)");

  if (mediaQuery.matches) {
    isScrolling = true;
    startScroll();
  } else {
    isScrolling = false;
    stopScroll();
  }
};

window.addEventListener("resize", handleResize);

handleResize(); // initial check

// check for when user hovers over or touches the section
caseStudiesBottom.addEventListener("pointerenter", function () {
  isScrolling = false;
});

caseStudiesBottom.addEventListener("pointerleave", function () {
  const mediaQuery = window.matchMedia("(max-width: 1055px)");
  if (mediaQuery.matches) isScrolling = true;
});

caseStudiesBottom.addEventListener("touchstart", function () {
  isScrolling = false;
});

caseStudiesBottom.addEventListener("touchend", function () {
  const mediaQuery = window.matchMedia("(max-width: 1055px)");
  if (mediaQuery.matches) isScrolling = true;
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
