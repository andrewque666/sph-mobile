import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, Newspaper, Award, Megaphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { POST_CATEGORY_LABELS } from "@/components/marketing/site-data";
import { formatDate } from "@/lib/website";
import type { PostCategory } from "@/generated/prisma/client";

const CATEGORY_ICON = { NEWS: Newspaper, EVENT: Megaphone, AWARD: Award } as const;

type PostCardData = {
  slug: string;
  title: string;
  excerpt: string;
  category: PostCategory;
  imageUrl: string | null;
  publishedAt: Date;
  eventDate: Date | null;
  location: string | null;
};

export function PostCard({ post }: { post: PostCardData }) {
  const Icon = CATEGORY_ICON[post.category];
  return (
    <Card className="group relative h-full pt-0 transition-all hover:-translate-y-0.5 hover:shadow-lg focus-within:ring-2 focus-within:ring-ring">
      <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt=""
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/15 to-secondary">
            <Icon className="size-10 text-primary/60" aria-hidden />
          </div>
        )}
      </div>
      <CardContent className="flex flex-1 flex-col gap-2.5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary">{POST_CATEGORY_LABELS[post.category]}</Badge>
          <time dateTime={post.publishedAt.toISOString()}>{formatDate(post.publishedAt, { dateStyle: "medium" })}</time>
        </div>
        <h3 className="text-base font-semibold leading-snug text-balance">
          <Link href={`/news/${post.slug}`} className="outline-none after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
        {post.category === "EVENT" && post.eventDate && (
          <div className="mt-auto space-y-1 pt-1 text-xs text-muted-foreground">
            <p className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5" aria-hidden />
              {formatDate(post.eventDate, { dateStyle: "full" })}
            </p>
            {post.location && (
              <p className="flex items-center gap-1.5">
                <MapPin className="size-3.5" aria-hidden /> {post.location}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
