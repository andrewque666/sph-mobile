import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminPageHeader } from "@/components/website-admin/admin-page-header";
import { POST_CATEGORY_LABELS } from "@/components/marketing/site-data";
import { formatDate } from "@/lib/website";

export default async function AdminPostsPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/dashboard");

  const posts = await db.post.findMany({ orderBy: { publishedAt: "desc" } });

  return (
    <div className="space-y-4 md:space-y-6">
      <AdminPageHeader title="News & updates" description="News & press releases, events & conferences, awards & certificates." backHref="/admin/website">
        <Button render={<Link href="/admin/website/posts/new" />}>
          <Plus /> New post
        </Button>
      </AdminPageHeader>

      {/* Mobile: cards */}
      <div className="space-y-3 md:hidden">
        {posts.map((p) => (
          <Link key={p.id} href={`/admin/website/posts/${p.id}`} className="block">
            <Card>
              <CardContent className="space-y-1.5">
                <p className="font-medium">{p.title}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{POST_CATEGORY_LABELS[p.category]}</Badge>
                  {!p.published && <Badge variant="outline">Draft</Badge>}
                </div>
                <p className="text-xs text-muted-foreground">{formatDate(p.publishedAt, { dateStyle: "medium" })}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="max-w-md whitespace-normal">
                  <Link href={`/admin/website/posts/${p.id}`} className="font-medium hover:text-primary hover:underline">
                    {p.title}
                  </Link>
                </TableCell>
                <TableCell>{POST_CATEGORY_LABELS[p.category]}</TableCell>
                <TableCell>{formatDate(p.publishedAt, { dateStyle: "medium" })}</TableCell>
                <TableCell>
                  <Badge variant={p.published ? "secondary" : "outline"}>{p.published ? "Published" : "Draft"}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {posts.length === 0 && <p className="py-8 text-center text-muted-foreground">No posts yet.</p>}
    </div>
  );
}
