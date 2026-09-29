import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { PostCard } from "@/components/marketing/post-card";
import { POST_CATEGORY_LABELS } from "@/components/marketing/site-data";
import { getPosts, type PostCategory } from "@/lib/website";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "News & Updates",
  description:
    "News and press releases, events and conferences, and awards and certificates from St. Paul's Hospital of Iloilo.",
  alternates: { canonical: "/news" },
};

const CATEGORY_SLUGS: Record<string, PostCategory> = {
  news: "NEWS",
  events: "EVENT",
  awards: "AWARD",
};

type Props = { searchParams: Promise<{ category?: string }> };

export default async function NewsPage({ searchParams }: Props) {
  const { category: categorySlug } = await searchParams;
  const category = categorySlug ? CATEGORY_SLUGS[categorySlug] : undefined;
  const posts = await getPosts(category);

  const tabs = [
    { slug: undefined, label: "All updates" },
    ...Object.entries(CATEGORY_SLUGS).map(([slug, cat]) => ({ slug, label: POST_CATEGORY_LABELS[cat] })),
  ];

  return (
    <>
      <PageHero
        eyebrow="News & updates"
        title="Behind every headline is a commitment to care"
        description="Hospital news, community outreach, events and the recognitions we receive along the way."
        crumbs={[{ label: "News" }]}
      />
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="News categories" className="mb-8 overflow-x-auto">
            <ul className="flex w-max gap-2">
              {tabs.map((t) => {
                const active = (t.slug ?? "") === (category ? categorySlug : "");
                return (
                  <li key={t.label}>
                    <Link
                      href={t.slug ? `/news?category=${t.slug}` : "/news"}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "inline-block rounded-full px-4 py-2 text-sm font-medium transition-colors",
                        active ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"
                      )}
                    >
                      {t.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {posts.length === 0 ? (
            <p className="py-16 text-center text-muted-foreground">No updates in this category yet.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
