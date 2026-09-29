import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ExternalLink } from "lucide-react";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { AdminPageHeader } from "@/components/website-admin/admin-page-header";
import { DeleteButton } from "@/components/website-admin/delete-button";
import { PostForm } from "@/components/website-admin/post-form";
import { toManilaInput } from "@/lib/website";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/dashboard");

  const { id } = await params;
  const post = await db.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-4 md:space-y-6">
      <AdminPageHeader title="Edit post" backHref="/admin/website/posts">
        {post.published && (
          <Button variant="outline" render={<Link href={`/news/${post.slug}`} target="_blank" />}>
            <ExternalLink /> View
          </Button>
        )}
        <DeleteButton url={`/api/website/posts/${post.id}`} label="Post" backTo="/admin/website/posts" />
      </AdminPageHeader>
      <PostForm
        id={post.id}
        defaults={{
          title: post.title,
          slug: post.slug,
          category: post.category,
          excerpt: post.excerpt,
          body: post.body,
          imageUrl: post.imageUrl ?? "",
          eventDate: toManilaInput(post.eventDate, true),
          location: post.location ?? "",
          published: post.published,
          publishedAt: toManilaInput(post.publishedAt),
        }}
      />
    </div>
  );
}
