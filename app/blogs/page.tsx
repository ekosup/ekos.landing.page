import { source } from "@/lib/source";
import Link from "next/link";

interface BlogPage {
 url: string;
 data: {
  title: string;
  date?: string;
  tags?: string[];
  description?: string;
 };
}

export default function BlogsPage() {
 const pages = source.getPages().sort((a, b) => {
  const dateA = (a.data as any).date
   ? new Date((a.data as any).date).getTime()
   : 0;
  const dateB = (b.data as any).date
   ? new Date((b.data as any).date).getTime()
   : 0;
  return dateB - dateA;
 }); // Sort by date descending

 // Group by first tag
 const grouped = pages.reduce((acc, page) => {
  const tag = (page.data as any).tags?.[0] || "Other";
  if (!acc[tag]) acc[tag] = [];
  acc[tag].push(page);
  return acc;
 }, {} as Record<string, typeof pages>);

 // Sort each group by date descending
 Object.values(grouped).forEach((group) => {
  group.sort((a, b) => {
   const dateA = (a.data as any).date
    ? new Date((a.data as any).date).getTime()
    : 0;
   const dateB = (b.data as any).date
    ? new Date((b.data as any).date).getTime()
    : 0;
   return dateB - dateA;
  });
 });

 return (
  <div className="container mx-auto py-10 px-4 max-w-4xl">
   <h1 className="text-4xl font-bold mb-12 text-center">Blog</h1>
   {Object.entries(grouped).map(([group, posts]) => (
    <section key={group} className="mb-16">
     <h2 className="text-2xl font-semibold mb-6 border-b pb-2">{group}</h2>
     <ul className="space-y-6">
      {posts.map((page) => (
       <li
        key={page.url}
        className="border-l-4 border-gray-300 pl-6 hover:border-blue-500 transition-colors"
       >
        <Link href={page.url} className="block group">
         <h3 className="text-xl font-medium group-hover:text-blue-600 transition-colors">
          {page.data.title}
         </h3>
         <p className="text-gray-600 mt-2 leading-relaxed">
          {(page.data as any).description}
         </p>
         <p className="text-sm text-gray-500 mt-3">
          {(page.data as any).date
           ? new Date((page.data as any).date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
             })
           : "No date"}
         </p>
        </Link>
       </li>
      ))}
     </ul>
    </section>
   ))}
  </div>
 );
}
