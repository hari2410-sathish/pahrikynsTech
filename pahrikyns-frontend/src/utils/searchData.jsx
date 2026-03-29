import { COURSE_DATA, RESUME_MENU } from "../data/courseData.jsx";
import DescriptionIcon from "@mui/icons-material/Description";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";

export const getUniversalSearchItems = () => {
  let items = [];

  // 1. Add normal course menus
  Object.values(COURSE_DATA).forEach((cat) => {
    if (cat.items) {
      cat.items.forEach((item) => {
        items.push({
          name: item.name,
          link: item.link,
          category: `Course • ${cat.title}`,
          icon: item.icon,
        });
      });
    }
  });

  // 2. Add resume menu
  RESUME_MENU.items.forEach((item) => {
    items.push({
      name: item.name,
      link: item.link,
      category: `Tool • ${RESUME_MENU.title}`,
      icon: <DescriptionIcon />, 
    });
  });

  // 3. Add static platform links
  const platformLinks = [
    { name: "My Dashboard", link: "/dashboard", category: "Platform", icon: <DashboardIcon /> },
    { name: "My Profile", link: "/settings/profile", category: "Platform", icon: <PersonIcon /> },
    { name: "Global Settings", link: "/settings", category: "Platform", icon: <SettingsIcon /> },
    { name: "Browse All Courses", link: "/courses", category: "Platform", icon: <DashboardIcon /> },
  ];
  
  items.push(...platformLinks);

  return items;
};

export const UNIVERSAL_SEARCH_ITEMS = getUniversalSearchItems();

export const performSearch = (query) => {
  if (!query || query.trim() === "") return [];
  const lowerQuery = query.toLowerCase();
  
  return UNIVERSAL_SEARCH_ITEMS.filter((item) => {
    return (
      item.name.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery)
    );
  });
};
