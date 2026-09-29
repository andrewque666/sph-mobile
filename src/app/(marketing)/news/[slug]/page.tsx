import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/marketing/post-card";
import { POST_CATEGORY_LABELS, SITE } from "@/components/marketing/site-data";
import { formatDate, getPost, getPosts, paragraphs } from "@/lib/website";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/news/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt.toISOString(),
      ...(post.imageUrl ? { images: [{ url: post.imageUrl }] } : {}),
    },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const more = (await getPosts(undefined, 4)).filter((p) => p.id !== post.id).slice(0, 3);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": post.category === "EVENT" ? "Event" : "NewsArticle",
    ...(post.category === "EVENT"
      ? {
          name: post.title,
          startDate: (post.eventDate ?? post.publishedAt).toISOString(),
          ...(post.location ? { location: { "@type": "Place", name: post.location } } : {}),
          organizer: { "@type": "Hospital", name: SITE.legalName, url: SITE.url },
        }
      : {
          headline: post.title,
          datePublished: post.publishedAt.toISOString(),
          dateModified: post.updatedAt.toISOString(),
          publisher: { "@type": "Hospital", name: SITE.legalName, url: SITE.url },
        }),
    description: post.excerpt,
    ...(post.imageUrl ? { image: post.imageUrl } : {}),
  };

  return (
    <>
      <article className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Button variant="ghost" size="sm" className="-ml-2 mb-6" render={<Link href="/news" />}>
            <ArrowLeft /> All news
          </Button>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="secondary">{POST_CATEGORY_LABELS[post.category]}</Badge>
            <time dateTime={post.publishedAt.toISOString()}>{formatDate(post.publishedAt)}</time>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>

          {post.category === "EVENT" && post.eventDate && (
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 rounded-xl bg-secondary/60 p-4 text-sm">
              <p className="flex items-center gap-2">
                <CalendarDays className="size-4 text-primary" aria-hidden />
                {formatDate(post.eventDate, { dateStyle: "full", timeStyle: "short" })}
              </p>
              {post.location && (
                <p className="flex items-center gap-2">
                  <MapPin className="size-4 text-primary" aria-hidden /> {post.location}
                </p>
              )}
            </div>
          )}

          {post.imageUrl && (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-secondary">
              <Image src={post.imageUrl} alt="" fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
            </div>
          )}

          <div className="mt-8 space-y-5 text-base leading-relaxed">
            {paragraphs(post.body).map((p) => (
              <p key={p.slice(0, 40)} className="whitespace-pre-line">{p}</p>
            ))}
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section aria-labelledby="more-news" className="border-t border-border bg-secondary/40 px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 id="more-news" className="mb-6 text-xl font-semibold">More updates</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
