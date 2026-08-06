// src/data/stories/adventureStories.ts
import type { Story } from "./types";

export const adventureStories: Story[] = [
  {
    id: "adv-001",
    title: "The Map in the Bottle",
    category: "adventure",
    author: "Future X Stories",
    cover: "🗺️",
    summary:
      "Three friends find an ancient map inside a bottle and set out on a journey across the river and into the unknown forest.",
    story: `Amara, Kofi and Zainab found the green glass bottle floating near the riverbank. Inside was a faded map drawn on old parchment.

It showed a path through the Whispering Forest to a place marked only with a star.

"Treasure?" Kofi asked.

"Or trouble," Zainab replied.

They decided to follow it anyway.

They crossed the river on a makeshift raft, climbed the rocky hills, and entered the forest where the trees seemed to lean in and listen.

At the star on the map they found no gold. Instead they found a crystal-clear spring and an old wooden box containing letters from travellers long ago — each one telling of courage, friendship and the real treasure of discovery.

They left their own letter in the box for the next adventurers.

Then they walked home under the stars, richer than they had ever been.`,
    age: "9-13",
    readTime: "5 min",
    difficulty: "Easy",
    xpReward: 30,
    coinReward: 15,
    isPremium: false,
    createdAt: "2026-01-25",
    tags: ["exploration", "friendship", "courage"],
  },
  {
    id: "adv-002",
    title: "Sky Island",
    category: "adventure",
    author: "Future X Stories",
    cover: "☁️",
    summary:
      "A young inventor builds a flying machine and discovers a mysterious floating island above the clouds.",
    story: `Lina had always wanted to touch the clouds. So she built a flying machine from scrap metal, bicycle parts and pure determination.

On a windy morning she launched it from the highest hill.

The machine shook, rattled… then soared.

Above the clouds she found something impossible — a floating island covered in glowing plants and soft moss.

There lived the Cloud Keepers, people who maintained the weather for the world below.

They were running out of the special crystals that powered the storms and sunshine.

Lina used her inventor’s mind to help them build a new system using wind and sunlight.

In return they gave her a small crystal that always pointed home.

She returned to earth changed — and ready for the next adventure waiting in the sky.`,
    age: "10-14",
    readTime: "6 min",
    difficulty: "Medium",
    xpReward: 35,
    coinReward: 18,
    isPremium: false,
    createdAt: "2026-02-12",
    tags: ["invention", "sky", "help"],
  },
];