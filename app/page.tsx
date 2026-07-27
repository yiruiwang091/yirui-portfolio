"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Github,
  ExternalLink,
  GraduationCap,
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

interface SkillGroup {
  label: string;
  items: string[];
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
    tag: "Applied AI · Data Science · NLP",
    // The "thoughtful" opening lines — shown large on the left
    poem: [
      "Building AI systems",
      "that connect knowledge",
      "to real user needs.",
    ],
    poemAccent: "With language, data, and product sense.",
    name: "Yirui Wang",
    credentials: "UBC MDS-CL · Expected Nov 2026 · B.Sc. Mathematics",
    subtitle: "Applied AI · AI Product · Data Science",
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
      "Multimodal AI",
      "Data Products",
      "Human-Centered AI Systems",
    ],
    projectsTag: "Projects",
    projectsTitle: "Selected work",
    projectsSubtitle:
      "I build applied AI and data products across RAG, NLP, multimodal interfaces, and analytics, with a focus on systems that make information easier to use.",
    experienceTag: "Experience",
    experienceTitle: "Where I've contributed",
    experienceSubtitle:
      "Applied AI, data analysis, teaching, and program leadership across healthcare, finance, and education settings.",
    skillsTag: "Skills",
    skillsTitle: "Core toolkit",
    skillsSubtitle:
      "A focused set of tools and workflows supported by completed projects, internships, and coursework.",
    langLabel: "Languages & Frameworks",
    dataLabel: "NLP & Data Work",
    strengthsLabel: "Capabilities",
    connectTitle: "Let's connect",
    connectDesc:
      "Interested in applied AI, AI product work, NLP systems, RAG applications, or data-driven user research? I'd be glad to connect.",
    email: "Email me",
    liveDemo: "Live Demo",
    edu: [
      {
        school: "University of British Columbia",
        degree: "B.Sc. in Mathematics",
        year: "2021 – 2025 · Completed",
      },
      {
        school: "University of British Columbia",
        degree: "Master of Data Science — Computational Linguistics",
        year: "Sep 2025 – Nov 2026 · Expected",
      },
    ],
    projects: [
      {
        title: "Multi-channel Cancer Support Chatbot",
        period: "UBC Psychiatry Lab · MDS Capstone · Apr-Jun 2026",
        tldr: "Completed a healthcare RAG assistant extension that made cancer support information reachable through SMS, voice, email, and REST API channels.",
        description:
          "Built a Python/FastAPI backend around AWS Bedrock and RAG, connecting Lambda, ECS, ALB, SES, S3, and DynamoDB with conversation history and prompt pipelines. The project added SMS compression that preserved resource links, voice streaming with Transcribe and Polly, interruption handling, email thread memory, empathy detection, QA evaluation, stakeholder demos, and architecture/API documentation for patient and caregiver access.",
        highlights: [
          { icon: "🎙️", label: "SMS, voice, email" },
          { icon: "🏥", label: "200+ clinical QA cases" },
          { icon: "🏆", label: "Best Cohort Prize" },
        ],
        concepts: [
          { term: "RAG", def: "Retrieval-Augmented Generation — retrieves relevant docs then generates grounded answers" },
          { term: "Multi-channel AI", def: "One assistant experience adapted for SMS, voice, email, and API access" },
          { term: "Conversation memory", def: "Thread history and follow-up state used to keep support interactions coherent" },
        ],
        stack: ["Python", "FastAPI", "AWS Bedrock", "RAG", "Lambda", "ECS", "ALB", "SES", "S3", "DynamoDB", "Transcribe", "Polly"],
        slug: "psychiatry-chatbot",
      },
      {
        title: "Amazon Review Search & Analysis Platform",
        period: "UBC COLX 523 · Feb-Apr 2026",
        tldr: "Search and analysis platform for Amazon reviews with keyword retrieval, sentiment filtering, facets, and a deployed demo.",
        description:
          "Converted unstructured product reviews into a searchable feedback dataset. I worked on ETL, text cleaning, attribute faceting, FastAPI REST endpoints, relevance ranking, pagination, deployment checks, and an interface that helps users explore product feedback by keyword, attribute, and sentiment.",
        highlights: [
          { icon: "📄", label: "50k+ reviews indexed" },
          { icon: "🔍", label: "Keyword + faceted search" },
          { icon: "🚀", label: "Live demo deployed" },
        ],
        concepts: [
          { term: "Corpus", def: "A structured collection of text for linguistic or NLP analysis" },
          { term: "Facets", def: "Structured filters that let users narrow search results by attributes" },
          { term: "FastAPI", def: "High-performance async Python web framework" },
        ],
        stack: ["Python", "FastAPI", "NLTK", "ETL", "HTML/CSS", "JavaScript", "Docker"],
        repo: "https://github.com/yiruiwang091/COLX_523_Projects",
        cta: "Repository",
        slug: "corpus-search",
        demo: "https://colx-523-projects.onrender.com",
        demoCta: "Live Demo",
      },
      {
        title: "Multimodal Membership Inference Risk Analysis",
        period: "UBC COLX 585 · Mar-Apr 2026",
        tldr: "Model evaluation pipeline measuring membership-inference risk in multimodal model outputs.",
        description:
          "Built a reproducible PyTorch and Hugging Face evaluation workflow for AI safety analysis. The pipeline extracted token loss, likelihood-ratio, and rank-based signals, compared detection methods, and evaluated privacy risk using AUC and TPR@FPR=0.1.",
        highlights: [
          { icon: "📈", label: "0.84 validation AUC" },
          { icon: "🧪", label: "AUC + TPR@FPR" },
          { icon: "🔁", label: "Reproducible workflow" },
        ],
        concepts: [
          { term: "Membership inference", def: "Tests whether a model output reveals if data was part of training" },
          { term: "ROC-AUC", def: "Evaluation metric for ranking positive examples above negative examples" },
          { term: "Likelihood ratio", def: "Signal comparing how likely an output is under different assumptions" },
        ],
        stack: ["Python", "PyTorch", "HuggingFace", "Model Evaluation", "AUC", "AI Safety"],
        repo: "https://github.com/yiruiwang091/membership_attack",
        cta: "Repository",
        slug: "membership-inference",
      },
      {
        title: "Personal Finance Desktop Application",
        period: "Personal Project · Apr 2026",
        tldr: "JavaFX desktop app for multi-currency expense tracking, category analytics, budget alerts, and JSON persistence.",
        description:
          "Implemented a local finance tool with MVC architecture, object-oriented design, event-driven UI workflows, category-level spending reports, multi-currency entry, exchange-rate normalization, monthly budget tracking, and persistent JSON storage.",
        highlights: [
          { icon: "🏗️", label: "MVC architecture" },
          { icon: "💱", label: "Multi-currency flow" },
          { icon: "💾", label: "JSON persistence" },
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
        role: "Medical AI Software Developer",
        org: "UBC Psychiatry Lab",
        period: "Apr-Jun 2026",
        detail: "Built backend and AI workflow components for a multi-channel cancer support chatbot using AWS, RAG, and FastAPI.",
      },
      {
        role: "Data Analyst Intern",
        org: "Jinyuan Securities",
        period: "Jun-Aug 2025",
        detail: "Used SQL and Python to clean customer transaction, holdings, and product-purchase data for profiling and reporting.",
      },
      {
        role: "Data Analytics Intern",
        org: "Yantai Lantian Investment Holdings",
        period: "May-Jul 2024",
        detail: "Automated ETL, data-quality checks, batch updates, statistical analysis, and Tableau/Matplotlib dashboards.",
      },
      {
        role: "Lobby Manager Intern",
        org: "Yantai Rural Commercial Bank",
        period: "Jul-Sep 2024",
        detail: "Supported branch service workflows and organized high-frequency consultation and transaction records.",
      },
      {
        role: "Teaching & Student Leadership",
        org: "UBC MDS-CL · Haidao · UBC Asian Studies",
        period: "2022-2026",
        detail: "Served as MDS-CL student representative and taught or assisted math, science, English, and Mandarin learners.",
      },
    ],
    skills: [
      { label: "AI & NLP", items: ["LLMs", "RAG", "Prompt Engineering", "NLP pipelines", "HuggingFace", "PyTorch", "Empathy detection", "Model evaluation"] },
      { label: "Data & Machine Learning", items: ["Python", "pandas", "NumPy", "SQL", "ETL", "Statistical modeling", "Time-series analysis", "AUC/TPR evaluation", "Tableau", "Matplotlib"] },
      { label: "Cloud & Backend", items: ["FastAPI", "REST APIs", "AWS Bedrock", "Lambda", "ECS", "ALB", "SES", "S3", "DynamoDB", "Transcribe", "Polly"] },
      { label: "Product, Research & Evaluation", items: ["User flows", "Stakeholder demos", "Clinical QA evaluation", "Technical documentation", "Customer segmentation", "Data ethics"] },
      { label: "Programming & Tools", items: ["Python", "Java", "R", "SQL", "JavaScript", "HTML/CSS", "Git/GitHub", "Jupyter", "R Markdown", "Excel"] },
    ] as SkillGroup[],
  },
  zh: {
    tag: "应用 AI · 数据科学 · NLP",
    poem: [
      "把 AI 系统",
      "接到真实知识",
      "和真实用户需求上。",
    ],
    poemAccent: "用语言、数据和产品判断。",
    name: "王一锐",
    credentials: "UBC 计算语言学数据科学硕士 · 预计 2026.11 毕业",
    subtitle: "应用 AI · AI 产品 · 数据科学",
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
      "多模态 AI",
      "数据产品",
      "以用户为中心的 AI 系统",
    ],
    projectsTag: "项目",
    projectsTitle: "做过的事",
    projectsSubtitle: "我关注 RAG、NLP、多模态交互与数据分析，并把技术能力落到可使用、可评估的 AI 与数据产品中。",
    experienceTag: "经历",
    experienceTitle: "待过的地方",
    experienceSubtitle: "医疗 AI、数据分析、教学和项目沟通中的实践经历。",
    skillsTag: "技能",
    skillsTitle: "核心工具箱",
    skillsSubtitle: "来自项目、实习和课程的工具、方法与协作能力。",
    langLabel: "语言与框架",
    dataLabel: "NLP 与数据工作",
    strengthsLabel: "能力",
    connectTitle: "期待与您联系",
    connectDesc:
      "如果您关注应用 AI、AI 产品、NLP 系统、RAG 应用或数据驱动的用户研究，欢迎通过邮件或 GitHub 与我联系。",
    email: "发邮件",
    liveDemo: "在线体验",
    edu: [
      {
        school: "英属哥伦比亚大学 (UBC)",
        degree: "数学 学士",
        year: "2021 – 2025 · 已完成",
      },
      {
        school: "英属哥伦比亚大学 (UBC)",
        degree: "数据科学 硕士 · 计算语言学方向",
        year: "2025.09 – 2026.11 · 预计毕业",
      },
    ],
    projects: [
      {
        title: "多通道癌症支持聊天机器人",
        period: "UBC Psychiatry Lab · MDS 顶点项目 · 2026.04-2026.06",
        tldr: "完成医疗 RAG 助手的多通道扩展，让患者和照护者可以通过短信、语音、邮件和 REST API 获取癌症支持信息。",
        description:
          "使用 Python/FastAPI、AWS Bedrock 和 RAG 搭建后端，并串联 Lambda、ECS、ALB、SES、S3、DynamoDB、Conversation History 与 Prompt Pipeline。项目覆盖短信压缩与资源链接保留、Transcribe/Polly 语音流、打断处理、邮件线程记忆、共情识别、QA 评估、Stakeholder Demo 和架构/API 文档交付。",
        highlights: [
          { icon: "🎙️", label: "短信、语音、邮件" },
          { icon: "🏥", label: "200+ clinical QA" },
          { icon: "🏆", label: "Best Cohort Prize" },
        ],
        concepts: [
          { term: "RAG", def: "检索增强生成——先检索相关文档，再生成有依据的回答" },
          { term: "多通道 AI", def: "同一个助手体验适配短信、语音、邮件和 API 输入" },
          { term: "对话记忆", def: "用历史线程和跟进状态保持医疗支持对话连贯" },
        ],
        stack: ["Python", "FastAPI", "AWS Bedrock", "RAG", "Lambda", "ECS", "ALB", "SES", "S3", "DynamoDB", "Transcribe", "Polly"],
        slug: "psychiatry-chatbot",
      },
      {
        title: "Amazon 评论检索与分析平台",
        period: "UBC COLX 523 · 2026.02-2026.04",
        tldr: "面向 Amazon 评论的检索与分析平台，支持关键词检索、情感过滤、属性分面和线上 Demo。",
        description:
          "将非结构化商品评论转化为可搜索、可筛选、可解释的数据资产。负责 ETL、文本清洗、属性分面提取、FastAPI REST API、检索排序、分页、部署验证，以及支持用户按关键词、属性和情感探索反馈的界面。",
        highlights: [
          { icon: "📄", label: "50k+ 条评论已索引" },
          { icon: "🔍", label: "关键词 + 分面检索" },
          { icon: "🚀", label: "线上 Demo" },
        ],
        concepts: [
          { term: "语料库", def: "为语言学或 NLP 分析系统整理的文本数据集合" },
          { term: "属性分面", def: "帮助用户按结构化属性缩小检索结果的筛选方式" },
          { term: "FastAPI", def: "高性能异步 Python Web 框架，适合构建 API 后端" },
        ],
        stack: ["Python", "FastAPI", "NLTK", "ETL", "HTML/CSS", "JavaScript", "Docker"],
        repo: "https://github.com/yiruiwang091/COLX_523_Projects",
        cta: "看代码",
        slug: "corpus-search",
        demo: "https://colx-523-projects.onrender.com",
        demoCta: "在线体验",
      },
      {
        title: "多模态模型 Membership Inference 风险分析",
        period: "UBC COLX 585 · 2026.03-2026.04",
        tldr: "用于衡量多模态模型输出中 membership inference 风险的模型评估流程。",
        description:
          "基于 PyTorch 和 HuggingFace 搭建可复现实验流程，提取 token loss、likelihood ratio、rank 等信号，对比检测方法，并使用 AUC 与 TPR@FPR=0.1 评估隐私风险。",
        highlights: [
          { icon: "📈", label: "验证集 AUC 0.84" },
          { icon: "🧪", label: "AUC + TPR@FPR" },
          { icon: "🔁", label: "可复现实验流程" },
        ],
        concepts: [
          { term: "Membership inference", def: "判断模型输出是否泄露某条数据曾参与训练的风险分析方法" },
          { term: "ROC-AUC", def: "衡量模型区分正负样本排序能力的指标" },
          { term: "Likelihood ratio", def: "比较不同假设下输出可能性的检测信号" },
        ],
        stack: ["Python", "PyTorch", "HuggingFace", "模型评估", "AUC", "AI 安全"],
        repo: "https://github.com/yiruiwang091/membership_attack",
        cta: "看代码",
        slug: "membership-inference",
      },
      {
        title: "个人财务记账桌面应用",
        period: "个人项目 · 2026.04",
        tldr: "基于 JavaFX 的桌面财务工具，支持多货币录入、分类统计、预算提醒和 JSON 持久化。",
        description:
          "使用 MVC、面向对象设计和事件驱动 UI 实现本地财务管理工具，覆盖多货币录入、汇率标准化、分类支出报告、月度预算跟踪和 JSON 数据持久化。",
        highlights: [
          { icon: "🏗️", label: "MVC 架构" },
          { icon: "💱", label: "多货币流程" },
          { icon: "💾", label: "JSON 持久化" },
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
        role: "Medical AI 软件研发",
        org: "UBC Psychiatry Lab",
        period: "2026.04-2026.06",
        detail: "使用 AWS、RAG 和 FastAPI 为多通道癌症支持机器人搭建后端与 AI 工作流。",
      },
      {
        role: "数据分析师实习生",
        org: "金元证券",
        period: "2025.06-2025.08",
        detail: "使用 SQL 与 Python 清洗客户交易、持仓和产品申购数据，支持客户画像与数据简报。",
      },
      {
        role: "数据分析实习生",
        org: "烟台蓝天投资控股集团",
        period: "2024.05-2024.07",
        detail: "完成 ETL、数据质量检查、批量更新、统计分析和 Tableau/Matplotlib 看板。",
      },
      {
        role: "大堂经理实习生",
        org: "烟台农村商业银行",
        period: "2024.07-2024.09",
        detail: "协助网点业务分流与服务支持，整理高频咨询和业务办理记录。",
      },
      {
        role: "教学与学生代表",
        org: "UBC MDS-CL · Haidao · UBC Asian Studies",
        period: "2022-2026",
        detail: "担任 MDS-CL 学生代表，并在数学、科学、英语和普通话教学中支持不同学习者。",
      },
    ],
    skills: [
      { label: "AI & NLP", items: ["LLM", "RAG", "Prompt Engineering", "NLP 流程", "HuggingFace", "PyTorch", "共情识别", "模型评估"] },
      { label: "Data & Machine Learning", items: ["Python", "pandas", "NumPy", "SQL", "ETL", "统计建模", "时间序列", "AUC/TPR 评估", "Tableau", "Matplotlib"] },
      { label: "Cloud & Backend", items: ["FastAPI", "REST API", "AWS Bedrock", "Lambda", "ECS", "ALB", "SES", "S3", "DynamoDB", "Transcribe", "Polly"] },
      { label: "Product, Research & Evaluation", items: ["用户流程", "Stakeholder Demo", "Clinical QA 评估", "技术文档", "客户分层", "数据伦理"] },
      { label: "Programming & Tools", items: ["Python", "Java", "R", "SQL", "JavaScript", "HTML/CSS", "Git/GitHub", "Jupyter", "R Markdown", "Excel"] },
    ] as SkillGroup[],
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
      style={{ minWidth: 0, ...style }}
    >
      {children}
    </motion.div>
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
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {c.skills.map((group, index) => {
          const accent = index % 2 === 0 ? C.cyan : C.purple;
          const rgb = index % 2 === 0 ? "0,212,255" : "168,85,247";
          return (
            <div key={group.label}>
              <div style={{ fontFamily: C.mono, fontSize: "0.56rem", letterSpacing: "0.15em", color: C.textDim, marginBottom: "7px" }}>{group.label}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {group.items.map((s) => (
                  <span key={s} style={{ padding: "3px 10px", borderRadius: "4px", background: `rgba(${rgb},0.07)`, border: `1px solid rgba(${rgb},0.2)`, color: accent, fontSize: "0.7rem", fontFamily: C.mono }}>{s}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

export default function PortfolioSite() {
  const [lang, setLang] = useState<Lang>("zh");
  const [isNarrow, setIsNarrow] = useState(false);
  const c = t[lang];
  const toggleLang = () => setLang((p) => (p === "en" ? "zh" : "en"));

  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const sync = () => setIsNarrow(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: "100vh" }}>
      {/* ── custom cursor ── */}
      <CursorGlow />

      {/* ══ NAV ══════════════════════════════════════════════════════════════ */}
      <motion.nav
        className="portfolio-nav"
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
          justifyContent: isNarrow ? "center" : "space-between",
          gap: isNarrow ? "8px" : undefined,
          flexWrap: isNarrow ? "wrap" : undefined,
          ...(isNarrow ? { padding: "10px 12px" } : {}),
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
            order: isNarrow ? 3 : undefined,
            width: isNarrow ? "100%" : undefined,
            justifyContent: isNarrow ? "center" : undefined,
            overflowX: isNarrow ? "auto" : undefined,
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
          className="portfolio-bento-grid"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isNarrow ? "1fr" : "repeat(3, 1fr)",
            gridTemplateAreas: isNarrow
              ? `"p1" "edu" "p2" "p3" "p4" "exp" "sk"`
              : `"p1 p1 edu" "p2 p3 p4" "exp exp sk"`,
            gap: "14px",
          }}
        >
          {/* ── P1: Featured project ── */}
          <Reveal style={{ gridArea: "p1" }}>
            <div id="projects" style={{ height: "100%", scrollMarginTop: isNarrow ? "112px" : "88px" }}>
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
            <div id="experience" style={{ scrollMarginTop: isNarrow ? "112px" : "88px" }}>
              <ExperienceCard c={c} />
            </div>
          </Reveal>

          {/* ── SKILLS: right sidebar, bottom row ── */}
          <Reveal delay={0.19} style={{ gridArea: "sk" }}>
            <div id="skills" style={{ height: "100%", scrollMarginTop: isNarrow ? "112px" : "88px" }}>
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
