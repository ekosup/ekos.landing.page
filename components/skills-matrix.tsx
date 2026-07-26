"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SkillGroup {
  category: string;
  skills: { name: string; detail: string }[];
}

const skillGroups: SkillGroup[] = [
  {
    category: "Frontend & UI Systems",
    skills: [
      { name: "TypeScript", detail: "Strict type safety & generic architectures" },
      { name: "React 19 & Next.js 16", detail: "Server components, SSR/SSG & App Router" },
      { name: "Tailwind CSS", detail: "Custom design systems & responsive utility UI" },
      { name: "State Management", detail: "Context, TanStack Query, reactive stores" }
    ]
  },
  {
    category: "Backend & Runtime",
    skills: [
      { name: "Node.js", detail: "REST APIs, GraphQL, microservices" },
      { name: "Python / Django", detail: "Data analysis, backend services, Django ORM" },
      { name: "REST & GraphQL APIs", detail: "Schema definitions, payload optimization" }
    ]
  },
  {
    category: "Database & Storage",
    skills: [
      { name: "SQLite / WASM", detail: "Client-side relational query engines" },
      { name: "PostgreSQL", detail: "Relational modeling, indexing, performance tuning" },
      { name: "IndexedDB", detail: "Local-first browser storage & persistence" }
    ]
  },
  {
    category: "DevOps & Tooling",
    skills: [
      { name: "Docker", detail: "Containerization & multi-stage build pipelines" },
      { name: "Git & CI/CD", detail: "GitHub Actions, automated test & build runners" },
      { name: "Cloud & Deployment", detail: "Cloudflare Workers, Vercel, AWS infrastructure" }
    ]
  }
];

export function SkillsMatrix() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full max-w-6xl mx-auto py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 block mb-2">
            Technical Competencies
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Engineering Arsenal
          </h2>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input
            type="text"
            placeholder="Search technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-xs rounded-md"
          />
        </div>
      </div>

      {/* Grid of Groups */}
      <div className="grid md:grid-cols-2 gap-8">
        {skillGroups.map((group, gIdx) => {
          const filteredSkills = group.skills.filter(s => 
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            s.detail.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (filteredSkills.length === 0) return null;

          return (
            <div key={gIdx} className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 bg-white dark:bg-[#0d0d10]">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4 pb-2 border-b border-neutral-100 dark:border-neutral-800">
                {group.category}
              </h3>

              <div className="space-y-3">
                {filteredSkills.map((skill, sIdx) => (
                  <div key={sIdx} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs">
                    <span className="font-mono font-bold text-neutral-900 dark:text-neutral-100">
                      {skill.name}
                    </span>
                    <span className="text-neutral-500 dark:text-neutral-400 text-right font-sans">
                      {skill.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
