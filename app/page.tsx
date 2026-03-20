"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Languages,
  Code2,
  Sparkles,
  MapPin,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "COLX 523 Team Project",
    period: "UBC · 2026",
    description:
      "A collaborative computational linguistics project with a focus on data processing, analysis, modeling, and team-based development. This portfolio entry is set up to showcase the project summary, your contribution, screenshots, and final deliverables.",
    stack: ["Python", "Git", "NLP", "Data Analysis", "Team Workflow"],
    repo: "https://github.com/yiruiwang091/COLX_523_Projects",
    cta: "View repository",
  },
  {
    title: "Mathematical Modeling Projects",
    period: "MATH 360 · UBC",
    description:
      "Group projects exploring mathematical models from biology, earth science, chemistry, and physics, with a focus on deterministic, stochastic, and data-driven modeling.",
    stack: ["Modeling", "Python", "Regression", "Scientific Computing"],
    repo: "https://github.com/yiruiwang091/MATH-Projects",
    cta: "View projects",
  },
  {
    title: "Personal Programming Projects",
    period: "Ongoing",
    description:
      "A collection of personal coding projects across software construction, data analysis, and experimentation. This section is ideal for highlighting your strongest technical work as you keep building your portfolio.",
    stack: ["Python", "Java", "R", "SQL"],
    repo: "https://github.com/yiruiwang091/Projects",
    cta: "Browse repo",
  },
];

const experiences = [
  {
    role: "Student Representative",
    org: "UBC MDS-CL",
    detail:
      "Acted as a liaison between students and the teaching team, gathered feedback, and organized community-building activities.",
  },
  {
    role: "Math Teacher Volunteer",
    org: "Norma Rose Point Elementary School",
    detail:
      "Designed challenging math problems, supported conceptual understanding, and helped students communicate mathematical ideas clearly.",
  },
  {
    role: "Mandarin Language Assistant",
    org: "UBC Asian Studies",
    detail:
      "Supported Mandarin learners through guided practice, feedback, and language-focused classroom interaction.",
  },
  {
    role: "English Teacher",
    org: "Qkids",
    detail:
      "Delivered interactive online lessons and adapted teaching style for learners with different ages and proficiency levels.",
  },
];

const skills = {
  languages: ["Python", "R", "Java", "SQL", "Racket"],
  data: ["pandas", "NumPy", "matplotlib", "scikit-learn", "NLTK"],
  strengths: [
    "Data analysis",
    "Statistical modeling",
    "Natural language processing",
    "Machine learning workflows",
    "Technical communication",
    "Collaborative development",
  ],
};

type SectionTitleProps = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function SectionTitle({ icon: Icon, title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <div className="rounded-2xl border bg-white p-3 shadow-sm">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        <p className="mt-1 text-sm text-slate-600 sm:text-base">{subtitle}</p>
      </div>
    </div>
  );
}

export default function PortfolioSite() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <motion.header
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="sticky top-4 z-20 mb-8 rounded-3xl border border-slate-200/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-lg font-semibold">Yirui Wang</div>
              <div className="text-sm text-slate-600">Math · Data Science · Computational Linguistics</div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild className="rounded-2xl">
                <a href="mailto:yirui091@student.ubc.ca">
                  <Mail className="mr-2 h-4 w-4" /> Contact
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-2xl">
                <a href="https://github.com/yiruiwang091" target="_blank" rel="noreferrer">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </a>
              </Button>
            </div>
          </div>
        </motion.header>

        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"
        >
          <Card className="rounded-[2rem] border-slate-200 shadow-sm">
            <CardContent className="p-8 sm:p-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-slate-50 px-3 py-1 text-sm text-slate-700">
                <Sparkles className="h-4 w-4" /> Portfolio
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Building at the intersection of mathematics, language, and data.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                I am a UBC student with a background in Mathematics and Computational Linguistics, interested in data analysis, natural language processing, modeling, and clear technical communication. This site highlights selected coursework, collaborative projects, and teaching-centered experience.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-2xl px-6">
                  <a href="#projects">View Projects</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-2xl px-6">
                  <a href="#experience">Experience</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card className="rounded-[2rem] border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-500">
                  <GraduationCap className="h-4 w-4" /> Education
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="font-medium">University of British Columbia</div>
                    <div className="text-sm text-slate-600">B.Sc. in Mathematics</div>
                    <div className="text-sm text-slate-500">2021 – 2025</div>
                  </div>
                  <div>
                    <div className="font-medium">University of British Columbia</div>
                    <div className="text-sm text-slate-600">Master of Data Science, Computational Linguistics</div>
                    <div className="text-sm text-slate-500">2025 – 2026 (Expected)</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-500">
                  <MapPin className="h-4 w-4" /> Focus Areas
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "NLP",
                    "Machine Learning",
                    "Statistical Modeling",
                    "Data Analysis",
                    "Teaching",
                    "Collaborative Research",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border bg-slate-50 px-3 py-1 text-sm text-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        <motion.section
          id="projects"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <SectionTitle
            icon={Code2}
            title="Selected Projects"
            subtitle="A few repositories and course-based projects that reflect my current interests."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.title} className="rounded-[2rem] border-slate-200 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="text-sm text-slate-500">{project.period}</div>
                  <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border bg-slate-50 px-3 py-1 text-xs text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Button asChild variant="outline" className="rounded-2xl">
                      <a href={project.repo} target="_blank" rel="noreferrer">
                        {project.cta} <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <motion.section
            id="experience"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            <SectionTitle
              icon={Briefcase}
              title="Experience"
              subtitle="Teaching, community, and program leadership across academic settings."
            />
            <div className="space-y-4">
              {experiences.map((item) => (
                <Card key={item.role} className="rounded-[2rem] border-slate-200 shadow-sm">
                  <CardContent className="p-6">
                    <div className="text-lg font-medium">{item.role}</div>
                    <div className="text-sm text-slate-500">{item.org}</div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <SectionTitle
              icon={Languages}
              title="Skills"
              subtitle="Technical tools and strengths drawn from coursework and projects."
            />
            <div className="grid gap-4">
              <Card className="rounded-[2rem] border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-slate-500">Programming Languages</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {skills.languages.map((item) => (
                      <span key={item} className="rounded-full border bg-slate-50 px-3 py-1 text-sm text-slate-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-[2rem] border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-slate-500">Data & NLP Tools</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {skills.data.map((item) => (
                      <span key={item} className="rounded-full border bg-slate-50 px-3 py-1 text-sm text-slate-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-[2rem] border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-slate-500">Strengths</div>
                  <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-600">
                    {skills.strengths.map((item) => (
                      <li key={item} className="rounded-2xl bg-slate-50 px-4 py-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.section>
        </div>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
        >
          <Card className="rounded-[2rem] border-slate-200 shadow-sm">
            <CardContent className="p-8 sm:p-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">Let’s connect</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                    I am especially interested in opportunities related to data analysis, NLP, computational linguistics, and education-focused technical work.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild className="rounded-2xl">
                    <a href="mailto:yirui091@student.ubc.ca">
                      <Mail className="mr-2 h-4 w-4" /> Email
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="rounded-2xl">
                    <a href="https://github.com/yiruiwang091" target="_blank" rel="noreferrer">
                      <Github className="mr-2 h-4 w-4" /> GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}
