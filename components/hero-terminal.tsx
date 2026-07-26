"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function HeroTerminal() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"specs" | "stack" | "manifest">("specs");

  const copySnippet = () => {
    const text = activeTab === "specs" 
      ? `// Eko Supriyono — Profile Spec\nexport const profile = {\n  role: "Full Stack Engineer",\n  specialization: ["Client-side WASM Databases", "Business Intelligence", "Markdown Engines"],\n  status: "Available for engineering projects",\n  location: "Indonesia"\n};`
      : activeTab === "stack"
      ? `// Primary Engineering Stack\nconst stack = [\n  "TypeScript", "React 19", "Next.js", "SQLite WASM",\n  "Tailwind CSS", "Node.js", "Python", "IndexedDB"\n];`
      : `// Portfolio Projects Index\nconst projects = [\n  { name: "SQL Explorer", demo: "https://ekosup.github.io/sqlexplorer/" },\n  { name: "UMKM Dashboard", demo: "https://ekosup.github.io/umkm-dashboard/" },\n  { name: "KNotes", demo: "https://ekosup.github.io/knotes/" }\n];`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-900 text-left font-mono shadow-sm text-xs sm:text-sm overflow-hidden">
      {/* Top Header */}
      <div className="bg-neutral-950 px-4 py-2.5 border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-700 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-700 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-700 inline-block" />
          </div>
          <div className="flex space-x-2 text-xs">
            <button
              onClick={() => setActiveTab("specs")}
              className={`px-2 py-0.5 rounded ${activeTab === "specs" ? "bg-neutral-800 text-white font-medium" : "text-neutral-500 hover:text-neutral-300"}`}
            >
              profile.ts
            </button>
            <button
              onClick={() => setActiveTab("stack")}
              className={`px-2 py-0.5 rounded ${activeTab === "stack" ? "bg-neutral-800 text-white font-medium" : "text-neutral-500 hover:text-neutral-300"}`}
            >
              stack.json
            </button>
            <button
              onClick={() => setActiveTab("manifest")}
              className={`px-2 py-0.5 rounded ${activeTab === "manifest" ? "bg-neutral-800 text-white font-medium" : "text-neutral-500 hover:text-neutral-300"}`}
            >
              projects.json
            </button>
          </div>
        </div>

        <button
          onClick={copySnippet}
          className="text-neutral-400 hover:text-white transition-colors p-1"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Code Display */}
      <div className="p-5 text-neutral-300 overflow-x-auto leading-relaxed bg-[#0c0c0e]">
        {activeTab === "specs" && (
          <pre>
            <span className="text-neutral-500">// Eko Supriyono — Profile Spec</span>{'\n'}
            <span className="text-purple-400">export const</span> <span className="text-blue-400">profile</span> = &#123;{'\n'}
            {'  '}role: <span className="text-emerald-400">&quot;Full Stack Software Engineer&quot;</span>,{'\n'}
            {'  '}specialization: [{'\n'}
            {'    '}<span className="text-emerald-400">&quot;Client-side WASM Relational Databases&quot;</span>,{'\n'}
            {'    '}<span className="text-emerald-400">&quot;Business Intelligence & Analytics Platforms&quot;</span>,{'\n'}
            {'    '}<span className="text-emerald-400">&quot;Local-first Markdown Engines&quot;</span>{'\n'}
            {'  '}],{'\n'}
            {'  '}status: <span className="text-emerald-400">&quot;Available for select engineering roles&quot;</span>,{'\n'}
            {'  '}location: <span className="text-emerald-400">&quot;Indonesia&quot;</span>{'\n'}
            &#125;;
          </pre>
        )}

        {activeTab === "stack" && (
          <pre>
            <span className="text-neutral-500">// Primary Engineering Stack</span>{'\n'}
            <span className="text-purple-400">export const</span> <span className="text-blue-400">stack</span> = [{'\n'}
            {'  '}<span className="text-amber-300">&quot;TypeScript&quot;</span>,{'\n'}
            {'  '}<span className="text-amber-300">&quot;React 19&quot;</span>,{'\n'}
            {'  '}<span className="text-amber-300">&quot;Next.js 16&quot;</span>,{'\n'}
            {'  '}<span className="text-amber-300">&quot;SQLite WASM&quot;</span>,{'\n'}
            {'  '}<span className="text-amber-300">&quot;Tailwind CSS&quot;</span>,{'\n'}
            {'  '}<span className="text-amber-300">&quot;Node.js&quot;</span>,{'\n'}
            {'  '}<span className="text-amber-300">&quot;Python / Django&quot;</span>{'\n'}
            ];
          </pre>
        )}

        {activeTab === "manifest" && (
          <pre>
            <span className="text-neutral-500">// Portfolio Projects Directory</span>{'\n'}
            <span className="text-purple-400">export const</span> <span className="text-blue-400">featuredProjects</span> = [{'\n'}
            {'  '}&#123; name: <span className="text-cyan-300">&quot;SQL Explorer&quot;</span>, url: <span className="text-neutral-400">&quot;https://ekosup.github.io/sqlexplorer/&quot;</span> &#125;,{'\n'}
            {'  '}&#123; name: <span className="text-cyan-300">&quot;UMKM Dashboard&quot;</span>, url: <span className="text-neutral-400">&quot;https://ekosup.github.io/umkm-dashboard/&quot;</span> &#125;,{'\n'}
            {'  '}&#123; name: <span className="text-cyan-300">&quot;KNotes Workspace&quot;</span>, url: <span className="text-neutral-400">&quot;https://ekosup.github.io/knotes/&quot;</span> &#125;{'\n'}
            ];
          </pre>
        )}
      </div>

      <div className="bg-neutral-950 px-4 py-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-500">
        <span>ISO / IEC 25010 Quality Standards</span>
        <span>UTF-8 • TSX</span>
      </div>
    </div>
  );
}
