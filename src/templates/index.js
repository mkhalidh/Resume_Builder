import ClassicTemplate from "./ClassicTemplate";
import ModernTemplate from "./ModernTemplate";
import MinimalTemplate from "./MinimalTemplate";
import { EditorialDarkTemplate, EditorialLightTemplate } from "./EditorialTemplate";
import PortfolioTemplate from "./PortfolioTemplate";
import BoldTemplate from "./BoldTemplate";
import TimelineTemplate from "./TimelineTemplate";
import CorporateTemplate from "./CorporateTemplate";
import ATSTemplate from "./ATSTemplate";

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
  {
    id: "portfolio",
    name: "Portfolio Navy",
    description: "Photo sidebar with a timeline of experience and card-style education.",
    component: PortfolioTemplate,
  },
  {
    id: "editorial-dark",
    name: "Editorial Onyx",
    description: "Bold numbered sections on a near-black background.",
    component: EditorialDarkTemplate,
  },
  {
    id: "editorial-light",
    name: "Editorial Sand",
    description: "Bold numbered sections on a warm, paper-like background.",
    component: EditorialLightTemplate,
  },
  {
    id: "bold",
    name: "Bold Coral",
    description: "A vivid color-block header with a photo that breaks the frame.",
    component: BoldTemplate,
  },
  {
    id: "timeline",
    name: "Timeline Slate",
    description: "A connected vertical timeline for experience and education.",
    component: TimelineTemplate,
  },
  {
    id: "corporate",
    name: "Corporate Grid",
    description: "A structured, business-formal layout with a two-tone header.",
    component: CorporateTemplate,
  },
  {
    id: "ats",
    name: "ATS Simple",
    description: "Plain, high-contrast, and built to parse cleanly in applicant tracking systems.",
    component: ATSTemplate,
  },
];

export const getTemplate = (id) =>
  templates.find((t) => t.id === id) || templates[0];
