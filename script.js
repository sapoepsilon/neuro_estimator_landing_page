// Estimating Agent Landing Page JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header
          behavior: "smooth",
        });
      }
    });
  });

  // Animate elements when they come into view
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".timeline-item, .bg-gray-50.p-8"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial state for animations
  document
    .querySelectorAll(".timeline-item, .bg-gray-50.p-8")
    .forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

  // Run animation check on load and scroll
  window.addEventListener("scroll", animateOnScroll);
  window.addEventListener("load", animateOnScroll);

  // Current date highlighting in the timeline
  const currentDate = new Date();
  const timelineItems = document.querySelectorAll(".timeline-item");

  timelineItems.forEach((item) => {
    const dateString = item.getAttribute("data-date");
    if (dateString) {
      const itemDate = new Date(dateString);

      // If the timeline date is in the future relative to current date
      if (itemDate > currentDate) {
        item.querySelector(".timeline-content").classList.add("opacity-50");
      } else {
        item
          .querySelector(".timeline-content")
          .classList.add("border-l-4", "border-neuro-primary");
      }
    }
  });

  // Add a simple counter animation for a future metrics section
  // This is just a placeholder and can be expanded later
  const animateCounter = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // Activate counters if they exist
  const counterElements = document.querySelectorAll(".counter");
  if (counterElements.length > 0) {
    counterElements.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      animateCounter(counter, 0, target, 2000);
    });
  }

  // Video placeholder functionality removed - replaced with YouTube embed
});
