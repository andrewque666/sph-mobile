import Link from "next/link";
import { redirect } from "next/navigation";
import { Newspaper, Stethoscope, Building2, Users, Inbox, ExternalLink } from "lucide-react";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminPageHeader } from "@/components/website-admin/admin-page-header";

export default async function WebsiteCmsPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/dashboard");

  const [posts, services, departments, doctors, newInquiries] = await Promise.all([
    db.post.count(),
    db.serviceCenter.count(),
    db.clinicalDepartment.count(),
    db.directoryDoctor.count(),
    db.inquiry.count({ where: { status: "NEW" } }),
  ]);

  const sections = [
    { href: "/admin/website/posts", label: "News & updates", desc: "News, events, awards", count: posts, icon: Newspaper },
    { href: "/admin/website/services", label: "Services & centers", desc: "Specialty hub, S.P.I.C.E., ancillaries", count: services, icon: Stethoscope },
    { href: "/admin/website/departments", label: "Clinical departments", desc: "Departments & residency programs", count: departments, icon: Building2 },
    { href: "/admin/website/doctors", label: "Doctor directory", desc: "Public Find-a-Doctor listings", count: doctors, icon: Users },
    { href: "/inquiries", label: "Inquiries", desc: "New contact & appointment requests", count: newInquiries, icon: Inbox },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <AdminPageHeader title="Website" description="Manage the content of the public hospital website.">
        <Button variant="outline" render={<Link href="/" target="_blank" />}>
          <ExternalLink /> View site
        </Button>
      </AdminPageHeader>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map(({ href, label, desc, count, icon: Icon }) => (
          <Link key={href} href={href} className="rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle>{label}</CardTitle>
                <CardAction>
                  <Icon className="size-5 text-primary" />
                </CardAction>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{count}</p>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
