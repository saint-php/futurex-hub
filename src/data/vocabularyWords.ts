export interface VocabularyWord {
  id: string;
  lessonId: string;
  word: string;
  meaning: string;
  sentence: string;
}

export const vocabularyWords: VocabularyWord[] = [
  {
    id: "1",
    lessonId: "animals-1",
    word: "Mammal",
    meaning: "A warm-blooded animal that feeds its young with milk.",
    sentence: "The lion is a mammal.",
  },
  {
    id: "2",
    lessonId: "animals-1",
    word: "Herbivore",
    meaning: "An animal that feeds on plants.",
    sentence: "A cow is a herbivore.",
  },
  {
    id: "3",
    lessonId: "animals-1",
    word: "Carnivore",
    meaning: "An animal that eats meat.",
    sentence: "The tiger is a carnivore.",
  },
  {
    id: "4",
    lessonId: "animals-1",
    word: "Habitat",
    meaning: "The natural home of an animal.",
    sentence: "Forests are the habitat of many animals.",
  },
  {
    id: "5",
    lessonId: "animals-1",
    word: "Predator",
    meaning: "An animal that hunts other animals.",
    sentence: "The eagle is a predator.",
  },
];