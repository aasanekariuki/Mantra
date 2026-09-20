export interface Pillar {
  slug: string;
  title: string;
  short: string;
  description: string;
  color: "ember" | "indigo" | "paper";
}

export interface Program {
  slug: string;
  code: string;
  name: string;
  tagline: string;
  description: string;
  focus: string[];
  status: "active" | "building";
}

export interface Story {
  slug: string;
  category: string;
  title: string;
  dek: string;
  body: string[];
  readingTime: number;
  featured?: boolean;
  sample?: boolean;
}

export interface EventItem {
  slug: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: "upcoming" | "past";
  sample?: boolean;
}

export interface Opportunity {
  slug: string;
  title: string;
  type: "Scholarship" | "Mentorship" | "Fellowship" | "Internship" | "Training" | "Grant";
  organization: string;
  deadline: string;
  description: string;
  sample?: boolean;
}

export interface ResearchItem {
  slug: string;
  title: string;
  type: "Report" | "Insight" | "Data Brief" | "Publication";
  summary: string;
  date: string;
  sample?: boolean;
}

export interface PartnerCategory {
  name: string;
  description: string;
}

export interface InvolvementPath {
  slug: string;
  title: string;
  description: string;
  cta: string;
}
