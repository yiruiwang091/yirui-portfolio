"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
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
  Globe,
  Play,
  ArrowDown,
  ChevronRight,
} from "lucide-react";

// ─── types ───────────────────────────────────────────────────────────────────

type Lang = "en" | "zh";

interface Project {
  title: string;
  period: string;
  description: string;
  stack: string[];
  repo: string;
  cta: string;
  demo?: string;
  demoCta?: string;
}

// ─── i18n ────────────────────────────────────────────────────────────────────

const t = {
  en: {
    subtitle: "Math · Data Science · Computational Linguistics",
    contact: "Contact",
    heroTag: "Portfolio",
    heroTitle: "Mathematics.\nLanguage.\nData.",
    heroDesc:
      "I'm Yirui — a UBC student building at the intersection of computational linguistics, data science, and mathematics. I care about clear thinking, clean analysis, and meaningful collaboration.",
    scrollHint: "Scroll to explore",
    viewProjects: "View Projects",
    experience: "Experience",
    education: "Education",
    focusAreas: "Focus Areas",
    focusTags: [
      "NLP",
      "Machine Learning",
      "Statistical Modeling",
      "Data Analysis",
      "Teaching",
      "Collaborative Research",
    ],
    projectsTag: "Projects",
    projectsTitle: "Selected work",
    projectsSubtitle: "Course projects, research, and personal explorations.",
    experienceTag: "Experience",
    experienceTitle: "Where I've contributed",
    experienceSubtitle:
      "Teaching, mentoring, and community leadership in academic settings.",
    skillsTag: "Skills",
    skillsTitle: "What I work with",
    skillsSubtitle:
      "Technical tools and strengths from coursework and projects.",
    langLabel: "Languages",
    dataLabel: "Data & NLP",
    strengthsLabel: "Strengths",
    connectTitle: "Let's connect",
    connectDesc:
      "Interested in data analysis, NLP, computational linguistics, or education-focused technical work? I'd love to hear from you.",
    email: "Email",
    liveDemo: "Live Demo",
    viewRepo: "Repository",
    edu: [
      {
        school: "University of British Columbia",
        degree: "B.Sc. in Mathematics",
        year: "2021 – 2025",
      },
      {
        school: "University of British Columbia",
        degree: "Master of Data Science — Computational Linguistics",
        year: "2025 – 2026 (Expected)",
      },
    ],
    projects: [
      {
        title: "COLX 523 Team Project",
        period: "UBC · 2026",
        description:
          "A collaborative computational linguistics project focused on data processing, analysis, modeling, and team-based development workflows.",
        stack: ["Python", "Git", "NLP", "Data Analysis", "Team Workflow"],
        repo: "https://github.com/yiruiwang091/COLX_523_Projects",
        cta: "Repository",
        demo: "https://colx-523-projects.onrender.com",
        demoCta: "Live Demo",
      },
      {
        title: "Mathematical Modeling",
        period: "MATH 360 · UBC",
        description:
          "Deterministic, stochastic, and data-driven models applied across biology, earth science, chemistry, and physics.",
        stack: ["Modeling", "Python", "Regression", "Scientific Computing"],
        repo: "https://github.com/yiruiwang091/MATH-Projects",
        cta: "Repository",
      },
      {
        title: "Personal Projects",
        period: "Ongoing",
        description:
          "A growing collection of independent work spanning software construction, data analysis, and experimentation.",
        stack: ["Python", "Java", "R", "SQL"],
        repo: "https://github.com/yiruiwang091/Projects",
        cta: "Repository",
      },
    ] as Project[],
    experiences: [
      {
        role: "Student Representative",
        org: "UBC MDS-CL",
        detail:
          "Liaison between students and teaching team — gathered feedback and organized community-building activities.",
      },
      {
        role: "Math Teacher Volunteer",
        org: "Norma Rose Point Elementary",
        detail:
          "Designed challenging problems, supported conceptual understanding, and helped students communicate mathematical ideas.",
      },
      {
        role: "Mandarin Language Assistant",
        org: "UBC Asian Studies",
        detail:
          "Supported Mandarin learners through guided practice, feedback, and classroom interaction.",
      },
      {
        role: "English Teacher",
        org: "Qkids",
        detail:
          "Delivered interactive online lessons adapted for diverse ages and proficiency levels.",
      },
    ],
    skills: {
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
    },
  },
  zh: {
    subtitle: "数学 · 数据科学 · 计算语言学",
    contact: "联系我",
    heroTag: "个人作品集",
    heroTitle: "数学。\n语言。\n数据。",
    heroDesc:
      "我是王逸睿，UBC 学生，专注于计算语言学、数据科学与数学的交叉领域。我重视清晰的思维、严谨的分析和有意义的协作。",
    scrollHint: "向下滚动探索",
    viewProjects: "查看项目",
    experience: "经历",
    education: "教育背景",
    focusAreas: "研究方向",
    focusTags: [
      "自然语言处理",
      "机器学习",
      "统计建模",
      "数据分析",
      "教学",
      "协作研究",
    ],
    projectsTag: "项目",
    projectsTitle: "精选作品",
    projectsSubtitle: "课程项目、研究成果和个人探索。",
    experienceTag: "经历",
    experienceTitle: "我的贡献",
    experienceSubtitle: "横跨多个学术场景的教学、指导与社区领导经验。",
    skillsTag: "技能",
    skillsTitle: "技术栈",
    skillsSubtitle: "从课程和项目中积累的工具与核心能力。",
    langLabel: "编程语言",
    dataLabel: "数据与 NLP",
    strengthsLabel: "核心优势",
    connectTitle: "联系我",
    connectDesc:
      "如果您对数据分析、自然语言处理、计算语言学或教育方向的技术工作感兴趣，期待与您交流。",
    email: "邮件",
    liveDemo: "在线演示",
    viewRepo: "代码仓库",
    edu: [
      {
        school: "英属哥伦比亚大学 (UBC)",
        degree: "数学理学学士",
        year: "2021 – 2025",
      },
      {
        school: "英属哥伦比亚大学 (UBC)",
        degree: "数据科学硕士 · 计算语言学方向",
        year: "2025 – 2026（预计）",
      },
    ],
    projects: [
      {
        title: "COLX 523 团队项目",
        period: "UBC · 2026",
        description:
          "以数据处理、分析、建模和团队协作为核心的计算语言学合作项目。",
        stack: ["Python", "Git", "NLP", "数据分析", "团队协作"],
        repo: "https://github.com/yiruiwang091/COLX_523_Projects",
        cta: "代码仓库",
        demo: "https://colx-523-projects.onrender.com",
        demoCta: "在线演示",
      },
      {
        title: "数学建模项目",
        period: "MATH 360 · UBC",
        description:
          "涵盖生物、地球科学、化学和物理的数学建模，聚焦确定性、随机性和数据驱动方法。",
        stack: ["建模", "Python", "回归分析", "科学计算"],
        repo: "https://github.com/yiruiwang091/MATH-Projects",
        cta: "代码仓库",
      },
      {
        title: "个人编程项目",
        period: "持续更新",
        description:
          "涵盖软件构建、数据分析和技术探索的个人项目合集。",
        stack: ["Python", "Java", "R", "SQL"],
        repo: "https://github.com/yiruiwang091/Projects",
        cta: "代码仓库",
      },
    ] as Project[],
    experiences: [
      {
        role: "学生代表",
        org: "UBC MDS-CL",
        detail:
          "作为学生与教学团队之间的桥梁，收集反馈并组织社区活动。",
      },
      {
        role: "数学教学志愿者",
        org: "Norma Rose Point 小学",
        detail:
          "设计挑战性题目，帮助学生理解概念并清晰表达数学思路。",
      },
      {
        role: "中文语言助教",
        org: "UBC 亚洲研究系",
        detail:
          "通过引导练习、即时反馈和课堂互动为中文学习者提供支持。",
      },
      {
        role: "英语教师",
        org: "Qkids",
        detail:
          "开展互动式在线课程，针对不同年龄和水平灵活调整教学方式。",
      },
    ],
    skills: {
      languages: ["Python", "R", "Java", "SQL", "Racket"],
      data: ["pandas", "NumPy", "matplotlib", "scikit-learn", "NLTK"],
      strengths: [
        "数据分析",
        "统计建模",
        "自然语言处理",
        "机器学习流程",
        "技术写作",
        "协作开发",
      ],
    },
  },
};

// ─── reveal component (Apple-style scroll reveal) ────────────────────────────

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── section tag ─────────────────────────────────────────────────────────────

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-4 inline-block rounded-full bg-slate-900 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white">
      {children}
    </span>
  );
}

// ─── main page ───────────────────────────────────────────────────────────────

export default function PortfolioSite() {
  const [lang, setLang] = useState<Lang>("en");
  const c = t[lang];
  const toggleLang = () => setLang((p) => (p === "en" ? "zh" : "en"));

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="relative bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* ── floating nav ─────────────────────────────────── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed left-0 right-0 top-0 z-50"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
          <div className="rounded-full bg-white/70 px-5 py-2 shadow-lg shadow-black/[0.03] ring-1 ring-black/[0.04] backdrop-blur-xl">
            <span className="text-sm font-semibold tracking-tight">
              Yirui Wang
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 rounded-full bg-white/70 px-4 py-2 text-sm font-medium shadow-lg shadow-black/[0.03] ring-1 ring-black/[0.04] backdrop-blur-xl transition-all hover:bg-white hover:shadow-md active:scale-95"
            >
              <Globe className="h-3.5 w-3.5" />
              {lang === "en" ? "中文" : "EN"}
            </button>
            <a
              href="mailto:yirui091@student.ubc.ca"
              className="flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all hover:bg-slate-800 active:scale-95"
            >
              <Mail className="h-3.5 w-3.5" />
              {c.contact}
            </a>
          </div>
        </div>
      </motion.nav>

      {/* ━━━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-4xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <SectionTag>{c.heroTag}</SectionTag>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 whitespace-pre-line text-6xl font-bold leading-[1.05] tracking-tight sm:text-8xl lg:text-9xl"
          >
            {c.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-500 sm:text-xl"
          >
            {c.heroDesc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#projects"
              className="group flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3 text-sm font-medium text-white transition-all hover:bg-slate-800 hover:shadow-lg active:scale-[0.97]"
            >
              {c.viewProjects}
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="https://github.com/yiruiwang091"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-slate-100 px-7 py-3 text-sm font-medium text-slate-900 transition-all hover:bg-slate-200 active:scale-[0.97]"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 flex flex-col items-center gap-2 text-slate-400"
        >
          <span className="text-xs uppercase tracking-widest">
            {c.scrollHint}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </section>

      {/* ━━━━ EDUCATION + FOCUS ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-slate-100 bg-slate-50/50">
        <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-2">
          <div className="border-b border-slate-100 p-10 sm:p-16 lg:border-b-0 lg:border-r">
            <Reveal>
              <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-slate-400">
                <GraduationCap className="h-4 w-4" />
                {c.education}
              </div>
              <div className="mt-8 space-y-8">
                {c.edu.map((item, i) => (
                  <Reveal key={i} delay={0.1 * (i + 1)}>
                    <div>
                      <div className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        {item.degree}
                      </div>
                      <div className="mt-2 text-base text-slate-500">
                        {item.school}
                      </div>
                      <div className="mt-1 text-sm text-slate-400">
                        {item.year}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="p-10 sm:p-16">
            <Reveal>
              <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-slate-400">
                <MapPin className="h-4 w-4" />
                {c.focusAreas}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {c.focusTags.map((tag, i) => (
                  <Reveal key={tag} delay={0.05 * (i + 1)}>
                    <span className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm">
                      {tag}
                    </span>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ━━━━ PROJECTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="projects" className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="text-center">
              <SectionTag>{c.projectsTag}</SectionTag>
              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
                {c.projectsTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
                {c.projectsSubtitle}
              </p>
            </div>
          </Reveal>

          <div className="mt-16 space-y-8">
            {c.projects.map((project, i) => (
              <Reveal key={project.title} delay={0.1 * i}>
                <div className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-xl sm:p-12">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-400">
                        {project.period}
                      </div>
                      <h3 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                        {project.title}
                      </h3>
                      <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
                        {project.description}
                      </p>
                    </div>
                    <div className="hidden text-8xl font-bold text-slate-100 sm:block">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-slate-800 hover:shadow-lg active:scale-[0.97]"
                      >
                        <Play className="h-3.5 w-3.5" />
                        {project.demoCta || c.liveDemo}
                      </a>
                    )}
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 hover:shadow-md active:scale-[0.97]"
                    >
                      <Github className="h-3.5 w-3.5" />
                      {project.cta}
                      <ExternalLink className="h-3 w-3 text-slate-400" />
                    </a>
                  </div>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-slate-900 transition-all duration-500 group-hover:w-full" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━ EXPERIENCE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="experience"
        className="border-t border-slate-100 bg-slate-50/50 px-6 py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="text-center">
              <SectionTag>{c.experienceTag}</SectionTag>
              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
                {c.experienceTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
                {c.experienceSubtitle}
              </p>
            </div>
          </Reveal>

          <div className="mx-auto mt-16 max-w-3xl">
            {c.experiences.map((item, i) => (
              <Reveal key={item.role} delay={0.1 * i}>
                <div className="group relative border-l-2 border-slate-200 py-8 pl-8 transition-colors hover:border-slate-900">
                  <div className="absolute -left-[7px] top-10 h-3 w-3 rounded-full border-2 border-slate-200 bg-white transition-colors group-hover:border-slate-900 group-hover:bg-slate-900" />
                  <div className="text-sm font-medium uppercase tracking-widest text-slate-400">
                    {item.org}
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                    {item.role}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-500">
                    {item.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━ SKILLS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="text-center">
              <SectionTag>{c.skillsTag}</SectionTag>
              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
                {c.skillsTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
                {c.skillsSubtitle}
              </p>
            </div>
          </Reveal>

          <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-3">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-slate-400">
                  <Code2 className="h-4 w-4" />
                  {c.langLabel}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {c.skills.languages.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-slate-400">
                  <Sparkles className="h-4 w-4" />
                  {c.dataLabel}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {c.skills.data.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-slate-400">
                  <Languages className="h-4 w-4" />
                  {c.strengthsLabel}
                </div>
                <div className="mt-6 space-y-3">
                  {c.skills.strengths.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-600"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ━━━━ FOOTER CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-slate-900 px-6 py-24 text-white sm:py-32">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
              {c.connectTitle}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
              {c.connectDesc}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:yirui091@student.ubc.ca"
                className="flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-slate-900 transition-all hover:bg-slate-100 hover:shadow-lg active:scale-[0.97]"
              >
                <Mail className="h-4 w-4" />
                {c.email}
              </a>
              <a
                href="https://github.com/yiruiwang091"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition-all hover:bg-white/10 active:scale-[0.97]"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
