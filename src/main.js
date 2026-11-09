import "./styles.css";
import { createContourBackground } from "./animations/contourBackground.js";
import { createIntroAnimations } from "./animations/introAnimations.js";
import { createProjectPageAnimations } from "./animations/projectAnimations.js";
import { createTypewriter } from "./animations/typewriter.js";
import { featuredProjectIds, profile, projectCategories, projects, skills } from "./data/projects.js";
import bannerVideo from "./media/backgroundTerrainAnimV2.mp4";
import imgOfMe from "./media/ImgOfMe2.jpg";
import resumePdf from "./media/Larrondo_Logan_Resume.pdf";

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
const hasConfiguredGithub = profile.githubUsername !== "your-github-username";
const projectsById = new Map(projects.map((project) => [project.id, project]));

// Skill groupings for the intro carousel section
const skillCategories = [
  {
    label: "Source Control",
    speed: 24000,
    direction: "forward",
    skills: getSkillsByName(["GitHub", "Git", "Gitlab", "Github Actions", "GitKraken"])
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
      "Anaconda",
      "Fedora"
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
  const route = window.location.hash.slice(1).split("/")[0];
  return Object.hasOwn(routes, route) ? route : "intro";
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
function render(event) {
  clearContourBackground();
  clearIntroAnimations();
  clearProjectPageAnimations();
  clearTypewriter();
  const activeRoute = getRoute();
  renderShell(activeRoute);
  routes[activeRoute](document.querySelector("#page"));
  initContourBackground();
  window.scrollTo(0, 0);
  if (event) document.querySelector("#page").focus({ preventScroll: true });
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
        <div class="banner-about">
          <a class="banner-info-btn" href="${getProjectHref("Wireframe-Heightmap-Visualizer")}">Banner info</a>
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
              and software engineering in the Golisano College of Computing and Information Sciences. 
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
            <span class="section-kicker">02 / Portfolio</span>
            <h2 id="project-preview-title">Featured work</h2>
          </div>
          <a class="secondary-action" href="#projects">Browse all projects <span aria-hidden="true">↗</span></a>
        </div>
        <div class="project-preview-grid">
          ${featuredProjectIds.map((id) => renderProjectPreviewCard(projectsById.get(id))).join("")}
        </div>
      </div>
    </section>

    <section class="skills-section intro-section glass-panel" aria-labelledby="skills-title" data-intro-reveal>
      <div class="skills-intro">
        <span class="section-kicker">03 / Skills</span>
        <h2 id="skills-title">Skills</h2>
        <p>Skills that I have accumulated through my experience and continuous learning.</p>
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
          <p class="hero-text">My Github contribution activity over the last year.</p>
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

  initTypewriter();
  initIntroAnimations(root);
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

function getProjectHref(id) {
  const category = projectCategories.find(({ projectIds }) => projectIds.includes(id));
  return `#projects/${category.id}/${id}`;
}

function renderProjectPreviewCard(project) {
  const category = projectCategories.find(({ projectIds }) => projectIds.includes(project.id));

  return `
    <a class="project-preview-card" href="${getProjectHref(project.id)}">
      <img src="${project.media}" alt="" loading="lazy" width="640" height="400" />
      <div class="project-preview-copy">
        <span class="section-kicker">${category.title}</span>
        <h3>${project.title}</h3>
        <p>${project.summary}</p>
        <span class="project-preview-action">Read case study <span aria-hidden="true">↗</span></span>
      </div>
    </a>
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
  const [, categoryId, projectId] = window.location.hash.slice(1).split("/");
  const category = projectCategories.find(({ id }) => id === categoryId) ?? projectCategories[0];
  const targetId = category.projectIds.includes(projectId) ? projectId : null;

  root.innerHTML = `
    <section class="page-heading project-heading">
      <span class="section-kicker">Portfolio / Project library</span>
      <h1>Explore by discipline</h1>
      <p>Choose an area to see the projects most relevant to your role and how I built them.</p>
    </section>

    <nav class="project-categories" aria-label="Project disciplines">
      ${projectCategories.map((item, index) => renderProjectCategory(item, index, category)).join("")}
    </nav>

    <section class="project-grid" aria-labelledby="project-category-title">
      <header class="project-category-heading">
        <h2 id="project-category-title">${category.title}</h2>
        <span>${category.projectIds.length} projects</span>
      </header>
      ${category.projectIds.map((id) => renderProjectCard(projectsById.get(id), id === targetId)).join("")}
    </section>
  `;

  root.querySelectorAll(".project-card").forEach((card) => {
    const toggle = card.querySelector(".project-toggle");
    const detail = card.querySelector(".project-detail");

    toggle.addEventListener("click", () => {
      const isOpen = card.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.textContent = isOpen ? "Close case study" : "Read case study";
      detail.hidden = !isOpen;
    });
  });

  initProjectPageAnimations(root);

  if (targetId) {
    const target = document.getElementById(targetId);
    requestAnimationFrame(() => {
      if (!target.isConnected) return;
      target.querySelector(".project-toggle").focus({ preventScroll: true });
      target.scrollIntoView({ block: "start" });
    });
  }
}

function renderProjectCategory(category, index, activeCategory) {
  const isActive = category === activeCategory;
  return `
    <a class="project-category-link" href="#projects/${category.id}" ${isActive ? 'aria-current="page"' : ""}>
      <span class="section-kicker" aria-hidden="true">0${index + 1} / Discipline</span>
      <strong>${category.title}</strong>
      <span class="project-category-description">${category.description}</span>
      <span class="project-category-arrow" aria-hidden="true">↗</span>
    </a>
  `;
}

function renderProjectCard(project, isOpen) {
  return `
    <article
      class="project-card${project.media ? "" : " project-card--text"}${isOpen ? " is-open" : ""}"
      id="${project.id}"
      aria-labelledby="${project.id}-title"
      ${isOpen ? "" : "data-project-reveal"}
    >
      ${project.media ? `
        <div class="project-media project-${project.mediaType}">
          ${renderProjectMedia(project)}
        </div>
      ` : ""}

      <div class="project-content">
        <div class="project-kicker">${project.role}</div>
        <h3 id="${project.id}-title">${project.title}</h3>
        <p>${project.summary}</p>
        <ul class="tag-list">
          ${project.tags.map((tag) => `<li>${tag}</li>`).join("")}
        </ul>
        <div class="project-card-actions">
          <button
            class="project-toggle"
            type="button"
            aria-expanded="${isOpen}"
            aria-controls="${project.id}-detail"
          >
            ${isOpen ? "Close case study" : "Read case study"}
          </button>
          ${renderProjectLinks(project.links)}
        </div>
      </div>

      <section class="project-detail" id="${project.id}-detail" aria-labelledby="${project.id}-process" ${isOpen ? "" : "hidden"}>
        <header class="project-detail-intro">
          <span class="section-kicker">Case study / Project brief</span>
          <h4 id="${project.id}-process">From goal to implementation</h4>
          <p>${project.goals}</p>
        </header>
        <ol class="project-process" role="list">
          ${project.process.map((step, index) => `
            <li>
              <span class="project-step-number" aria-hidden="true">0${index + 1}</span>
              <div>
                <h5>${step.heading}</h5>
                <p>${step.body}</p>
              </div>
            </li>
          `).join("")}
        </ol>
        ${project.notes?.length ? `
          <details class="project-notes">
            <summary>Technical notes</summary>
            <div class="project-notes-content">
              ${project.notes.map((note) => `
                <section>
                  <h5>${note.heading}</h5>
                  <div>${note.body}</div>
                </section>
              `).join("")}
            </div>
          </details>
        ` : ""}
        ${renderProjectLinks(project.links)}
      </section>
    </article>
  `;
}

function renderProjectLinks(links) {
  if (!links.length) return "";

  return `
    <div class="project-links">
      ${links.map((link) => `<a href="${link.href}" target="_blank" rel="noopener" class="basic-info-btn">${link.label} <span aria-hidden="true">↗</span></a>`).join("")}
    </div>
  `;
}

function renderProjectMedia(project) {
  switch (project.mediaType) {
    case "image":
      return `
        <img
          src="${project.media}"
          alt="${project.title} preview"
          loading="lazy"
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
          Click on these links to find me around the web, or copy my email to get in touch. You can also view or download my resume from here.
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
          <a class="resume-download basic-info-btn" href="${resumePdf}" download>
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
