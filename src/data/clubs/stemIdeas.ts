// src/data/clubs/stemIdeas.ts
import type { ClubIdea } from "./types";

export const stemIdeas: ClubIdea[] = [
  {
    id: "stem-001",
    category: "stem-nexus",
    title: "Cardboard Robotics",
    summary: "Build simple moving robots using cardboard, motors and batteries.",
    description:
      "Students explore basic electronics and mechanics by building fun cardboard robots that can move.",
    steps: [
      "Learn how a simple circuit works",
      "Collect cardboard, motors, batteries and wires",
      "Design a basic robot body",
      "Connect motor to battery with a switch",
      "Attach wheels or legs",
      "Test and improve movement",
      "Hold a mini robot challenge",
    ],
    materials: [
      "Cardboard",
      "Small DC motors",
      "Batteries and holders",
      "Wires and switches",
      "Bottle caps or wheels",
      "Glue and tape",
    ],
    safetyPrecautions: [
      "Do not short-circuit batteries",
      "Avoid damaged batteries",
      "Adult help recommended for wiring",
      "Keep water away from electronics",
    ],
    difficulty: "Medium",
    ageGroup: "11-16",
    timeNeeded: "3-6 hours",
    xpReward: 45,
    coinReward: 22,
    tags: ["robotics", "electronics", "engineering"],
    icon: "🤖",
  },
  {
    id: "stem-002",
    category: "stem-nexus",
    title: "Coding Club Starter Projects",
    summary: "Beginner-friendly coding projects using free online tools.",
    description:
      "Students create simple games, animations or calculators using Scratch or beginner Python.",
    steps: [
      "Choose Scratch (block coding) or beginner Python",
      "Start with a simple project (moving character, calculator, quiz)",
      "Follow a short tutorial together",
      "Modify the project to make it your own",
      "Present the project to the club",
      "Help a classmate debug their code",
    ],
    materials: [
      "Computer or tablet",
      "Internet access",
      "Scratch.mit.edu or Replit",
    ],
    safetyPrecautions: [
      "Use only approved websites",
      "Do not share personal information online",
      "Take regular screen breaks",
    ],
    difficulty: "Easy",
    ageGroup: "10-16",
    timeNeeded: "2-4 hours per project",
    xpReward: 35,
    coinReward: 18,
    tags: ["coding", "programming", "logic"],
    icon: "💻",
  },
  {
    id: "stem-003",
    category: "stem-nexus",
    title: "Science Fair Project Bank",
    summary: "Create and document high-quality science fair projects.",
    description:
      "Students research, test and present simple but strong science fair projects that others can also learn from.",
    steps: [
      "Choose a clear scientific question",
      "Research background information",
      "Design a fair test",
      "Carry out the experiment carefully",
      "Record results in a notebook",
      "Create a simple presentation board",
      "Share the project with the club",
    ],
    materials: ["Depends on the experiment", "Notebook", "Poster board"],
    safetyPrecautions: [
      "Follow all safety rules for the specific experiment",
      "Never mix chemicals without guidance",
      "Wear protective gear when needed",
      "Work under teacher supervision for advanced projects",
    ],
    difficulty: "Medium",
    ageGroup: "12-17",
    timeNeeded: "1-3 weeks",
    xpReward: 40,
    coinReward: 20,
    tags: ["science fair", "research", "presentation"],
    icon: "🔬",
  },
  {
  id: "stem-004",
  category: "stem",
  title: "Design Your First Mobile App",
  summary: "Plan and prototype a mobile app that solves a real-life problem.",
  description:
    "Students learn the fundamentals of app development by identifying a problem, designing user interfaces, and presenting an interactive paper prototype.",
  steps: [
    "Identify a problem to solve.",
    "Define the target users.",
    "Sketch app screens.",
    "Connect screens into a user flow.",
    "Present the prototype.",
    "Receive feedback.",
    "Improve the design."
  ],
  materials: [
    "Paper",
    "Pencils",
    "Markers",
    "Sticky notes",
    "Ruler"
  ],
  safetyPrecautions: [
    "Handle scissors carefully if used.",
    "Keep the workspace organized.",
    "Respect teammates' ideas.",
    "Take breaks during long sessions.",
    "Adult supervision is recommended."
  ],
  difficulty: "Easy",
  ageGroup: "10-18",
  timeNeeded: "90 minutes",
  xpReward: 45,
  coinReward: 22,
  tags: ["app design", "ui", "technology", "innovation"],
  icon: "Smartphone"
},

{
  id: "stem-005",
  category: "stem",
  title: "AI Image Classifier",
  summary: "Train a simple AI model to recognize different objects.",
  description:
    "Students explore artificial intelligence by collecting images, training an image classifier with beginner-friendly tools, and evaluating prediction accuracy.",
  steps: [
    "Collect sample images.",
    "Upload them to an AI training platform.",
    "Train the model.",
    "Test new images.",
    "Measure accuracy.",
    "Improve the dataset.",
    "Present findings."
  ],
  materials: [
    "Computer",
    "Internet connection",
    "Sample images",
    "Notebook"
  ],
  safetyPrecautions: [
    "Use copyright-free images.",
    "Do not upload personal photos without permission.",
    "Take regular screen breaks.",
    "Use trusted AI platforms only.",
    "Teacher supervision is advised."
  ],
  difficulty: "Medium",
  ageGroup: "12-18",
  timeNeeded: "2 hours",
  xpReward: 60,
  coinReward: 30,
  tags: ["artificial intelligence", "machine learning", "computer vision"],
  icon: "BrainCircuit"
},

{
  id: "stem-006",
  category: "stem",
  title: "Create Your First Website",
  summary: "Build a simple personal website using HTML and CSS.",
  description:
    "Students discover how websites work by creating their first webpage containing text, images and navigation.",
  steps: [
    "Create an HTML file.",
    "Add headings and paragraphs.",
    "Insert images.",
    "Style with CSS.",
    "Preview in a browser.",
    "Improve the layout.",
    "Share with classmates."
  ],
  materials: [
    "Computer",
    "Code editor",
    "Web browser"
  ],
  safetyPrecautions: [
    "Do not publish personal information online.",
    "Use copyright-free images.",
    "Maintain good sitting posture.",
    "Take eye-rest breaks.",
    "Teacher supervision is recommended."
  ],
  difficulty: "Easy",
  ageGroup: "11-18",
  timeNeeded: "2 hours",
  xpReward: 55,
  coinReward: 28,
  tags: ["html", "css", "web development"],
  icon: "Globe"
},

{
  id: "stem-007",
  category: "stem",
  title: "Build a Smart Traffic Light",
  summary: "Program a traffic light sequence using a microcontroller.",
  description:
    "Students learn embedded programming by building a miniature traffic control system with LEDs and timed sequences.",
  steps: [
    "Connect LEDs to the microcontroller.",
    "Write the control program.",
    "Upload the code.",
    "Test the sequence.",
    "Adjust timing.",
    "Simulate traffic flow.",
    "Present the project."
  ],
  materials: [
    "Arduino or compatible board",
    "LEDs",
    "Breadboard",
    "Resistors",
    "USB cable",
    "Computer"
  ],
  safetyPrecautions: [
    "Disconnect power before rewiring.",
    "Use only low-voltage circuits.",
    "Avoid short circuits.",
    "Keep liquids away from electronics.",
    "Teacher supervision is required."
  ],
  difficulty: "Advanced",
  ageGroup: "13-18",
  timeNeeded: "2.5 hours",
  xpReward: 70,
  coinReward: 35,
  tags: ["arduino", "electronics", "coding"],
  icon: "TrafficCone"
},

{
  id: "stem-008",
  category: "stem",
  title: "Cybersecurity Escape Room",
  summary: "Solve digital security puzzles to escape a simulated cyber attack.",
  description:
    "Students learn cybersecurity concepts including passwords, phishing, encryption and online safety through interactive challenges.",
  steps: [
    "Form teams.",
    "Solve password puzzles.",
    "Identify phishing attempts.",
    "Decode encrypted messages.",
    "Complete security tasks.",
    "Unlock the final challenge.",
    "Discuss lessons learned."
  ],
  materials: [
    "Computer",
    "Puzzle cards",
    "Internet access",
    "Notebook"
  ],
  safetyPrecautions: [
    "Use only simulated cyber activities.",
    "Never attempt real hacking.",
    "Respect school ICT policies.",
    "Do not share passwords.",
    "Teacher supervision is required."
  ],
  difficulty: "Medium",
  ageGroup: "12-18",
  timeNeeded: "90 minutes",
  xpReward: 60,
  coinReward: 30,
  tags: ["cybersecurity", "internet safety", "technology"],
  icon: "ShieldCheck"
},
{
  id: "stem-009",
  category: "stem",
  title: "Build a Voice Assistant",
  summary: "Create a simple voice-controlled assistant using beginner-friendly AI tools.",
  description:
    "Students learn the basics of speech recognition and artificial intelligence by creating a simple voice assistant capable of responding to spoken commands.",
  steps: [
    "Choose a beginner-friendly AI platform.",
    "Create voice commands.",
    "Assign responses.",
    "Test recognition accuracy.",
    "Improve the responses.",
    "Demonstrate the assistant.",
    "Discuss real-world applications."
  ],
  materials: [
    "Computer",
    "Microphone",
    "Internet connection",
    "Notebook"
  ],
  safetyPrecautions: [
    "Do not record anyone without permission.",
    "Avoid sharing personal information.",
    "Use trusted AI platforms only.",
    "Take regular screen breaks.",
    "Teacher supervision is recommended."
  ],
  difficulty: "Medium",
  ageGroup: "12-18",
  timeNeeded: "90 minutes",
  xpReward: 60,
  coinReward: 30,
  tags: ["ai", "voice", "speech recognition"],
  icon: "Mic"
},

{
  id: "stem-010",
  category: "stem",
  title: "Password Strength Analyzer",
  summary: "Discover what makes passwords secure by building a password checker.",
  description:
    "Students investigate cybersecurity principles by evaluating password strength and understanding common security threats.",
  steps: [
    "List password rules.",
    "Create sample passwords.",
    "Score password strength.",
    "Improve weak passwords.",
    "Discuss common attacks.",
    "Present recommendations."
  ],
  materials: [
    "Computer",
    "Notebook",
    "Password examples"
  ],
  safetyPrecautions: [
    "Never use real passwords.",
    "Do not share login credentials.",
    "Respect digital privacy.",
    "Use fictional examples only.",
    "Teacher supervision is advised."
  ],
  difficulty: "Easy",
  ageGroup: "11-18",
  timeNeeded: "60 minutes",
  xpReward: 45,
  coinReward: 22,
  tags: ["cybersecurity", "passwords", "digital safety"],
  icon: "KeyRound"
},

{
  id: "stem-011",
  category: "stem",
  title: "QR Code Treasure Hunt",
  summary: "Design an educational treasure hunt using QR codes.",
  description:
    "Students generate QR codes containing clues, educational facts and challenges, then organise a technology-powered scavenger hunt.",
  steps: [
    "Write clues.",
    "Generate QR codes.",
    "Print and place them.",
    "Scan each clue.",
    "Solve challenges.",
    "Reach the final destination.",
    "Review teamwork."
  ],
  materials: [
    "Computer",
    "Smartphone or tablet",
    "QR code generator",
    "Printer"
  ],
  safetyPrecautions: [
    "Scan only trusted QR codes.",
    "Avoid restricted areas.",
    "Move safely around the school.",
    "Respect school property.",
    "Teacher supervision is recommended."
  ],
  difficulty: "Easy",
  ageGroup: "10-18",
  timeNeeded: "75 minutes",
  xpReward: 50,
  coinReward: 25,
  tags: ["qr code", "technology", "teamwork"],
  icon: "QrCode"
},

{
  id: "stem-012",
  category: "stem",
  title: "Internet of Things Home Model",
  summary: "Design a smart home that uses connected devices.",
  description:
    "Students investigate the Internet of Things (IoT) by planning how smart devices communicate to improve daily life.",
  steps: [
    "Draw a house layout.",
    "Identify smart devices.",
    "Connect devices logically.",
    "Explain communication.",
    "Present security risks.",
    "Suggest improvements.",
    "Discuss future technology."
  ],
  materials: [
    "Cardboard",
    "Markers",
    "Sticky notes",
    "Ruler"
  ],
  safetyPrecautions: [
    "Do not share home security information.",
    "Respect privacy discussions.",
    "Use cutting tools carefully.",
    "Keep the workspace tidy.",
    "Teacher supervision is advised."
  ],
  difficulty: "Medium",
  ageGroup: "11-18",
  timeNeeded: "90 minutes",
  xpReward: 55,
  coinReward: 28,
  tags: ["iot", "smart home", "technology"],
  icon: "HouseWifi"
},

{
  id: "stem-013",
  category: "stem",
  title: "Data Detective",
  summary: "Collect, analyse and visualise real-world data.",
  description:
    "Students gather data, organise it into tables and charts, and draw meaningful conclusions using basic data science techniques.",
  steps: [
    "Choose a survey topic.",
    "Collect responses.",
    "Create a table.",
    "Draw charts.",
    "Interpret results.",
    "Present findings.",
    "Answer questions."
  ],
  materials: [
    "Notebook",
    "Spreadsheet software",
    "Computer"
  ],
  safetyPrecautions: [
    "Protect participants' privacy.",
    "Do not collect sensitive information.",
    "Verify calculations carefully.",
    "Take regular screen breaks.",
    "Teacher supervision is recommended."
  ],
  difficulty: "Easy",
  ageGroup: "11-18",
  timeNeeded: "90 minutes",
  xpReward: 50,
  coinReward: 25,
  tags: ["data science", "statistics", "analysis"],
  icon: "ChartColumn"
},

{
  id: "stem-014",
  category: "stem",
  title: "Build a Chatbot",
  summary: "Create a simple chatbot capable of answering common questions.",
  description:
    "Students design conversation flows and develop a beginner-friendly chatbot for school information or customer support.",
  steps: [
    "Identify common questions.",
    "Write chatbot responses.",
    "Connect conversation paths.",
    "Test conversations.",
    "Improve unclear replies.",
    "Present the chatbot.",
    "Collect feedback."
  ],
  materials: [
    "Computer",
    "Internet connection",
    "Chatbot platform",
    "Notebook"
  ],
  safetyPrecautions: [
    "Do not use personal information.",
    "Use respectful language.",
    "Test only on approved platforms.",
    "Take regular screen breaks.",
    "Teacher supervision is advised."
  ],
  difficulty: "Medium",
  ageGroup: "12-18",
  timeNeeded: "2 hours",
  xpReward: 60,
  coinReward: 30,
  tags: ["chatbot", "ai", "conversation design"],
  icon: "MessageCircleCode"
},

{
  id: "stem-015",
  category: "stem",
  title: "Design a Smart School",
  summary: "Plan a technology-driven school of the future.",
  description:
    "Students combine engineering, computing and creativity to design a modern smart school featuring automation, renewable energy and digital learning.",
  steps: [
    "Identify school challenges.",
    "Brainstorm technology solutions.",
    "Sketch the school layout.",
    "Explain smart systems.",
    "Present the design.",
    "Receive feedback.",
    "Refine the proposal."
  ],
  materials: [
    "Cardboard",
    "Paper",
    "Markers",
    "Ruler",
    "Sticky notes"
  ],
  safetyPrecautions: [
    "Use cutting tools safely.",
    "Keep the workspace organized.",
    "Respect teammates' ideas.",
    "Recycle unused materials.",
    "Teacher supervision is recommended."
  ],
  difficulty: "Medium",
  ageGroup: "10-18",
  timeNeeded: "2 hours",
  xpReward: 60,
  coinReward: 30,
  tags: ["innovation", "smart city", "future technology"],
  icon: "School"
},
{
  id: "stem-016",
  category: "stem",
  title: "AI Ethics Courtroom",
  summary: "Debate real-world ethical issues surrounding artificial intelligence.",
  description:
    "Students role-play as judges, lawyers and witnesses to examine ethical questions involving AI, privacy, bias and automation.",
  steps: [
    "Assign courtroom roles.",
    "Present an AI case.",
    "Research supporting evidence.",
    "Conduct the trial.",
    "Question witnesses.",
    "Deliver a verdict.",
    "Reflect on ethical issues."
  ],
  materials: [
    "Case study cards",
    "Notebook",
    "Pens",
    "Internet (optional)"
  ],
  safetyPrecautions: [
    "Respect differing opinions.",
    "Use appropriate language.",
    "Do not use real personal data.",
    "Encourage equal participation.",
    "Teacher moderation is recommended."
  ],
  difficulty: "Medium",
  ageGroup: "12-18",
  timeNeeded: "90 minutes",
  xpReward: 60,
  coinReward: 30,
  tags: ["ai", "ethics", "critical thinking"],
  icon: "Scale"
},

{
  id: "stem-017",
  category: "stem",
  title: "Code a Mini Calculator",
  summary: "Build a calculator capable of performing basic arithmetic operations.",
  description:
    "Students learn programming logic by creating a calculator that accepts user input and performs mathematical calculations.",
  steps: [
    "Create the interface.",
    "Add number buttons.",
    "Program operations.",
    "Handle errors.",
    "Test calculations.",
    "Improve the design.",
    "Present the application."
  ],
  materials: [
    "Computer",
    "Programming software",
    "Notebook"
  ],
  safetyPrecautions: [
    "Save work frequently.",
    "Maintain good posture.",
    "Take screen breaks.",
    "Avoid downloading unknown software.",
    "Teacher supervision is advised."
  ],
  difficulty: "Medium",
  ageGroup: "11-18",
  timeNeeded: "2 hours",
  xpReward: 60,
  coinReward: 30,
  tags: ["coding", "programming", "calculator"],
  icon: "Calculator"
},

{
  id: "stem-018",
  category: "stem",
  title: "Digital Escape Game",
  summary: "Design an educational escape room using digital puzzles.",
  description:
    "Students combine programming, creativity and logical thinking to create an interactive escape challenge.",
  steps: [
    "Choose a theme.",
    "Design puzzles.",
    "Create clues.",
    "Link puzzle stages.",
    "Test with classmates.",
    "Improve weak sections.",
    "Launch the game."
  ],
  materials: [
    "Computer",
    "Presentation software",
    "Internet connection"
  ],
  safetyPrecautions: [
    "Use trusted online tools.",
    "Do not share personal information.",
    "Take regular breaks.",
    "Respect copyright materials.",
    "Teacher supervision is recommended."
  ],
  difficulty: "Medium",
  ageGroup: "11-18",
  timeNeeded: "2 hours",
  xpReward: 55,
  coinReward: 28,
  tags: ["game design", "logic", "technology"],
  icon: "Gamepad2"
},

{
  id: "stem-019",
  category: "stem",
  title: "Machine Learning Sorting Game",
  summary: "Discover how machines learn to classify objects using everyday examples.",
  description:
    "Students simulate machine learning by sorting objects into categories and refining their 'model' based on mistakes.",
  steps: [
    "Gather sample objects.",
    "Create categories.",
    "Sort the objects.",
    "Review mistakes.",
    "Improve the rules.",
    "Repeat the activity.",
    "Discuss machine learning."
  ],
  materials: [
    "Picture cards",
    "Household objects",
    "Notebook"
  ],
  safetyPrecautions: [
    "Keep small objects away from young children.",
    "Maintain a tidy workspace.",
    "Handle materials carefully.",
    "Respect teammates' ideas.",
    "Teacher supervision is recommended."
  ],
  difficulty: "Easy",
  ageGroup: "10-17",
  timeNeeded: "60 minutes",
  xpReward: 45,
  coinReward: 22,
  tags: ["machine learning", "classification", "ai"],
  icon: "Boxes"
},

{
  id: "stem-020",
  category: "stem",
  title: "Design a Wearable Health Tracker",
  summary: "Prototype a smartwatch or wearable device that improves health.",
  description:
    "Students imagine and design wearable technology capable of monitoring health, fitness or safety.",
  steps: [
    "Identify a health problem.",
    "Sketch the wearable.",
    "List important features.",
    "Explain collected data.",
    "Present the prototype.",
    "Receive feedback.",
    "Improve the design."
  ],
  materials: [
    "Paper",
    "Markers",
    "Cardboard",
    "Sticky notes"
  ],
  safetyPrecautions: [
    "Do not collect real medical data.",
    "Respect personal privacy.",
    "Use scissors safely.",
    "Recycle unused materials.",
    "Teacher supervision is advised."
  ],
  difficulty: "Easy",
  ageGroup: "10-18",
  timeNeeded: "75 minutes",
  xpReward: 50,
  coinReward: 25,
  tags: ["wearables", "health tech", "innovation"],
  icon: "Watch"
},

{
  id: "stem-021",
  category: "stem",
  title: "Smart Farming Solutions",
  summary: "Develop technology-based solutions that improve agricultural productivity.",
  description:
    "Students investigate how sensors, drones, AI and automation can make farming more efficient and environmentally friendly.",
  steps: [
    "Research farming challenges.",
    "Brainstorm technology solutions.",
    "Sketch a prototype.",
    "Explain how it works.",
    "Present to the class.",
    "Answer questions.",
    "Improve the proposal."
  ],
  materials: [
    "Paper",
    "Markers",
    "Internet connection",
    "Notebook"
  ],
  safetyPrecautions: [
    "Use trusted research sources.",
    "Respect intellectual property.",
    "Take regular screen breaks.",
    "Encourage teamwork.",
    "Teacher supervision is recommended."
  ],
  difficulty: "Medium",
  ageGroup: "11-18",
  timeNeeded: "90 minutes",
  xpReward: 55,
  coinReward: 28,
  tags: ["agritech", "innovation", "technology"],
  icon: "Tractor"
},

{
  id: "stem-022",
  category: "stem",
  title: "Future Technology Expo",
  summary: "Research and present emerging technologies that could transform society.",
  description:
    "Students work in teams to investigate cutting-edge technologies such as quantum computing, robotics, biotechnology and space exploration before presenting their findings.",
  steps: [
    "Select a technology.",
    "Research reliable sources.",
    "Prepare visual materials.",
    "Create a presentation.",
    "Present to classmates.",
    "Answer audience questions.",
    "Reflect on future impacts."
  ],
  materials: [
    "Computer",
    "Presentation software",
    "Internet connection",
    "Projector"
  ],
  safetyPrecautions: [
    "Use reliable sources.",
    "Respect copyright.",
    "Take regular screen breaks.",
    "Keep presentation equipment organized.",
    "Teacher supervision is recommended."
  ],
  difficulty: "Easy",
  ageGroup: "10-18",
  timeNeeded: "2 hours",
  xpReward: 55,
  coinReward: 28,
  tags: ["future tech", "research", "innovation"],
  icon: "Cpu"
},
{
  id: "stem-023",
  category: "stem",
  title: "Facial Recognition Simulator",
  summary: "Explore how facial recognition systems work without collecting real biometric data.",
  description:
    "Students investigate the principles behind facial recognition technology, discussing its applications, limitations and ethical considerations through simulations.",
  steps: [
    "Learn how facial recognition works.",
    "Study sample datasets.",
    "Identify matching patterns.",
    "Discuss possible errors.",
    "Explore ethical concerns.",
    "Present findings.",
    "Reflect on responsible AI."
  ],
  materials: [
    "Computer",
    "Presentation slides",
    "Sample datasets",
    "Notebook"
  ],
  safetyPrecautions: [
    "Do not use classmates' photos without permission.",
    "Protect personal privacy.",
    "Use only educational datasets.",
    "Take regular screen breaks.",
    "Teacher supervision is recommended."
  ],
  difficulty: "Medium",
  ageGroup: "13-18",
  timeNeeded: "90 minutes",
  xpReward: 60,
  coinReward: 30,
  tags: ["ai", "computer vision", "ethics"],
  icon: "ScanFace"
},

{
  id: "stem-024",
  category: "stem",
  title: "Space Colony Planner",
  summary: "Design a sustainable human settlement on Mars or the Moon.",
  description:
    "Students combine science, engineering and creativity to plan a self-sustaining colony capable of supporting human life beyond Earth.",
  steps: [
    "Choose a destination.",
    "Identify survival challenges.",
    "Design habitats.",
    "Plan food and water systems.",
    "Present the colony.",
    "Receive feedback.",
    "Improve the design."
  ],
  materials: [
    "Paper",
    "Markers",
    "Cardboard",
    "Internet (optional)"
  ],
  safetyPrecautions: [
    "Use scissors carefully.",
    "Keep the workspace tidy.",
    "Recycle leftover materials.",
    "Respect teammates' ideas.",
    "Teacher supervision is advised."
  ],
  difficulty: "Medium",
  ageGroup: "10-18",
  timeNeeded: "2 hours",
  xpReward: 60,
  coinReward: 30,
  tags: ["space", "engineering", "innovation"],
  icon: "Orbit"
},

{
  id: "stem-025",
  category: "stem",
  title: "Build a Digital Clock",
  summary: "Create a digital clock using programming or a microcontroller.",
  description:
    "Students develop programming and electronics skills while building a functioning digital clock capable of displaying accurate time.",
  steps: [
    "Connect display components.",
    "Program the clock.",
    "Upload the code.",
    "Test the display.",
    "Adjust timing.",
    "Add extra features.",
    "Demonstrate the project."
  ],
  materials: [
    "Microcontroller",
    "Digital display",
    "Breadboard",
    "USB cable",
    "Computer"
  ],
  safetyPrecautions: [
    "Disconnect power before rewiring.",
    "Use only low-voltage components.",
    "Keep liquids away from electronics.",
    "Organize cables properly.",
    "Teacher supervision is recommended."
  ],
  difficulty: "Advanced",
  ageGroup: "13-18",
  timeNeeded: "2.5 hours",
  xpReward: 70,
  coinReward: 35,
  tags: ["electronics", "coding", "clock"],
  icon: "Clock4"
},

{
  id: "stem-026",
  category: "stem",
  title: "Drone Mission Planner",
  summary: "Plan drone flights to solve real-world challenges without flying an actual drone.",
  description:
    "Students learn the fundamentals of drone technology, mapping and mission planning through simulated flight activities.",
  steps: [
    "Study drone components.",
    "Choose a mission.",
    "Draw a flight path.",
    "Identify hazards.",
    "Optimize the route.",
    "Present the mission.",
    "Discuss regulations."
  ],
  materials: [
    "Maps",
    "Paper",
    "Markers",
    "Ruler"
  ],
  safetyPrecautions: [
    "Follow local drone regulations if demonstrating drones.",
    "Never fly near airports.",
    "Avoid flying over people.",
    "Use simulations where possible.",
    "Teacher supervision is advised."
  ],
  difficulty: "Easy",
  ageGroup: "11-18",
  timeNeeded: "75 minutes",
  xpReward: 50,
  coinReward: 25,
  tags: ["drones", "mapping", "technology"],
  icon: "Plane"
},

{
  id: "stem-027",
  category: "stem",
  title: "Digital Twin Challenge",
  summary: "Create a digital model of a real-world object or classroom.",
  description:
    "Students investigate digital twins by designing virtual representations that can be monitored and improved.",
  steps: [
    "Choose an object.",
    "Record measurements.",
    "Sketch the model.",
    "Create a digital version.",
    "Identify improvements.",
    "Present findings.",
    "Discuss industry uses."
  ],
  materials: [
    "Computer",
    "Drawing software",
    "Ruler",
    "Notebook"
  ],
  safetyPrecautions: [
    "Respect privacy when modelling real spaces.",
    "Take screen breaks.",
    "Save work regularly.",
    "Use approved software only.",
    "Teacher supervision is recommended."
  ],
  difficulty: "Medium",
  ageGroup: "12-18",
  timeNeeded: "2 hours",
  xpReward: 60,
  coinReward: 30,
  tags: ["digital twin", "design", "technology"],
  icon: "Box"
},

{
  id: "stem-028",
  category: "stem",
  title: "Smart Waste Sorting System",
  summary: "Design an automated system that separates recyclable materials.",
  description:
    "Students apply engineering and AI concepts to develop a smart recycling system capable of sorting waste efficiently.",
  steps: [
    "Research recyclable materials.",
    "Design the sorting system.",
    "Identify sensors required.",
    "Create a prototype.",
    "Present the design.",
    "Discuss environmental impact.",
    "Suggest improvements."
  ],
  materials: [
    "Cardboard",
    "Markers",
    "Recyclable materials",
    "Notebook"
  ],
  safetyPrecautions: [
    "Use only clean recyclable items.",
    "Wash hands after handling materials.",
    "Wear gloves if needed.",
    "Keep the workspace clean.",
    "Teacher supervision is advised."
  ],
  difficulty: "Medium",
  ageGroup: "10-18",
  timeNeeded: "90 minutes",
  xpReward: 55,
  coinReward: 28,
  tags: ["recycling", "engineering", "ai"],
  icon: "Trash2"
},

{
  id: "stem-029",
  category: "stem",
  title: "Quantum Computing Explorer",
  summary: "Understand the basic concepts of quantum computing through interactive games and models.",
  description:
    "Students explore qubits, superposition and quantum computing using simplified demonstrations suitable for beginners.",
  steps: [
    "Learn classical computing.",
    "Compare with quantum computing.",
    "Play quantum concept games.",
    "Discuss qubits.",
    "Solve simple challenges.",
    "Present what was learned.",
    "Reflect on future applications."
  ],
  materials: [
    "Presentation slides",
    "Cards",
    "Notebook",
    "Computer (optional)"
  ],
  safetyPrecautions: [
    "Use reliable educational resources.",
    "Respect classmates during discussions.",
    "Take regular screen breaks if computers are used.",
    "Organize learning materials.",
    "Teacher supervision is recommended."
  ],
  difficulty: "Advanced",
  ageGroup: "13-18",
  timeNeeded: "90 minutes",
  xpReward: 70,
  coinReward: 35,
  tags: ["quantum computing", "future technology", "computer science"],
  icon: "Atom"
},
{
  id: "stem-030",
  category: "stem",
  title: "Build a Recommendation System",
  summary: "Discover how streaming services recommend movies, songs and videos.",
  description:
    "Students simulate how recommendation systems work by collecting preferences, identifying patterns and suggesting items to users.",
  steps: [
    "Survey user preferences.",
    "Group similar interests.",
    "Recommend items.",
    "Collect feedback.",
    "Improve recommendations.",
    "Discuss AI bias.",
    "Present findings."
  ],
  materials: [
    "Notebook",
    "Pens",
    "Spreadsheet (optional)",
    "Sample movie or book lists"
  ],
  safetyPrecautions: [
    "Do not collect sensitive personal information.",
    "Respect everyone's preferences.",
    "Use fictional datasets where possible.",
    "Take screen breaks.",
    "Teacher supervision is recommended."
  ],
  difficulty: "Medium",
  ageGroup: "11-18",
  timeNeeded: "75 minutes",
  xpReward: 60,
  coinReward: 30,
  tags: ["ai", "recommendation systems", "data science"],
  icon: "Sparkles"
},

{
  id: "stem-031",
  category: "stem",
  title: "Robot Delivery Challenge",
  summary: "Design an autonomous robot that delivers supplies around a school.",
  description:
    "Students explore robotics and automation by designing a delivery robot capable of navigating classrooms and avoiding obstacles.",
  steps: [
    "Identify delivery needs.",
    "Sketch the robot.",
    "Plan navigation routes.",
    "Add safety features.",
    "Present the design.",
    "Receive feedback.",
    "Improve the prototype."
  ],
  materials: [
    "Paper",
    "Markers",
    "Cardboard",
    "Ruler"
  ],
  safetyPrecautions: [
    "Use cutting tools carefully.",
    "Keep workstations organized.",
    "Respect teammates' ideas.",
    "Recycle leftover materials.",
    "Teacher supervision is recommended."
  ],
  difficulty: "Medium",
  ageGroup: "10-18",
  timeNeeded: "90 minutes",
  xpReward: 55,
  coinReward: 28,
  tags: ["robotics", "automation", "innovation"],
  icon: "Bot"
},

{
  id: "stem-032",
  category: "stem",
  title: "Digital Forensics Investigation",
  summary: "Solve a fictional cybercrime using digital evidence.",
  description:
    "Students learn how digital investigators analyse files, timelines and online activities to solve cyber incidents.",
  steps: [
    "Review the fictional case.",
    "Examine digital evidence.",
    "Create a timeline.",
    "Identify suspects.",
    "Present conclusions.",
    "Discuss cybersecurity careers."
  ],
  materials: [
    "Case files",
    "Computer",
    "Notebook"
  ],
  safetyPrecautions: [
    "Use only fictional evidence.",
    "Respect privacy principles.",
    "Never access real accounts.",
    "Use approved school devices.",
    "Teacher supervision is required."
  ],
  difficulty: "Medium",
  ageGroup: "12-18",
  timeNeeded: "90 minutes",
  xpReward: 60,
  coinReward: 30,
  tags: ["digital forensics", "cybersecurity", "investigation"],
  icon: "SearchCheck"
},

{
  id: "stem-033",
  category: "stem",
  title: "Virtual Reality Museum",
  summary: "Plan a virtual museum that brings history or science to life.",
  description:
    "Students design an immersive virtual museum experience, selecting exhibits and planning interactive visitor activities.",
  steps: [
    "Choose a museum theme.",
    "Select exhibits.",
    "Design visitor routes.",
    "Add interactive experiences.",
    "Present the museum.",
    "Gather feedback.",
    "Improve the design."
  ],
  materials: [
    "Paper",
    "Computer (optional)",
    "Markers"
  ],
  safetyPrecautions: [
    "Limit VR headset usage if available.",
    "Take regular eye breaks.",
    "Keep walking areas clear.",
    "Respect copyrighted materials.",
    "Teacher supervision is advised."
  ],
  difficulty: "Easy",
  ageGroup: "10-18",
  timeNeeded: "75 minutes",
  xpReward: 50,
  coinReward: 25,
  tags: ["virtual reality", "museum", "design"],
  icon: "View"
},

{
  id: "stem-034",
  category: "stem",
  title: "Autonomous Vehicle Planner",
  summary: "Design a self-driving vehicle capable of navigating safely.",
  description:
    "Students investigate sensors, artificial intelligence and safety systems used in autonomous vehicles.",
  steps: [
    "Study self-driving technology.",
    "Identify required sensors.",
    "Design the vehicle.",
    "Plan navigation decisions.",
    "Present safety systems.",
    "Answer questions.",
    "Refine the design."
  ],
  materials: [
    "Paper",
    "Markers",
    "Reference images",
    "Notebook"
  ],
  safetyPrecautions: [
    "Discuss autonomous driving responsibly.",
    "Use reliable sources.",
    "Respect differing opinions.",
    "Keep workstations organized.",
    "Teacher supervision is recommended."
  ],
  difficulty: "Medium",
  ageGroup: "11-18",
  timeNeeded: "90 minutes",
  xpReward: 60,
  coinReward: 30,
  tags: ["autonomous vehicles", "ai", "transport"],
  icon: "CarFront"
},

{
  id: "stem-035",
  category: "stem",
  title: "Mission to the Future",
  summary: "Develop a technology capable of solving one of humanity's greatest future challenges.",
  description:
    "Students identify a global challenge and design an innovative STEM solution, combining science, engineering, computing and creativity into one project.",
  steps: [
    "Choose a global challenge.",
    "Research existing solutions.",
    "Brainstorm innovative ideas.",
    "Create a prototype sketch.",
    "Present the solution.",
    "Receive peer feedback.",
    "Refine the proposal."
  ],
  materials: [
    "Paper",
    "Markers",
    "Computer (optional)",
    "Internet connection"
  ],
  safetyPrecautions: [
    "Use trusted research sources.",
    "Respect intellectual property.",
    "Keep workspaces organized.",
    "Take regular screen breaks.",
    "Teacher supervision is recommended."
  ],
  difficulty: "Medium",
  ageGroup: "10-18",
  timeNeeded: "2 hours",
  xpReward: 70,
  coinReward: 35,
  tags: ["innovation", "future", "engineering", "problem solving"],
  icon: "Lightbulb"
},
{
  id: "stem-036",
  category: "stem",
  title: "AI Chatbot Designer",
  summary: "Design the logic behind a simple AI chatbot.",
  description:
    "Students learn the basics of conversational AI by planning how a chatbot receives questions, processes information and responds appropriately.",
  steps: [
    "Choose a chatbot purpose.",
    "List common user questions.",
    "Design response flows.",
    "Draw a conversation diagram.",
    "Test with classmates.",
    "Improve the chatbot.",
    "Present your design."
  ],
  materials: [
    "Notebook",
    "Flowchart paper",
    "Markers"
  ],
  safetyPrecautions: [
    "Do not include personal information.",
    "Use respectful language.",
    "Keep discussions appropriate.",
    "Teacher supervision is recommended.",
    "Respect classmates' ideas."
  ],
  difficulty: "Medium",
  ageGroup: "11-18",
  timeNeeded: "75 minutes",
  xpReward: 70,
  coinReward: 35,
  tags: ["AI","chatbot","computer science"],
  icon: "Bot"
},

{
  id: "stem-037",
  category: "stem",
  title: "Smart City Planner",
  summary: "Design a technology-powered smart city.",
  description:
    "Students integrate science, engineering and technology to create sustainable smart cities using renewable energy, sensors and intelligent transport.",
  steps: [
    "Identify city challenges.",
    "Brainstorm smart solutions.",
    "Sketch the city layout.",
    "Add renewable energy systems.",
    "Present the design.",
    "Receive feedback.",
    "Improve the model."
  ],
  materials: [
    "Cardboard",
    "Markers",
    "Ruler",
    "Sticky notes"
  ],
  safetyPrecautions: [
    "Handle craft tools carefully.",
    "Keep workspaces tidy.",
    "Respect teammates.",
    "Avoid running during presentations.",
    "Teacher supervision is required."
  ],
  difficulty: "Medium",
  ageGroup: "10-18",
  timeNeeded: "90 minutes",
  xpReward: 75,
  coinReward: 38,
  tags: ["engineering","city","innovation"],
  icon: "Building2"
},

{
  id: "stem-038",
  category: "stem",
  title: "Earthquake Tower Test",
  summary: "Build towers that can survive simulated earthquakes.",
  description:
    "Students investigate structural engineering by designing towers that withstand shaking on a homemade shake table.",
  steps: [
    "Build the tower.",
    "Place it on the shake table.",
    "Increase shaking gradually.",
    "Observe failures.",
    "Improve the design.",
    "Retest.",
    "Compare results."
  ],
  materials: [
    "Popsicle sticks",
    "Glue",
    "Cardboard",
    "Rubber bands"
  ],
  safetyPrecautions: [
    "Use glue responsibly.",
    "Keep fingers away from moving parts.",
    "Allow glue to dry before testing.",
    "Maintain clean work areas.",
    "Teacher supervision is required."
  ],
  difficulty: "Medium",
  ageGroup: "10-18",
  timeNeeded: "90 minutes",
  xpReward: 75,
  coinReward: 38,
  tags: ["engineering","earthquake","structures"],
  icon: "Construction"
},

{
  id: "stem-039",
  category: "stem",
  title: "Mars Colony Mission",
  summary: "Plan a sustainable human settlement on Mars.",
  description:
    "Students solve real engineering challenges involving food production, power generation, shelter, transportation and communication.",
  steps: [
    "Study Mars conditions.",
    "Design habitats.",
    "Plan food production.",
    "Develop power systems.",
    "Present the colony.",
    "Answer questions.",
    "Improve the design."
  ],
  materials: [
    "Poster board",
    "Markers",
    "Reference books",
    "Notebook"
  ],
  safetyPrecautions: [
    "Use reliable scientific information.",
    "Respect everyone's ideas.",
    "Keep materials organized.",
    "Teacher supervision is recommended.",
    "Handle craft tools safely."
  ],
  difficulty: "Advanced",
  ageGroup: "11-18",
  timeNeeded: "2 hours",
  xpReward: 85,
  coinReward: 42,
  tags: ["space","mars","engineering"],
  icon: "Orbit"
},

{
  id: "stem-040",
  category: "stem",
  title: "Drone Delivery Challenge",
  summary: "Design a drone delivery system for a community.",
  description:
    "Students explore logistics, engineering and automation by planning safe drone routes and payload delivery.",
  steps: [
    "Choose delivery locations.",
    "Plan flight routes.",
    "Identify obstacles.",
    "Design safety procedures.",
    "Present the system.",
    "Receive feedback.",
    "Improve the design."
  ],
  materials: [
    "Maps",
    "Paper",
    "Markers",
    "Ruler"
  ],
  safetyPrecautions: [
    "No real drone flights indoors unless approved.",
    "Use demonstration models safely.",
    "Keep presentation areas clear.",
    "Teacher supervision is required.",
    "Respect safety regulations."
  ],
  difficulty: "Medium",
  ageGroup: "11-18",
  timeNeeded: "75 minutes",
  xpReward: 75,
  coinReward: 38,
  tags: ["drone","logistics","technology"],
  icon: "Plane"
},

{
  id: "stem-041",
  category: "stem",
  title: "Cybersecurity Escape Room",
  summary: "Solve cybersecurity puzzles to stop a fictional cyberattack.",
  description:
    "Students work together to solve encryption, password and network security challenges while learning responsible digital citizenship.",
  steps: [
    "Read the mission briefing.",
    "Solve password puzzles.",
    "Decode encrypted messages.",
    "Identify phishing attempts.",
    "Complete network challenges.",
    "Unlock the final stage.",
    "Review cybersecurity lessons."
  ],
  materials: [
    "Puzzle cards",
    "Notebook",
    "Computer (optional)"
  ],
  safetyPrecautions: [
    "Use fictional scenarios only.",
    "Do not attempt real hacking.",
    "Respect school ICT policies.",
    "Take screen breaks.",
    "Teacher supervision is required."
  ],
  difficulty: "Advanced",
  ageGroup: "12-18",
  timeNeeded: "90 minutes",
  xpReward: 85,
  coinReward: 42,
  tags: ["cybersecurity","coding","technology"],
  icon: "ShieldCheck"
},

{
  id: "stem-042",
  category: "stem",
  title: "Innovation Expo",
  summary: "Showcase STEM inventions before judges.",
  description:
    "Students present prototypes, explain scientific principles and answer judges' questions in a science fair-style exhibition.",
  steps: [
    "Select a STEM project.",
    "Prepare demonstration materials.",
    "Design a display board.",
    "Practice your presentation.",
    "Present to judges.",
    "Answer questions.",
    "Reflect on feedback."
  ],
  materials: [
    "Display board",
    "Prototype",
    "Markers",
    "Notebook"
  ],
  safetyPrecautions: [
    "Demonstrate projects safely.",
    "Keep electrical devices supervised.",
    "Respect all participants.",
    "Maintain clean display areas.",
    "Teacher supervision is required."
  ],
  difficulty: "Medium",
  ageGroup: "9-18",
  timeNeeded: "2 hours",
  xpReward: 80,
  coinReward: 40,
  tags: ["innovation","science fair","presentation"],
  icon: "Award"
},
{
  id: "stem-043",
  category: "stem",
  title: "Quantum Computing Explorer",
  summary: "Discover how quantum computers differ from classical computers.",
  description:
    "Students explore the concepts of qubits, superposition and quantum computing through interactive games and simple demonstrations.",
  steps: [
    "Introduce binary numbers.",
    "Learn about qubits.",
    "Compare classical and quantum computers.",
    "Complete a simulation activity.",
    "Discuss future applications.",
    "Answer questions.",
    "Reflect on the lesson."
  ],
  materials: [
    "Presentation slides",
    "Coins",
    "Notebook",
    "Computer (optional)"
  ],
  safetyPrecautions: [
    "Use educational simulations only.",
    "Take regular screen breaks.",
    "Respect classmates' ideas.",
    "Keep workspaces organized.",
    "Teacher supervision is recommended."
  ],
  difficulty: "Advanced",
  ageGroup: "13-18",
  timeNeeded: "75 minutes",
  xpReward: 85,
  coinReward: 42,
  tags: ["quantum", "computing", "technology"],
  icon: "Cpu"
},

{
  id: "stem-044",
  category: "stem",
  title: "Autonomous Vehicle Challenge",
  summary: "Design a self-driving vehicle capable of navigating obstacles.",
  description:
    "Students investigate sensors, artificial intelligence and engineering by planning how autonomous vehicles detect roads and avoid hazards.",
  steps: [
    "Study autonomous vehicles.",
    "Identify required sensors.",
    "Sketch the vehicle.",
    "Plan navigation logic.",
    "Present the design.",
    "Receive feedback.",
    "Improve the concept."
  ],
  materials: [
    "Notebook",
    "Markers",
    "Poster paper"
  ],
  safetyPrecautions: [
    "Use model vehicles only.",
    "Keep walkways clear.",
    "Respect teammates.",
    "Use drawing tools safely.",
    "Teacher supervision is required."
  ],
  difficulty: "Advanced",
  ageGroup: "12-18",
  timeNeeded: "90 minutes",
  xpReward: 85,
  coinReward: 42,
  tags: ["AI", "transport", "engineering"],
  icon: "Car"
},

{
  id: "stem-045",
  category: "stem",
  title: "Biomedical Engineer",
  summary: "Design a device that helps improve human health.",
  description:
    "Students solve healthcare challenges by designing simple assistive devices, prosthetics or medical innovations.",
  steps: [
    "Identify a health challenge.",
    "Brainstorm possible solutions.",
    "Sketch the device.",
    "Build a simple prototype.",
    "Present the invention.",
    "Receive feedback.",
    "Improve the design."
  ],
  materials: [
    "Cardboard",
    "Tape",
    "Scissors",
    "Markers",
    "Glue"
  ],
  safetyPrecautions: [
    "Handle scissors carefully.",
    "Use glue responsibly.",
    "Keep workspaces tidy.",
    "Never test devices on people.",
    "Teacher supervision is required."
  ],
  difficulty: "Medium",
  ageGroup: "11-18",
  timeNeeded: "90 minutes",
  xpReward: 80,
  coinReward: 40,
  tags: ["biomedical", "engineering", "health"],
  icon: "HeartPulse"
},

{
  id: "stem-046",
  category: "stem",
  title: "Smart Agriculture Project",
  summary: "Use technology to improve farming efficiency.",
  description:
    "Students design smart farming systems using sensors, irrigation technology and data analysis to increase crop production sustainably.",
  steps: [
    "Identify farming challenges.",
    "Research smart technologies.",
    "Design the farm.",
    "Add sensors and irrigation.",
    "Present the solution.",
    "Answer questions.",
    "Improve the project."
  ],
  materials: [
    "Poster board",
    "Markers",
    "Notebook",
    "Reference materials"
  ],
  safetyPrecautions: [
    "Use reliable information.",
    "Respect classmates' ideas.",
    "Handle craft materials carefully.",
    "Maintain tidy workspaces.",
    "Teacher supervision is recommended."
  ],
  difficulty: "Medium",
  ageGroup: "10-18",
  timeNeeded: "90 minutes",
  xpReward: 75,
  coinReward: 38,
  tags: ["agriculture", "technology", "innovation"],
  icon: "Sprout"
},

{
  id: "stem-047",
  category: "stem",
  title: "Renewable Energy City",
  summary: "Design a city powered entirely by renewable energy.",
  description:
    "Students combine engineering and environmental science to create sustainable cities using solar, wind, hydro and geothermal energy.",
  steps: [
    "Choose renewable energy sources.",
    "Design the city.",
    "Plan the power grid.",
    "Estimate energy needs.",
    "Present the project.",
    "Discuss improvements.",
    "Reflect on sustainability."
  ],
  materials: [
    "Poster board",
    "Markers",
    "Calculator",
    "Notebook"
  ],
  safetyPrecautions: [
    "Use accurate scientific information.",
    "Handle craft tools safely.",
    "Respect teammates.",
    "Keep workspaces organized.",
    "Teacher supervision is required."
  ],
  difficulty: "Medium",
  ageGroup: "10-18",
  timeNeeded: "90 minutes",
  xpReward: 80,
  coinReward: 40,
  tags: ["renewable energy", "environment", "engineering"],
  icon: "Leaf"
},

{
  id: "stem-048",
  category: "stem",
  title: "Future Tech Hackathon",
  summary: "Create an innovative STEM solution to a real-world problem.",
  description:
    "Teams collaborate to solve community challenges using science, engineering and technology before pitching their ideas to judges.",
  steps: [
    "Form teams.",
    "Identify a problem.",
    "Brainstorm solutions.",
    "Develop a prototype.",
    "Prepare a presentation.",
    "Pitch to judges.",
    "Reflect on feedback."
  ],
  materials: [
    "Notebook",
    "Prototype materials",
    "Markers",
    "Presentation board"
  ],
  safetyPrecautions: [
    "Share tasks fairly.",
    "Use tools responsibly.",
    "Respect all ideas.",
    "Keep workspaces clean.",
    "Teacher supervision is required."
  ],
  difficulty: "Advanced",
  ageGroup: "12-18",
  timeNeeded: "3 hours",
  xpReward: 90,
  coinReward: 45,
  tags: ["hackathon", "innovation", "engineering"],
  icon: "Lightbulb"
},

{
  id: "stem-049",
  category: "stem",
  title: "STEM Grand Design Challenge",
  summary: "Combine science, technology, engineering and mathematics to solve one complex challenge.",
  description:
    "Students integrate multiple STEM disciplines to design, test and improve a solution for a realistic engineering problem.",
  steps: [
    "Read the design brief.",
    "Research possible solutions.",
    "Develop a prototype.",
    "Test the prototype.",
    "Improve the design.",
    "Present findings.",
    "Evaluate performance."
  ],
  materials: [
    "Prototype materials",
    "Notebook",
    "Calculator",
    "Markers"
  ],
  safetyPrecautions: [
    "Use tools responsibly.",
    "Wear safety equipment when required.",
    "Keep the workspace tidy.",
    "Respect teammates.",
    "Teacher supervision is required."
  ],
  difficulty: "Advanced",
  ageGroup: "12-18",
  timeNeeded: "2.5 hours",
  xpReward: 95,
  coinReward: 48,
  tags: ["engineering", "design", "innovation"],
  icon: "Wrench"
},

{
  id: "stem-050",
  category: "stem",
  title: "Future X STEM Championship",
  summary: "The ultimate STEM competition combining every skill learned in the club.",
  description:
    "Students complete multiple science, engineering, mathematics and technology missions in teams, earning points through creativity, teamwork, innovation and problem-solving.",
  steps: [
    "Form STEM teams.",
    "Complete science challenges.",
    "Solve engineering tasks.",
    "Finish coding and mathematics missions.",
    "Present final solutions.",
    "Receive judges' scores.",
    "Celebrate achievements."
  ],
  materials: [
    "Challenge booklet",
    "Prototype materials",
    "Calculator",
    "Markers",
    "Presentation board"
  ],
  safetyPrecautions: [
    "Follow all laboratory and classroom rules.",
    "Use equipment only as instructed.",
    "Maintain clean workspaces.",
    "Respect every participant.",
    "Teacher supervision is mandatory."
  ],
  difficulty: "Advanced",
  ageGroup: "10-18",
  timeNeeded: "3 hours",
  xpReward: 100,
  coinReward: 50,
  tags: ["championship", "STEM", "innovation", "teamwork"],
  icon: "Trophy"
},
];