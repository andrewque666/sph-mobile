import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList, PhoneCall, CalendarCheck, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHero } from "@/components/marketing/page-hero";
import { InquiryForm } from "@/components/marketing/inquiry-form";
import { SITE } from "@/components/marketing/site-data";
import { getDepartments, getServices } from "@/lib/website";

export const metadata: Metadata = {
  title: "Request an Appointment",
  description:
    "Request a consultation or procedure at St. Paul's Hospital of Iloilo. Our staff will contact you to confirm your schedule.",
  alternates: { canonical: "/appointments" },
};

type Props = { searchParams: Promise<{ doctor?: string; department?: string; service?: string }> };

const STEPS = [
  { icon: ClipboardList, title: "Send your request", text: "Tell us who or what you'd like to see and when." },
  { icon: PhoneCall, title: "We contact you", text: "Our staff will call or email to confirm availability." },
  { icon: CalendarCheck, title: "Visit the clinic", text: "Arrive a little early and bring a valid ID and your HMO/PhilHealth details." },
];

export default async function AppointmentsPage({ searchParams }: Props) {
  const { doctor, department, service } = await searchParams;
  const [departments, services] = await Promise.all([getDepartments(), getServices()]);
  const options = [...departments.map((d) => d.name), ...services.map((s) => s.name)];

  return (
    <>
      <PageHero
        eyebrow="Appointments"
        title="Request an appointment"
        description="Send us your preferred doctor, service and date. This is a request, not a confirmed booking — our staff will reach out to confirm your schedule."
        crumbs={[{ label: "Appointments" }]}
      />

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_340px]">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Appointment request</CardTitle>
          </CardHeader>
          <CardContent>
            <InquiryForm
              type="APPOINTMENT"
              departments={options}
              defaults={{
                doctor: doctor?.slice(0, 120),
                department: (department ?? service)?.slice(0, 120),
              }}
            />
          </CardContent>
        </Card>

        <aside className="space-y-4">
          <ol className="space-y-3">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="flex gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/10">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-4" aria-hidden />
                </span>
                <div className="text-sm">
                  <p className="font-semibold">{i + 1}. {title}</p>
                  <p className="text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <Card size="sm">
            <CardContent className="space-y-3 text-sm">
              <p>Not sure which doctor to see? Browse clinic schedules in our directory.</p>
              <Button variant="outline" className="w-full" render={<Link href="/find-a-doctor" />}>
                <Search /> Find a doctor
              </Button>
              <p className="text-muted-foreground">
                Prefer to call? {SITE.contact.phone}. For emergencies, go directly to the Emergency Room.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </>
  );
}
