export function ExtractionHero() {
  return (
    <section className="bg-background pb-10 pt-28 sm:pb-12 sm:pt-32 lg:pb-14 lg:pt-36">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-center gap-4 sm:mb-8">
          <div className="h-px w-10 bg-accent sm:w-12" />
          <span className="text-xs uppercase tracking-[0.3em] text-accent">
            From grove to bottle
          </span>
          <div className="h-px w-10 bg-accent sm:w-12" />
        </div>

        <h1 className="font-serif text-4xl leading-tight text-foreground text-balance sm:text-5xl md:text-6xl lg:text-7xl">
          The Extraction Process
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty sm:mt-6 sm:text-lg md:text-xl">
          Witness how we transform freshly picked olives into liquid gold — through
          precision, patience, and an unwavering commitment to purity.
        </p>
      </div>
    </section>
  );
}
