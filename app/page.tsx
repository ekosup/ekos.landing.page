"use client";

import projects from "../projects.json";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroTerminal } from "@/components/hero-terminal";
import { ProjectsSection } from "@/components/projects-section";
import { ArchitectureShowcase } from "@/components/architecture-showcase";
import { SkillsMatrix } from "@/components/skills-matrix";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] text-neutral-900 dark:text-neutral-100 transition-colors duration-200 overflow-x-hidden max-w-full">
      
      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-[85vh] flex flex-col items-center justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6"
      >
        <div className="max-w-4xl mx-auto text-center space-y-6 w-full">
          
          {/* Minimal Status Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-[11px] sm:text-xs font-mono max-w-full text-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shrink-0" />
            <span className="truncate sm:whitespace-normal">Available for select engineering projects</span>
          </div>

          {/* Clean High-Contrast Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900 dark:text-white break-words">
            Eko Supriyono
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl font-medium text-neutral-600 dark:text-neutral-400">
            Full Stack Software Engineer
          </p>

          <p className="text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Engineering high-performance web applications, in-browser WASM database engines, and real-time business intelligence systems with <span className="text-neutral-900 dark:text-white font-mono">TypeScript</span>, <span className="text-neutral-900 dark:text-white font-mono">React 19</span>, and <span className="text-neutral-900 dark:text-white font-mono">Next.js 16</span>.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 w-full max-w-xs sm:max-w-none mx-auto">
            <Button
              asChild
              size="lg"
              className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 font-mono text-xs h-11 px-6 rounded-md shadow-xs w-full sm:w-auto"
            >
              <a href="#work" className="flex items-center justify-center gap-1.5">
                Explore Projects <ArrowUpRight className="w-4 h-4" />
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-mono text-xs h-11 px-6 rounded-md w-full sm:w-auto"
            >
              <a href="#contact">
                Contact
              </a>
            </Button>
          </div>

          {/* Minimal Spec Code Preview Widget */}
          <div className="pt-6 sm:pt-8 w-full max-w-full">
            <HeroTerminal />
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 border-y border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/40">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
            {[
              { label: "Engineering Experience", value: "8+ Yrs" },
              { label: "Production Apps", value: "10+" },
              { label: "Core Technologies", value: "15+" },
              { label: "Open Source Repos", value: "25+" },
            ].map((stat, index) => (
              <div key={index} className="p-2.5 sm:p-4 rounded-lg bg-white/50 dark:bg-neutral-900/30 border border-neutral-200/50 dark:border-neutral-800/50 sm:border-none sm:bg-transparent">
                <div className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-neutral-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs font-mono text-neutral-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="work" className="px-4 sm:px-6 border-b border-neutral-200 dark:border-neutral-800">
        <ProjectsSection projects={projects} />
      </section>

      {/* Architecture Deep Dive Section */}
      <section id="architecture" className="px-4 sm:px-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/30 dark:bg-neutral-950/30">
        <ArchitectureShowcase />
      </section>

      {/* Technical Arsenal Section */}
      <section id="skills" className="px-4 sm:px-6 border-b border-neutral-200 dark:border-neutral-800">
        <SkillsMatrix />
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-4 sm:px-6 bg-neutral-50/50 dark:bg-neutral-950/40">
        <ContactSection />
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 sm:px-6 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#09090b]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-neutral-500 text-center md:text-left">
          <p>© {new Date().getFullYear()} Eko Supriyono. Built with Next.js & Tailwind CSS.</p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a href="https://github.com/ekosup" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/esupriyono/" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="mailto:hello@ekos.my.id" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Contact
            </a>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white transition-colors ml-1"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
