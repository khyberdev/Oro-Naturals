import { ArrowUpRight } from "lucide-react";

const pressFeatures = [
  {
    outlet: "Reporterre",
    region: "France · 2025",
    title: "Olive trees, hope for Pakistani farmers in the face of climate change",
    excerpt:
      "“Before 2014, it was just wasteland.” A six-minute feature on Salahuddin's pioneering 8,000-tree estate in Nowshera and the rise of resilient olive cultivation across Pakistan.",
    href: "https://reporterre.net/Les-oliviers-espoir-des-paysans-pakistanais-face-au-changement-climatique",
  },
  {
    outlet: "International Olive Council",
    region: "Madrid · 2021",
    title: "Positive outcome of IOC mission to Pakistan",
    excerpt:
      "The IOC Executive Director visited our private olive grove in Nowshera, noting the exceptional health of the trees and the quality of both fruit and leaf during the council's official mission.",
    href: "https://www.internationaloliveoil.org/positive-outcome-of-ioc-mission-to-pakistan/",
  },
  {
    outlet: "European Union in Pakistan",
    region: "Featured Film",
    title: "From Italy to Pakistan — a story of olive culture",
    excerpt:
      "Our estate featured in the EU's celebration of olive culture in Pakistan, highlighting the cooperation between Pakistani growers and European agronomic expertise.",
    href: "https://www.facebook.com/share/v/17m1xeQNL5/?mibextid=wwXIfr",
  },
];

export function PressRecognition() {
  return (
    <section className="bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
            In the Press
          </p>
          <h2 className="font-serif text-3xl text-primary sm:text-4xl md:text-5xl">
            Told Beyond Our Borders
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-foreground/65">
            International journalists and institutions have documented our work.
            Read the coverage in their own words.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {pressFeatures.map((feature) => (
            <a
              key={feature.title}
              href={feature.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col overflow-hidden rounded-sm border border-border/60 bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-serif text-lg text-primary">
                  {feature.outlet}
                </span>
                <ArrowUpRight className="h-5 w-5 text-foreground/30 transition-all duration-300 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>

              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                {feature.region}
              </p>

              <h3 className="mb-4 font-serif text-xl leading-snug text-primary">
                {feature.title}
              </h3>

              <p className="flex-1 font-sans text-sm leading-relaxed text-foreground/65">
                {feature.excerpt}
              </p>

              <span className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-primary/60 transition-colors group-hover:text-accent">
                Read coverage
              </span>

              <div className="mt-4 h-px w-0 bg-accent transition-all duration-500 group-hover:w-12" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
