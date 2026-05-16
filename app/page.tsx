"use client";

import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Mail,
  Github,
  ExternalLink,
  GraduationCap,
  Languages,
  Code2,
  Sparkles,
  Globe,
  Play,
  ArrowDown,
  ChevronRight,
  Cpu,
} from "lucide-react";

// Canvas components — skip SSR
const WaveGrid = dynamic(() => import("../components/WaveGrid"), { ssr: false });
const CursorGlow = dynamic(() => import("../components/CursorGlow"), { ssr: false });

import DecodeText from "../components/DecodeText";

// ─── types ────────────────────────────────────────────────────────────────────

type Lang = "en" | "zh";

interface Project {
  title: string;
  period: string;
  tldr: string;       // one-line elevator pitch
  description: string;
  highlights: { icon: string; label: string }[];  // 2-3 data stats
  concepts: { term: string; def: string }[];      // professional term glossary
  stack: string[];
  repo?: string;
  cta?: string;
  slug: string;
  demo?: string;
  demoCta?: string;
}

// ─── design tokens ────────────────────────────────────────────────────────────

const C = {
  bg: "#060a14",
  bgSection: "rgba(255,255,255,0.012)",
  card: "rgba(255,255,255,0.035)",
  cardHover: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.08)",
  cyan: "#00d4ff",
  cyanAlpha: "rgba(0,212,255,0.1)",
  purple: "#a855f7",
  purpleAlpha: "rgba(168,85,247,0.1)",
  green: "#00ff88",
  greenAlpha: "rgba(0,255,136,0.08)",
  text: "#f1f5f9",
  textMuted: "#94a3b8",
  textDim: "#475569",
  mono: "var(--font-geist-mono, 'Courier New', monospace)",
};

// ─── i18n ─────────────────────────────────────────────────────────────────────

const t = {
  en: {
    tag: "Portfolio · 作品集",
    // The "thoughtful" opening lines — shown large on the left
    poem: [
      "Between every word",
      "is a structure",
      "waiting to be found.",
    ],
    poemAccent: "I find it.",
    name: "Yirui Wang",
    credentials: "MDS-CL · UBC · Class of 2026",
    subtitle: "Computational Linguistics · NLP · Data Science",
    contact: "Contact",
    viewProjects: "View Projects",
    navLinks: [
      { label: "Projects", href: "#projects" },
      { label: "Experience", href: "#experience" },
      { label: "Skills", href: "#skills" },
    ],
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
    projectsSubtitle:
      "Projects that show how I build tools, analyze language data, and communicate technical work.",
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
      "Interested in NLP systems, computational linguistics, corpus tools, or data-driven analysis? I'd love to connect.",
    email: "Email me",
    liveDemo: "Live Demo",
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
        title: "Cancer Navigation Chatbot — Voice & SMS",
        period: "MDS Capstone · UBC Psychiatry Lab · 2026",
        tldr: "Extended a RAG cancer chatbot with real-time voice (STT/TTS) and SMS modalities for BC patients who can't use text interfaces.",
        description:
          "Collaborated with UBC Psychiatry Lab to make an existing RAG-based cancer navigation chatbot accessible beyond typing. Integrated AWS Transcribe Medical for real-time speech recognition, implemented interruption handling and human-agent handoff for voice calls, and contributed to SMS prompt engineering and multi-turn context management. Evaluated against 200+ clinician-validated Q&A pairs.",
        highlights: [
          { icon: "🎙️", label: "Real-time voice STT/TTS" },
          { icon: "💬", label: "SMS + voice dual-modal" },
          { icon: "🏥", label: "200+ validated Q&A pairs" },
        ],
        concepts: [
          { term: "RAG", def: "Retrieval-Augmented Generation — retrieves relevant docs then generates grounded answers" },
          { term: "STT / TTS", def: "Speech-to/from-Text — medical variant tuned for clinical terminology accuracy" },
          { term: "AWS Bedrock", def: "Managed AWS service for running foundation LLMs in a secure cloud environment" },
        ],
        stack: ["Python", "AWS Bedrock", "RAG", "Amazon Transcribe", "Amazon Polly", "LLM"],
        slug: "psychiatry-chatbot",
      },
      {
        title: "Amazon Review Corpus Search Engine",
        period: "COLX 523 · UBC · 2026",
        tldr: "Full-text search engine over 50k+ Amazon reviews with NLP annotation & sentiment filtering.",
        description:
          "Built a corpus exploration tool for Amazon Sports & Outdoors reviews, combining full-text retrieval, annotation browsing, and sentiment-aware filtering. Highlights my ability to structure text data for search, design NLP-backed interfaces, and turn large review corpora into usable research tools.",
        highlights: [
          { icon: "📄", label: "50k+ reviews indexed" },
          { icon: "🔍", label: "3 search modes" },
          { icon: "🏷️", label: "Sentiment-aware filtering" },
        ],
        concepts: [
          { term: "Corpus", def: "A structured collection of text for linguistic or NLP analysis" },
          { term: "Whoosh", def: "Pure-Python full-text search & indexing library" },
          { term: "FastAPI", def: "High-performance async Python web framework" },
        ],
        stack: ["Python", "FastAPI", "Whoosh", "NLP", "Docker", "Corpus Tools"],
        repo: "https://github.com/yiruiwang091/COLX_523_Projects",
        cta: "Repository",
        slug: "corpus-search",
        demo: "https://colx-523-projects.onrender.com",
        demoCta: "Live Demo",
      },
      {
        title: "Mathematical Modeling",
        period: "MATH 360 · UBC",
        tldr: "Deterministic, stochastic & data-driven models spanning biology, earth science, chemistry and physics.",
        description:
          "Developed deterministic, stochastic, and data-driven models for problems in biology, earth science, chemistry, and physics. Strengthened skills in quantitative reasoning, model interpretation, and translating real-world questions into analyzable mathematical forms.",
        highlights: [
          { icon: "📐", label: "4 scientific domains" },
          { icon: "🎲", label: "Stochastic + ODE models" },
          { icon: "📊", label: "Real-world datasets" },
        ],
        concepts: [
          { term: "Stochastic", def: "Models that incorporate randomness to simulate uncertainty" },
          { term: "ODE", def: "Ordinary Differential Equation — describes how a system evolves over time" },
          { term: "Regression", def: "Statistical technique to quantify relationships between variables" },
        ],
        stack: ["Modeling", "Python", "Regression", "Scientific Computing"],
        repo: "https://github.com/yiruiwang091/MATH-Projects",
        cta: "Repository",
        slug: "math-modeling",
      },
      {
        title: "Expense Tracker",
        period: "CPSC 210 · UBC",
        tldr: "JavaFX desktop finance app with MVC architecture, category management, and JSON persistence.",
        description:
          "Built a personal finance application in Java with support for expense tracking, category management, and persistent storage. Reflects experience with object-oriented design, GUI development, and translating everyday user needs into functional software.",
        highlights: [
          { icon: "🏗️", label: "MVC architecture" },
          { icon: "💾", label: "JSON persistence" },
          { icon: "🖥️", label: "JavaFX GUI" },
        ],
        concepts: [
          { term: "OOP", def: "Object-Oriented Programming — design software around reusable class hierarchies" },
          { term: "MVC", def: "Model-View-Controller — separates data, UI, and business logic" },
          { term: "JavaFX", def: "Java's native UI toolkit for building desktop application interfaces" },
        ],
        stack: ["Java", "OOP", "JSON", "GUI"],
        repo: "https://github.com/yiruiwang091/Accounting_javafx.git",
        cta: "Repository",
        slug: "expense-tracker",
      },
    ] as Project[],
    experiences: [
      {
        role: "Math & Science Tutor",
        org: "Haidao Education · China (Online)",
        period: "Apr 2026 – Present",
        detail: "1-on-1 and small-group math/science tutoring for university students, adapting pace to individual needs.",
      },
      {
        role: "Student Representative",
        org: "UBC MDS-CL",
        period: "",
        detail: "Bridge between students and faculty — collected feedback and organized cohort activities.",
      },
      {
        role: "Math Teacher Volunteer",
        org: "Norma Rose Point Elementary",
        period: "",
        detail: "Designed challenge problems and helped elementary students articulate mathematical reasoning.",
      },
      {
        role: "Mandarin Language Assistant",
        org: "UBC Asian Studies",
        period: "",
        detail: "Led guided speaking practice and provided real-time feedback for Mandarin learners.",
      },
      {
        role: "English Teacher",
        org: "Qkids · China (Online)",
        period: "",
        detail: "Taught interactive online English lessons tailored to different ages and proficiency levels.",
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
    tag: "Portfolio · 作品集",
    poem: [
      "每个词语之间",
      "都藏着一种",
      "等待被发现的结构。",
    ],
    poemAccent: "我去找它。",
    name: "王一锐",
    credentials: "计算语言学硕士 · UBC · 2026 在读",
    subtitle: "计算语言学 · NLP 系统 · 数据科学",
    contact: "联系我",
    viewProjects: "看看项目",
    navLinks: [
      { label: "项目", href: "#projects" },
      { label: "经历", href: "#experience" },
      { label: "技能", href: "#skills" },
    ],
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
    email: "发邮件",
    liveDemo: "在线体验",
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
        title: "癌症导航聊天机器人 — 语音与短信",
        period: "MDS 顶点项目 · UBC 精神科实验室 · 2026",
        tldr: "为无法使用文字界面的 BC 省患者，扩展 RAG 癌症聊天机器人，新增实时语音（STT/TTS）与短信双模态支持。",
        description:
          "与 UBC 精神科实验室合作，让现有基于 RAG 的癌症导航聊天机器人突破文字界面限制。整合 AWS Transcribe Medical 实现实时语音识别，实现打断处理和语音通话中的人工接管，并参与短信提示工程和多轮上下文管理。通过 200+ 临床医生验证的问答对进行评估。",
        highlights: [
          { icon: "🎙️", label: "实时语音 STT/TTS" },
          { icon: "💬", label: "短信 + 语音双模态" },
          { icon: "🏥", label: "200+ 经验证问答对" },
        ],
        concepts: [
          { term: "RAG", def: "检索增强生成——先检索相关文档，再生成有依据的回答" },
          { term: "STT / TTS", def: "语音转文字/文字转语音——医疗版本专为临床术语准确性调优" },
          { term: "AWS Bedrock", def: "AWS 托管服务，用于在安全云环境中运行基础大语言模型" },
        ],
        stack: ["Python", "AWS Bedrock", "RAG", "Amazon Transcribe", "Amazon Polly", "LLM"],
        slug: "psychiatry-chatbot",
      },
      {
        title: "亚马逊评论语料库检索系统",
        period: "COLX 523 · UBC · 2026",
        tldr: "基于 50k+ 亚马逊评论的全文检索引擎，支持 NLP 标注浏览与情感感知过滤。",
        description:
          "构建了一个面向亚马逊户外用品评论的语料探索工具，支持全文检索、标注浏览和情感过滤。体现了我把文本数据组织成可搜索资源、设计 NLP 支撑的交互界面并将大规模评论语料转化为可用研究工具的能力。",
        highlights: [
          { icon: "📄", label: "50k+ 条评论已索引" },
          { icon: "🔍", label: "3 种检索模式" },
          { icon: "🏷️", label: "情感感知过滤" },
        ],
        concepts: [
          { term: "语料库", def: "为语言学或 NLP 分析系统整理的文本数据集合" },
          { term: "Whoosh", def: "纯 Python 实现的全文搜索与索引库" },
          { term: "FastAPI", def: "高性能异步 Python Web 框架，适合构建 API 后端" },
        ],
        stack: ["Python", "FastAPI", "Whoosh", "NLP", "Docker", "语料工具"],
        repo: "https://github.com/yiruiwang091/COLX_523_Projects",
        cta: "看代码",
        slug: "corpus-search",
        demo: "https://colx-523-projects.onrender.com",
        demoCta: "在线体验",
      },
      {
        title: "数学建模",
        period: "MATH 360 · UBC",
        tldr: "跨生物、地学、化学和物理四个领域的确定性、随机与数据驱动建模实践。",
        description:
          "针对生物、地学、化学和物理中的实际问题，建立了确定性、随机和数据驱动模型。训练了我把现实问题抽象成可分析数学形式、解释模型结果并进行定量推理的能力。",
        highlights: [
          { icon: "📐", label: "覆盖 4 个科学领域" },
          { icon: "🎲", label: "随机模型 + 常微分方程" },
          { icon: "📊", label: "基于真实数据集" },
        ],
        concepts: [
          { term: "随机模型", def: "引入概率随机性，用于模拟不确定性的数学模型" },
          { term: "ODE", def: "常微分方程——描述系统状态如何随时间连续变化" },
          { term: "回归分析", def: "量化变量间关系的统计方法" },
        ],
        stack: ["建模", "Python", "回归分析", "科学计算"],
        repo: "https://github.com/yiruiwang091/MATH-Projects",
        cta: "看代码",
        slug: "math-modeling",
      },
      {
        title: "记账软件",
        period: "CPSC 210 · UBC",
        tldr: "基于 JavaFX 的桌面记账应用，采用 MVC 架构，支持分类管理与 JSON 数据持久化。",
        description:
          "用 Java 开发了一个个人记账应用，支持收支记录、分类管理和数据持久化。体现了我在面向对象设计、GUI 开发以及把日常需求转化为可用软件方面的实践能力。",
        highlights: [
          { icon: "🏗️", label: "MVC 架构" },
          { icon: "💾", label: "JSON 持久化存储" },
          { icon: "🖥️", label: "JavaFX 图形界面" },
        ],
        concepts: [
          { term: "OOP", def: "面向对象编程——通过可复用类和继承组织软件结构" },
          { term: "MVC", def: "模型-视图-控制器——将数据、界面与业务逻辑分层解耦" },
          { term: "JavaFX", def: "Java 原生 UI 工具包，用于构建跨平台桌面应用界面" },
        ],
        stack: ["Java", "OOP", "JSON", "GUI"],
        repo: "https://github.com/yiruiwang091/Accounting_javafx.git",
        cta: "看代码",
        slug: "expense-tracker",
      },
    ] as Project[],
    experiences: [
      {
        role: "教学实习",
        org: "海道教育（中国·线上）",
        period: "2026.04 – 至今",
        detail: "为新澳大学生提供一对一及小组数学、科学辅导，识别薄弱点并按个人进度调整教学节奏。",
      },
      {
        role: "学生代表",
        org: "UBC MDS-CL",
        period: "",
        detail: "收集同学意见反馈给教学团队，组织班级社群活动。",
      },
      {
        role: "数学志愿教师",
        org: "Norma Rose Point 小学",
        period: "",
        detail: "出挑战性数学题，帮小学生建立概念理解并学会清晰表达。",
      },
      {
        role: "中文助教",
        org: "UBC 亚洲研究系",
        period: "",
        detail: "带领口语练习，为中文学习者提供即时反馈与纠正。",
      },
      {
        role: "英语老师",
        org: "Qkids（中国·线上）",
        period: "",
        detail: "线上教英语，按学生年龄和水平灵活调整课程内容与节奏。",
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

// ─── scroll reveal ────────────────────────────────────────────────────────────

function Reveal({
  children,
  className = "",
  delay = 0,
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ─── section tag ──────────────────────────────────────────────────────────────

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: C.mono,
        fontSize: "0.62rem",
        letterSpacing: "0.22em",
        color: C.cyan,
        textTransform: "uppercase",
        padding: "5px 14px",
        border: "1px solid rgba(0,212,255,0.3)",
        borderRadius: "4px",
        background: "rgba(0,212,255,0.06)",
        marginBottom: "16px",
      }}
    >
      ⟨ {children} ⟩
    </span>
  );
}

// ─── glow card ────────────────────────────────────────────────────────────────

function GlowCard({
  children,
  style = {},
  glowColor = "cyan",
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  glowColor?: "cyan" | "purple";
}) {
  const [hov, setHov] = useState(false);
  const rgb = glowColor === "purple" ? "168,85,247" : "0,212,255";
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? C.cardHover : C.card,
        border: `1px solid ${hov ? `rgba(${rgb},0.45)` : C.border}`,
        borderRadius: "20px",
        backdropFilter: "blur(24px)",
        transition: "all 0.35s ease",
        boxShadow: hov
          ? `0 0 40px rgba(${rgb},0.1), inset 0 1px 0 rgba(255,255,255,0.05)`
          : "inset 0 1px 0 rgba(255,255,255,0.03)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── terminal window card ─────────────────────────────────────────────────────

function TerminalCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: "14px",
        border: `1px solid ${hov ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.07)"}`,
        overflow: "hidden",
        background: "rgba(6,10,20,0.82)",
        backdropFilter: "blur(28px)",
        boxShadow: hov
          ? "0 0 48px rgba(0,212,255,0.08), 0 24px 64px rgba(0,0,0,0.55)"
          : "0 8px 40px rgba(0,0,0,0.4)",
        transition: "all 0.35s ease",
      }}
    >
      {/* ── title bar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "11px 18px",
          background: "rgba(255,255,255,0.03)",
          borderBottom: `1px solid ${hov ? "rgba(0,212,255,0.18)" : "rgba(255,255,255,0.055)"}`,
          transition: "border-color 0.35s ease",
        }}
      >
        {/* traffic-light dots */}
        <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#28c840" }} />
        </div>

        {/* path */}
        <div
          style={{
            flex: 1,
            fontFamily: C.mono,
            fontSize: "0.7rem",
            letterSpacing: "0.04em",
            color: hov ? "rgba(0,212,255,0.7)" : "rgba(100,116,139,0.8)",
            transition: "color 0.35s ease",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          ~/projects/{project.slug}
        </div>

        {/* index number */}
        <div
          style={{
            fontFamily: C.mono,
            fontSize: "0.62rem",
            letterSpacing: "0.1em",
            color: "rgba(71,85,105,0.5)",
            flexShrink: 0,
          }}
        >
          [{String(index + 1).padStart(2, "0")}]
        </div>
      </div>

      {/* ── body ── */}
      <div style={{ padding: "clamp(24px,3.5vw,44px)" }}>
        {/* period */}
        <div
          style={{
            fontFamily: C.mono,
            fontSize: "0.65rem",
            letterSpacing: "0.14em",
            color: C.cyan,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ color: "rgba(0,212,255,0.4)" }}>▸</span>
          {project.period}
        </div>

        {/* title */}
        <h3
          style={{
            marginTop: "12px",
            fontSize: "clamp(1.25rem,2.6vw,1.9rem)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            color: C.text,
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </h3>

        {/* tldr — one-line summary */}
        <div
          style={{
            marginTop: "14px",
            padding: "10px 16px",
            borderRadius: "6px",
            background: "rgba(0,212,255,0.045)",
            borderLeft: `2px solid rgba(0,212,255,0.5)`,
            display: "flex",
            alignItems: "flex-start",
            gap: "8px",
          }}
        >
          <span style={{ color: C.cyan, fontFamily: C.mono, fontSize: "0.7rem", flexShrink: 0, marginTop: "1px" }}>→</span>
          <span style={{ fontSize: "0.85rem", color: "rgba(148,163,184,0.9)", lineHeight: 1.55 }}>
            {project.tldr}
          </span>
        </div>

        {/* highlights — data stats row */}
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {project.highlights.map((h) => (
            <div
              key={h.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 13px",
                borderRadius: "20px",
                background: "rgba(168,85,247,0.07)",
                border: "1px solid rgba(168,85,247,0.2)",
                fontSize: "0.75rem",
                color: "rgba(168,85,247,0.9)",
                fontFamily: C.mono,
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: "0.8rem" }}>{h.icon}</span>
              {h.label}
            </div>
          ))}
        </div>

        {/* description */}
        <p
          style={{
            marginTop: "18px",
            fontSize: "0.92rem",
            lineHeight: 1.78,
            color: C.textMuted,
            maxWidth: "700px",
          }}
        >
          {project.description}
        </p>

        {/* concepts — glossary */}
        <div
          style={{
            marginTop: "20px",
            paddingTop: "16px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              fontFamily: C.mono,
              fontSize: "0.58rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: C.textDim,
              marginBottom: "10px",
            }}
          >
            key concepts
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            {project.concepts.map((c) => (
              <div key={c.term} style={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
                <span
                  style={{
                    fontFamily: C.mono,
                    fontSize: "0.72rem",
                    color: C.cyan,
                    flexShrink: 0,
                    minWidth: "96px",
                  }}
                >
                  {c.term}
                </span>
                <span style={{ fontSize: "0.8rem", color: C.textDim, lineHeight: 1.5 }}>
                  {c.def}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* stack tags */}
        <div style={{ marginTop: "18px", display: "flex", flexWrap: "wrap", gap: "7px" }}>
          {project.stack.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "3px 11px",
                borderRadius: "4px",
                background: "rgba(0,212,255,0.06)",
                border: "1px solid rgba(0,212,255,0.18)",
                color: "rgba(0,212,255,0.8)",
                fontSize: "0.7rem",
                fontFamily: C.mono,
                letterSpacing: "0.05em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ marginTop: "22px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: "7px",
                background: `linear-gradient(135deg, ${C.cyan}, ${C.purple})`,
                padding: "9px 20px", borderRadius: "6px",
                color: "#fff", textDecoration: "none",
                fontSize: "0.78rem", fontWeight: 600,
                boxShadow: "0 0 16px rgba(0,212,255,0.2)",
                transition: "all 0.2s",
              }}
            >
              <Play size={11} />{project.demoCta}
            </a>
          )}
          {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: "7px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "9px 20px", borderRadius: "6px",
              color: C.textMuted, textDecoration: "none",
              fontSize: "0.78rem", fontWeight: 500,
              transition: "all 0.2s",
            }}
          >
            <Github size={11} />{project.cta}
            <ExternalLink size={9} style={{ color: C.textDim }} />
          </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── bento sub-cards ─────────────────────────────────────────────────────────

/** Compact terminal card — used for p2, p3 cells in the bento grid */
function CompactProjectCard({ project, index }: { project: Project; index: number }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "14px",
        border: `1px solid ${hov ? "rgba(0,212,255,0.35)" : "rgba(255,255,255,0.07)"}`,
        overflow: "hidden",
        background: "rgba(6,10,20,0.82)",
        backdropFilter: "blur(28px)",
        boxShadow: hov ? "0 0 36px rgba(0,212,255,0.07)" : "0 6px 28px rgba(0,0,0,0.35)",
        transition: "all 0.3s ease",
      }}
    >
      {/* title bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", background: "rgba(255,255,255,0.03)", borderBottom: `1px solid ${hov ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.05)"}`, transition: "border-color 0.3s", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: "5px" }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#28c840" }} />
        </div>
        <div style={{ flex: 1, fontFamily: C.mono, fontSize: "0.66rem", color: hov ? "rgba(0,212,255,0.65)" : "rgba(100,116,139,0.75)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", transition: "color 0.3s" }}>
          ~/projects/{project.slug}
        </div>
        <div style={{ fontFamily: C.mono, fontSize: "0.6rem", color: "rgba(71,85,105,0.45)", flexShrink: 0 }}>
          [{String(index + 1).padStart(2, "0")}]
        </div>
      </div>
      {/* body */}
      <div style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: C.mono, fontSize: "0.62rem", letterSpacing: "0.12em", color: C.cyan, display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ color: "rgba(0,212,255,0.35)" }}>▸</span>{project.period}
        </div>
        <h3 style={{ marginTop: "10px", fontSize: "clamp(1rem,2vw,1.35rem)", fontWeight: 700, letterSpacing: "-0.02em", color: C.text, lineHeight: 1.25 }}>
          {project.title}
        </h3>
        {/* tldr */}
        <div style={{ marginTop: "12px", padding: "8px 12px", borderRadius: "6px", background: "rgba(0,212,255,0.04)", borderLeft: "2px solid rgba(0,212,255,0.4)", display: "flex", gap: "7px" }}>
          <span style={{ color: C.cyan, fontFamily: C.mono, fontSize: "0.66rem", flexShrink: 0 }}>→</span>
          <span style={{ fontSize: "0.78rem", color: "rgba(148,163,184,0.85)", lineHeight: 1.5 }}>{project.tldr}</span>
        </div>
        {/* highlights — top 2 only */}
        <div style={{ marginTop: "12px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {project.highlights.slice(0, 2).map((h) => (
            <div key={h.label} style={{ display: "flex", alignItems: "center", gap: "5px", padding: "4px 10px", borderRadius: "16px", background: "rgba(168,85,247,0.07)", border: "1px solid rgba(168,85,247,0.18)", fontSize: "0.7rem", color: "rgba(168,85,247,0.85)", fontFamily: C.mono, whiteSpace: "nowrap" }}>
              <span style={{ fontSize: "0.72rem" }}>{h.icon}</span>{h.label}
            </div>
          ))}
        </div>
        {/* stack */}
        <div style={{ marginTop: "auto", paddingTop: "14px", display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {project.stack.slice(0, 4).map((tag) => (
            <span key={tag} style={{ padding: "2px 9px", borderRadius: "4px", background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.15)", color: "rgba(0,212,255,0.75)", fontSize: "0.67rem", fontFamily: C.mono }}>
              {tag}
            </span>
          ))}
        </div>
        {/* CTAs */}
        <div style={{ marginTop: "12px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "5px", background: `linear-gradient(135deg,${C.cyan},${C.purple})`, padding: "7px 14px", borderRadius: "6px", color: "#fff", textDecoration: "none", fontSize: "0.73rem", fontWeight: 600 }}>
              <Play size={10} />{project.demoCta}
            </a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "5px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", padding: "7px 14px", borderRadius: "6px", color: C.textMuted, textDecoration: "none", fontSize: "0.73rem" }}>
              <Github size={10} />{project.cta}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/** Education + Focus card — tall, spans 2 rows */
function EduFocusCard({ c }: { c: typeof t.en }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: "14px", border: "1px solid rgba(168,85,247,0.2)", background: "rgba(168,85,247,0.03)", backdropFilter: "blur(28px)", padding: "clamp(20px,2.5vw,32px)", boxShadow: "0 6px 28px rgba(0,0,0,0.3)" }}>
      {/* Education */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: C.mono, fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.textDim }}>
        <GraduationCap size={11} style={{ color: C.purple }} />
        {c.education}
      </div>
      <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>
        {c.edu.map((item, i) => (
          <div key={i} style={{ borderLeft: "2px solid rgba(168,85,247,0.3)", paddingLeft: "14px" }}>
            <div style={{ fontFamily: C.mono, fontSize: "0.6rem", letterSpacing: "0.1em", color: C.purple }}>{item.year}</div>
            <div style={{ marginTop: "4px", fontSize: "clamp(0.82rem,1.3vw,0.98rem)", fontWeight: 700, lineHeight: 1.3, color: C.text }}>{item.degree}</div>
            <div style={{ marginTop: "3px", fontSize: "0.74rem", color: C.textDim }}>{item.school}</div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ margin: "16px 0", height: "1px", background: "rgba(168,85,247,0.12)" }} />

      {/* Focus areas */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: C.mono, fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.textDim }}>
        <Cpu size={11} style={{ color: C.purple }} />
        {c.focusAreas}
      </div>
      <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {c.focusTags.map((tag) => (
          <span key={tag} style={{ padding: "4px 10px", borderRadius: "100px", background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.22)", color: "rgba(168,85,247,0.85)", fontSize: "0.71rem" }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Experience bento card — infinite horizontal marquee, pauses on hover */
function ExperienceCard({ c }: { c: typeof t.en }) {
  const [paused, setPaused] = useState(false);
  // Duplicate so the second copy follows seamlessly; translateX(-50%) = one full set
  const items = [...c.experiences, ...c.experiences];

  return (
    <div style={{ borderRadius: "14px", border: "1px solid rgba(0,212,255,0.12)", background: "rgba(6,10,20,0.7)", backdropFilter: "blur(28px)", padding: "clamp(16px,2vw,28px) clamp(20px,2.5vw,32px)", overflow: "hidden" }}>
      {/* header */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: C.mono, fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: C.textDim, marginBottom: "18px" }}>
        <Sparkles size={11} style={{ color: C.cyan }} />
        {c.experienceTag}
      </div>

      {/* scroll viewport */}
      <div
        style={{ position: "relative", overflow: "hidden" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* left fade */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "64px", background: "linear-gradient(to right, rgba(6,10,20,0.95), transparent)", zIndex: 2, pointerEvents: "none" }} />
        {/* right fade */}
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "64px", background: "linear-gradient(to left, rgba(6,10,20,0.95), transparent)", zIndex: 2, pointerEvents: "none" }} />

        {/* scrolling track */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            width: "max-content",
            animation: "marquee-scroll 28s linear infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                width: "264px",
                flexShrink: 0,
                padding: "16px 18px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                position: "relative",
              }}
            >
              <div style={{ position: "absolute", top: "11px", right: "13px", fontFamily: C.mono, fontSize: "0.57rem", color: "rgba(71,85,105,0.4)" }}>
                {String((i % c.experiences.length) + 1).padStart(2, "0")}
              </div>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.cyan, boxShadow: `0 0 8px ${C.cyan}`, marginBottom: "3px" }} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "6px" }}>
                <div style={{ fontFamily: C.mono, fontSize: "0.59rem", letterSpacing: "0.09em", color: C.cyan, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{item.org}</div>
                {item.period && (
                  <div style={{ fontFamily: C.mono, fontSize: "0.55rem", color: "rgba(71,85,105,0.7)", flexShrink: 0 }}>{item.period}</div>
                )}
              </div>
              <div style={{ fontSize: "0.88rem", fontWeight: 700, color: C.text, lineHeight: 1.25 }}>{item.role}</div>
              <div style={{ fontSize: "0.75rem", color: C.textDim, lineHeight: 1.55, marginTop: "2px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
                {item.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Skills bento card — compact tag cloud */
function SkillsBentoCard({ c }: { c: typeof t.en }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: "14px", border: "1px solid rgba(0,255,136,0.15)", background: "rgba(0,255,136,0.02)", backdropFilter: "blur(28px)", padding: "clamp(20px,2.5vw,32px)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: C.mono, fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.textDim, marginBottom: "18px" }}>
        <Code2 size={11} style={{ color: C.green }} />
        {c.skillsTag}
      </div>
      {/* Languages */}
      <div style={{ fontFamily: C.mono, fontSize: "0.58rem", letterSpacing: "0.15em", color: C.textDim, marginBottom: "8px" }}>{c.langLabel}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
        {c.skills.languages.map((s) => (
          <span key={s} style={{ padding: "3px 10px", borderRadius: "4px", background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.2)", color: C.cyan, fontSize: "0.72rem", fontFamily: C.mono }}>{s}</span>
        ))}
      </div>
      {/* NLP */}
      <div style={{ fontFamily: C.mono, fontSize: "0.58rem", letterSpacing: "0.15em", color: C.textDim, marginBottom: "8px" }}>{c.dataLabel}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
        {c.skills.data.map((s) => (
          <span key={s} style={{ padding: "3px 10px", borderRadius: "4px", background: "rgba(168,85,247,0.07)", border: "1px solid rgba(168,85,247,0.2)", color: C.purple, fontSize: "0.72rem", fontFamily: C.mono }}>{s}</span>
        ))}
      </div>
      {/* Strengths */}
      <div style={{ fontFamily: C.mono, fontSize: "0.58rem", letterSpacing: "0.15em", color: C.textDim, marginBottom: "8px" }}>{c.strengthsLabel}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        {c.skills.strengths.map((s) => (
          <div key={s} style={{ padding: "6px 10px", borderRadius: "6px", background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.12)", color: C.textMuted, fontSize: "0.76rem" }}>{s}</div>
        ))}
      </div>
    </div>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

export default function PortfolioSite() {
  const [lang, setLang] = useState<Lang>("zh");
  const c = t[lang];
  const toggleLang = () => setLang((p) => (p === "en" ? "zh" : "en"));

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: "100vh" }}>
      {/* ── custom cursor ── */}
      <CursorGlow />

      {/* ══ NAV ══════════════════════════════════════════════════════════════ */}
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "16px 36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* logo */}
        <div style={{ background: "rgba(6,10,20,0.8)", backdropFilter: "blur(20px)", border: `1px solid ${C.border}`, borderRadius: "100px", padding: "8px 20px" }}>
          <span style={{ fontFamily: C.mono, fontSize: "0.82rem", letterSpacing: "0.06em", color: C.text }}>Yirui Wang</span>
        </div>

        {/* centre nav links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            background: "rgba(6,10,20,0.8)",
            backdropFilter: "blur(20px)",
            border: `1px solid ${C.border}`,
            borderRadius: "100px",
            padding: "5px 8px",
          }}
        >
          {c.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                padding: "5px 16px",
                borderRadius: "100px",
                fontSize: "0.78rem",
                color: C.textMuted,
                textDecoration: "none",
                fontWeight: 500,
                letterSpacing: "0.02em",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = C.text;
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = C.textMuted;
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={toggleLang}
            style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(6,10,20,0.8)", backdropFilter: "blur(20px)", border: `1px solid ${C.border}`, borderRadius: "100px", padding: "8px 16px", color: C.textMuted, fontSize: "0.78rem", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}
          >
            <Globe size={12} />
            {lang === "en" ? "中文" : "EN"}
          </button>
          <a
            href="mailto:yirui091@student.ubc.ca"
            style={{ display: "flex", alignItems: "center", gap: "6px", background: "linear-gradient(135deg, rgba(0,212,255,0.85), rgba(168,85,247,0.85))", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "100px", padding: "8px 18px", color: "#fff", fontSize: "0.78rem", textDecoration: "none", fontWeight: 600, boxShadow: "0 0 22px rgba(0,212,255,0.25)", transition: "all 0.2s" }}
          >
            <Mail size={12} />
            {c.contact}
          </a>
        </div>
      </motion.nav>

      {/* ══ HERO — FULL-SCREEN WAVE GRID BACKGROUND ═════════════════════════ */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        {/* ── Wave grid: absolute, covers the entire section ── */}
        <div style={{ position: "absolute", inset: 0 }}>
          <WaveGrid />
        </div>

        {/* ── Vignette: dims the background behind the text ── */}
        {/* Outer edges stay vivid; center where text lives is darkened */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: [
              // Horizontal band that runs across the text area
              "linear-gradient(to bottom, rgba(6,10,20,0.55) 0%, rgba(6,10,20,0.0) 18%, rgba(6,10,20,0.0) 82%, rgba(6,10,20,0.55) 100%)",
            ].join(","),
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            // Soft dark oval centered exactly where the text block sits
            background:
              "radial-gradient(ellipse 72% 62% at 50% 50%, rgba(6,10,20,0.88) 0%, rgba(6,10,20,0.72) 35%, rgba(6,10,20,0.3) 65%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* ── Centered text content ── */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "clamp(80px,10vh,120px) clamp(24px,6vw,80px) clamp(80px,10vh,100px)",
          }}
        >
          {/* tag */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span
              style={{
                fontFamily: C.mono,
                fontSize: "0.62rem",
                letterSpacing: "0.25em",
                color: "rgba(71,85,105,0.85)",
                textTransform: "uppercase",
              }}
            >
              {c.tag}
            </span>
          </motion.div>

          {/* poem lines — fade + rise + decode scramble */}
          <div style={{ marginTop: "32px" }}>
            {c.poem.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.45 + i * 0.13, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  fontSize: "clamp(2.2rem, 5.5vw, 4.8rem)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  color: i === 0 ? C.text : i === 1 ? C.textMuted : "rgba(148,163,184,0.55)",
                }}
              >
                <DecodeText
                  text={line}
                  lang={lang}
                  delay={(0.45 + i * 0.13) * 1000}
                  duration={820}
                />
              </motion.div>
            ))}

            {/* accent line — cyan → purple gradient */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.45 + c.poem.length * 0.13, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                fontSize: "clamp(2.2rem, 5.5vw, 4.8rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                marginTop: "4px",
                background: `linear-gradient(135deg, ${C.cyan} 0%, ${C.purple} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <DecodeText
                text={c.poemAccent}
                lang={lang}
                delay={(0.45 + c.poem.length * 0.13) * 1000}
                duration={600}
              />
            </motion.div>
          </div>

          {/* thin divider line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.05, ease: "easeOut" }}
            style={{
              marginTop: "36px",
              width: "56px",
              height: "1px",
              background: `linear-gradient(90deg, transparent, ${C.cyan}, ${C.purple}, transparent)`,
            }}
          />

          {/* name + credentials */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 1.15 }}
            style={{ marginTop: "24px" }}
          >
            <div
              style={{
                fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
                fontWeight: 700,
                color: C.text,
                letterSpacing: "-0.01em",
              }}
            >
              {c.name}
            </div>
            <div
              style={{
                marginTop: "6px",
                fontFamily: C.mono,
                fontSize: "0.68rem",
                letterSpacing: "0.14em",
                color: C.textDim,
              }}
            >
              {c.credentials}
            </div>
            <div
              style={{
                marginTop: "4px",
                fontFamily: C.mono,
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                color: "rgba(71,85,105,0.65)",
              }}
            >
              {c.subtitle}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 1.3 }}
            style={{
              marginTop: "36px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <a
              href="#projects"
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: `linear-gradient(135deg, ${C.cyan}, ${C.purple})`,
                padding: "12px 28px", borderRadius: "100px", color: "#fff",
                textDecoration: "none", fontSize: "0.85rem", fontWeight: 600,
                boxShadow: "0 0 28px rgba(0,212,255,0.3)",
                transition: "opacity 0.2s",
              }}
            >
              {c.viewProjects}
              <ChevronRight size={14} />
            </a>
            <a
              href="https://github.com/yiruiwang091"
              target="_blank" rel="noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)",
                border: `1px solid ${C.border}`, padding: "12px 28px",
                borderRadius: "100px", color: C.textMuted,
                textDecoration: "none", fontSize: "0.85rem", fontWeight: 500,
                transition: "all 0.2s",
              }}
            >
              <Github size={14} />
              GitHub
            </a>
          </motion.div>

          {/* scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            style={{
              marginTop: "clamp(48px, 8vh, 80px)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
              color: C.textDim,
            }}
          >
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}>
              <ArrowDown size={13} />
            </motion.div>
            <span style={{ fontFamily: C.mono, fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>
              scroll
            </span>
          </motion.div>
        </div>
      </section>

      {/* ══ BENTO GRID ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(24px,4vw,48px) clamp(16px,3vw,40px)", borderTop: `1px solid ${C.border}` }}>
        {/*
          Grid logic:
            Row 1 — Featured project (2 col) | Education (1 col)  ← showcase vs. background
            Row 2 — Project 2 (1 col) | Project 3 (1 col) | Project 4 (1 col)
            Row 3 — Experience (2 col) | Skills (1 col)
        */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateAreas: `"p1 p1 edu" "p2 p3 p4" "exp exp sk"`,
            gap: "14px",
          }}
        >
          {/* ── P1: Featured project ── */}
          <Reveal style={{ gridArea: "p1" }}>
            <div id="projects" style={{ height: "100%" }}>
              <TerminalCard project={c.projects[0]} index={0} />
            </div>
          </Reveal>

          {/* ── EDU: right sidebar, row 1 ── */}
          <Reveal delay={0.05} style={{ gridArea: "edu" }}>
            <EduFocusCard c={c} />
          </Reveal>

          {/* ── P2: Project 2 ── */}
          <Reveal delay={0.08} style={{ gridArea: "p2" }}>
            <CompactProjectCard project={c.projects[1]} index={1} />
          </Reveal>

          {/* ── P3: Project 3 ── */}
          <Reveal delay={0.11} style={{ gridArea: "p3" }}>
            <CompactProjectCard project={c.projects[2]} index={2} />
          </Reveal>

          {/* ── P4: Project 4 ── */}
          <Reveal delay={0.13} style={{ gridArea: "p4" }}>
            <CompactProjectCard project={c.projects[3]} index={3} />
          </Reveal>

          {/* ── EXPERIENCE: 2-col, bottom left ── */}
          <Reveal delay={0.16} style={{ gridArea: "exp" }}>
            <div id="experience">
              <ExperienceCard c={c} />
            </div>
          </Reveal>

          {/* ── SKILLS: right sidebar, bottom row ── */}
          <Reveal delay={0.19} style={{ gridArea: "sk" }}>
            <div id="skills" style={{ height: "100%" }}>
              <SkillsBentoCard c={c} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ CONTACT ══════════════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(64px,8vw,100px) 24px", borderTop: `1px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(0,212,255,0.04), transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(0,212,255,0.035) 1px, transparent 1px)", backgroundSize: "38px 38px", pointerEvents: "none" }} />
        <Reveal>
          <div style={{ textAlign: "center", position: "relative", zIndex: 10 }}>
            <h2 style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)", fontWeight: 800, letterSpacing: "-0.03em", background: `linear-gradient(135deg, ${C.text} 0%, ${C.textMuted} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1.1 }}>
              {c.connectTitle}
            </h2>
            <p style={{ marginTop: "24px", maxWidth: "560px", marginLeft: "auto", marginRight: "auto", fontSize: "1rem", lineHeight: 1.75, color: C.textMuted }}>
              {c.connectDesc}
            </p>
            <div style={{ marginTop: "40px", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <a href="mailto:yirui091@student.ubc.ca"
                style={{ display: "flex", alignItems: "center", gap: "8px", background: `linear-gradient(135deg, ${C.cyan}, ${C.purple})`, padding: "14px 34px", borderRadius: "100px", color: "#fff", textDecoration: "none", fontSize: "0.875rem", fontWeight: 600, boxShadow: "0 0 38px rgba(0,212,255,0.28)", transition: "all 0.2s" }}>
                <Mail size={15} />{c.email}
              </a>
              <a href="https://github.com/yiruiwang091" target="_blank" rel="noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)", border: `1px solid ${C.border}`, padding: "14px 34px", borderRadius: "100px", color: C.textMuted, textDecoration: "none", fontSize: "0.875rem", fontWeight: 500, transition: "all 0.2s" }}>
                <Github size={15} />GitHub
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
