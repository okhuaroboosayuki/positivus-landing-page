"strict";

// #MOBILE MENU
const menuIcon = document.querySelector("#hamburger_menu");
const navListElement = document.querySelector("#list");

const screenWidth = window.innerWidth;

// to set overflow property of document
function setDocOverFlow(isOpen) {
  if (isOpen) {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  } else {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }
}

// menu toggle
menuIcon.addEventListener("click", function (e) {
  e.stopPropagation();
  this.classList.toggle("open");

  if (menuIcon.classList.contains("open")) {
    navListElement.classList.add("menu_open");
    setDocOverFlow(true);
  } else {
    navListElement.classList.remove("menu_open");
    setDocOverFlow(false);
  }
});

// check for change in screen width, then close menu if open
window.addEventListener("resize", function () {
  if (menuIcon.classList.contains("open")) {
    navListElement.classList.remove("menu_open");
    menuIcon.classList.remove("open");
    setDocOverFlow(false);
  }
});

// check for clicks oustide the navigation area to close menu
document.addEventListener("click", function (e) {
  if (screenWidth >= 500 && screenWidth <= 1055) {
    if (menuIcon.classList.contains("open")) {
      if (!navListElement.contains(e.target) && e.target !== menuIcon) {
        navListElement.classList.remove("menu_open");
        menuIcon.classList.remove("open");
        setDocOverFlow(false);
      }
    }
  }
});

// when mobile menu link is clicked, close menu
const navLinks = document.querySelectorAll(".list_item");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (menuIcon.classList.contains("open")) {
      navListElement.classList.remove("menu_open");
      menuIcon.classList.remove("open");
      setDocOverFlow(false);
    }
  });
});

// REQUEST/BOOK BUTTON CLICK
const bookConsultBtn = document.querySelector(".hero_button");
const getProposalBtn = document.querySelector(".c_t_a-btn");
const requestQuoteBtn = document.querySelector(".list_btn");
const contactUs = document.querySelector("#contact-us");

function showContactUs() {
  contactUs.scrollIntoView({ behavior: "smooth" });
}

// when request button is clicked, close menu
requestQuoteBtn.addEventListener("click", function () {
  if (menuIcon.classList.contains("open")) {
    navListElement.classList.remove("menu_open");
    menuIcon.classList.remove("open");
    setDocOverFlow(false);
  }

  showContactUs();
});

// two event listeners scrolls below to contact us section when clicked
bookConsultBtn.addEventListener("click", function () {
  showContactUs();
});

getProposalBtn.addEventListener("click", function () {
  showContactUs();
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

onAuthorVisibility(); //initialize when document loads

// CONTACT US FORM FUNCTIONALITY
const formWrapper = document.querySelector(".form_wrapper");
const contactForm = document.querySelector("#contact");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const msgError = document.getElementById("msgError");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  let isValid = true;

  nameError.innerText = "";
  emailError.innerText = "";
  msgError.innerText = "";

  if (name === "") {
    nameError.innerText = "Name is required";
    isValid = false;
  }

  if (email === "" || !validateEmail(email)) {
    emailError.innerText = "Valid email is required";
    isValid = false;
  }

  if (message === "") {
    msgError.innerText = "Message is required";
    isValid = false;
  }

  if (!isValid) return;

  showLoading(formWrapper);

  setTimeout(() => {
    formWrapper.innerHTML = `<p class="confirmation_message">Hi ${name}! Your message has been sent successfully!</p>`;
  }, 2000);
});

function validateEmail(email) {
  const emailPattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

function showLoading(container) {
  const loading = document.createElement("div");
  loading.id = "loading";
  loading.innerHTML = `<div class="spinner"></div>`;

  container.innerHTML = "";
  container.appendChild(loading);
}
