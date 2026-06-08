import Link from "next/link";
import { Award, Newspaper, Sprout, ArrowUpRight } from "lucide-react";

const trustItems = [
  { icon: Award, label: "Recognized by the IOC" },
  { icon: Newspaper, label: "Featured in EU Press" },
  { icon: Sprout, label: "16,000 Thriving Plants" },
];

export function TrustBanner() {
  return (
    <section className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-5 md:flex-row md:gap-4">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-10 md:gap-12">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 text-center sm:text-left"
            >
              <item.icon
                className="h-5 w-5 flex-shrink-0 text-amber-600"
                strokeWidth={1.5}
              />
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-emerald-950/80 sm:text-sm">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <Link
          href="/accolades"
          className="group inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.15em] text-emerald-900 transition-colors duration-300 hover:text-amber-600"
        >
          Read More
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
}
