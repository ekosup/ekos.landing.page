"use client";

import { Quote, Building2, UserCheck } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Eko has an exceptional ability to design resilient architectures under strict air-gapped government constraints. His attention to system performance and SPBE compliance made a critical difference in our deployment.",
      author: "Team Lead",
      organization: "Public Sector Tech Unit / Government Initiative",
      badge: "Peer Endorsement",
    },
    {
      quote:
        "Extremely reliable full stack engineer. Eko turned complex operational requirements into intuitive dashboards and high-speed data pipelines ahead of schedule.",
      author: "Senior Solution Architect",
      organization: "Enterprise Systems Partner",
      badge: "Architecture Peer",
    },
    {
      quote:
        "Technical depth combined with clear communication. He bridges the gap between low-level technical execution and executive stakeholder deliverables seamlessly.",
      author: "Project Manager",
      organization: "GovTech IT Infrastructure",
      badge: "Project Lead",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-12 sm:py-16">
      <div className="mb-8 sm:mb-10 text-center md:text-left">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 block mb-2">
          Team & Peer Recognition
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Social Proof & Testimonials
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 max-w-xl">
          Feedback from team leads, solution architects, and engineering peers across government & enterprise software projects.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="p-5 sm:p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0d0d10] flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <Quote className="w-5 h-5 text-neutral-400 dark:text-neutral-500" />
                <span className="text-[10px] font-mono uppercase text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                  {item.badge}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed italic mb-6">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-900/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300 font-bold text-xs shrink-0 font-mono">
                {item.author.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <h3 className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                  {item.author}
                </h3>
                <p className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 truncate">
                  {item.organization}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
