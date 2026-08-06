export interface UserPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  studyReminders: boolean;
  weeklyReport: boolean;
  soundEffects: boolean;
  reduceMotion: boolean;
  theme: "light" | "dark" | "system";
}

export const defaultPreferences: UserPreferences = {
  emailNotifications: true,
  pushNotifications: true,
  studyReminders: true,
  weeklyReport: false,
  soundEffects: true,
  reduceMotion: false,
  theme: "system",
};

export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  photoURL: string;
  role: "student" | "teacher" | "admin";
  level: number;
  xp: number;
  coins: number;
  streak: number;
  totalWords: number;
  completedLessons: number;
  createdAt: any;
  lastLogin: any;
  lastActiveDate?: string;
  preferences?: UserPreferences;
  /** Topic IDs the user has finished reading in Study Courses (no score stored). */
  readTopics?: string[];
  isPaid?: boolean;
paidAt?: any;
paystackReference?: string;
paidAmountKobo?: number;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  type: "reward" | "streak" | "system" | "quiz" | "tip";
  read: boolean;
  createdAt: string;
  href?: string;
}