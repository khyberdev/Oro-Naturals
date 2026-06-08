import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AccoladesTeaser() {
  return (
    <section id="accolades" className="bg-primary py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
          Globally Recognized
        </p>
        <h2 className="font-serif text-2xl text-primary-foreground sm:text-3xl md:text-4xl">
          Awards &amp; Accolades
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/75">
          International awards, verified certifications, and voices from chefs
          and industry leaders who trust Oro Naturals.
        </p>
        <Link
          href="/accolades"
          className="group mt-8 inline-flex items-center gap-2 font-medium uppercase tracking-wide text-primary-foreground transition-colors hover:text-accent"
        >
          View all accolades
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
