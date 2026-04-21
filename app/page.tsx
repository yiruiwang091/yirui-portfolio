"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Mail,
  Github,
  ExternalLink,
  GraduationCap,
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
    subtitle: "Computational Linguistics · NLP Systems · Data Science",
    contact: "Contact",
    heroTag: "Portfolio",
    heroTitle: "Language.\nData.\nSystems.",
    heroDesc:
      "I'm Yirui — a UBC graduate student in Computational Linguistics. I build data-driven tools for language, search, and analysis, with interests in NLP systems, corpus tools, multilingual language technology, and human-centered AI.",
    heroNote:
      "Interested in turning language into something we can search, model, and understand.",
    scrollHint: "Scroll to explore",
    viewProjects: "View Projects",
    experience: "Experience",
    education: "Education",
    focusAreas: "Focus Areas",
    focusTags: [
      "Computational Linguistics",
      "NLP Systems",
      "Corpus Tools",
      "Multilingual Language Technology",
      "Statistical Modeling",
      "Human-Centered AI",
    ],
    projectsTag: "Projects",
    projectsTitle: "Selected work",
    projectsSubtitle: "Projects that show how I build tools, analyze language data, and communicate technical work.",
    experienceTag: "Experience",
    experienceTitle: "Where I've contributed",
    experienceSubtitle:
      "Teaching, mentoring, and community leadership in academic settings.",
    skillsTag: "Skills",
    skillsTitle: "What I can do",
    skillsSubtitle:
      "Technical tools, NLP workflows, and practical strengths developed through coursework and projects.",
    langLabel: "Languages & Frameworks",
    dataLabel: "NLP & Data Work",
    strengthsLabel: "Capabilities",
    connectTitle: "Let's connect",
    connectDesc:
      "Interested in NLP systems, computational linguistics, corpus tools, or data-driven analysis? I’d love to connect.",
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
        title: "Amazon Review Corpus Search Engine",
        period: "COLX 523 · UBC · 2026",
        description:
          "Built a corpus exploration tool for Amazon Sports & Outdoors reviews, combining full-text retrieval, annotation browsing, and sentiment-aware filtering. This project highlights my ability to structure text data for search, design NLP-backed interfaces, and turn large review corpora into usable research tools.",
        stack: ["Python", "FastAPI", "Whoosh", "NLP", "Docker", "Corpus Tools"],
        repo: "https://github.com/yiruiwang091/COLX_523_Projects",
        cta: "Repository",
        demo: "https://colx-523-projects.onrender.com",
        demoCta: "Live Demo",
      },
      {
        title: "Mathematical Modeling",
        period: "MATH 360 · UBC",
        description:
          "Developed deterministic, stochastic, and data-driven models for problems in biology, earth science, chemistry, and physics. This work strengthened my skills in quantitative reasoning, model interpretation, and translating real-world questions into analyzable mathematical forms.",
        stack: ["Modeling", "Python", "Regression", "Scientific Computing"],
        repo: "https://github.com/yiruiwang091/MATH-Projects",
        cta: "Repository",
      },
      {
        title: "Expense Tracker",
        period: "CPSC 210 · UBC",
        description:
          "Built a personal finance application in Java with support for expense tracking, category management, and persistent storage. The project reflects my experience with object-oriented design, GUI development, and translating everyday user needs into functional software.",
        stack: ["Java", "OOP", "JSON", "GUI"],
        repo: "https://github.com/yiruiwang091/Accounting_javafx.git",
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
      languages: ["Python", "R", "Java", "SQL", "FastAPI", "Docker"],
      data: [
        "Corpus search",
        "Text classification",
        "Sentiment analysis",
        "Statistical modeling",
        "Experimental evaluation",
        "Data visualization",
      ],
      strengths: [
        "Build language data tools",
        "Design research prototypes",
        "Analyze multilingual text data",
        "Translate ideas into clear interfaces",
        "Write and present technical work",
        "Collaborate across teams",
      ],
    },
  },
  zh: {
    subtitle: "计算语言学 · NLP 系统 · 数据科学",
    contact: "联系我",
    heroTag: "作品集",
    heroTitle: "语言。\n数据。\n系统。",
    heroDesc:
      "我叫王一锐，在 UBC 攻读计算语言学方向的数据科学硕士。我关注如何把语言问题变成可分析、可建模、可交互的系统，尤其对 NLP、语料库工具、多语言语言技术和数据驱动分析感兴趣。",
    heroNote:
      "我喜欢把语言问题变成可以检索、建模和理解的东西。",
    scrollHint: "下滑了解更多",
    viewProjects: "看看项目",
    experience: "经历",
    education: "教育",
    focusAreas: "方向",
    focusTags: [
      "计算语言学",
      "NLP 系统",
      "语料工具",
      "多语言语言技术",
      "统计建模",
      "以人为中心的 AI",
    ],
    projectsTag: "项目",
    projectsTitle: "做过的事",
    projectsSubtitle: "能体现我如何处理语言数据、搭建工具并清晰表达结果的项目。",
    experienceTag: "经历",
    experienceTitle: "待过的地方",
    experienceSubtitle: "教过课、带过人、也在学术社区里做过一些事。",
    skillsTag: "技能",
    skillsTitle: "我能做什么",
    skillsSubtitle: "课程和项目中积累下来的技术工具、NLP 工作流与实际能力。",
    langLabel: "语言与框架",
    dataLabel: "NLP 与数据工作",
    strengthsLabel: "能力",
    connectTitle: "期待与您联系",
    connectDesc:
      "如果您在寻找 NLP、计算语言学或数据科学方向的人才，欢迎通过邮件或 GitHub 与我取得联系。",
    email: "邮件联系",
    liveDemo: "在线体验",
    viewRepo: "看代码",
    edu: [
      {
        school: "英属哥伦比亚大学 (UBC)",
        degree: "数学 学士",
        year: "2021 – 2025",
      },
      {
        school: "英属哥伦比亚大学 (UBC)",
        degree: "数据科学 硕士 · 计算语言学方向",
        year: "2025 – 2026（在读）",
      },
    ],
    projects: [
      {
        title: "亚马逊评论语料库检索系统",
        period: "COLX 523 · UBC · 2026",
        description:
          "构建了一个面向亚马逊户外用品评论的语料探索工具，支持全文检索、标注浏览和情感过滤。这个项目体现了我把文本数据组织成可搜索资源、设计 NLP 支撑的交互界面、并将大规模评论语料转化为可用研究工具的能力。",
        stack: ["Python", "FastAPI", "Whoosh", "NLP", "Docker", "语料工具"],
        repo: "https://github.com/yiruiwang091/COLX_523_Projects",
        cta: "看代码",
        demo: "https://colx-523-projects.onrender.com",
        demoCta: "在线体验",
      },
      {
        title: "数学建模",
        period: "MATH 360 · UBC",
        description:
          "针对生物、地学、化学和物理中的实际问题，建立了确定性、随机和数据驱动模型。这些项目训练了我把现实问题抽象成可分析数学形式、解释模型结果并进行定量推理的能力。",
        stack: ["建模", "Python", "回归分析", "科学计算"],
        repo: "https://github.com/yiruiwang091/MATH-Projects",
        cta: "看代码",
      },
      {
        title: "记账软件",
        period: "CPSC 210 · UBC",
        description:
          "用 Java 开发了一个个人记账应用，支持收支记录、分类管理和数据持久化。这个项目体现了我在面向对象设计、GUI 开发，以及把日常使用需求转化为可用软件方面的实践能力。",
        stack: ["Java", "OOP", "JSON", "GUI"],
        repo: "https://github.com/yiruiwang091/Accounting_javafx.git",
        cta: "看代码",
      },
    ] as Project[],
    experiences: [
      {
        role: "学生代表",
        org: "UBC MDS-CL",
        detail:
          "帮同学们收集意见反馈给老师，也组织了不少班级活动。",
      },
      {
        role: "数学志愿教师",
        org: "Norma Rose Point 小学",
        detail:
          "给小学生出有挑战性的数学题，带他们理解概念、学会把想法说清楚。",
      },
      {
        role: "中文助教",
        org: "UBC 亚洲研究系",
        detail:
          "在课堂上带学生练中文，做口语引导和即时纠正。",
      },
      {
        role: "英语老师",
        org: "Qkids",
        detail:
          "线上教英语，根据学生年龄和水平调整内容和节奏。",
      },
    ],
    skills: {
      languages: ["Python", "R", "Java", "SQL", "FastAPI", "Docker"],
      data: [
        "语料检索",
        "文本分类",
        "情感分析",
        "统计建模",
        "实验评估",
        "数据可视化",
      ],
      strengths: [
        "搭建语言数据工具",
        "设计研究原型",
        "分析多语言文本数据",
        "把技术想法做成清晰界面",
        "技术写作与展示",
        "跨团队协作开发",
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
  const [lang, setLang] = useState<Lang>("zh");
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
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full opacity-[0.15] blur-[120px]"
            style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)" }}
          />
          <div
            className="absolute top-[10%] right-[-5%] h-[500px] w-[500px] rounded-full opacity-[0.12] blur-[100px]"
            style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)" }}
          />
          <div
            className="absolute bottom-[-10%] left-[30%] h-[400px] w-[400px] rounded-full opacity-[0.10] blur-[100px]"
            style={{ background: "radial-gradient(circle, #f59e0b, transparent 70%)" }}
          />
        </div>

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

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-6 text-sm font-medium uppercase tracking-[0.22em] text-slate-400"
          >
            {c.subtitle}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-6 whitespace-pre-line text-6xl font-bold leading-[1.05] tracking-tight sm:text-8xl lg:text-9xl"
          >
            {c.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-500 sm:text-xl"
          >
            {c.heroDesc}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mx-auto mt-5 max-w-2xl text-sm italic tracking-wide text-slate-400 sm:text-base"
          >
            {c.heroNote}
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
          className="absolute bottom-4 flex flex-col items-center gap-1 text-slate-300"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="h-3.5 w-3.5" />
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
            <footer className="border-t border-slate-200 bg-white px-6 py-6 text-center text-sm text-slate-500">
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-slate-900"
        >
          鲁ICP备2026016044号
        </a>
      </footer>
    </div>
  );
}
