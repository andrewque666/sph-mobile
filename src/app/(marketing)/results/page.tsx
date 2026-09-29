import type { Metadata } from "next";
import Link from "next/link";
import { KeyRound, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/marketing/page-hero";
import { ResultViewer } from "@/components/marketing/result-viewer";
import { SITE } from "@/components/marketing/site-data";

export const metadata: Metadata = {
  title: "Online Result Viewer",
  description:
    "View your SPHI laboratory, imaging, cardio and neuroscience results online, or log in to e-Doctor and the e-Patient portal.",
  alternates: { canonical: "/results" },
};

export default function ResultsPage() {
  return (
    <>
      <PageHero
        eyebrow="Online Result Viewer"
        title="Get your results online"
        description="Choose the department that performed your test. Each portal opens in a new tab — sign in with the access details provided by the hospital."
        crumbs={[{ label: "Services", href: "/services" }, { label: "Online results" }]}
      />
      <ResultViewer showHeading={false} />
      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="flex gap-3">
              <KeyRound className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <div className="text-sm">
                <p className="font-semibold">Keep your results private</p>
                <p className="mt-1 text-muted-foreground">
                  Never share your result access details. Log out and close the tab when viewing results on a shared device.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <div className="text-sm">
                <p className="font-semibold">Can&apos;t find your result?</p>
                <p className="mt-1 text-muted-foreground">
                  Call {SITE.contact.phone} and ask for the department that performed your test, or{" "}
                  <Link href="/contact?subject=Online%20results" className="font-medium text-primary underline-offset-4 hover:underline">
                    send us a message
                  </Link>
                  .
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
