import { FadeIn } from "./FadeIn";

const stats = [
  { value: "16,000", label: "Thriving Plants" },
  { value: "7", label: "Distinct Varieties" },
  { value: "100%", label: "Cold-Pressed EVO" },
];

export function StatsBanner() {
  return (
    <section className="bg-slate-50 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 divide-y divide-emerald-950/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <div className="px-6 py-8 text-center sm:py-2">
                <p className="font-serif text-4xl text-emerald-950 md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 font-sans text-xs font-medium uppercase tracking-[0.2em] text-amber-600">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
