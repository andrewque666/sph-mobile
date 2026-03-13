"use client";

import { useRef, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Download } from "lucide-react";

interface PatientQrCardProps {
  patientId: string;
  patientName: string;
}

export function PatientQrCard({ patientId, patientName }: PatientQrCardProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(() => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.onload = () => {
      // Add padding around the QR code
      const padding = 40;
      canvas.width = img.width + padding * 2;
      canvas.height = img.height + padding * 2 + 60; // extra space for text

      // White background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw QR code
      ctx.drawImage(img, padding, padding);

      // Draw patient name below
      ctx.fillStyle = "#1a1a1a";
      ctx.font = "bold 16px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(patientName, canvas.width / 2, img.height + padding + 30);

      // Draw subtitle
      ctx.fillStyle = "#666666";
      ctx.font = "12px sans-serif";
      ctx.fillText("SPH Patient QR Code", canvas.width / 2, img.height + padding + 50);

      // Download
      const link = document.createElement("a");
      link.download = `sph-qr-${patientName.replace(/\s+/g, "-").toLowerCase()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  }, [patientName]);

  return (
    <Card className="animate-fade-in border-primary/20 overflow-hidden">
      {/* Header accent bar */}
      <div className="h-2 bg-gradient-to-r from-primary to-primary/70" />

      <CardContent className="pt-6 pb-6 flex flex-col items-center text-center space-y-4">
        {/* Title */}
        <div className="flex items-center gap-2 text-primary">
          <QrCode className="h-5 w-5" />
          <h3 className="font-semibold text-lg">Your Hospital QR Code</h3>
        </div>

        <p className="text-sm text-muted-foreground max-w-xs">
          Show this QR code at the hospital for quick and easy transactions.
        </p>

        {/* QR Code */}
        <div
          ref={qrRef}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
        >
          <QRCodeSVG
            value={patientId}
            size={240}
            level="H"
            includeMargin={false}
            className="w-[200px] h-[200px] md:w-[240px] md:h-[240px]"
          />
        </div>

        {/* Patient name */}
        <div>
          <p className="font-medium text-base">{patientName}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Patient ID: {patientId.slice(0, 12)}...</p>
        </div>

        {/* Download button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Download QR Code
        </Button>
      </CardContent>
    </Card>
  );
}
