import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/case-studies";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Layers,
  FileCode2,
  LayoutDashboard,
  Building2,
  Users,
  Clock,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) return { title: "Case Study Not Found" };

  return {
    title: `${study.title} - Case Study | Eko Supriyono`,
    description: study.tagline,
  };
}

export async function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export default async function WorkDetailPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const study = caseStudies[slug];

  if (!study) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] text-neutral-900 dark:text-neutral-100 transition-colors duration-200 pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Projects & Case Studies
          </Link>

          <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 px-2.5 py-0.5 rounded-full">
            {study.category}
          </span>
        </div>

        {/* Hero Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-300 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/50 text-xs font-mono text-cyan-800 dark:text-cyan-300">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>{study.constraintBadge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {study.title}
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium">
            {study.tagline}
          </p>

          {/* Role & Timeline Meta */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-100 dark:border-neutral-900 text-xs font-mono">
            <div>
              <span className="text-neutral-400 block mb-1">My Role</span>
              <span className="font-semibold text-neutral-900 dark:text-white">{study.role}</span>
            </div>
            <div>
              <span className="text-neutral-400 block mb-1">Duration</span>
              <span className="font-semibold text-neutral-900 dark:text-white">{study.timeline}</span>
            </div>
            <div>
              <span className="text-neutral-400 block mb-1">Deployment Tier</span>
              <span className="font-semibold text-cyan-600 dark:text-cyan-400">On-Prem Air-Gapped</span>
            </div>
          </div>
        </div>

        {/* Framing Constraint Callout Box (Selling Point Notice) */}
        <div className="p-4 sm:p-6 rounded-xl border border-amber-300 dark:border-amber-900/60 bg-amber-50/80 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 text-xs sm:text-sm leading-relaxed space-y-2">
          <div className="flex items-center gap-2 font-mono font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider text-xs">
            <Lock className="w-4 h-4" /> Confidential Enterprise System Notice
          </div>
          <p className="italic">
            &ldquo;{study.securityNotice}&rdquo;
          </p>
        </div>

        {/* 1. CONTEXT */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500">
            <Building2 className="w-4 h-4 text-neutral-400" />
            <span>1. Context & Scope</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">Project Context</h2>

          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
              <span className="text-[11px] font-mono text-neutral-400 block mb-1">Organization</span>
              <span className="text-xs font-medium text-neutral-900 dark:text-white">{study.context.agency}</span>
            </div>
            <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
              <span className="text-[11px] font-mono text-neutral-400 block mb-1">User Scale</span>
              <span className="text-xs font-medium text-neutral-900 dark:text-white">{study.context.scale}</span>
            </div>
            <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
              <span className="text-[11px] font-mono text-neutral-400 block mb-1">Team Composition</span>
              <span className="text-xs font-medium text-neutral-900 dark:text-white">{study.context.team}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {study.context.summary}
          </p>
        </section>

        {/* 2. CONSTRAINT */}
        <section className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500">
            <Lock className="w-4 h-4 text-amber-500" />
            <span>2. Technical Constraints</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">Engineering Constraints</h2>
          
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0d0d10] space-y-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            <p>
              Operating under strict government air-gapped guidelines meant zero access to public cloud services (AWS/GCP/Azure), no third-party SaaS APIs, and strict validation against local SPBE cybersecurity standards.
            </p>
            <ul className="list-disc list-inside space-y-1 font-mono text-xs text-neutral-700 dark:text-neutral-300">
              <li>Zero External Telemetry / 100% On-Premise Execution</li>
              <li>Strict Data Sovereignty & Audit Traceability</li>
              <li>Heterogeneous Legacy Database Interoperability</li>
            </ul>
          </div>
        </section>

        {/* 3. PROBLEM */}
        <section className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span>3. The Problem</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">The Challenge Before Intervention</h2>
          
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {study.problem.overview}
          </p>

          <div className="space-y-2.5">
            {study.problem.painPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border border-red-200/50 dark:border-red-950/40 bg-red-50/30 dark:bg-red-950/10 text-xs text-neutral-700 dark:text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. DECISION & ARCHITECTURE */}
        <section className="space-y-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500">
            <Cpu className="w-4 h-4 text-cyan-500" />
            <span>4. Architectural Decisions</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">Technical Choices & Rationale</h2>

          {/* Tech Stack Pills */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-neutral-400 block">Technologies & Infrastructure</span>
            <div className="flex flex-wrap gap-2">
              {study.architecture.stack.map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-xs font-mono text-neutral-800 dark:text-neutral-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Rationale Grid */}
          <div className="grid gap-4">
            {study.architecture.decisions.map((dec, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0d0d10] space-y-1.5">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <span className="font-mono text-cyan-600 dark:text-cyan-400 text-xs">0{idx + 1}.</span> {dec.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {dec.rationale}
                </p>
              </div>
            ))}
          </div>

          {/* Diagram Box */}
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 text-emerald-400 font-mono text-[11px] overflow-x-auto">
            <div className="text-neutral-500 text-[10px] mb-2 uppercase tracking-wider">// High-Level Architecture Topography</div>
            <pre className="leading-tight">{study.architecture.diagramAscii}</pre>
          </div>
        </section>

        {/* 5. OUTCOME */}
        <section className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>5. Results & Impact</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">Measurable Outcomes</h2>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {study.outcome.summary}
          </p>

          <div className="grid sm:grid-cols-3 gap-3">
            {study.outcome.highlights.map((hl, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-emerald-300/40 dark:border-emerald-950/60 bg-emerald-50/40 dark:bg-emerald-950/20 text-xs space-y-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                <p className="text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed">{hl}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. VISUAL ARTIFACTS (REPLACEMENT FOR LIVE DEMO) */}
        <section className="space-y-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500">
            <Layers className="w-4 h-4 text-cyan-500" />
            <span>6. Visual Evidence & Sanitized Code</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">System Artifacts & Proof of Concept</h2>

          <div className="space-y-6">
            {study.visualArtifacts.map((art, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0d0d10] space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    {art.type === "snippet" ? <FileCode2 className="w-4 h-4 text-cyan-400" /> : <LayoutDashboard className="w-4 h-4 text-cyan-400" />}
                    {art.title}
                  </h3>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Sanitized Artifact</span>
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  {art.description}
                </p>

                {art.type === "redacted-dashboard" && (
                  <div className="p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 space-y-4 font-mono text-xs">
                    <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
                      <span className="text-neutral-500">[REDACTED INSTANCE DASHBOARD]</span>
                      <span className="text-emerald-500">STATUS: AIR-GAPPED ONLINE</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-3 bg-white dark:bg-neutral-950 rounded border border-neutral-200 dark:border-neutral-800">
                        <div className="text-neutral-400 text-[10px]">Active Threads</div>
                        <div className="font-bold text-sm text-neutral-900 dark:text-white">2,048 rq/s</div>
                      </div>
                      <div className="p-3 bg-white dark:bg-neutral-950 rounded border border-neutral-200 dark:border-neutral-800">
                        <div className="text-neutral-400 text-[10px]">P99 Latency</div>
                        <div className="font-bold text-sm text-emerald-500">18.4 ms</div>
                      </div>
                      <div className="p-3 bg-white dark:bg-neutral-950 rounded border border-neutral-200 dark:border-neutral-800">
                        <div className="text-neutral-400 text-[10px]">SPBE Audit Log</div>
                        <div className="font-bold text-sm text-cyan-400">100% Immutable</div>
                      </div>
                    </div>
                  </div>
                )}

                {art.codeOrContent && (
                  <div className="p-4 rounded-lg bg-neutral-950 text-neutral-200 font-mono text-xs overflow-x-auto border border-neutral-800">
                    <pre><code>{art.codeOrContent}</code></pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button asChild variant="outline" size="sm" className="font-mono text-xs">
            <Link href="/#work">
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to All Projects
            </Link>
          </Button>

          <Button asChild size="sm" className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-mono text-xs">
            <Link href="/#contact">
              Discuss Enterprise Architecture &rarr;
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
