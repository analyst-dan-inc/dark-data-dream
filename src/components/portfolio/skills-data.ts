import type { ReactElement } from "react";
import {
  DataVizIllustration,
  ETLIllustration,
  ProgrammingIllustration,
  ReportingIllustration,
} from "./SkillIllustrations";

export type Skill = {
  id: string;
  slug: string;
  name: string;
  description: string;
  long: string;
  highlights: string[];
  tools: string[];
  Illustration: () => ReactElement;
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
