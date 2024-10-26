"use strict";

// Initialize Lenis
const lenis = new Lenis();

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Disable lag smoothing in GSAP to prevent any delay in scroll animations
  gsap.ticker.lagSmoothing(0);

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

    const teamMembersBottom = section.querySelector(".team_members_bottom");
    const teamMembersCard = section.querySelectorAll(".profile_card");

    const testimonialsBottom = section.querySelector(".testimonials_bottom");

    const contactUsBottom = section.querySelector(".contact_us_bottom");

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
        tl(heading).to(heading, { opacity: 0, translateY: "-100px", ease: "expo.inOut", duration: 0.5 });
        tl(subTitle).to(subTitle, { opacity: 0, translateY: "-100px", ease: "expo.inOut", duration: 0.5 });
        tl(heroImg).to(heroImg, { opacity: 0, translateY: "-100px", ease: "expo.inOut", duration: 0.5 });
        tl(btn).to(btn, { opacity: 0, translateY: "-100px", ease: "expo.inOut" });
      }
    } else {
      // General Section Animations
      if (heading)
        tl(heading).to(heading, {
          opacity: 0,
          translateY: "-100px",
          ease: "expo.inOut",
          duration: 0.5,
        });
      if (subTitle)
        tl(subTitle).to(subTitle, {
          opacity: 0,
          translateY: "-100px",
          ease: "expo.inOut",
          duration: 1,
        });
      if (btn) tl(btn).to(btn, { opacity: 0, translateY: "-100px", ease: "expo.inOut" });
    }

    // Client Row Animations
    if (clientRow && isSmallScreen) {
      tl(section, { start: "top top", end: "+=300" }).to(clientRow, { opacity: 0, scale: 0.1, ease: "power1.inOut" });
    }

    // Service Cards Animations:
    if (serviceCardsContainer.length > 0) {
      serviceCards.forEach((card) => {
        tl(card, { start: "top top", end: "+=300" }).to(card, {
          opacity: 0,
          translateY: "-100px",
          ease: "expo.inOut",
          stagger: 0.2,
          duration: 0.5,
          delay: 0.5,
        });
      });
    }

    // CTA Section Animations
    if (ctaIllustration) {
      tl(ctaIllustration, { start: "20%" }).to(ctaIllustration, {
        opacity: 0,
        translateX: "100px",
        ease: "expo.in",
        duration: 0.5,
      });
    }

    // Case Studies Section Animations
    if (caseStudiesCardContainer.length > 0) {
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
            translateY: "-100px",
            ease: "expo.inOut",
            stagger: 0.2,
            delay: 0.5,
          });
        }
      });
    }

    // Work Process Section Animations
    if (workProcessBottom && workProcessBottomBox.length > 0) {
      workProcessBottomBox.forEach((box) => {
        tl(box, { start: "-20%" }).to(box, {
          opacity: 0,
          translateY: "-100px",
          ease: "expo.inOut",
        });
      });
    }

    // Team Members Section Animation
    if (teamMembersBottom && teamMembersCard.length > 0) {
      teamMembersCard.forEach((card, index) => {
        if (isLargeScreen) {
          // create an array of different animation objects
          const animations = [
            { translateY: "100px", opacity: 0, ease: "power2.out", duration: 0.5 },
            { translateX: "100px", opacity: 0, ease: "power2.out", duration: 0.7 },
            { rotate: 360, scale: 0.5, opacity: 0, ease: "expo.out", duration: 1 },
            { scale: 1.5, opacity: 0, ease: "expo.inOut", duration: 0.8 },
          ];

          // Pick a different animation for each card
          const animation = animations[index % animations.length];

          tl(teamMembersBottom, { start: "-70%" }).from(card, animation);

          // animate when leaving the target
          tl(card, { start: "50%" }).to(card, {
            opacity: 0,
            translateX: "100px",
            ease: "ease.out",
            duration: 0.5,
            delay: 0.3,
          });
        } else {
          tl(card, { start: "20%" }).to(card, {
            opacity: 0,
            translateY: "-100px",
            ease: "ease.inOut",
            duration: 0.5,
            delay: 0.3,
          });
        }
      });
    }

    // Testimonials Section Animations
    if (testimonialsBottom) {
      tl(testimonialsBottom, { start: "40%" }).to(testimonialsBottom, {
        opacity: 0,
        y: -100,
        ease: "ease.out",
      });
    }

    // Contact Us Section Animations
    if (contactUsBottom) {
      tl(contactUsBottom, { start: "60%" }).to(contactUsBottom, {
        opacity: 0,
        y: -100,
        ease: "ease.out",
      });
    }

    /**
     * Creates a GSAP timeline with a ScrollTrigger configuration.
     *
     * @param {Element} trigger - The DOM element to trigger the animation on scroll.
     * @param {Object} [options={}] - Configuration options for the scroll trigger.
     * @param {string} [options.start="top 10%"] - The start position of the scroll trigger relative to the viewport.
     * @param {string} [options.end="bottom 10%"] - The end position of the scroll trigger relative to the viewport.
     * @param {string} [options.toggleActions="play none none reverse"] - The toggle actions for the scroll-triggered animation.
     * @returns {gsap.core.Timeline} - The configured GSAP timeline.
     */
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
  });

  ScrollTrigger.refresh();
});
