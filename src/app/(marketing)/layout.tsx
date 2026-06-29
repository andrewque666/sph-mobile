import { auth } from "@/auth";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";

/**
 * Public marketing site shell. Reads the shared session so the header reflects
 * SSO state (signed-in visitors go straight to the app).
 */
export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader isLoggedIn={isLoggedIn} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
