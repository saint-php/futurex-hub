import {
  LayoutDashboard,
  BookOpen,
  BookMarked,
  FileText,
  Gamepad2,
  Settings,
  BookText,
  Sparkles,
  GraduationCap,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
  end?: boolean;
  comingSoon?: boolean;
}

export const navigation: NavItem[] = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, end: true },
  { name: "Vocabulary", path: "/dashboard/vocabulary", icon: BookOpen },
  { name: "Dictionary", path: "/dashboard/dictionary", icon: BookText },
  { name: "Amazing Facts", path: "/dashboard/amazing-facts", icon: Sparkles },
  { name: "Study Courses", path: "/dashboard/study-online", icon: GraduationCap },
  { name: "Story Books", path: "/dashboard/stories", icon: BookMarked },
  { name: "CBT Practice", path: "/dashboard/cbt", icon: FileText },
  { name: "Club Ideas", path: "/dashboard/clubs", icon: Lightbulb },
  { name: "Games", path: "/dashboard/games", icon: Gamepad2, comingSoon: true },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
];