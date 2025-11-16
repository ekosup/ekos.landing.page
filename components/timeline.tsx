import { TimelineItem } from "./timeline-item";

interface BlogPage {
  url: string;
  data: {
    title: string;
    date: string;
    tags?: string[];
    description?: string;
  };
}

interface TimelineProps {
 posts: BlogPage[];
 title?: string;
}

export function Timeline({ posts, title }: TimelineProps) {
 if (posts.length === 0) {
  return (
   <div className="text-center py-8">
    <p className="text-muted-foreground">No posts found in this category.</p>
   </div>
  );
 }

 return (
  <div className="w-full">
   {title && (
    <div className="mb-8 text-center">
     <h2 className="text-2xl font-bold mb-2">{title}</h2>
     <div className="w-16 h-0.5 bg-linear-to-r from-blue-500 to-purple-500 mx-auto"></div>
    </div>
   )}

   <div className="relative space-y-6">
    {posts.map((page, index) => (
     <TimelineItem
      key={page.url}
      page={page}
      isLast={index === posts.length - 1}
     />
    ))}
   </div>
  </div>
 );
}
