"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Project {
  title: string;
  role: string;
  description: string;
  fullDescription: string;
  tech: string[];
  date: string;
}

const projects: Project[] = [
  {
    title: "Grabity",
    role: "Game Developer · Physics & Collision Programmer",
    description:
      "2D top-down survival game built on a custom C++ engine. Wrote the physics and collision systems from scratch to support reliable real-time gameplay interactions.",
    fullDescription:
      "Grabity is a 2D top-down survival game built on a custom engine in C++. My role focused on the engine's core physics and collision systems — writing them from scratch to handle reliable real-time interactions across all gameplay scenarios. I also implemented a Lua-based serialization pipeline for assets and scenes, making it faster to save, load, and iterate on content during development. On top of that, I built a prefab system that streamlined object setup and kept the team working from consistent configurations across every scene in the project.",
    tech: ["C++", "Lua", "Custom Engine", "Physics", "Collision"],
    date: "Aug 2024 – Apr 2025",
  },
  {
    title: "DecoPlan",
    role: "AI & Tools Developer",
    description:
      "LLM-powered room layout tool that lets users describe their HDB space in plain language and receive real furniture suggestions grounded in actual product data.",
    fullDescription:
      "DecoPlan is an LLM-assisted room layout planning tool built for HDB spaces. Users describe their room and needs in natural language, and the system suggests furniture arrangements using real scraped product data. I applied LoRA fine-tuning via Hugging Face to adapt a large language model for the room planning task — allowing the model to be updated for new requirements without full retraining. I also implemented a retrieval-augmented generation pipeline using vector embeddings and ChromaDB, backed by Python-scraped furniture data, so responses stay grounded in real, available items rather than hallucinated suggestions.",
    tech: ["Python", "LLM", "LoRA", "RAG", "ChromaDB", "Hugging Face"],
    date: "Aug 2025 – Present",
  },
  {
    title: "AI Text Summarizer",
    role: "gRPC & AI Developer",
    description:
      "Client–server summarization system for long-form documents, built around a DistilBART transformer with automatic chunking and a Streamlit UI.",
    fullDescription:
      "A client–server text summarization system designed to handle long-form documents reliably. The backend runs a DistilBART transformer model with automatic text chunking to deal with inputs that exceed the model's context window. I structured the application cleanly into proto, server, and client layers using gRPC, keeping each part independently testable and easy to extend as the project grew. The Streamlit frontend lets users control summary length and experiment with different inputs in real time — making it usable as a practical tool, not just a demo.",
    tech: ["Python", "gRPC", "DistilBART", "Streamlit", "NLP"],
    date: "Jan 2026",
  },
  {
    title: "BreakOut!",
    role: "Game Developer · Co-Creator",
    description:
      "3D survival and escape game built in Unreal Engine 4, taking stylized environments from early concept through to a fully playable build.",
    fullDescription:
      "BreakOut! is a 3D survival and escape game co-created in Unreal Engine 4. I was responsible for the environment pipeline — taking spaces from early concept art through to a fully playable build. I modelled and textured stylized 3D assets in Maya and Substance Painter, balancing visual quality against real-time performance constraints throughout the process. The project gave me a strong foundation in 3D asset production pipelines and the practical tradeoffs between fidelity and runtime performance in a game engine context.",
    tech: ["Unreal Engine 4", "Maya", "Substance Painter", "3D Art"],
    date: "Sep 2020 – Feb 2021",
  },
];

function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <motion.div
      layoutId={`card-${project.title}`}
      className="group relative bg-card border border-border rounded-lg p-6 cursor-pointer transition-colors duration-200 hover:border-primary/50"
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <motion.span
        layoutId={`date-${project.title}`}
        className="absolute top-4 right-4 text-xs font-mono text-muted-foreground"
      >
        {project.date}
      </motion.span>
      <motion.h3
        layoutId={`title-${project.title}`}
        className="text-lg font-semibold text-foreground mb-1 pr-24"
      >
        {project.title}
      </motion.h3>
      <motion.p
        layoutId={`role-${project.title}`}
        className="text-xs font-mono text-primary mb-3"
      >
        {project.role}
      </motion.p>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {project.description}
      </p>
      <motion.div layoutId={`tech-${project.title}`} className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-2 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded"
          >
            {t}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [handleEscape]);

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          layoutId={`card-${project.title}`}
          className="relative w-full max-w-[680px] max-h-[85vh] bg-card border border-border rounded-lg p-8 overflow-y-auto pointer-events-auto"
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-md hover:bg-secondary"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <motion.span
            layoutId={`date-${project.title}`}
            className="inline-block text-xs font-mono text-muted-foreground mb-4"
          >
            {project.date}
          </motion.span>

          <motion.h3
            layoutId={`title-${project.title}`}
            className="text-2xl font-semibold text-foreground mb-2"
          >
            {project.title}
          </motion.h3>

          <motion.p
            layoutId={`role-${project.title}`}
            className="text-xs font-mono text-primary mb-6"
          >
            {project.role}
          </motion.p>

          {/* Media placeholder — replace with actual screenshots/video */}
          <div className="w-full aspect-video bg-secondary/50 rounded-lg mb-6 flex items-center justify-center border border-border border-dashed">
            <span className="text-sm font-mono text-muted-foreground/50">
              // add screenshots or video here
            </span>
          </div>

          <p className="text-foreground/80 leading-relaxed mb-6">
            {project.fullDescription}
          </p>

          {/* Screenshot grid placeholder */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="aspect-[4/3] bg-secondary/50 rounded-lg flex items-center justify-center border border-border border-dashed">
              <span className="text-xs font-mono text-muted-foreground/50">screenshot_01.png</span>
            </div>
            <div className="aspect-[4/3] bg-secondary/50 rounded-lg flex items-center justify-center border border-border border-dashed">
              <span className="text-xs font-mono text-muted-foreground/50">screenshot_02.png</span>
            </div>
          </div>

          <motion.div layoutId={`tech-${project.title}`} className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          className="text-2xl font-bold text-foreground mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          Projects
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={itemVariants}>
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
