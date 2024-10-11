"use strict";

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const gsapSections = gsap.utils.toArray("section");
  const isSmallScreen = window.innerWidth < 500;
  const isLargeScreen = window.innerWidth > 900;

  gsapSections.forEach((section) => {
    const heading = section.querySelector("h3");
    const subTitle = section.querySelector("p");
    const btn = section.querySelector("button");
    const heroImg = section.querySelector(".hero_right");
    const clientRow = section.querySelector(".client_row");
    const serviceCards = section.querySelectorAll(".card");
    const serviceCardsContainer = section.querySelectorAll(".cards_container");
    const ctaIllustration = section.querySelector(".c_t_a-right");
    const caseStudiesCardContainer = section.querySelectorAll(".case-studies_bottom-card_container");
    const workProcessBottom = section.querySelector(".work_process_bottom");
    const workProcessBottomBox = section.querySelectorAll(".work_process_bottom_box");

    const toggleActionsOption = "play none none none";
    function tl(trigger, { start = "top 10%", end = "bottom 10%", toggleActions = "play none none reverse" } = {}) {
      return gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: start,
          end: end,
          toggleActions: toggleActions,
        },
      });
    }

    // Hero Section Animations:
    // if the current section is the hero section, & the screenWidth is > 900, apply the animation based on the current section; else, apply based on each of the current section's child elements.
    if (heading === section.querySelector(".hero_left h3") && subTitle === section.querySelector(".hero_left p")) {
      if (isLargeScreen) {
        const heroTl = tl(section, { start: "15%", end: "+=300" });
        heroTl
          .to(heading, { opacity: 0, translateY: "-100px", ease: "expo.in", duration: 0.5 })
          .to(subTitle, { opacity: 0, translateX: "-100px", ease: "expo.in" }, "<")
          .to(heroImg, { opacity: 0, translateX: "100px", ease: "expo.in", duration: 0.5 })
          .to(btn, { opacity: 0, translateY: "100px", ease: "expo.in" });
      } else {
        tl(heading).to(heading, { opacity: 0, translateY: "-100px", ease: "expo.in", duration: 0.5 });
        tl(subTitle).to(subTitle, { opacity: 0, translateX: "-100px", ease: "expo.in" });
        tl(heroImg).to(heroImg, { opacity: 0, translateX: "100px", ease: "expo.in", duration: 0.5 });
        tl(btn).to(btn, { opacity: 0, translateY: "100px", ease: "expo.in" });
      }
    } else {
      // General Section Animations
      if (heading) tl(heading).to(heading, { opacity: 0, translateY: "-100px", ease: "expo.in", duration: 0.5 });
      if (subTitle) tl(subTitle).to(subTitle, { opacity: 0, translateX: "-100px", ease: "expo.in", duration: 1 });
      if (btn) tl(btn).to(btn, { opacity: 0, translateY: "100px", ease: "expo.in" });
    }

    // Client Row Animations
    if (clientRow && isSmallScreen) {
      tl(section, { start: "top top", end: "+=300" }).to(clientRow, { opacity: 0, scale: 0.1, ease: "power1.inOut" });
    }

    // Service Cards Animations:
    // if the screen width is less than 500, it loops through each service card to apply the animation; else it loops through each service card container to apply the animation
    if (serviceCardsContainer.length > 0) {
      serviceCards.forEach((card) => {
        tl(card, { start: "top top", end: "+=300" }).to(card, {
          opacity: 0,
          translateX: () => (Math.random() > 0.5 ? "100px" : "-100px"),
          ease: "expo.in",
          stagger: { each: 0.2, from: "power2.inOut" },
          delay: 0.2,
        });

        const cardImg = card.querySelector(".illustration");
        if (cardImg) {
          tl(cardImg).to(cardImg, {
            opacity: 0,
            translateX: () => (Math.random() > 0.5 ? "100px" : "-100px"),
            ease: "expo.in",
            stagger: { each: 0.2, from: "power2.inOut" },
            delay: 0.2,
          });
        }
      });
    }

    // CTA Section Animations
    if (ctaIllustration) {
      tl(ctaIllustration, "10%").to(ctaIllustration, {
        opacity: 0,
        translateX: "100px",
        ease: "expo.in",
        duration: 0.5,
      });
    }

    // Case Studies Section Animations

    caseStudiesCardContainer.forEach((container) => {
      if (isLargeScreen) {
        tl(container.parentElement, { start: "20%" }).to(caseStudiesCardContainer, {
          opacity: 0,
          translateY: "100px",
          ease: "expo.in",
          stagger: 0.2,
          delay: 0.1,
        });
      } else {
        tl(container).to(container, {
          opacity: 0,
          translateX: () => (Math.random() > 0.5 ? "100px" : "-100px"),
          ease: "expo.in",
          stagger: 0.2,
          delay: 0.5,
        });
      }
    });

    // Work Process Section Animations

    if (workProcessBottom) {
      workProcessBottomBox.forEach((box) => {
        tl(workProcessBottom, { start: "-30%", toggleActions: "play none none none" }).from(box, 1, {
          opacity: 0,
          y: 100,
          stagger: {
            each: 0.1,
          },
        });

        tl(box, { start: "-20%" }).to(box, {
          opacity: 0,
          translateX: () => (Math.random() > 0.5 ? "100px" : "-100px"),
          ease: "sine.out",
        });
      });
    }
  });
});
