import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";

const customTree = {
 name: "blogs",
 children: [
  {
   type: "folder" as const,
   name: "Other",
   children: [
    { type: "page" as const, name: "Hello World", url: "/blogs/hello-world" },
    { type: "page" as const, name: "Projects", url: "/blogs/projects" },
   ],
  },
  {
   type: "folder" as const,
   name: "Modul Prakom Keahlian",
   children: [
    {
     type: "page" as const,
     name: "M1: IT Enterprise",
     url: "/blogs/modul-1-it-enterprise",
    },
    {
     type: "page" as const,
     name: "M2: Manajemen Layanan TI",
     url: "/blogs/modul-2-manajemen-layanan-ti",
    },
    {
     type: "page" as const,
     name: "M3: Manajemen Risiko TI",
     url: "/blogs/modul-3-manajemen-risiko-ti",
    },
    {
     type: "page" as const,
     name: "M4: Pengelolaan Data",
     url: "/blogs/modul-4-pengelolaan-data",
    },
    {
     type: "page" as const,
     name: "M5: Sistem Jaringan Komputer",
     url: "/blogs/modul-5-sistem-jaringan-komputer",
    },
    {
     type: "page" as const,
     name: "M6: Manajemen Infrastruktur TI",
     url: "/blogs/modul-6-manajemen-infrastruktur-ti",
    },
    {
     type: "page" as const,
     name: "M7: Audit TI",
     url: "/blogs/modul-7-audit-ti",
    },
    {
     type: "page" as const,
     name: "M8: Sistem Informasi",
     url: "/blogs/modul-8-sistem-informasi",
    },
    {
     type: "page" as const,
     name: "M9: Pengolahan Data",
     url: "/blogs/modul-9-pengolahan-data",
    },
    {
     type: "page" as const,
     name: "M10: Area TI Spesial",
     url: "/blogs/modul-10-area-ti-spesial",
    },
    {
     type: "page" as const,
     name: "M11: Pembuatan Dokumentasi dan Laporan",
     url: "/blogs/modul-11-pembuatan-dokumentasi-dan-laporan",
    },
    {
     type: "page" as const,
     name: "M12: Sistem Penilaian dan Administrasi Pranata Komputer",
     url: "/blogs/modul-12-sistem-penilaian-dan-administrasi-pranata-komputer",
    },
   ],
  },
 ],
};

export default function Layout({ children }: LayoutProps<"/blogs">) {
 return (
  <DocsLayout tree={customTree} {...baseOptions()}>
   {children}
  </DocsLayout>
 );
}
