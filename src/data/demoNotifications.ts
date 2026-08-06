import type { AppNotification } from "../types/user";

/** Shown only when the user has no Firestore notifications yet */
export const demoNotifications: AppNotification[] = [
  {
    id: "demo-1",
    title: "Welcome to Future X",
    body: "Explore vocabulary, Learn X, and amazing facts from your dashboard.",
    type: "system",
    read: false,
    createdAt: new Date().toISOString(),
    href: "/dashboard",
  },
  {
    id: "demo-2",
    title: "Keep your streak alive",
    body: "Study for a few minutes today to protect your day streak.",
    type: "streak",
    read: false,
    createdAt: new Date(Date.now() - 3600_000).toISOString(),
    href: "/dashboard/vocabulary",
  },
  {
    id: "demo-3",
    title: "Tip: Use the dictionary",
    body: "Look up any English word with pronunciation and examples.",
    type: "tip",
    read: true,
    createdAt: new Date(Date.now() - 86400_000).toISOString(),
    href: "/dashboard/dictionary",
  },
];
