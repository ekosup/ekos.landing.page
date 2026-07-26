"use client";

import { useState } from "react";
import { Mail, Github, Linkedin, Copy, Check, ArrowUpRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const emailAddress = "hello@ekos.my.id";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-16">
      <div className="mb-10 text-center md:text-left">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 block mb-2">
          Contact & Collaboration
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Get in Touch
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 max-w-xl">
          Available for senior full stack software engineering roles, technical advisory, and select freelance builds. Feel free to reach out directly.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Email Card */}
        <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0d0d10] flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
          <div>
            <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-900 dark:text-white mb-4">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-neutral-400 block mb-1">Direct Email</span>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-1">
              {emailAddress}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6">
              Best way for project inquiries and formal proposals.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              asChild
              className="flex-1 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 font-mono text-xs h-9 rounded-md"
            >
              <a href={`mailto:${emailAddress}`} className="flex items-center justify-center gap-1.5">
                <Send className="w-3.5 h-3.5" />
                Email Me
              </a>
            </Button>
            <Button
              variant="outline"
              onClick={handleCopyEmail}
              className="px-3 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono text-xs h-9 rounded-md"
              title="Copy email address"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* GitHub Card */}
        <a
          href="https://github.com/ekosup"
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0d0d10] flex flex-col justify-between hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors group"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-900 dark:text-white mb-4">
              <Github className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-neutral-400 block mb-1">GitHub Profile</span>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-1 flex items-center justify-between">
              github.com/ekosup
              <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Explore open-source repositories, WASM experiments, and public code.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-900/60 flex items-center text-xs font-mono text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-300 transition-colors">
            <span>View Repositories</span>
          </div>
        </a>

        {/* LinkedIn Card */}
        <a
          href="https://www.linkedin.com/in/esupriyono/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0d0d10] flex flex-col justify-between hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors group"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-900 dark:text-white mb-4">
              <Linkedin className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-neutral-400 block mb-1">LinkedIn Network</span>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-1 flex items-center justify-between">
              in/esupriyono
              <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Connect professionally, view employment history, and send direct messages.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-900/60 flex items-center text-xs font-mono text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-300 transition-colors">
            <span>Connect on LinkedIn</span>
          </div>
        </a>
      </div>
    </div>
  );
}

