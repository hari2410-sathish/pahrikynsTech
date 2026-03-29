/** ========================================================
 * TEMPLATE REGISTRY — PRO VERSION (v1)
 * Central source of truth for all resume templates
 * - Supports free / pro templates
 * - Supports thumbnails
 * - Supports lazy loading
 * - Scalable for future 10+ templates
 * ======================================================== */

import FreeTemplate from "./FreeTemplate";
import ProTemplate from "./ProTemplate";
import UltraTemplate from "./UltraTemplate";

export const TEMPLATE_REGISTRY = [
  // --- FREE TEMPLATES (Group 1) ---
  {
    id: "free-01",
    name: "Classic Professional",
    component: FreeTemplate,
    type: "free",
    category: "Professional",
    thumbnail: "/thumbnails/free-01.png",
    config: {
      colorTheme: { primary: "#000000", secondary: "#333333", text: "#000000", background: "#ffffff" },
      fontFamily: "Inter, sans-serif"
    }
  },
  {
    id: "free-02",
    name: "Clean Minimalist",
    component: FreeTemplate,
    type: "free",
    category: "Minimalist",
    thumbnail: "/thumbnails/free-02.png",
    config: {
      colorTheme: { primary: "#4a5568", secondary: "#718096", text: "#2d3748", background: "#ffffff" },
      fontFamily: "Roboto, sans-serif"
    }
  },
  {
    id: "free-03",
    name: "Standard Resume",
    component: FreeTemplate,
    type: "free",
    category: "Professional",
    thumbnail: "/thumbnails/free-03.png",
    config: {
      colorTheme: { primary: "#2c5282", secondary: "#4299e1", text: "#1a202c", background: "#ffffff" },
      fontFamily: "Merriweather, serif"
    }
  },
  {
    id: "free-04",
    name: "Basic Modern",
    component: FreeTemplate,
    type: "free",
    category: "Modern",
    thumbnail: "/thumbnails/free-04.png",
    config: {
      colorTheme: { primary: "#2b6cb0", secondary: "#bee3f8", text: "#2d3748", background: "#f7fafc" },
      fontFamily: "Poppins, sans-serif"
    }
  },
  {
    id: "free-05",
    name: "Simple Text",
    component: FreeTemplate,
    type: "free",
    category: "Minimalist",
    thumbnail: "/thumbnails/free-05.png",
    config: {
      colorTheme: { primary: "#1a202c", secondary: "#e2e8f0", text: "#000000", background: "#ffffff" },
      fontFamily: "Courier Prime, monospace"
    }
  },
  {
    id: "free-06",
    name: "Entry Level",
    component: FreeTemplate,
    type: "free",
    category: "Professional",
    thumbnail: "/thumbnails/free-06.png",
    config: {
      colorTheme: { primary: "#2f855a", secondary: "#68d391", text: "#22543d", background: "#ffffff" },
      fontFamily: "Lato, sans-serif"
    }
  },
  {
    id: "free-07",
    name: "Internship Ready",
    component: FreeTemplate,
    type: "free",
    category: "Modern",
    thumbnail: "/thumbnails/free-07.png",
    config: {
      colorTheme: { primary: "#ed8936", secondary: "#fbd38d", text: "#744210", background: "#fffaf0" },
      fontFamily: "Open Sans, sans-serif"
    }
  },
  {
    id: "free-08",
    name: "Academic",
    component: FreeTemplate,
    type: "free",
    category: "Professional",
    thumbnail: "/thumbnails/free-08.png",
    config: {
      colorTheme: { primary: "#742a2a", secondary: "#feb2b2", text: "#1a202c", background: "#ffffff" },
      fontFamily: "Georgia, serif"
    }
  },
  {
    id: "free-09",
    name: "Plain Text",
    component: FreeTemplate,
    type: "free",
    category: "Minimalist",
    thumbnail: "/thumbnails/free-09.png",
    config: {
      colorTheme: { primary: "#4a5568", secondary: "#cbd5e0", text: "#2d3748", background: "#edf2f7" },
      fontFamily: "Arial, sans-serif"
    }
  },
  {
    id: "free-10",
    name: "Compact",
    component: FreeTemplate,
    type: "free",
    category: "Modern",
    thumbnail: "/thumbnails/free-10.png",
    config: {
      colorTheme: { primary: "#553c9a", secondary: "#9f7aea", text: "#322659", background: "#ffffff" },
      fontFamily: "Montserrat, sans-serif"
    }
  },

  // --- PRO TEMPLATES (Group 2) ---
  {
    id: "pro-01",
    name: "Executive Suite",
    component: ProTemplate,
    type: "pro",
    category: "Executive",
    thumbnail: "/thumbnails/pro-01.png",
    config: {
      colorTheme: { primary: "#1a365d", secondary: "#90cdf4", text: "#2c5282", background: "#ebf8ff" },
      fontFamily: "Playfair Display, serif"
    }
  },
  {
    id: "pro-02",
    name: "Modern Tech",
    component: ProTemplate,
    type: "pro",
    category: "Modern",
    thumbnail: "/thumbnails/pro-02.png",
    config: {
      colorTheme: { primary: "#3182ce", secondary: "#bee3f8", text: "#2b6cb0", background: "#ffffff" },
      fontFamily: "Inter, sans-serif"
    }
  },
  {
    id: "pro-03",
    name: "Creative Designer",
    component: ProTemplate,
    type: "pro",
    category: "Creative",
    thumbnail: "/thumbnails/pro-03.png",
    config: {
      colorTheme: { primary: "#d53f8c", secondary: "#fbb6ce", text: "#702459", background: "#fff5f7" },
      fontFamily: "Raleway, sans-serif"
    }
  },
  {
    id: "pro-04",
    name: "Startup Founder",
    component: ProTemplate,
    type: "pro",
    category: "Executive",
    thumbnail: "/thumbnails/pro-04.png",
    config: {
      colorTheme: { primary: "#2c7a7b", secondary: "#81e6d9", text: "#234e52", background: "#e6fffa" },
      fontFamily: "Lato, sans-serif"
    }
  },
  {
    id: "pro-05",
    name: "Corporate Blue",
    component: ProTemplate,
    type: "pro",
    category: "Professional",
    thumbnail: "/thumbnails/pro-05.png",
    config: {
      colorTheme: { primary: "#2b6cb0", secondary: "#bee3f8", text: "#2a4365", background: "#ffffff" },
      fontFamily: "Roboto, sans-serif"
    }
  },
  {
    id: "pro-06",
    name: "Sleek Dark",
    component: ProTemplate,
    type: "pro",
    category: "Modern",
    thumbnail: "/thumbnails/pro-06.png",
    config: {
      colorTheme: { primary: "#1a202c", secondary: "#718096", text: "#000000", background: "#f7fafc" },
      fontFamily: "Oswald, sans-serif"
    }
  },
  {
    id: "pro-07",
    name: "Infographic Style",
    component: ProTemplate,
    type: "pro",
    category: "Creative",
    thumbnail: "/thumbnails/pro-07.png",
    config: {
      colorTheme: { primary: "#805ad5", secondary: "#d6bcfa", text: "#44337a", background: "#faf5ff" },
      fontFamily: "Quicksand, sans-serif"
    }
  },
  {
    id: "pro-08",
    name: "Management",
    component: ProTemplate,
    type: "pro",
    category: "Executive",
    thumbnail: "/thumbnails/pro-08.png",
    config: {
      colorTheme: { primary: "#702459", secondary: "#f687b3", text: "#1a202c", background: "#ffffff" },
      fontFamily: "Bitter, serif"
    }
  },
  {
    id: "pro-09",
    name: "Consultant",
    component: ProTemplate,
    type: "pro",
    category: "Professional",
    thumbnail: "/thumbnails/pro-09.png",
    config: {
      colorTheme: { primary: "#744210", secondary: "#f6e05e", text: "#2d3748", background: "#fffff0" },
      fontFamily: "Merriweather, serif"
    }
  },
  {
    id: "pro-10",
    name: "Engineer Pro",
    component: ProTemplate,
    type: "pro",
    category: "Modern",
    thumbnail: "/thumbnails/pro-10.png",
    config: {
      colorTheme: { primary: "#2c5282", secondary: "#63b3ed", text: "#1a202c", background: "#ebf8ff" },
      fontFamily: "Source Sans Pro, sans-serif"
    }
  },

  // --- ULTRA TEMPLATES (Group 3) ---
  {
    id: "ultra-01",
    name: "CEO Special",
    component: UltraTemplate,
    type: "pro",
    category: "Executive",
    thumbnail: "/thumbnails/ultra-01.png",
    config: {
      colorTheme: { primary: "#2a4365", secondary: "#90cdf4", text: "#1a202c", background: "#ffffff" },
      fontFamily: "Cinzel, serif"
    }
  },
  {
    id: "ultra-02",
    name: "Visual Resume",
    component: UltraTemplate,
    type: "pro",
    category: "Creative",
    thumbnail: "/thumbnails/ultra-02.png",
    config: {
      colorTheme: { primary: "#d69e2e", secondary: "#f6e05e", text: "#744210", background: "#fffff0" },
      fontFamily: "Montserrat, sans-serif"
    }
  },
  {
    id: "ultra-03",
    name: "Timeline Layout",
    component: UltraTemplate,
    type: "pro",
    category: "Modern",
    thumbnail: "/thumbnails/ultra-03.png",
    config: {
      colorTheme: { primary: "#38b2ac", secondary: "#81e6d9", text: "#234e52", background: "#e6fffa" },
      fontFamily: "Roboto Slab, serif"
    }
  },
  {
    id: "ultra-04",
    name: "Portfolio Integrated",
    component: UltraTemplate,
    type: "pro",
    category: "Creative",
    thumbnail: "/thumbnails/ultra-04.png",
    config: {
      colorTheme: { primary: "#9f7aea", secondary: "#d6bcfa", text: "#553c9a", background: "#faf5ff" },
      fontFamily: "Nunito, sans-serif"
    }
  },
  {
    id: "ultra-05",
    name: "International",
    component: UltraTemplate,
    type: "pro",
    category: "Professional",
    thumbnail: "/thumbnails/ultra-05.png",
    config: {
      colorTheme: { primary: "#dd6b20", secondary: "#fbd38d", text: "#7b341e", background: "#fffaf0" },
      fontFamily: "Open Sans, sans-serif"
    }
  },
  {
    id: "ultra-06",
    name: "Gradient Flow",
    component: UltraTemplate,
    type: "pro",
    category: "Creative",
    thumbnail: "/thumbnails/ultra-06.png",
    config: {
      colorTheme: { primary: "#d53f8c", secondary: "#fbb6ce", text: "#702459", background: "#fff5f7" },
      fontFamily: "Poppins, sans-serif"
    }
  },
  {
    id: "ultra-07",
    name: "Minimalist Plus",
    component: UltraTemplate,
    type: "pro",
    category: "Minimalist",
    thumbnail: "/thumbnails/ultra-07.png",
    config: {
      colorTheme: { primary: "#718096", secondary: "#cbd5e0", text: "#1a202c", background: "#f7fafc" },
      fontFamily: "Lato, sans-serif"
    }
  },
  {
    id: "ultra-08",
    name: "Bold Statement",
    component: UltraTemplate,
    type: "pro",
    category: "Modern",
    thumbnail: "/thumbnails/ultra-08.png",
    config: {
      colorTheme: { primary: "#e53e3e", secondary: "#feb2b2", text: "#742a2a", background: "#fff5f5" },
      fontFamily: "Anton, sans-serif"
    }
  },
  {
    id: "ultra-09",
    name: "Tech Lead",
    component: UltraTemplate,
    type: "pro",
    category: "Executive",
    thumbnail: "/thumbnails/ultra-09.png",
    config: {
      colorTheme: { primary: "#319795", secondary: "#81e6d9", text: "#285e61", background: "#e6fffa" },
      fontFamily: "Fira Code, monospace"
    }
  },
  {
    id: "ultra-10",
    name: "Full Stack",
    component: UltraTemplate,
    type: "pro",
    category: "Modern",
    thumbnail: "/thumbnails/ultra-10.png",
    config: {
      colorTheme: { primary: "#5a67d8", secondary: "#a3bffa", text: "#434190", background: "#ebf8ff" },
      fontFamily: "Ubuntu, sans-serif"
    }
  },

  // --- BONUS TEMPLATES ---
  {
    id: "bonus-01",
    name: "Marketing Guru",
    component: ProTemplate,
    type: "pro",
    category: "Creative",
    thumbnail: "/thumbnails/bonus-01.png",
    config: {
      colorTheme: { primary: "#ed64a6", secondary: "#fbb6ce", text: "#97266d", background: "#fff5f7" },
      fontFamily: "Raleway, sans-serif"
    }
  },
  {
    id: "bonus-02",
    name: "Sales Pro",
    component: ProTemplate,
    type: "pro",
    category: "Professional",
    thumbnail: "/thumbnails/bonus-02.png",
    config: {
      colorTheme: { primary: "#38a169", secondary: "#9ae6b4", text: "#22543d", background: "#f0fff4" },
      fontFamily: "Montserrat, sans-serif"
    }
  }
];

/**
 * Helper to fetch template by ID
 */
export function getTemplateById(id) {
  return TEMPLATE_REGISTRY.find((t) => t.id === id) || null;
}

/**
 * Helper to fetch component only
 */
export function getTemplateComponent(id) {
  const t = getTemplateById(id);
  return t?.component || null;
}
