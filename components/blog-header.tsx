interface BlogHeaderProps {
 title?: string;
 subtitle?: string;
 description?: string;
}

export function BlogHeader({
 title = "Blog",
 subtitle,
 description = "Thoughts, insights, and explorations in technology and development",
}: BlogHeaderProps) {
 return (
  <div className="text-center mb-12">
   <h1 className="text-4xl font-bold mb-4">{title}</h1>
   {subtitle && (
    <p className="text-xl text-muted-foreground mb-4 font-medium">{subtitle}</p>
   )}
   <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
    {description}
   </p>
   <div className="mt-6 flex justify-center">
    <div className="w-24 h-1 bg-linear-to-r from-primary via-primary/50 to-primary rounded-full"></div>
   </div>
  </div>
 );
}
