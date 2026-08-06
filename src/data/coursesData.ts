import type { Course } from "../types/course";

export const courses: Course[] = [
  {
    id: "english",
    subjectId: "english",
    title: "English Language",
    description: "Grammar, comprehension and figures of speech for exams.",
    icon: "📖",
    gradient: "from-blue-500 to-cyan-500",
    topics: [
      {
        id: "eng-parts-of-speech",
        title: "Parts of Speech",
        summary: "The eight building blocks every sentence is made of.",
        notes:
          "Every word in a sentence plays a job, and grammar calls that job a \"part of speech.\" There are eight of them: nouns, pronouns, verbs, adjectives, adverbs, prepositions, conjunctions and interjections.\n\nA noun names a person, place, thing or idea (Lagos, teacher, happiness). A pronoun replaces a noun so we don't repeat it (he, she, it, they). A verb shows an action or a state of being (run, is, become). An adjective describes a noun (tall, blue, difficult), while an adverb describes a verb, adjective or another adverb, often answering \"how,\" \"when\" or \"where\" (quickly, yesterday, there).\n\nA preposition shows the relationship between a noun and another word in the sentence (in, on, under, before). A conjunction joins words or sentences together (and, but, because). An interjection is a short burst of emotion (Wow! Ouch!).\n\nA simple trick for exams: read the word in context, not alone. \"Light\" can be a noun (\"turn on the light\"), a verb (\"light the candle\") or an adjective (\"a light bag\") depending on the sentence. Always ask: what job is this word doing here?",
        questions: [
          {
            id: "eng-pos-q1",
            question: "Which part of speech names a person, place or thing?",
            options: ["Verb", "Noun", "Adverb", "Conjunction"],
            answer: "Noun",
          },
          {
            id: "eng-pos-q2",
            question: "In the sentence \"She sings beautifully,\" what part of speech is \"beautifully\"?",
            options: ["Adjective", "Noun", "Adverb", "Pronoun"],
            answer: "Adverb",
          },
          {
            id: "eng-pos-q3",
            question: "Which word class is used to join two clauses together?",
            options: ["Preposition", "Conjunction", "Interjection", "Noun"],
            answer: "Conjunction",
          },
          {
            id: "eng-pos-q4",
            question: "In \"The book is under the table,\" which word is the preposition?",
            options: ["Book", "Is", "Under", "Table"],
            answer: "Under",
          },
          {
            id: "eng-pos-q5",
            question: "Which of these best replaces a noun to avoid repetition?",
            options: ["Adjective", "Pronoun", "Adverb", "Preposition"],
            answer: "Pronoun",
          },
        ],
      },
      {
        id: "eng-comprehension",
        title: "Comprehension Skills",
        summary: "How to read a passage and answer questions accurately.",
        notes:
          "Comprehension tests how well you understand a passage, not how fast you read it. Start by skimming the whole passage once to get the general idea before you look at the questions.\n\nWhen you read the questions, underline the exact words in the passage that answer them — examiners usually reward answers that are clearly supported by the text, not guesses from memory. Watch out for words like \"however,\" \"but\" and \"although\"; they often signal a change in the writer's argument and are common places questions are drawn from.\n\nFor \"which word is closest in meaning\" questions, don't just recall a dictionary definition — substitute your chosen option back into the sentence and check whether the meaning still makes sense in that context.\n\nFinally, answer in your own words unless a direct quote is required, and always answer every question — leaving one blank guarantees zero marks, while an honest attempt might still earn credit.",
        questions: [
          {
            id: "eng-comp-q1",
            question: "What should you do before answering comprehension questions?",
            options: [
              "Answer immediately without reading",
              "Skim the whole passage first",
              "Only read the last paragraph",
              "Guess based on the title alone",
            ],
            answer: "Skim the whole passage first",
          },
          {
            id: "eng-comp-q2",
            question: "Words like \"however\" and \"although\" usually signal what?",
            options: [
              "A change in the writer's argument",
              "The end of the passage",
              "A spelling error",
              "A new title",
            ],
            answer: "A change in the writer's argument",
          },
          {
            id: "eng-comp-q3",
            question: "For \"nearest in meaning\" questions, what is the best strategy?",
            options: [
              "Pick the longest word",
              "Substitute the option back into the sentence",
              "Choose the first option listed",
              "Ignore the sentence context",
            ],
            answer: "Substitute the option back into the sentence",
          },
          {
            id: "eng-comp-q4",
            question: "What is the risk of leaving a comprehension question unanswered?",
            options: [
              "You lose half a mark only",
              "You automatically get it right",
              "You guarantee zero marks for it",
              "There is no risk",
            ],
            answer: "You guarantee zero marks for it",
          },
          {
            id: "eng-comp-q5",
            question: "Answers should generally be given in what form?",
            options: [
              "Your own words, unless a quote is required",
              "Copied word-for-word always",
              "Single letters only",
              "As a yes or no",
            ],
            answer: "Your own words, unless a quote is required",
          },
        ],
      },
      {
        id: "eng-figures-of-speech",
        title: "Figures of Speech",
        summary: "Simile, metaphor, personification and other common devices.",
        notes:
          "Figures of speech are ways writers use language beyond its literal meaning to create effect. A simile compares two unlike things using \"like\" or \"as\" (\"as brave as a lion\"). A metaphor also compares two unlike things, but without \"like\" or \"as,\" speaking of one thing as if it were the other (\"time is money\").\n\nPersonification gives human qualities to non-human things (\"the wind whispered\"). Hyperbole is deliberate exaggeration for effect (\"I've told you a million times\"). Irony says the opposite of what is meant, often for humour or emphasis (\"what a beautiful day\" during a storm).\n\nAlliteration repeats the same consonant sound at the start of nearby words (\"Peter Piper picked\"), while onomatopoeia uses words that imitate the sound they describe (buzz, crash, sizzle).\n\nIn exams, don't just name the device — be ready to explain the effect it creates in that specific sentence, since many questions ask for both the identification and the reasoning.",
        questions: [
          {
            id: "eng-fig-q1",
            question: "\"As brave as a lion\" is an example of which figure of speech?",
            options: ["Metaphor", "Simile", "Hyperbole", "Onomatopoeia"],
            answer: "Simile",
          },
          {
            id: "eng-fig-q2",
            question: "\"The wind whispered through the trees\" is an example of what?",
            options: ["Personification", "Irony", "Alliteration", "Simile"],
            answer: "Personification",
          },
          {
            id: "eng-fig-q3",
            question: "Deliberate exaggeration for effect is called:",
            options: ["Hyperbole", "Metaphor", "Onomatopoeia", "Irony"],
            answer: "Hyperbole",
          },
          {
            id: "eng-fig-q4",
            question: "\"Peter Piper picked a peck of pickled peppers\" demonstrates:",
            options: ["Alliteration", "Metaphor", "Personification", "Irony"],
            answer: "Alliteration",
          },
          {
            id: "eng-fig-q5",
            question: "A comparison made WITHOUT using \"like\" or \"as\" is called a:",
            options: ["Simile", "Metaphor", "Hyperbole", "Onomatopoeia"],
            answer: "Metaphor",
          },
        ],
      },
    ],
  },
  {
    id: "mathematics",
    subjectId: "maths",
    title: "Mathematics",
    description: "Core number and algebra skills for UTME and WAEC.",
    icon: "🔢",
    gradient: "from-violet-500 to-purple-600",
    topics: [
      {
        id: "math-fractions",
        title: "Fractions, Decimals & Percentages",
        summary: "Converting between the three and solving real problems.",
        notes:
          "A fraction, a decimal and a percentage are three ways of writing the same value. To turn a fraction into a decimal, divide the numerator by the denominator: 3/4 = 3 ÷ 4 = 0.75. To turn a decimal into a percentage, multiply by 100: 0.75 × 100 = 75%.\n\nTo add or subtract fractions, they must share a common denominator first. For example, 1/2 + 1/3 needs a common denominator of 6: 3/6 + 2/6 = 5/6. To multiply fractions, multiply the numerators together and the denominators together, then simplify. To divide by a fraction, flip it (find its reciprocal) and multiply instead.\n\nFor percentage problems, remember that \"of\" means multiply and \"%\" means \"out of 100.\" So \"20% of 150\" is (20/100) × 150 = 30. For percentage increase or decrease, find the difference, divide by the original value, then multiply by 100.\n\nExam tip: always simplify your final fraction to its lowest terms, and double-check whether the question wants the answer as a fraction, decimal or percentage — losing marks for the wrong format is common and avoidable.",
        questions: [
          {
            id: "math-frac-q1",
            question: "What is 3/4 written as a decimal?",
            options: ["0.34", "0.75", "0.43", "1.34"],
            answer: "0.75",
          },
          {
            id: "math-frac-q2",
            question: "What is 1/2 + 1/3?",
            options: ["2/5", "5/6", "1/6", "2/6"],
            answer: "5/6",
          },
          {
            id: "math-frac-q3",
            question: "What is 20% of 150?",
            options: ["20", "30", "15", "45"],
            answer: "30",
          },
          {
            id: "math-frac-q4",
            question: "To divide by a fraction, you should:",
            options: [
              "Multiply by its reciprocal",
              "Add its reciprocal",
              "Subtract the denominator",
              "Divide the numerators only",
            ],
            answer: "Multiply by its reciprocal",
          },
          {
            id: "math-frac-q5",
            question: "0.6 written as a percentage is:",
            options: ["6%", "0.6%", "60%", "600%"],
            answer: "60%",
          },
        ],
      },
      {
        id: "math-algebra",
        title: "Algebraic Expressions",
        summary: "Simplifying and evaluating expressions with letters and numbers.",
        notes:
          "Algebra uses letters (like x and y) to stand for numbers we don't know yet. An algebraic expression such as 3x + 5 is simplified by combining \"like terms\" — terms that have exactly the same letter part. For example, 4x + 2x simplifies to 6x, but 4x + 2y cannot be combined because x and y are different letters.\n\nTo evaluate an expression, replace the letter with the given number and follow the normal order of operations (brackets, powers, multiplication/division, then addition/subtraction). For example, if x = 3, then 2x + 4 = 2(3) + 4 = 10.\n\nWhen expanding brackets, multiply everything inside the bracket by the term outside: 3(x + 2) = 3x + 6. When two brackets are multiplied, such as (x + 2)(x + 3), multiply each term in the first bracket by each term in the second, then simplify: x² + 3x + 2x + 6 = x² + 5x + 6.\n\nA common mistake is forgetting to multiply the sign as well as the number when expanding, e.g. -2(x - 4) = -2x + 8, not -2x - 8.",
        questions: [
          {
            id: "math-alg-q1",
            question: "Simplify: 4x + 2x",
            options: ["6x", "8x", "6x²", "2x"],
            answer: "6x",
          },
          {
            id: "math-alg-q2",
            question: "If x = 3, what is 2x + 4?",
            options: ["9", "10", "7", "14"],
            answer: "10",
          },
          {
            id: "math-alg-q3",
            question: "Expand: 3(x + 2)",
            options: ["3x + 2", "3x + 6", "x + 6", "3x + 5"],
            answer: "3x + 6",
          },
          {
            id: "math-alg-q4",
            question: "Expand: -2(x - 4)",
            options: ["-2x - 8", "-2x + 8", "2x - 8", "2x + 8"],
            answer: "-2x + 8",
          },
          {
            id: "math-alg-q5",
            question: "Can 4x and 2y be combined into a single term?",
            options: [
              "Yes, they combine to 6x",
              "Yes, they combine to 6y",
              "No, because they have different letters",
              "Yes, they combine to 6xy",
            ],
            answer: "No, because they have different letters",
          },
        ],
      },
      {
        id: "math-equations",
        title: "Simple Equations",
        summary: "Finding the unknown value using balanced operations.",
        notes:
          "An equation is a statement that two expressions are equal, such as 2x + 3 = 11. Solving it means finding the value of x that makes the statement true. The golden rule is: whatever you do to one side of the equation, you must do to the other side too, to keep it balanced.\n\nTo solve 2x + 3 = 11, first remove the +3 by subtracting 3 from both sides: 2x = 8. Then remove the multiplication by dividing both sides by 2: x = 4.\n\nWhen the unknown appears on both sides, such as 5x - 2 = 2x + 7, first gather the x terms on one side and the numbers on the other: 5x - 2x = 7 + 2, giving 3x = 9, so x = 3.\n\nAlways check your answer by substituting it back into the original equation — if both sides give the same number, your solution is correct. This habit catches careless arithmetic mistakes before you lose marks in an exam.",
        questions: [
          {
            id: "math-eqn-q1",
            question: "Solve for x: 2x + 3 = 11",
            options: ["x = 3", "x = 4", "x = 5", "x = 8"],
            answer: "x = 4",
          },
          {
            id: "math-eqn-q2",
            question: "Solve for x: 5x - 2 = 2x + 7",
            options: ["x = 2", "x = 3", "x = 9", "x = 5"],
            answer: "x = 3",
          },
          {
            id: "math-eqn-q3",
            question: "What is the golden rule for solving equations?",
            options: [
              "Only change the left side",
              "Do the same operation to both sides",
              "Ignore the equals sign",
              "Only work with whole numbers",
            ],
            answer: "Do the same operation to both sides",
          },
          {
            id: "math-eqn-q4",
            question: "How can you check if your solution to an equation is correct?",
            options: [
              "Guess a new value",
              "Substitute it back into the original equation",
              "Multiply both sides by zero",
              "Ignore the units",
            ],
            answer: "Substitute it back into the original equation",
          },
          {
            id: "math-eqn-q5",
            question: "Solve for x: 3x = 9",
            options: ["x = 2", "x = 3", "x = 6", "x = 27"],
            answer: "x = 3",
          },
        ],
      },
    ],
  },
  {
    id: "basic-science",
    subjectId: "science",
    title: "Basic Science",
    description: "Foundational biology and life-science concepts.",
    icon: "🔬",
    gradient: "from-emerald-500 to-teal-600",
    topics: [
      {
        id: "sci-living-things",
        title: "Living and Non-living Things",
        summary: "The characteristics that separate life from non-life.",
        notes:
          "All living things share a set of characteristics, often remembered with the acronym MRS GREN: Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, and Nutrition.\n\nMovement means a living thing can change position, even slightly (plants grow toward light). Respiration is the release of energy from food, which happens in every living cell. Sensitivity is the ability to detect and respond to changes in the environment, such as pulling a hand away from something hot.\n\nGrowth means increasing in size or mass over time, while Reproduction is the ability to produce offspring of the same kind. Excretion is the removal of waste products made inside the body, and Nutrition is taking in and using food for energy and growth.\n\nA non-living thing, like a rock or a chair, may show one or two of these features by accident (a rock can be moved by wind) but never shows all seven together. That combination is what tells us something is truly alive.",
        questions: [
          {
            id: "sci-living-q1",
            question: "What does the \"R\" in MRS GREN stand for (the first one)?",
            options: ["Reproduction", "Respiration", "Response", "Recycling"],
            answer: "Respiration",
          },
          {
            id: "sci-living-q2",
            question: "The ability to detect and respond to the environment is called:",
            options: ["Nutrition", "Excretion", "Sensitivity", "Growth"],
            answer: "Sensitivity",
          },
          {
            id: "sci-living-q3",
            question: "Removing waste products made inside the body is called:",
            options: ["Nutrition", "Excretion", "Reproduction", "Movement"],
            answer: "Excretion",
          },
          {
            id: "sci-living-q4",
            question: "Why is a moving rock not considered a living thing?",
            options: [
              "It shows all seven life characteristics",
              "It only shows movement, not the full set of life characteristics",
              "Rocks can reproduce",
              "Rocks respire",
            ],
            answer: "It only shows movement, not the full set of life characteristics",
          },
          {
            id: "sci-living-q5",
            question: "Producing offspring of the same kind is called:",
            options: ["Growth", "Nutrition", "Reproduction", "Respiration"],
            answer: "Reproduction",
          },
        ],
      },
      {
        id: "sci-body-systems",
        title: "The Human Body Systems",
        summary: "How the digestive, circulatory and respiratory systems work.",
        notes:
          "The human body is made up of systems that each have a specific job, but work together to keep us alive. The digestive system breaks down food into small, usable nutrients — starting in the mouth, continuing through the stomach and small intestine, where nutrients are absorbed into the blood.\n\nThe circulatory system, powered by the heart, transports blood carrying oxygen, nutrients, and waste around the body through blood vessels: arteries carry blood away from the heart, and veins carry it back.\n\nThe respiratory system brings oxygen into the body and removes carbon dioxide. Air travels through the nose or mouth, down the trachea, into the lungs, where oxygen passes into the bloodstream in tiny air sacs called alveoli.\n\nThese systems depend on each other: the digestive system supplies nutrients, the respiratory system supplies oxygen, and the circulatory system delivers both to every cell in the body, while carrying away waste for the excretory system to remove.",
        questions: [
          {
            id: "sci-body-q1",
            question: "Which organ pumps blood around the circulatory system?",
            options: ["Lungs", "Heart", "Stomach", "Kidney"],
            answer: "Heart",
          },
          {
            id: "sci-body-q2",
            question: "Where does most nutrient absorption happen during digestion?",
            options: ["Mouth", "Trachea", "Small intestine", "Lungs"],
            answer: "Small intestine",
          },
          {
            id: "sci-body-q3",
            question: "What is the main job of the respiratory system?",
            options: [
              "Breaking down food",
              "Bringing in oxygen and removing carbon dioxide",
              "Pumping blood",
              "Filtering waste from urine",
            ],
            answer: "Bringing in oxygen and removing carbon dioxide",
          },
          {
            id: "sci-body-q4",
            question: "Blood vessels that carry blood away from the heart are called:",
            options: ["Veins", "Arteries", "Alveoli", "Capillaries only"],
            answer: "Arteries",
          },
          {
            id: "sci-body-q5",
            question: "Where does oxygen pass into the bloodstream in the lungs?",
            options: ["Trachea", "Alveoli", "Stomach", "Small intestine"],
            answer: "Alveoli",
          },
        ],
      },
    ],
  },
];

export function getCourse(courseId: string): Course | undefined {
  return courses.find((c) => c.id === courseId);
}

export function getTopic(
  courseId: string,
  topicId: string
): { course: Course; topic: Course["topics"][number] } | undefined {
  const course = getCourse(courseId);
  const topic = course?.topics.find((t) => t.id === topicId);
  if (!course || !topic) return undefined;
  return { course, topic };
}
