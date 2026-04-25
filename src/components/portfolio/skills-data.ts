import type { ReactElement } from "react";
import {
  DataVizIllustration,
  ETLIllustration,
  ReportingIllustration,
} from "./SkillIllustrations";
import dataVizImage from "@/assets/skills/dataviz.png";
import reportingImage from "@/assets/skills/reporting.jpg";

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
  /** Optional URL to a downloadable / viewable PDF (preview, sample, etc.) */
  pdfUrl?: string;
  /** Label shown on the PDF call-to-action button */
  pdfLabel?: string;
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
    id: "dashboarding",
    slug: "dashboarding",
    name: "Dashboarding",
    description:
      "Designing decision-ready dashboards — KPI hierarchies, drill-downs and narrative layouts that turn complex datasets into clear answers at a glance.",
    long: "I design dashboards that compress hours of analysis into seconds of understanding. From executive overviews to operational control rooms, every component is chosen for the question it answers — not for decoration. Color, hierarchy and motion are tuned so the signal lands first, and the detail rewards a closer look.",
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
    image: reportingImage,
    imageAlt:
      "Olist BI report — cover, contexte, dictionnaire des variables and analyse exploratoire pages",
    project: {
      name: "Olist — Rapport d'Informatique Décisionnelle",
      role: "Data Analyst · Auteur du rapport",
      context:
        "Rapport BI complet sur la marketplace e-commerce brésilienne Olist — du cadrage au diagnostic stratégique, conçu pour servir de référence aux équipes Pilotage & Analyse. Aperçu limité aux 5 premières pages.",
      stack: ["Power BI", "Python", "SQL", "Pareto", "Storytelling"],
      outcomes: [
        "12–13 catégories identifiées comme cœur du chiffre d'affaires (80% via Pareto)",
        "Signal de retard de livraison détecté sur 8,11% des commandes",
        "Synthèse adoptée comme support de décision pour les revues mensuelles",
      ],
      pdfUrl: "/reports/olist-report-preview.pdf",
      pdfLabel: "Read the 5-page preview",
      hotspots: [
        {
          x: 12,
          y: 50,
          depth: 0.55,
          label: "Page de garde",
          detail:
            "Identité visuelle du rapport — Février 2026, étude E-Commerce Olist, signée Daniel Incama (M2 Économie Appliquée).",
        },
        {
          x: 35,
          y: 30,
          depth: 0.7,
          label: "Contexte & sources",
          detail:
            "Cadrage du modèle plateforme Olist + dataset Kaggle (~100 000 commandes Brésil 2016–2018, 9 tables relationnelles).",
        },
        {
          x: 38,
          y: 78,
          depth: 0.45,
          label: "Schéma relationnel",
          detail:
            "Cartographie des jointures entre commandes, paiements, produits, vendeurs et géolocalisation.",
        },
        {
          x: 60,
          y: 45,
          depth: 0.8,
          label: "Dictionnaire des variables",
          detail:
            "52 champs typés (ID, catégoriels, datetime, montants…) — la base d'un modèle sémantique propre et documenté.",
        },
        {
          x: 82,
          y: 32,
          depth: 0.6,
          label: "Profil Olist — KPIs",
          detail:
            "99 421 clients · 3 095 vendeurs · note moyenne 4,09/5 · 8,11% de retards. Indicateurs clés en un coup d'œil.",
        },
        {
          x: 88,
          y: 78,
          depth: 0.4,
          label: "Cadrage stratégique",
          detail:
            "Transition de la lecture descriptive vers l'analyse de performance : moteurs de CA, vendeurs, satisfaction.",
        },
      ],
    },
  },
  {
    id: "data-prep-modeling",
    slug: "data-preparation-modeling",
    name: "Data Preparation & Modeling",
    description:
      "Shaping raw, messy sources into clean, well-modeled datasets — consolidation, transformation and semantic models built for reliable analytics.",
    long: "Clean, well-modeled data is the foundation of every good decision. I consolidate raw sources, enforce explicit business rules in transformations, and design semantic models built for analytics — star schemas, clear grain, documented measures. Every step is observable: schema checks, freshness monitors and tests that fail loudly before bad data reaches a dashboard.",
    highlights: [
      "Source consolidation across APIs, files & databases",
      "Explicit, testable transformation logic",
      "Star-schema & semantic models tuned for BI",
      "Schema, freshness & quality monitoring",
    ],
    tools: ["Python", "SQL", "Power BI", "DAX", "dbt"],
    Illustration: ETLIllustration,
  },
];

export function getSkillBySlug(slug: string): Skill | undefined {
  return SKILLS.find((s) => s.slug === slug);
}
