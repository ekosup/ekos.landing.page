import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface BlogPage {
  url: string;
  data: {
    title: string;
    date: string;
    tags?: string[];
    description?: string;
  };
}

interface TimelineItemProps {
 page: BlogPage;
 isLast?: boolean;
}

export function TimelineItem({ page, isLast = false }: TimelineItemProps) {
 const date = new Date(page.data.date);
 const tags = page.data.tags || [];

 return (
  <div className="relative flex gap-6">
   {/* Timeline line */}
   {!isLast && (
    <div className="absolute left-6 top-16 w-0.5 h-full bg-linear-to-b from-border to-transparent"></div>
   )}

   <div className="shrink-0">
    {/* Timeline dot */}
    <div className="w-12 h-12 bg-background border-4 border-primary rounded-full flex items-center justify-center shadow-sm">
     <div className="w-3 h-3 bg-primary rounded-full"></div>
    </div>
   </div>

   {/* Content */}
   <div className="flex-1 pb-8">
    <div className="bg-card rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
     {/* Date */}
     <div className="text-sm text-muted-foreground mb-3 font-medium">
      {date.toLocaleDateString("en-US", {
       year: "numeric",
       month: "long",
       day: "numeric",
      })}
     </div>

     {/* Tags */}
     {tags.length > 0 && (
      <div className="flex flex-wrap gap-2 mb-4">
       {tags.slice(0, 3).map((tag: string) => (
        <Badge key={tag} variant="secondary" className="text-xs">
         {tag}
        </Badge>
       ))}
       {tags.length > 3 && (
        <Badge variant="outline" className="text-xs">
         +{tags.length - 3} more
        </Badge>
       )}
      </div>
     )}

     {/* Title */}
     <Link href={page.url}>
      <h3 className="text-xl font-semibold hover:text-primary transition-colors mb-3 leading-tight">
       {page.data.title}
      </h3>
     </Link>

     {/* Description */}
     <p className="text-muted-foreground leading-relaxed mb-4">
      {page.data.description}
     </p>

     {/* Read more link */}
     <Link
      href={page.url}
      className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm group"
     >
      Read article
      <svg
       className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
       fill="none"
       stroke="currentColor"
       viewBox="0 0 24 24"
      >
       <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
       />
      </svg>
     </Link>
    </div>
   </div>
  </div>
 );
}
