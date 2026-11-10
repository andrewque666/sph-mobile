import type { Metadata } from "next";
import Image from "next/image";
import { CalendarDays, Download, FileText, Mail, MapPin, Phone, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHero } from "@/components/marketing/page-hero";
import { SectionHeading } from "@/components/marketing/section-heading";
import { IRB } from "@/components/marketing/site-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type DocLink = { title: string; href?: string };

function fileType(href: string) {
  return href.split(".").pop()?.toUpperCase() ?? "FILE";
}

function DocItem({ doc, icon: Icon }: { doc: DocLink; icon: typeof FileText }) {
  if (!doc.href) {
    return (
      <span className="flex items-start gap-2">
        <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden /> {doc.title}
      </span>
    );
  }
  const type = fileType(doc.href);
  const isDocx = type === "DOCX";
  return (
    <a
      href={doc.href}
      {...(isDocx ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}
      className="group -m-1.5 flex items-start gap-2 rounded-lg p-1.5 hover:bg-secondary"
    >
      <Icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
      <span className="min-w-0 flex-1 group-hover:text-primary">{doc.title}</span>
      <span className="ml-1 inline-flex shrink-0 items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
        <Download className="size-3" aria-hidden /> {type}
      </span>
    </a>
  );
}

function FlowImage({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  return (
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className="mx-auto mb-4 block max-w-md overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
    >
      <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 768px) 448px, 100vw" className="h-auto w-full" />
      <span className="block border-t border-border px-3 py-2 text-center text-xs text-muted-foreground">Click to open full-size</span>
    </a>
  );
}

type FlowStep = { day?: string; title?: string; text: string };
type FlowData = {
  intro: FlowStep[];
  tracks: { name: string; steps: FlowStep[] }[];
  outro: FlowStep[];
};

function StepList({ steps }: { steps: FlowStep[] }) {
  return (
    <ol className="list-decimal space-y-2 pl-5 text-sm">
      {steps.map((s) => (
        <li key={s.text.slice(0, 40)}>
          {s.day && <span className="mr-1.5 text-xs font-semibold text-primary">{s.day}</span>}
          {s.title && <span className="font-semibold">{s.title}. </span>}
          {s.text}
        </li>
      ))}
    </ol>
  );
}

function Flow({ flow }: { flow: FlowData }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent>
          <StepList steps={flow.intro} />
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        {flow.tracks.map((t) => (
          <Card key={t.name}>
            <CardHeader>
              <CardTitle className="font-semibold">{t.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <StepList steps={t.steps} />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent>
          <StepList steps={flow.outro} />
        </CardContent>
      </Card>
    </div>
  );
}

function ProtocolTable({ caption, rows }: { caption: string; rows: { title: string; investigator: string; status: string }[] }) {
  return (
    <div>
      <h3 className="mb-3 text-base font-semibold">{caption}</h3>
      <div className="overflow-x-auto rounded-xl bg-card ring-1 ring-foreground/10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Protocol title</TableHead>
              <TableHead>Principal Investigator / Researcher</TableHead>
              <TableHead>Approved</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r, i) => (
              <TableRow key={`${i}-${r.title.slice(0, 30)}`}>
                <TableCell className="whitespace-normal">{r.title}</TableCell>
                <TableCell>{r.investigator}</TableCell>
                <TableCell>{r.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Institutional Review Board (IRB)",
  description:
    "The PHREB-accredited SPHI Institutional Review Board — mission, members, submission requirements, forms, guidelines and 2026 meeting schedule.",
  alternates: { canonical: "/irb" },
};

export default function IrbPage() {
  return (
    <>
      <PageHero
        eyebrow="Research ethics"
        title="Institutional Review Board"
        description={IRB.vision}
        crumbs={[{ label: "Services", href: "/services" }, { label: "IRB" }]}
      >
        <Button render={<a href={`mailto:${IRB.email}`} />}>
          <Mail /> Email the IRB
        </Button>
      </PageHero>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 sm:px-6">
        <Image
          src="/images/irb/irb-banner.webp"
          alt="St. Paul's Hospital of Iloilo Institutional Review Board"
          width={1377}
          height={636}
          priority
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="h-auto w-full rounded-xl ring-1 ring-foreground/10"
        />

        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="History" title="From ethics committee to PHREB-accredited board" />
            <div className="space-y-4 text-muted-foreground">
              {IRB.history.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="font-semibold">Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal space-y-2 pl-5 text-sm">
                {IRB.mission.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ol>
              <div className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
                <p className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /> {IRB.location}</p>
                <p className="flex gap-2"><Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /> {IRB.phone}</p>
                <p className="flex gap-2"><Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /> <a href={`mailto:${IRB.email}`} className="text-primary hover:underline">{IRB.email}</a></p>
              </div>
            </CardContent>
          </Card>
          <Image
            src="/images/irb/mission-vision.webp"
            alt="SPHI Institutional Review Board mission and vision"
            width={1472}
            height={877}
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="h-auto w-full rounded-xl ring-1 ring-foreground/10 lg:col-span-2"
          />
        </section>

        <section aria-labelledby="irb-members">
          <SectionHeading id="irb-members" eyebrow={`As of ${IRB.membersAsOf}`} title="Organizational chart" />
          <div className="mb-8 grid gap-4 lg:grid-cols-2">
            <Image
              src="/images/irb/members-group.webp"
              alt="Members of the SPHI Institutional Review Board"
              width={1600}
              height={1200}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="h-auto w-full rounded-xl ring-1 ring-foreground/10"
            />
            <Image
              src="/images/irb/org-chart.webp"
              alt="SPHI Institutional Review Board organizational chart"
              width={1093}
              height={854}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="h-auto w-full rounded-xl bg-card ring-1 ring-foreground/10"
            />
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {IRB.members.map((m) => (
              <li key={m.name} className="flex items-center gap-4 rounded-xl bg-card p-4 ring-1 ring-foreground/10">
                <Image
                  src={m.image}
                  alt={m.name}
                  width={300}
                  height={300}
                  sizes="64px"
                  className="size-16 shrink-0 rounded-full object-cover ring-1 ring-foreground/10"
                />
                <div className="min-w-0">
                  <p className="font-semibold">{m.name}</p>
                  <p className="text-sm text-primary">{m.role}</p>
                  <p className="text-sm text-muted-foreground">{m.field}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-semibold">
                <FileText className="size-5 text-primary" aria-hidden /> SOP & submission forms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                {IRB.forms.map((f) => (
                  <li key={f.title}>
                    <DocItem doc={f} icon={FileText} />
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                Need a document that is not listed? Request it from the IRB Secretariat at{" "}
                <a href={`mailto:${IRB.email}?subject=IRB%20forms%20request`} className="font-medium text-primary hover:underline">{IRB.email}</a>.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-semibold">
                <CalendarDays className="size-5 text-primary" aria-hidden /> 2026 meeting dates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm text-muted-foreground">Submission cut-off: every 21st of the month, until 4:00 PM.</p>
              <ul className="grid grid-cols-2 gap-1.5 text-sm">
                {IRB.meetingDates.map((d) => (
                  <li key={d}>{d.replace(", 2026", "")}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="irb-submission-flow">
          <SectionHeading id="irb-submission-flow" eyebrow="Process" title="Flow chart of protocol submissions" />
          <FlowImage src="/images/irb/flowchart-protocol.webp" alt="Flow chart of protocol submissions" width={2000} height={2828} />
          <Flow flow={IRB.submissionFlow} />
        </section>

        <section aria-labelledby="irb-post-approval-flow">
          <SectionHeading id="irb-post-approval-flow" eyebrow="Process" title="Flow chart of post-approval submissions" />
          <FlowImage src="/images/irb/flowchart-post-approval.webp" alt="Flow chart of post-approval submissions" width={1241} height={1755} />
          <Flow flow={IRB.postApprovalFlow} />
        </section>

        <section aria-labelledby="irb-protocols">
          <SectionHeading id="irb-protocols" eyebrow="Research" title="Active protocols" />
          <p className="mb-4 text-sm">
            <a href={IRB.activeProtocolsPdf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
              <Download className="size-4" aria-hidden /> Download the list of active protocols (PDF)
            </a>
          </p>
          <div className="space-y-8">
            <ProtocolTable caption="Sponsored clinical trials" rows={IRB.activeProtocols.clinicalTrials} />
            <ProtocolTable caption="Researcher-initiated studies" rows={IRB.activeProtocols.researcherInitiated} />
          </div>
        </section>

        <section aria-labelledby="irb-guidelines">
          <SectionHeading id="irb-guidelines" eyebrow="References" title="National & international guidelines" />
          <ul className="grid gap-3 text-sm sm:grid-cols-2">
            {IRB.guidelines.map((g) => (
              <li key={g.title} className="rounded-xl bg-card p-3 ring-1 ring-foreground/10">
                <DocItem doc={g} icon={BookOpen} />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="irb-faq">
          <SectionHeading id="irb-faq" eyebrow="FAQs" title="Frequently asked questions" description={`Can't find your answer? Email us at ${IRB.email}.`} />
          <div className="divide-y divide-border rounded-xl bg-card ring-1 ring-foreground/10">
            {IRB.faqs.map((f) => (
              <details key={f.q} className="group px-4 py-3 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium">
                  {f.q}
                  <span aria-hidden className="text-lg leading-none text-muted-foreground transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
                {f.items && (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {f.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                )}
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
