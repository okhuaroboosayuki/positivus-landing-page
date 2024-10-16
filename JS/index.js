"strict";

/* VARIABLES */
// for header scroll display
let lastScrollY = window.scrollY;

//for mobile menu
const menuIcon = document.querySelector("#hamburger_menu");
const navListElement = document.querySelector("#list");
const navLinks = document.querySelectorAll(".list_item a");
const screenWidth = window.innerWidth;

// for request/book button click
const bookConsultBtn = document.querySelector(".hero_button");
const getProposalBtn = document.querySelector(".c_t_a-btn");
const requestQuoteBtn = document.querySelector(".list_btn");
const contactUs = document.querySelector("#contact-us");

// for scroll reveal handling
const clientRow = document.querySelector(".client_row");

// for work process accordion setup
const wpAccordionTop = document.querySelectorAll(".box-top");

// for contact form functionality
const formWrapper = document.querySelector(".form_wrapper");
const contactForm = document.querySelector("#contact");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const msgError = document.getElementById("msgError");

// for footer and footer newsletter
const newsletterForm = document.getElementById("newsletter");
const userEmailWrapper = document.getElementById("newsletter_email_input_wrapper");
const newsletterFormWrapper = document.getElementById("newsletter_form_wrapper");
const newsletterError = document.getElementById("newsletter_error");

const footerYear = document.getElementById("year");

// for back to top
const backToTopButton = document.getElementById("backToTop");

/////////////////////

/* EVENT LISTENERS */

// Hide/Display Header on Scroll
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");

  if (window.scrollY > lastScrollY) {
    header.classList.add("hidden_header");
  } else {
    header.classList.remove("hidden_header");
  }

  // Update the last scroll position
  lastScrollY = window.scrollY;
});

// Mobile Menu Toggle
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
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (menuIcon.classList.contains("open")) {
      navListElement.classList.remove("menu_open");
      menuIcon.classList.remove("open");
      setDocOverFlow(false);
    }
  });
});

// Request/Book Button Click
// when request button is clicked, scrolls to contact us section, and closes mobile menu if open
requestQuoteBtn.addEventListener("click", function () {
  if (menuIcon.classList.contains("open")) {
    navListElement.classList.remove("menu_open");
    menuIcon.classList.remove("open");
    setDocOverFlow(false);
  }

  showContactUs();
});
// two event listeners; scrolls below to contact us section when clicked
bookConsultBtn.addEventListener("click", function () {
  showContactUs();
});

getProposalBtn.addEventListener("click", function () {
  showContactUs();
});

// Contact Us Form Functionality
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  let isValid = true;

  // Validates if name, email, and message are not empty; returns true/false
  const isNameValid = showError(name, nameError, "Name cannot be blank");
  const isEmailValid = showError(email, emailError, "Valid email is required", validateEmail);
  const isMessageValid = showError(message, msgError, "Message is required");

  isValid = isNameValid && isEmailValid && isMessageValid;

  if (!isValid) return;

  showLoading(formWrapper, "#000");

  // after 2secs, displays confirmation message
  const capitalizedNames = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  setTimeout(() => {
    formWrapper.innerHTML = `<p class="confirmation_message">Hi <span style="color: #000; border: 5px solid #b9ff66; padding: 5px 1rem">${capitalizedNames}</span> <br><br> Your message has been sent successfully!</p>`;
  }, 2000);
});

// Footer Newsletter Functionality
newsletterForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("newsletter_email").value.trim();

  let isValid = true;

  const onErrorCallback = function () {
    userEmailWrapper.style.marginTop = "1.2rem"; // ensures the email input is in the same line with the submit button
  };

  // Validates if email is in correct format or not empty; returns true/false
  const isEmailValid = showError(email, newsletterError, "Valid email is required", validateEmail, onErrorCallback);

  isValid = isEmailValid;

  if (!isValid) return;

  newsletterForm.innerHTML = "";

  showLoading(newsletterForm, "#fff");

  // after 2secs, displays confirmation message
  setTimeout(() => {
    newsletterForm.innerHTML = `<p class="confirmation_message" style="color: #fff; text-align: center;">You have successfully subscribed!</p>`;
  }, 2000);
});

/* BACK TO TOP */
window.onscroll = function () {
  if (document.body.scrollTop > 2000 || document.documentElement.scrollTop > 2000) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
};
backToTopButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* SCROLL HANDLING */

// for client scroll
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

/////////////////////

/* WORK PROCESS ACCORDION */
wpAccordionTop.forEach((accordion) => {
  accordion.addEventListener("click", function () {
    const parentBox = accordion.parentElement;

    const isActive = parentBox.classList.contains("active");

    document.querySelectorAll(".work_process_bottom_box.active").forEach((activeBox) => {
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

/////////////////////

/* SWIPER CAROUSEL */
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

/////////////////////

/* FOOTER YEAR */
footerYear.innerText = new Date().getFullYear();

/////////////////////

/* FUNCTIONS */

/**
 * Sets the overflow property of the document based on the provided boolean value.
 *
 * @param {boolean} isOpen - If true, disables scrolling by setting overflow to hidden. If false, restores scrolling by resetting overflow properties.
 */
function setDocOverFlow(isOpen) {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

/**
 * Scrolls to contact us section of the page when called
 */
function showContactUs() {
  contactUs.scrollIntoView({ behavior: "smooth" });
}

/**
 * Controls the visibility of author details in the Swiper slides.
 */
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

/**
 * showLoading displays a simple spinner loader when data is being fetched or submitted.
 * It clears the existing content of the container and replaces it with a loading spinner.
 * @param {HTMLElement} container - The container element where the loading spinner should be displayed.
 * @param {string} color - The color of the loading spinner, provided as a CSS-compatible color value.
 */
function showLoading(container, color) {
  const loading = document.createElement("div");
  loading.id = "loading";
  loading.innerHTML = `<div class="spinner" style="border-left-color:${color}; border-left-width: 4px; border-left-style: solid;"></div>`;

  container.innerHTML = "";
  container.appendChild(loading);
}

/**
 * validateEmail checks if the provided email address is in a valid format.
 *
 * @param {string} email - The email address to be validated.
 * @returns {boolean} - Returns true if the email address is valid, otherwise false.
 */
function validateEmail(email) {
  const emailPattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

/**
 * showError validates a value and displays an error message if validation fails.
 *
 * @param {string} value - The input value to validate.
 * @param {HTMLElement} errorEl - The HTML element where the error message should be displayed.
 * @param {string} errorMessage - The message to display if validation fails.
 * @param {function} [validateEmailFn=null] - Optional function to validate the email (or other) value. If provided, it should return true if the value is valid, otherwise false.
 * @param {function} [onErrorCallback=null] - Optional callback function that gets executed when an error occurs.
 *
 * @returns {boolean} - Returns true if the value is valid, otherwise false.
 */
function showError(value, errorEl, errorMessage, validateEmailFn = null, onErrorCallback = null) {
  errorEl.innerText = "";

  if (validateEmailFn) {
    if (!validateEmailFn(value)) {
      errorEl.innerText = errorMessage;
      if (onErrorCallback) onErrorCallback();
      return false;
    }
  } else {
    if (value === "") {
      errorEl.innerText = errorMessage;
      return false;
    }
  }

  return true;
}
