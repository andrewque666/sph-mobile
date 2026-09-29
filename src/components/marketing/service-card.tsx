import Link from "next/link";
import {
  Wind,
  HeartPulse,
  Waves,
  Microscope,
  Droplets,
  Activity,
  Heart,
  Soup,
  Brain,
  Eye,
  Briefcase,
  Siren,
  Pill,
  ScanLine,
  FlaskConical,
  Ambulance,
  ShieldPlus,
  HandHeart,
  Stethoscope,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const ICONS: Record<string, LucideIcon> = {
  sparc: Wind,
  cathlab: HeartPulse,
  "hbot-center": Waves,
  "cancer-center": Microscope,
  "kidney-center": Droplets,
  "physical-medicine-rehabilitation": Activity,
  cardiology: Heart,
  "digestive-disease-center": Soup,
  "neuroscience-center": Brain,
  "st-lucy-eye-center": Eye,
  "industrial-clinic": Briefcase,
  "emergency-room": Siren,
  pharmacy: Pill,
  "diagnostic-imaging": ScanLine,
  laboratory: FlaskConical,
  "mobile-icu-ambulance": Ambulance,
  "matko-center": ShieldPlus,
  "pastoral-services": HandHeart,
};

type ServiceCardData = {
  slug: string;
  name: string;
  shortName: string | null;
  summary: string;
};

export function ServiceCard({ service }: { service: ServiceCardData }) {
  const Icon = ICONS[service.slug] ?? Stethoscope;
  return (
    <Card className="group relative h-full transition-all hover:-translate-y-0.5 hover:shadow-lg focus-within:ring-2 focus-within:ring-ring">
      <CardContent className="flex h-full flex-col gap-3 py-2">
        <div className="flex items-start justify-between gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="size-5" aria-hidden />
          </span>
          {service.shortName && <Badge variant="secondary">{service.shortName}</Badge>}
        </div>
        <h3 className="text-base font-semibold leading-snug">
          <Link href={`/services/${service.slug}`} className="outline-none after:absolute after:inset-0">
            {service.name}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm text-muted-foreground">{service.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary">
          Learn more <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </CardContent>
    </Card>
  );
}
