import { source } from "@/lib/source";
import {
 DocsBody,
 DocsDescription,
 DocsPage,
 DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";

type PageProps = {
 params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
 const { slug } = await params;
 const page = source.getPage([slug]);
 if (!page) notFound();

 const MDX = page.data._exports.default as React.ComponentType<any>;

 return (
  <DocsPage toc={page.data.toc} full={page.data.full}>
   <DocsTitle>{page.data.title}</DocsTitle>
   <DocsDescription>{page.data.description}</DocsDescription>
   <DocsBody>
    <MDX
     components={getMDXComponents({
      // this allows you to link to other pages with relative file paths
      a: createRelativeLink(source, page),
     })}
    />
   </DocsBody>
  </DocsPage>
 );
}

export async function generateStaticParams() {
 const params = await source.generateParams();
 // source.generateParams may return nested slug arrays for catch-all routes.
 // Our route is single-segment `[slug]`, so normalize to a string slug.
 return params.map((p) => {
  const s = p.slug;
  if (Array.isArray(s)) return { slug: s[s.length - 1] };
  return { slug: String(s) };
 });
}

export async function generateMetadata({
 params,
}: PageProps): Promise<Metadata> {
 const { slug } = await params;
 const page = source.getPage([slug]);
 if (!page) notFound();

 return {
  title: page.data.title,
  description: page.data.description,
 };
}
