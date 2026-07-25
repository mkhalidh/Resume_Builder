import ClassicTemplate from "./ClassicTemplate";
import ModernTemplate from "./ModernTemplate";
import MinimalTemplate from "./MinimalTemplate";

export const templates = [
  {
    id: "classic",
    name: "Classic Gold",
    description: "Warm, friendly two-column layout with a bold header.",
    component: ClassicTemplate,
  },
  {
    id: "modern",
    name: "Modern Jade",
    description: "Dark sidebar profile with a clean, structured timeline.",
    component: ModernTemplate,
  },
  {
    id: "minimal",
    name: "Minimal Mono",
    description: "Quiet, single-column layout that puts the content first.",
    component: MinimalTemplate,
  },
];

export const getTemplate = (id) =>
  templates.find((t) => t.id === id) || templates[0];
