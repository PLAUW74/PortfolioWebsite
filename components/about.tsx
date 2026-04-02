"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
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

export function About() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          className="text-2xl font-bold text-foreground mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          About
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground leading-relaxed"
            >
              {
                "I'm a computer science student at Digipen Singapore with a focus on real-time systems and machine learning. My work sits at the intersection of game development and AI — building performant systems that create engaging player experiences."
              }
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground leading-relaxed"
            >
              {
                "When I'm not writing engine code or training models, I'm exploring ways to make developer tools more intuitive. I believe the best software is invisible — it just works, and it works fast."
              }
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground leading-relaxed"
            >
              Currently seeking opportunities in game systems programming, ML
              engineering, or anywhere I can build things that matter.
            </motion.p>
          </motion.div>
          <motion.div
            className="hidden md:flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative w-full max-w-xs aspect-square">
              {/* Decorative grid pattern */}
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-border/30 rounded-sm"
                    style={{
                      opacity: 0.1 + (i % 8) * 0.05,
                    }}
                  />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-sm text-muted-foreground">
                  {"// building"}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
