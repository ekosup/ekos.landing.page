"use client";

import { useState } from "react";
import { Mail, Github, Linkedin, Copy, Check, ArrowUpRight, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const emailAddress = "hello@ekos.my.id";
  const whatsappNumber = "6281234567890"; // WhatsApp format

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-12 sm:py-16">
      <div className="mb-8 sm:mb-10 text-center md:text-left">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 block mb-2">
          Contact & Communication
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Get in Touch
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 max-w-xl">
          Primary channel for enterprise proposals & senior engineering roles via Email. Secondary channel for quick chats & local client inquiries via WhatsApp.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
        {/* Email Card (PRIMARY CHANNEL) */}
        <div className="p-4 sm:p-6 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#0d0d10] flex flex-col justify-between hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors max-w-full shadow-xs relative overflow-hidden">
          <div className="absolute top-3 right-3 text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded">
            Primary Channel
          </div>

          <div>
            <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-900 dark:text-white mb-4">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-neutral-400 block mb-1">Direct Email</span>
            <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white mb-1 break-all sm:break-normal">
              {emailAddress}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6">
              Best for formal proposals, enterprise roles, and detailed project specifications.
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

        {/* WhatsApp Card (SECONDARY CHANNEL) */}
        <div className="p-4 sm:p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0d0d10] flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors max-w-full relative">
          <div className="absolute top-3 right-3 text-[10px] font-mono text-neutral-400 bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded">
            Secondary / Quick Chat
          </div>

          <div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-neutral-400 block mb-1">WhatsApp Messaging</span>
            <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white mb-1">
              Quick Chat
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6">
              Ideal for fast responses, local Indonesian client queries, and informal discussions.
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="w-full border-emerald-300 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 font-mono text-xs h-9 rounded-md"
          >
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Halo Eko, saya ingin berdiskusi mengenai proyek/kolaborasi.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Start Quick Chat &rarr;
            </a>
          </Button>
        </div>

        {/* Professional Profiles Card (GitHub & LinkedIn) */}
        <div className="p-4 sm:p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0d0d10] flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors max-w-full">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-900 dark:text-white">
                <Github className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-900 dark:text-white">
                <Linkedin className="w-5 h-5" />
              </div>
            </div>
            <span className="text-xs font-mono text-neutral-400 block mb-1">Professional Networks</span>
            <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white mb-1">
              GitHub & LinkedIn
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6">
              Review public repositories, career history, and technical writeups.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <a
              href="https://github.com/ekosup"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-md bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-mono text-neutral-700 dark:text-neutral-300 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5" /> github.com/ekosup
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </a>

            <a
              href="https://www.linkedin.com/in/esupriyono/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-md bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-mono text-neutral-700 dark:text-neutral-300 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5" /> in/esupriyono
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
