import Image from "next/image";
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
import { SERVICE_IMAGES } from "@/components/marketing/site-images";

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
  const image = SERVICE_IMAGES[service.slug];
  return (
    <Card className="group relative h-full transition-all hover:-translate-y-0.5 hover:shadow-lg focus-within:ring-2 focus-within:ring-ring">
      {image && (
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt}
          sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
          className="h-auto w-full"
        />
      )}
      <CardContent className="flex h-full flex-col gap-3 py-2">
        {(!image || service.shortName) && (
          <div className="flex items-start justify-between gap-3">
            {!image && (
              <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" aria-hidden />
              </span>
            )}
            {service.shortName && <Badge variant="secondary">{service.shortName}</Badge>}
          </div>
        )}
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
