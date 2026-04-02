"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    name: "Languages",
    skills: ["C++", "C#", "Python", "Lua", "TypeScript"],
  },
  {
    name: "AI / ML",
    skills: ["Hugging Face", "LoRA fine-tuning", "RAG", "llama.cpp", "ChromaDB", "Jupyter"],
  },
  {
    name: "Game Dev",
    skills: ["Unity", "Unreal Engine", "Custom Engine (C++)", "Maya"],
  },
  {
    name: "Tools",
    skills: ["Git", "gRPC", "Android Studio", ".NET", "Streamlit"],
  },
  {
    name: "Design",
    skills: ["Figma", "Photoshop", "Clip Studio Paint", "Substance Painter"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
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

export function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          className="text-2xl font-bold text-foreground mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          Skills
        </motion.h2>
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skillCategories.map((category) => (
            <motion.div key={category.name} variants={itemVariants}>
              <h3 className="text-sm font-mono text-muted-foreground mb-3 uppercase tracking-wider">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm font-mono bg-secondary text-secondary-foreground rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
