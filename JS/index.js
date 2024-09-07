"strict";

// Hamburger Menu
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

// SCROLL REVEAL HANDLING
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

const mediaQuery = window.matchMedia("(max-width: 1055px)");

const startScroll = () => {
  scrollInterval = setInterval(() => {
    if (isScrolling) {
      caseStudiesBottom.scrollLeft += scrollSpeed;

      if (
        caseStudiesBottom.scrollLeft >=
        caseStudiesBottom.scrollWidth - caseStudiesBottom.clientWidth
      ) {
        caseStudiesBottom.style.scrollBehavior = "auto"; // Temporarily disable smooth scroll

        caseStudiesBottom.scrollLeft = 0; // Reset to the start

        // Re-enable smooth scroll after resetting
        setTimeout(() => {
          caseStudiesBottom.style.scrollBehavior = "smooth";
        }, 50); // Delay to ensure smooth scroll is back after the reset
      }
    }
  }, 16);
};

const stopScroll = () => {
  clearInterval(scrollInterval);
};

const handleResize = () => {
  // handle scrolling when screen width resizes
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
caseStudiesBottom.addEventListener("mouseenter", function () {
  isScrolling = false;
});

caseStudiesBottom.addEventListener("mouseleave", function () {
  if (mediaQuery.matches) isScrolling = true;
});

caseStudiesBottom.addEventListener("touchstart", function () {
  isScrolling = false;
});

caseStudiesBottom.addEventListener("touchend", function () {
  if (mediaQuery.matches) isScrolling = true;
});

// work process accordion
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
    console.log(accordion.children[0].innerHTML);
  });
});
