"use client";

import { useState } from "react";
import { ArrowUpRight, Github, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  highlights?: string[];
  github: string;
  demo: string;
  featured?: boolean;
}

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Database & Tools", "Business Intelligence", "Productivity", "Documentation"];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-6xl mx-auto py-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 block mb-2">
            Selected Engineering Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Featured Applications
          </h2>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-xs rounded-md"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-10 border-b border-neutral-200 dark:border-neutral-800 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Minimal Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="group rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0d0d10] p-6 flex flex-col justify-between hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-200 shadow-xs"
          >
            <div>
              {/* Header Meta */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                  0{index + 1}
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 px-2 py-0.5 rounded">
                  {project.category}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2.5 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                {project.title}
              </h3>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Bullet Highlights */}
              {project.highlights && (
                <ul className="space-y-1.5 mb-6 text-xs text-neutral-600 dark:text-neutral-400">
                  {project.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-neutral-400 dark:text-neutral-600 font-mono">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-1.5 mb-8">
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
            <div className="flex gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-900">
              <Button
                asChild
                size="sm"
                className="flex-1 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 text-xs font-mono h-9 rounded-md"
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

              <Button
                asChild
                variant="outline"
                size="sm"
                className="flex-1 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-mono h-9 rounded-md"
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
