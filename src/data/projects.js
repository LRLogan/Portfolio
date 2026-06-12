import lidarIntroImg from "../media/LiDARHomeScreenPic.png";
import mcdIntroImg from "../media/MCDHelperIntroPic.png";
import trafficVisualIntroPic from "../media/TrafficVisualizerIntroPic.png";
import ggkIntroPic from "../media/GGKIntroPic.png";
import tmoIntroPic from "../media/TMOIntroPic.png";
import ccropsIntroPic from "../media/CCropsIntroPic.png";
import fruitNinjaIntroPic from "../media/FruitNinjaIntroPic.png";
import questRandIntroPic from "../media/QuestRandIntroImg.png";
import wireframeIntroPic from "../media/WireframeVisIntroImg.png";
import imgComingSoon from "../media/ImgComingSoon.png";

export const projects = [
  {
    id: "Wireframe-Heightmap-Visualizer",
    title: "Wireframe Heightmap Visualizer",
    role: "Personal project",
    summary:
      "An extension of my procedural environment generator project to create a wireframe heightmap visualizer that can be used in various applications. " +
      "Optimized with GPU instancing this project was made to be robust and self sufficient, with the ability to be used as a standalone program or easily integrated into other projects. " +
      "The visualizer can read in various types of heightmap data from CSV files to textures and images, and display it at a customizable resolution and scale.",
    mediaType: "image",
    media: wireframeIntroPic,
    tags: ["C#", "Unity", "Procedural generation", "Algorithms", "Game AI", "GPU instancing"],
    goals:
      "With the ambition of growing my procedural terrain generator into a larger project, I wanted to provide the user with an alternate visualization of the heightmap data. " +
      "Doubling as an eye catching piece of media for my portfolio, I set out to create a robust and self sufficient program to read in various types of heightmap data and display it in a wireframe format. ",
    notes: [
      {collapsable: false, heading: "Proof of Concept", body: "I already had sources of heightmap generation including my previous procedural terrain generator project, so I was able to get right into development " + 
        "of the wireframe mesh and animation pipeline. I started by instantiating spheres at each vertex point and cylinders to connect them. " +
        "Using this with a small heightmap I was able to achieve a working prototype, however this proved inefficient when it came to larger heightmaps. " + 
        "To solve this I slightly refactored my code to have an optional checkbox to use the spheres and more importantly drop object instantiation in favor for GPU instancing. " + 
        "This allowed me to achieve the same result with a much larger heightmap without any performance issues. " },
        {collapsable: false, heading: "Animation", body: "With the core functionality of the visualizer working, I wanted to add a simple animation to make it more visually appealing with the ability for the program to smoothly transition between maps. " +
          "To keep my program optimized I had built a modular and low dependency architecture, thus I was simply able to create some logic to lerp between the current heightmap and the next one, " + 
          "to then at each frame update the translation matrix of each edge, and feed that new data to the GPU to create the new instance. "},
        {collapsable: false, heading: "Expansion", body: "With my program now working as intended I wanted to make sure it can be used on its own or easily integrated into other projects. " +
          "To do this I simply generalized the input data into multiple forms supported by method overloading. Additionally I added the the functionality to read in height map data from images and CSV files. " +
          "With these new additions working, you can observe the result in the banner of this portfolio. Two maps created from my procedural terrain generator, one from a CSV file, and one from an image."}
    ],
    links: [
      { label: "Repository", href: "https://github.com/LRLogan/IGME560/tree/main/Final%20proj/IGME560%20Final%20Proj" }
    ]
  },
  {
    id: "Procedural-Environment-Generator",
    title: "Procedural Environment Generator",
    role: "Personal / Academic algorithm project",
    summary:
      "An academic research project turned personal passion project to create a procedural environment generator" + 
      " complete with custom noise terrain, L-System trees, and a custom procedural triplanar shader." +
      " While this project is still in development to polish and add features, the core architecture" +
      " is built to be optimized, expandable and maintainable.",
    mediaType: "image",
    media: imgComingSoon,
    tags: ["C#", "Unity", "Procedural generation", "Algorithms", "Game AI"],
    goals:
      "Goal and overarching problem statement along with personal role and contributions.",
    notes: [
      {collapsable: false, heading: "Goal", body: "Starting with the scope of a 3 week final project, I set out to create an interactive procedural environment generator " +
        "with custom noise generation, L-System trees, and a custom shader. I wanted to create a visually appealing environment that could be used in various applications such as games, simulations, or even just as a creative coding project. " +
        "During the 3 week process I was able to accomplish all of these goals with one caveat, and with the core architecture built to be optimized, expandable and maintainable, I have continued development on this project as a personal passion project to add features and polish. " + 
        "The caveat being that the triplanar shader did not achieve the quality I was aiming for. But none the less I now have a strong foundation to work off of for improvements." },
        {collapsable: true, heading: "Noise Generation", body: "The terrain generation is split into three overarching processes: noise generation, map creation and manipulation, " +
          "and mesh generation. These processes along with the biome / splat map assignments make up the entirety of the terrain generation pipeline, keeping all other components of the simulation like trees out of the question." + 
        "<br></br>" +
        "Noise generation's core behavior is using Fractional Brownian Motion to create a summation of continuous, layered noise fields. It uses math to determine a single point in space according to the input values of the FbM. It performs " +
        "multiple calculations to synthesize the direct values that are given to the raw height map including a smoothstep and fractional functions to create smooth, continuous terrain that influences later generated values. " +
        "<br></br>" +
        "In the map creation and manipulation process the raw heights are given to a compiler function to apply cliff logic, distortions in the methodology of Domain Warping, and replacing the values in the height map with these " +
        "newly modified ones. This is also where a call to generate the texture is located. In a more optimized version of the program this texture generation process would happen in parallel with the mesh generation which is also called from here. " +
        "<br></br>" +
        "Finally in the mesh generation stage of the pipeline, these new height values are passed to a mesh generation function that creates the triangles that will make up the mesh and will then connect them. " +
        "Once this is finished the texture is assigned and the terrain generation is complete. "
      },
      {collapsable: true, heading: "L-System Tree Generation", body: 
        "Tree generation is completely isolated from the terrain generated pipeline, and only relies on the existence of the finalized height map, thus could also be run in parallel to the shader creation for an optimized version, but for safety and simplicity it is called in the scene manager after " +
        "the terrain generation pipeline if finished. The TreeGen script has four main regions: Grid surveying, Tree creation using L-Systems, Mesh generation, and some helper methods / classes to hold valuable data for the generation algorithms. " + 
        "<br></br>" +
        "First a simple perlin noise map is generated and overlaid onto the height map. This overlay is broken into grids with a parameter size (more on this later in clever implementations) and an average value is taken for each cell.This value is then given to the corresponding " + 
        "vertices on the heightmap, multiplied by a density modifier, and later used to place that amount of trees in the sector. With these values now calculated, the height map is checked for suitable spawn locations in that sector from a given rule set. Once a spot is picked the L-System tree creation can begin, and repeat until all sectors have been populated with the designated amount of trees. " + 
        "<br></br>" +
        "There is a set of L-System rules declared and set in the file that hold tree patterns the generator can randomly choose from. Similarly to the L-System presented in class this adaptation builds the string of rules, dispatches them and performs transformations and additions accordingly. " +
        "The key difference being that my system is both in 3D and uses splines to create the tree structure. Once this tree structure is created, mesh generation takes over." + 
        "<br></br>" +
        "While the code for this mesh generation is far more complex than the mesh generation for the terrain, the explanation is rather simple. Each segment of the tree referred to as a branch is generated as a cylinder with a given radius. This radius is also deteriorating according to distance " +
        "rules for some additional realism, and controlled by a constant float value. These meshes are then given a parent and texture. " + 
        "<br></br>" +
        "As mentioned there are some helper classes / methods, but they mostly just serve the purpose of data containers with simple functionality." 
      },
      {collapsable: true, heading: "Biome and Splat map Generation", body:
        "From being called in the middle of the terrain generation pipeline, this sub process assures biometric values are assigned to each terrain vertex as well as texture weights used in the shadergraph. The end goal of this pipeline is to create a splat map that contains the weighted texture values. " +
        "To do this, the SplatMapGen script simply samples biometric values generated by BiomeGen to correlate those values to texture values based upon a set of specified rules in order to create a weight for said texture. At the end, all the values for the different textures are added together for each " + 
        "vertex and assigned to the corresponding height map vertex. This is the data passed into the shadergraph to actually construct the shader. "
      },
      {collapsable: true, heading: "Clever implementations", body:
        "In terms of clever implementations, there are two noteworthy mentions." +
        "<br></br>" +
        "First there is the derivative based FbM created by Inigo Quilez. Instead of simply returning a height value for the vertex on the height map at a given index, this configuration allows for an integrated calculation of both the slope and derivative of the vertex. Although ultimately overridden in the Domain Warping process, this raw value can be useful in the future, " +
        "such as influencing the Domain Warp algorithm, something I would like to incorporate in a later variation of the project. Also thanks to Inigo’s great notes it was a rather effortless implementation." +
        "<br></br>" +
        "Secondly is a process for scattering trees that I had created while brainstorming a good solution. This system simply uses an overlay grid on the overlay perlin noise, breaking it up into cells. While at a super low grid scale, average values will appear to blend together, creating minimal unique distribution, and at super high values the noise and height map resolution " +
        "may seem pixel for pixel, creating a very realistic distribution, this system allows for interpolation between the two extremes. Thus allowing developers to hand select both the desired attributes native with perlin noise like resolution and frequency, and from this system, the fidelity to the noise patterns."
      },
      { collapsable: true, heading: "Resources / Reference Materials", body: `
        Throughout development I relied on a combination of research papers, technical articles, tutorials, and open-source projects to better understand procedural generation techniques, terrain synthesis, L-Systems, domain warping, and terrain texturing workflows. The following resources were particularly influential during development:
        <br></br>
        • Procedural generation visualization and debugging techniques:
        <br>
        <a href="https://www.youtube.com/watch?v=Y19Mw5YsgjI" target="_blank">
          Procedural Generation Fixes and Visualization
        </a>
        <br></br>
        • Fractal Brownian Motion (FBM), Domain Warping, and foundational procedural noise research by Inigo Quilez:
        <br>
        <a href="https://iquilezles.org/articles/fbm/" target="_blank">
          FBM Article
        </a>
        <br>
        <a href="https://iquilezles.org/articles/warp/" target="_blank">
          Domain Warping Article
        </a>
        <br>
        <a href="https://iquilezles.org/" target="_blank">
          Inigo Quilez Website
        </a>
        <br></br>
        • Terrain generation and painting workflows:
        <br>
        <a href="https://www.youtube.com/watch?v=BFld4EBO2RE" target="_blank">
          FBM and Terrain Painting
        </a>
        <br></br>
        • L-System theory and procedural plant generation:
        <br>
        <a href="https://scispace.com/pdf/the-algorithmic-beauty-of-plants-4f9yunhil9.pdf" target="_blank">
          The Algorithmic Beauty of Plants
        </a>
        <br></br>
        • Practical implementation of spline-based L-System branches:
        <br>
        <a href="https://www.youtube.com/watch?v=Sf6k6kvpRu4" target="_blank">
          Using Splines with L-Systems
        </a>
        <br></br>
        • Turtle graphics implementation for Lindenmayer systems:
        <br>
        <a href="https://www.fraculation.com/blog/lindenmayer-implementation" target="_blank">
          Lindenmayer System Implementation
        </a>
        <br></br>
        • Terrain splatmapping and texture blending:
        <br>
        <a href="https://www.youtube.com/watch?v=uYIygCqId2Y" target="_blank">
          Splatmap Tutorial
        </a>
        <br><br>
        • Additional inspiration discovered later in development:
        <br>
        <a href="https://wiskered.itch.io/terraforge" target="_blank">
          TerraForge
        </a>
        <br></br>
  `}
    ],
    links: [
      { label: "Repository", href: "https://github.com/LRLogan/IGME560/tree/main/Final%20proj/IGME560%20Final%20Proj" }
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
    goals:
      "Goal and overarching problem statement along with personal role and contributions.",
    notes: [
      {collapsable: false, heading: "TBD", body: "TBD" }
    ],
    links: [
      { label: "Repository", href: "https://storymaps.arcgis.com/stories/5c43ddafc91447228485b2308499539a" }
    ]
  },
  {
    id: "Ancient-Tracker-CLI",
    title: "Ancient Tracker CLI",
    role: "CLI and database personal project",
    summary:
      "I created a command line interface project to solve a problem I was facing while playing a game. " + 
      "My program tokenizes user input and will query a database I wrote to perform various tasks. The core " +
      "command that I created as the main purpose of the program uses a simple greedy search algorithm to make" +
      " a best fit selection to recommend to the user.",
    mediaType: "image",
    media: mcdIntroImg,
    tags: ["C#", "SQLite", "Git", "CLI", "Algorithms"],
    goals:
      "Goal and overarching problem statement along with personal role and contributions.",
    notes: [
      {collapsable: false, heading: "TBD", body: "TBD" }
    ],
    links: [
      { label: "Repository", href: "https://github.com/LRLogan/MC-Dungeons-Ancient-Tracker"}
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
    goals:
      "Goal and overarching problem statement along with personal role and contributions.",
    notes: [
      {collapsable: false, heading: "TBD", body: "TBD" }
    ],
    links: [
      { label: "Repository", href: "https://github.com/LRLogan/IGME689/tree/main/NewProj/IGME689" }
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
    goals:
      "Goal and overarching problem statement along with personal role and contributions.",
    notes: [
      {collapsable: false, heading: "TBD", body: "TBD" }
    ],
    links: [
      { label: "Repository", href: "https://github.com/Nicky-Nice-Games/ggk-UnityProject" },
      { label: "Game website", href: "https://nickynicegames.com/ggk/home" }
    ]
  },
  {
    id: "TMOTOFOG",
    title: "The Murder of That One Frog Over There",
    role: "Academic game design and dev project",
    summary:
      "The Murder of That One Frog Over There is a group project that I created the " +
      "structure for in order to fulfill the requirements of creating a game for our class." + 
      "\n" + 
      "Fallowing the agile process of Scrum, I lead my team keeping them organized, delegating" +
      " tasks, and managing our Git repository. I also contributed quality code, creating" +
      " features in our game to accomplish various tasks like player movement, inventory " +
      "and interaction systems, game managers, and save data.",
    mediaType: "image",
    media: tmoIntroPic,
    tags: ["C#", "Unity", "Git", "Teamwork", "Team leadership", "Game des / dev", "UI/UX"],
    goals:
      "Goal and overarching problem statement along with personal role and contributions.",
    notes: [
      {collapsable: false, heading: "TBD", body: "TBD" }
    ],
    links: [
      { label: "Repository", href: "https://github.com/LRLogan/320-Game-project" },
      { label: "Game website", href: "https://r1icard.itch.io/the-murder-of-that-one-frog-over-there" }
    ]
  },
  {
    id: "Crazy-Crops",
    title: "Crazy Crops",
    role: "Academic game design and dev project",
    summary:
      "A tabletop card game created in both physical form and Tabletop Simulator where you " +
      "race to earn points and sabotage opponents in a fast paced card strategy game. This " +
      "was created with a small team from brainstorming to user testing to final product.",
    mediaType: "image",
    media: ccropsIntroPic,
    tags: ["UI/UX", "Game des / dev", "Teamwork", "AxureRP", "Photoshop"],
    goals:
      "Goal and overarching problem statement along with personal role and contributions.",
    notes: [
      {collapsable: false, heading: "TBD", body: "TBD" }
    ],
    links: [
    ]
  },
  {
    id: "Fruit-Ninja",
    title: "Fruit Ninja",
    role: "Academic project",
    summary:
      "I created my own version of the game Fruit ninja that utilizes design patterns " +
      "like object pooling and singletons to create an optimized game that uses vector " +
      "forces, ray casts, and non-even random distribution.",
    mediaType: "image",
    media: fruitNinjaIntroPic,
    tags: ["Unity", "C#"],
    goals:
      "Goal and overarching problem statement along with personal role and contributions.",
    notes: [
      {collapsable: false, heading: "TBD", body: "TBD" }
    ],
    links: [
      { label: "Game on Itch.io", href: "https://lrlogan.itch.io/fruit-ninja" }
    ]
  },
  {
    id: "NPC-World",
    title: "NPC-World",
    role: "Academic project",
    summary:
      "NPC World showcases Perlin noise generated terrain, randomly placed obstacles" +
      " that conform to the terrain’s surface, custom agent vision system, and two " +
      "Autonomous Agents. Each of these agents use a sum of behaviors as they interact " +
      "with the world to generate a direction vector.",
    mediaType: "image",
    media: imgComingSoon,
    tags: ["Unity", "C#", "Autonomous agent behavior", "Game AI"],
    goals:
      "Goal and overarching problem statement along with personal role and contributions.",
    notes: [
      {collapsable: false, heading: "TBD", body: "TBD" }
    ],
    links: [
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
    goals:
      "Goal and overarching problem statement along with personal role and contributions.",
    notes: [
      {collapsable: false, heading: "TBD", body: "TBD" }
    ],
    links: [
      { label: "Repository", href: "https://github.com/LRLogan/PersonalTests/tree/main/MiscTests/YemenMansionQuestRndomizer" }
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
