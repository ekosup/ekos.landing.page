"use client";

import { useState } from "react";
import { Cpu } from "lucide-react";

export function ArchitectureShowcase() {
  const [selectedTab, setSelectedTab] = useState<"sqlexplorer" | "umkm-dashboard" | "knotes">("sqlexplorer");

  const architectures = {
    sqlexplorer: {
      id: "01",
      title: "SQL Explorer",
      subtitle: "In-Browser SQLite WASM Query Pipeline",
      summary: "SQL Explorer runs a complete SQLite relational engine directly in the browser web worker thread, providing zero-latency SQL execution without transmitting database content to remote servers.",
      components: [
        { title: "SQLite WASM Web Worker", desc: "Non-blocking background thread executing queries safely." },
        { title: "Virtual Table Renderer", desc: "Windowed tabular viewport rendering 50,000+ rows efficiently." },
        { title: "Schema Introspector", desc: "Real-time parsing of table schema, foreign keys, and indexes." },
        { title: "Client-Side CSV/JSON Parser", desc: "Instant dataset ingestion into in-memory database tables." }
      ],
      codeSnippet: `// SQL Explorer Query Execution Pipeline
import initSqlJs from '@jlongster/sql.js';

export async function executeBrowserQuery(dbInstance, sqlQuery: string) {
  const worker = new Worker('/sql-worker.js');
  
  return new Promise((resolve) => {
    worker.postMessage({ type: 'EXECUTE', query: sqlQuery });
    worker.onmessage = (event) => {
      const { results, executionTimeMs } = event.data;
      resolve({ rows: results[0]?.values || [], fields: results[0]?.columns || [], time: executionTimeMs });
    };
  });
}`
    },
    "umkm-dashboard": {
      id: "02",
      title: "UMKM Analytics Dashboard",
      subtitle: "Business Intelligence & Revenue Engine",
      summary: "Designed for micro and small enterprises, this architecture processes financial logs, computes gross profit margins, tracks inventory turn rates, and renders responsive charts.",
      components: [
        { title: "Recharts Visualization", desc: "Responsive trend lines and stacked metric aggregations." },
        { title: "Financial KPI Engine", desc: "Automated calculations for cash flow, COGS, and profit margin." },
        { title: "Inventory Reorder Monitor", desc: "Low-stock detection and inventory turn rate tracking." },
        { title: "Multi-Period Export", desc: "Generates formatted PDF and spreadsheet financial summaries." }
      ],
      codeSnippet: `// UMKM Business Intelligence Aggregator
export function calculateBusinessMetrics(transactions: Transaction[], inventory: Item[]) {
  const totalRevenue = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const totalCost = transactions.reduce((sum, tx) => sum + (tx.cost || 0), 0);
  const grossProfit = totalRevenue - totalCost;
  const marginPct = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;
  
  const lowStockItems = inventory.filter(item => item.quantity <= item.reorderThreshold);

  return { totalRevenue, grossProfit, marginPct, lowStockItemsCount: lowStockItems.length };
}`
    },
    knotes: {
      id: "03",
      title: "KNotes Workspace",
      subtitle: "Local-First Markdown Indexing Engine",
      summary: "KNotes combines live markdown parsing with local IndexedDB persistence and an in-memory search indexer for sub-millisecond document retrieval.",
      components: [
        { title: "In-Memory Search Index", desc: "Fast keyword lookup across local document stores." },
        { title: "IndexedDB Local Storage", desc: "Offline storage guaranteeing data ownership and privacy." },
        { title: "Live AST Markdown Engine", desc: "Incremental AST parsing with syntax highlighting." },
        { title: "Taxonomy & Tag Engine", desc: "Hierarchical folder organization and multi-tag filtering." }
      ],
      codeSnippet: `// KNotes In-Memory Search Indexer
export class NoteSearchEngine {
  private indexMap = new Map<string, Set<string>>();

  public indexNote(id: string, content: string, tags: string[]) {
    const tokens = content.toLowerCase().split(/\\W+/);
    for (const token of [...tokens, ...tags]) {
      if (!this.indexMap.has(token)) this.indexMap.set(token, new Set());
      this.indexMap.get(token)!.add(id);
    }
  }

  public search(query: string): string[] {
    const term = query.toLowerCase().trim();
    return Array.from(this.indexMap.get(term) || []);
  }
}`
    }
  };

  const current = architectures[selectedTab];

  return (
    <div className="w-full max-w-6xl mx-auto py-12 sm:py-16">
      {/* Header */}
      <div className="mb-8 sm:mb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 block mb-2">
          Engineering Architecture
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
          System Design & Pipelines
        </h2>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-neutral-200 dark:border-neutral-800 mb-8 space-x-4 sm:space-x-6 overflow-x-auto no-scrollbar max-w-full pb-1">
        {(Object.keys(architectures) as Array<keyof typeof architectures>).map((key) => {
          const item = architectures[key];
          return (
            <button
              key={key}
              onClick={() => setSelectedTab(key)}
              className={`pb-3 text-xs sm:text-sm font-mono transition-colors relative shrink-0 whitespace-nowrap ${
                selectedTab === key
                  ? "text-neutral-900 dark:text-white font-semibold border-b-2 border-neutral-900 dark:border-white -mb-[1px]"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300"
              }`}
            >
              {item.id}. {item.title}
            </button>
          );
        })}
      </div>

      {/* Content Container */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Specification Column */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">{current.subtitle}</span>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mt-1">{current.title}</h3>
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {current.summary}
          </p>

          <div className="space-y-3 pt-2">
            {current.components.map((comp, idx) => (
              <div key={idx} className="p-3 sm:p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/40">
                <h4 className="text-xs font-mono font-bold text-neutral-900 dark:text-white mb-1">
                  {comp.title}
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-normal">
                  {comp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Code Column */}
        <div className="lg:col-span-6 max-w-full">
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-[#0c0c0e] text-neutral-300 font-mono text-xs overflow-hidden shadow-xs">
            <div className="bg-neutral-950 px-4 py-2 border-b border-neutral-800 flex items-center justify-between">
              <span className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-neutral-400" /> implementation.ts
              </span>
              <span className="text-[10px] text-neutral-500">TypeScript</span>
            </div>

            <div className="p-3.5 sm:p-4 overflow-x-auto leading-relaxed text-emerald-400">
              <pre className="whitespace-pre-wrap break-all sm:whitespace-pre sm:break-normal"><code>{current.codeSnippet}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
