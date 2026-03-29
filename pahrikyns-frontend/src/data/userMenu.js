import DashboardIcon from "@mui/icons-material/Dashboard";
import InboxIcon from "@mui/icons-material/Inbox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SchoolIcon from "@mui/icons-material/School";
import PaymentsIcon from "@mui/icons-material/Payments";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";

export const userMenu = [
  { label: "Home", icon: DashboardIcon, path: "/dashboard" },
  { label: "Inbox", icon: InboxIcon, path: "/dashboard/messages" },
  { label: "Calendar", icon: CalendarMonthIcon, path: "/dashboard/calendar" },
  { label: "Courses", icon: SchoolIcon, path: "/dashboard/courses" },
  { label: "Payments", icon: PaymentsIcon, path: "/dashboard/subscription" },
  { label: "Achievements", icon: EmojiEventsIcon, path: "/dashboard/achievements" },
  { label: "Community", icon: GroupsIcon, path: "/dashboard/community" },
  { label: "Settings", icon: SettingsIcon, path: "/dashboard/settings" },
];
