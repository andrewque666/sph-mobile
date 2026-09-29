import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminPageHeader } from "@/components/website-admin/admin-page-header";
import { PostForm } from "@/components/website-admin/post-form";

export default async function NewPostPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/dashboard");

  return (
    <div className="mx-auto max-w-3xl space-y-4 md:space-y-6">
      <AdminPageHeader title="New post" backHref="/admin/website/posts" />
      <PostForm />
    </div>
  );
}
