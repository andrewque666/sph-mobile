export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Brand panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[540px] bg-primary relative flex-col justify-between p-10 text-primary-foreground overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute top-1/2 right-0 w-40 h-40 rounded-full bg-white/[0.03]" />

        <div>
          <img
            src="/sphlogo.png"
            alt="St. Paul's Hospital of Iloilo"
            className="w-auto h-12 rounded-md bg-white/90 px-2 py-1"
          />
        </div>

        <div className="relative z-10 space-y-6">
          <blockquote className="text-2xl xl:text-3xl font-light leading-relaxed tracking-tight">
            &ldquo;Serving in Excellence,<br />Moving Forward&rdquo;
          </blockquote>
          <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-sm">
            St. Paul&apos;s Hospital of Iloilo — delivering compassionate, quality healthcare to every patient.
          </p>
        </div>

        <p className="text-primary-foreground/40 text-xs">
          &copy; {new Date().getFullYear()} St. Paul&apos;s Hospital of Iloilo, Inc.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 bg-muted/30">
        <div className="w-full max-w-md animate-slide-up">{children}</div>
      </div>
    </div>
  );
}
