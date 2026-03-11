import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import type { Role, AccountStatus } from "@/lib/types";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <Topbar
        email={session.user.email!}
        role={session.user.role as Role}
        status={session.user.status as AccountStatus | undefined}
      />
      <Sidebar
        role={session.user.role as Role}
        status={session.user.status as AccountStatus | undefined}
      />
      <main className="md:pl-64 pt-16">
        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
}
