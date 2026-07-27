import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hire Eko Supriyono | Senior Full-Stack Engineer & Technical Consultant",
  description:
    "Hire Eko Supriyono for high-performance web applications, enterprise AI/RAG integrations, system architecture audits, and CTO advisory. 7+ years experience.",
  openGraph: {
    title: "Hire Eko Supriyono - Senior Engineering & Technical Advisory",
    description:
      "Enterprise-grade full-stack web applications, AI integration, WASM engines, and technical consulting.",
    url: "https://ekos.my.id/hire-me",
    type: "website",
  },
};

export default function HireMeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
