import type { QuizQuestion } from "../types/quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "1",
    lessonId: "animals-1",
    question: "Which animal feeds its young with milk?",
    options: [
      "Bird",
      "Mammal",
      "Fish",
      "Reptile",
    ],
    answer: "Mammal",
  },
  {
    id: "2",
    lessonId: "animals-1",
    question: "Which animal eats plants?",
    options: [
      "Carnivore",
      "Herbivore",
      "Omnivore",
      "Predator",
    ],
    answer: "Herbivore",
  },
  {
    id: "3",
    lessonId: "animals-1",
    question: "A tiger is a...",
    options: [
      "Herbivore",
      "Carnivore",
      "Mammal",
      "Prey",
    ],
    answer: "Carnivore",
  },
];