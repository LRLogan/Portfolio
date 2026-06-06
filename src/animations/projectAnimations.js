import { animate, stagger } from "animejs";

const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

export function createProjectPageAnimations(root) {
  if (!root || motionQuery.matches) {
    revealProjectsWithoutMotion(root);
    return { stop() {} };
  }

  const activeAnimations = [];
  const cleanupCallbacks = [];

  prepareProjectRevealTargets(root);
  activeAnimations.push(runProjectHeadingIntro(root));
  activeAnimations.push(...runProjectScrollReveals(root, cleanupCallbacks));

  return {
    stop() {
      activeAnimations.forEach((animation) => animation?.revert?.());
      cleanupCallbacks.forEach((cleanup) => cleanup());
    }
  };
}

function prepareProjectRevealTargets(root) {
  root.querySelectorAll("[data-project-reveal]").forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(34px) scale(0.985)";
  });
}

function runProjectHeadingIntro(root) {
  const targets = root.querySelectorAll(".project-heading > *");
  return animate(targets, {
    opacity: [0, 1],
    y: [18, 0],
    delay: stagger(90),
    duration: 620,
    ease: "outCubic"
  });
}

function runProjectScrollReveals(root, cleanupCallbacks) {
  const cards = [...root.querySelectorAll("[data-project-reveal]")];
  if (!cards.length) return [];

  const activeAnimations = [];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        activeAnimations.push(animate(entry.target, {
          opacity: [0, 1],
          y: [34, 0],
          scale: [0.985, 1],
          duration: 720,
          ease: "outCubic"
        }));

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
  );

  cards.forEach((card) => observer.observe(card));
  cleanupCallbacks.push(() => observer.disconnect());
  return activeAnimations;
}

function revealProjectsWithoutMotion(root) {
  root?.querySelectorAll("[data-project-reveal]").forEach((element) => {
    element.style.opacity = "1";
    element.style.transform = "none";
  });
}
