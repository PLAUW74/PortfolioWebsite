"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

function ArtStationIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24-2.009a2.4 2.4 0 0 0-.463-1.422L14.983 1.426a2.397 2.397 0 0 0-2.164-1.333H9.166l12.127 20.996 2.174-3.766A2.406 2.406 0 0 0 24 15.714zm-7.412 1.47L9.166 4.838 1.69 17.184h14.898z" />
    </svg>
  );
}

const contactLinks = [
  {
    label: "Email",
    href: "mailto:hello@example.com",
    display: "hello@example.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    href: "https://github.com",
    display: "github.com/nigelgoh",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    display: "linkedin.com/in/nigelgoh",
    icon: Linkedin,
  },
  {
    label: "ArtStation",
    href: "https://artstation.com",
    display: "artstation.com/nigelgoh",
    icon: ArtStationIcon,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

export function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          className="text-2xl font-bold text-foreground mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          Contact
        </motion.h2>
        <motion.p
          className="text-muted-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
        >
          {"Let's connect. Feel free to reach out for collaborations or just to say hello."}
        </motion.p>
        <motion.div
          className="flex flex-col gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {contactLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-200 w-fit"
              variants={itemVariants}
            >
              <link.icon className="w-4 h-4" />
              <span className="font-mono text-sm relative">
                {link.display}
                <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-foreground transition-all duration-200 group-hover:w-full" />
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
