import lidarIntroImg from "../media/LiDARHomeScreenPic.png";
import mcdIntroImg from "../media/MCDHelperIntroPic.png";
import trafficVisualIntroPic from "../media/TrafficVisualizerIntroPic.png";
import ggkIntroPic from "../media/GGKIntroPic.png";
import tmoIntroPic from "../media/TMOIntroPic.png";
import ccropsIntroPic from "../media/CCropsIntroPic.png";
import fruitNinjaIntroPic from "../media/FruitNinjaIntroPic.png";
import questRandIntroPic from "../media/QuestRandIntroImg.png";

export const projects = [
  {
    id: "Procedural-Enviorment-Generator",
    title: "Procedural Enviorment Generator",
    role: "Personal / Acedemic algorithem project",
    summary:
      "An academic research project turned personal passion project to create a procedural enviorment generator" + 
      " complete with custom noise terrain, L-System trees, and a custom procedural triplanar shader." +
      " While this project is still in development to polish and add features, the core architecture" +
      " is built to be optimized, expandable and maintainable.",
    mediaType: "interface",
    media: null,
    tags: ["C#", "Unity", "Procedural generation", "Algorithms", "Game AI"],
    details:
      "Use this space for the project story: the problem, your design choices, implementation details, screenshots, links, and lessons learned.",
    links: [
      { label: "Repository", href: "https://github.com/LRLogan/IGME560/tree/main/Final%20proj/IGME560%20Final%20Proj" },
      { label: "Live Demo", href: "#" }
    ]
  },
  {
    id: "LiDAR-Terrain-Pipeline",
    title: "LiDAR Terrain Pipeline",
    role: "Academic GIS research project",
    summary:
      "A project on researching use cases, creating and implementing a pipeline for using LiDAR data to create terrain in a game engine. " +
      "As part of my GIS mapping class I created this pipeline to demonstrate its capabilities and integration with ArcGIS. " +
      "If you have an ArcGIS account you can view the story map, you can also create one for free :)",
    mediaType: "image",
    media: lidarIntroImg,
    tags: ["Unity", "Anaconda", "ArcGIS Pro", "ArcGIS Online", "GIS"],
    details:
      "Use this space for the project story: the problem, your design choices, implementation details, screenshots, links, and lessons learned.",
    links: [
      { label: "Repository", href: "https://storymaps.arcgis.com/stories/5c43ddafc91447228485b2308499539a" },
      { label: "Live Demo", href: "#" }
    ]
  },
  {
    id: "Ancient-Tracker-CLI",
    title: "Ancient Tracker CLI",
    role: "CLI and database personal project",
    summary:
      "I created a command line interface project to solve a problem I was facing while playing a game." + 
      "My program tokenizes user input and will query a database I wrote to preform various tasks. The core " +
      "command that I created as the main purpose of the program uses a simple greedy search algorithm to make" +
      " a best fit selection to recommend to the user",
    mediaType: "image",
    media: mcdIntroImg,
    tags: ["C#", "SQLite", "Git", "CLI", "Algorithms"],
    details:
      "Use this space for the project story: the problem, your design choices, implementation details, screenshots, links, and lessons learned.",
    links: [
      { label: "Repository", href: "https://github.com/LRLogan/MC-Dungeons-Ancient-Tracker"},
      { label: "Live Demo", href: "#" }
    ]
  },
  {
    id: "Traffic-Visualizer",
    title: "Traffic Visualizer",
    role: "Academic GIS research project",
    summary:
      "A simulation made for a research project that queries public data API’s for " +
      "traffic, road, and weather data and overlays it on a map of New York City. All " +
      "values are able to be changed in a simple UI and the values update the simulation in real time.",
    mediaType: "image",
    media: trafficVisualIntroPic,
    tags: ["C#", "data organization", "ArcGIS SDK", "Unity", "GIS"],
    details:
      "The expanded project view can grow into a richer feature area with additional media, architecture notes, metrics, and process screenshots.",
    links: [
      { label: "Repository", href: "#" },
      { label: "Case Study", href: "#" }
    ]
  },
  {
    id: "Gizmo-Go-Kartz",
    title: "Gizmo Go-Kartz",
    role: "Complete game internship project",
    summary:
      "In my role as Lead Remote Game Developer I was in charge of writing code to connect " +
      "to our backend API as well as manage the flow of code into our team Git repository. I " +
      "would preform code reviews to ensure code quality and both avoid and solve merge conflicts. ",
    mediaType: "image",
    media: ggkIntroPic,
    tags: ["C#", "Unity", "Git", "Teamwork", "Team leadership", "Game des / dev"],
    details:
      "The expanded project view can grow into a richer feature area with additional media, architecture notes, metrics, and process screenshots.",
    links: [
      { label: "Repository", href: "https://github.com/Nicky-Nice-Games/ggk-UnityProject" },
      { label: "Game website", href: "https://nickynicegames.com/ggk/home" }
    ]
  },
  {
    id: "TMOTOFOG",
    title: "The Murder of That One Frog Over There",
    role: "Academic game design and dev poject",
    summary:
      "The murder of that one frog over there is a group project that I create the " +
      "structure for in order to fulfill the requirements of creating a game for our class." + 
      "\n" + 
      "Fallowing the Agile process of Scrum, I lead my team, keeping them organized, delegating" +
      " tasks, and managing our Git repository. I also contribute quality code, creating" +
      " features in our game to accomplish various tasks like player movement, inventory " +
      "and interaction systems, game managers, and save data.",
    mediaType: "image",
    media: tmoIntroPic,
    tags: ["C#", "Unity", "Git", "Teamwork", "Team leadership", "Game des / dev", "UI/UX"],
    details:
      "The expanded project view can grow into a richer feature area with additional media, architecture notes, metrics, and process screenshots.",
    links: [
      { label: "Repository", href: "https://github.com/LRLogan/320-Game-project" },
      { label: "Game website", href: "https://r1icard.itch.io/the-murder-of-that-one-frog-over-there" }
    ]
  },
  {
    id: "Crazy-Crops",
    title: "Crazy Crops",
    role: "Academic game design and dev poject",
    summary:
      "A tabletop card game created in both physical form and Tabletop simulator where you " +
      "race to earn points and sabotage opponents in a fast paced card strategy game. This " +
      "was created with a small team from brainstorming to user testing to final product.",
    mediaType: "image",
    media: ccropsIntroPic,
    tags: ["UI/UX", "Game des / dev", "Teamwork", "AxureRP", "Photoshop"],
    details:
      "The expanded project view can grow into a richer feature area with additional media, architecture notes, metrics, and process screenshots.",
    links: [
      { label: "Repository", href: "#" },
      { label: "Case Study", href: "#" }
    ]
  },
  {
    id: "Fruit-Ninja",
    title: "Fruit Ninja",
    role: "Academic project",
    summary:
      "I created my own version of the game Fruit ninja that utilizes design patterns " +
      "like Object pooling and singletons to create an optimized game that uses vector " +
      "forces, Ray casts, and non-even random distribution.",
    mediaType: "image",
    media: fruitNinjaIntroPic,
    tags: ["Unity", "C#"],
    details:
      "The expanded project view can grow into a richer feature area with additional media, architecture notes, metrics, and process screenshots.",
    links: [
      { label: "Repository", href: "#" },
      { label: "Game on Itch.io", href: "https://lrlogan.itch.io/fruit-ninja" }
    ]
  },
  {
    id: "NPC-World",
    title: "NPC-World",
    role: "Academic project",
    summary:
      "NPC World showcases Perlin noise generated terrain, randomly placed obstacles," +
      " that conform to the terrain’s surface, custom agent vision system, and two " +
      "Autonomous agents. Each of these agents use a sum of behaviors as they interact " +
      "with the world to generate a direction vector.",
    mediaType: "simulation",
    media: null,
    tags: ["Unity", "C#", "Autonomous agent behavior", "Game AI"],
    details:
      "The expanded project view can grow into a richer feature area with additional media, architecture notes, metrics, and process screenshots.",
    links: [
      { label: "Repository", href: "#" },
      { label: "Case Study", href: "#" }
    ]
  },
  {
    id: "Quest-Randomizer",
    title: "Quest Randomizer",
    role: "Algorithmic personal project",
    summary:
      "I created a C# Program that can read in a CSV file with an organized format and sort" +
      " the data into a Doubly-linked-list-like data structure. The program can then create " +
      "a randomly generated quest line based upon the data in the linked list by checking " +
      "the availability of a sequential node.",
    mediaType: "image",
    media: questRandIntroPic,
    tags: ["C#", "Data organization"],
    details:
      "The expanded project view can grow into a richer feature area with additional media, architecture notes, metrics, and process screenshots.",
    links: [
      { label: "Repository", href: "https://github.com/LRLogan/PersonalTests/tree/main/MiscTests/YemenMansionQuestRndomizer" },
      { label: "Case Study", href: "#" }
    ]
  }
];

export const profile = {
  // Shows github activity
  githubUsername: "LRLogan"
};

export const skills = [
  {
    name: "GitHub",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
  },
  {
    name: "Gitlab",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg"
  },
  {
    name: "Git Bash",
    logo: "https://img.shields.io/badge/Bash-121011?style=for-the-badge&logo=gnu-bash&logoColor=white"
  },
  {
    name: "C#",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg"
  },
  {
    name: "C++",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"
  },
  {
    name: "MYSQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
  },
  {
    name: "HTML",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
  },
  {
    name: "CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
  },
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
  },
  {
    name: "Vite",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg"
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
  },
  {
    name: "Visual Studio",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg"
  },
  {
    name: "VS Code",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"
  },
  {
    name: "VIM",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vim/vim-original.svg"
  },
  {
    name: "Windows",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg"
  },
  {
    name: "Powershell",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powershell/powershell-original.svg"
  },
  {
    name: "Linux",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg"
  },
  {
    name: "Docker",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
  },
  {
    name: "Unity",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg"
  },
  {
    name: "Unreal Engine",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg"
  },
  {
    name: "Monogame",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/monogame/monogame-original.svg"
  },
  {
    name: "AxureRP",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/axurerp/axurerp-original.svg"
  },
  {
    name: "Photoshop",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg"
  },
  {
    name: "Substance 3D",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/substance3d/substance3d-original.svg"
  },
  {
    name: "Maya",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maya/maya-original.svg"
  },
  {
    name: "Anaconda",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/anaconda/anaconda-original.svg"
  },
  {
    name: "Github Actions",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg"
  }
];
