import type { ReactElement } from "react";
import {
  DataVizIllustration,
  ETLIllustration,
  ReportingIllustration,
} from "./SkillIllustrations";
import dataVizImage from "@/assets/skills/dataviz.png";

export type ProjectHotspot = {
  /** Position as % of the image (0–100) */
  x: number;
  y: number;
  /** Parallax depth factor — 0 (static) to 1 (max movement) */
  depth?: number;
  label: string;
  detail: string;
};

export type SkillProject = {
  name: string;
  role: string;
  context: string;
  stack: string[];
  outcomes: string[];
  hotspots?: ProjectHotspot[];
};

export type Skill = {
  id: string;
  slug: string;
  name: string;
  description: string;
  long: string;
  highlights: string[];
  tools: string[];
  Illustration: () => ReactElement;
  image?: string;
  imageAlt?: string;
  project?: SkillProject;
};

export const SKILLS: Skill[] = [
  {
    id: "dataviz",
    slug: "data-visualization",
    name: "Data Visualization",
    description:
      "Translating complex datasets into clear, decision-ready visuals — dashboards, charts and narrative reports that make patterns obvious at a glance.",
    long: "I design visuals that compress hours of analysis into seconds of understanding. From executive dashboards to one-shot narrative charts, every component is chosen for the question it answers — not for decoration. Color, hierarchy and motion are tuned so the signal lands first, and the detail rewards a closer look.",
    highlights: [
      "Executive dashboards with drill-down hierarchy",
      "Narrative charts tuned for storytelling",
      "Accessible color systems & data-ink discipline",
      "Interactive prototypes for stakeholder review",
    ],
    tools: ["Power BI", "Tableau", "Plotly", "D3", "Figma"],
    Illustration: DataVizIllustration,
    image: dataVizImage,
    imageAlt:
      "Olist e-commerce executive dashboard with KPIs, Brazil sales map, customer state trends and order delivery table",
    project: {
      name: "Olist — E-commerce Executive Dashboard",
      role: "Data Analyst · Dashboard Designer",
      context:
        "End-to-end BI workspace for a Brazilian e-commerce marketplace — built to give leadership a single screen for revenue, fulfillment and customer satisfaction.",
      stack: ["Power BI", "DAX", "SQL", "Figma"],
      outcomes: [
        "Reporting prep cut from ~6h/week to near-zero",
        "Surfaced regional delivery delays driving churn in 3 states",
        "Adopted by Pilotage & Analyse teams as weekly source of truth",
      ],
      hotspots: [
        {
          x: 38,
          y: 14,
          depth: 0.6,
          label: "KPI strip",
          detail: "Revenue, AOV, orders & late-delivery rate with WoW deltas.",
        },
        {
          x: 86,
          y: 16,
          depth: 0.45,
          label: "Top categories",
          detail: "Revenue ranking across product categories with bar drill-in.",
        },
        {
          x: 26,
          y: 56,
          depth: 0.8,
          label: "Brazil sales map",
          detail: "Bubble map of orders per state — São Paulo dominates volume.",
        },
        {
          x: 68,
          y: 56,
          depth: 0.55,
          label: "State trend grid",
          detail: "Sparkline per state to spot momentum at a glance.",
        },
        {
          x: 88,
          y: 58,
          depth: 0.5,
          label: "Satisfaction",
          detail: "Average rating 4.3 ★ with distribution & trend per stars.",
        },
        {
          x: 60,
          y: 88,
          depth: 0.35,
          label: "Order log",
          detail: "Operational table with delivery status flagged on-time / late.",
        },
      ],
    },
  },
  {
    id: "reporting",
    slug: "reporting",
    name: "Reporting",
    description:
      "Building automated, stakeholder-tuned reports with the right KPIs, drill-downs and commentary to turn raw numbers into weekly business signal.",
    long: "Reporting is where insight meets routine. I build reporting layers that run themselves — KPIs aligned with business outcomes, automated refreshes, anomaly callouts and written commentary that puts numbers in context. The result: stakeholders open the report and immediately know what changed, why, and what to do next.",
    highlights: [
      "Automated weekly / monthly cadences",
      "KPI frameworks aligned to outcomes",
      "Anomaly detection & written commentary",
      "Self-serve drill-down for stakeholders",
    ],
    tools: ["Power BI", "Excel", "SQL", "Python", "Sheets"],
    Illustration: ReportingIllustration,
  },
  {
    id: "etl",
    slug: "etl",
    name: "ETL",
    description:
      "Designing reliable extract-transform-load pipelines that consolidate sources, enforce quality and deliver clean, modeled data downstream.",
    long: "Clean data is the foundation of every good decision. I design pipelines that extract from messy sources, transform with explicit business rules, and load into models built for analytics. Every step is observable: schema checks, freshness monitors, and tests that fail loudly before bad data reaches a dashboard.",
    highlights: [
      "Source consolidation across APIs, files, DBs",
      "Explicit, testable transformation logic",
      "Schema, freshness & quality monitoring",
      "Modeled marts ready for BI consumption",
    ],
    tools: ["Python", "SQL", "Airflow", "dbt", "NoSQL"],
    Illustration: ETLIllustration,
  },
  {
    id: "programming",
    slug: "data-programming",
    name: "Data Programming",
    description:
      "Hands-on with NoSQL, Python, Excel and Power BI — querying, modeling and scripting end-to-end analytical workflows.",
    long: "I work fluently across the analyst's full toolkit — querying NoSQL stores, scripting transforms in Python, modeling in Power BI and prototyping fast in Excel. The point isn't the language; it's choosing the right tool for the job and stitching them into workflows that are reproducible end to end.",
    highlights: [
      "Python for transforms, analysis, automation",
      "NoSQL querying & document modeling",
      "Excel power-modeling & scenario tools",
      "Power BI semantic models & DAX",
    ],
    tools: ["Python", "NoSQL", "Excel", "Power BI", "DAX"],
    Illustration: ProgrammingIllustration,
  },
];

export function getSkillBySlug(slug: string): Skill | undefined {
  return SKILLS.find((s) => s.slug === slug);
}
