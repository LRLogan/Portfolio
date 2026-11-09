import lidarIntroImg from "../media/LiDARHomeScreenPic.png";
import mcdIntroImg from "../media/MCDHelperIntroPic.png";
import trafficVisualIntroPic from "../media/TrafficVisualizerIntroPic.png";
import ggkIntroPic from "../media/GGKIntroPic.png";
import tmoIntroPic from "../media/TMOIntroPic.png";
import ccropsIntroPic from "../media/CCropsIntroPic.png";
import fruitNinjaIntroPic from "../media/FruitNinjaIntroPic.png";
import questRandIntroPic from "../media/QuestRandIntroImg.png";
import wireframeIntroPic from "../media/WireframeVisIntroImg.png";

// Display order within each discipline is editorial.
export const projectCategories = [
  {
    id: "games",
    title: "Game Development & Design",
    description: "Gameplay systems, team development, and playtesting",
    projectIds: ["Gizmo-Go-Kartz", "TMOTOFOG", "Crazy-Crops", "Fruit-Ninja"]
  },
  {
    id: "simulation",
    title: "Simulation & GIS",
    description: "Terrain pipelines, live data, and autonomous agents",
    projectIds: ["LiDAR-Terrain-Pipeline", "Traffic-Visualizer", "NPC-World"]
  },
  {
    id: "tools",
    title: "Tools & Systems",
    description: "Rendering, procedural generation, and developer tools",
    projectIds: ["Wireframe-Heightmap-Visualizer", "Procedural-Environment-Generator", "Ancient-Tracker-CLI", "Quest-Randomizer"]
  }
];

export const featuredProjectIds = ["Gizmo-Go-Kartz", "Wireframe-Heightmap-Visualizer", "LiDAR-Terrain-Pipeline"];

export const projects = [
  {
    id: "Wireframe-Heightmap-Visualizer",
    title: "Wireframe Heightmap Visualizer",
    role: "Solo rendering tool",
    summary: "A Unity visualizer that renders heightmaps as animated wireframes at configurable resolutions. GPU instancing made it practical to render larger maps, including the animation on this portfolio’s intro.",
    mediaType: "image",
    media: wireframeIntroPic,
    tags: ["C#", "Unity", "Procedural generation", "Algorithms", "Game AI", "GPU instancing"],
    goals: "I wanted a reusable way to visualize the height data from my procedural terrain generator and other sources as animated wireframes.",
    process: [
      {
        heading: "Prototype the geometry",
        body: "I placed spheres at each vertex and joined them with cylinders. That proved the idea on a small map, but creating a separate object for every edge became inefficient at larger resolutions."
      },
      {
        heading: "Move rendering to the GPU",
        body: "I made vertex markers optional and switched edge rendering to GPU instancing. This let me render substantially larger heightmaps with the same wireframe treatment."
      },
      {
        heading: "Animate and generalize",
        body: "I interpolated between heightmaps and updated each edge’s transform matrix per frame. Then I added CSV and image inputs alongside generated terrain. The portfolio banner demonstrates all three sources."
      }
    ],
    links: [
      { label: "Repository", href: "https://github.com/LRLogan/IGME560/tree/main/Final%20proj/IGME560%20Final%20Proj" }
    ]
  },
  {
    id: "Procedural-Environment-Generator",
    title: "Procedural Environment Generator",
    role: "Solo procedural generation project",
    summary: "A Unity environment generator with custom terrain noise, spline-based L-System trees, and biome-driven texturing. It began as a three-week academic project and continues as a personal build.",
    tags: ["C#", "Unity", "Procedural generation", "Algorithms", "Game AI"],
    goals: "I scoped a three-week prototype around three systems: generate terrain from noise, populate it with L-System trees, and texture it with a custom triplanar shader.",
    process: [
      {
        heading: "Build the terrain pipeline",
        body: "I layered fractal Brownian motion, applied cliff logic and domain warping, then converted the resulting heightmap to a mesh. Separate stages gave each part of the pipeline a clear input and output."
      },
      {
        heading: "Decouple vegetation",
        body: "I used the finished heightmap to find valid planting locations. A noise grid controls tree density, and 3D L-System rules generate the branch structure with splines before it becomes a mesh."
      },
      {
        heading: "Assess the prototype",
        body: "The prototype generated terrain, trees, and biome texture weights. The shader fell short of my visual target, so I kept the generator as a personal project for further refinement."
      }
    ],
    notes: [
      { heading: "Noise Generation", body: "The terrain generation is split into three overarching processes: noise generation, map creation and manipulation, " +
          "and mesh generation. These processes along with the biome / splat map assignments make up the entirety of the terrain generation pipeline, keeping all other components of the simulation like trees out of the question." +
        "<br><br>" +
        "Noise generation's core behavior is using Fractional Brownian Motion to create a summation of continuous, layered noise fields. It uses math to determine a single point in space according to the input values of the FbM. It performs " +
        "multiple calculations to synthesize the direct values that are given to the raw height map including a smoothstep and fractional functions to create smooth, continuous terrain that influences later generated values. " +
        "<br><br>" +
        "In the map creation and manipulation process the raw heights are given to a compiler function to apply cliff logic, distortions in the methodology of Domain Warping, and replacing the values in the height map with these " +
        "newly modified ones. This is also where a call to generate the texture is located. In a more optimized version of the program this texture generation process would happen in parallel with the mesh generation which is also called from here. " +
        "<br><br>" +
        "Finally in the mesh generation stage of the pipeline, these new height values are passed to a mesh generation function that creates the triangles that will make up the mesh and will then connect them. " +
        "Once this is finished the texture is assigned and the terrain generation is complete. "
      },
      { heading: "L-System Tree Generation", body:
        "Tree generation is completely isolated from the terrain generated pipeline, and only relies on the existence of the finalized height map, thus could also be run in parallel to the shader creation for an optimized version, but for safety and simplicity it is called in the scene manager after " +
        "the terrain generation pipeline if finished. The TreeGen script has four main regions: Grid surveying, Tree creation using L-Systems, Mesh generation, and some helper methods / classes to hold valuable data for the generation algorithms. " +
        "<br><br>" +
        "First a simple perlin noise map is generated and overlaid onto the height map. This overlay is broken into grids with a parameter size (more on this later in clever implementations) and an average value is taken for each cell.This value is then given to the corresponding " +
        "vertices on the heightmap, multiplied by a density modifier, and later used to place that amount of trees in the sector. With these values now calculated, the height map is checked for suitable spawn locations in that sector from a given rule set. Once a spot is picked the L-System tree creation can begin, and repeat until all sectors have been populated with the designated amount of trees. " +
        "<br><br>" +
        "There is a set of L-System rules declared and set in the file that hold tree patterns the generator can randomly choose from. Similarly to the L-System presented in class this adaptation builds the string of rules, dispatches them and performs transformations and additions accordingly. " +
        "The key difference being that my system is both in 3D and uses splines to create the tree structure. Once this tree structure is created, mesh generation takes over." +
        "<br><br>" +
        "While the code for this mesh generation is far more complex than the mesh generation for the terrain, the explanation is rather simple. Each segment of the tree referred to as a branch is generated as a cylinder with a given radius. This radius is also deteriorating according to distance " +
        "rules for some additional realism, and controlled by a constant float value. These meshes are then given a parent and texture. " +
        "<br><br>" +
        "As mentioned there are some helper classes / methods, but they mostly just serve the purpose of data containers with simple functionality."
      },
      { heading: "Biome and Splat map Generation", body:
        "From being called in the middle of the terrain generation pipeline, this sub process assures biometric values are assigned to each terrain vertex as well as texture weights used in the shadergraph. The end goal of this pipeline is to create a splat map that contains the weighted texture values. " +
        "To do this, the SplatMapGen script simply samples biometric values generated by BiomeGen to correlate those values to texture values based upon a set of specified rules in order to create a weight for said texture. At the end, all the values for the different textures are added together for each " +
        "vertex and assigned to the corresponding height map vertex. This is the data passed into the shadergraph to actually construct the shader. "
      },
      { heading: "Clever implementations", body:
        "In terms of clever implementations, there are two noteworthy mentions." +
        "<br><br>" +
        "First there is the derivative based FbM created by Inigo Quilez. Instead of simply returning a height value for the vertex on the height map at a given index, this configuration allows for an integrated calculation of both the slope and derivative of the vertex. Although ultimately overridden in the Domain Warping process, this raw value can be useful in the future, " +
        "such as influencing the Domain Warp algorithm, something I would like to incorporate in a later variation of the project. Also thanks to Inigo’s great notes it was a rather effortless implementation." +
        "<br><br>" +
        "Secondly is a process for scattering trees that I had created while brainstorming a good solution. This system simply uses an overlay grid on the overlay perlin noise, breaking it up into cells. While at a super low grid scale, average values will appear to blend together, creating minimal unique distribution, and at super high values the noise and height map resolution " +
        "may seem pixel for pixel, creating a very realistic distribution, this system allows for interpolation between the two extremes. Thus allowing developers to hand select both the desired attributes native with perlin noise like resolution and frequency, and from this system, the fidelity to the noise patterns."
      },
      { heading: "Resources / Reference Materials", body: `
        Throughout development I relied on a combination of research papers, technical articles, tutorials, and open-source projects to better understand procedural generation techniques, terrain synthesis, L-Systems, domain warping, and terrain texturing workflows. The following resources were particularly influential during development:
        <br><br>
        • Procedural generation visualization and debugging techniques:
        <br>
        <a href="https://www.youtube.com/watch?v=Y19Mw5YsgjI" target="_blank">
          Procedural Generation Fixes and Visualization
        </a>
        <br><br>
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
        <br><br>
        • Terrain generation and painting workflows:
        <br>
        <a href="https://www.youtube.com/watch?v=BFld4EBO2RE" target="_blank">
          FBM and Terrain Painting
        </a>
        <br><br>
        • L-System theory and procedural plant generation:
        <br>
        <a href="https://scispace.com/pdf/the-algorithmic-beauty-of-plants-4f9yunhil9.pdf" target="_blank">
          The Algorithmic Beauty of Plants
        </a>
        <br><br>
        • Practical implementation of spline-based L-System branches:
        <br>
        <a href="https://www.youtube.com/watch?v=Sf6k6kvpRu4" target="_blank">
          Using Splines with L-Systems
        </a>
        <br><br>
        • Turtle graphics implementation for Lindenmayer systems:
        <br>
        <a href="https://www.fraculation.com/blog/lindenmayer-implementation" target="_blank">
          Lindenmayer System Implementation
        </a>
        <br><br>
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
        <br><br>
  `}
    ],
    links: [
      { label: "Repository", href: "https://github.com/LRLogan/IGME560/tree/main/Final%20proj/IGME560%20Final%20Proj" }
    ]
  },
  {
    id: "LiDAR-Terrain-Pipeline",
    title: "LiDAR Terrain Pipeline",
    role: "Solo geospatial research project",
    summary: "A pipeline for reconstructing real-world terrain in Unity from public LiDAR data. The project traces the conversion from point cloud to an engine-ready heightmap.",
    mediaType: "image",
    media: lidarIntroImg,
    tags: ["Unity", "Anaconda", "ArcGIS Pro", "ArcGIS Online", "GIS"],
    goals: "I wanted to turn a real-world LiDAR scan into Unity terrain while retaining the shape of the ground through each format conversion.",
    process: [
      {
        heading: "Isolate the ground",
        body: "I sourced a LAZ point cloud from USGS, prepared it in ArcGIS Pro, and filtered out non-ground returns. Rasterizing the remaining points gave me a digital elevation model."
      },
      {
        heading: "Bridge the format gap",
        body: "Unity’s terrain importer needed a RAW heightmap. I normalized the elevation data, exported a 16-bit TIFF from ArcGIS Pro, then used GDAL to verify and convert it to RAW."
      },
      {
        heading: "Reconstruct the terrain",
        body: "I imported the RAW file into a Unity terrain object and adjusted the import settings to reconstruct the untextured landscape. I documented the full pipeline in the ArcGIS StoryMap."
      }
    ],
    notes: [
      { heading: "Overview of LiDAR",
        body: "LiDAR has many uses throughout many industries, and In Game and Simulation design " +
        "and development it has been used to take 3D scans of real environments and import them into a digital world, " +
        "model characters and props, and much more. As an added benefit, it speeds up production pipelines with seamless " +
        "integration and can be done with high enough precision to produce hyper-realistic detail." +
        "<br><br>" +
        "For the purpose of this project we will just focus on the use case of using the data to digitally reconstruct real world terrain."
      },
      { heading: "Conversion steps and import settings",
        body: "In this section of the project I will document, share, and explain my process and results I encounter while going through " +
        "one of many pipelines of creating terrain in game engine that accurately represents real world terrain from LiDAR data." +
        "<h4>Data acquisition and preparation</h4>" +
        `Data was procured through the USGS free data source downloader. Found <a href="https://apps.nationalmap.gov/downloader/" target="_blank">here</a>` +
        "After searching for a general area and filtering by data type I found a LAZ file holding a point cloud of some terrain. " +
        "Before importing into Unity I wanted to ensure my data was prepared so I converted the LAZ file to a LASD format " +
        "in order to visualize it in ArcGIS Pro." +
        "<br><br>" +
        "Once this point cloud is set up the next step is to create a DEM in order to isolate the raw terrain data. It can be difficult to see at times but if " +
        "zoomed in on the correct locations the point cloud holds foliage data most notably trees, something we do not want to effect the DEM." +
        "<br><br>" +
        "Creating the DEM is as simple as filtering out all points that are not the ground, and rasterizing the data." +
        "<h4>Core pipeline</h4>" +
        "These next processes were the most challenging as I had to do quite a bit of experimenting on what would work." +
        "Now that I have the DEM I needed to port that raw data into Unity, and the first thing to note is that to directly " +
        "import a file into a Unity terrain object, it requires that data to be in a RAW file format.  However converting the " +
        "DEM into such a format is not a direct process when using ArcGIS Pro. This is because ArcGIS Pro transforms raw height " +
        "data behind the scenes in terms of normalizing, conforming to different coordinate spaces, and stretches data to show a " +
        "clean visualization. None of which are stored in the raw data, so I had to preform these manipulations by hand in order " +
        "to keep the fidelity of the terrain across software." +
        "The final process went as detailed below." +
        "<br><br>" +
        "Copy as TIFF" +
        "This first step copied the raw date from the DEM and saved it in a TIFF file format where I can save the height data inside as larger 32 bit unsigned integers." +
        "<br><br>" +
        "Scale / Normalize" +
        "Due to the raw values being very small (in the range of 1 to1 * 10^-5) I needed to scale them up to be classified as valid terrain heights while still " +
        "being normalized so the fallowing equation was used: ('DEM' - minValue) / (maxValue - minValue) * scale" +
        "<br><br>" +
        "Export as TIFF" +
        "ArcGIS does not natively support exporting raster data in a RAW format so I exported the scaled / normalized data as a TIFF file holding 16 bit unsigned " +
        "integers (what Unity desires for a terrain object" +
        "<br><br>" +
        "Convert to RAW" +
        "Now that the TIFF file holds all the needed data, the last step in this process was converting the TIFF file into a RAW file. For this an external tool " +
        "must be used. My choice was using a built in tool in Anaconda (a python source distribution with many built in features). By using the GDAL package I " +
        "was able to quickly both verify the file contents as well as convert it to a RAW format." +
        "<br><br>" +
        "<h4>Importing into Unity and creating the terrain</h4>" +
        "With a RAW file ready to go I set up a new Unity scene with an empty terrain object." +
        "<br><br>" +
        "After some value tweaking I was then left with the untextured, terrain in the scene. This marked a large milestone of the overall process as " +
        "I had successfully taken real world terrain data through LiDAR and recreated it in Unity"
      }

    ],
    links: [
      { label: "ArcGIS StoryMap", href: "https://storymaps.arcgis.com/stories/5c43ddafc91447228485b2308499539a" }
    ]
  },
  {
    id: "Ancient-Tracker-CLI",
    title: "Ancient Tracker CLI",
    role: "Solo C# and SQLite tool",
    summary: "A command-line planner for Minecraft Dungeons Ancient Hunts. It queries game data and recommends item combinations based on rune requirements and player constraints.",
    mediaType: "image",
    media: mcdIntroImg,
    tags: ["C#", "SQLite", "Git", "CLI", "Algorithms"],
    goals: "I wanted to answer two questions from one tool: which items supply the runes I need, and where can I find those items?",
    process: [
      {
        heading: "Model the game data",
        body: "I built a SQLite database around Ancients, runes, items, and maps so the same data could answer lookup and recommendation queries."
      },
      {
        heading: "Design the command interface",
        body: "I tokenized input to handle commands and flags. Feedback identifies the part of an invalid command that failed, and a built-in help command lists supported syntax."
      },
      {
        heading: "Generate recommendations",
        body: "I used a greedy search to make a best-fit selection under the chosen rune requirements and constraints. The repository documents commands and provides a downloadable build."
      }
    ],
    links: [
      { label: "Repository", href: "https://github.com/LRLogan/MC-Dungeons-Ancient-Tracker"}
    ]
  },
  {
    id: "Traffic-Visualizer",
    title: "Traffic Visualizer",
    role: "Academic GIS simulation",
    summary: "A Unity simulation that overlays New York City traffic, road, and weather data on an ArcGIS map. The interface lets users change inputs and see the simulation update in real time.",
    mediaType: "image",
    media: trafficVisualIntroPic,
    tags: ["C#", "data organization", "ArcGIS SDK", "Unity", "GIS"],
    goals: "The research project explored how public road, traffic, and weather data could be brought together in an interactive city simulation.",
    process: [
      {
        heading: "Connect public data",
        body: "The simulation queries public data for road, traffic, and weather information. The Unity project also includes a parser for road-count data."
      },
      {
        heading: "Map the road network",
        body: "The road-building code turns geographic road data into lines that can be displayed over the ArcGIS map of New York City."
      },
      {
        heading: "Expose simulation controls",
        body: "The interface lets users adjust values and see the map and simulation update in real time, so they can explore different conditions directly."
      }
    ],
    links: [
      { label: "Repository", href: "https://github.com/LRLogan/IGME689/tree/main/NewProj/IGME689" }
    ]
  },
  {
    id: "Gizmo-Go-Kartz",
    title: "Gizmo Go-Kartz",
    role: "Lead Remote Game Developer · Internship",
    summary: "I integrated backend APIs into a Unity game and managed the team’s Git workflow as Lead Remote Game Developer.",
    mediaType: "image",
    media: ggkIntroPic,
    tags: ["C#", "Unity", "Git", "Teamwork", "Team leadership", "Game des / dev"],
    goals: "As Lead Remote Game Developer, I was responsible for connecting the Unity game to the backend API and coordinating how code landed in the shared repository.",
    process: [
      {
        heading: "Integrate the backend",
        body: "I wrote the Unity-side code that connects the game to the backend API. That was my primary implementation responsibility on the project."
      },
      {
        heading: "Review incoming code",
        body: "I reviewed team contributions for code quality and managed how changes entered the shared Git repository."
      },
      {
        heading: "Keep changes moving",
        body: "I worked to prevent merge conflicts and resolved the ones that surfaced as the team integrated its work. The game website shows the completed team project."
      }
    ],
    links: [
      { label: "Repository", href: "https://github.com/Nicky-Nice-Games/ggk-UnityProject" },
      { label: "Game website", href: "https://nickynicegames.com/ggk/home" }
    ]
  },
  {
    id: "TMOTOFOG",
    title: "The Murder of That One Frog Over There",
    role: "Team lead and gameplay programmer",
    summary: "I led an academic Unity game team and implemented core systems for player movement, inventory, interactions, game management, and save data.",
    mediaType: "image",
    media: tmoIntroPic,
    tags: ["C#", "Unity", "Git", "Teamwork", "Team leadership", "Game des / dev", "UI/UX"],
    goals: "I set up the project structure so our team could meet the assignment requirements and collaborate on a complete game.",
    process: [
      {
        heading: "Organize the team",
        body: "I used Scrum to organize the work, delegated tasks, and managed the shared Git repository."
      },
      {
        heading: "Build the player systems",
        body: "I implemented player movement, inventory, and interactions, covering how players navigate the game and use its objects."
      },
      {
        heading: "Support the full game",
        body: "I also built game managers and save data. The team’s playable build is available on itch.io."
      }
    ],
    links: [
      { label: "Repository", href: "https://github.com/LRLogan/320-Game-project" },
      { label: "Game website", href: "https://r1icard.itch.io/the-murder-of-that-one-frog-over-there" }
    ]
  },
  {
    id: "Crazy-Crops",
    title: "Crazy Crops",
    role: "Team tabletop design project",
    summary: "A fast-paced strategy card game about earning points and sabotaging opponents, built as a physical game and in Tabletop Simulator.",
    mediaType: "image",
    media: ccropsIntroPic,
    tags: ["UI/UX", "Game des / dev", "Teamwork", "AxureRP", "Photoshop"],
    goals: "Our small team wanted to create a fast-paced card game where players balance earning points with disrupting their opponents.",
    process: [
      {
        heading: "Shape the game loop",
        body: "We brainstormed the rules around two competing actions: advancing your own score and getting in another player’s way."
      },
      {
        heading: "Test the design with players",
        body: "We took the game through user testing as part of development, putting the rules and pace in front of players."
      },
      {
        heading: "Deliver both formats",
        body: "We completed a physical version of the card game and a digital version in Tabletop Simulator."
      }
    ],
    links: [
    ]
  },
  {
    id: "Fruit-Ninja",
    title: "Fruit Ninja",
    role: "Solo gameplay programming project",
    summary: "A Unity recreation of Fruit Ninja built around object pooling, raycast-based slicing, and weighted randomness.",
    mediaType: "image",
    media: fruitNinjaIntroPic,
    tags: ["Unity", "C#"],
    goals: "I recreated Fruit Ninja as a Unity exercise in coordinating physics, input, and reusable gameplay objects.",
    process: [
      {
        heading: "Build spawning and slicing",
        body: "I used vector forces to launch fruit and raycasts to detect when the player sliced it."
      },
      {
        heading: "Reuse gameplay objects",
        body: "I applied object pooling to reuse objects across repeated spawns and used singletons for shared game logic."
      },
      {
        heading: "Tune spawn variation",
        body: "I used a weighted random distribution to control which objects appeared. The playable build is available on itch.io."
      }
    ],
    links: [
      { label: "Game on Itch.io", href: "https://lrlogan.itch.io/fruit-ninja" }
    ]
  },
  {
    id: "NPC-World",
    title: "NPC-World",
    role: "Solo game AI project",
    summary: "A Unity prototype with custom vision and steering for two autonomous agents on procedurally generated terrain.",
    tags: ["Unity", "C#", "Autonomous agent behavior", "Game AI"],
    goals: "I wanted to demonstrate how autonomous agents could sense and navigate an environment that is generated at runtime.",
    process: [
      {
        heading: "Generate the environment",
        body: "I built the terrain from Perlin noise and placed obstacles randomly, aligning them to the terrain surface."
      },
      {
        heading: "Give agents local perception",
        body: "I created a custom vision system so the agents could respond to the world around them."
      },
      {
        heading: "Combine steering behaviors",
        body: "Each agent sums its behaviors into one direction vector. Two agents in the same environment demonstrate the resulting movement."
      }
    ],
    links: [
    ]
  },
  {
    id: "Quest-Randomizer",
    title: "Quest Randomizer",
    role: "Solo algorithm project",
    summary: "A C# generator that turns a structured CSV into randomized quest lines while checking which steps are available.",
    mediaType: "image",
    media: questRandIntroPic,
    tags: ["C#", "Data organization"],
    goals: "I wanted to generate varied quest lines from editable source data while respecting which steps can follow one another.",
    process: [
      {
        heading: "Read structured quest data",
        body: "I wrote a CSV reader to load quest records from a predefined format."
      },
      {
        heading: "Represent possible sequences",
        body: "I organized the records into a node structure resembling a doubly linked list, giving the generator a way to navigate related steps."
      },
      {
        heading: "Select available steps",
        body: "The generator checks which sequential nodes are available before choosing randomly, then uses those choices to build a quest line."
      }
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
    name: "Fedora",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fedora/fedora-original.svg"
  },
  {
    name: "Github Actions",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg"
  },
  {
    name: "GitKraken",
    logo: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/gitkraken/default.svg"
  }
];
