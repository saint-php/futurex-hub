// src/data/clubs/debateIdeas.ts
import type { ClubIdea } from "./types";

export const debateIdeas: ClubIdea[] = [
  {
    id: "debate-001",
    category: "debate",
    title: "Complete Debate Starter Kit",
    summary:
      "Learn the principles of debate, how to structure arguments, and practice with a large collection of ready-made topics.",
    description:
      "This is a full training pack for any Debate Club. It teaches the foundations and gives many ready-to-use motions with Proposition and Opposition points.",
    steps: [
      "Study the principles together as a club",
      "Practice the 'How to Debate' structure",
      "Choose one motion from the list",
      "Divide into Proposition and Opposition",
      "Prepare for 15–20 minutes",
      "Hold a structured debate",
      "Give feedback using the principles",
    ],
    materials: ["Notebooks", "Timer", "Printed motions (optional)"],
    safetyPrecautions: [
      "Keep debates respectful — attack ideas, never people",
      "Moderator must control time and tone",
      "Encourage quieter members to speak",
      "Avoid highly sensitive religious or tribal topics at the beginning",
    ],
    difficulty: "Medium",
    ageGroup: "13-18",
    timeNeeded: "Ongoing",
    xpReward: 50,
    coinReward: 25,
    tags: ["public speaking", "critical thinking", "training"],
    icon: "🎤",
    debateGuide: {
      principles: [
        "Respect your opponent at all times",
        "Attack the argument, never the person",
        "Use facts, logic and examples",
        "Listen carefully so you can rebut properly",
        "Stay calm even when challenged",
        "Structure your speech: Opening → Points → Conclusion",
        "Teamwork matters — support your side",
      ],
      howToDebate: [
        "1. Understand the motion clearly",
        "2. Decide if you are Proposition (support) or Opposition (against)",
        "3. Brainstorm 3 strong points",
        "4. Find examples or evidence for each point",
        "5. Prepare a short opening statement",
        "6. During the debate: present points clearly, then rebut the other side",
        "7. End with a strong summary",
        "8. Never interrupt rudely — wait for your turn",
      ],
      topics: [
        // ===== Core Topics =====
        {
          motion: "Homework should be optional in secondary schools",
          propositionPoints: [
            "Homework causes unnecessary stress and reduces family time",
            "Quality of learning in class is more important than quantity at home",
            "Many students copy homework, so it does not show real understanding",
          ],
          oppositionPoints: [
            "Homework reinforces what was taught in class",
            "It builds discipline and independent study habits",
            "It helps teachers know which students need extra help",
          ],
          writeUp:
            "This motion asks whether forced homework is still useful. Proposition will argue that it harms wellbeing and often becomes meaningless copying. Opposition will argue that regular practice is essential for mastery and character development.",
        },
        {
          motion: "Social media does more harm than good to teenagers",
          propositionPoints: [
            "It increases anxiety, comparison and cyberbullying",
            "It reduces face-to-face social skills and sleep",
            "Addictive design wastes study time",
          ],
          oppositionPoints: [
            "It helps students access educational content and opportunities",
            "It allows connection with distant family and friends",
            "Used wisely, it builds digital skills needed in the modern world",
          ],
          writeUp:
            "A balanced debate about the real impact of social media on young people. Both sides must use examples from daily life.",
        },
        {
          motion: "School uniforms should be abolished",
          propositionPoints: [
            "Uniforms suppress individuality and self-expression",
            "They are an extra cost for many parents",
            "Students should learn to dress appropriately without being forced",
          ],
          oppositionPoints: [
            "Uniforms reduce peer pressure and visible inequality",
            "They create a sense of belonging and discipline",
            "They make it easier to identify students and improve security",
          ],
          writeUp:
            "A classic motion that trains students to argue about identity, equality and practicality.",
        },
        {
          motion: "Online learning can fully replace traditional classrooms",
          propositionPoints: [
            "It allows learning at your own pace and from anywhere",
            "It can be cheaper and more flexible",
            "Technology can personalise education better than one teacher",
          ],
          oppositionPoints: [
            "Face-to-face interaction develops social and emotional skills",
            "Not all students have reliable internet or devices",
            "Practical subjects and lab work are very difficult online",
          ],
          writeUp:
            "This motion forces students to think about the future of education and the limits of technology.",
        },
        {
          motion: "Secondary school students should be allowed to use phones in school",
          propositionPoints: [
            "Phones can be powerful learning tools when used properly",
            "Students need to stay in contact with parents for safety",
            "Banning phones does not teach responsible use",
          ],
          oppositionPoints: [
            "Phones cause major distraction during lessons",
            "They increase cyberbullying and social pressure",
            "Many students do not yet have the discipline to use them wisely",
          ],
          writeUp:
            "This motion examines whether the benefits of phones in school outweigh the clear problems of distraction and misuse.",
        },
        {
          motion: "Corporal punishment should be completely banned in schools",
          propositionPoints: [
            "It can cause physical and emotional harm",
            "There are better ways to discipline students",
            "It teaches that violence is an acceptable solution",
          ],
          oppositionPoints: [
            "Some students only respond to firm physical correction",
            "When used mildly and fairly it can maintain order",
            "Complete ban may lead to worse behavioural problems",
          ],
          writeUp:
            "A sensitive but important motion. Debaters must stay respectful and focus on evidence rather than personal emotion.",
        },
        {
          motion: "Boarding schools are better than day schools",
          propositionPoints: [
            "They teach independence and life skills",
            "Students have more time for studies and structured activities",
            "They reduce long daily travel and distractions from home",
          ],
          oppositionPoints: [
            "Young people need daily family connection",
            "Homesickness and lack of privacy can affect mental health",
            "Day schools allow students to learn responsibility at home too",
          ],
          writeUp:
            "This motion helps students think about independence, family, and the best environment for learning.",
        },
        {
          motion: "The voting age should be lowered to 16",
          propositionPoints: [
            "16-year-olds already pay taxes in some cases and can work",
            "It would increase youth interest in politics and governance",
            "Many 16-year-olds are informed and mature enough",
          ],
          oppositionPoints: [
            "Many 16-year-olds still lack life experience",
            "They may be more easily influenced by trends and social media",
            "Legal adulthood and full responsibility come at 18 for good reasons",
          ],
          writeUp:
            "A forward-looking motion that trains students to discuss citizenship, maturity and rights.",
        },
        {
          motion: "Should Artificial Intelligence Replace Teachers?",
          propositionPoints: [
            "AI provides personalized learning",
            "Available 24/7 for students",
            "Reduces teachers' workload",
            "Can quickly assess assignments",
            "Offers consistent teaching quality",
          ],
          oppositionPoints: [
            "Teachers provide emotional support",
            "AI cannot fully understand human emotions",
            "Classroom discipline requires humans",
            "Technology failures disrupt learning",
            "Education involves character building",
          ],
          writeUp:
            "Artificial Intelligence is becoming increasingly common in education. While AI can personalize learning, many believe teachers provide emotional support, mentorship and values that machines cannot replace.",
        },
        {
          motion: "Should Plastic Bags Be Banned?",
          propositionPoints: [
            "Reduces pollution",
            "Protects wildlife",
            "Encourages reusable bags",
            "Supports sustainability",
            "Improves public health",
          ],
          oppositionPoints: [
            "Reusable bags can be expensive",
            "Plastic bags are convenient",
            "Some plastics are recyclable",
            "Businesses may incur extra costs",
            "Alternatives may have drawbacks",
          ],
          writeUp:
            "Plastic bags contribute significantly to pollution, but they are also inexpensive and widely used by businesses and consumers.",
        },
        {
          motion: "Should Social Media Have an Age Limit?",
          propositionPoints: [
            "Protects children online",
            "Reduces cyberbullying",
            "Improves mental health",
            "Protects privacy",
            "Encourages responsible use",
          ],
          oppositionPoints: [
            "Parents should decide",
            "Social media supports learning",
            "Age limits are difficult to enforce",
            "Restricts communication",
            "Many platforms already have limits",
          ],
          writeUp:
            "Social media connects people worldwide, but concerns about cyberbullying, privacy and mental health continue to grow.",
        },
        {
          motion: "Should Coding Be Compulsory in Schools?",
          propositionPoints: [
            "Prepares students for future jobs",
            "Develops logical thinking",
            "Encourages creativity",
            "Improves problem-solving",
            "Supports innovation",
          ],
          oppositionPoints: [
            "Not every career requires coding",
            "Schools lack equipment",
            "Curriculum is already full",
            "Students have different interests",
            "Teacher shortages exist",
          ],
          writeUp:
            "Programming is becoming an essential skill in many careers, but schools already have crowded curricula and varying access to technology.",
        },

        // ===== Extra Topics =====
        {
          motion: "This House Believes Internet Access Should Be a Fundamental Human Right",
          propositionPoints: [
            "Education increasingly depends on the internet",
            "It promotes equal opportunities",
            "Citizens can access government services",
            "Businesses and jobs depend on connectivity",
            "Healthcare and emergency information become more accessible",
          ],
          oppositionPoints: [
            "Providing nationwide internet is expensive",
            "Governments should prioritize food, water and healthcare",
            "Private companies already provide internet services",
            "Infrastructure is difficult in remote areas",
            "Internet access comes with responsibilities, not just rights",
          ],
          writeUp:
            "In today's digital world, internet access is essential for learning, employment, banking, healthcare and communication.",
        },
        {
          motion: "This House Would Replace Cash with Digital Payments",
          propositionPoints: [
            "Reduces robbery and theft",
            "Makes transactions faster",
            "Improves financial transparency",
            "Supports digital economies",
            "Reduces the cost of printing money",
          ],
          oppositionPoints: [
            "Not everyone has bank access",
            "Power or network failures can stop payments",
            "Older people may struggle with technology",
            "Cybercrime becomes a bigger risk",
            "Cash protects financial privacy",
          ],
          writeUp:
            "Many countries are moving toward digital payments. While cashless systems improve efficiency, concerns remain about privacy and financial inclusion.",
        },
        {
          motion: "This House Supports Gene Editing to Prevent Genetic Diseases",
          propositionPoints: [
            "Can eliminate serious inherited diseases",
            "Improves quality of life",
            "Reduces healthcare costs",
            "Supports medical advancement",
            "May save millions of lives",
          ],
          oppositionPoints: [
            "Raises ethical concerns",
            "May lead to designer babies",
            "Long-term effects remain uncertain",
            "Access may favor wealthy families",
            "Could encourage genetic discrimination",
          ],
          writeUp:
            "Gene editing offers hope for treating inherited illnesses but also raises ethical concerns about fairness and unintended consequences.",
        },
        {
          motion: "This House Believes Professional Athletes Are Overpaid",
          propositionPoints: [
            "Teachers and doctors contribute more to society",
            "Sports salaries are excessive",
            "Money could support public services",
            "Salary gaps are too large",
            "Entertainment should not outweigh essential services",
          ],
          oppositionPoints: [
            "Athletes generate enormous revenue",
            "Professional careers are short",
            "High skill deserves high reward",
            "Market demand determines salaries",
            "Sports inspire millions worldwide",
          ],
          writeUp:
            "Professional athletes often earn millions. Some believe these salaries reflect talent, while others argue essential professions deserve greater rewards.",
        },
        {
          motion: "This House Would Ban Fast Fashion",
          propositionPoints: [
            "Reduces pollution",
            "Protects factory workers",
            "Encourages sustainable clothing",
            "Reduces textile waste",
            "Supports ethical businesses",
          ],
          oppositionPoints: [
            "Affordable clothing helps low-income families",
            "Provides millions of jobs",
            "Consumers deserve freedom of choice",
            "Better regulation is preferable to bans",
            "Innovation can reduce pollution",
          ],
          writeUp:
            "Fast fashion provides affordable clothing but contributes to pollution, waste and poor working conditions.",
        },
        {
          motion: "This House Believes Countries Should Invest More in Nuclear Energy",
          propositionPoints: [
            "Produces low-carbon electricity",
            "Generates reliable power",
            "Reduces dependence on fossil fuels",
            "Supports industrial development",
            "Improves national energy security",
          ],
          oppositionPoints: [
            "Nuclear accidents can be devastating",
            "Radioactive waste lasts for many years",
            "Plants are expensive to build",
            "Renewable energy is becoming cheaper",
            "Public safety concerns remain",
          ],
          writeUp:
            "Nuclear power generates large amounts of electricity with low carbon emissions, but concerns about accidents and waste remain.",
        },
        {
          motion: "This House Would Require Every Student to Learn Financial Literacy",
          propositionPoints: [
            "Prepares students for adulthood",
            "Encourages responsible spending",
            "Reduces debt problems",
            "Improves entrepreneurship",
            "Builds financial confidence",
          ],
          oppositionPoints: [
            "Parents should teach money management",
            "The curriculum is already crowded",
            "Financial knowledge changes over time",
            "Students have different career paths",
            "Optional courses are sufficient",
          ],
          writeUp:
            "Many adults struggle with managing money because they never received formal financial education.",
        },
        {
          motion: "This House Would Ban Facial Recognition Technology in Public Places",
          propositionPoints: [
            "Protects citizens' privacy",
            "Reduces government surveillance",
            "Prevents misuse of personal data",
            "Protects civil liberties",
            "Encourages ethical technology use",
          ],
          oppositionPoints: [
            "Helps fight crime",
            "Assists in finding missing persons",
            "Improves national security",
            "Useful during emergencies",
            "Can be regulated instead of banned",
          ],
          writeUp:
            "Facial recognition helps identify criminals and missing persons, but critics argue it threatens privacy.",
        },
        {
          motion: "This House Believes Robots Should Perform Dangerous Jobs",
          propositionPoints: [
            "Protects human lives",
            "Robots can work in dangerous environments",
            "Reduces workplace injuries",
            "Improves efficiency",
            "Can operate continuously",
          ],
          oppositionPoints: [
            "May increase unemployment",
            "Robots are expensive",
            "Machines can malfunction",
            "Human judgment remains essential",
            "Maintenance costs are high",
          ],
          writeUp:
            "Robots are increasingly used in dangerous jobs. While they improve safety, concerns about unemployment remain.",
        },
        {
          motion: "This House Would Introduce Year-Round Schooling",
          propositionPoints: [
            "Improves learning retention",
            "Reduces learning loss",
            "Provides more frequent breaks",
            "Makes better use of school facilities",
            "Can improve academic performance",
          ],
          oppositionPoints: [
            "Families prefer long holidays",
            "Teachers need extended breaks",
            "Holiday jobs become difficult",
            "School maintenance schedules are affected",
            "Traditional calendars are easier to manage",
          ],
          writeUp:
            "Year-round schooling replaces one long vacation with several shorter breaks.",
        },
        {
          motion: "This House Would Make Artificial Intelligence a Core School Subject",
          propositionPoints: [
            "Prepares students for future careers",
            "Improves digital literacy",
            "Encourages innovation",
            "Develops critical thinking",
            "Keeps education relevant",
          ],
          oppositionPoints: [
            "Schools already have crowded curricula",
            "Qualified teachers are limited",
            "Not every career requires AI knowledge",
            "Core literacy and numeracy should remain priorities",
            "Technology changes too rapidly",
          ],
          writeUp:
            "Artificial Intelligence is transforming industries. Should every student learn it?",
        },
        {
          motion: "This House Would Replace Animal Testing with Alternative Methods",
          propositionPoints: [
            "Protects animal welfare",
            "Alternative technologies are improving",
            "Reduces ethical concerns",
            "Encourages scientific innovation",
            "Improves public trust",
          ],
          oppositionPoints: [
            "Medical research still depends on animal testing",
            "Alternatives cannot yet replace every experiment",
            "Human safety must come first",
            "Medical breakthroughs could slow down",
            "Strict regulation is better than a ban",
          ],
          writeUp:
            "Animal testing has helped medicine, but alternatives are improving.",
        },
        {
          motion: "This House Believes School Sports Should Be Compulsory",
          propositionPoints: [
            "Improves physical fitness",
            "Supports mental wellbeing",
            "Builds teamwork",
            "Encourages discipline",
            "Promotes healthy lifestyles",
          ],
          oppositionPoints: [
            "Students have different abilities",
            "Some have medical conditions",
            "Academics may be affected",
            "Choice encourages greater participation",
            "Other extracurricular activities are equally valuable",
          ],
          writeUp:
            "Sports improve health, but not every student enjoys or can participate equally.",
        },
        {
          motion: "This House Would Limit Children's Daily Screen Time by Law",
          propositionPoints: [
            "Protects children's health",
            "Reduces digital addiction",
            "Improves sleep quality",
            "Encourages outdoor activities",
            "Supports mental wellbeing",
          ],
          oppositionPoints: [
            "Parents should make family decisions",
            "Laws are difficult to enforce",
            "Technology also supports education",
            "Children use screens for homework",
            "Families have different needs",
          ],
          writeUp:
            "Should governments regulate children's screen time, or should parents decide?",
        },
        {
          motion: "This House Would Allow Students to Choose Their Own School Subjects from Age 13",
          propositionPoints: [
            "Students learn subjects they enjoy",
            "Better preparation for future careers",
            "Increases motivation",
            "Reduces unnecessary academic stress",
            "Allows deeper learning",
          ],
          oppositionPoints: [
            "Students may change career interests later",
            "A broad education develops balanced individuals",
            "Some essential subjects may be neglected",
            "Young teenagers may not make informed decisions",
            "Schools become harder to manage",
          ],
          writeUp:
            "Should students specialise earlier or keep a broad curriculum?",
        },
        {
          motion: "This House Would Make Public Transport Free",
          propositionPoints: [
            "Reduces traffic congestion",
            "Lowers transportation costs",
            "Improves access to education and work",
            "Reduces air pollution",
            "Encourages public transport use",
          ],
          oppositionPoints: [
            "Government costs would increase",
            "Higher taxes may be required",
            "Transport systems could become overcrowded",
            "Maintenance costs remain high",
            "Users should contribute to services they use",
          ],
          writeUp:
            "Free public transport could reduce congestion and pollution, but funding is a challenge.",
        },
        {
          motion: "This House Would Make Environmental Education a Graduation Requirement",
          propositionPoints: [
            "Promotes environmental awareness",
            "Encourages responsible citizenship",
            "Supports sustainable development",
            "Improves climate education",
            "Benefits future generations",
          ],
          oppositionPoints: [
            "Curriculum is already overloaded",
            "Environmental topics exist in other subjects",
            "Students have different interests",
            "Graduation requirements should remain simple",
            "Schools may lack resources",
          ],
          writeUp:
            "Should every student demonstrate environmental knowledge before graduating?",
        },
      ],
    },
  },
];