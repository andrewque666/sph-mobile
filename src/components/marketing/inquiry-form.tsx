"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { inquirySchema, type InquiryInput } from "@/lib/validations/website";

type Props = {
  type: "GENERAL" | "APPOINTMENT";
  defaults?: Partial<Pick<InquiryInput, "subject" | "department" | "doctor">>;
  departments?: string[];
};

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm text-destructive">
      {message}
    </p>
  );
}

/**
 * Website contact / appointment-request form. Submissions are stored as
 * inquiries and handled by hospital staff from the dashboard.
 */
export function InquiryForm({ type, defaults, departments = [] }: Props) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isAppointment = type === "APPOINTMENT";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema, undefined, { raw: true }),
    defaultValues: { type, ...defaults },
  });

  async function onSubmit(data: InquiryInput) {
    setError(null);
    const website = (document.getElementById(`${type}-website`) as HTMLInputElement | null)?.value;
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website }),
      });
      if (!res.ok) {
        setError("We couldn't send your message. Please check the form and try again, or call us.");
        return;
      }
      setDone(true);
      reset({ type });
    } catch {
      setError("Network error — please try again, or call us.");
    }
  }

  if (done) {
    return (
      <div role="status" className="flex flex-col items-center gap-3 rounded-xl bg-secondary/60 px-6 py-10 text-center">
        <CheckCircle2 className="size-10 text-primary" aria-hidden />
        <p className="text-lg font-semibold">
          {isAppointment ? "Appointment request received" : "Message sent"}
        </p>
        <p className="max-w-md text-sm text-muted-foreground">
          {isAppointment
            ? "Thank you. Our staff will contact you by phone or email to confirm your schedule. For emergencies, go directly to the Emergency Room or call the hospital."
            : "Thank you for reaching out. Our team will get back to you as soon as possible."}
        </p>
        <Button variant="outline" onClick={() => setDone(false)}>
          Send another
        </Button>
      </div>
    );
  }

  const id = (name: string) => `${type}-${name}`;
  const aria = (name: keyof InquiryInput) =>
    errors[name]
      ? { "aria-invalid": true as const, "aria-describedby": id(`${name}-error`) }
      : {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {error && (
        <div role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-0 overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={id("name")}>Full name *</Label>
          <Input id={id("name")} autoComplete="name" className="h-10" {...register("name")} {...aria("name")} />
          <FieldError id={id("name-error")} message={errors.name?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor={id("email")}>Email *</Label>
          <Input id={id("email")} type="email" autoComplete="email" className="h-10" {...register("email")} {...aria("email")} />
          <FieldError id={id("email-error")} message={errors.email?.message} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={id("phone")}>Mobile / phone {isAppointment ? "*" : "(optional)"}</Label>
          <Input id={id("phone")} type="tel" autoComplete="tel" className="h-10" {...register("phone")} {...aria("phone")} />
          <FieldError id={id("phone-error")} message={errors.phone?.message} />
        </div>
        {isAppointment ? (
          <div className="space-y-2">
            <Label htmlFor={id("preferredDate")}>Preferred date</Label>
            <Input
              id={id("preferredDate")}
              type="date"
              className="h-10"
              {...register("preferredDate")}
              {...aria("preferredDate")}
            />
            <FieldError id={id("preferredDate-error")} message={errors.preferredDate?.message} />
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor={id("subject")}>Subject</Label>
            <Input id={id("subject")} className="h-10" {...register("subject")} />
          </div>
        )}
      </div>

      {isAppointment && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor={id("department")}>Department or service</Label>
            <Input id={id("department")} list={id("department-options")} className="h-10" placeholder="e.g. Pediatrics" {...register("department")} />
            <datalist id={id("department-options")}>
              {departments.map((d) => (
                <option key={d} value={d} />
              ))}
            </datalist>
          </div>
          <div className="space-y-2">
            <Label htmlFor={id("doctor")}>Preferred doctor (optional)</Label>
            <Input id={id("doctor")} className="h-10" {...register("doctor")} />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor={id("message")}>{isAppointment ? "Reason for visit *" : "Message *"}</Label>
        <Textarea id={id("message")} rows={5} {...register("message")} {...aria("message")} />
        <FieldError id={id("message-error")} message={errors.message?.message} />
      </div>

      <p className="text-xs text-muted-foreground">
        By submitting, you consent to SPHI processing the information above to respond to your{" "}
        {isAppointment ? "request" : "inquiry"}, in accordance with the Data Privacy Act of 2012.
        Please do not include sensitive medical details. For emergencies, call the hospital immediately.
      </p>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        <Send /> {isSubmitting ? "Sending…" : isAppointment ? "Request appointment" : "Send message"}
      </Button>
    </form>
  );
}
