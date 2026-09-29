import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { RESULT_VIEWER } from "@/components/marketing/site-data";
import { SectionHeading } from "@/components/marketing/section-heading";

/**
 * Online Result Viewer grid — links to SPHI's result portals (laboratory,
 * imaging, cardio, neuroscience, e-Doctor) and the e-Patient app.
 */
export function ResultViewer({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section className="px-4 py-14 sm:px-6" aria-labelledby={showHeading ? "results-heading" : undefined}>
      <div className="mx-auto max-w-6xl">
        {showHeading && (
          <SectionHeading
            id="results-heading"
            eyebrow="Online Result Viewer"
            title="Access your results, anytime"
            description="View laboratory, imaging, cardio and neuroscience results online using the credentials provided by the hospital."
          />
        )}
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {RESULT_VIEWER.map(({ label, description, href, icon: Icon, external }) => (
            <li key={label}>
              <Card className="group relative h-full transition-all hover:-translate-y-0.5 hover:shadow-lg focus-within:ring-2 focus-within:ring-ring">
                <CardContent className="flex h-full flex-col gap-3 py-2 sm:flex-row sm:items-center">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">
                      {external ? (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="outline-none after:absolute after:inset-0">
                          {label}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ) : (
                        <Link href={href} className="outline-none after:absolute after:inset-0">{label}</Link>
                      )}
                    </p>
                    <p className="mt-0.5 hidden text-xs text-muted-foreground sm:block">{description}</p>
                  </div>
                  <ArrowUpRight className="ml-auto hidden size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block" aria-hidden />
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
