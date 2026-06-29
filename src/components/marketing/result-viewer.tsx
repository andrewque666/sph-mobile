import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { RESULT_VIEWER } from "@/components/marketing/site-data";

/**
 * Online Result Viewer grid. Every portal card is a pathway into the patient
 * app — visitors sign in (shared SSO) to view their results.
 */
export function ResultViewer() {
  return (
    <section className="px-6 py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Online Result Viewer
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Access your results, anytime
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Sign in to the patient app to securely view your laboratory, imaging and
            specialty results.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {RESULT_VIEWER.map(({ label, icon: Icon }) => (
            <Card
              key={label}
              className="group transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Link href="/login" className="block">
                <CardContent className="flex flex-col items-center gap-3 py-7 text-center">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-6" />
                  </span>
                  <div>
                    <p className="text-sm font-medium">View {label}</p>
                    <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-primary">
                      Open portal <ArrowRight className="size-3" />
                    </p>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
