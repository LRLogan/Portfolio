import "./styles.css";
import { createContourBackground } from "./animations/contourBackground.js";
import { createIntroAnimations } from "./animations/introAnimations.js";
import { createProjectPageAnimations } from "./animations/projectAnimations.js";
import { createTypewriter } from "./animations/typewriter.js";
import { profile, projects, skills } from "./data/projects.js";
import bannerVideo from "./media/backgroundTerrainAnimV2.mp4";
import imgOfMe from "./media/ImgOfMe2.jpg";
import resumePdf from "./media/Logan_Larrondo_Resume_Online.pdf";

// Route registry
const routes = {
  intro: renderIntro,
  projects: renderProjects,
  contact: renderContact
};

const app = document.querySelector("#app");
let contourBackground = null;
let introAnimations = null;
let projectPageAnimations = null;
let typewriterAnimation = null;
let pendingProjectTarget = null;
const hasConfiguredGithub = profile.githubUsername !== "your-github-username";
const PROJECT_PREVIEW_SCROLL_AMOUNT = 360;

// Skill groupings for the intro carousel section
const skillCategories = [
  {
    label: "Source Control",
    speed: 24000,
    direction: "forward",
    skills: getSkillsByName(["GitHub", "Git", "Gitlab", "Github Actions"])
  },
  {
    label: "Languages & Data",
    speed: 31000,
    direction: "reverse",
    skills: getSkillsByName(["C#", "C++", "MYSQL", "JavaScript", "HTML", "CSS", "Node.js"])
  },
  {
    label: "Tools & Platforms",
    speed: 27000,
    direction: "forward",
    skills: getSkillsByName([
      "Vite",
      "React",
      "Visual Studio",
      "VS Code",
      "VIM",
      "Git Bash",
      "Powershell",
      "Docker",
      "Windows",
      "Linux",
      "Anaconda"
    ])
  },
  {
    label: "Game & Creative",
    speed: 36000,
    direction: "reverse",
    skills: getSkillsByName(["Unity", "Unreal Engine", "Monogame", "AxureRP", "Photoshop", "Substance 3D", "Maya"])
  }
].filter((category) => category.skills.length);

// Routing helpers
function getRoute() {
  const route = window.location.hash.replace("#", "");
  return routes[route] ? route : "intro";
}

function setRoute(route) {
  window.location.hash = route;
}

// Shared app shell across pages
// Main "page" content is what changes
function renderShell(activeRoute) {
  app.innerHTML = `
    <div class="site-shell">
      <canvas class="contour-background" aria-hidden="true"></canvas>
      <div class="background-softener" aria-hidden="true"></div>
      <header class="topbar">
        <a class="brand" href="#intro" aria-label="Go to intro page">
          <strong>// Logan Larrondo</strong>
        </a>

        <nav class="nav" aria-label="Main navigation">
          ${renderNavLink("intro", "Intro", activeRoute)}
          ${renderNavLink("projects", "Projects", activeRoute)}
          ${renderNavLink("contact", "Contact", activeRoute)}
        </nav>
      </header>

      <main id="page" class="page" tabindex="-1"></main>
      ${renderFooter()}
    </div>
  `;
}

function renderNavLink(route, label, activeRoute) {
  const active = route === activeRoute ? "aria-current=\"page\"" : "";
  return `<a href="#${route}" ${active}>${label}</a>`;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <span>Logan Larrondo</span>
      <a href="#contact">Contact</a>
    </footer>
  `;
}

// re-render listener for page change
function render() {
  clearContourBackground();
  clearIntroAnimations();
  clearProjectPageAnimations();
  clearTypewriter();
  const activeRoute = getRoute();
  renderShell(activeRoute);
  routes[activeRoute](document.querySelector("#page"));
  initContourBackground();
  window.scrollTo(0, 0);
  scrollToPendingProject(activeRoute);
}

//#region Intro page
function getSkillsByName(skillNames) {
  return skillNames
    .map((name) => skills.find((skill) => skill.name === name))
    .filter(Boolean);
}

function renderIntro(root) {
  root.innerHTML = `
    <section class="front-banner intro-screen" aria-label="Featured banner">
      <div class="banner-frame">
        <span class="banner-orb" aria-hidden="true"></span>
        <span class="banner-sweep" aria-hidden="true"></span>
        <span class="banner-scanlines" aria-hidden="true"></span>
        <video class="banner-video" autoplay muted loop playsinline aria-hidden="true">
          <source src="${bannerVideo}" type="video/mp4" />
        </video>
        <span class="banner-video-overlay" aria-hidden="true"></span>
        <span class="banner-depth banner-depth--orange-one" aria-hidden="true"></span>
        <span class="banner-depth banner-depth--orange-two" aria-hidden="true"></span>
        <span class="banner-depth banner-depth--dark-one" aria-hidden="true"></span>
        <span class="banner-depth banner-depth--dark-two" aria-hidden="true"></span>
        <span class="banner-bottom-blend" aria-hidden="true"></span>
        <div class="banner-content">
          <h1 class="banner-title">Logan</h1>
          <h1 class="banner-title">Larrondo</h1>
          <p>
            Game / simulation developer, systems designer, with a specialty in 
            source / quality control, build pipelines, and algorithmic programming.
          </p>
        </div>
        <div class="scroll-cue" aria-hidden="true">
          <span></span>
        </div>
        <div class="banner-about" aria-hidden="true">
          <button class="banner-info-btn" type="button" data-project-preview-target="${projects[0].id}">Banner info</button>
        </div>
      </div>
    </section>

    <section class="about-section intro-section" id="about" data-intro-reveal>
      <div class="section-shell">
        <div class="section-heading">
          <span class="section-kicker">01 / About</span>
          <h2>Game and simulation developer engineering systems, tools, and experiences.</h2>
        </div>
        <div class="about-grid">
          <div class="about-copy">
            <p class="hero-text">
              I am currently an accelerated Masters student at Rochester Institute of Technology,
              where I am studying game / simulation design and development, geospatial technologies, 
              and software engineering in the Golisano Colledge of Computing and Information Sciences. 
              I have experience in a variety of development roles across the game development pipeline, 
              with a specialty in source / quality control, build pipelines, and algorithmic programming.
            </p>
            <p class="hero-text">
              My work is motivated by a desire to create engaging, high-quality, and optimized interactive experiences.
            </p>
            <div class="identity-console" aria-label="Animated profile identity">
              <span class="identity-prefix">I am</span>
              <span id="typewriter" class="typewriter" aria-live="polite"></span>
            </div>
            <div class="hero-actions">
              <button class="primary-action" type="button" data-route="projects">View Projects</button>
              <button class="secondary-action" type="button" data-route="contact">Open Links</button>
            </div>
          </div>
          <figure class="profile-portrait" aria-label="Future profile picture slot">
            <span class="portrait-ray portrait-ray--left-one" aria-hidden="true"></span>
            <span class="portrait-ray portrait-ray--left-two" aria-hidden="true"></span>
            <span class="portrait-ray portrait-ray--right-one" aria-hidden="true"></span>
            <span class="portrait-ray portrait-ray--right-two" aria-hidden="true"></span>
            <div class="portrait-frame">
              <img src=${imgOfMe} alt="An image of Logan Larrondo" class="profile-portrait-img"/>
            </div>
          </figure>
        </div>
      </div>
    </section>

    <section class="project-preview-section intro-section" aria-labelledby="project-preview-title" data-intro-reveal>
      <div class="section-shell">
        <div class="project-preview-heading">
          <div>
            <span class="section-kicker">02 / Project Preview</span>
            <h2 id="project-preview-title">Select a project</h2>
          </div>
          <div class="project-preview-controls" aria-label="Project preview controls">
            <button type="button" data-preview-scroll="left" aria-label="Scroll project previews left">
              <span aria-hidden="true">&lt;</span>
            </button>
            <button type="button" data-preview-scroll="right" aria-label="Scroll project previews right">
              <span aria-hidden="true">&gt;</span>
            </button>
          </div>
        </div>
        <div class="project-preview-window">
          <div class="project-preview-track" data-project-preview-track>
            ${projects.map(renderProjectPreviewCard).join("")}
          </div>
        </div>
      </div>
    </section>

    <section class="skills-section intro-section glass-panel" aria-labelledby="skills-title" data-intro-reveal>
      <div class="skills-intro">
        <span class="section-kicker">03 / Skills</span>
        <h2 id="skills-title">Skills</h2>
        <p>Grouped like an equipment screen: each rail moves on its own cadence so the stack feels alive without becoming noisy.</p>
      </div>
      <div class="skill-carousel-stack" data-skill-carousels>
        ${skillCategories.map(renderSkillCategory).join("")}
      </div>
    </section>

    <section class="github-section intro-section" data-intro-reveal>
      <div class="section-shell">
        <div class="github-copy">
          <span class="section-kicker">04 / Development Pulse</span>
          <h2>Development pulse</h2>
          <p class="hero-text">A wider contribution-style view that has room to breathe.</p>
        </div>
        <div class="github-activity" aria-label="GitHub activity graph">
          ${renderGithubActivity()}
        </div>
      </div>
    </section>
  `;

  root.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => setRoute(button.dataset.route));
  });
  root.querySelectorAll("[data-scroll-target]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(button.dataset.scrollTarget)?.scrollIntoView({ behavior: "smooth" });
    });
  });
  initProjectPreviewCarousel(root);

  initTypewriter();
  initIntroAnimations(root);
}

// Project preview carousel on the intro page
function initProjectPreviewCarousel(root) {
  const track = root.querySelector("[data-project-preview-track]");
  if (!track) return;

  root.querySelectorAll("[data-preview-scroll]").forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.dataset.previewScroll === "left" ? -1 : 1;
      track.scrollBy({ left: PROJECT_PREVIEW_SCROLL_AMOUNT * direction, behavior: "smooth" });
    });
  });

  root.querySelectorAll("[data-project-preview-target]").forEach((button) => {
    button.addEventListener("click", () => {
      pendingProjectTarget = button.dataset.projectPreviewTarget;
      setRoute("projects");
    });
  });
}

function renderGithubActivity() {
  if (!hasConfiguredGithub) {
    return `
      <div class="github-placeholder">
        <span>GitHub Activity</span>
        <strong>Set your username in profile.githubUsername</strong>
      </div>
    `;
  }

  return `
    <div class="github-heatmap">
      <span>GitHub Activity</span>
      <img
        class="github-heatmap-image"
        src="https://ghchart.rshah.org/1f6f43/${encodeURIComponent(profile.githubUsername)}"
        alt="GitHub contribution heatmap for ${profile.githubUsername}"
        loading="lazy"
      />
    </div>
  `;
}

function renderSkillCategory(category, index) {
  const carouselSkills = [...category.skills, ...category.skills];

  return `
    <section
      class="skill-category"
      data-skill-category
      data-speed="${category.speed}"
      data-direction="${category.direction}"
      data-delay="${index * 420}"
      aria-label="${category.label} skills"
    >
      <div class="skill-category-header">
        <span>${category.label}</span>
        <small>${category.skills.length} tools</small>
      </div>
      <div class="skill-carousel-window">
        <ul class="skill-carousel-track" data-carousel-track>
          ${carouselSkills.map(renderSkill).join("")}
        </ul>
      </div>
    </section>
  `;
}

function renderSkill(skill) {
  return `
    <li class="skill-card" style="--skill-logo: url('${skill.logo}')">
      <span>${skill.name}</span>
    </li>
  `;
}

function renderProjectPreviewCard(project) {
  return `
    <button class="project-preview-card" type="button" data-project-preview-target="${project.id}">
      <div class="project-media project-${project.mediaType}">
        ${renderProjectMedia(project)}
      </div>
      <span class="project-preview-title">${project.title}</span>
    </button>
  `;
}
//#endregion

//#region Animation init and cleanup
function clearContourBackground() {
  if (contourBackground) {
    contourBackground.stop();
    contourBackground = null;
  }
}

function initContourBackground() {
  const canvas = document.querySelector(".contour-background");
  contourBackground = createContourBackground(canvas);
}

function clearIntroAnimations() {
  if (introAnimations) {
    introAnimations.stop();
    introAnimations = null;
  }
}

function initIntroAnimations(root) {
  introAnimations = createIntroAnimations(root);
}

function clearProjectPageAnimations() {
  if (projectPageAnimations) {
    projectPageAnimations.stop();
    projectPageAnimations = null;
  }
}

function initProjectPageAnimations(root) {
  projectPageAnimations = createProjectPageAnimations(root);
}

function clearTypewriter() {
  if (typewriterAnimation) {
    typewriterAnimation.stop();
    typewriterAnimation = null;
  }
}

function initTypewriter() {
  const output = document.querySelector("#typewriter");
  if (!output) return;
  typewriterAnimation = createTypewriter(output);
}
//#endregion

//#region Projects page
function renderProjects(root) {
  root.innerHTML = `
    <section class="page-heading project-heading">
      <span class="banner-code">// Projects</span>
      <h1>Choose a build</h1>
      <p>
        Large cinematic project slots give each build room for media, a concise pitch, and an expandable case-study panel.
      </p>
    </section>

    <section class="project-grid" aria-label="Project list">
      ${projects.map(renderProjectCard).join("")}
    </section>
  `;

  root.querySelectorAll(".project-card").forEach((card) => {
    const toggle = card.querySelector(".project-toggle");
    const detail = card.querySelector(".project-detail");

    toggle.addEventListener("click", () => {
      const isOpen = card.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.textContent = isOpen ? "Collapse Project" : "Expand Project";
      detail.hidden = !isOpen;
    });
  });

  initProjectPageAnimations(root);
}

// Project card helpers
function renderProjectCard(project) {
  return `
    <article class="project-card" id="${project.id}" data-project-reveal>
      <div class="project-media project-${project.mediaType}">
        ${renderProjectMedia(project)}
      </div>

      <div class="project-content">
        <div class="project-kicker">${project.role}</div>
        <h2>${project.title}</h2>
        <p>${project.summary}</p>
        <ul class="tag-list">
          ${project.tags.map((tag) => `<li>${tag}</li>`).join("")}
        </ul>
        <button
          class="project-toggle"
          type="button"
          aria-expanded="false"
          aria-controls="${project.id}-detail"
        >
          Expand Project
        </button>
      </div>

      <div class="project-detail" id="${project.id}-detail" hidden>
        ${renderProjectDetail(project)}
        <div class="project-links">
          ${project.links.map((link) => `<a href="${link.href}" target="_blank">${link.label}</a>`).join("")}
        </div>
      </div>
    </article>
  `;
}

function renderProjectDetail(project) {
  const detailSections = [
    {
      heading: "Project Goal",
      body: project.details
    },
    {
      heading: "Implementation Notes",
      body: `Core areas to document here: ${project.tags.join(", ")}. This section is ready for systems notes, design constraints, and what you personally owned.`
    },
    {
      heading: "Showcase Media",
      body: "Use this area for screenshots, short clips, diagrams, or process images that explain the build beyond the preview card."
    }
  ];

  return `
    <div class="project-detail-grid">
      ${detailSections.map((section, index) => `
        <article class="project-detail-section">
          <h3>${section.heading}</h3>
          <div class="project-detail-row">
            <div class="project-detail-copy">
              <p>${section.body}</p>
            </div>
            <div class="project-detail-media" aria-hidden="true">
              ${renderProjectDetailMedia(project, index)}
            </div>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

function renderProjectDetailMedia(project, index) {
  if (project.mediaType === "image" && project.media) {
    return `<img src="${project.media}" alt="" class="project-detail-image project-detail-image--${index}" />`;
  }

  return `<span class="project-detail-placeholder project-detail-placeholder--${index}"></span>`;
}

function scrollToPendingProject(activeRoute) {
  if (activeRoute !== "projects" || !pendingProjectTarget) return;

  requestAnimationFrame(() => {
    const target = document.getElementById(pendingProjectTarget);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    target?.classList.add("is-targeted");
    window.setTimeout(() => target?.classList.remove("is-targeted"), 1600);
    pendingProjectTarget = null;
  });
}

function renderProjectMedia(project) {
  switch (project.mediaType) {
    case "image":
      return `
        <img
          src="${project.media}"
          alt="${project.title}"
          class="project-image"
        />
      `;

    case "video":
      return `
        <video
          class="project-video"
          controls
          muted
          preload="metadata"
        >
          <source src="${project.media}" />
        </video>
      `;

    default:
      return `<span></span>`;
  }
}
//#endregion

//#region Contact page
function renderContact(root) {
  root.innerHTML = `
    <section class="contact-layout">
      <div class="page-heading">
        <span class="banner-code">// Links</span>
        <h1>Contact</h1>
        <p>
          This page is ready for your GitHub, LinkedIn, resume, email, and any long-term hosting links.
        </p>
      </div>

      <div class="link-console" aria-label="Contact links">
        <a class="contact-copy-email"
          type="button"
          data-email="lrlarrondo1@gmail.com">
          <span>Email</span>
          <strong>lrlarrondo1@gmail.com (Click to copy)</strong>
        </a>
        <a href="https://github.com/LRLogan" target="_blank">
          <span>GitHub</span>
          <strong>LRLogan</strong>
        </a>
        <a href="https://www.linkedin.com/in/logan-larrondo-12986430b/" target="_blank">
          <span>LinkedIn</span>
          <strong>Logan Larrondo</strong>
        </a>
        <a
          class="resume-toggle"
          type="button"
          aria-expanded="false">
          <span>Resume</span>
          <strong>View Resume</strong>
        </a>
      </div>

      <div class ="resume-container">
        <div class="resume-panel" aria-hidden="true">
          <a class="resume-download resume-info-btn" href="${resumePdf}" download>
            Download Resume as PDF
          </a>
          <iframe
            class="resume-viewer"
            src="${resumePdf}"
            title="Logan Larrondo Resume"
          >
          </iframe>
        </div>
      </div>
    </section>
  `;

  const copyEmailButton = root.querySelector(".contact-copy-email");

copyEmailButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("lrlarrondo1@gmail.com");

    const label = copyEmailButton.querySelector("strong");
    label.textContent = "Copied!";

    setTimeout(() => {
      label.textContent = "lrlarrondo1@gmail.com (Click to copy)";
    }, 2000);
  } catch (error) {
    console.error("Failed to copy email:", error);
  }
});

  const resumeButton = root.querySelector(".resume-toggle");
  const resumePanel = root.querySelector(".resume-panel");

  resumeButton?.addEventListener("click", () => {
  const isOpen =
    resumePanel.classList.toggle("is-open");

  resumeButton.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

});
  
}
//#endregion

window.addEventListener("hashchange", render);
render();
