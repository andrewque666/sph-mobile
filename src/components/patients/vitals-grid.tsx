"use client";

import { useEffect, useState } from "react";
import { Weight, HeartPulse, Thermometer, Activity } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Vital = {
  id: string;
  type: string;
  value: string;
  unit: string;
  takenAt: string;
};

type VitalConfig = {
  label: string;
  icon: LucideIcon;
};

const VITAL_CONFIG: Record<string, VitalConfig> = {
  WEIGHT: { label: "Weight", icon: Weight },
  BLOOD_PRESSURE: { label: "Blood Pressure", icon: HeartPulse },
  TEMPERATURE: { label: "Temperature", icon: Thermometer },
  PULSE: { label: "Pulse", icon: Activity },
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  }) + ", " + d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function VitalsGrid({ patientId }: { patientId: string }) {
  const [vitals, setVitals] = useState<Vital[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/vitals?patientId=${patientId}`)
      .then((res) => res.json())
      .then((data) => {
        setVitals(data.vitals || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [patientId]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-32 rounded-2xl bg-primary/10 animate-pulse"
          />
        ))}
      </div>
    );
  }

  const vitalTypes = ["WEIGHT", "BLOOD_PRESSURE", "TEMPERATURE", "PULSE"];

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4">
      {vitalTypes.map((type, i) => {
        const config = VITAL_CONFIG[type];
        const vital = vitals.find((v) => v.type === type);
        const Icon = config.icon;

        return (
          <div
            key={type}
            className="relative overflow-hidden rounded-2xl bg-primary p-4 md:p-5 text-primary-foreground flex flex-col justify-between min-h-[130px] animate-slide-up group hover:shadow-lg transition-shadow"
            style={{ animationDelay: `${i * 75}ms` }}
          >
            {/* Decorative circle */}
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/10" />

            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-primary-foreground/70" />
              <span className="text-xs md:text-sm font-medium text-primary-foreground/80">
                {config.label}
              </span>
            </div>

            {vital ? (
              <div>
                <p className="text-xl md:text-2xl font-bold tracking-tight">
                  {vital.value} <span className="text-sm font-normal text-primary-foreground/70">{vital.unit}</span>
                </p>
                <p className="text-[11px] text-primary-foreground/50 mt-1">
                  {formatDate(vital.takenAt)}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-primary-foreground/50">No data yet</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
