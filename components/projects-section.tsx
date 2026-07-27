"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github, Search, ShieldCheck, PlayCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type?: "case-study" | "demo";
  badge?: string;
  constraint?: string;
  technologies: string[];
  highlights?: string[];
  github?: string;
  demo: string;
  link?: string;
  featured?: boolean;
}

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((p) => {
    const matchesType =
      selectedType === "all" ||
      (selectedType === "case-study" && p.type === "case-study") ||
      (selectedType === "demo" && p.type === "demo");

    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesType && matchesSearch;
  });

  return (
    <div className="w-full max-w-6xl mx-auto py-12 sm:py-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              Selected Engineering Work
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Projects & Case Studies
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 max-w-2xl">
            Distinguishing enterprise production systems operating under strict air-gapped constraints from open-source & in-browser technical demonstrations.
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input
            type="text"
            placeholder="Search stack or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-xs rounded-md"
          />
        </div>
      </div>

      {/* Filter Tabs & Visual Tier Legend */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-10 border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full">
          {[
            { id: "all", label: "All Projects" },
            { id: "case-study", label: "Case Studies (Enterprise)" },
            { id: "demo", label: "Live Demos & Tools" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors shrink-0 ${
                selectedType === tab.id
                  ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[11px] font-mono text-neutral-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-500 inline-block" />
            Case Study (Air-Gapped/Gov)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Live Demo (Interactive)
          </span>
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => {
          const isCaseStudy = project.type === "case-study";

          return (
            <div
              key={project.id}
              className={`group rounded-xl border p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 shadow-xs max-w-full ${
                isCaseStudy
                  ? "border-cyan-500/30 dark:border-cyan-500/20 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent dark:bg-[#0b0f17] hover:border-cyan-500/50"
                  : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0d0d10] hover:border-neutral-400 dark:hover:border-neutral-600"
              }`}
            >
              <div>
                {/* Header Meta & Badges */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                    0{index + 1}
                  </span>

                  <div className="flex items-center gap-2">
                    {isCaseStudy ? (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-cyan-700 dark:text-cyan-300 bg-cyan-100/70 dark:bg-cyan-950/70 border border-cyan-300 dark:border-cyan-800 px-2.5 py-0.5 rounded-full">
                        <ShieldCheck className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                        Case Study
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 px-2.5 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live Demo
                      </span>
                    )}

                    <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 px-2 py-0.5 rounded truncate max-w-[140px]">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                  {project.title}
                </h3>

                {isCaseStudy && project.constraint && (
                  <div className="mb-3 flex items-center gap-1.5 text-[11px] font-mono text-amber-700 dark:text-amber-400/90 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 px-2.5 py-1 rounded-md">
                    <Lock className="w-3 h-3 shrink-0" />
                    <span>{project.constraint}</span>
                  </div>
                )}

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Bullet Highlights */}
                {project.highlights && (
                  <ul className="space-y-1.5 mb-6 text-xs text-neutral-600 dark:text-neutral-400">
                    {project.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-neutral-400 dark:text-neutral-600 font-mono">-</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6 sm:mb-8">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/80 px-2 py-0.5 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-900">
                {isCaseStudy ? (
                  <Button
                    asChild
                    size="sm"
                    className="w-full bg-cyan-900 hover:bg-cyan-800 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-neutral-950 font-mono text-xs h-9 rounded-md shadow-xs"
                  >
                    <Link href={project.link || `/work/${project.id}`} className="flex items-center justify-center gap-2">
                      Read Case Study <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button
                      asChild
                      size="sm"
                      className="w-full sm:flex-1 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 text-xs font-mono h-9 rounded-md"
                    >
                      <a
                        href={project.demo}
                        target={project.demo.startsWith("http") ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5"
                      >
                        Live Demo <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </Button>

                    {project.github && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full sm:flex-1 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-mono h-9 rounded-md"
                      >
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5"
                        >
                          <Github className="w-3.5 h-3.5" /> Source
                        </a>
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
