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

    function tl(trigger, start = "top 10%", end = "bottom 10%") {
      return gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: start,
          end: end,
          toggleActions: "play none none reverse",
          markers: true,
        },
      });
    }

    // Hero Section Animations:
    // if the current section is the hero section, & the screenWidth is > 900, apply the animation based on the current section; else, apply based on each of the current section's child elements.
    if (heading === section.querySelector(".hero_left h3") && subTitle === section.querySelector(".hero_left p")) {
      if (isLargeScreen) {
        const heroTl = tl(section, "15%", "+=300");
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
      tl(section, "top top", "+=300").to(clientRow, { opacity: 0, scale: 0.1, ease: "power1.inOut" });
    }

    // Service Cards Animations:
    // if the screen width is less than 500, it loops through each service card to apply the animation; else it loops through each service card container to apply the animation
    if (serviceCardsContainer.length > 0) {
      serviceCards.forEach((card) => {
        tl(card, "top top", "+=300").to(card, {
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
    const ctaIllustration = section.querySelector(".c_t_a-right");
    if (ctaIllustration) {
      tl(ctaIllustration, "10%").to(ctaIllustration, {
        opacity: 0,
        translateX: "100px",
        ease: "expo.in",
        duration: 0.5,
      });
    }

    // Case Studies Section Animations
    const caseStudiesSection = section.querySelector("#case-studies");
    const caseStudiesBottom = section.querySelector(".case_studies_bottom");
    const caseStudiesCardContainer = section.querySelectorAll(".case-studies_bottom-card_container");

    if (caseStudiesSection && isLargeScreen) {
      console.log(caseStudiesSection);

      tl(caseStudiesSection, "top 75%").from(caseStudiesBottom, { opacity: 0, translateY: "100Px", ease: "expo.in" });
    }

    caseStudiesCardContainer.forEach((container) => {
      if (isLargeScreen) {
        tl(container.parentElement).to(caseStudiesCardContainer, {
          opacity: 0,
          translateY: "100px",
          ease: "expo.in",
          stagger: 0.2,
          delay: 0.1,
        });
      } else {
        tl(container).to(container, {
          opacity: 0,
          translateX: "100px",
          ease: "expo.in",
          stagger: 0.2,
          delay: 0.5,
        });
      }
    });
  });
});
