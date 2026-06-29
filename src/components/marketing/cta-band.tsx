import Link from "next/link";
import { ArrowRight, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * "One account for web and app" conversion band — the website's primary
 * pathway into the patient app. Reused on Home, About and Services.
 */
export function CtaBand({
  heading = "One account for the website and the app",
  subtext = "Register or sign in once on the website and continue seamlessly into the SPH patient app — view results, book consultations and track your care. No second account.",
}: {
  heading?: string;
  subtext?: string;
}) {
  return (
    <section className="px-6 py-14">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12">
        <div className="absolute -right-12 -top-12 size-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-16 -left-10 size-56 rounded-full bg-white/5" />
        <div className="relative mx-auto max-w-2xl">
          <span className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-white/15">
            <Smartphone className="size-6" />
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{heading}</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-primary-foreground/80">{subtext}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button variant="secondary" render={<Link href="/register" />}>
              Create your account <ArrowRight />
            </Button>
            <Button
              variant="outline"
              className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
              render={<Link href="/login" />}
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
