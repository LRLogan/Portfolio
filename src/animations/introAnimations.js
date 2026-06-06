import { animate, createTimeline, stagger } from "animejs";

const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

export function createIntroAnimations(root) {
  if (!root || motionQuery.matches) {
    revealWithoutMotion(root);
    return { stop() {} };
  }

  const activeAnimations = [];
  const cleanupCallbacks = [];

  prepareTitle(root);
  prepareRevealTargets(root);
  prepareSkillCards(root);

  activeAnimations.push(runIntroLoad(root));
  activeAnimations.push(runAmbientBanner(root));
  activeAnimations.push(...runSkillCarousels(root, cleanupCallbacks));
  activeAnimations.push(...runScrollReveals(root, cleanupCallbacks));
  cleanupCallbacks.push(...attachHoverEnergy(root, activeAnimations));

  return {
    stop() {
      activeAnimations.forEach((animation) => animation?.revert?.());
      cleanupCallbacks.forEach((cleanup) => cleanup());
    }
  };
}

function prepareTitle(root) {
  root.querySelectorAll(".banner-title").forEach((title) => {
    if (title.dataset.split === "true") return;

    const text = title.textContent.trim();
    title.dataset.split = "true";
    title.setAttribute("aria-label", text);
    title.innerHTML = [...text]
      .map((character) => {
        const display = character === " " ? "&nbsp;" : character;
        return `<span class="title-letter" aria-hidden="true">${display}</span>`;
      })
      .join("");
  });
}

function prepareRevealTargets(root) {
  root.querySelectorAll("[data-intro-reveal]").forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(28px)";
  });
}

function prepareSkillCards(root) {
  root.querySelectorAll(".skill-card").forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px) scale(0.96)";
  });
}

function runIntroLoad(root) {
  const bannerFrame = root.querySelector(".banner-frame");
  const titleLetters = root.querySelectorAll(".title-letter");
  const bannerCode = root.querySelector(".banner-code");
  const bannerText = root.querySelector(".banner-content p");
  const bannerAction = root.querySelector(".glass-action");

  return createTimeline({
    defaults: {
      ease: "outCubic",
      duration: 760
    }
  })
    .add(".topbar", { opacity: [0, 1], y: [-72, 0], duration: 620 }, 0)
    .add(bannerFrame, { opacity: [0, 1], scale: [0.985, 1] }, 120)
    .add(titleLetters, {
      opacity: [0, 1],
      y: [34, 0],
      filter: ["blur(10px)", "blur(0px)"],
      delay: stagger(24)
    }, 260)
    .add(bannerCode, { opacity: [0, 1], x: [-18, 0] }, 420)
    .add(bannerText, { opacity: [0, 1], y: [18, 0] }, 620)
    .add(bannerAction, { opacity: [0, 1], y: [18, 0], scale: [0.96, 1] }, 740);
}

function runAmbientBanner(root) {
  const animations = [];

  const orb = root.querySelector(".banner-orb");
  if (orb) {
    animations.push(animate(orb, {
      x: ["-5%", "5%"],
      y: ["3%", "-4%"],
      scale: [1, 1.08],
      duration: 4800,
      alternate: true,
      loop: true,
      ease: "inOutSine"
    }));
  }

  const sweep = root.querySelector(".banner-sweep");
  if (sweep) {
    animations.push(animate(sweep, {
      x: ["-120%", "120%"],
      opacity: [0, 0.62, 0],
      duration: 4200,
      delay: 600,
      loop: true,
      ease: "inOutQuad"
    }));
  }

  const scrollCue = root.querySelector(".scroll-cue span");
  if (scrollCue) {
    animations.push(animate(scrollCue, {
      y: [0, 30],
      opacity: [1, 0.18],
      duration: 1250,
      loop: true,
      ease: "inOutQuad"
    }));
  }

  return {
    revert() {
      animations.forEach((animation) => animation.revert());
    }
  };
}

function runSkillCarousels(root, cleanupCallbacks) {
  const categories = [...root.querySelectorAll("[data-skill-category]")];
  if (!categories.length) return [];

  const animations = categories
    .map((category) => {
      const track = category.querySelector("[data-carousel-track]");
      if (!track) return null;

      const speed = Number(category.dataset.speed) || 30000;
      const delay = Number(category.dataset.delay) || 0;
      const isReverse = category.dataset.direction === "reverse";
      const start = isReverse ? "-50%" : "0%";
      const end = isReverse ? "0%" : "-50%";

      track.style.transform = `translateX(${start})`;
      const animation = animate(track, {
        x: [start, end],
        duration: speed,
        delay,
        loop: true,
        ease: "linear"
      });

      const pause = () => animation.pause();
      const resume = () => animation.resume();
      category.addEventListener("mouseenter", pause);
      category.addEventListener("mouseleave", resume);
      category.addEventListener("focusin", pause);
      category.addEventListener("focusout", resume);

      cleanupCallbacks.push(() => {
        category.removeEventListener("mouseenter", pause);
        category.removeEventListener("mouseleave", resume);
        category.removeEventListener("focusin", pause);
        category.removeEventListener("focusout", resume);
      });

      return animation;
    })
    .filter(Boolean);

  return animations;
}

function runScrollReveals(root, cleanupCallbacks) {
  const revealTargets = [...root.querySelectorAll("[data-intro-reveal]")];
  if (!revealTargets.length) return [];

  const activeAnimations = [];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const animation = animate(entry.target, {
          opacity: [0, 1],
          y: [28, 0],
          duration: 760,
          ease: "outCubic"
        });

        activeAnimations.push(animation);
        if (entry.target.matches(".skills-section")) {
          activeAnimations.push(animate(entry.target.querySelectorAll(".skill-category"), {
            opacity: [0, 1],
            y: [18, 0],
            delay: stagger(90),
            duration: 680,
            ease: "outCubic"
          }));
          activeAnimations.push(animate(entry.target.querySelectorAll(".skill-card"), {
            opacity: [0, 1],
            y: [16, 0],
            scale: [0.96, 1],
            delay: stagger(22, { from: "center" }),
            duration: 540,
            ease: "outCubic"
          }));
        }
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  revealTargets.forEach((target) => observer.observe(target));
  cleanupCallbacks.push(() => observer.disconnect());

  return activeAnimations;
}

function attachHoverEnergy(root, activeAnimations) {
  const targets = root.querySelectorAll(
    ".glass-action, .primary-action, .secondary-action, .skill-card, .portrait-frame"
  );

  return [...targets].map((target) => {
    const enter = () => {
      const params = {
        scale: 1.025,
        y: -3,
        duration: 260,
        ease: "outCubic"
      };
      if (target.classList.contains("skill-card")) {
        params.boxShadow = "0 18px 42px rgba(128, 255, 184, 0.14)";
      }
      activeAnimations.push(animate(target, {
        ...params
      }));
    };

    const leave = () => {
      const params = {
        scale: 1,
        y: 0,
        duration: 320,
        ease: "outCubic"
      };
      if (target.classList.contains("skill-card")) {
        params.boxShadow = "0 0 0 rgba(128, 255, 184, 0)";
      }
      activeAnimations.push(animate(target, {
        ...params
      }));
    };

    target.addEventListener("mouseenter", enter);
    target.addEventListener("mouseleave", leave);

    return () => {
      target.removeEventListener("mouseenter", enter);
      target.removeEventListener("mouseleave", leave);
    };
  });
}

function revealWithoutMotion(root) {
  root?.querySelectorAll("[data-intro-reveal]").forEach((element) => {
    element.style.opacity = "1";
    element.style.transform = "none";
  });
  root?.querySelectorAll(".skill-card").forEach((element) => {
    element.style.opacity = "1";
    element.style.transform = "none";
  });
}
