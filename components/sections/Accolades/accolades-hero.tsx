export function AccoladesHero() {
  return (
    <section className="relative overflow-hidden bg-primary pb-20 pt-32 sm:pt-36 lg:pb-24 lg:pt-40">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 20%, hsl(var(--oro-gold) / 0.35), transparent 45%), radial-gradient(circle at 80% 75%, hsl(var(--oro-gold) / 0.15), transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-accent/70 sm:w-12" />
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent sm:text-sm">
            Recognition &amp; Provenance
          </span>
          <span className="h-px w-10 bg-accent/70 sm:w-12" />
        </div>

        <h1 className="font-serif text-4xl leading-[1.1] text-primary-foreground text-balance sm:text-5xl lg:text-6xl">
          A Legacy Recognized
          <br />
          <span className="italic text-accent">Across Borders</span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl font-sans text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
          From the olive groves of Nowshera to the institutions of Europe, the
          work of Oro Naturals has been documented, certified, and celebrated.
          What follows is the record — every certificate, partnership, and
          mention, exactly as it stands.
        </p>

        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-accent/40" />
          <div className="h-2 w-2 rotate-45 bg-accent" />
          <div className="h-px w-12 bg-accent/40" />
        </div>
      </div>
    </section>
  );
}
