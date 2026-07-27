"use client";

import React, { useState } from "react";
import {
  Code2,
  Cpu,
  CheckCircle2,
  Send,
  MessageSquare,
  Sparkles,
  Layers,
  HelpCircle,
  Globe,
  Check,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HireMePage() {
  const [lang, setLang] = useState<"id" | "en">("id");
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Form State
  const [serviceType, setServiceType] = useState("fullstack");
  const [budgetTier, setBudgetTier] = useState("IDR 5-15M ($350-$1k)");
  const [timeline, setTimeline] = useState("month");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [projectDesc, setProjectDesc] = useState("");

  const emailAddress = "hello@ekos.my.id";
  const whatsappNumber = "6285128039689";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Generate WhatsApp Message
  const getWhatsAppMessage = () => {
    const serviceName =
      serviceType === "fullstack"
        ? "Full-Stack Web / SaaS App"
        : serviceType === "ai"
        ? "Enterprise AI & RAG System"
        : serviceType === "audit"
        ? "System Architecture & Performance Tuning"
        : "Technical Advisory / Fractional CTO";

    const text =
      lang === "id"
        ? `Halo Eko, saya ingin mendiskusikan proyek berikut:

👤 *Nama*: ${clientName || "-"}
📧 *Email*: ${clientEmail || "-"}
📱 *Kontak*: ${clientPhone || "-"}
🛠️ *Layanan*: ${serviceName}
💰 *Estimasi Budget*: ${budgetTier}
⏱️ *Timeline*: ${timeline}

📝 *Deskripsi Proyek*:
${projectDesc || "(Belum ada rincian)"}`
        : `Hi Eko, I would like to discuss the following project:

👤 *Name*: ${clientName || "-"}
📧 *Email*: ${clientEmail || "-"}
📱 *Contact*: ${clientPhone || "-"}
🛠️ *Service*: ${serviceName}
💰 *Budget Tier*: ${budgetTier}
⏱️ *Timeline*: ${timeline}

📝 *Project Brief*:
${projectDesc || "(No description provided)"}`;

    return encodeURIComponent(text);
  };

  // Generate Mailto Link
  const getMailtoLink = () => {
    const subject = encodeURIComponent(
      `[Project Inquiry] ${serviceType.toUpperCase()} - ${clientName || "Client"}`
    );
    const body = getWhatsAppMessage();
    return `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] text-neutral-900 dark:text-neutral-100 transition-colors duration-200 overflow-x-hidden pt-20 sm:pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* TOP BAR / LANGUAGE SWITCHER */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-[11px] sm:text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shrink-0 animate-pulse" />
            <span className="text-neutral-700 dark:text-neutral-300">
              {lang === "id"
                ? "Terbuka untuk Proyek & Konsultasi"
                : "Available for Freelance & Advisory"}
            </span>
          </div>

          {/* Bilingual Toggle Button */}
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-900 p-1 rounded-md border border-neutral-200 dark:border-neutral-800">
            <Globe className="w-3.5 h-3.5 ml-2 text-neutral-500" />
            <button
              onClick={() => setLang("id")}
              className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                lang === "id"
                  ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold shadow-xs"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              ID
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                lang === "en"
                  ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold shadow-xs"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="text-center py-6 sm:py-10 max-w-4xl mx-auto">
          <div className="inline-block px-3 py-1 mb-4 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
            {lang === "id" ? "Services & Engagement" : "Services & Engagement"}
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4 leading-tight">
            {lang === "id"
              ? "Engineering & Advisory untuk Platform Berkinerja Tinggi"
              : "High-Performance Engineering & Technical Advisory"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            {lang === "id"
              ? "7+ tahun pengalaman membangun aplikasi web enterprise, arsitektur microservices, platform AI/RAG multi-tenant, dan WASM engine dengan standar kode yang bersih dan teruji."
              : "7+ years of experience engineering enterprise web applications, microservices, multi-tenant AI/RAG systems, and WASM engines with strict security standards."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs sm:max-w-none mx-auto">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 font-mono text-xs h-11 px-6 rounded-md shadow-xs"
            >
              <a href="#inquiry-form" className="flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                {lang === "id" ? "Kirim Brief Proyek" : "Submit Project Brief"}
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-mono text-xs h-11 px-6 rounded-md"
            >
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  lang === "id"
                    ? "Halo Eko, saya ingin berdiskusi mengenai proyek software development."
                    : "Hi Eko, I'd like to consult on a potential software project."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                WhatsApp Chat &rarr;
              </a>
            </Button>
          </div>
        </section>

        {/* METRICS STRIP */}
        <section className="my-10 py-8 px-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-neutral-900 dark:text-white">7+ Yrs</div>
              <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mt-1">
                {lang === "id" ? "Pengalaman Engineering" : "Engineering Experience"}
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-neutral-900 dark:text-white">100%</div>
              <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mt-1">
                {lang === "id" ? "Kepemilikan Source Code" : "Source Code IP Handover"}
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-neutral-900 dark:text-white">Enterprise</div>
              <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mt-1">
                {lang === "id" ? "Standar Keamanan SPBE" : "Security & Clean Code"}
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-neutral-900 dark:text-white">Fast</div>
              <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mt-1">
                {lang === "id" ? "Rilis Sesuai Milestone" : "Milestone Execution"}
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES CATALOG */}
        <section className="py-10 border-t border-neutral-200 dark:border-neutral-800">
          <div className="mb-8 text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-1">
              {lang === "id" ? "Katalog Layanan" : "Core Capabilities"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              {lang === "id" ? "Layanan & Spesialisasi" : "Services Offered"}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-xl">
              {lang === "id"
                ? "Pilih opsi layanan yang paling sesuai dengan kebutuhan teknis dan target skala proyek Anda."
                : "Choose the service scope that fits your technical requirements and product roadmap."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {/* Service 1 */}
            <div className="p-5 sm:p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0d0d10] flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-900 dark:text-white mb-4">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                  {lang === "id" ? "Full-Stack Web & SaaS Platform" : "Full-Stack Web & SaaS Platform"}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                  {lang === "id"
                    ? "Pengembangan aplikasi web modern dari nol hingga produksi. UI/UX responsif, backend scalable, API robust, dan optimasi database."
                    : "End-to-end development of modern web applications and SaaS tools. Responsive design, clean APIs, robust DB design, and deployment pipelines."}
                </p>
                <ul className="space-y-1.5 mb-6 text-xs font-mono text-neutral-600 dark:text-neutral-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" /> Next.js 16, React 19, TypeScript, Tailwind
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" /> Django / Python, Node.js, Spring Boot
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" /> PostgreSQL, Redis, Cloudflare Pages / Docker
                  </li>
                </ul>
              </div>
              <a
                href="#inquiry-form"
                onClick={() => setServiceType("fullstack")}
                className="text-xs font-mono text-neutral-900 dark:text-white font-bold flex items-center gap-1 hover:underline"
              >
                {lang === "id" ? "Pilih Layanan Ini" : "Select This Service"} &rarr;
              </a>
            </div>

            {/* Service 2 */}
            <div className="p-5 sm:p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0d0d10] flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-900 dark:text-white mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                  {lang === "id" ? "Enterprise AI & RAG Systems" : "Enterprise AI & RAG Systems"}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                  {lang === "id"
                    ? "Integrasi LLM untuk pencarian dokumen pintar, chatbot internal enterprise, Text2SQL agent, dan otomasi workflow data."
                    : "Integrate LLM pipelines, vector databases (Qdrant), document intelligence, Text2SQL engines, and multi-tenant AI chatbots."}
                </p>
                <ul className="space-y-1.5 mb-6 text-xs font-mono text-neutral-600 dark:text-neutral-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" /> Hybrid Vector Search (BM25 + Dense)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" /> Azure OpenAI, Ollama & Custom LLM Gateways
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" /> Multi-Tenant & Air-Gapped Deployments
                  </li>
                </ul>
              </div>
              <a
                href="#inquiry-form"
                onClick={() => setServiceType("ai")}
                className="text-xs font-mono text-neutral-900 dark:text-white font-bold flex items-center gap-1 hover:underline"
              >
                {lang === "id" ? "Pilih Layanan Ini" : "Select This Service"} &rarr;
              </a>
            </div>

            {/* Service 3 */}
            <div className="p-5 sm:p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0d0d10] flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-900 dark:text-white mb-4">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                  {lang === "id" ? "Arsitektur & Optimasi Performa (WASM)" : "Architecture & WASM Optimization"}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                  {lang === "id"
                    ? "Perbaikan sistem legacy yang lambat, audit database query, eksekusi query client-side dengan WASM, dan penataan ulang struktur kode."
                    : "Refactoring legacy codebases, speeding up database queries, building client-side WASM tools, and optimizing heavy frontend computations."}
                </p>
                <ul className="space-y-1.5 mb-6 text-xs font-mono text-neutral-600 dark:text-neutral-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" /> In-Browser WASM & SQLite Execution
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" /> DB Index Tuning & Query Optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" /> Microservice & API Latency Reduction
                  </li>
                </ul>
              </div>
              <a
                href="#inquiry-form"
                onClick={() => setServiceType("audit")}
                className="text-xs font-mono text-neutral-900 dark:text-white font-bold flex items-center gap-1 hover:underline"
              >
                {lang === "id" ? "Pilih Layanan Ini" : "Select This Service"} &rarr;
              </a>
            </div>

            {/* Service 4 */}
            <div className="p-5 sm:p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0d0d10] flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-900 dark:text-white mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                  {lang === "id" ? "Technical Advisory & Fractional CTO" : "Technical Advisory & Fractional CTO"}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                  {lang === "id"
                    ? "Bimbingan arsitektur untuk startup & tim dev, evaluasi tech stack, code review komprehensif, dan pendampingan audit SPBE/keamanan."
                    : "Strategic architecture guidance for engineering teams. Tech stack evaluation, code reviews, hiring review, and security compliance roadmap."}
                </p>
                <ul className="space-y-1.5 mb-6 text-xs font-mono text-neutral-600 dark:text-neutral-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" /> Strategic Architecture Blueprinting
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" /> Senior Code & Security Audit
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" /> Developer Mentorship & Hiring Assistance
                  </li>
                </ul>
              </div>
              <a
                href="#inquiry-form"
                onClick={() => setServiceType("advisory")}
                className="text-xs font-mono text-neutral-900 dark:text-white font-bold flex items-center gap-1 hover:underline"
              >
                {lang === "id" ? "Pilih Layanan Ini" : "Select This Service"} &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* ENGAGEMENT MODELS */}
        <section className="py-10 border-t border-neutral-200 dark:border-neutral-800">
          <div className="mb-8 text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-1">
              {lang === "id" ? "Model Kerjasama" : "Engagement Models"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              {lang === "id" ? "Skema Kerjasama & Biaya" : "Engagement Framework"}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-xl">
              {lang === "id"
                ? "Disesuaikan dengan kebutuhan timeline, budget, serta alokasi tim proyek Anda."
                : "Tailored to align with your project timeline, budget, and engineering workflow."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {/* Model 1 */}
            <div className="p-5 sm:p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0d0d10] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded">
                  {lang === "id" ? "Proyek Khusus" : "Fixed Scope Project"}
                </span>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white mt-3 mb-2">
                  {lang === "id" ? "Project-Based (Fixed Price)" : "Project-Based"}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4">
                  {lang === "id"
                    ? "Cocok untuk pembuatan produk baru, fitur spesifik, atau MVP dengan batasan scope yang jelas."
                    : "Ideal for standalone product builds, custom MVPs, or specific module delivery with defined scope."}
                </p>
                <div className="border-t border-neutral-100 dark:border-neutral-800 pt-3 mb-4">
                  <div className="text-[11px] font-mono text-neutral-500">{lang === "id" ? "Struktur pembayaran:" : "Payment Structure:"}</div>
                  <div className="text-xs font-mono font-bold text-neutral-900 dark:text-white mt-1">
                    30-50% DP &bull; Milestone Demos &bull; Handover
                  </div>
                </div>
              </div>
              <a
                href="#inquiry-form"
                className="w-full text-center py-2 px-3 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-mono text-neutral-800 dark:text-neutral-200 transition-colors"
              >
                {lang === "id" ? "Minta Estimasi Biaya" : "Request Fixed Quote"}
              </a>
            </div>

            {/* Model 2 (HIGHLIGHTED NEUTRAL) */}
            <div className="p-5 sm:p-6 rounded-xl border-2 border-neutral-900 dark:border-white bg-white dark:bg-[#0d0d10] flex flex-col justify-between relative">
              <div className="absolute -top-3 right-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                {lang === "id" ? "Paling Populer" : "Most Popular"}
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded">
                  {lang === "id" ? "Kontrak Bulanan" : "Monthly Contract"}
                </span>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white mt-3 mb-2">
                  {lang === "id" ? "Dedicated Engineering Retainer" : "Dedicated Retainer"}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4">
                  {lang === "id"
                    ? "Alokasi waktu senior engineer (20-40 jam/minggu) secara berkala untuk pengembangan tim Anda."
                    : "Dedicated senior engineering bandwidth (20-40 hours/week) integrated with your team."}
                </p>
                <div className="border-t border-neutral-100 dark:border-neutral-800 pt-3 mb-4">
                  <div className="text-[11px] font-mono text-neutral-500">{lang === "id" ? "Komitmen minimal:" : "Minimum Commitment:"}</div>
                  <div className="text-xs font-mono font-bold text-neutral-900 dark:text-white mt-1">
                    1 Bulan &bull; Weekly Sprints &bull; Direct Slack/WA
                  </div>
                </div>
              </div>
              <a
                href="#inquiry-form"
                className="w-full text-center py-2 px-3 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 text-xs font-mono font-bold transition-colors"
              >
                {lang === "id" ? "Diskusi Kontrak Bulanan" : "Book Dedicated Retainer"}
              </a>
            </div>

            {/* Model 3 */}
            <div className="p-5 sm:p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0d0d10] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded">
                  {lang === "id" ? "Sesi Strategi" : "Strategy Session"}
                </span>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white mt-3 mb-2">
                  {lang === "id" ? "Advisory & Code Audit" : "Advisory & Code Audit"}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4">
                  {lang === "id"
                    ? "Sesi konsultasi mendalam untuk review arsitektur, audit performa sistem, dan rekomendasi teknis."
                    : "Focused consultation session for architecture review, codebase health audit, and roadmap."}
                </p>
                <div className="border-t border-neutral-100 dark:border-neutral-800 pt-3 mb-4">
                  <div className="text-[11px] font-mono text-neutral-500">{lang === "id" ? "Format:" : "Deliverable:"}</div>
                  <div className="text-xs font-mono font-bold text-neutral-900 dark:text-white mt-1">
                    Live 1-on-1 Call &bull; Audit Report
                  </div>
                </div>
              </div>
              <a
                href="#inquiry-form"
                className="w-full text-center py-2 px-3 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-mono text-neutral-800 dark:text-neutral-200 transition-colors"
              >
                {lang === "id" ? "Jadwalkan Sesi Konsultasi" : "Book Consultation Call"}
              </a>
            </div>
          </div>
        </section>

        {/* PROCESS ROADMAP */}
        <section className="py-10 border-t border-neutral-200 dark:border-neutral-800">
          <div className="mb-8 text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-1">
              {lang === "id" ? "Prosedur Kerjasama" : "Execution Workflow"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              {lang === "id" ? "Alur Kerja Transparan" : "How We Work Together"}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                step: "01",
                title: lang === "id" ? "Discovery & Scope" : "Discovery & Scope",
                desc:
                  lang === "id"
                    ? "Diskusi kebutuhan proyek, analisa tantangan teknis, dan penetapan ekspektasi."
                    : "Initial discussion to define goals, technical requirements, and target deliverables.",
              },
              {
                step: "02",
                title: lang === "id" ? "Arsitektur & Proposal" : "Architecture & Proposal",
                desc:
                  lang === "id"
                    ? "Penyusunan arsitektur sistem, estimasi sprint, dan rincian penawaran biaya."
                    : "Detailed technical proposal, architecture blueprint, sprint timeline, and clear pricing.",
              },
              {
                step: "03",
                title: lang === "id" ? "Sprint & Demo Mingguan" : "Sprint & Weekly Demos",
                desc:
                  lang === "id"
                    ? "Eksekusi koding berstandar tinggi dengan laporan progres & demo berkala."
                    : "High-standard coding execution with regular demo updates and open communication.",
              },
              {
                step: "04",
                title: lang === "id" ? "Audit & Handover" : "Audit & Handover",
                desc:
                  lang === "id"
                    ? "Pengujian performa & keamanan, penyerahan full source code, serta garansi pasca-rilis."
                    : "Security testing, full repository IP transfer, documentation, and post-launch support.",
              },
            ].map((st, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30"
              >
                <div className="text-xl font-mono font-bold text-neutral-400 dark:text-neutral-500 mb-2">
                  {st.step}
                </div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-1">{st.title}</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* INQUIRY FORM WIZARD */}
        <section id="inquiry-form" className="py-10 border-t border-neutral-200 dark:border-neutral-800 scroll-mt-20">
          <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0d0d10]">
            <div className="mb-6 text-center">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                {lang === "id" ? "Borang Pengajuan Proyek" : "Interactive Project Inquiry"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                {lang === "id" ? "Kirim Rincian Proyek Anda" : "Start a Project Discussion"}
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {lang === "id"
                  ? "Isi formulir di bawah ini untuk menghasilkan pesan pengajuan proyek secara instan."
                  : "Fill out the fields below to generate an instant proposal message."}
              </p>
            </div>

            <div className="space-y-5">
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-2">
                  1. {lang === "id" ? "Pilih Layanan Utama" : "Select Primary Service"}
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {[
                    { id: "fullstack", label: "Full-Stack SaaS / Web" },
                    { id: "ai", label: "Enterprise AI / RAG" },
                    { id: "audit", label: "Architecture / WASM" },
                    { id: "advisory", label: "Fractional CTO / Advisory" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setServiceType(s.id)}
                      className={`p-3 rounded-md border text-left transition-colors ${
                        serviceType === s.id
                          ? "border-neutral-900 dark:border-white bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold"
                          : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 text-neutral-700 dark:text-neutral-300"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Tier */}
              <div>
                <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-2">
                  2. {lang === "id" ? "Estimasi Anggaran (Budget Tier)" : "Estimated Budget Tier"}
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  {[
                    { id: "IDR 5-15M ($350-$1k)", label: lang === "id" ? "Rp 5 - 15 Juta" : "$350 - $1,000" },
                    { id: "IDR 15-30M ($1k-$2k)", label: lang === "id" ? "Rp 15 - 30 Juta" : "$1,000 - $2,000" },
                    { id: "> IDR 30M ($2k+)", label: lang === "id" ? "> Rp 30 Juta" : "> $2,000+" },
                  ].map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBudgetTier(b.id)}
                      className={`p-2.5 rounded-md border text-center transition-colors ${
                        budgetTier === b.id
                          ? "border-neutral-900 dark:border-white bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold"
                          : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 text-neutral-700 dark:text-neutral-300"
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Inputs */}
              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-1">
                    {lang === "id" ? "Nama Lengkap" : "Your Name"}
                  </label>
                  <input
                    type="text"
                    placeholder="E.g. Budi / John"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono rounded-md border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:outline-hidden focus:border-neutral-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-1">
                    {lang === "id" ? "Alamat Email" : "Email Address"}
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono rounded-md border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:outline-hidden focus:border-neutral-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-1">
                    {lang === "id" ? "No. WhatsApp / Phone" : "WhatsApp / Phone"}
                  </label>
                  <input
                    type="text"
                    placeholder="+62 812-xxxx-xxxx"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono rounded-md border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:outline-hidden focus:border-neutral-500"
                  />
                </div>
              </div>

              {/* Brief Description */}
              <div>
                <label className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-1">
                  {lang === "id" ? "Ringkasan Kebutuhan Proyek" : "Brief Description / Requirements"}
                </label>
                <textarea
                  rows={4}
                  placeholder={
                    lang === "id"
                      ? "Jelaskan secara singkat ide aplikasi, fitur utama, atau masalah sistem yang ingin diselesaikan..."
                      : "Briefly outline your app concept, key features, or system performance bottlenecks..."
                  }
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono rounded-md border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:outline-hidden focus:border-neutral-500 resize-none"
                />
              </div>

              {/* Submission Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  className="flex-1 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 font-mono text-xs h-10 rounded-md"
                >
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${getWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    {lang === "id" ? "Kirim via WhatsApp" : "Submit via WhatsApp"}
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="flex-1 border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-mono text-xs h-10 rounded-md"
                >
                  <a href={getMailtoLink()} className="flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    {lang === "id" ? "Kirim via Email" : "Submit via Email"}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="py-10 border-t border-neutral-200 dark:border-neutral-800">
          <div className="mb-8 text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-1">
              {lang === "id" ? "Tanya Jawab" : "Frequently Asked Questions"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              {lang === "id" ? "Pertanyaan Umum" : "Common Questions"}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                q: lang === "id" ? "Bagaimana dengan hak cipta dan kepemilikan source code?" : "Who owns the intellectual property and code?",
                a: lang === "id"
                  ? "100% Hak cipta dan seluruh source code menjadi milik Anda sepenuhnya setelah pembayaran lunas. Penyerahan dilakukan via repositori Git pribadi Anda."
                  : "100% of the source code and intellectual property belong to you upon final payment. Handover is completed via your private Git repository."
              },
              {
                q: lang === "id" ? "Apakah menyediakan garansi pasca-rilis?" : "Do you offer post-launch support and maintenance?",
                a: lang === "id"
                  ? "Ya, setiap proyek fixed-scope mencakup garansi perbaikan bug gratis selama 30 hari pasca-deployment."
                  : "Yes, every fixed-scope project includes a 30-day bug fix warranty post-deployment."
              },
              {
                q: lang === "id" ? "Bagaimana mekanisme kerahasiaan data (NDA)?" : "Can we sign a Non-Disclosure Agreement (NDA)?",
                a: lang === "id"
                  ? "Sangat bersedia. Kerahasiaan data bisnis dan ide produk Anda terjamin sepenuhnya melalui penandatanganan dokumen NDA formal."
                  : "Absolutely. I am glad to sign formal NDAs to protect your proprietary business logic and sensitive data."
              },
              {
                q: lang === "id" ? "Teknologi apa saja yang paling sering Anda gunakan?" : "What core stack do you specialize in?",
                a: lang === "id"
                  ? "Next.js 16, React 19, TypeScript, Django, Python, PostgreSQL, WASM, Tailwind CSS, Docker, dan Cloudflare Pages."
                  : "Next.js 16, React 19, TypeScript, Django, Python, PostgreSQL, WASM, Tailwind CSS, Docker, and Cloudflare Pages."
              }
            ].map((faq, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0d0d10]">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-2 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  {faq.q}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* DIRECT CONTACT STRIP */}
        <section className="mt-6 p-6 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              {lang === "id" ? "Punya pertanyaan khusus atau kebutuhan cepat?" : "Have a custom inquiry or quick question?"}
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              {lang === "id"
                ? "Hubungi langsung via Email atau WhatsApp untuk respon cepat."
                : "Reach out directly via Email or WhatsApp for fast responses."}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              asChild
              size="sm"
              className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 font-mono text-xs h-9 px-4 rounded-md"
            >
              <a href={`mailto:${emailAddress}`}>
                Email Me ({emailAddress})
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyEmail}
              className="border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-mono text-xs h-9 px-3 rounded-md"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </Button>
          </div>
        </section>

      </div>
    </div>
  );
}
